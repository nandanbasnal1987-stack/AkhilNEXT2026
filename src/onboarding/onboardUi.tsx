'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Check, X } from 'lucide-react';
import type { Status } from './api/onboarding';

export function useDebounced<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export function StatusBadge({ status }: { status: Status }) {
  return <span className="o-badge" data-s={status.toLowerCase().replace(/\s+/g, '-')}>{status}</span>;
}

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  ok?: string;
  full?: boolean;
  children: ReactNode;
}

export function Field({ label, htmlFor, required, error, hint, ok, full, children }: FieldProps) {
  return (
    <div className={`o-field${full ? ' full' : ''}${error ? ' invalid' : ''}`} data-invalid={error ? 'true' : undefined}>
      <label htmlFor={htmlFor}>{label}{required && <><i aria-hidden> *</i><span className="sr-only"> (required)</span></>}</label>
      {children}
      {error ? <small className="err" role="alert" id={`${htmlFor}-msg`}>{error}</small>
        : ok ? <small className="ok"><Check size={12} /> {ok}</small>
        : hint ? <small>{hint}</small> : null}
    </div>
  );
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);

  return (
    <div className="o-modal-bg" onMouseDown={onClose}>
      <div className="o-modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e) => e.stopPropagation()}>
        <div className="o-modal-head">
          <h3>{title}</h3>
          <button className="ob-icon-btn" aria-label="Close" onClick={onClose}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
