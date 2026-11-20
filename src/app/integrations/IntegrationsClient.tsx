"use client";

import Hero from "@/app/integrations/Hero";
import HubDiagram from "@/app/integrations/HubDiagram";
import Marquee from "@/app/integrations/Marquee";



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