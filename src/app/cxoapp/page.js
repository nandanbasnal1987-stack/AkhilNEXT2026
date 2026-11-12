import CxoappView from "@/views/cxoapp";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/cxoapp",
  title: "CXO App - Executive Dashboard | Akhil Systems",
  description:
    "Executive dashboard for healthcare administrators and CXOs.",
  keywords:
    "healthcare dashboard, executive app, hospital management app, medical dashboard, healthcare analytics",
});

export default function Page() {
  return <CxoappView />;
}