import OurClientsView from '@/views/OurClients';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/OurClients",
  title: "Our Clients | Akhil Systems Healthcare Solutions",
  description: "See how Akhil Systems healthcare solutions are helping hospitals and clinics worldwide.",
  keywords: "clients, testimonials, healthcare customers, hospital clients, medical institutions",
});

export default function Page() {
  return <OurClientsView />;
}
