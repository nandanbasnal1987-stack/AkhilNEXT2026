'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, KeyboardEvent as ReactKeyEvent, ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, Copy, Info, Loader2, Mail, X } from 'lucide-react';
import { ApiError, api, localPlans } from './api/onboarding';
import type { AvailabilityQuery, BillingCycle, DraftData, Facility, Plan, PlanCode, SubmitPayload, SubmitResult } from './api/onboarding';
import { Field, useDebounced } from './onboardUi';
import ClinicPreview from './ClinicPreview';
import ProgressTracker from './ProgressTracker';
import { trackEvent } from '@/lib/analytics';
import PlanPicker from './PlanPicker';
import { cityError, citiesOf, loadCities, loadGeo, phoneError, pinError, stateNames } from './geo';

/* ------------------------------------------------------------------ model */

interface Values {
  clinic_name: string;
  clinic_code: string;
  facilities: Facility[];
  clinic_type: string;
  number_of_providers: string;
  contact_person: string;
  contact_is_doctor: boolean;
  email_id: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  clinic_registration_id: string;
  additional_info: string;
  plan_code: PlanCode;
  billing_cycle: BillingCycle;
  same_as_contact: boolean;
  billing_name: string;
  billing_email: string;
  billing_phone: string;
  billing_address: string;
  billing_city: string;
  billing_state: string;
  billing_pincode: string;
  tax_id: string;
  consent: boolean;
}
type Errors = Partial<Record<keyof Values, string>>;
type TextKey = Exclude<{ [K in keyof Values]: Values[K] extends string ? K : never }[keyof Values], 'plan_code' | 'billing_cycle'>;
type StepNo = 1 | 2 | 3 | 4;

const EMPTY: Values = {
  clinic_name: '', clinic_code: '', facilities: [], clinic_type: '', number_of_providers: '',
  contact_person: '', contact_is_doctor: true, email_id: '', phone: '', address: '', city: '', state: '', pincode: '',
  clinic_registration_id: '', additional_info: '',
  plan_code: 'standard', billing_cycle: 'monthly', same_as_contact: true,
  billing_name: '', billing_email: '', billing_phone: '', billing_address: '', billing_city: '', billing_state: '', billing_pincode: '', tax_id: '',
  consent: false,
};

const STEP_FIELDS: Record<StepNo, (keyof Values)[]> = {
  1: ['clinic_name', 'clinic_code', 'facilities', 'clinic_type', 'number_of_providers'],
  2: ['contact_person', 'contact_is_doctor', 'email_id', 'phone', 'address', 'city', 'state', 'pincode', 'clinic_registration_id', 'additional_info'],
  3: ['plan_code', 'billing_cycle', 'same_as_contact', 'billing_name', 'billing_email', 'billing_phone', 'billing_address', 'billing_city', 'billing_state', 'billing_pincode', 'tax_id'],
  4: ['consent'],
};
const STEPS: StepNo[] = [1, 2, 3, 4];
const TITLES = ['Clinic details', 'Contact & address', 'Billing', 'Review & confirm'] as const;
const STEP_OF = Object.fromEntries(
  STEPS.flatMap((s) => STEP_FIELDS[s].map((k) => [k, s])),
) as Record<keyof Values, StepNo>;

const CLINIC_TYPES = ['Single Doctor Clinic', 'PolyClinic', 'Dental Clinic', 'Eye Care Clinic', 'Other'];
const PROVIDER_BANDS = [
  { label: '1 - 5 providers', value: 5 }, { label: '6 - 10 providers', value: 10 }, { label: '11 - 25 providers', value: 25 },
  { label: '26 - 50 providers', value: 50 }, { label: '51 - 100 providers', value: 100 }, { label: 'More than 100 providers', value: 200 },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CODE_RE = /^[A-Z0-9]{3,10}$/;

const DRAFT_KEY = 'onboard-draft-id';
const IDEM_KEY = 'clinic-onboard-idem';
const store = {
  get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* storage unavailable */ } },
  del: (k: string) => { try { sessionStorage.removeItem(k); } catch { /* storage unavailable */ } },
};

function idemKey(): string {
  const old = store.get(IDEM_KEY);
  if (old) return old;
  const k = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  store.set(IDEM_KEY, k);
  return k;
}

/** "Sunshine Family Clinic" -> "SFC"; single words use their first letters. */
function suggestCode(name: string): string {
  const words = name.toUpperCase().match(/[A-Z0-9]+/g) ?? [];
  let c = words.length >= 2 ? words.map((w) => w[0]).join('') : (words[0] ?? '');
  if (c.length < 3) c = words.join('').slice(0, 6);
  return c.slice(0, 10);
}

const facilityLimitMsg = (p: Plan) =>
  `The ${p.name} plan includes up to ${p.max_facilities} ${p.max_facilities === 1 ? 'facility' : 'facilities'}.`;

function planPrice(p: Plan, cycle: BillingCycle): string {
  if (!p.price_monthly) return p.price_label;
  const symbol = p.price_label.match(/^\D*/)?.[0] ?? '$';
  return cycle === 'annual' ? `${symbol}${(p.price_monthly * 10).toLocaleString()}/year` : `${p.price_label}/month`;
}

/* ------------------------------------------------------------------ validation */

