import {
  BarChart3,
  Building2,
  Cpu,
  GitBranch,
  Landmark,
  Layers,
} from "lucide-react";

const SERVICE_AREAS = [
  {
    id: "area-chp",
    icon: Layers,
    title: "CHP and Conveyors",
    description:
      "Coal Handling Plant design, conveyor engineering, alignment studies, and material handling system optimization for industrial facilities.",
    color: "bg-teal-50 border-teal-200",
  },
  {
    id: "area-industrial",
    icon: Cpu,
    title: "Industrial Equipments",
    description:
      "MS Chimneys, self-locking scape buckets, MS conveyor brackets, crusher machines, and specialized industrial equipment solutions.",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "area-building",
    icon: Building2,
    title: "Building and Structures",
    description:
      "Structural engineering, steel shed design, pre-engineering buildings, and detailed project reports for industrial and commercial structures.",
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    id: "area-urban",
    icon: Landmark,
    title: "Urban Infrastructure",
    description:
      "Urban planning and infrastructure development including drainage, utilities, and community development projects.",
    color: "bg-green-50 border-green-200",
  },
  {
    id: "area-pavement",
    icon: GitBranch,
    title: "Pavement Management",
    description:
      "Road condition surveys, pavement assessment, maintenance planning, and BOT/DBFO/PPP project advisory services.",
    color: "bg-amber-50 border-amber-200",
  },
  {
    id: "area-pm",
    icon: BarChart3,
    title: "Project Management",
    description:
      "End-to-end PMC services, project monitoring, quality assurance, and comprehensive project management consultancy.",
    color: "bg-rose-50 border-rose-200",
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          What We Do
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Our Core Competencies
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          Six specialized service areas covering the full spectrum of
          engineering consultancy for industrial, structural, and infrastructure
          projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICE_AREAS.map(({ id, icon: Icon, title, description }) => (
          <div
            key={id}
            className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-smooth group cursor-default"
            data-ocid={id}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
              <Icon size={22} className="text-accent-teal" />
            </div>
            <h3 className="font-display font-bold text-base text-foreground mb-2">
              {title}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="mt-4 h-0.5 w-8 bg-accent-teal/40 rounded-full group-hover:w-16 transition-all duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}
