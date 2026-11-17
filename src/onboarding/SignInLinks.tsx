'use client';

import type { CSSProperties, ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';
import { APP_URL } from './config';

/**
 * "Login" opens the Augastam sign-in site in a new tab (NEXT_PUBLIC_<NETWORK>_APP_URL, see .env.example).
 * Not configured: it still shows on `npm run dev` (so the header can be checked) but does nothing, and in a
 * production build it is hidden instead of leading nowhere.
 */
export function LoginLink({ className, style, children = 'Login', source }: { className?: string; style?: CSSProperties; children?: ReactNode; source: string }) {
  if (!APP_URL && process.env.NODE_ENV === 'production') return null;
  return (
    <a
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', cursor: 'pointer', ...style }}
      href={APP_URL || '#'}
      target={APP_URL ? '_blank' : undefined}
      rel="noopener noreferrer"
      title={APP_URL ? 'Opens the sign-in page in a new tab' : 'Set NEXT_PUBLIC_DEMO_APP_URL (or the URL of your NETWORK) in .env.local'}
      onClick={(e) => { if (!APP_URL) e.preventDefault(); else trackEvent('login_click', { source }); }}
    >
      {children}
    </a>
  );
}
