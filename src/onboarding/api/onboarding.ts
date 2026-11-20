/**
 * Typed client for the open clinic-onboarding API
 * (`<backend origin from .env>/authorization-service/authorization/onboarding`).
 * The backend always answers HTTP 200 with `{ statusCode, message, data?, errors? }`,
 * so failures are detected from `statusCode` in the body. No auth headers are sent.
 * With NEXT_PUBLIC_USE_MOCK=true (or no backend address for the chosen network) a localStorage-backed mock is used so the UI can be demoed.
 */

import { plans as sitePlans } from '../data';
import { API_ORIGIN, IS_MOCK, ONBOARDING_API_PATH } from '../config';

export const STATUSES = [
  'Submitted', 'Under Review', 'Changes Requested', 'Approved',
  'Provisioning', 'Active', 'Provisioning Failed', 'Rejected',
] as const;
export type Status = (typeof STATUSES)[number];


export type PlanCode = 'free' | 'standard' | 'custom';
export type BillingCycle = 'monthly' | 'annual';

export interface Facility { facility_id: string; facility_name: string }
export interface Plan {
  code: PlanCode;
  name: string;
  price_label: string;
  price_monthly: number | null;
  blurb: string;
  features: string[];
  max_facilities: number | null;
}
/** Billing contact only: no card or bank details are ever collected. */
export interface Billing {
  same_as_contact: boolean;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  tax_id: string;
}

export interface RequestFields {
  clinic_name: string;
  clinic_code?: string;
  clinic_type: string;
  /** Same value as clinic_name: the clinic name is the tenant name. */
  preferred_tenant_name: string;
  contact_person: string;
  /** The contact person (clinic admin) also sees patients: gets the Doctor role and a doctor profile. */
  contact_is_doctor?: boolean;
  email_id: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  number_of_providers: number;
  clinic_registration_id: string;
  additional_info?: string;
  facilities?: Facility[];
  consent: boolean;
  plan_code?: PlanCode;
  plan_name?: string;
  billing_cycle?: BillingCycle;
  billing?: Billing;
}
export interface SubmitPayload extends RequestFields {
  idempotency_key: string;
  /** Draft id, when the application was started as a draft. */
  request_id?: string;
  clinic_code: string;
  plan_code: PlanCode;
  billing_cycle: BillingCycle;
  billing: Billing;
}
export interface SubmitResult { request_id: string; reference_number: string; status: Status }

/** Wizard draft: each step posts its own fields (flat, e.g. billing_name) plus plan_code. */
export type DraftData = Record<string, unknown>;
export interface DraftPayload {
  request_id?: string;
  step: 1 | 2 | 3 | 4;
  data: DraftData;
  /** Validate formats only and skip "required" checks: used when the user closes the wizard mid-step. */
  partial?: boolean;
}
export interface DraftSave { request_id: string; status: 'Draft'; last_step: number }
export interface DraftInfo { request_id: string; status: string; last_step: number; plan_code: PlanCode; data: DraftData }

export interface Availability {
  email_available: boolean;
  phone_available: boolean;
  tenant_name_available: boolean;
  clinic_code_available: boolean;
}
export interface AvailabilityQuery {
  email_id?: string;
  phone?: string;
  tenant_name?: string;
  clinic_code?: string;
  /** Draft id, so an applicant never clashes with their own draft. */
  request_id?: string;
}



export interface RequestRecord extends RequestFields {
  request_id: string;
  reference_number: string;
  status: Status;
  submitted_at: string;
  updated_at: string;
}
/** Public applicant status (no per-step detail). */
export interface PublicStatus { request_id: string; reference_number: string; clinic_name: string; status: Status; note?: string; reason?: string }
export interface HistoryItem{ status: Status; by: string; at: string; note?: string }

/** "Contact us" enquiry for the Custom plan. */
export interface ContactPayload { name: string; email_id: string; phone: string; organisation: string; facilities: string; message: string }

export class ApiError extends Error {
  errors: Record<string, string>;
  /** Backend statusCode from the response body (undefined for network failures). */
  statusCode?: number;
  constructor(message: string, errors: Record<string, string> = {}, statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

/* ------------------------------------------------------------------ real client */

// The backend origin, network and demo-mode switch are decided in src/lib/config.ts (from .env).
const BASE = API_ORIGIN ? `${API_ORIGIN}${ONBOARDING_API_PATH}` : '';
export const isMock = IS_MOCK;

interface Envelope<T> { statusCode: number; message?: string; data?: T; errors?: Record<string, string> }

async function http<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  let json: Envelope<T>;
  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    json = (await res.json()) as Envelope<T>;
  } catch {
    throw new ApiError('Could not reach the server. Please check your connection and try again.');
  }
  if (json.statusCode >= 400) throw new ApiError(json.message ?? 'Request failed', json.errors, json.statusCode);
  return json.data as T;
}

