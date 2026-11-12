import DoctorappView from '@/views/Doctorapp';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/Doctorapp",
  title: "Doctor App - Medical Professional App | Akhil Systems",
  description: "Mobile application for doctors to manage patients, appointments, and medical records.",
  keywords: "doctor app, medical app, physician app, patient management, healthcare mobile app",
});

export default function Page() {
  return <DoctorappView />;
}
