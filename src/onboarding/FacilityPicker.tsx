'use client';

import { useEffect, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Building2, MapPin, Plus, Trash2 } from 'lucide-react';
import type { Facility } from './api/onboarding';
import { Field } from './onboardUi';
import SearchSelect from './SearchSelect';
import { cityError, loadCountries, loadWorld, lookupPin, pinError } from './geo';
import type { CountryInfo, World } from './geo';

interface Props {
  id: string;
  selected: Facility[];
  max: number | null;
  /** The clinic's country: where a new facility starts (it can be changed per facility). */
  country: string;
  invalid: boolean;
  onChange: (update: (current: Facility[]) => Facility[]) => void;
}

const lineOf = (f: Facility) => [f.address?.address_line_1, f.address?.city, f.address?.state, f.address?.pincode, f.address?.country].filter(Boolean).join(', ');

/**
 * The clinic's facilities are created at approval, so the applicant adds each one here with its name and address.
 * Country, state and city are searchable lists for every country (country-state-city); the Add button sits at the end of the form.
 */
export default function FacilityPicker({ id, selected, max, country, invalid, onChange }: Props) {
  const [name, setName] = useState('');
  const [addr, setAddr] = useState('');
  const [ctry, setCtry] = useState(country);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [ctryManual, setCtryManual] = useState(false); // the applicant picked the country by hand: a PIN will not change it
  const [fromPin, setFromPin] = useState(false);
  const [msg, setMsg] = useState('');
  const [countries, setCountries] = useState<CountryInfo[]>([]);
  const [world, setWorld] = useState<World | null>(null);

  useEffect(() => {
    let live = true;
    loadCountries().then((c) => { if (live) setCountries(c); }).catch(() => { /* free text below */ });
    loadWorld().then((w) => { if (live) setWorld(w); }).catch(() => { /* free text below */ });
    return () => { live = false; };
  }, []);

  // a facility starts in the clinic's country; follow it while nothing has been typed for this one
  useEffect(() => { if (!name && !addr && !state && !city && !pin) setCtry(country); }, [country]); // eslint-disable-line react-hooks/exhaustive-deps

  const full = max !== null && selected.length >= max;
  const info = countries.find((c) => c.name.toLowerCase() === ctry.toLowerCase());
  const states = useMemo(() => (world && info ? world.states(info.iso) : []), [world, info]);
  const stateInfo = states.find((s) => s.name.toLowerCase() === state.toLowerCase());
  const cities = useMemo(() => (world && info && stateInfo ? world.cities(info.iso, stateInfo.iso) : []), [world, info, stateInfo]);
  const countryNames = useMemo(() => (ctry && !countries.some((c) => c.name === ctry) ? [ctry, ...countries.map((c) => c.name)] : countries.map((c) => c.name)), [countries, ctry]);

  const clearMsg = () => { if (msg) setMsg(''); };

  // a PIN / postal code that is known fills the country, state and city by itself (India and the United States)
  const onPin = (value: string) => {
    setPin(value);
    clearMsg();
    setFromPin(false);
    const v = value.trim();
    if (!/^\d{5,6}$/.test(v)) return;
    lookupPin(v, ctry, !ctryManual).then((hit) => {
      if (!hit) return;
      setCtry(hit.country); setState(hit.state); setCity(hit.city); setFromPin(true);
    });
  };

  const add = () => {
    const nm = name.trim().replace(/\s+/g, ' ').slice(0, 80);
    if (!nm) { setMsg('Enter the facility name.'); return; }
    if (selected.some((f) => f.facility_name.toLowerCase() === nm.toLowerCase())) { setMsg(`"${nm}" is already added.`); return; }
    if (full) { setMsg('Plan limit reached.'); return; }
    const line = addr.trim().replace(/\s+/g, ' ').slice(0, 200);
    if (!line) { setMsg('Enter the address of this facility.'); return; }
    if (city.trim() && cityError(city, ctry)) { setMsg(cityError(city, ctry) as string); return; }
    if (pin.trim() && pinError(pin, state.trim(), ctry)) { setMsg(pinError(pin, state.trim(), ctry) as string); return; }
    onChange((cur) => [...cur, { facility_id: '', facility_name: nm, address: { address_line_1: line, city: city.trim(), state: state.trim(), pincode: pin.trim(), country: ctry } }]);
    setName(''); setAddr(''); setState(''); setCity(''); setPin(''); setMsg(''); setFromPin(false);
  };
  const remove = (n: string) => onChange((cur) => cur.filter((x) => x.facility_name !== n));
  const onEnter = (e: KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); add(); } };

  return (
    <div className="fp">
      {full ? (
        <p className="fp-full">You have added the {max} {max === 1 ? 'facility' : 'facilities'} your plan includes. Remove one to add another, or choose a bigger plan on the billing step.</p>
      ) : (
        <div className="fp-form">
          <div className="fp-head"><Building2 size={16} aria-hidden="true" /> Add a facility <span>{max === null ? `${selected.length} added` : `${selected.length} of ${max}`}</span></div>
          <div className="w-fields w-grid">
            <Field label="Facility name" htmlFor={id} required full>
              <input id={id} value={name} maxLength={80} placeholder="e.g. Sunrise Clinic, Sector 14" autoComplete="off" aria-invalid={invalid ? true : undefined}
                onChange={(e) => { setName(e.target.value); clearMsg(); }} onKeyDown={onEnter} />
            </Field>
            <Field label="Address" htmlFor={`${id}-addr`} required full>
              <input id={`${id}-addr`} value={addr} maxLength={200} placeholder="e.g. 12, Rajpur Road, Near Clock Tower" autoComplete="off"
                onChange={(e) => { setAddr(e.target.value); clearMsg(); }} onKeyDown={onEnter} />
            </Field>
            <Field label="Country" htmlFor={`${id}-country`}>
              <SearchSelect id={`${id}-country`} strict value={ctry} options={countryNames} placeholder="Search country"
                onPick={(c) => { setCtry(c); setCtryManual(true); setState(''); setCity(''); setPin(''); setFromPin(false); clearMsg(); }} />
            </Field>
            <Field label="State / Province" htmlFor={`${id}-state`}>
              {states.length ? (
                <SearchSelect id={`${id}-state`} strict value={state} options={states.map((s) => s.name)} placeholder="Search state"
                  onPick={(s) => { setState(s); setCity(''); clearMsg(); }} />
              ) : (
                <input id={`${id}-state`} value={state} maxLength={80} placeholder="State / province / region" autoComplete="off" onChange={(e) => { setState(e.target.value); setCity(''); }} onKeyDown={onEnter} />
              )}
            </Field>
            <Field label="City" htmlFor={`${id}-city`}>
              {cities.length ? (
                <SearchSelect id={`${id}-city`} value={city} options={cities} placeholder={state ? `Search a city in ${state}` : 'Search city'}
                  onPick={(c) => { setCity(c); clearMsg(); }} />
              ) : (
                <input id={`${id}-city`} value={city} maxLength={80} placeholder={state ? 'City' : 'Choose the state first, or type the city'} autoComplete="off" onChange={(e) => { setCity(e.target.value); clearMsg(); }} onKeyDown={onEnter} />
              )}
            </Field>
            <Field label="PIN / Postal code" htmlFor={`${id}-pin`}>
              <input id={`${id}-pin`} value={pin} maxLength={ctry === 'India' ? 6 : 10} placeholder={ctry === 'India' ? 'e.g. 248001' : 'Postal / ZIP code'} inputMode={ctry === 'India' ? 'numeric' : undefined} autoComplete="off"
                onChange={(e) => onPin(e.target.value)} onKeyDown={onEnter} />
              {fromPin && <small className="ok">Country, state and city filled from this PIN code. Change them if they are wrong.</small>}
            </Field>
          </div>
          {msg && <p className="fp-msg" role="alert">{msg}</p>}
          <div className="fp-actions">
            <button type="button" className="ob-btn ob-btn-primary ob-btn-sm" onClick={add}><Plus size={14} aria-hidden="true" /> Add facility</button>
          </div>
        </div>
      )}

      {selected.length > 0 && (
        <ul className="fp-list" aria-label="Facilities to create">
          {selected.map((f) => (
            <li key={f.facility_name.toLowerCase()}>
              <span className="fp-ico"><MapPin size={16} aria-hidden="true" /></span>
              <span className="fp-txt"><b>{f.facility_name}</b><small>{lineOf(f) || 'No address'}</small></span>
              <button type="button" className="fp-del" aria-label={`Remove ${f.facility_name}`} onClick={() => remove(f.facility_name)}><Trash2 size={15} /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
