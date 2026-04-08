import { CheckCircle2, Eye, Star, Target } from "lucide-react";

const VALUE_PROPS = [
  {
    id: "vp-personal",
    icon: Star,
    title: "Personal Attention",
    description:
      "Unlike large corporations, we provide personalized attention to every client and project, ensuring your specific requirements are fully understood and met.",
  },
  {
    id: "vp-experience",
    icon: CheckCircle2,
    title: "Multinational Experience",
    description:
      "Our founder brings extensive experience from leading multinational engineering firms, delivering world-class solutions to every project we undertake.",
  },
  {
    id: "vp-satisfaction",
    icon: Target,
    title: "Customer-First Commitment",
    description:
      "We are fully committed to exceeding customer satisfaction by delivering quality work on time and within budget, every single time.",
  },
];

const KEY_OFFERINGS = [
  "End-to-end project lifecycle management",
  "Value engineering and cost optimization",
  "Feasibility studies and DPR preparation",
  "CHP, conveyors, and industrial equipment design",
  "Building & structural engineering solutions",
  "Urban infrastructure and pavement management",
  "BOT/DBFO/PPP project advisory",
  "Road condition surveys and assessment",
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          Why Choose Us
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Why PDH Tech Consultancy?
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          We combine multinational engineering expertise with personal
          commitment to deliver results that exceed expectations.
        </p>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {VALUE_PROPS.map(({ id, icon: Icon, title, description }) => (
          <div
            key={id}
            className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-smooth group"
            data-ocid={id}
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
              <Icon size={20} className="text-accent-teal" />
            </div>
            <h3 className="font-display font-bold text-base text-foreground mb-2">
              {title}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div className="bg-navy rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-teal/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Eye size={18} className="text-accent-teal" />
              <span className="font-body font-semibold text-sm text-accent-teal uppercase tracking-wide">
                Our Vision
              </span>
            </div>
            <p className="font-body text-sm text-inverse/80 leading-relaxed">
              To be a globally recognized engineering consultancy renowned for
              innovation, quality, and customer-centric solutions that build a
              better world.
            </p>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Target size={18} className="text-accent-teal" />
              <span className="font-body font-semibold text-sm text-accent-teal uppercase tracking-wide">
                Our Mission
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              To deliver technically superior, cost-effective engineering
              solutions by leveraging expertise, innovation, and a relentless
              commitment to exceeding client expectations.
            </p>
          </div>
        </div>
      </div>

      {/* Key Offerings */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <h3 className="font-display font-bold text-lg text-foreground mb-5">
          Key Offerings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {KEY_OFFERINGS.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 bg-accent-teal/15 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={12} className="text-accent-teal" />
              </div>
              <span className="font-body text-sm text-muted-foreground leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