function check(step: StepNo, v: Values, plan: Plan): Errors {
  const e: Errors = {};
  const req = (k: TextKey, msg: string) => { if (!v[k].trim()) e[k] = msg; };
  if (step === 1) {
    req('clinic_name', 'Enter the clinic name.');
    if (!v.clinic_code) e.clinic_code = 'Enter a clinic code.';
    else if (!CODE_RE.test(v.clinic_code)) e.clinic_code = 'Use 3–10 letters or digits.';
    if (!v.facilities.length) e.facilities = 'Add at least one facility.';
    else if (plan.max_facilities !== null && v.facilities.length > plan.max_facilities) e.facilities = facilityLimitMsg(plan);
    req('clinic_type', 'Select the clinic type.');
    req('number_of_providers', 'Select the number of providers.');
  }
  if (step === 2) {
    req('contact_person', 'Enter the contact person.');
    if (!v.email_id.trim()) e.email_id = 'Enter an email address.';
    else if (!EMAIL_RE.test(v.email_id.trim())) e.email_id = 'Enter a valid email address.';
    if (!v.phone.trim()) e.phone = 'Enter a phone number.';
    else e.phone = phoneError(v.phone);
    req('address', 'Enter the street address.');
    req('city', 'Enter the city.');
    if (!e.city) e.city = cityError(v.city);
    req('state', 'Select the state.');
    if (!v.pincode.trim()) e.pincode = 'Enter the PIN / postal code.';
    else e.pincode = pinError(v.pincode, v.state.trim());
    req('clinic_registration_id', 'Enter the registration / ID number.');
  }
  if (step === 3) {
    const must = plan.code === 'standard';
    if (must) {
      req('billing_name', 'Enter the billing contact name.');
      req('billing_address', 'Enter the billing address.');
      req('billing_city', 'Enter the billing city.');
      req('billing_state', 'Select the billing state.');
    }
    if (v.billing_city.trim() && !e.billing_city) e.billing_city = cityError(v.billing_city);
    if (must && !v.billing_email.trim()) e.billing_email = 'Enter the billing email.';
    else if (v.billing_email.trim() && !EMAIL_RE.test(v.billing_email.trim())) e.billing_email = 'Enter a valid email address.';
    if (must && !v.billing_pincode.trim()) e.billing_pincode = 'Enter the billing PIN / postal code.';
    else if (v.billing_pincode.trim()) e.billing_pincode = pinError(v.billing_pincode, v.billing_state.trim());
    if (v.billing_phone.trim()) e.billing_phone = phoneError(v.billing_phone);
  }
  if (step === 4 && !v.consent) e.consent = 'Please confirm to submit your application.';
  // a passing check leaves `undefined`; callers count keys, so drop them
  (Object.keys(e) as (keyof Values)[]).forEach((k) => { if (!e[k]) delete e[k]; });
  return e;
}

/** Maps a backend error key to a wizard field ("billing.email" and "billing_email" both work). */
function fieldOf(key: string): keyof Values | null {
  if (key === 'preferred_tenant_name') return 'clinic_name';
  if (key.startsWith('billing.')) {
    const rest = key.slice(8);
    return (rest === 'tax_id' ? 'tax_id' : `billing_${rest}`) as keyof Values;
  }
  return key in STEP_OF ? (key as keyof Values) : null;
}

/* ------------------------------------------------------------------ draft (de)serialisation */

function stepData(step: StepNo, v: Values): DraftData {
  const t = (k: TextKey) => v[k].trim();
  const base: DraftData = { plan_code: v.plan_code };
  if (step === 1) {
    return { ...base, clinic_name: t('clinic_name'), clinic_code: v.clinic_code, facilities: v.facilities, clinic_type: v.clinic_type, number_of_providers: v.number_of_providers ? Number(v.number_of_providers) : '' };
  }
  if (step === 2) {
    return { ...base, contact_person: t('contact_person'), contact_is_doctor: v.contact_is_doctor, email_id: t('email_id'), phone: t('phone'), address: t('address'), city: t('city'), state: t('state'), pincode: t('pincode'), clinic_registration_id: t('clinic_registration_id'), additional_info: t('additional_info') };
  }
  if (step === 3) {
    return { ...base, billing_cycle: v.billing_cycle, same_as_contact: v.same_as_contact, billing_name: t('billing_name'), billing_email: t('billing_email'), billing_phone: t('billing_phone'), billing_address: t('billing_address'), billing_city: t('billing_city'), billing_state: t('billing_state'), billing_pincode: t('billing_pincode'), tax_id: t('tax_id') };
  }
  return { ...base, consent: v.consent };
}

const isFacility = (x: unknown): x is Facility =>
  typeof x === 'object' && x !== null && typeof (x as Facility).facility_id === 'string' && typeof (x as Facility).facility_name === 'string';

function applyDraft(base: Values, d: DraftData): Values {
  const out: Values = { ...base };
  const o = out as unknown as Record<string, unknown>;
  (Object.keys(EMPTY) as (keyof Values)[]).forEach((k) => {
    if (!(k in d)) return;
    const x = d[k];
    if (k === 'facilities') o[k] = Array.isArray(x) ? x.filter(isFacility) : [];
    else if (k === 'consent' || k === 'same_as_contact') o[k] = x === true;
    else if (k === 'contact_is_doctor') o[k] = x !== false;
    else if (k === 'plan_code') o[k] = x === 'free' || x === 'custom' ? x : 'standard';
    else if (k === 'billing_cycle') o[k] = x === 'annual' ? 'annual' : 'monthly';
    else o[k] = typeof x === 'string' ? x : typeof x === 'number' ? String(x) : '';
  });
  return out;
}

const snapshot = (step: StepNo, v: Values) => JSON.stringify(STEP_FIELDS[step].map((k) => v[k]));

/* ------------------------------------------------------------------ facility entry (new facilities, typed) */

interface PickerProps {
  id: string;
  selected: Facility[];
  max: number | null;
  invalid: boolean;
  onChange: (update: (current: Facility[]) => Facility[]) => void;
}

