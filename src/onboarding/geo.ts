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
export function pinError(pin: string, state: string): string | undefined {
  const p = pin.trim();
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

export function cityError(city: string): string | undefined {
  return CITY_RE.test(city.trim()) ? undefined : 'Enter a valid city name (letters only).';
}

/** Indian numbers may be typed with or without +91. */
export function phoneError(phone: string): string | undefined {
  const parsed = parsePhoneNumberFromString(phone.trim(), 'IN');
  return parsed?.isValid() ? undefined : 'Enter a valid phone number, for example 98765 43210 or +91 98765 43210.';
}
