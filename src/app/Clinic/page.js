import ClinicView from '@/views/Clinic';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/Clinic",
  title: "Clinic Management Software | Akhil Systems",
  description: "Complete clinic management solution for appointment scheduling, patient records, billing, and practice management.",
  keywords: "clinic software, practice management, appointment scheduling, clinic management system, medical practice software",
});

export default function Page() {
  return <ClinicView />;
}
