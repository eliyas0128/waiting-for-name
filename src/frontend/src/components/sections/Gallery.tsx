import { createActor } from "@/backend";
import type { ProjectItem } from "@/backend";
import { Button } from "@/components/ui/button";
import { GALLERY_ITEMS, projectPhotosToGalleryItems } from "@/types/gallery";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function Gallery() {
  const { actor, isFetching } = useActor(createActor);

  const { data: backendProjects = [] } = useQuery<ProjectItem[]>({
    queryKey: ["gallery-projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching,
    throwOnError: false,
  });

  const projectGalleryItems = projectPhotosToGalleryItems(backendProjects);
  const allItems = [...GALLERY_ITEMS, ...projectGalleryItems];
  const previewItems = allItems.slice(0, 6);

  return (
    <section id="gallery" className="scroll-mt-24 mb-16">
      {/* Section Header */}
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          Equipment Gallery
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Our Gallery
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          A visual overview of our comprehensive machinery fleet — civil
          earthmoving equipment and mechanical workshop machines powering
          projects across India.
        </p>
      </div>

      {/* Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {previewItems.map((item) => (
          <div
            key={item.id}
            className="group bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-smooth hover:-translate-y-1"
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={item.imageUrl}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/assets/images/placeholder.svg";
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-muted/40 border border-border rounded-xl px-5 py-4">
        <p className="font-body text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">6</span> of{" "}
          <span className="font-semibold text-foreground">
            {allItems.length}
          </span>{" "}
          items in our equipment catalogue.
        </p>
        <Button
          asChild
          data-ocid="gallery-view-btn"
          className="gap-2 font-body font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link to="/gallery">
            View Full Gallery
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </section>
  );
}
