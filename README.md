# Akhil Systems – Next.js (App Router)

1. Copy your old `src/assets/images` -> `public/images` and `src/assets/videos` -> `public/videos`
2. Copy your real `.env` (see `.env.example`)
3. `npm install && npm run dev` (or `npm run build && npm start`)

Needs Node >= 20.9. Pages: `src/app/*/page.js` (metadata lives there), components: `src/views`, `src/components`.
`src/proxy.js` redirects wrong-cased URLs (/aboutus -> /Aboutus); on Next 15 or older rename it to `middleware.js` and export `middleware`.
