import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextCoreWebVitals,
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'next-env.d.ts'],
  },
  {
    rules: {
      // React Compiler advisory rules: the flagged patterns (reset state when a modal opens, read
      // localStorage after mount, window.location for full-page jumps) are intentional here.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/refs': 'warn',
      // Plain <a href> is used on purpose for [data-onboard] buttons (the onboarding provider
      // intercepts the click) and for full-page navigation; next/link would fight that.
      '@next/next/no-html-link-for-pages': 'warn',
    },
  },
];

export default config;
