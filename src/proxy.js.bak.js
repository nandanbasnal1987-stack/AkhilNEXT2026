import { NextResponse } from 'next/server';

/**
 * React Router matched URLs case-insensitively (/aboutus, /ABOUTUS and /Aboutus all worked);
 * Next.js routes are case-sensitive. This redirects any wrong-cased URL to the canonical one
 * so old links, bookmarks and the links in sitemap.xml keep working.
 *
 * (In Next.js 15 and earlier this file is called middleware.js and exports `middleware`.)
 */
const CANONICAL = [
  '/', '/Aboutus', '/pricing', '/Augastam', '/Clinic', '/MiracleHIS', '/Moc', '/cxoapp',
  '/Doctorapp', '/Patientapp', '/Phlebotomyapp', '/partners', '/OurClients', '/OurCareer',
  '/blog', '/contact', '/PhotoGallery', '/VideoGallery', '/Marketplace', '/Team', '/Gallery',
  '/privacy-policy-2', '/Landing',
];
const BY_LOWER = new Map(CANONICAL.map((p) => [p.toLowerCase(), p]));

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  // /blog/<slug> — only the first segment is case-insensitive; slugs are lowercase already
  if (trimmed.toLowerCase().startsWith('/blog/')) {
    const fixed = '/blog/' + trimmed.slice('/blog/'.length).toLowerCase();
    if (fixed !== pathname) {
      const url = request.nextUrl.clone();
      url.pathname = fixed;
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  const canonical = BY_LOWER.get(trimmed.toLowerCase());
  if (canonical && canonical !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = canonical;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // skip Next internals and anything that looks like a file (images, css, sitemap.xml, ...)
  matcher: ['/((?!_next/|images/|videos/|api/|.*\\..*).*)'],
};
