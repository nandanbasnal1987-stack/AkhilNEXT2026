import HomeView from '@/views/Home';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/",
  title: "India's Leading Hospital Management Software - Akhil Systems",
  description: "India's leading hospital management software by Akhil Systems delivers secure, scalable, and integrated solutions to streamline operations, improve care, and drive efficiency.",
  keywords: "Hospital Management Software, medical billing software in india, medical billing software, hospital software in india, top 10 medical billing software",
  image: "/images/blog/billingSoftwareBlog.jpg",
  imageAlt: "Hospital Management Software",
});

export default function Page() {
  return <HomeView />;
}
