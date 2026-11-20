'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Building2, Check, ChevronDown } from 'lucide-react';
import type { Plan, PlanCode } from './api/onboarding';

/** "Selected Plan" card that doubles as a dropdown: pick Free / Standard / Custom without leaving the step. */
export default function PlanPicker({ plans, current, price, onPick }: {
  plans: Plan[];
  current: Plan;
  price: string;
  onPick: (code: PlanCode) => void;
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);

  const toggle = () => { setHi(Math.max(0, plans.findIndex((p) => p.code === current.code))); setOpen((o) => !o); };
  const pick = (code: PlanCode) => { setOpen(false); if (code !== current.code) onPick(code); };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) { e.stopPropagation(); setOpen(false); return; }
    if (!open) { if (e.key === 'ArrowDown') { e.preventDefault(); toggle(); } return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((i) => (i + 1) % plans.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((i) => (i - 1 + plans.length) % plans.length); }
    else if (e.key === 'Enter') { e.preventDefault(); pick(plans[hi].code); }
  };

  return (
    <div className="w-pp" ref={root} onKeyDown={onKey}>
      <button type="button" className="w-plan w-pp-btn" aria-haspopup="listbox" aria-expanded={open} aria-label={`Selected plan: ${current.name}. Change plan`} onClick={toggle}>
        <span className="w-plan-icon"><Building2 size={22} /></span>
        <span className="w-pp-txt">
          <strong>Selected Plan</strong>
          <span>{current.name}</span>
        </span>
        <span className="w-plan-price">{price}</span>
        <ChevronDown size={18} className={`w-pp-caret${open ? ' on' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <ul className="w-pp-list" role="listbox" aria-label="Choose your plan">
          {plans.map((p, i) => (
            <li key={p.code} role="option" aria-selected={p.code === current.code} className={`w-pp-opt${i === hi ? ' hi' : ''}${p.code === current.code ? ' on' : ''}`}
              onMouseEnter={() => setHi(i)} onMouseDown={(e) => e.preventDefault()} onClick={() => pick(p.code)}>
              <span className="w-pp-name"><b>{p.name}</b><small>{p.code === 'custom' ? 'Talk to Our Team (Enquiry)' : p.blurb}</small></span>
              <em>{p.price_label}{p.price_monthly ? <i>/month</i> : null}</em>
              {p.code === current.code && <Check size={16} aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
