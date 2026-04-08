import { Award, Briefcase, Calendar, FlaskConical, Users } from "lucide-react";

const METRICS = [
  {
    id: "cs-professionals",
    value: "10+",
    label: "Trained Professionals",
    icon: Users,
  },
  {
    id: "cs-clients",
    value: "30+",
    label: "Satisfied Clients",
    icon: Briefcase,
  },
  { id: "cs-projects", value: "50+", label: "Projects Completed", icon: Award },
  {
    id: "cs-since",
    value: "2018",
    label: "In Operation Since",
    icon: Calendar,
  },
];

const CLIENTS = [
  { id: "cl-secl", name: "SECL", sector: "Coal / Energy" },
  { id: "cl-vishnu", name: "Vishnu Chemicals", sector: "Chemicals" },
  { id: "cl-bindu", name: "Bindu Constructions", sector: "Construction" },
  { id: "cl-simplex", name: "Simplex", sector: "Infrastructure" },
  { id: "cl-maco", name: "MACO", sector: "Construction" },
  { id: "cl-strucrite", name: "Struc-Rite", sector: "Structural" },
  { id: "cl-saiwarda", name: "Sai Wardha Power", sector: "Power" },
  { id: "cl-vnrseed", name: "VNR Seed", sector: "Agriculture" },
  { id: "cl-galaxy", name: "Galaxy Infra", sector: "Infrastructure" },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          Case Studies
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Track Record & Credentials
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          Our numbers speak for themselves — a consistent history of delivering
          exceptional results since our founding in 2018.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {METRICS.map(({ id, value, label, icon: Icon }) => (
          <div
            key={id}
            className="bg-navy rounded-xl p-5 text-center relative overflow-hidden group"
            data-ocid={id}
          >
            <div className="absolute inset-0 bg-accent-teal/5 opacity-0 group-hover:opacity-100 transition-smooth" />
            <div className="relative z-10">
              <div className="w-9 h-9 bg-accent-teal/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon size={18} className="text-accent-teal" />
              </div>
              <div className="font-display font-bold text-3xl text-inverse mb-0.5">
                {value}
              </div>
              <div className="font-body text-xs text-inverse/60 uppercase tracking-wide">
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Material Testing Lab */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
            <FlaskConical size={20} className="text-accent-teal" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-foreground mb-1.5">
              Material Testing Laboratory
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              PDH Tech Consultancy operates a Material Testing Laboratory in
              Bangalore, currently in process for{" "}
              <span className="font-medium text-foreground">
                NABL Accreditation
              </span>{" "}
              as per{" "}
              <span className="font-medium text-foreground">
                ISO/IEC 17025:2017
              </span>{" "}
              standard — a testament to our commitment to quality and scientific
              rigor.
            </p>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <h3 className="font-display font-bold text-lg text-foreground mb-5">
          Our Valued Clients
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CLIENTS.map(({ id, name, sector }) => (
            <div
              key={id}
              className="border border-border rounded-lg px-4 py-3 hover:border-accent-teal/40 hover:bg-muted/30 transition-smooth"
              data-ocid={id}
            >
              <div className="font-body font-semibold text-sm text-foreground">
                {name}
              </div>
              <div className="font-body text-xs text-muted-foreground mt-0.5">
                {sector}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
