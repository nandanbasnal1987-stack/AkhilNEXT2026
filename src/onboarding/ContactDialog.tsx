'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check, Loader2, X } from 'lucide-react';
import { ApiError, api } from './api/onboarding';
import { Field } from './onboardUi';
import { phoneError } from './geo';
import { trackEvent } from '@/lib/analytics';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Values { name: string; email_id: string; phone: string; organisation: string; facilities: string; message: string }
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: '', email_id: '', phone: '', organisation: '', facilities: '', message: '' };

function check(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!v.email_id.trim()) e.email_id = 'Enter your email address.';
  else if (!EMAIL_RE.test(v.email_id.trim())) e.email_id = 'Enter a valid email address.';
  if (v.phone.trim()) e.phone = phoneError(v.phone);
  if (v.organisation.trim().length < 2) e.organisation = 'Enter your organisation name.';
  if (v.facilities.trim() && !/^[0-9]{1,5}$/.test(v.facilities.trim())) e.facilities = 'Enter a number, for example 12.';
  (Object.keys(e) as (keyof Values)[]).forEach((k) => { if (!e[k]) delete e[k]; });
  return e;
}

/** "Contact us" for the Custom plan: a short enquiry form, not the onboarding application. */
export default function ContactDialog({ onClose }: { onClose: () => void }) {
  const [v, setV] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [serverErrors, setServerErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [reference, setReference] = useState('');
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !busy) onClose(); };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => dialog.current?.querySelector<HTMLElement>('input')?.focus({ preventScroll: true }), 60);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); clearTimeout(t); };
  }, [busy, onClose]);

  const current = check(v);
  const err = (k: keyof Values) => serverErrors[k] ?? (showErrors || touched[k] ? current[k] : undefined);
  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    const value = e.target.value;
    setV((p) => ({ ...p, [k]: value }));
    if (serverErrors[k]) setServerErrors((p) => ({ ...p, [k]: undefined }));
  };
  const blur = (k: keyof Values) => () => setTouched((p) => ({ ...p, [k]: true }));
  const bind = (k: keyof Values) => ({ id: `c-${k}`, value: v[k], onChange: set(k), onBlur: blur(k), 'aria-invalid': err(k) ? true : undefined });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    setFormError('');
    if (Object.keys(current).length) {
      dialog.current?.querySelector<HTMLElement>('[data-invalid="true"] input, [data-invalid="true"] textarea')?.focus();
      return;
    }
    setBusy(true);
    try {
      const res = await api.contact({ ...v, name: v.name.trim(), email_id: v.email_id.trim(), phone: v.phone.trim(), organisation: v.organisation.trim(), facilities: v.facilities.trim(), message: v.message.trim() });
      setReference(res?.reference ?? '');
      trackEvent('generate_lead', { form: 'contact_enquiry', plan: 'custom', reference: res?.reference ?? '' });
      setSent(true);
    } catch (ex) {
      if (ex instanceof ApiError) {
        setServerErrors(ex.errors as Errors);
        setFormError(ex.message);
      } else setFormError('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-bg" onMouseDown={(e) => { if (e.target === e.currentTarget && !busy) onClose(); }}>
      <div className="w-dialog" role="dialog" aria-modal="true" aria-labelledby="c-title" ref={dialog}>
        <div className="w-head">
          <button type="button" className="ob-icon-btn w-x" aria-label="Close" onClick={onClose} disabled={busy}><X size={18} /></button>
          <h2 id="c-title">Contact us</h2>
          <p>Tell us about your network. Our team will get back to you about the Custom plan.</p>
        </div>

        {sent ? (
          <div className="w-done">
            <span className="o-done-icon"><Check size={34} /></span>
            <h3>Thank you</h3>
            <p className="o-lead">We have received your enquiry and sent a confirmation to <b>{v.email_id.trim()}</b>. Our team will contact you shortly.</p>
            {reference && <p className="o-lead">Your reference: <b>{reference}</b></p>}
            <div className="row o-center"><button type="button" className="ob-btn ob-btn-outline" onClick={onClose}>Close</button></div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="w-form">
            <div className="w-body">
              <div className="w-fields w-grid">
                <Field label="Your Name" htmlFor="c-name" required error={err('name')}>
                  <input {...bind('name')} placeholder="e.g. Dr. Asha Rawat" autoComplete="name" maxLength={100} />
                </Field>
                <Field label="Email" htmlFor="c-email_id" required error={err('email_id')}>
                  <input {...bind('email_id')} type="email" placeholder="e.g. admin@yourclinic.in" autoComplete="email" inputMode="email" maxLength={120} />
                </Field>
                <Field label="Phone (optional)" htmlFor="c-phone" error={err('phone')}>
                  <input {...bind('phone')} type="tel" placeholder="e.g. 98765 43210" autoComplete="tel" inputMode="tel" maxLength={20} />
                </Field>
                <Field label="Organisation" htmlFor="c-organisation" required error={err('organisation')}>
                  <input {...bind('organisation')} placeholder="e.g. Sunshine Healthcare Network" autoComplete="organization" maxLength={120} />
                </Field>
                <Field label="Number of Facilities (optional)" htmlFor="c-facilities" error={err('facilities')}>
                  <input {...bind('facilities')} placeholder="e.g. 12" inputMode="numeric" maxLength={5} />
                </Field>
                <Field label="How can we help? (optional)" htmlFor="c-message" full>
                  <textarea {...bind('message')} rows={4} maxLength={1000} placeholder="e.g. We run 12 hospitals and need a custom workflow and API access." />
                </Field>
              </div>
              {formError && <p className="o-alert" role="alert">{formError}</p>}
            </div>
            <div className="w-foot">
              <button type="button" className="ob-btn ob-btn-outline" disabled={busy} onClick={onClose}>Cancel</button>
              <button type="submit" className="ob-btn ob-btn-primary" disabled={busy}>
                {busy ? <><Loader2 size={16} className="spin" /> Sending…</> : <>Send enquiry <ArrowRight size={16} /></>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
