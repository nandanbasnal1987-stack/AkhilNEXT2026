import OurCareerView from '@/views/OurCareer';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/OurCareer",
  title: "Careers at Akhil Systems — Join Our Healthcare Mission",
  description: "Join Akhil Systems' mission to transform healthcare through innovation and technology. Explore open roles across engineering, design, and clinical product.",
  keywords: "healthcare careers, tech jobs, medical software jobs, healthcare IT careers, software development jobs",
});

export default function Page() {
  return <OurCareerView />;
}
