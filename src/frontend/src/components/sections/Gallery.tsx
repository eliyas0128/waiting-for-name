import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Images } from "lucide-react";

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-24 mb-16">
      {/* Section Header */}
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          Equipment Gallery
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Our Fleet in Action
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          A visual overview of our comprehensive machinery fleet — civil
          earthmoving equipment and mechanical workshop machines powering
          projects across India.
        </p>
      </div>

      {/* CTA Card */}
      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-6 px-8 py-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Images size={38} className="text-accent-teal" />
          </div>
          <div className="max-w-md">
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              Explore All 31 Machines
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              Browse our complete fleet of civil earthmoving and mechanical
              workshop equipment — with category filters and detailed
              specifications.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            data-ocid="gallery-view-btn"
            className="gap-2 font-body font-semibold px-10"
          >
            <Link to="/gallery">
              <Images size={18} />
              View Gallery
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
