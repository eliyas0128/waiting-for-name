import { Badge } from "@/components/ui/badge";
import { MapPin, Tag, User } from "lucide-react";

const PROJECTS = [
  {
    id: "proj-fgd",
    title: "PMC Services for FGD Project at DB Power Plant Champa",
    client: "Galaxy Infra",
    location: "Champa, Chhattisgarh",
    category: "Project Management",
    year: "2022",
    description:
      "Provided comprehensive Project Management Consultancy (PMC) services for the Flue Gas Desulfurization (FGD) project at DB Power Plant. Scope included supervision, quality control, progress monitoring, and reporting.",
  },
  {
    id: "proj-vedanta",
    title: "Feasibility Report for Induction Furnace at Balco Plant Korba",
    client: "Vedanta",
    location: "Korba, Chhattisgarh",
    category: "Feasibility Study",
    year: "2021",
    description:
      "Conducted a detailed feasibility study for establishing an Induction Furnace facility at Vedanta's BALCO plant. Delivered techno-economic analysis, site assessment, and implementation roadmap.",
  },
  {
    id: "proj-sail",
    title: "DPR for Industrial Steel Structural Shed at BSP Bhilai Steel Plant",
    client: "SAIL",
    location: "Bhilai, Chhattisgarh",
    category: "Structural Engineering",
    year: "2020",
    description:
      "Prepared a comprehensive Detailed Project Report (DPR) for an industrial steel structural shed at Bhilai Steel Plant. Included structural design, material specifications, BOQ, and cost estimates.",
  },
  {
    id: "proj-crs",
    title:
      "Feasibility Study for Pre Engineering Building at CRS Infra Vadodara",
    client: "CRS Infra",
    location: "Vadodara, Gujarat",
    category: "Building & Structures",
    year: "2023",
    description:
      "Performed feasibility assessment for a Pre-Engineered Building (PEB) facility. Analysis included site evaluation, structural options, cost comparison, and implementation strategy.",
  },
  {
    id: "proj-jindal",
    title: "Crusher Revamping at Slag Crusher Plant Jindal Angul Odisha",
    client: "Angul Jindal Plant",
    location: "Angul, Odisha",
    category: "Industrial Equipment",
    year: "2022",
    description:
      "Executed full revamping of the slag crusher plant including mechanical redesign, capacity enhancement, safety upgrades, and commissioning support at Jindal Steel's Angul facility.",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Project Management": "bg-blue-100 text-blue-700 border-blue-200",
  "Feasibility Study": "bg-green-100 text-green-700 border-green-200",
  "Structural Engineering": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Building & Structures": "bg-teal-100 text-teal-700 border-teal-200",
  "Industrial Equipment": "bg-orange-100 text-orange-700 border-orange-200",
};

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          Projects
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Featured Projects
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          A selection of our key project deliveries across India, showcasing our
          technical depth and client diversity.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-smooth group"
            data-ocid={project.id}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-inverse font-mono text-xs font-bold shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Badge
                  variant="outline"
                  className={`text-xs font-body ${CATEGORY_COLORS[project.category] ?? "bg-muted text-muted-foreground"}`}
                >
                  <Tag size={10} className="mr-1" />
                  {project.category}
                </Badge>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {project.year}
              </span>
            </div>

            <h3 className="font-display font-bold text-base text-foreground mb-2 group-hover:text-accent-teal transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User size={12} className="text-accent-teal" />
                <span className="font-body">
                  <span className="text-foreground font-medium">Client:</span>{" "}
                  {project.client}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-accent-teal" />
                <span className="font-body">{project.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
