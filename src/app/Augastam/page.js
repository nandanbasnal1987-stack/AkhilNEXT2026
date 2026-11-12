import AugastamView from '@/views/Augastam';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/Augastam",
  title: "Augastam - Hospital Information System | Akhil Systems",
  description: "Augastam is a comprehensive Hospital Information System (HIS) that streamlines hospital operations, patient management, and medical records.",
  keywords: "HIS system, hospital management software, patient management, medical records, Augastam, healthcare software",
});

export default function Page() {
  return <AugastamView />;
}
