import HeroSection from "@/components/sections/HeroSection";
import AiAssistSection from "@/components/sections/AiAssistSection2";
import ConnectedClinicSection from "@/components/sections/ConnectedClinicSection";
import JourneySection from "@/components/sections/JourneySection";
import SolutionTabsSection from "@/components/sections/SolutionTabsSection";
import PatientAppSection from "@/components/sections/PatientAppSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import AiSuiteSection from "@/components/sections/AiSuiteSection";
import PrivacySection from "@/components/sections/PrivacySection";
// import ContactSection from "@/components/sections/ContactSection";
import FaqSection from "@/components/sections/FaqSection";
//import TransitionBanner from "@/components/sections/TransitionBanner";
import ClinicComparison from "@/components/sections/ClinicComparison";
import Testimonials from "@/components/features/Testimonials2";
import GoLiveSteps from "@/components/sections/GoLiveSteps";
import Hero from "@/app/integrations/Hero";
import HubDiagram from "@/app/integrations/HubDiagram";
import Marquee from "@/app/integrations/Marquee";

import "../integrations/integrations.css"; 
import Testimonials2 from "@/components/features/Testimonials2";

// In JS files, do NOT use "import type" or ": Metadata"
export const metadata = {
  title: "Augastam Clinic | Everything Connected. Care Coordinated.",
  description:
    "Connect your clinic's essential tools in one place, so your team can access the systems they need without constantly switching between apps.",
};

export default function AugastamClinicPage() {
  return (
    <>
      <HeroSection />

      <main id="page-main">
        <AiAssistSection /> 
        <Testimonials2 />       
        <ConnectedClinicSection />        
        <JourneySection />
        <SolutionTabsSection />
        <PatientAppSection />
        {/* <TransitionBanner /> */}
        <BenefitsSection />
        <AiSuiteSection />
        <PrivacySection />
        <ClinicComparison />
         <div className="integrations-main">
          <div className="container">
          <Hero />
          <HubDiagram />
          <Marquee />
          </div>
        </div>
        
        <GoLiveSteps />
        {/* <ContactSection /> */}
        <FaqSection />
      </main>
    </>
  );
}