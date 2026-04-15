import { createActor } from "@/backend";
import type { ProjectItem as BackendProjectItem } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { DisplayProject } from "@/types/index";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, MapPin, Tag, User } from "lucide-react";
import { useState } from "react";

// ── Fallback photos for hardcoded projects ────────────────────────────────────
const PROJECT_PHOTOS: Record<string, string[]> = {
  "proj-fgd": [
    "/assets/generated/fgd_plant_01.dim_800x600.jpg",
    "/assets/generated/fgd_plant_02.dim_800x600.jpg",
    "/assets/generated/project_management.dim_800x600.jpg",
    "/assets/generated/construction_site.dim_800x600.jpg",
  ],
  "proj-vedanta": [
    "/assets/generated/induction_furnace_01.dim_800x600.jpg",
    "/assets/generated/induction_furnace_02.dim_800x600.jpg",
    "/assets/generated/engineering_review.dim_800x600.jpg",
    "/assets/generated/steel_fabrication.dim_800x600.jpg",
  ],
  "proj-sail": [
    "/assets/generated/steel_shed_01.dim_800x600.jpg",
    "/assets/generated/steel_shed_02.dim_800x600.jpg",
    "/assets/generated/steel_fabrication.dim_800x600.jpg",
    "/assets/generated/construction_site.dim_800x600.jpg",
  ],
  "proj-crs": [
    "/assets/generated/peb_building_01.dim_800x600.jpg",
    "/assets/generated/peb_building_02.dim_800x600.jpg",
    "/assets/generated/engineering_review.dim_800x600.jpg",
    "/assets/generated/construction_site.dim_800x600.jpg",
  ],
  "proj-jindal": [
    "/assets/generated/crusher_plant_01.dim_800x600.jpg",
    "/assets/generated/crusher_plant_02.dim_800x600.jpg",
    "/assets/generated/steel_fabrication.dim_800x600.jpg",
    "/assets/generated/engineering_review.dim_800x600.jpg",
  ],
};

// ── Hardcoded projects (always shown first) ────────────────────────────────────
const HARDCODED_PROJECTS: DisplayProject[] = [
  {
    id: "proj-fgd",
    title: "PMC Services for FGD Project at DB Power Plant Champa",
    client: "Galaxy Infra",
    location: "Champa, Chhattisgarh",
    category: "Project Management",
    year: "2022",
    description:
      "Provided comprehensive Project Management Consultancy (PMC) services for the Flue Gas Desulfurization (FGD) project at DB Power Plant. Scope included supervision, quality control, progress monitoring, and reporting.",
    photos: PROJECT_PHOTOS["proj-fgd"],
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
    photos: PROJECT_PHOTOS["proj-vedanta"],
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
    photos: PROJECT_PHOTOS["proj-sail"],
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
    photos: PROJECT_PHOTOS["proj-crs"],
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
    photos: PROJECT_PHOTOS["proj-jindal"],
  },
];

const INITIAL_VISIBLE = 3;

const CATEGORY_COLORS: Record<string, string> = {
  "Project Management": "bg-accent-teal text-white border-accent-teal",
  "Feasibility Study": "bg-accent-teal text-white border-accent-teal",
  "Structural Engineering": "bg-accent-teal text-white border-accent-teal",
  "Building & Structures": "bg-accent-teal text-white border-accent-teal",
  "Industrial Equipment": "bg-accent-teal text-white border-accent-teal",
};

// ── Map backend ProjectItem → DisplayProject ────────────────────────────────
function mapBackendProject(item: BackendProjectItem): DisplayProject {
  return {
    id: `backend-${item.id.toString()}`,
    title: item.name,
    client: item.client,
    location: item.location,
    category: "Project",
    year: item.year,
    description: item.description,
    photos: item.photoUrls,
  };
}

// ── ProjectCard component ────────────────────────────────────────────────────
interface ProjectCardProps {
  project: DisplayProject;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const photos = project.photos ?? [];

  return (
    <div
      className="bg-card border border-border rounded-xl shadow-card hover:shadow-elevated transition-smooth group overflow-hidden"
      data-ocid={project.id}
    >
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-inverse font-mono text-xs font-bold shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Badge
              variant="outline"
              className={`text-xs font-body ${CATEGORY_COLORS[project.category] ?? "bg-accent-teal text-white border-accent-teal"}`}
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

        <div className="flex flex-wrap items-center justify-between gap-3">
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

          {photos.length > 0 && (
            <button
              type="button"
              data-ocid={`${project.id}-expand`}
              aria-expanded={isExpanded}
              aria-label={
                isExpanded ? "Collapse project photos" : "View project photos"
              }
              onClick={() => setIsExpanded((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 hover:bg-accent-teal/10 hover:border-accent-teal text-muted-foreground hover:text-accent-teal text-xs font-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-1"
            >
              Photos
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Photo grid — smooth height transition */}
      {photos.length > 0 && (
        <div
          className={`transition-all duration-400 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isExpanded}
        >
          <div className="px-6 pb-6 pt-1 border-t border-border mt-1">
            <p className="font-body text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wide">
              Project Photos
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {photos.map((url, i) => (
                <div
                  key={url}
                  className="aspect-[4/3] rounded-lg overflow-hidden shadow-sm border border-border"
                >
                  <img
                    src={url}
                    alt={`${project.title} — view ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Loading skeleton for backend projects ─────────────────────────────────────
function ProjectSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="w-7 h-7 rounded-full" />
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-4 w-12 ml-auto" />
      </div>
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

// ── Main Projects section ─────────────────────────────────────────────────────
export function Projects() {
  const { actor, isFetching } = useActor(createActor);
  const [showAll, setShowAll] = useState(false);

  const { data: backendProjects = [], isLoading: isLoadingBackend } = useQuery<
    DisplayProject[]
  >({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      const items = await actor.getProjects();
      return items.map(mapBackendProject);
    },
    enabled: !!actor && !isFetching,
    // Silently fall back to empty on error — hardcoded projects always show
    throwOnError: false,
  });

  // Hardcoded first, backend appended after
  const allProjects = [...HARDCODED_PROJECTS, ...backendProjects];
  const visibleProjects = showAll
    ? allProjects
    : allProjects.slice(0, INITIAL_VISIBLE);
  const remaining = allProjects.length - INITIAL_VISIBLE;

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
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}

        {/* Show skeletons only when loading backend and within visible range */}
        {isLoadingBackend &&
          !showAll &&
          HARDCODED_PROJECTS.length < INITIAL_VISIBLE && <ProjectSkeleton />}
      </div>

      {allProjects.length > INITIAL_VISIBLE && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            data-ocid="projects-view-toggle"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm shadow-md hover:bg-primary/90 active:bg-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {showAll ? (
              <>
                <ChevronUp size={16} />
                View Less
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                View More ({remaining} more)
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
