import ContactusView from '@/views/Contactus';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Us | Akhil Systems Healthcare Solutions",
  description: "Get in touch with Akhil Systems Healthcare Solutions for inquiries, support, or partnership opportunities.",
  keywords: "contact akhil systems, healthcare support, sales inquiry, customer support, partnership inquiry",
});

export default function Page() {
  return <ContactusView />;
}
