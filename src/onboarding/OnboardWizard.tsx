'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, KeyboardEvent as ReactKeyEvent, ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, Copy, Info, Loader2, Mail, X } from 'lucide-react';
import { ApiError, api } from './api/onboarding';
import type { AvailabilityQuery, BillingCycle, DraftData, Facility, Plan, PlanCode, Quote, SubmitPayload, SubmitResult } from './api/onboarding';
import { Field, useDebounced } from './onboardUi';
import ClinicPreview from './ClinicPreview';
import ProgressTracker from './ProgressTracker';
import { trackEvent } from '@/lib/analytics';
import PlanStep from './PlanStep';
import SearchSelect from './SearchSelect';
import FacilityPicker from './FacilityPicker';
import { cityError, citiesOf, isIndia, loadCities, loadCountries, loadGeo, lookupPin, phoneError, pinError, stateNames } from './geo';

/* ------------------------------------------------------------------ model */

interface Values {
  clinic_name: string;
  clinic_code: string;
  facilities: Facility[];
  clinic_type: string;
  contact_person: string;
  contact_is_doctor: boolean;
  email_id: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  /** India (default) or Others: Others turns State/City/PIN/phone into free text. */
  country: string;
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
  /** Coupon typed on the plan step, and the currency chosen there ('' = the country's own). */
  coupon_code: string;
  currency: string;
  consent: boolean;
}
type Errors = Partial<Record<keyof Values, string>>;
type TextKey = Exclude<{ [K in keyof Values]: Values[K] extends string ? K : never }[keyof Values], 'plan_code' | 'billing_cycle'>;
type StepNo = 1 | 2 | 3 | 4;

const EMPTY: Values = {
  clinic_name: '', clinic_code: '', facilities: [], clinic_type: '',
  contact_person: '', contact_is_doctor: true, email_id: '', phone: '', address: '', city: '', state: '', pincode: '', country: 'India',
  clinic_registration_id: '', additional_info: '',
  plan_code: 'standard', billing_cycle: 'monthly', same_as_contact: true,
  billing_name: '', billing_email: '', billing_phone: '', billing_address: '', billing_city: '', billing_state: '', billing_pincode: '', tax_id: '',
  coupon_code: '', currency: '',
  consent: false,
};

