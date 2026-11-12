import PrivacyPolicy2View from "@/views/privacy-policy-2";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/privacy-policy-2",
  title: "Privacy Policy | Akhil Systems",
  description:
    "Privacy policy for Akhil Systems Healthcare Solutions.",
  keywords:
    "privacy policy, terms and conditions, data privacy, legal information",
});

export default function Page() {
  return <PrivacyPolicy2View />;
}