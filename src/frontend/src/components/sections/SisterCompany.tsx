import { Building, CheckCircle2, Shovel, Truck } from "lucide-react";
import { useState } from "react";

const CIVIL_EQUIPMENT = [
  {
    id: "ce-01",
    sn: "01",
    name: "Excavator Machine – 210/205/200",
    qty: "06 Nos.",
  },
  { id: "ce-02", sn: "02", name: "Excavator Machine – 140", qty: "02 Nos." },
  { id: "ce-03", sn: "03", name: "Excavator Machine – 70", qty: "02 Nos." },
  { id: "ce-04", sn: "04", name: "JCB 3DX / 4DX", qty: "05 Nos." },
  {
    id: "ce-05",
    sn: "05",
    name: "Rock Breaker Machine for 210/205/200",
    qty: "04 Nos.",
  },
  { id: "ce-06", sn: "06", name: "JCB Rock Breaker Machine", qty: "03 Nos." },
  { id: "ce-07", sn: "07", name: "Ajax Floori – 4000", qty: "01 No." },
  {
    id: "ce-08",
    sn: "08",
    name: "Hywa (10 Wheelers / 12 Wheelers)",
    qty: "10 Nos.",
  },
  {
    id: "ce-09",
    sn: "09",
    name: "Vibrator Machine for Concreting",
    qty: "04 Nos.",
  },
  {
    id: "ce-10",
    sn: "10",
    name: "Manual Mixture Machine with Hopper",
    qty: "02 Nos.",
  },
  { id: "ce-11", sn: "11", name: "De-watering Pump", qty: "03 Nos." },
  { id: "ce-12", sn: "12", name: "Level Gauge Machine", qty: "01 No." },
  {
    id: "ce-13",
    sn: "13",
    name: "Shuttering Materials – Ply with Rafter",
    qty: "6000 Q.F.",
  },
  { id: "ce-14", sn: "14", name: "Staging Materials MS", qty: "6000 Q.F." },
  {
    id: "ce-15",
    sn: "15",
    name: "Staging Materials (Bamboos)",
    qty: "500 Nos.",
  },
  { id: "ce-16", sn: "16", name: "Flouter Machine", qty: "02 Nos." },
  { id: "ce-17", sn: "17", name: "ISMC – 100 (6000 Length)", qty: "50 Nos." },
  { id: "ce-18", sn: "18", name: "ISMC – 200 (6000 Length)", qty: "20 Nos." },
  { id: "ce-19", sn: "19", name: "Plate Vibrator", qty: "02 Nos." },
  { id: "ce-20", sn: "20", name: "Channel Vibrator", qty: "02 Nos." },
  { id: "ce-21", sn: "21", name: "Nozzle Grouting Machine", qty: "01 No." },
];

const MECHANICAL_EQUIPMENT = [
  { id: "me-01", sn: "01", name: "Workshop Area", qty: "2 Acre" },
  { id: "me-02", sn: "02", name: "MIG Welding Machine", qty: "08 Nos." },
  { id: "me-03", sn: "03", name: "Arc Welding Machine – 400", qty: "12 Nos." },
  {
    id: "me-04",
    sn: "04",
    name: "Transformer Welding Machine",
    qty: "03 Nos.",
  },
  { id: "me-05", sn: "05", name: "Portable Welding Machine", qty: "05 Nos." },
  { id: "me-06", sn: "06", name: "Pug Cutting Sets", qty: "05 Nos." },
  { id: "me-07", sn: "07", name: "Hand Cutting Sets", qty: "11 Nos." },
  {
    id: "me-08",
    sn: "08",
    name: "Grinder Machine AG (7 / 5 / 4)",
    qty: "10 Nos.",
  },
  { id: "me-09", sn: "09", name: "Magnetic Drill Machine", qty: "03 Nos." },
  { id: "me-10", sn: "10", name: "Hydra", qty: "01 No." },
];

const TABS = [
  {
    id: "civil",
    label: "Civil Work Equipment",
    count: CIVIL_EQUIPMENT.length,
    data: CIVIL_EQUIPMENT,
  },
  {
    id: "mechanical",
    label: "Mechanical / Workshop Equipment",
    count: MECHANICAL_EQUIPMENT.length,
    data: MECHANICAL_EQUIPMENT,
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

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

function EquipmentTable({ items }: { items: typeof CIVIL_EQUIPMENT }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-body">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground w-12">
              S.N.
            </th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
              Equipment / Material
            </th>
            <th className="text-right px-4 py-3 font-semibold text-muted-foreground w-32">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, sn, name, qty }, idx) => (
            <tr
              key={id}
              data-ocid={id}
              className={`border-b border-border/60 hover:bg-primary/5 transition-smooth ${
                idx % 2 === 0 ? "bg-card" : "bg-muted/20"
              }`}
            >
              <td className="px-4 py-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-accent-teal font-semibold text-xs">
                  {sn}
                </span>
              </td>
              <td className="px-4 py-3 text-foreground font-medium leading-snug">
                {name}
              </td>
              <td className="px-4 py-3 text-right">
                <span className="inline-block bg-accent/10 text-accent-teal border border-accent/20 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap">
                  {qty}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SisterCompany() {
  const [activeTab, setActiveTab] = useState<TabId>("civil");

  const activeData = TABS.find((t) => t.id === activeTab)!;

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

      {/* Fleet of Machines — Tabbed */}
      <div
        id="fleet"
        className="scroll-mt-24 bg-card border border-border rounded-2xl shadow-card overflow-hidden"
      >
        {/* Section header */}
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-xl text-foreground">
                Fleet of Machines
              </h3>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                Complete inventory of civil &amp; mechanical equipment
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
              <CheckCircle2 size={13} className="text-accent-teal" />
              <span>
                {CIVIL_EQUIPMENT.length + MECHANICAL_EQUIPMENT.length} total
                items
              </span>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div
          className="flex border-b border-border overflow-x-auto"
          role="tablist"
          aria-label="Equipment categories"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              data-ocid={`fleet-tab-${tab.id}`}
              type="button"
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

        {/* Tab panel */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          <EquipmentTable items={activeData.data} />
        </div>

        {/* Footer note */}
        <div className="px-6 py-3 bg-muted/30 border-t border-border text-xs font-body text-muted-foreground">
          Data as per company machinery &amp; manpower details — Perfect
          Solution, Bhilai.
        </div>
      </div>
    </section>
  );
}