const STEP_FIELDS: Record<StepNo, (keyof Values)[]> = {
  1: ['clinic_name', 'clinic_code', 'facilities', 'clinic_type'],
  2: ['contact_person', 'contact_is_doctor', 'email_id', 'phone', 'address', 'city', 'state', 'pincode', 'country', 'clinic_registration_id', 'additional_info'],
  3: ['plan_code', 'billing_cycle', 'coupon_code', 'currency', 'same_as_contact', 'billing_name', 'billing_email', 'billing_phone', 'billing_address', 'billing_city', 'billing_state', 'billing_pincode', 'tax_id'],
  4: ['consent'],
};
const STEPS: StepNo[] = [1, 2, 3, 4];
/** Clinic Type options come only from the server (see fetchClinicTypes). */
const NO_OPTIONS: string[] = [];
/** Stands in for `plan` while the server has sent none, so the rest of the form never reads a missing plan. Never displayed. */
const NO_PLAN: Plan = { code: '', name: '', blurb: '', price_label: '', price_monthly: null, max_facilities: null, features: [] };
const TITLES = ['Clinic details', 'Contact & address', 'Billing', 'Review & confirm'] as const;
const STEP_OF = Object.fromEntries(
  STEPS.flatMap((s) => STEP_FIELDS[s].map((k) => [k, s])),
) as Record<keyof Values, StepNo>;


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
  if (c.length < 3) c = (c + 'CLI').slice(0, 3); // always a valid 3-10 character code
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
    else if (v.facilities.some((f) => !f.address?.address_line_1?.trim())) e.facilities = 'Add an address for every facility.';
    req('clinic_type', 'Select the clinic type.');
  }
  if (step === 2) {
    req('contact_person', 'Enter the contact person.');
    if (!v.email_id.trim()) e.email_id = 'Enter an email address.';
    else if (!EMAIL_RE.test(v.email_id.trim())) e.email_id = 'Enter a valid email address.';
    if (!v.phone.trim()) e.phone = 'Enter a phone number.';
    else e.phone = phoneError(v.phone, v.country);
    req('address', 'Enter the street address.');
    req('city', 'Enter the city.');
    if (!e.city) e.city = cityError(v.city, v.country);
    req('state', isIndia(v.country) ? 'Select the state.' : 'Enter the state / region.');
    if (!v.pincode.trim()) e.pincode = 'Enter the PIN / postal code.';
    else e.pincode = pinError(v.pincode, v.state.trim(), v.country);
    req('clinic_registration_id', 'Enter the registration / ID number.');
  }
  if (step === 3) {
    const must = !!plan.price_monthly;
    if (must) {
      req('billing_name', 'Enter the billing contact name.');
      req('billing_address', 'Enter the billing address.');
      req('billing_city', 'Enter the billing city.');
      req('billing_state', isIndia(v.country) ? 'Select the billing state.' : 'Enter the billing state / region.');
    }
    if (v.billing_city.trim() && !e.billing_city) e.billing_city = cityError(v.billing_city, v.country);
    if (must && !v.billing_email.trim()) e.billing_email = 'Enter the billing email.';
    else if (v.billing_email.trim() && !EMAIL_RE.test(v.billing_email.trim())) e.billing_email = 'Enter a valid email address.';
    if (must && !v.billing_pincode.trim()) e.billing_pincode = 'Enter the billing PIN / postal code.';
    else if (v.billing_pincode.trim()) e.billing_pincode = pinError(v.billing_pincode, v.billing_state.trim(), v.country);
    if (v.billing_phone.trim()) e.billing_phone = phoneError(v.billing_phone, v.country);
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
    return { ...base, clinic_name: t('clinic_name'), clinic_code: v.clinic_code, facilities: v.facilities, clinic_type: v.clinic_type };
  }
  if (step === 2) {
    return { ...base, contact_person: t('contact_person'), contact_is_doctor: v.contact_is_doctor, email_id: t('email_id'), phone: t('phone'), address: t('address'), city: t('city'), state: t('state'), pincode: t('pincode'), country: v.country, clinic_registration_id: t('clinic_registration_id'), additional_info: t('additional_info') };
  }
  if (step === 3) {
    return { ...base, billing_cycle: v.billing_cycle, coupon_code: v.coupon_code, currency: v.currency, same_as_contact: v.same_as_contact, billing_name: t('billing_name'), billing_email: t('billing_email'), billing_phone: t('billing_phone'), billing_address: t('billing_address'), billing_city: t('billing_city'), billing_state: t('billing_state'), billing_pincode: t('billing_pincode'), tax_id: t('tax_id') };
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
    else if (k === 'plan_code') o[k] = typeof x === 'string' && x ? x : 'standard';
    else if (k === 'billing_cycle') o[k] = x === 'annual' ? 'annual' : 'monthly';
    else o[k] = typeof x === 'string' ? x : typeof x === 'number' ? String(x) : '';
  });
  return out;
}

const snapshot = (step: StepNo, v: Values) => JSON.stringify(STEP_FIELDS[step].map((k) => v[k]));

