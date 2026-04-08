import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Images } from "lucide-react";
import { useState } from "react";

type EquipmentCategory = "civil" | "mechanical";
type GalleryTab = "civil" | "mechanical";

interface GalleryItem {
  id: string;
  name: string;
  qty: string;
  category: EquipmentCategory;
  imageUrl: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  // Civil Equipment
  {
    id: "g-ce-01",
    name: "Excavator Machine – 210/205/200",
    qty: "06 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-02",
    name: "Excavator Machine – 140",
    qty: "02 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-03",
    name: "Excavator Machine – 70",
    qty: "02 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-04",
    name: "JCB 3DX / 4DX",
    qty: "05 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-05",
    name: "Rock Breaker Machine for 210/205/200",
    qty: "04 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-06",
    name: "JCB Rock Breaker Machine",
    qty: "03 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-07",
    name: "Ajax Floori – 4000",
    qty: "01 No.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-08",
    name: "Hywa (10/12 Wheelers)",
    qty: "10 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-09",
    name: "Vibrator Machine for Concreting",
    qty: "04 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-10",
    name: "Manual Mixture Machine with Hopper",
    qty: "02 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-11",
    name: "De-watering Pump",
    qty: "03 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-12",
    name: "Level Gauge Machine",
    qty: "01 No.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-13",
    name: "Shuttering Materials – Ply with Rafter",
    qty: "6000 Q.F.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-14",
    name: "Staging Materials MS",
    qty: "6000 Q.F.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-15",
    name: "Staging Materials (Bamboos)",
    qty: "500 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-16",
    name: "Flouter Machine",
    qty: "02 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-17",
    name: "ISMC – 100 (6000 Length)",
    qty: "50 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-18",
    name: "ISMC – 200 (6000 Length)",
    qty: "20 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-19",
    name: "Plate Vibrator",
    qty: "02 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-20",
    name: "Channel Vibrator",
    qty: "02 Nos.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=400&h=300&fit=crop",
  },
  {
    id: "g-ce-21",
    name: "Nozzle Grouting Machine",
    qty: "01 No.",
    category: "civil",
    imageUrl:
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=400&h=300&fit=crop",
  },
  // Mechanical Equipment
  {
    id: "g-me-01",
    name: "Workshop Area",
    qty: "2 Acre",
    category: "mechanical",
    imageUrl:
      "https://images.unsplash.com/photo-1565787164707-e69a3e4f2e7c?w=400&h=300&fit=crop",
  },
  {
    id: "g-me-02",
    name: "MIG Welding Machine",
    qty: "08 Nos.",
    category: "mechanical",
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
  },
  {
    id: "g-me-03",
    name: "Arc Welding Machine – 400",
    qty: "12 Nos.",
    category: "mechanical",
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
  },
  {
    id: "g-me-04",
    name: "Transformer Welding Machine",
    qty: "03 Nos.",
    category: "mechanical",
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
  },
  {
    id: "g-me-05",
    name: "Portable Welding Machine",
    qty: "05 Nos.",
    category: "mechanical",
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
  },
  {
    id: "g-me-06",
    name: "Pug Cutting Sets",
    qty: "05 Nos.",
    category: "mechanical",
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
  },
  {
    id: "g-me-07",
    name: "Hand Cutting Sets",
    qty: "11 Nos.",
    category: "mechanical",
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
  },
  {
    id: "g-me-08",
    name: "Grinder Machine AG (7 / 5 / 4)",
    qty: "10 Nos.",
    category: "mechanical",
    imageUrl:
      "https://images.unsplash.com/photo-1565787164707-e69a3e4f2e7c?w=400&h=300&fit=crop",
  },
  {
    id: "g-me-09",
    name: "Magnetic Drill Machine",
    qty: "03 Nos.",
    category: "mechanical",
    imageUrl:
      "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=300&fit=crop",
  },
  {
    id: "g-me-10",
    name: "Hydra",
    qty: "01 No.",
    category: "mechanical",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
  },
];

interface GalleryCardProps {
  item: GalleryItem;
}

function GalleryCard({ item }: GalleryCardProps) {
  return (
    <div
      data-ocid={item.id}
      className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-smooth hover:-translate-y-1"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge
            className={`text-xs font-body font-semibold px-2 py-0.5 border ${
              item.category === "civil"
                ? "bg-primary/90 text-primary-foreground border-primary/60"
                : "bg-secondary/90 text-secondary-foreground border-secondary/60"
            }`}
          >
            {item.category === "civil" ? "Civil" : "Mechanical"}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="inline-block bg-black/60 text-white text-xs font-body font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
            {item.qty}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-body font-semibold text-sm text-foreground leading-snug line-clamp-2">
          {item.name}
        </h4>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<GalleryTab>("civil");

  const civilItems = GALLERY_ITEMS.filter((i) => i.category === "civil");
  const mechanicalItems = GALLERY_ITEMS.filter(
    (i) => i.category === "mechanical",
  );
  const tabItems = activeTab === "civil" ? civilItems : mechanicalItems;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Images size={18} className="text-accent-teal" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display font-bold text-lg text-foreground leading-tight truncate">
                Equipment Gallery
              </h1>
              <p className="font-body text-xs text-muted-foreground">
                {GALLERY_ITEMS.length} items — Civil &amp; Mechanical
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            data-ocid="gallery-back-btn"
            className="gap-2 font-body font-medium shrink-0"
          >
            <Link to="/">
              <ArrowLeft size={15} />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro */}
        <div className="mb-8">
          <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
            Perfect Designing Hub
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Our Fleet in Action
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-2xl">
            A comprehensive visual catalogue of our machinery fleet — from heavy
            civil earthmoving equipment to precision mechanical workshop
            machines, powering infrastructure projects across India.
          </p>
        </div>

        {/* Tab bar */}
        <div
          className="flex border-b border-border mb-6 overflow-x-auto"
          role="tablist"
          aria-label="Gallery equipment categories"
        >
          {(
            [
              {
                id: "civil" as GalleryTab,
                label: "Civil Work Equipment",
                count: civilItems.length,
              },
              {
                id: "mechanical" as GalleryTab,
                label: "Mechanical / Workshop Equipment",
                count: mechanicalItems.length,
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              data-ocid={`gallery-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-body font-medium whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
                activeTab === tab.id
                  ? "text-accent-teal border-b-2 border-accent-teal bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              {tab.label}
              <span
                className={`inline-flex items-center justify-center text-xs font-semibold rounded-full px-1.5 py-0.5 min-w-[1.25rem] ${
                  activeTab === tab.id
                    ? "bg-accent/15 text-accent-teal"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tabItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-body text-muted-foreground">
            Machinery fleet — Perfect Solution &amp; PDH Tech Consultancy,
            Bhilai, Chhattisgarh.
          </p>
          <Button
            asChild
            variant="outline"
            size="sm"
            data-ocid="gallery-back-bottom-btn"
            className="gap-2 font-body font-medium"
          >
            <Link to="/">
              <ArrowLeft size={14} />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
