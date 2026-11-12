'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import emailjs from '@emailjs/browser';

/**
 * Browser-only startup work that used to live in index.js / App.js:
 *  - Bootstrap's JS (accordions, modals, collapse via data-bs-*)
 *  - AOS scroll animations
 *  - EmailJS init
 *  - the "clear caches once per session" behaviour
 */
export default function ClientInit() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');

    AOS.init({ duration: 800, once: true });

    emailjs.init('1jS0s7rCMLTiVJWK3');

    // --- legacy behaviour carried over from the CRA app (safe to delete if you no longer need it)
    if ('caches' in window) {
      caches.keys().then((names) => names.forEach((name) => caches.delete(name)));
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((r) => r.unregister()));
    }
    if (!sessionStorage.getItem('cacheCleared')) {
      localStorage.clear();
      sessionStorage.clear();
      sessionStorage.setItem('cacheCleared', 'true');
    }
  }, []);

  return null;
}
