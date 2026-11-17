'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Loader2, Search } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { ApiError, api } from './api/onboarding';
import type { PublicStatus } from './api/onboarding';
import ProgressTracker from './ProgressTracker';

/**
 * Body of the "Track your application" popup: reference number + the email used to apply, then the same pipeline the
 * applicant saw after submitting. Rendered inside the modal by OnboardProvider.
 */
export default function StatusPanel({ onApply }: { onApply: () => void }) {
  const [ref, setRef] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [found, setFound] = useState<PublicStatus | null>(null);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const ready = ref.trim().length >= 4 && emailOk;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!ready || busy) return;
    setBusy(true);
    setError('');
    setFound(null);
    try {
      const res = await api.status(ref.trim().toUpperCase(), email.trim());
      setFound(res);
      trackEvent('onboarding_status_check', { status: res.status });
    } catch (err) {
      setError(err instanceof ApiError && err.statusCode === 404
        ? "We couldn't find an application with those details. Check the reference number and the email you applied with."
        : 'We could not check the status right now. Please try again in a moment.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="st-wrap st-modal" style={{ margin: 0, maxWidth: 'none' }}>
      <p className="lead">Enter the reference number from your confirmation email.</p>

      <form className="st-card" onSubmit={(e) => void submit(e)} noValidate>
        <label>
          <span>Reference number</span>
          <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="e.g. ONB-20261103-7KQ2X" autoComplete="off" spellCheck={false} autoFocus />
        </label>
        <label>
          <span>Email used to apply</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@yourclinic.in" autoComplete="email" />
          {email && !emailOk && <small className="st-err">Enter a valid email address.</small>}
        </label>
        <button type="submit" className="ob-btn ob-btn-primary" disabled={!ready || busy}>
          {busy ? <Loader2 size={16} className="spin" /> : <Search size={16} />} {busy ? 'Checking…' : 'Check status'}
        </button>
        {error && <p className="st-fail" role="alert">{error}</p>}
      </form>

      {found && (
        <div className="st-result" aria-live="polite">
          <div className="st-head">
            <div><small>Clinic</small><b>{found.clinic_name}</b></div>
            <div><small>Reference</small><b className="mono">{found.reference_number}</b></div>
            <div><small>Status</small><b>{found.status}</b></div>
          </div>
          <ProgressTracker requestId={found.request_id} initial={found.status} />
        </div>
      )}

      <p className="st-foot">Haven&apos;t applied yet? <a href="#" onClick={(e) => { e.preventDefault(); onApply(); }}>Start an application <ArrowRight size={14} /></a></p>
    </div>
  );
}
