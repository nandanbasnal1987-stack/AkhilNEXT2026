import IntegrationHub from "@/components/features/IntegrationHub";
// import "@/styles/integrations.css";

export const metadata = {
  title: "Everything Connected. Care Coordinated.",
};

export default function IntegrationsPage() {
  return (
    <div className="integrations-page">
      <main>
        <div className="pill">Integration</div>
        <h1>
          <span>
            <i>Everything Connected.</i>
          </span>
          <span>
            <i>Care Coordinated.</i>
          </span>
        </h1>
        <p className="sub">
          Connect your clinic’s essential tools in one place, so your team can
          access the systems they need without constantly switching between apps
        </p>

        <IntegrationHub />
      </main>
    </div>
  );
}