function qs(o: Record<string, string | number | undefined>): string {
  const p = new URLSearchParams();
  Object.entries(o).forEach(([k, v]) => {
    if (v !== undefined && v !== '') p.set(k, String(v));
  });
  const s = p.toString();
  return s ? `?${s}` : '';
}
const enc = encodeURIComponent;

/* The wizard keeps billing as flat fields (billing_name, billing_email, ... and tax_id); the API wants one `billing` object. */
const BILLING_FIELDS = ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode'] as const;
const FLAT_BILLING_KEYS = ['same_as_contact', 'tax_id', ...BILLING_FIELDS.map((f) => `billing_${f}`)];

function billingToApi(data: DraftData): DraftData {
  if (!FLAT_BILLING_KEYS.some((k) => k in data)) return data;
  const out: DraftData = {};
  Object.keys(data).forEach((k) => { if (!FLAT_BILLING_KEYS.includes(k)) out[k] = data[k]; });
  const text = (k: string) => (typeof data[k] === 'string' ? (data[k] as string) : '');
  const billing: Record<string, unknown> = { same_as_contact: data.same_as_contact === true, tax_id: text('tax_id') };
  BILLING_FIELDS.forEach((f) => { billing[f] = text(`billing_${f}`); });
  out.billing = billing;
  return out;
}

function billingFromApi(data: DraftData): DraftData {
  const b = data.billing;
  if (typeof b !== 'object' || b === null) return data;
  const src = b as Record<string, unknown>;
  const out: DraftData = {};
  Object.keys(data).forEach((k) => { if (k !== 'billing') out[k] = data[k]; });
  out.same_as_contact = src.same_as_contact === true;
  out.tax_id = typeof src.tax_id === 'string' ? src.tax_id : '';
  BILLING_FIELDS.forEach((f) => { out[`billing_${f}`] = typeof src[f] === 'string' ? src[f] : ''; });
  return out;
}

const real = {
  plans: () => http<{ plans: Plan[] }>('/plans').then((r) => r.plans),
  facilities: () => http<{ facilities: Facility[] }>('/facilities').then((r) => r.facilities),
  saveDraft: (p: DraftPayload) => http<DraftSave>('/draft', 'POST', { ...p, data: billingToApi(p.data) }),
  getDraft: (id: string) => http<DraftInfo>(`/draft/${enc(id)}`).then((d) => ({ ...d, data: billingFromApi(d.data) })),
  submit: (p: SubmitPayload) => http<SubmitResult>('/submit', 'POST', p),
  checkAvailability: (q: AvailabilityQuery) => http<Availability>(`/check-availability${qs({ ...q })}`),
  contact: (p: ContactPayload) => http<{ enquiry_id: string; reference?: string }>('/contact', 'POST', p),
  status: (id: string, email?: string) => http<PublicStatus>(`/status/${enc(id)}${email ? qs({ email_id: email }) : ''}`),
};

export type OnboardingApi = typeof real;

/* ------------------------------------------------------------------ mock client */

interface MockDraft { request_id: string; plan_code: PlanCode; last_step: number; data: DraftData }

interface MockDb {
  seq: number;
  requests: Record<string, RequestRecord>;
  history: Record<string, HistoryItem[]>;
  idem: Record<string, SubmitResult>;
  drafts: Record<string, MockDraft>;
}

const KEY = 'clinic-onboard-mock-v2';

const PLAN_META: Record<PlanCode, { price_monthly: number | null; max_facilities: number | null }> = {
  free: { price_monthly: 0, max_facilities: 1 },
  standard: { price_monthly: 100, max_facilities: 5 },
  custom: { price_monthly: null, max_facilities: null },
};

/** Same plans as the landing page pricing cards, with the limits the backend would enforce. */
function catalog(): Plan[] {
  return sitePlans.map((p) => {
    const code = p.name.toLowerCase() as PlanCode;
    return { code, name: p.name, price_label: p.price, ...PLAN_META[code], blurb: p.blurb, features: p.features };
  });
}

