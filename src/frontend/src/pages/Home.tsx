import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CompanyProfile } from "@/components/sections/CompanyProfile";
import { ContactMap } from "@/components/sections/ContactMap";
import { FeedbackSection } from "@/components/sections/Feedback";
import { Gallery } from "@/components/sections/Gallery";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 space-y-0">
        <CompanyProfile />
        <WhyChooseUs />
        <WhatWeDo />
        <Services />
        <Projects />
        <CaseStudies />
        <Gallery />
        <FeedbackSection />
        <ContactMap />
      </div>

      {/* Floating widgets */}
      <WhatsAppButton />
    </>
  );
}
