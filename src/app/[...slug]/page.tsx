
// src/app/[...slug]/page.tsx

import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

// Generate static routes
export function generateStaticParams() {
  return [
    { slug: ['about'] },
    { slug: ['contact'] },
    { slug: ['team'] },
    { slug: ['Aboutus'] },
    { slug: ['Augastam'] },
    { slug: ['AugastamClinic'] },
    { slug: ['Moc'] },
    { slug: ['OurClients'] },
    { slug: ['OurCareer'] },
    { slug: ['MiracleHIS'] },
    { slug: ['Marketplace'] },
    { slug: ['Clinic'] },
    { slug: ['MiracleOne'] },
    { slug: ['Mobility'] },
    { slug: ['Team'] },
     { slug: ['team'] },
  ];
}

export const dynamicParams = false;

// SEO Metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const pageTitle = slug
    .join(' ')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `${pageTitle} | Akhil Systems`,
    description: `${pageTitle} - Healthcare IT Solutions by Akhil Systems.`,
  };
}

// Page Component
export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const currentPath = slug.join('/');

  return (
    <main>
      <h1>Path: /{currentPath}</h1>
      <p>This is a static page.</p>
    </main>
  );
}
