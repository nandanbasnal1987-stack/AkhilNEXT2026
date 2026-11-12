export const SITE_URL = 'https://akhilsystems.com';
export const SITE_NAME = 'Akhil Systems';

/**
 * Builds a complete metadata object for a page.
 * (Next shallow-merges metadata, so openGraph/twitter must be supplied in full per page.)
 */
export function pageMetadata({
  path,
  title,
  description,
  keywords,
  image,
  imageAlt,
  type = 'website',
  ogTitle,
  ogDescription,
  twitterDescription,
}) {
  const og = {
    title: ogTitle || title,
    description: ogDescription || description,
    url: path,
    siteName: SITE_NAME,
    type,
  };
  if (image) og.images = [{ url: image, alt: imageAlt || title }];

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: og,
    twitter: {
      card: 'summary_large_image',
      title: ogTitle || title,
      description: twitterDescription || ogDescription || description,
      site: '@akhilsystems',
      ...(image ? { images: [image] } : {}),
    },
  };
}
