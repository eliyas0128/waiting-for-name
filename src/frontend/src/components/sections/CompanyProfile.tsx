import { RentMachineModal } from "@/components/RentMachineModal";
import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, Calendar, Truck, Users } from "lucide-react";
import { useState } from "react";

const STATS = [
  {
    id: "stat-professionals",
    value: "10+",
    label: "Professionals",
    icon: Users,
  },
  {
    id: "stat-clients",
    value: "30+",
    label: "Clients Served",
    icon: Briefcase,
  },
  {
    id: "stat-projects",
    value: "50+",
    label: "Projects Completed",
    icon: Award,
  },
  {
    id: "stat-years",
    value: "8+",
    label: "Years of Experience",
    icon: Calendar,
  },
];

export function CompanyProfile() {
  const [rentOpen, setRentOpen] = useState(false);

  return (
    <section id="company-profile" className="scroll-mt-24 mb-16">
      {/* Hero Banner */}
      <div className="relative bg-navy rounded-2xl overflow-hidden mb-10 geometric-triangle">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235fbfbf' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 px-8 py-12 md:py-16">
          <div className="flex flex-wrap items-start gap-4 mb-6">
            <Badge className="bg-accent-teal/20 text-accent-teal border-accent-teal/40 font-body text-xs uppercase tracking-widest px-3 py-1">
              Est. 2018
            </Badge>
            <Badge className="bg-yellow-400/20 text-yellow-300 border-yellow-400/40 font-body text-xs uppercase tracking-widest px-3 py-1">
              <Award size={11} className="mr-1" />
              ISO 9001:2015 Certified
            </Badge>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-inverse leading-tight mb-4 max-w-2xl">
            Perfect
            <br />
            <span className="text-accent-teal">Solution</span>
          </h1>
          <p className="font-body text-lg text-inverse/70 max-w-xl leading-relaxed mb-8">
            Your complete design and engineering partner — delivering precision
            engineering and strategic consultancy since 2018.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-body font-semibold text-sm hover:bg-primary/90 transition-smooth"
              data-ocid="hero-services-cta"
            >
              Our Services
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-2.5 border border-accent-teal/50 text-accent-teal rounded-lg font-body font-semibold text-sm hover:bg-accent-teal/10 transition-smooth"
              data-ocid="hero-projects-cta"
            >
              View Projects
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("fleet")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-body font-semibold text-sm hover:bg-teal-700 transition-smooth flex items-center gap-2 shadow-lg"
              data-ocid="hero-rent-vehicle-cta"
            >
              <Truck size={16} />
              Rent Machines
            </button>
            <button
              type="button"
              onClick={() => setRentOpen(true)}
              className="px-6 py-2.5 bg-accent-teal text-navy rounded-lg font-body font-semibold text-sm hover:bg-accent-teal/90 transition-smooth flex items-center gap-2 shadow-lg"
              data-ocid="hero-rent-machine-cta"
            >
              <Truck size={16} />
              Rent a Machine
            </button>
          </div>
        </div>

        {/* Decorative teal bar */}
        <div className="absolute right-0 top-0 w-1.5 h-full bg-accent-teal/60" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {STATS.map(({ id, value, label, icon: Icon }) => (
          <div
            key={id}
            className="bg-card border border-border rounded-xl p-5 text-center shadow-card hover:shadow-elevated transition-smooth group"
            data-ocid={id}
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-smooth">
              <Icon size={20} className="text-accent-teal" />
            </div>
            <div className="font-display font-bold text-3xl text-foreground mb-0.5">
              {value}
            </div>
            <div className="font-body text-xs text-muted-foreground uppercase tracking-wide">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* About blurb */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <h2 className="font-display font-bold text-xl text-foreground mb-3">
          About Perfect Solution
        </h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
          Perfect Solution is a premier engineering and strategic consultancy
          firm based in Bhilai, Chhattisgarh, India. Founded in 2018 with a
          commitment to excellence, we provide comprehensive solutions across
          civil, structural, mechanical, and infrastructure domains.
        </p>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          Our team of 10+ experienced professionals has successfully delivered
          50+ projects for 30+ clients across India, including marquee names
          like SAIL, Vedanta, SECL, and Jindal. ISO 9001:2015 certified, we
          uphold the highest standards of quality in every engagement.
        </p>
      </div>

      {/* Rent Machine Modal */}
      <RentMachineModal open={rentOpen} onClose={() => setRentOpen(false)} />
    </section>
  );
}
