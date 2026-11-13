import HeroSection from "@/components/sections/HeroSection";
import AiAssistSection from "@/components/sections/AiAssistSection";
import ConnectedClinicSection from "@/components/sections/ConnectedClinicSection";
import JourneySection from "@/components/sections/JourneySection";
import SolutionTabsSection from "@/components/sections/SolutionTabsSection";
import PatientAppSection from "@/components/sections/PatientAppSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import AiSuiteSection from "@/components/sections/AiSuiteSection";
import PrivacySection from "@/components/sections/PrivacySection";
import ContactSection from "@/components/sections/ContactSection";
import FaqSection from "@/components/sections/FaqSection";
import TransitionBanner from "@/components/sections/TransitionBanner";
import IntegrationHub from "@/components/features/IntegrationHub";

export default function AugastamClinicPage() {
  return (
    <>
      <HeroSection />

      <main id="page-main">
        <AiAssistSection />
        <ConnectedClinicSection />
        <JourneySection />
        <SolutionTabsSection />
        <PatientAppSection />
        <TransitionBanner />
        <BenefitsSection />
        <AiSuiteSection />
        <PrivacySection />
        <IntegrationHub />
        <ContactSection />
        <FaqSection />
      </main>
    </>
  );
}