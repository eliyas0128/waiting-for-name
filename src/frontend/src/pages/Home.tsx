import { ChatBot } from "@/components/ChatBot";
import { TableOfContents } from "@/components/TableOfContents";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CompanyProfile } from "@/components/sections/CompanyProfile";
import { ContactMap } from "@/components/sections/ContactMap";
import { Projects } from "@/components/sections/Projects";
import { QualityPolicy } from "@/components/sections/QualityPolicy";
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
      <QualityPolicy />
      <SisterCompany />
      <ContactMap />

      {/* Floating widgets */}
      <TableOfContents />
      <ChatBot />
      <WhatsAppButton />
    </>
  );
}
