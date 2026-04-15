import { createActor } from "@/backend";
import type { ProjectItem } from "@/backend";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GALLERY_ITEMS,
  type GalleryItem,
  projectPhotosToGalleryItems,
} from "@/types/gallery";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Images } from "lucide-react";

interface GalleryCardProps {
  item: GalleryItem;
}

function GalleryCard({ item }: GalleryCardProps) {
  return (
    <div
      data-ocid={item.id}
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
  );
}

function GallerySkeletonGrid() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton positions
          key={i}
          className="aspect-[4/3] rounded-xl"
        />
      ))}
    </>
  );
}

export default function GalleryPage() {
  const { actor, isFetching } = useActor(createActor);

  const { data: backendProjects = [], isLoading } = useQuery<ProjectItem[]>({
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page title + back */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Images size={18} className="text-accent-teal" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-xl sm:text-2xl text-foreground leading-tight">
              Our Gallery
            </h1>
            <p className="font-body text-xs text-muted-foreground">
              {allItems.length} items — Perfect Designing Hub
            </p>
          </div>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          data-ocid="gallery.back_button"
          className="gap-2 font-body font-medium shrink-0"
        >
          <Link to="/">
            <ArrowLeft size={15} />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Intro */}
      <p className="font-body text-sm text-muted-foreground max-w-2xl mb-8">
        A comprehensive visual catalogue of our machinery fleet — heavy civil
        earthmoving equipment to precision mechanical workshop machines,
        powering infrastructure projects across India.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {GALLERY_ITEMS.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
        {isLoading ? (
          <GallerySkeletonGrid />
        ) : (
          projectGalleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))
        )}
      </div>

      {/* Footer note */}
      <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-body text-muted-foreground">
          Machinery fleet — Perfect Designing Hub, Bhilai, Chhattisgarh.
        </p>
        <Button
          asChild
          variant="outline"
          size="sm"
          data-ocid="gallery.back_bottom_button"
          className="gap-2 font-body font-medium"
        >
          <Link to="/">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
