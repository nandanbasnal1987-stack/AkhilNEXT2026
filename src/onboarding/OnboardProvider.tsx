'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';
import OnboardWizard from './OnboardWizard';
import StatusPanel from './StatusPage';
import { Modal } from './onboardUi';
import type { PlanCode } from './api/onboarding';
import './onboarding.css';

/**
 * Opens the 4-step clinic onboarding form (a modal) from any button on the site.
 *
 *   const { open } = useOnboard();   open('free', 'navbar')
 *
 * or, with no code at all, put an attribute on any element:  <a href="/contact" data-onboard="standard">Get Started</a>
 * (`data-onboard` with no value opens the form on the default plan; the href is the fallback if scripts fail).
 */

interface Ctx { open: (plan?: PlanCode, source?: string) => void; openStatus: (source?: string) => void }
const OnboardCtx = createContext<Ctx>({ open: () => {}, openStatus: () => {} });
export const useOnboard = () => useContext(OnboardCtx);

const PLANS: readonly string[] = ['free', 'standard', 'custom'];

export default function OnboardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ plan?: PlanCode; key: number } | null>(null);
  const [statusOpen, setStatusOpen] = useState(false);

  const open = useCallback((plan?: PlanCode, source = 'button') => {
    trackEvent('onboarding_open', { source, plan: plan ?? 'default' });
    setState((s) => ({ plan, key: (s?.key ?? 0) + 1 }));
  }, []);

  const openStatus = useCallback((source = 'button') => {
    trackEvent('onboarding_status_open', { source });
    setState(null);
    setStatusOpen(true);
  }, []);

  // any element with data-onboard opens the form; data-onboard-status opens the status popup
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as Element | null;
      const st = target?.closest?.('[data-onboard-status]');
      if (st) { e.preventDefault(); openStatus(st.getAttribute('data-onboard-source') || 'button'); return; }
      const el = target?.closest?.('[data-onboard]');
      if (!el) return;
      e.preventDefault();
      setStatusOpen(false);
      const v = el.getAttribute('data-onboard') ?? '';
      const text = (el.textContent ?? '').trim().slice(0, 40);
      open(PLANS.includes(v) ? (v as PlanCode) : undefined, el.getAttribute('data-onboard-source') || text || 'button');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open, openStatus]);

  const value = useMemo(() => ({ open, openStatus }), [open, openStatus]);

  return (
    <OnboardCtx.Provider value={value}>
      {children}
      {statusOpen && (
        <div className="ob-root">
          <Modal title="Track your application" onClose={() => setStatusOpen(false)}>
            <StatusPanel onApply={() => { setStatusOpen(false); open(undefined, 'status-popup'); }} />
          </Modal>
        </div>
      )}
      {state && (
        <div className="ob-root">
          <OnboardWizard key={state.key} variant="modal" initialPlan={state.plan} onClose={() => setState(null)} />
        </div>
      )}
    </OnboardCtx.Provider>
  );
}
