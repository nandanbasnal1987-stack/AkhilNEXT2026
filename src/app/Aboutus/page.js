import AboutusView from '@/views/Aboutus';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/Aboutus",
  title: "About Us | Akhil Systems - Healthcare IT Solutions",
  description: "With 32+ years in healthcare IT, Akhil Systems helps hospitals, clinics, and diagnostics shift from manual to digital operations. Our HIS, EMR, and cloud solutions simplify workflows.",
  keywords: "about akhil systems, healthcare company, medical technology, our story, healthcare IT solutions, hospital management software",
});

export default function Page() {
  return <AboutusView />;
}