/** The clinic's facilities are created at approval, so the applicant types their names (no catalogue to pick from). */
function FacilityPicker({ id, selected, max, invalid, onChange }: PickerProps) {
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const full = max !== null && selected.length >= max;

  const add = () => {
    const name = text.trim().replace(/\s+/g, ' ').slice(0, 80);
    if (!name) return;
    if (selected.some((f) => f.facility_name.toLowerCase() === name.toLowerCase())) { setMsg(`"${name}" is already added.`); return; }
    if (full) { setMsg('Plan limit reached.'); return; }
    onChange((cur) => [...cur, { facility_id: '', facility_name: name }]);
    setText(''); setMsg('');
  };
  const remove = (name: string) => onChange((cur) => cur.filter((x) => x.facility_name !== name));

  return (
    <div className="w-ms">
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          id={id}
          value={text}
          maxLength={80}
          disabled={full}
          placeholder={full ? 'Plan limit reached' : 'Type a facility name and press Enter'}
          aria-invalid={invalid ? true : undefined}
          onChange={(e) => { setText(e.target.value); if (msg) setMsg(''); }}
          onKeyDown={(e: ReactKeyEvent) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
        />
        <button type="button" className="w-ms-control" style={{ width: 'auto', padding: '0 16px' }} disabled={full || !text.trim()} onClick={add}>Add</button>
      </div>
      {msg && <p role="alert" style={{ margin: '6px 0 0', fontSize: 12 }}>{msg}</p>}
      {selected.length > 0 && (
        <ul className="w-chips" aria-label="Facilities to create">
          {selected.map((f) => (
            <li key={f.facility_name.toLowerCase()}>
              {f.facility_name}
              <button type="button" aria-label={`Remove ${f.facility_name}`} onClick={() => remove(f.facility_name)}><X size={12} /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ wizard */

interface Props {
  variant: 'modal' | 'page';
  initialPlan?: PlanCode;
  onClose?: () => void;
  /** Custom is a sales enquiry: when picked in the plan dropdown the host opens the Contact us form. */
  onContact?: () => void;
}

interface Avail { email?: boolean; phone?: boolean; name?: boolean; code?: boolean }

export default function OnboardWizard({ variant, initialPlan, onClose, onContact }: Props) {
  const base = useRef<Values>({ ...EMPTY, plan_code: initialPlan ?? 'standard' });
  const saved = useRef<Partial<Record<StepNo, string>>>({});
  const codeTouched = useRef(false);
  const dialog = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const [v, setV] = useState<Values>(base.current);
  const [step, setStep] = useState<StepNo>(1);
  const [maxStep, setMaxStep] = useState<StepNo>(1);
  const [draftId, setDraftId] = useState<string | null>(() => store.get(DRAFT_KEY));
  const [resuming, setResuming] = useState<boolean>(() => store.get(DRAFT_KEY) !== null);
  const [plans, setPlans] = useState<Plan[]>(localPlans);
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [done, setDone] = useState<SubmitResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [avail, setAvail] = useState<Avail>({});
  const [geoTick, setGeoTick] = useState(0);
  useEffect(() => { let on = true; loadGeo().then(() => { if (on) setGeoTick((n) => n + 1); }).catch(() => { /* format checks still apply */ }); return () => { on = false; }; }, []);
  const anyState = v.state || v.billing_state;
  useEffect(() => { if (!anyState) return; let on = true; loadCities().then(() => { if (on) setGeoTick((n) => n + 1); }).catch(() => { /* suggestions are optional */ }); return () => { on = false; }; }, [anyState]);

  const plan = plans.find((p) => p.code === v.plan_code) ?? plans[0];
  const emailD = useDebounced(v.email_id.trim(), 600);
  const phoneD = useDebounced(v.phone.trim(), 600);
  const nameD = useDebounced(v.clinic_name.trim(), 600);
  const codeD = useDebounced(v.clinic_code, 600);

  /* ---- data loading */

  useEffect(() => {
    let live = true;
    api.plans().then((p) => { if (live && p.length) setPlans(p); }).catch(() => { /* the built-in catalogue stays */ });
    return () => { live = false; };
  }, []);

  // resume a saved draft
  useEffect(() => {
    const id = store.get(DRAFT_KEY);
    if (!id) return;
    let live = true;
    api.getDraft(id)
      .then((d) => {
        if (!live) return;
        if (d.status !== 'Draft') { store.del(DRAFT_KEY); setDraftId(null); return; }
        const restored = applyDraft(base.current, d.data);
        if (initialPlan) restored.plan_code = initialPlan;
        const p = plans.find((x) => x.code === restored.plan_code) ?? plans[0];
        if (p.max_facilities !== null) restored.facilities = restored.facilities.slice(0, p.max_facilities);
        const firstBad = STEPS.slice(0, 3).find((s) => Object.keys(check(s, restored, p)).length > 0);
        const start = (firstBad ?? Math.min(d.last_step + 1, 4)) as StepNo;
        STEPS.forEach((s) => { if (s < start && s <= d.last_step) saved.current[s] = snapshot(s, restored); });
        codeTouched.current = restored.clinic_code !== '';
        setV(restored);
        setStep(start);
        setMaxStep(start);
      })
      .catch((err) => {
        if (live && err instanceof ApiError && err.statusCode === 404) { store.del(DRAFT_KEY); setDraftId(null); }
      })
      .finally(() => { if (live) setResuming(false); });
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // live availability of email, phone, clinic name (= tenant name) and clinic code
  useEffect(() => {
    const q: AvailabilityQuery = { request_id: draftId ?? undefined };
    if (EMAIL_RE.test(emailD)) q.email_id = emailD;
    if (phoneD && !phoneError(phoneD)) q.phone = phoneD;
    if (nameD) q.tenant_name = nameD;
    if (CODE_RE.test(codeD)) q.clinic_code = codeD;
    if (!q.email_id && !q.phone && !q.tenant_name && !q.clinic_code) { setAvail({}); return; }
    let live = true;
    api.checkAvailability(q)
      .then((r) => {
        if (!live) return;
        setAvail({
          email: q.email_id ? r.email_available : undefined,
          phone: q.phone ? r.phone_available : undefined,
          name: q.tenant_name ? r.tenant_name_available : undefined,
          code: q.clinic_code ? r.clinic_code_available : undefined,
        });
      })
      .catch(() => { /* availability is a hint; saving and submitting still validate on the server */ });
    return () => { live = false; };
  }, [emailD, phoneD, nameD, codeD, draftId]);

  // "same as contact" keeps the billing fields in step with the contact fields
  useEffect(() => {
    if (!v.same_as_contact) return;
    setV((p) => {
      const next = {
        ...p, billing_name: p.contact_person, billing_email: p.email_id, billing_phone: p.phone,
        billing_address: p.address, billing_city: p.city, billing_state: p.state, billing_pincode: p.pincode,
      };
      return snapshot(3, next) === snapshot(3, p) ? p : next;
    });
  }, [step, v.same_as_contact, v.contact_person, v.email_id, v.phone, v.address, v.city, v.state, v.pincode]);

  /* ---- errors */

  const stepErrors = useCallback((s: StepNo): Errors => {
    const e = check(s, v, plan);
    const dup: Errors = {};
    if (avail.email === false && emailD === v.email_id.trim()) dup.email_id = 'This email is already registered.';
    if (avail.phone === false && phoneD === v.phone.trim()) dup.phone = 'This phone number is already registered.';
    if (avail.name === false && nameD === v.clinic_name.trim()) dup.clinic_name = 'This clinic name is already taken.';
    if (avail.code === false && codeD === v.clinic_code) dup.clinic_code = 'This clinic code is already taken.';
    (Object.keys(dup) as (keyof Values)[]).forEach((k) => { if (STEP_OF[k] === s && !e[k]) e[k] = dup[k]; });
    return e;
  }, [v, plan, avail, emailD, phoneD, nameD, codeD, geoTick]);

  const current = useMemo(() => stepErrors(step), [stepErrors, step]);
  const err = (k: keyof Values): string | undefined => serverErrors[k] ?? (showErrors || touched[k] ? current[k] : undefined);
  const okMsg = (k: keyof Values, flag: boolean | undefined, deb: string, cur: string): string | undefined =>
    !current[k] && !serverErrors[k] && flag === true && deb === cur ? 'Available' : undefined;

  const set = (k: TextKey) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setV((p) => {
      const next = { ...p, [k]: value };
      if (k === 'clinic_name' && !codeTouched.current) next.clinic_code = suggestCode(value);
      return next;
    });
    if (serverErrors[k]) setServerErrors((p) => ({ ...p, [k]: undefined }));
    if (k === 'clinic_name' && serverErrors.clinic_code && !codeTouched.current) setServerErrors((p) => ({ ...p, clinic_code: undefined }));
  };
  const setCode = (e: ChangeEvent<HTMLInputElement>) => {
    codeTouched.current = true;
    const code = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    setV((p) => ({ ...p, clinic_code: code }));
    if (serverErrors.clinic_code) setServerErrors((p) => ({ ...p, clinic_code: undefined }));
  };
  const BILLING_COPIED: TextKey[] = ['billing_name', 'billing_email', 'billing_phone', 'billing_address', 'billing_city', 'billing_state', 'billing_pincode'];
  const editBilling = (k: TextKey) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setV((p) => ({ ...p, [k]: value, same_as_contact: false }));
    if (serverErrors[k]) setServerErrors((p) => ({ ...p, [k]: undefined }));
  };
  const blur = (k: keyof Values) => () => {
    setTouched((p) => ({ ...p, [k]: true }));
    // licence / registration ID is mandatory: tag whether it was provided (the number itself is never sent)
    if (k === 'clinic_registration_id') trackEvent('licence_id_field', { filled: v.clinic_registration_id.trim().length > 0, required: true });
  };

  const choosePlan = (code: PlanCode) => {
    const next = plans.find((p) => p.code === code);
    if (!next) return;
    setV((p) => {
      const cut = next.max_facilities !== null && p.facilities.length > next.max_facilities;
      if (cut) setNotice(`Your facility selection was reduced to ${next.max_facilities} to fit the ${next.name} plan.`);
      else setNotice('');
      return { ...p, plan_code: code, facilities: cut ? p.facilities.slice(0, next.max_facilities as number) : p.facilities };
    });
  };

  /* ---- navigation, saving and submitting */

  const applyApiError = (e: unknown, stay?: StepNo): StepNo | null => {
    if (!(e instanceof ApiError)) { setFormError('Something went wrong. Please try again.'); return null; }
    const fields: Errors = {};
    Object.entries(e.errors).forEach(([key, msg]) => {
      const f = fieldOf(key);
      if (f) fields[f] = msg;
    });
    setServerErrors(fields);
    setFormError(e.message);
    if (e.statusCode === 404 && draftId) {
      store.del(DRAFT_KEY);
      setDraftId(null);
      setFormError('Your saved draft is no longer available. Press Next to save it again.');
    }
    const keys = Object.keys(fields) as (keyof Values)[];
    if (!keys.length) return null;
    const first = Math.min(...keys.map((k) => STEP_OF[k])) as StepNo;
    const target = stay === undefined ? first : stay;
    if (target !== step) { setStep(target); setMaxStep((m) => (Math.max(m, target) as StepNo)); }
    setShowErrors(true);
    return target;
  };

  const focusFirstInvalid = () =>
    setTimeout(() => {
      const el = dialog.current?.querySelector<HTMLElement>('[data-invalid="true"] input, [data-invalid="true"] select, [data-invalid="true"] textarea, [data-invalid="true"] button');
      el?.focus();
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 40);

  const saveStep = async (s: StepNo, partial?: boolean) => {
    const res = await api.saveDraft({ request_id: draftId ?? undefined, step: s, data: stepData(s, v), ...(partial ? { partial: true } : {}) });
    store.set(DRAFT_KEY, res.request_id);
    setDraftId(res.request_id);
    if (!partial) saved.current[s] = snapshot(s, v);
    return res;
  };

  const advance = async (to: StepNo) => {
    setFormError('');
    setNotice('');
    const errs = stepErrors(step);
    if (Object.keys(errs).length) {
      if (errs.clinic_registration_id) trackEvent('licence_id_missing', { step });
      if (errs.facilities) trackEvent('facility_licence_exceeded', { plan: plan.code, facilities: v.facilities.length, max_facilities: plan.max_facilities ?? 'unlimited' });
      setShowErrors(true); focusFirstInvalid(); return;
    }
    setBusy(true);
    try {
      await saveStep(step);
      setServerErrors({});
      setShowErrors(false);
      setStep(to);
      setMaxStep((m) => (Math.max(m, to) as StepNo));
    } catch (e) {
      applyApiError(e, step);
      focusFirstInvalid();
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => { trackEvent('onboarding_step', { step }); }, [step]);

  // plan licence limit (from the plans lookup): tag every change to the facility list against the plan's cap
  const facilityCount = v.facilities.length;
  useEffect(() => {
    if (!facilityCount) return;
    const max = plan.max_facilities;
    trackEvent('facility_licence_limit', { plan: plan.code, facilities: facilityCount, max_facilities: max ?? 'unlimited', at_limit: max !== null && facilityCount >= max });
  }, [facilityCount, plan.code, plan.max_facilities]);

  const goTo = (n: StepNo) => {
    if (n === step || busy || n > maxStep) return;
    if (n < step) { setShowErrors(false); setFormError(''); setStep(n); } else void advance(n);
  };

  const payload = (): SubmitPayload => {
    const t = (k: TextKey) => v[k].trim();
    return {
      request_id: draftId ?? undefined,
      idempotency_key: idemKey(),
      consent: true,
      plan_code: v.plan_code,
      billing_cycle: plan.price_monthly ? v.billing_cycle : 'monthly',
      clinic_name: t('clinic_name'),
      preferred_tenant_name: t('clinic_name'),
      clinic_code: v.clinic_code,
      facilities: v.facilities,
      clinic_type: v.clinic_type,
      number_of_providers: Number(v.number_of_providers),
      contact_person: t('contact_person'),
      contact_is_doctor: v.contact_is_doctor,
      email_id: t('email_id'),
      phone: t('phone'),
      address: t('address'),
      city: t('city'),
      state: t('state'),
      pincode: t('pincode'),
      clinic_registration_id: t('clinic_registration_id'),
      additional_info: t('additional_info') || undefined,
      billing: {
        same_as_contact: v.same_as_contact, name: t('billing_name'), email: t('billing_email'), phone: t('billing_phone'),
        address: t('billing_address'), city: t('billing_city'), state: t('billing_state'), pincode: t('billing_pincode'), tax_id: t('tax_id'),
      },
    };
  };

  const submit = async () => {
    setFormError('');
    setShowErrors(true);
    const bad = STEPS.find((s) => Object.keys(stepErrors(s)).length > 0);
    if (bad) {
      setStep(bad);
      setMaxStep((m) => (Math.max(m, bad) as StepNo));
      focusFirstInvalid();
      return;
    }
    setBusy(true);
    try {
      const res = await api.submit(payload());
      store.del(DRAFT_KEY);
      store.del(IDEM_KEY);
      setDraftId(null);
      setDone(res);
      trackEvent('generate_lead', { form: 'clinic_onboarding', plan: v.plan_code, reference: res.reference_number });
    } catch (e) {
      applyApiError(e);
      focusFirstInvalid();
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (busy || resuming) return;
    if (step < 4) void advance((step + 1) as StepNo); else void submit();
  };

  /* ---- closing (modal) */

  const dirty = snapshot(step, v) !== (saved.current[step] ?? snapshot(step, base.current));

  const requestClose = async () => {
    if (!onClose || busy) return;
    if (done || !dirty) { onClose(); return; }
    setBusy(true);
    try {
      await saveStep(step, true); // keep what was typed as a draft, even if the step is unfinished
      onClose();
    } catch {
      setConfirmClose(true); // the server refused the partial save: let the user decide
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (variant !== 'modal') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [variant]);

  const closeRef = useRef(requestClose);
  closeRef.current = requestClose;
  useEffect(() => {
    if (variant !== 'modal') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (confirmClose) setConfirmClose(false); else void closeRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [variant, confirmClose]);

  // move focus into the dialog on open and on every step change
  useEffect(() => {
    if (resuming) return;
    if (firstRender.current && variant === 'page') { firstRender.current = false; return; }
    firstRender.current = false;
    const t = setTimeout(() => {
      dialog.current?.querySelector<HTMLElement>('.w-body input:not([disabled]), .w-body select, .w-body textarea, .w-body button:not([disabled])')?.focus({ preventScroll: true });
    }, 60);
    return () => clearTimeout(t);
  }, [step, resuming, variant]);

  const trap = (e: ReactKeyEvent) => {
    if (variant !== 'modal' || e.key !== 'Tab' || !dialog.current) return;
    const nodes = Array.from(dialog.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'));
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  /* ---- render pieces */

  const input = (k: TextKey, extra: { type?: string; placeholder?: string; maxLength?: number; autoComplete?: string; inputMode?: 'tel' | 'numeric' | 'email'; disabled?: boolean; list?: string } = {}) => (
    <input
      id={`w-${k}`}
      value={v[k]}
      onChange={k === 'clinic_code' ? setCode : BILLING_COPIED.includes(k) ? editBilling(k) : set(k)}
      onBlur={blur(k)}
      aria-invalid={err(k) ? true : undefined}
      aria-describedby={err(k) ? `w-${k}-msg` : undefined}
      type={extra.type ?? 'text'}
      placeholder={extra.placeholder}
      maxLength={extra.maxLength ?? 120}
      autoComplete={extra.autoComplete}
      inputMode={extra.inputMode}
      disabled={extra.disabled}
      list={extra.list}
    />
  );

  /** State dropdown (all Indian states); keeps a value from an older draft that is not in the list. */
  const stateSelect = (k: 'state' | 'billing_state') => {
    const names = stateNames();
    const options = v[k] && !names.includes(v[k]) ? [v[k], ...names] : names;
    return (
      <select id={`w-${k}`} value={v[k]} onChange={k === 'billing_state' ? editBilling(k) : set(k)} onBlur={blur(k)} aria-invalid={err(k) ? true : undefined} autoComplete={k === 'state' ? 'address-level1' : 'off'}>
        <option value="">{options.length ? 'Select state' : 'Loading states…'}</option>
        {options.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
    );
  };

  /** City box with suggestions for the chosen state; any real city name may still be typed. */
  const cityBox = (k: 'city' | 'billing_city', stateKey: 'state' | 'billing_state') => (
    <>
      {input(k, { placeholder: 'Start typing, e.g. Dehradun', autoComplete: k === 'city' ? 'address-level2' : 'off', maxLength: 80, list: `w-cities-${k}` })}
      <datalist id={`w-cities-${k}`}>{citiesOf(v[stateKey]).map((c) => <option key={c} value={c} />)}</datalist>
    </>
  );

  const planCard = (
    <PlanPicker
      plans={plans}
      current={plan}
      price={planPrice(plan, plan.price_monthly ? v.billing_cycle : 'monthly')}
      onPick={(code) => {
        trackEvent('plan_change', { from: plan.code, to: code });
        if (code === 'custom' && onContact) onContact(); else choosePlan(code);
      }}
    />
  );

  const limitHint = plan.max_facilities === null
    ? `Unlimited facilities on the ${plan.name} plan.`
    : `Up to ${plan.max_facilities} ${plan.max_facilities === 1 ? 'facility' : 'facilities'} on ${plan.name}.`;

  const billingNeeded = plan.code === 'standard';

  const summaryRows = (rows: [string, string][]) => (
    <dl>{rows.filter(([, val]) => val).map(([label, val]) => <div key={label}><dt>{label}</dt><dd>{val}</dd></div>)}</dl>
  );
  const sumCard = (n: StepNo, rows: [string, string][]) => (
    <section className="w-sum" key={n}>
      <header><h3>{TITLES[n - 1]}</h3><button type="button" className="w-edit" onClick={() => goTo(n)}>Edit</button></header>
      {summaryRows(rows)}
    </section>
  );

  const body = () => {
    if (step === 1) {
      return (
        <>
          {planCard}
          <div className="w-fields">
            <Field label="Clinic Name" htmlFor="w-clinic_name" required error={err('clinic_name')} ok={okMsg('clinic_name', avail.name, nameD, v.clinic_name.trim())}>
              {input('clinic_name', { placeholder: 'Enter clinic name', autoComplete: 'organization' })}
            </Field>
            {/* <Field label="Clinic Code" htmlFor="w-clinic_code" required error={err('clinic_code')} hint="3–10 letters or digits. Suggested from the clinic name; you can change it." ok={okMsg('clinic_code', avail.code, codeD, v.clinic_code)}>
              {input('clinic_code', { placeholder: 'Enter clinic code', maxLength: 10 })}
            </Field> */}
            <Field label="Facilities" htmlFor="w-facilities" required error={err('facilities')} hint={limitHint}>
              <FacilityPicker
                id="w-facilities"
                selected={v.facilities}
                max={plan.max_facilities}
                invalid={!!err('facilities')}
                onChange={(update) => { setV((p) => ({ ...p, facilities: update(p.facilities) })); if (serverErrors.facilities) setServerErrors((p) => ({ ...p, facilities: undefined })); }}
              />
            </Field>
            <Field label="Clinic Type" htmlFor="w-clinic_type" required full error={err('clinic_type')}>
              <div id="w-clinic_type" className="w-opts" role="radiogroup" aria-label="Clinic type" aria-invalid={err('clinic_type') ? true : undefined}>
                {CLINIC_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={v.clinic_type === t}
                    className={`w-opt${v.clinic_type === t ? ' on' : ''}`}
                    onClick={() => { setV((p) => ({ ...p, clinic_type: t })); setTouched((p) => ({ ...p, clinic_type: true })); if (serverErrors.clinic_type) setServerErrors((p) => ({ ...p, clinic_type: undefined })); }}
                  >{t}</button>
                ))}
              </div>
            </Field>
            {/* <Field label="Number of Providers" htmlFor="w-number_of_providers" required error={err('number_of_providers')}>
              <select id="w-number_of_providers" value={v.number_of_providers} onChange={set('number_of_providers')} onBlur={blur('number_of_providers')} aria-invalid={err('number_of_providers') ? true : undefined}>
                <option value="">Select number of providers</option>
                {PROVIDER_BANDS.map((b) => <option key={b.value} value={String(b.value)}>{b.label}</option>)}
              </select>
            </Field> */}
          </div>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          {planCard}
          <div className="w-fields w-grid">
            <Field label="Contact Person" htmlFor="w-contact_person" required error={err('contact_person')}>
              {input('contact_person', { placeholder: 'e.g. Dr. Asha Rawat', autoComplete: 'name' })}
            </Field>
            <Field label="Email" htmlFor="w-email_id" required error={err('email_id')} ok={okMsg('email_id', avail.email, emailD, v.email_id.trim())}>
              {input('email_id', { type: 'email', placeholder: 'e.g. admin@yourclinic.in', autoComplete: 'email', inputMode: 'email' })}
            </Field>
            <Field label="Phone" htmlFor="w-phone" required error={err('phone')} ok={okMsg('phone', avail.phone, phoneD, v.phone.trim())}>
              {input('phone', { type: 'tel', placeholder: 'e.g. 98765 43210', autoComplete: 'tel', inputMode: 'tel', maxLength: 20 })}
            </Field>
            <Field label="MCI Number" htmlFor="w-clinic_registration_id" required error={err('clinic_registration_id')}>
              {input('clinic_registration_id', { placeholder: 'e.g. your clinic registration number', maxLength: 60 })}
            </Field>
            <Field label="Street Address" htmlFor="w-address" required full error={err('address')}>
              {input('address', { placeholder: 'e.g. 12, Rajpur Road, Near Clock Tower', autoComplete: 'street-address', maxLength: 250 })}
            </Field>
            <Field label="State" htmlFor="w-state" required error={err('state')}>{stateSelect('state')}</Field>
            <Field label="City" htmlFor="w-city" required error={err('city')}>{cityBox('city', 'state')}</Field>
            <Field label="PIN / Postal Code" htmlFor="w-pincode" required error={err('pincode')}>
              {input('pincode', { placeholder: 'e.g. 248001', autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 6 })}
            </Field>
            <Field label="Additional Information (optional)" htmlFor="w-additional_info" full>
              <textarea id="w-additional_info" rows={3} maxLength={1000} placeholder="Anything else we should know?" value={v.additional_info} onChange={set('additional_info')} />
            </Field>
          </div>
          <label className="o-check">
            <input type="checkbox" checked={v.contact_is_doctor} onChange={(e) => setV((p) => ({ ...p, contact_is_doctor: e.target.checked }))} />
            <span>I will also see patients as a doctor</span>
          </label>
          <p className="o-note">You sign in as Clinics Admin. With this ticked you also get the Doctor role and a doctor profile, and you choose which role to use when you sign in.</p>
        </>
      );
    }

    if (step === 3) {
      return (
        <>
          {planCard}
          <fieldset className="w-plans">
            <legend>Choose your plan</legend>
            {plans.map((p) => (
              <label key={p.code} className={`w-planopt${p.code === v.plan_code ? ' on' : ''}`}>
                <input type="radio" name="w-plan" checked={p.code === v.plan_code} onChange={() => choosePlan(p.code)} />
                <span><b>{p.name}</b><small>{p.blurb}</small></span>
                <em>{p.price_label}{p.price_monthly ? <i>/month</i> : null}</em>
              </label>
            ))}
          </fieldset>
          {notice && <p className="w-notice"><Info size={14} /> {notice}</p>}

          {plan.price_monthly ? (
            <div className="w-cycle" role="group" aria-label="Billing cycle">
              <button type="button" className={v.billing_cycle === 'monthly' ? 'on' : ''} aria-pressed={v.billing_cycle === 'monthly'} onClick={() => setV((p) => ({ ...p, billing_cycle: 'monthly' }))}>
                Monthly <small>{planPrice(plan, 'monthly')}</small>
              </button>
              <button type="button" className={v.billing_cycle === 'annual' ? 'on' : ''} aria-pressed={v.billing_cycle === 'annual'} onClick={() => setV((p) => ({ ...p, billing_cycle: 'annual' }))}>
                Annual <small>{planPrice(plan, 'annual')} · Save 2 months</small>
              </button>
            </div>
          ) : null}

          <label className="o-check">
            <input type="checkbox" checked={v.same_as_contact} onChange={(e) => setV((p) => ({ ...p, same_as_contact: e.target.checked }))} />
            <span>Same as contact details</span>
          </label>
          {v.same_as_contact && (
            <p className="o-note">These are copied from your contact details in step 2. Start typing in any field to use different billing details.</p>
          )}

          <div className="w-fields w-grid">
            <Field label="Billing Contact Name" htmlFor="w-billing_name" required={billingNeeded} error={err('billing_name')}>
              {input('billing_name', { placeholder: 'e.g. Accounts team or Dr. Asha Rawat', autoComplete: 'off' })}
            </Field>
            <Field label="Billing Email" htmlFor="w-billing_email" required={billingNeeded} error={err('billing_email')}>
              {input('billing_email', { type: 'email', placeholder: 'e.g. accounts@yourclinic.in', autoComplete: 'off', inputMode: 'email' })}
            </Field>
            <Field label="Billing Phone" htmlFor="w-billing_phone" error={err('billing_phone')}>
              {input('billing_phone', { type: 'tel', placeholder: 'e.g. 98765 43210', autoComplete: 'off', inputMode: 'tel', maxLength: 20 })}
            </Field>
            <Field label="GST / VAT / Tax ID (optional)" htmlFor="w-tax_id">
              {input('tax_id', { placeholder: 'e.g. 22AAAAA0000A1Z5', maxLength: 40, autoComplete: 'off' })}
            </Field>
            <Field label="Billing Address" htmlFor="w-billing_address" required={billingNeeded} full error={err('billing_address')}>
              {input('billing_address', { placeholder: 'e.g. 12, Rajpur Road, Near Clock Tower', maxLength: 250, autoComplete: 'off' })}
            </Field>
            <Field label="State" htmlFor="w-billing_state" required={billingNeeded} error={err('billing_state')}>{stateSelect('billing_state')}</Field>
            <Field label="City" htmlFor="w-billing_city" required={billingNeeded} error={err('billing_city')}>{cityBox('billing_city', 'billing_state')}</Field>
            <Field label="PIN / Postal Code" htmlFor="w-billing_pincode" required={billingNeeded} error={err('billing_pincode')}>{input('billing_pincode', { placeholder: 'e.g. 248001', inputMode: 'numeric', maxLength: 6, autoComplete: 'off' })}</Field>
          </div>
          <p className="w-note"><Info size={14} /> No payment is taken now. An invoice is sent after your application is approved.</p>
        </>
      );
    }

    const band = PROVIDER_BANDS.find((b) => String(b.value) === v.number_of_providers)?.label ?? '';
    return (
      <>
        {planCard}
        {sumCard(1, [
          ['Clinic name', v.clinic_name.trim()], ['Clinic code', v.clinic_code], ['Clinic type', v.clinic_type],
          ['Providers', band], ['Facilities', v.facilities.map((f) => f.facility_name).join(', ')],
        ])}
        {sumCard(2, [
          ['Contact person', v.contact_person.trim()], ['Also a doctor', v.contact_is_doctor ? 'Yes' : 'No'], ['Email', v.email_id.trim()], ['Phone', v.phone.trim()],
          ['Address', [v.address, v.city, v.state, v.pincode].map((x) => x.trim()).filter(Boolean).join(', ')],
          ['Registration / ID', v.clinic_registration_id.trim()], ['Additional info', v.additional_info.trim()],
        ])}
        {sumCard(3, [
          ['Plan', `${plan.name} · ${planPrice(plan, plan.price_monthly ? v.billing_cycle : 'monthly')}`],
          ['Billing contact', v.same_as_contact ? 'Same as contact details' : v.billing_name.trim()],
          ['Billing email', v.same_as_contact ? '' : v.billing_email.trim()],
          ['Billing phone', v.same_as_contact ? '' : v.billing_phone.trim()],
          ['Billing address', v.same_as_contact ? '' : [v.billing_address, v.billing_city, v.billing_state, v.billing_pincode].map((x) => x.trim()).filter(Boolean).join(', ')],
          ['Tax ID', v.tax_id.trim()],
        ])}
        <label className={`o-check${err('consent') ? ' invalid' : ''}`} data-invalid={err('consent') ? 'true' : undefined}>
          <input type="checkbox" checked={v.consent} onChange={(e) => { setV((p) => ({ ...p, consent: e.target.checked })); setServerErrors((p) => ({ ...p, consent: undefined })); }} onBlur={blur('consent')} />
          <span>I confirm the information is correct and agree to the terms</span>
        </label>
        {err('consent') && <small className="err w-consent-err" role="alert">{err('consent')}</small>}
        <p className="w-note"><Info size={14} /> No payment is taken now. An invoice is sent after your application is approved.</p>
      </>
    );
  };

  /* ---- layout */

  const Title = variant === 'page' ? 'h1' : 'h2';

  const header = (
    <div className="w-head">
      {variant === 'modal' && (
        <button type="button" className="ob-icon-btn w-x" aria-label="Close" onClick={() => void requestClose()} disabled={busy}><X size={18} /></button>
      )}
      <Title id="w-title" className={done ? 'w-sr' : undefined}>Clinic Onboarding Request</Title>
      {!done && <p>Complete the form below to begin your clinic's onboarding process.</p>}
      {!done && (
        <>
          <ol className="w-stepper" aria-label="Progress">
            {STEPS.map((n) => (
              <li key={n} className="w-stepitem">
                {n > 1 && <span className={`w-line${step >= n ? ' on' : ''}`} aria-hidden />}
                <button
                  type="button"
                  className={`w-dot${n === step ? ' active' : ''}${n < step ? ' done' : ''}`}
                  disabled={n > maxStep || busy}
                  aria-current={n === step ? 'step' : undefined}
                  aria-label={`Step ${n}: ${TITLES[n - 1]}`}
                  onClick={() => goTo(n)}
                >
                  {n < step ? <Check size={16} /> : n}
                </button>
              </li>
            ))}
          </ol>
          <p className="w-stepcap">Step {step} of 4 · {TITLES[step - 1]}</p>
        </>
      )}
    </div>
  );

  let content: ReactNode;
  if (done) {
    content = (
      <div className="w-ok">
        <span className="w-ok-icon"><Check size={30} /></span>
        <h3>Request Submitted Successfully!</h3>
        <p className="w-ok-sub">Your clinic onboarding request has been received.</p>

        <section className="w-ok-sec">
          <h4>Request Details</h4>
          <div className="w-ok-ref">
            <small>Reference number</small>
            <div className="w-ok-refrow">
              <strong>{done.reference_number}</strong>
              <button
                type="button"
                className="ob-btn ob-btn-soft ob-btn-sm"
                onClick={() => { void navigator.clipboard?.writeText(done.reference_number).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }).catch(() => undefined); }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <span className="w-reqid">Request ID: <code>{done.request_id}</code></span>
          </div>
        </section>

        <section className="w-ok-sec">
          <h4>What&apos;s Next?</h4>
          <p>Thanks, {v.contact_person.trim() || 'there'}. Your request has been submitted successfully and a confirmation was sent to <b>{v.email_id.trim()}</b>.</p>
          <ol className="w-ok-steps">
            <li>Your application will be reviewed by our administration team.</li>
            <li>Your clinic environment and configuration will be prepared.</li>
            <li>Once setup is complete, your login credentials will be sent to your registered email address.</li>
          </ol>
          <p className="w-ok-mail"><Mail size={16} /> You will receive your credentials soon via email.</p>
        </section>

        <section className="w-ok-sec">
          <h4>Live progress</h4>
          <ProgressTracker requestId={done.request_id} initial={done.status} />
        </section>

        <p className="w-ok-foot">Keep your reference number. Please check your inbox and spam folder for further updates.</p>
        <div className="row o-center">
          {variant === 'modal'
            ? <button type="button" className="ob-btn ob-btn-primary" onClick={onClose}>Close</button>
            : <a href="#" className="ob-btn ob-btn-primary">Back to home</a>}
        </div>
      </div>
    );
  } else if (resuming) {
    content = <p className="o-empty"><Loader2 size={18} className="spin" /> Resuming your application…</p>;
  } else {
    content = (
      <form onSubmit={onSubmit} noValidate className="w-form">
        <div className="w-body">
          {body()}
          {formError && <p className="o-alert" role="alert">{formError}</p>}
        </div>
        <div className="w-foot">
          {step > 1
            ? <button type="button" className="ob-btn ob-btn-outline" disabled={busy} onClick={() => goTo((step - 1) as StepNo)}><ArrowLeft size={16} /> Back</button>
            : <span />}
          <button type="submit" className="ob-btn ob-btn-primary" disabled={busy}>
            {busy
              ? <><Loader2 size={16} className="spin" /> {step < 4 ? 'Saving…' : 'Submitting…'}</>
              : step < 4 ? <>Next <ArrowRight size={16} /></> : <>Submit application <ArrowRight size={16} /></>}
          </button>
        </div>
      </form>
    );
  }

  const confirm = confirmClose && (
    <div className="w-confirm-bg" role="alertdialog" aria-labelledby="w-confirm-title">
      <div className="w-confirm">
        <h3 id="w-confirm-title">Close without saving this step?</h3>
        <p>The changes on this step could not be saved yet. Earlier steps are already saved as a draft.</p>
        <div className="row o-center">
          <button type="button" className="ob-btn ob-btn-outline" onClick={() => setConfirmClose(false)}>Keep editing</button>
          <button type="button" className="ob-btn ob-btn-danger" onClick={onClose}>Discard &amp; close</button>
        </div>
      </div>
    </div>
  );

  if (variant === 'modal') {
    return (
      <div className="w-bg" onMouseDown={(e) => { if (e.target === e.currentTarget) void requestClose(); }}>
        <div className="w-dialog" role="dialog" aria-modal="true" aria-labelledby="w-title" ref={dialog} onKeyDown={trap}>
          {header}
          {content}
          {confirm}
        </div>
      </div>
    );
  }
  return (
    <div className={`w-split${done ? '' : ' has-preview'}`}>
      <div className="w-dialog w-inline" ref={dialog}>
        {header}
        {content}
      </div>
      {!done && (
        <ClinicPreview
          d={{
            clinicName: v.clinic_name,
            clinicType: v.clinic_type,
            facilities: v.facilities.map((f) => f.facility_name),
            contactName: v.contact_person,
            isDoctor: v.contact_is_doctor,
            planName: plan.name,
          }}
        />
      )}
    </div>
  );
}
