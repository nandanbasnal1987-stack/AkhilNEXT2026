"use client";

import Hero from "@/components/integrations/Hero";
import HubDiagram from "@/components/integrations/HubDiagram";
import Marquee from "@/components/integrations/Marquee";

export default function IntegrationsClient() {
  return (
    // Changed <main> to <div> to prevent nested <main> tags
    <div className="integrations-main">
      <Hero />
      <HubDiagram />
      <Marquee />
    </div>
  );
}