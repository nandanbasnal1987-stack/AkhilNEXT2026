import PatientappView from '@/views/Patientapp';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/Patientapp",
  title: "Patient App - Healthcare Patient Portal | Akhil Systems",
  description: "Patient portal for appointment booking, medical records access, and health monitoring.",
  keywords: "patient app, health portal, medical records access, healthcare app, patient engagement",
});

export default function Page() {
  return <PatientappView />;
}
