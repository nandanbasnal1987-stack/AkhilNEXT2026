import LandingView from '@/views/Landing';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/Landing",
  title: "Akhil Systems - Healthcare IT Solutions",
  description: "Innovative healthcare technology solutions for hospitals, clinics, and medical practices.",
});

export default function Page() {
  return <LandingView />;
}
