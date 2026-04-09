import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ServiceDetail {
  id: string;
  category: string;
  description: string;
  items: string[];
}

const SERVICES: ServiceDetail[] = [
  {
    id: "svc-chp",
    category: "CHP & Conveyors",
    description:
      "Complete engineering solutions for Coal Handling Plants and material conveying systems.",
    items: [
      "Alignment studies and survey",
      "Feasibility reports and DPR preparation",
      "Detailed engineering studies",
      "System design and layout planning",
      "Value engineering and optimization",
      "Bill of Quantities (BOQ) preparation",
    ],
  },
  {
    id: "svc-industrial",
    category: "Industrial Equipments",
    description:
      "Design, fabrication, and supply of specialized industrial equipment.",
    items: [
      "MS Chimney design and fabrication",
      "Self Locking Scape Bucket systems",
      "MS Conveyors Bracket design",
      "Crusher Machine design and revamping",
    ],
  },
  {
    id: "svc-building",
    category: "Building & Structures",
    description:
      "Structural engineering for industrial sheds, pre-engineered buildings, and complex structures.",
    items: [
      "Steel structural shed design",
      "Pre-Engineering Building (PEB) design",
      "RCC and steel structure analysis",
      "Detailed Project Reports (DPR)",
      "Structural assessment and retrofitting",
    ],
  },
  {
    id: "svc-pipeline",
    category: "Pipeline Laying & Trenchless Solutions",
    description:
      "Advanced pipeline installation using modern trenchless technologies.",
    items: [
      "Pipeline design and route surveys",
      "Trenchless technology solutions (HDD/Microtunneling)",
      "Pipeline integrity assessment",
      "Utility mapping and clash detection",
    ],
  },
  {
    id: "svc-urban",
    category: "Urban Infrastructure",
    description:
      "Comprehensive urban development and infrastructure planning services.",
    items: [
      "Urban planning and master planning",
      "Storm water drainage design",
      "Water supply and sewerage systems",
      "Community infrastructure development",
    ],
  },
  {
    id: "svc-pavement",
    category: "Pavement Management",
    description:
      "Complete road asset management from survey to maintenance planning.",
    items: [
      "Road condition surveys and PCI assessment",
      "Pavement management systems",
      "Maintenance planning and programming",
      "Roughness and skid resistance measurements",
    ],
  },
  {
    id: "svc-pm",
    category: "Project Management",
    description:
      "End-to-end project management consultancy for large-scale projects.",
    items: [
      "Project Management Consultancy (PMC)",
      "Construction supervision and quality assurance",
      "Progress monitoring and reporting",
      "Contract management and claims advisory",
    ],
  },
  {
    id: "svc-bot",
    category: "BOT/DBFO/PPP Projects",
    description:
      "Advisory and technical due diligence for public-private partnership projects.",
    items: [
      "BOT/Annuity project structuring",
      "Technical feasibility and due diligence",
      "Concession agreement review",
      "Traffic studies and revenue projections",
    ],
  },
  {
    id: "svc-road",
    category: "Road Condition Surveys",
    description:
      "Systematic assessment of road infrastructure condition and performance.",
    items: [
      "Visual condition surveys",
      "Deflection measurements (FWD/Benkelman Beam)",
      "Core sampling and lab testing",
      "Condition index calculation and reporting",
    ],
  },
];

const INITIAL_VISIBLE = 3;

function ServiceCard({ service }: { service: ServiceDetail }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-card border border-border rounded-xl shadow-card overflow-hidden"
      data-ocid={service.id}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/40 transition-smooth group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="min-w-0">
          <div className="font-display font-bold text-base text-foreground group-hover:text-accent-teal transition-colors">
            {service.category}
          </div>
          <div className="font-body text-xs text-muted-foreground mt-0.5 truncate pr-4">
            {service.description}
          </div>
        </div>
        <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center ml-3">
          {open ? (
            <ChevronUp size={15} className="text-accent-teal" />
          ) : (
            <ChevronDown size={15} className="text-muted-foreground" />
          )}
        </div>
      </button>

      {open && (
        <div className="px-6 pb-5 border-t border-border/50">
          <ul className="mt-4 space-y-2">
            {service.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-teal shrink-0" />
                <span className="font-body text-sm text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Services() {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll
    ? SERVICES
    : SERVICES.slice(0, INITIAL_VISIBLE);

  return (
    <section id="services" className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          Services
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Our Detailed Service Offerings
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          Click on any service category to expand and explore the specific
          capabilities and deliverables we provide.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {visibleServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          data-ocid="services-view-toggle"
          onClick={() => setShowAll((v) => !v)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-600 text-white font-body font-semibold text-sm shadow-md hover:bg-teal-700 active:bg-teal-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        >
          {showAll ? (
            <>
              <ChevronUp size={16} />
              View Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              View More ({SERVICES.length - INITIAL_VISIBLE} more)
            </>
          )}
        </button>
      </div>
    </section>
  );
}
