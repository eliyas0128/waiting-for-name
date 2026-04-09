import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
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

const INITIAL_VISIBLE = 3;

type EquipmentItem = { id: string; sn: string; name: string; qty: string };

function EquipmentTable({
  items,
  tabId,
}: {
  items: EquipmentItem[];
  tabId: TabId;
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, INITIAL_VISIBLE);
  const remaining = items.length - INITIAL_VISIBLE;

  return (
    <div>
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
            {visibleItems.map(({ id, sn, name, qty }, idx) => (
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

      {items.length > INITIAL_VISIBLE && (
        <div className="py-4 flex justify-center border-t border-border/40">
          <button
            type="button"
            data-ocid={`fleet-view-toggle-${tabId}`}
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-600 text-white font-body font-semibold text-sm shadow-md hover:bg-teal-700 active:bg-teal-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
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
    </div>
  );
}

export default function FleetOfMachines() {
  const [activeTab, setActiveTab] = useState<TabId>("civil");

  const activeData = TABS.find((t) => t.id === activeTab)!;

  return (
    <section id="fleet" className="scroll-mt-24 mb-16">
      {/* Section heading */}
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          Equipment Inventory
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Fleet of Machines
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          Our extensive fleet of civil and mechanical equipment ensures we have
          the right machine for every job — from heavy excavation to precision
          workshop operations.
        </p>
      </div>

      {/* Tabbed equipment table */}
      <div
        data-ocid="fleet-section"
        className="bg-card border border-border rounded-2xl shadow-card overflow-hidden"
      >
        {/* Card header */}
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-xl text-foreground">
                Complete Equipment List
              </h3>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                Full inventory of civil &amp; mechanical equipment
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
              aria-controls={`fleet-panel-${tab.id}`}
              id={`fleet-tab-${tab.id}`}
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
          id={`fleet-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`fleet-tab-${activeTab}`}
        >
          <EquipmentTable items={activeData.data} tabId={activeTab} />
        </div>

        {/* Footer note */}
        <div className="px-6 py-3 bg-muted/30 border-t border-border text-xs font-body text-muted-foreground">
          Data as per company machinery &amp; manpower details — Perfect
          Designing Hub, Bhilai.
        </div>
      </div>
    </section>
  );
}
