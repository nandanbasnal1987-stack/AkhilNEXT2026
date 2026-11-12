import MocView from '@/views/Moc';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: "/Moc",
  title: "MOC - Medical Operations Center | Akhil Systems",
  description: "Centralized medical operations management system for healthcare facilities.",
  keywords: "medical operations, healthcare management, operations center, hospital operations, medical management",
});

export default function Page() {
  return <MocView />;
}
