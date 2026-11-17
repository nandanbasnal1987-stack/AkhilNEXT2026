import Script from 'next/script';
import DiwaliDecor from '@/components/diwali-decor/DiwaliDecor';

// CSS order matches the old index.js/App.js: site styles first, Bootstrap after.
import '@/styles/global.css';
import '@/styles/landing.css';
import '@/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';

import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BodyClassManager from '@/components/BodyClassManager';
import ClientInit from './ClientInit';
import OnboardProvider from '@/onboarding/OnboardProvider';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Akhil Systems - Healthcare IT Solutions',
  description:
    'Discover cutting-edge healthcare software solutions by Akhil Systems, specializing in hospital information systems (HIS) to enhance hospital management, patient care, and operational efficiency.',
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
  manifest: '/manifest.json',
  verification: { google: 'googleecc3f06e10be9957.html' },
  openGraph: { siteName: SITE_NAME, type: 'website' },
  twitter: { card: 'summary_large_image', site: '@akhilsystems' },
  other: {
    'geo.region': 'IN',
    'geo.position': '28.4913771,76.9947307',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

const GA_ID = 'G-8S2DQW0014';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <OnboardProvider>
          <div id="root">
            <Topbar />
            <Navbar />
            <BodyClassManager />
            {children}
            <Footer />
          </div>
        </OnboardProvider>

        <ClientInit />

        <DiwaliDecor />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function () {
              if (
                window.googleTranslateWidgetInitialized ||
                !window.google ||
                !window.google.translate
              ) {
                return;
              }

              var container = document.getElementById(
                'google_translate_element'
              );

              if (!container) return;

              window.googleTranslateWidgetInitialized = true;

              new window.google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'en,fr,hi,ta,te,ml,bn,gu,pa,ur',
                  autoDisplay: false,
                  layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
                },
                'google_translate_element'
              );
            };
          `}
        </Script>

        <Script
          id="google-translate-script"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}