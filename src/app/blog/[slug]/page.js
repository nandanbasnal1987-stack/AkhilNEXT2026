import { notFound } from 'next/navigation';
import BlogDetails from '@/views/BlogDetails';
import { blogsData } from '@/data/blogs';
import { blogMeta } from '@/data/blogMeta';
import { pageMetadata } from '@/lib/seo';

// Only the slugs in blogsData exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogsData.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.slug === slug);
  if (!blog) return {};
  const m = blogMeta[slug] || {};

  return pageMetadata({
    path: `/blog/${slug}`,
    title: m.title || blog.title,
    description: m.description || blog.desc,
    keywords: m.keywords,
    image: blog.img,
    imageAlt: m['og:image:alt'] || blog.title,
    type: 'article',
    ogTitle: m['og:title'],
    ogDescription: m['og:description'],
    twitterDescription: m['twitter:description'],
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!blogsData.some((b) => b.slug === slug)) notFound();
  return <BlogDetails slug={slug} />;
}
