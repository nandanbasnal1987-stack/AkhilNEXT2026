/**
 * Sends a Google Analytics 4 event. The gtag snippet is loaded in app/layout.js; until it is ready (or when it is
 * blocked by an ad blocker) this does nothing, so calling it can never break a page.
 *
 *   trackEvent('generate_lead', { source: 'navbar' })
 */
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, params);
  } catch {
    /* analytics must never throw */
  }
}
