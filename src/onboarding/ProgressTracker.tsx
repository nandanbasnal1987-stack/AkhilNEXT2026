'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check, Loader2, PartyPopper, TriangleAlert } from 'lucide-react';
import { APP_URL } from './config';
import { api } from './api/onboarding';

/** The overall status the public API exposes, mapped onto the journey the applicant sees. */
const STAGES = [
  { key: 'Submitted', label: 'Received', copy: 'Your application is in the queue.' },
  { key: 'Under Review', label: 'In review', copy: 'Our team is checking your details.' },
  { key: 'Approved', label: 'Approved', copy: 'Approved. Your workspace is about to be built.' },
  { key: 'Provisioning', label: 'Building', copy: 'Copying ready-made forms, roles and facilities into your clinic…' },
  { key: 'Active', label: 'Ready', copy: 'Your workspace is live. Check your email for sign-in details.' },
] as const;

const POLL_MS = 15000;
type Info = { status: string; note?: string; reason?: string };

/** Polls the status of a submitted application and shows it as a pipeline. Stops once it is Active or Rejected. */
export default function ProgressTracker({ requestId, initial = 'Submitted' }: { requestId: string; initial?: string }) {
  const [info, setInfo] = useState<Info>({ status: initial });
  const [lost, setLost] = useState(false);

  useEffect(() => {
    let stop = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tick = async () => {
      try {
        const r = await api.status(requestId);
        if (stop) return;
        setInfo({ status: r.status, note: r.note, reason: r.reason });
        setLost(false);
        if (r.status === 'Active' || r.status === 'Rejected') return;
      } catch {
        if (!stop) setLost(true);
      }
      if (!stop) timer = setTimeout(() => void tick(), POLL_MS);
    };
    timer = setTimeout(() => void tick(), 1500);
    return () => { stop = true; if (timer) clearTimeout(timer); };
  }, [requestId]);

  const failed = info.status === 'Provisioning Failed';
  const changes = info.status === 'Changes Requested';
  const rejected = info.status === 'Rejected';
  const at = Math.max(0, STAGES.findIndex((s) => s.key === (failed ? 'Provisioning' : info.status)));
  const active = info.status === 'Active';

  return (
    <div className="pt" role="status" aria-live="polite">
      <ol className="pt-line">
        {STAGES.map((s, i) => {
          const done = i < at || active;
          const now = i === at && !active;
          return (
            <li key={s.key} className={`pt-st${done ? ' done' : ''}${now ? ' now' : ''}${now && failed ? ' bad' : ''}`}>
              <span className="pt-dot">
                {done ? <Check size={14} /> : now && !failed && !changes && !rejected ? <Loader2 size={14} className="spin" /> : i + 1}
              </span>
              <span className="pt-lab">{s.label}</span>
            </li>
          );
        })}
      </ol>

      {active && <p className="pt-msg ok"><PartyPopper size={16} /> {STAGES[4].copy}</p>}
      {active && APP_URL && (
        <a className="ob-btn ob-btn-primary ob-btn-sm pt-signin" href={APP_URL} target="_blank" rel="noreferrer">Open the sign-in page <ArrowRight size={14} /></a>
      )}
      {!active && !failed && !changes && !rejected && <p className="pt-msg">{STAGES[at].copy}</p>}
      {changes && <p className="pt-msg warn"><TriangleAlert size={16} /> We need a few changes.{info.note ? ` ${info.note}` : ''} Reopen your application from the same browser to update it.</p>}
      {rejected && <p className="pt-msg warn"><TriangleAlert size={16} /> This application was not approved.{info.reason ? ` ${info.reason}` : ''}</p>}
      {failed && <p className="pt-msg warn"><TriangleAlert size={16} /> Setup hit a snag. Our team has been alerted and will retry it for you.</p>}
      {lost && <small className="pt-lost">Reconnecting to check your latest status…</small>}
      {active && <span className="pt-confetti" aria-hidden>{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ ['--n' as string]: i }} />)}</span>}
    </div>
  );
}
