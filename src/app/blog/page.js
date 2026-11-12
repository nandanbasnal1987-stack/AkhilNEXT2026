import BlogView from '@/views/Blog';
import { pageMetadata, SITE_URL } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/blog',
  title: '31+ Yrs Of Trusted Medical Billing Software In India',
  description:
    '31+ Years of Trusted Excellence! Leading Medical Billing Software in India ensuring accuracy, efficiency & seamless healthcare management.',
  keywords:
    'medical billing software in india, medical billing software, medical billing software for clinic, best medical billing software, hospital software in india, top 10 medical billing software, Best medical billing software in india',
  image: '/images/blog/billingSoftwareBlog.jpg',
  imageAlt: 'Medical Billing Software In India',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Akhil Systems Blog',
  url: `${SITE_URL}/blog`,
  description: 'Healthcare technology insights and innovations.',
  publisher: {
    '@type': 'Organization',
    name: 'Akhil Systems',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogView />
    </>
  );
}
