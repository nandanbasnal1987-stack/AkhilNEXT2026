import PhlebotomyappView from '@/views/Phlebotomyapp';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/Phlebotomyapp",
  title: "Phlebotomy App - Lab Management | Akhil Systems",
  description: "Application for phlebotomists and lab technicians to manage samples and results.",
  keywords: "phlebotomy app, lab management, sample tracking, laboratory software, diagnostic app",
});

export default function Page() {
  return <PhlebotomyappView />;
}
