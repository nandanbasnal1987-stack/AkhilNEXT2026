import MarketplaceView from '@/views/Marketplace';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/Marketplace",
  title: "Healthcare Marketplace | Akhil Systems",
  description: "Marketplace for healthcare solutions and integrations.",
  keywords: "healthcare marketplace, medical apps, healthcare integrations, software marketplace, medical solutions",
});

export default function Page() {
  return <MarketplaceView />;
}