/** Built-in plan list: the wizard shows it instantly and uses it if GET /plans cannot be reached. */
export function localPlans(): Plan[] {
  return catalog();
}

const MOCK_FACILITIES: Facility[] = [
  ['fac-opd', 'General OPD'], ['fac-lab', 'Laboratory'], ['fac-rad', 'Radiology'], ['fac-pha', 'Pharmacy'],
  ['fac-ipd', 'Inpatient Ward'], ['fac-er', 'Emergency'], ['fac-den', 'Dental'], ['fac-phy', 'Physiotherapy'],
].map(([facility_id, facility_name]) => ({ facility_id, facility_name }));
const ago = (days: number) => new Date(Date.now() - days * 864e5).toISOString();
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function save(db: MockDb) {
  try { localStorage.setItem(KEY, JSON.stringify(db)); } catch { /* storage unavailable */ }
}

function addRequest(
  db: MockDb,
  f: Pick<RequestRecord, 'clinic_name' | 'clinic_type' | 'status' | 'contact_person' | 'email_id'>,
  daysAgo: number,
  extra: Partial<RequestRecord> = {},
): string {
  db.seq += 1;
  const n = String(db.seq).padStart(4, '0');
  const id = `req-${n}`;
  db.requests[id] = {
    request_id: id,
    reference_number: `ONB-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(n).padStart(5, '0')}`, // same shape as the backend: ONB-YYYYMMDD-XXXXX
    preferred_tenant_name: f.clinic_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    clinic_code: f.clinic_name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5) + String(db.seq),
    plan_code: 'standard',
    plan_name: 'Standard',
    billing_cycle: 'monthly',
    facilities: [MOCK_FACILITIES[0], MOCK_FACILITIES[1]],
    billing: {
      same_as_contact: true, name: f.contact_person, email: f.email_id, phone: '9876543210',
      address: '12 Health Street', city: 'Dehradun', state: 'Uttarakhand', pincode: '248001', tax_id: '',
    },
    phone: '9876543210',
    address: '12 Health Street',
    city: 'Dehradun',
    state: 'Uttarakhand',
    pincode: '248001',
    number_of_providers: 5,
    clinic_registration_id: `REG-${1000 + db.seq}`,
    consent: true,
    submitted_at: ago(daysAgo),
    updated_at: ago(daysAgo),
    ...f,
    ...extra,
  };
  db.history[id] = [{ status: 'Submitted', by: 'applicant', at: ago(daysAgo) }];
  return id;
}

function seed(): MockDb {
  return { seq: 0, requests: {}, history: {}, idem: {}, drafts: {} };
}

function load(): MockDb {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const db = JSON.parse(raw) as MockDb;
      db.drafts ??= {};
      return db;
    }
  } catch { /* fall through to a fresh seed */ }
  const db = seed();
  save(db);
  return db;
}

function move(db: MockDb, id: string, status: Status, by: string, note?: string) {
  db.requests[id].status = status;
  db.requests[id].updated_at = new Date().toISOString();
  db.history[id].push({ status, by, at: new Date().toISOString(), ...(note ? { note } : {}) });
}

const s = (d: DraftData, k: string): string => (typeof d[k] === 'string' ? (d[k] as string).trim() : '');

/** Server-style validation of one wizard step (what POST /draft does), using flat field names. */
function mockStepErrors(step: number, d: DraftData, planCode: PlanCode, partial = false): Record<string, string> {
  const all = mockStepErrorsFull(step, d, planCode);
  if (!partial) return all;
  // partial save: keep only format problems of fields that actually have a value
  const filled = (k: string) => (Array.isArray(d[k]) ? (d[k] as unknown[]).length > 0 : s(d, k) !== '' && s(d, k) !== '0' && d[k] !== 0);
  return Object.fromEntries(Object.entries(all).filter(([k]) => filled(k)));
}

