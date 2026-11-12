import MiracleHISView from '@/views/MiracleHIS';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/MiracleHIS",
  title: "Miracle HIS - Hospital Management | Akhil Systems",
  description: "Advanced Hospital Information System for comprehensive hospital management and patient care.",
  keywords: "hospital management software, HIS, patient care system, medical records, healthcare management",
});

export default function Page() {
  return <MiracleHISView />;
}
