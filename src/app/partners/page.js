import PartnersprogramView from '@/views/Partnersprogram';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/partners",
  title: "Partnership Program | Akhil Systems",
  description: "Join Akhil Systems partnership program to grow your business with healthcare technology.",
  keywords: "healthcare partners, technology partnership, reseller program, healthcare channel partners, medical software partnership",
});

export default function Page() {
  return <PartnersprogramView />;
}
