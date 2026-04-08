import { Building, CheckCircle2, Shovel, Truck } from "lucide-react";

const MACHINES = [
  { id: "mach-jcb-exc", name: "JCB Excavator", type: "Excavation" },
  { id: "mach-jcb-loader", name: "JCB Loader", type: "Loading" },
  { id: "mach-jcb-3dx", name: "JCB-3DX/4DX", type: "Multi-purpose" },
  { id: "mach-grader", name: "Motor Graders", type: "Road works" },
  { id: "mach-hywa", name: "Hywa (Tipper)", type: "Transportation" },
];

const SERVICES = [
  {
    id: "ps-exc",
    icon: Shovel,
    title: "Complete Excavation",
    description:
      "Full excavation services for industrial sites, construction projects, and foundation work.",
  },
  {
    id: "ps-earth",
    icon: Truck,
    title: "Earthmoving Machine Rentals",
    description:
      "Daily and long-term rentals of heavy earthmoving equipment at competitive rates.",
  },
  {
    id: "ps-transport",
    icon: Truck,
    title: "Transportation Rentals",
    description:
      "Hywa/tipper truck rentals for material transportation, debris removal, and logistics.",
  },
  {
    id: "ps-building",
    icon: Building,
    title: "Building & Road Works",
    description:
      "Ground preparation, sub-grade works, and road base compaction services.",
  },
];

export function SisterCompany() {
  return (
    <section id="sister-company" className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          Sister Company
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Perfect Solution
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          Our sister concern specializing in excavation, earthmoving, and heavy
          machinery rentals — the ground-level execution arm of the PDH group.
        </p>
      </div>

      {/* Company Overview */}
      <div className="bg-navy rounded-2xl p-8 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-accent-teal/10 rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-display font-bold text-2xl text-inverse">
              Perfect Solution
            </span>
            <span className="text-xs bg-accent-teal/20 text-accent-teal px-2 py-0.5 rounded-full font-body">
              Sole Proprietorship
            </span>
          </div>
          <p className="font-body text-sm text-inverse/70 leading-relaxed max-w-xl mb-5">
            Perfect Solution is a sole proprietorship firm engaged in excavation
            and earthmoving machine rental services. As the sister concern of
            PDH Tech Consultancy, it provides seamless integration of
            consultancy and on-ground execution capabilities.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Excavation Specialist", "Machine Rental", "Ground Works"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs bg-inverse/10 text-inverse/70 border border-inverse/20 px-3 py-1 rounded-full font-body"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {SERVICES.map(({ id, icon: Icon, title, description }) => (
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

      {/* Machines */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <h3 className="font-display font-bold text-lg text-foreground mb-5">
          Fleet of Machines
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {MACHINES.map(({ id, name, type }) => (
            <div
              key={id}
              className="flex items-center gap-3 border border-border rounded-lg p-3.5 hover:border-accent-teal/40 transition-smooth"
              data-ocid={id}
            >
              <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                <CheckCircle2 size={14} className="text-accent-teal" />
              </div>
              <div>
                <div className="font-body font-semibold text-sm text-foreground">
                  {name}
                </div>
                <div className="font-body text-xs text-muted-foreground">
                  {type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
