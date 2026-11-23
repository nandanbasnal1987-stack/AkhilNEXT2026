/**
 * Address and phone checks for the wizard (India).
 *  - phone: libphonenumber-js (small "min" metadata, loaded with the app)
 *  - states: fixed list of the 36 Indian states and union territories (ISO codes match country-state-city)
 *  - city suggestions: country-state-city, imported on demand once a state is chosen (it is ~2 MB gzipped)
 *  - PIN <-> state: pincodes-india (every district has a first/last PIN; a valid PIN always falls inside the range of its district)
 * Until the data is loaded the helpers only check the format and never reject a value they cannot judge.
 */
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';

export const PIN_RE_IN = /^[1-9][0-9]{5}$/;
export const CITY_RE = /^[A-Za-z][A-Za-z .'()-]{1,79}$/;

const STATES: Array<[string, string]> = [
  ['Andaman and Nicobar Islands', 'AN'], ['Andhra Pradesh', 'AP'], ['Arunachal Pradesh', 'AR'], ['Assam', 'AS'], ['Bihar', 'BR'],
  ['Chandigarh', 'CH'], ['Chhattisgarh', 'CT'], ['Dadra and Nagar Haveli and Daman and Diu', 'DH'], ['Delhi', 'DL'], ['Goa', 'GA'],
  ['Gujarat', 'GJ'], ['Haryana', 'HR'], ['Himachal Pradesh', 'HP'], ['Jammu and Kashmir', 'JK'], ['Jharkhand', 'JH'],
  ['Karnataka', 'KA'], ['Kerala', 'KL'], ['Ladakh', 'LA'], ['Lakshadweep', 'LD'], ['Madhya Pradesh', 'MP'],
  ['Maharashtra', 'MH'], ['Manipur', 'MN'], ['Meghalaya', 'ML'], ['Mizoram', 'MZ'], ['Nagaland', 'NL'],
  ['Odisha', 'OR'], ['Puducherry', 'PY'], ['Punjab', 'PB'], ['Rajasthan', 'RJ'], ['Sikkim', 'SK'],
  ['Tamil Nadu', 'TN'], ['Telangana', 'TG'], ['Tripura', 'TR'], ['Uttar Pradesh', 'UP'], ['Uttarakhand', 'UT'], ['West Bengal', 'WB'],
];
const ISO_OF: Record<string, string> = Object.fromEntries(STATES);

type Range = [number, number];
type District = { stateName: string; pincodeStart: string; pincodeEnd: string };

let rangesOf: Record<string, Range[]> | null = null;
let pinLoading: Promise<void> | null = null;
let cityLookup: ((iso: string) => string[]) | null = null;
let cityLoading: Promise<void> | null = null;

const norm = (s: string) => s.toUpperCase().replace(/\s+AND\s+/g, ' & ').replace(/\s+/g, ' ').trim();

/** State names in the PIN data that differ from the modern names. */
const PIN_DATA_NAMES: Record<string, string[]> = {
  [norm('Chhattisgarh')]: ['CHATTISGARH'],
  [norm('Puducherry')]: ['PONDICHERRY'],
  [norm('Ladakh')]: ['JAMMU & KASHMIR'],
  [norm('Dadra and Nagar Haveli and Daman and Diu')]: ['DAMAN & DIU', 'DADRA & NAGAR HAVELI'],
};

/** PIN ranges per state (about 1 MB, separate chunk). */
export function loadGeo(): Promise<void> {
  if (rangesOf) return Promise.resolve();
  pinLoading ??= import('pincodes-india').then((pin) => {
    const mod = pin as unknown as { districts?: District[]; default?: { districts?: District[] } };
    const districts = mod.districts ?? mod.default?.districts ?? [];
    const byLegacy: Record<string, Range[]> = {};
    districts.forEach((d) => {
      const r: Range = [Number(d.pincodeStart), Number(d.pincodeEnd)];
      if (Number.isFinite(r[0]) && Number.isFinite(r[1])) (byLegacy[norm(d.stateName)] ??= []).push(r);
    });
    const out: Record<string, Range[]> = {};
    STATES.forEach(([name]) => {
      const keys = PIN_DATA_NAMES[norm(name)] ?? [norm(name)];
      out[name] = keys.flatMap((k) => byLegacy[k] ?? []);
    });
    rangesOf = out;
  });
  return pinLoading;
}

/** City lists (large, separate chunk): loaded the first time a state is chosen. */
export function loadCities(): Promise<void> {
  if (cityLookup) return Promise.resolve();
  cityLoading ??= import('country-state-city').then((csc) => {
    const cache: Record<string, string[]> = {};
    cityLookup = (iso) => (cache[iso] ??= Array.from(new Set(csc.City.getCitiesOfState('IN', iso).map((c) => c.name))).sort((a, b) => a.localeCompare(b)));
  });
  return cityLoading;
}

export interface CountryInfo { name: string; iso: string; currency: string }
let countriesP: Promise<CountryInfo[]> | null = null;

/** All countries with their ISO code and currency (separate chunk, loaded on first use). India comes first. */
export function loadCountries(): Promise<CountryInfo[]> {
  countriesP ??= import('country-state-city').then((csc) => {
    const all = csc.Country.getAllCountries().map((c) => ({ name: c.name, iso: c.isoCode, currency: c.currency }));
    return [...all.filter((c) => c.iso === 'IN'), ...all.filter((c) => c.iso !== 'IN').sort((a, b) => a.name.localeCompare(b.name))];
  });
  return countriesP;
}

export interface World {
  states: (countryIso: string) => { name: string; iso: string }[];
  cities: (countryIso: string, stateIso: string) => string[];
}
let worldP: Promise<World> | null = null;

/** States and cities of every country (country-state-city, separate chunk, loaded on first use). */
export function loadWorld(): Promise<World> {
  worldP ??= import('country-state-city').then((csc) => {
    const st: Record<string, { name: string; iso: string }[]> = {};
    const ci: Record<string, string[]> = {};
    return {
      states: (iso) => (st[iso] ??= csc.State.getStatesOfCountry(iso).map((s) => ({ name: s.name, iso: s.isoCode })).sort((a, b) => a.name.localeCompare(b.name))),
      cities: (iso, stateIso) => (ci[iso + '-' + stateIso] ??= Array.from(new Set(csc.City.getCitiesOfState(iso, stateIso).map((c) => c.name))).sort((a, b) => a.localeCompare(b))),
    };
  });
  return worldP;
}

export interface PinHit { country: string; state: string; city: string; source: 'india' | 'us' }

const squash = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** An Indian PIN (6 digits): state and district from India Post data (india-post-pincode), city matched to country-state-city's list. */
async function pinIndia(pin: string): Promise<PinHit | null> {
  if (!/^\d{6}$/.test(pin)) return null;
  const { lookupPincode } = await import('india-post-pincode');
  const hit = lookupPincode(pin);
  if (!hit) return null;
  const csc = await import('country-state-city');
  const states = csc.State.getStatesOfCountry('IN');
  const want = squash(hit.state);
  const st = states.find((s) => squash(s.name) === want) ?? states.find((s) => squash(s.name).includes(want) || want.includes(squash(s.name)));
  const cities = st ? Array.from(new Set(csc.City.getCitiesOfState('IN', st.isoCode).map((c) => c.name))) : [];
  const d = squash(hit.district);
  const city = cities.find((c) => squash(c) === d) ?? cities.find((c) => d.startsWith(squash(c)) || squash(c).startsWith(d)) ?? hit.district;
  return { country: 'India', state: st?.name ?? hit.state, city, source: 'india' };
}

/** A US ZIP code (5 digits): city and state from the zipcodes package. */
async function pinUS(pin: string): Promise<PinHit | null> {
  if (!/^\d{5}$/.test(pin)) return null;
  const mod = await import('zipcodes');
  const z = (mod.default ?? (mod as unknown as typeof mod.default)).lookup(pin);
  if (!z) return null;
  const csc = await import('country-state-city');
  const st = csc.State.getStateByCodeAndCountry(z.state, 'US');
  return { country: 'United States', state: st?.name ?? z.state, city: z.city, source: 'us' };
}

/**
 * Looks a postal code up offline and returns the country, state and city it belongs to (India and the United States have data).
 * The applicant's current country is tried first; another country is only suggested when `allowSwitch` (the applicant has not chosen one by hand).
 */
export async function lookupPin(raw: string, country: string, allowSwitch: boolean): Promise<PinHit | null> {
  const pin = raw.replace(/\s+/g, '');
  const order: (() => Promise<PinHit | null>)[] = [];
  if (isIndia(country)) { order.push(() => pinIndia(pin)); if (allowSwitch) order.push(() => pinUS(pin)); }
  else if (country === 'United States') { order.push(() => pinUS(pin)); if (allowSwitch) order.push(() => pinIndia(pin)); }
  else if (allowSwitch) order.push(() => pinIndia(pin), () => pinUS(pin));
  for (const run of order) {
    try { const hit = await run(); if (hit) return hit; } catch { /* data not available: leave the fields as they are */ }
  }
  return null;
}

export const stateNames = (): string[] => STATES.map(([name]) => name);

export const citiesOf = (state: string): string[] => {
  const iso = ISO_OF[state];
  return cityLookup && iso ? cityLookup(iso) : [];
};

/** States whose PIN ranges contain this PIN (borders can give two). */
function statesOfPin(pin: string): string[] {
  if (!rangesOf) return [];
  const all = rangesOf;
  const n = Number(pin);
  return Object.keys(all).filter((s) => all[s].some(([a, b]) => n >= a && n <= b));
}

/** Returns an error text, or undefined when the PIN is fine (or cannot be judged yet). */
export const PIN_RE_OTHER = /^[A-Za-z0-9][A-Za-z0-9 -]{2,9}$/;
export const CITY_RE_OTHER = /^[\p{L}][\p{L}\p{M} .'()-]{1,79}$/u;

/** "India" (the default) uses the Indian rules; "Others" accepts any country's postal code, city and international phone number. */
export const isIndia = (country: string): boolean => (country || 'India') === 'India';

export function pinError(pin: string, state: string, country = 'India'): string | undefined {
  const p = pin.trim();
  if (!isIndia(country)) return PIN_RE_OTHER.test(p) ? undefined : 'Enter a valid postal code (3-10 letters or digits).';
  if (!PIN_RE_IN.test(p)) return 'Enter a valid 6-digit PIN code.';
  if (!rangesOf || !state) return undefined;
  const known = rangesOf[state];
  if (!known || !known.length) return undefined;
  const found = statesOfPin(p);
  if (found.includes(state)) return undefined;
  if (found.length) return `This PIN code is in ${found.slice(0, 2).join(' / ')}, not ${state}. Check the state or the PIN.`;
  // inside no district range (the data has small gaps, e.g. 110001): accept when its first two digits are used by the chosen state
  const prefixes = new Set(known.flatMap(([a, b]) => [String(a).slice(0, 2), String(b).slice(0, 2)]));
  return prefixes.has(p.slice(0, 2)) ? undefined : `This PIN code does not match ${state}. Check the state or the PIN.`;
}

export function cityError(city: string, country = 'India'): string | undefined {
  if (!isIndia(country)) return CITY_RE_OTHER.test(city.trim()) ? undefined : 'Enter a valid city name (letters only).';
  return CITY_RE.test(city.trim()) ? undefined : 'Enter a valid city name (letters only).';
}

/** Indian numbers may be typed with or without +91. */
export function phoneError(phone: string, country = 'India'): string | undefined {
  if (!isIndia(country)) {
    const t = phone.trim();
    const intl = parsePhoneNumberFromString(t);
    if (intl?.isValid()) return undefined;
    const digits = t.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15 && /^[+\d][\d\s().-]*$/.test(t) ? undefined : 'Enter a valid phone number with the country code, for example +1 415 555 0100.';
  }
  const parsed = parsePhoneNumberFromString(phone.trim(), 'IN');
  return parsed?.isValid() ? undefined : 'Enter a valid phone number, for example 98765 43210 or +91 98765 43210.';
}