function mockStepErrorsFull(step: number, d: DraftData, planCode: PlanCode): Record<string, string> {
  const e: Record<string, string> = {};
  const need = (k: string, msg: string) => { if (!s(d, k)) e[k] = msg; };
  const plan = catalog().find((p) => p.code === planCode) ?? catalog()[1];
  if (step === 1) {
    need('clinic_name', 'Enter the clinic name.');
    need('clinic_type', 'Choose a clinic type.');
    if (!/^[A-Za-z0-9]{3,10}$/.test(s(d, 'clinic_code'))) e.clinic_code = 'Use 3–10 letters or digits.';
    const f = Array.isArray(d.facilities) ? d.facilities : [];
    if (!f.length) e.facilities = 'Select at least one facility.';
    else if (plan.max_facilities !== null && f.length > plan.max_facilities) {
      e.facilities = `The ${plan.name} plan includes up to ${plan.max_facilities} ${plan.max_facilities === 1 ? 'facility' : 'facilities'}.`;
    }
    if (!(Number(d.number_of_providers) >= 1)) e.number_of_providers = 'Select the number of providers.';
  }
  if (step === 2) {
    need('contact_person', 'Enter the contact person.');
    need('address', 'Enter the street address.');
    need('city', 'Enter the city.');
    need('state', 'Enter the state.');
    need('pincode', 'Enter the PIN / postal code.');
    need('clinic_registration_id', 'Enter the MCI Number.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s(d, 'email_id'))) e.email_id = 'Enter a valid email address.';
    if (s(d, 'phone').replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number.';
  }
  if (step === 3 && planCode === 'standard') {
    need('billing_name', 'Enter the billing contact name.');
    need('billing_address', 'Enter the billing address.');
    need('billing_city', 'Enter the billing city.');
    need('billing_state', 'Enter the billing state.');
    need('billing_pincode', 'Enter the billing PIN / postal code.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s(d, 'billing_email'))) e.billing_email = 'Enter a valid billing email.';
  }
  return e;
}

const flatten = (p: SubmitPayload): DraftData => ({
  ...p,
  billing_name: p.billing.name, billing_email: p.billing.email, billing_phone: p.billing.phone,
  billing_address: p.billing.address, billing_city: p.billing.city, billing_state: p.billing.state, billing_pincode: p.billing.pincode,
});

const mock: OnboardingApi = {
  async plans() {
    await wait(200);
    return catalog();
  },

  async facilities() {
    await wait(500);
    return MOCK_FACILITIES;
  },

  async saveDraft(p) {
    await wait(350);
    const db = load();
    const prev = p.request_id ? db.drafts[p.request_id] : undefined;
    const plan_code = (p.data.plan_code as PlanCode | undefined) ?? prev?.plan_code ?? 'standard';
    const data: DraftData = { ...prev?.data, ...p.data, plan_code };
    const errors = mockStepErrors(p.step, data, plan_code, p.partial);
    const live = Object.values(db.requests).filter((r) => r.status !== 'Changes Requested');
    if (p.step === 1 && !errors.clinic_code && s(data, 'clinic_code')) {
      const code = s(data, 'clinic_code').toUpperCase();
      const taken = live.some((r) => (r.clinic_code ?? '').toUpperCase() === code)
        || Object.values(db.drafts).some((d) => d.request_id !== prev?.request_id && s(d.data, 'clinic_code').toUpperCase() === code);
      if (taken) errors.clinic_code = 'This clinic code is already taken.';
    }
    if (p.step === 1 && s(data, 'clinic_name') && live.some((r) => r.preferred_tenant_name.toLowerCase() === s(data, 'clinic_name').toLowerCase())) {
      errors.clinic_name = 'This clinic name is already taken.';
    }
    if (p.step === 2 && !errors.email_id && s(data, 'email_id') && live.some((r) => r.email_id.toLowerCase() === s(data, 'email_id').toLowerCase())) {
      errors.email_id = 'This email is already registered.';
    }
    if (p.step === 2 && !errors.phone && s(data, 'phone') && live.some((r) => r.phone === s(data, 'phone'))) {
      errors.phone = 'This phone number is already registered.';
    }
    if (Object.keys(errors).length) throw new ApiError('Please fix the highlighted fields.', errors, 400);
    const request_id = prev?.request_id ?? `draft-${Math.random().toString(36).slice(2, 10)}`;
    const last_step = Math.max(prev?.last_step ?? 0, p.step);
    db.drafts[request_id] = { request_id, plan_code, last_step, data };
    save(db);
    return { request_id, status: 'Draft', last_step };
  },

  async getDraft(id) {
    await wait(250);
    const d = load().drafts[id];
    if (!d) throw new ApiError('Draft not found.', {}, 404);
    return { request_id: d.request_id, status: 'Draft', last_step: d.last_step, plan_code: d.plan_code, data: d.data };
  },

  async submit(p) {
    await wait(500);
    const db = load();
    if (db.idem[p.idempotency_key]) return db.idem[p.idempotency_key];
    const { idempotency_key, request_id: draftId, ...fields } = p;
    const all = Object.values(db.requests);
    const mine = all.find((r) => r.email_id.toLowerCase() === p.email_id.toLowerCase());
    const others = all.filter((r) => r !== mine);
    const errors: Record<string, string> = {};
    const flat = flatten(p);
    [1, 2, 3].forEach((n) => Object.assign(errors, mockStepErrors(n, flat, p.plan_code)));
    if (!p.consent) errors.consent = 'You must accept the declaration to continue.';
    if (mine && mine.status !== 'Changes Requested') errors.email_id = 'This email is already registered.';
    if (others.some((r) => r.phone === p.phone)) errors.phone = 'This phone number is already registered.';
    if (others.some((r) => r.preferred_tenant_name.toLowerCase() === p.preferred_tenant_name.toLowerCase())) errors.clinic_name = 'This clinic name is already taken.';
    if (others.some((r) => (r.clinic_code ?? '').toUpperCase() === p.clinic_code.toUpperCase())) errors.clinic_code = 'This clinic code is already taken.';
    if (Object.keys(errors).length) {
      // the real API reports billing fields as flat dotted keys ("billing.email")
      const dotted = Object.fromEntries(Object.entries(errors).map(([k, v]) => [k.startsWith('billing_') ? `billing.${k.slice(8)}` : k, v]));
      throw new ApiError('Please fix the highlighted fields.', dotted, 400);
    }

    const record = { ...fields, clinic_code: p.clinic_code.toUpperCase(), plan_name: catalog().find((x) => x.code === p.plan_code)?.name };
    let result: SubmitResult;
    if (mine) {
      // resubmission after "Changes Requested": same email, same request and reference
      Object.assign(db.requests[mine.request_id], record);
      move(db, mine.request_id, 'Submitted', 'applicant', 'Resubmitted with corrections');
      result = { request_id: mine.request_id, reference_number: mine.reference_number, status: 'Submitted' };
    } else {
      const id = addRequest(db, { clinic_name: p.clinic_name, clinic_type: p.clinic_type, status: 'Submitted', contact_person: p.contact_person, email_id: p.email_id }, 0, record);
      result = { request_id: id, reference_number: db.requests[id].reference_number, status: 'Submitted' };
    }
    if (draftId) delete db.drafts[draftId];
    db.idem[idempotency_key] = result;
    save(db);
    return result;
  },

  async checkAvailability(q) {
    await wait(250);
    // a request waiting for corrections may be resubmitted, so its own values still count as available
    const db = load();
    const all = Object.values(db.requests).filter((r) => r.status !== 'Changes Requested');
    const code = (q.clinic_code ?? '').toUpperCase();
    return {
      email_available: !q.email_id || !all.some((r) => r.email_id.toLowerCase() === q.email_id!.toLowerCase()),
      phone_available: !q.phone || !all.some((r) => r.phone === q.phone),
      tenant_name_available: !q.tenant_name || !all.some((r) => r.preferred_tenant_name.toLowerCase() === q.tenant_name!.toLowerCase()),
      clinic_code_available: !code
        || (!all.some((r) => (r.clinic_code ?? '').toUpperCase() === code)
          && !Object.values(db.drafts).some((d) => d.request_id !== q.request_id && s(d.data, 'clinic_code').toUpperCase() === code)),
    };
  },

  async contact() {
    await wait(300);
    const n = Math.random().toString(36).slice(2, 7).toUpperCase().padEnd(5, '0');
    return { enquiry_id: `enq-${n.toLowerCase()}`, reference: `ENQ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${n}` };
  },

  async status(id, email) {
    await wait(300);
    const db = load();
    const key = id.trim().toLowerCase();
    const r = db.requests[id] ?? Object.values(db.requests).find((x) => x.reference_number.toLowerCase() === key);
    // same answer for "no such application" and "wrong email", so a reference alone reveals nothing
    if (!r || (email && r.email_id && r.email_id.toLowerCase() !== email.trim().toLowerCase())) throw new ApiError('No application found for these details.', {}, 404);
    return { request_id: r.request_id, reference_number: r.reference_number, clinic_name: r.clinic_name, status: r.status };
  },
};

export const api: OnboardingApi = isMock ? mock : real;

/** Clears the mock data (demo helper). */
export function resetMock() {
  try { localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
}
