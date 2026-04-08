import { TableOfContents } from "@/components/TableOfContents";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CompanyProfile } from "@/components/sections/CompanyProfile";
import { ContactMap } from "@/components/sections/ContactMap";
import { FeedbackSection } from "@/components/sections/Feedback";
import { Gallery } from "@/components/sections/Gallery";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { SisterCompany } from "@/components/sections/SisterCompany";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <>
      <CompanyProfile />
      <WhyChooseUs />
      <WhatWeDo />
      <Services />
      <Projects />
      <CaseStudies />
      <SisterCompany />
      <Gallery />
      <FeedbackSection />
      <ContactMap />

      {/* Floating widgets */}
      <TableOfContents />
      <WhatsAppButton />
    </>
  );
}
