import TeamView from '@/views/Team';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/Team",
  title: "Our Team | Akhil Systems Healthcare",
  description: "Meet the experts behind Akhil Systems Healthcare Solutions.",
  keywords: "team, leadership, healthcare experts, management team, technical team",
});

export default function Page() {
  return <TeamView />;
}
