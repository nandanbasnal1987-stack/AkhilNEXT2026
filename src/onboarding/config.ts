/**
 * Settings of the clinic-onboarding form, read from `.env.local` (see `.env.example`). Only this file reads
 * `process.env` for onboarding. Next.js inlines literal `process.env.NEXT_PUBLIC_NAME` reads, so each variable is
 * spelled out (no computed lookups). Restart `npm run dev` or rebuild after a change.
 */

/** Same names as the backend's NETWORK variable. */
export const NETWORKS = ['DEV', 'TEST', 'DEMO', 'UAT', 'PROD'] as const;
export type Network = (typeof NETWORKS)[number];

const trim = (v: string | undefined) => (v ?? '').trim();
const noSlash = (v: string) => v.replace(/\/+$/, '');
/** A bare host such as `demo.augastam.com` gets `https://` in front. */
const withScheme = (v: string) => (v && !/^[a-z][a-z0-9+.-]*:\/\//i.test(v) ? `https://${v}` : v);

const raw = {
  NETWORK: trim(process.env.NEXT_PUBLIC_NETWORK).toUpperCase(),
  API_BASE_URL: trim(process.env.NEXT_PUBLIC_API_BASE_URL),
  DEV_BASE_URL: trim(process.env.NEXT_PUBLIC_DEV_BASE_URL),
  TEST_BASE_URL: trim(process.env.NEXT_PUBLIC_TEST_BASE_URL),
  DEMO_BASE_URL: trim(process.env.NEXT_PUBLIC_DEMO_BASE_URL),
  UAT_BASE_URL: trim(process.env.NEXT_PUBLIC_UAT_BASE_URL),
  PROD_BASE_URL: trim(process.env.NEXT_PUBLIC_PROD_BASE_URL),
  DEV_APP_URL: trim(process.env.NEXT_PUBLIC_DEV_APP_URL),
  TEST_APP_URL: trim(process.env.NEXT_PUBLIC_TEST_APP_URL),
  DEMO_APP_URL: trim(process.env.NEXT_PUBLIC_DEMO_APP_URL),
  UAT_APP_URL: trim(process.env.NEXT_PUBLIC_UAT_APP_URL),
  PROD_APP_URL: trim(process.env.NEXT_PUBLIC_PROD_APP_URL),
  APP_URL: trim(process.env.NEXT_PUBLIC_APP_URL),
  USE_MOCK: trim(process.env.NEXT_PUBLIC_USE_MOCK).toLowerCase() === 'true',
  CONTACT_EMAIL: trim(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
};

/** Route prefix of the open onboarding API on the backend (part of the backend's contract, not configurable). */
export const ONBOARDING_API_PATH = '/authorization-service/authorization/onboarding';

/** Which backend environment the form talks to. Unknown or missing values fall back to DEMO. */
export const NETWORK: Network = (NETWORKS as readonly string[]).includes(raw.NETWORK) ? (raw.NETWORK as Network) : 'DEMO';

/** Backend origin per network, from `NEXT_PUBLIC_<NETWORK>_BASE_URL`. Empty when not set. */
export const NETWORK_URLS: Record<Network, string> = {
  DEV: withScheme(raw.DEV_BASE_URL),
  TEST: withScheme(raw.TEST_BASE_URL),
  DEMO: withScheme(raw.DEMO_BASE_URL),
  UAT: withScheme(raw.UAT_BASE_URL),
  PROD: withScheme(raw.PROD_BASE_URL),
};

/** Where each backend listens on a developer machine (the same ports the backend uses per NETWORK). */
const LOCAL_BACKEND: Record<Network, string> = {
  DEV: 'http://localhost:5003',
  TEST: 'http://localhost:5002',
  DEMO: 'http://localhost:5001',
  UAT: 'http://localhost:5004',
  PROD: 'http://localhost:5006',
};

/**
 * Backend origin the browser calls. Order: NEXT_PUBLIC_API_BASE_URL (explicit override), the URL of the chosen
 * NETWORK, then the local port of that network, only while running `npm run dev`. Empty means demo mode.
 */
export const API_ORIGIN = raw.USE_MOCK
  ? ''
  : noSlash(withScheme(raw.API_BASE_URL) || NETWORK_URLS[NETWORK] || (process.env.NODE_ENV !== 'production' ? LOCAL_BACKEND[NETWORK] : ''));

/** Demo mode: applications stay in this browser (a localStorage mock) and never reach the backend. */
export const IS_MOCK = API_ORIGIN === '';

/** Sign-in site of the Augastam app per network (where an approved clinic logs in). Not the API. */
export const APP_URLS: Record<Network, string> = {
  DEV: withScheme(raw.DEV_APP_URL),
  TEST: withScheme(raw.TEST_APP_URL),
  DEMO: withScheme(raw.DEMO_APP_URL),
  UAT: withScheme(raw.UAT_APP_URL),
  PROD: withScheme(raw.PROD_APP_URL),
};
export const APP_URL = noSlash(withScheme(raw.APP_URL) || APP_URLS[NETWORK]);

export const COMPANY = {
  email: raw.CONTACT_EMAIL || 'sales@akhilsystems.com',
};