/* ------------------------------------------------------------------ facility entry (new facilities, typed) */

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
  // Plans come ONLY from the server (GLOBALS type "plan"): nothing is shown from a built-in list. No plans = the plan step just offers "Contact us".
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansReady, setPlansReady] = useState(false);
  // The facility limit of a plan only applies once the applicant has actually picked one: by opening the form from a plan button, by choosing
  // on the billing step, or by coming back to a draft that already got that far. Until then the form does not mention or enforce a plan.
  const [planChosen, setPlanChosen] = useState(Boolean(initialPlan));
  useEffect(() => { if (step >= 3) setPlanChosen(true); }, [step]); // from the billing step on, the plan on show counts as the choice
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  // the price breakdown the plan step last showed (offers, coupon, total); used for the review step
  const [quote, setQuote] = useState<Quote | null>(null);
  // every country in the world (India first), loaded on demand; the form works with just India until it arrives
  const [countryNames, setCountryNames] = useState<string[]>(['India']);
  useEffect(() => {
    let live = true;
    loadCountries().then((all) => { if (live) setCountryNames(all.map((c) => c.name)); }).catch(() => { /* India only */ });
    return () => { live = false; };
  }, []);
  const [busy, setBusy] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [done, setDone] = useState<SubmitResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [avail, setAvail] = useState<Avail>({});
  const [geoTick, setGeoTick] = useState(0);
  useEffect(() => { let on = true; loadGeo().then(() => { if (on) setGeoTick((n) => n + 1); }).catch(() => { /* format checks still apply */ }); return () => { on = false; }; }, []);
  const anyState = v.state || v.billing_state;
  useEffect(() => { if (!anyState) return; let on = true; loadCities().then(() => { if (on) setGeoTick((n) => n + 1); }).catch(() => { /* suggestions are optional */ }); return () => { on = false; }; }, [anyState]);

  const plan = plans.find((p) => p.code === v.plan_code && p.price_monthly !== null) ?? plans.find((p) => p.price_monthly !== null) ?? NO_PLAN;
  const listedPlans = plans.filter((p) => p.price_monthly !== null);
  const noPlans = plansReady && listedPlans.length === 0;
  useEffect(() => {
    if (plansReady && listedPlans.length && !listedPlans.some((p) => p.code === v.plan_code)) setV((p) => ({ ...p, plan_code: (listedPlans.find((x) => x.price_monthly) ?? listedPlans[0]).code }));
  }, [plansReady, plans, v.plan_code]); // eslint-disable-line react-hooks/exhaustive-deps
  // a currency picked for one country should not follow the applicant to another
  const prevCountry = useRef(v.country);
  useEffect(() => {
    if (prevCountry.current !== v.country) { prevCountry.current = v.country; setV((p) => (p.currency ? { ...p, currency: '' } : p)); }
  }, [v.country]);
  const emailD = useDebounced(v.email_id.trim(), 600);
  const phoneD = useDebounced(v.phone.trim(), 600);
  const nameD = useDebounced(v.clinic_name.trim(), 600);
  const codeD = useDebounced(v.clinic_code, 600);
  const countryManual = useRef(false); // the applicant chose the country by hand: a PIN code will not switch it
  const codeBump = useRef(0); // how many times the (hidden) clinic code had to be changed because another clinic already uses it

  /* ---- data loading */

  // the Clinic Type list is GLOBALS type "doctor_speciality" and arrives a page at a time while the list is scrolled or searched (see SearchSelect); there is no built-in list, so with the server down the field stays empty
  const fetchClinicTypes = useCallback(
    (search: string, page: number, limit: number) => api.globalsPage('doctor_speciality', search, page, limit).then((r) => ({ items: r.items.map((x) => x.label), total: r.total })),
    [],
  );

  useEffect(() => {
    let live = true;
    api.plans().then((p) => { if (live) { setPlans(p); setPlansReady(true); } }).catch(() => { if (live) setPlansReady(true); });
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
        if (restored.country && restored.country !== 'India') countryManual.current = true;
        if (d.last_step >= 3) setPlanChosen(true);
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
    if (phoneD && !phoneError(phoneD, v.country)) q.phone = phoneD;
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
        // The clinic code is not an input on the form, so a taken code must never block the applicant: pick the next free variant (RC, RC2, RC3 ...).
        if (q.clinic_code && r.clinic_code_available === false && codeBump.current < 30) {
          codeBump.current += 1;
          const base = suggestCode(nameD);
          const tag = String(codeBump.current + 1);
          setV((p) => (p.clinic_code === q.clinic_code ? { ...p, clinic_code: `${base.slice(0, 10 - tag.length)}${tag}` } : p));
        }
      })
      .catch(() => { /* availability is a hint; saving and submitting still validate on the server */ });
    return () => { live = false; };
  }, [emailD, phoneD, nameD, codeD, draftId]);

  // A known PIN / postal code fills the country, state and city (India and the United States; offline data).
  const pinD = useDebounced(v.pincode, 350);
  useEffect(() => {
    const p = pinD.trim();
    if (!/^d{5,6}$/.test(p)) return undefined;
    let live = true;
    lookupPin(p, v.country, !countryManual.current).then((hit) => {
      if (!live || !hit) return;
      setV((prev) => (prev.pincode.trim() !== p ? prev : { ...prev, country: hit.country, state: hit.state, city: hit.city }));
    });
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinD]);

  const billPinD = useDebounced(v.billing_pincode, 350);
  useEffect(() => {
    const p = billPinD.trim();
    if (v.same_as_contact || !/^d{5,6}$/.test(p)) return undefined;
    let live = true;
    lookupPin(p, v.country, false).then((hit) => {
      if (!live || !hit) return;
      setV((prev) => (prev.billing_pincode.trim() !== p ? prev : { ...prev, billing_state: hit.state, billing_city: hit.city }));
    });
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billPinD]);

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
    // step 1 only enforces the plan's facility limit once a plan has been picked
    const e = check(s, v, s === 1 && !planChosen ? { ...plan, max_facilities: null } : plan);
    const dup: Errors = {};
    if (avail.email === false && emailD === v.email_id.trim()) dup.email_id = 'This email is already registered.';
    if (avail.phone === false && phoneD === v.phone.trim()) dup.phone = 'This phone number is already registered.';
    if (avail.name === false && nameD === v.clinic_name.trim()) dup.clinic_name = 'This clinic name is already taken.';
    (Object.keys(dup) as (keyof Values)[]).forEach((k) => { if (STEP_OF[k] === s && !e[k]) e[k] = dup[k]; });
    if (s === 3 && noPlans) e.plan_code = 'Please contact us to continue.';
    return e;
  }, [v, plan, planChosen, avail, emailD, phoneD, nameD, codeD, geoTick, noPlans]);

  const current = useMemo(() => stepErrors(step), [stepErrors, step]);
  const err = (k: keyof Values): string | undefined => serverErrors[k] ?? (showErrors || touched[k] ? current[k] : undefined);
  const okMsg = (k: keyof Values, flag: boolean | undefined, deb: string, cur: string): string | undefined =>
    !current[k] && !serverErrors[k] && flag === true && deb === cur ? 'Available' : undefined;

  const set = (k: TextKey) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setV((p) => {
      const next = { ...p, [k]: value };
      if (k === 'clinic_name' && !codeTouched.current) { next.clinic_code = suggestCode(value); codeBump.current = 0; }
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
    setPlanChosen(true);
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
    // the server found the (hidden) clinic code taken: change it and let the applicant press Next again
    let codeChanged = false;
    if (fields.clinic_code) {
      delete fields.clinic_code;
      codeBump.current += 1;
      const tag = String(codeBump.current + 1);
      const base = suggestCode(v.clinic_name);
      setV((p) => ({ ...p, clinic_code: `${base.slice(0, 10 - tag.length)}${tag}` }));
      codeChanged = true;
    }
    setServerErrors(fields);
    // say which value is wrong too: some keys (like the clinic code) are not an input on the form, so nothing would be highlighted
    const firstMsg = Object.values(e.errors)[0];
    setFormError(codeChanged && !Object.keys(fields).length ? 'We adjusted your clinic code because it was already in use. Please press Next again.' : firstMsg && e.statusCode === 400 && !e.message.includes(firstMsg) ? `${e.message} ${firstMsg}` : e.message);
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
      coupon_code: plan.price_monthly && v.coupon_code ? v.coupon_code : undefined,
      currency: v.currency || quote?.currency.code || undefined,
      clinic_name: t('clinic_name'),
      preferred_tenant_name: t('clinic_name'),
      clinic_code: v.clinic_code,
      facilities: v.facilities,
      clinic_type: v.clinic_type,
      contact_person: t('contact_person'),
      contact_is_doctor: v.contact_is_doctor,
      email_id: t('email_id'),
      phone: t('phone'),
      address: t('address'),
      city: t('city'),
      state: t('state'),
      pincode: t('pincode'),
      country: v.country,
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
    if (!isIndia(v.country)) {
      return input(k, { placeholder: 'State / province / region', autoComplete: k === 'state' ? 'address-level1' : 'off', maxLength: 80 });
    }
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
      {input(k, { placeholder: isIndia(v.country) ? 'Start typing, e.g. Dehradun' : 'City', autoComplete: k === 'city' ? 'address-level2' : 'off', maxLength: 80, list: isIndia(v.country) ? `w-cities-${k}` : undefined })}
      <datalist id={`w-cities-${k}`}>{(isIndia(v.country) ? citiesOf(v[stateKey]) : []).map((c) => <option key={c} value={c} />)}</datalist>
    </>
  );

  const limitHint = !plans.length ? undefined : plan.max_facilities === null
    ? `Unlimited facilities on the ${plan.name} plan.`
    : `Up to ${plan.max_facilities} ${plan.max_facilities === 1 ? 'facility' : 'facilities'} on ${plan.name}. You can change the plan on the billing step.`;

  const billingNeeded = !!plan.price_monthly;

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
          <div className="w-fields">
            <Field label="Clinic Name" htmlFor="w-clinic_name" required error={err('clinic_name')} ok={okMsg('clinic_name', avail.name, nameD, v.clinic_name.trim())}>
              {input('clinic_name', { placeholder: 'Enter clinic name', autoComplete: 'organization' })}
            </Field>
            {/* <Field label="Clinic Code" htmlFor="w-clinic_code" required error={err('clinic_code')} hint="3–10 letters or digits. Suggested from the clinic name; you can change it." ok={okMsg('clinic_code', avail.code, codeD, v.clinic_code)}>
              {input('clinic_code', { placeholder: 'Enter clinic code', maxLength: 10 })}
            </Field> */}
            <Field label="Facilities" htmlFor="w-facilities" required error={err('facilities')} hint={planChosen ? limitHint : undefined}>
              <FacilityPicker
                id="w-facilities"
                selected={v.facilities}
                max={planChosen ? plan.max_facilities : null}
                country={v.country}
                invalid={!!err('facilities')}
                onChange={(update) => { setV((p) => ({ ...p, facilities: update(p.facilities) })); if (serverErrors.facilities) setServerErrors((p) => ({ ...p, facilities: undefined })); }}
              />
            </Field>
            <Field label="Clinic Type" htmlFor="w-clinic_type" required error={err('clinic_type')}>
              <SearchSelect
                id="w-clinic_type"
                value={v.clinic_type}
                options={NO_OPTIONS}
                fetchPage={fetchClinicTypes}
                placeholder="Search or select clinic type"
                invalid={!!err('clinic_type')}
                onPick={(c) => { setV((p) => ({ ...p, clinic_type: c })); setTouched((p) => ({ ...p, clinic_type: true })); if (serverErrors.clinic_type) setServerErrors((p) => ({ ...p, clinic_type: undefined })); }}
                onBlur={() => setTouched((p) => ({ ...p, clinic_type: true }))}
              />
            </Field>
          </div>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <div className="w-fields w-grid">
            <Field label="Contact Person" htmlFor="w-contact_person" required error={err('contact_person')}>
              {input('contact_person', { placeholder: 'e.g. Dr. Asha Rawat', autoComplete: 'name' })}
            </Field>
            <Field label="Email" htmlFor="w-email_id" required error={err('email_id')} ok={okMsg('email_id', avail.email, emailD, v.email_id.trim())}>
              {input('email_id', { type: 'email', placeholder: 'e.g. admin@yourclinic.in', autoComplete: 'email', inputMode: 'email' })}
            </Field>
            <Field label="Phone" htmlFor="w-phone" required error={err('phone')} ok={okMsg('phone', avail.phone, phoneD, v.phone.trim())}>
              {input('phone', { type: 'tel', placeholder: isIndia(v.country) ? 'e.g. 98765 43210' : 'e.g. +1 415 555 0100', autoComplete: 'tel', inputMode: 'tel', maxLength: 20 })}
            </Field>
            <Field label="Country" htmlFor="w-country" required>
              <SearchSelect
                id="w-country"
                strict
                value={v.country}
                options={v.country && !countryNames.includes(v.country) ? [v.country, ...countryNames] : countryNames}
                placeholder="Search or select country"
                onPick={(c) => { countryManual.current = true; setV((p) => ({ ...p, country: c })); }}
              />
            </Field>
            <Field label="Registration / ID Number" htmlFor="w-clinic_registration_id" required error={err('clinic_registration_id')}>
              {input('clinic_registration_id', { placeholder: 'e.g. your clinic registration number', maxLength: 60 })}
            </Field>
            <Field label="Street Address" htmlFor="w-address" required full error={err('address')}>
              {input('address', { placeholder: 'e.g. 12, Rajpur Road, Near Clock Tower', autoComplete: 'street-address', maxLength: 250 })}
            </Field>
            <Field label="State" htmlFor="w-state" required error={err('state')}>{stateSelect('state')}</Field>
            <Field label="City" htmlFor="w-city" required error={err('city')}>{cityBox('city', 'state')}</Field>
            <Field label="PIN / Postal Code" htmlFor="w-pincode" required error={err('pincode')}>
              {input('pincode', isIndia(v.country) ? { placeholder: 'e.g. 248001', autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 6 } : { placeholder: 'Postal / ZIP code', autoComplete: 'postal-code', maxLength: 10 })}
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
          <PlanStep
            plans={plans}
            plansReady={plansReady}
            onContact={onContact}
            planError={err('plan_code')}
            planCode={v.plan_code}
            cycle={v.billing_cycle}
            country={v.country}
            currency={v.currency}
            couponCode={v.coupon_code}
            email={v.email_id.trim()}
            couponError={err('coupon_code')}
            notice={notice}
            onPlan={(code) => {
              trackEvent('plan_change', { from: plan.code, to: code });
              if (plans.find((p) => p.code === code)?.price_monthly === null && onContact) onContact(); else choosePlan(code);
            }}
            onCycle={(c) => setV((p) => ({ ...p, billing_cycle: c }))}
            onCurrency={(code) => setV((p) => ({ ...p, currency: code }))}
            onCoupon={(code) => { setV((p) => ({ ...p, coupon_code: code })); if (serverErrors.coupon_code) setServerErrors((p) => ({ ...p, coupon_code: undefined })); }}
            onQuote={setQuote}
          />

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

    return (
      <>
        {sumCard(1, [
          ['Clinic name', v.clinic_name.trim()], ['Clinic code', v.clinic_code], ['Clinic type', v.clinic_type],
          ['Facilities', v.facilities.map((f) => [f.facility_name, [f.address?.address_line_1, f.address?.city, f.address?.state, f.address?.pincode].filter(Boolean).join(', ')].filter(Boolean).join(' - ')).join('; ')],
        ])}
        {sumCard(2, [
          ['Contact person', v.contact_person.trim()], ['Also a doctor', v.contact_is_doctor ? 'Yes' : 'No'], ['Email', v.email_id.trim()], ['Phone', v.phone.trim()],
          ['Country', v.country], ['Address', [v.address, v.city, v.state, v.pincode].map((x) => x.trim()).filter(Boolean).join(', ')],
          ['Registration / ID', v.clinic_registration_id.trim()], ['Additional info', v.additional_info.trim()],
        ])}
        {sumCard(3, [
          ['Plan', quote && quote.plan.code === plan.code && plan.price_monthly ? `${plan.name} · ${v.billing_cycle === 'annual' ? 'Annual' : 'Monthly'} · ${quote.total_formatted}` : `${plan.name} · ${planPrice(plan, plan.price_monthly ? v.billing_cycle : 'monthly')}`],
          ['Offer', quote?.offers_applied.filter((o) => o.kind === 'festive').map((o) => o.label).join(', ') ?? ''],
          ['Coupon', quote?.offers_applied.find((o) => o.kind === 'coupon')?.code ?? ''],
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
      {!done && <p>Complete the form below to begin your clinic&apos;s onboarding process.</p>}
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
              : step < 4 ? <>Next </> : <>Submit application <ArrowRight size={16} /></>}
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
