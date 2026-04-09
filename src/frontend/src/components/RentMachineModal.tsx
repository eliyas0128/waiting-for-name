import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Truck, Wrench, X } from "lucide-react";
import { useEffect, useState } from "react";

const CIVIL_EQUIPMENT = [
  { name: "Hydraulic Excavators", qty: "5 nos" },
  { name: "Bulldozers", qty: "3 nos" },
  { name: "Motor Graders", qty: "2 nos" },
  { name: "Vibratory Compactors", qty: "4 nos" },
  { name: "Wheel Loaders", qty: "3 nos" },
  { name: "Backhoe Loaders", qty: "6 nos" },
  { name: "Tipper Trucks", qty: "10 nos" },
  { name: "Water Tankers", qty: "3 nos" },
  { name: "Transit Mixers", qty: "2 nos" },
  { name: "Tower Cranes", qty: "2 nos" },
  { name: "Mobile Cranes", qty: "3 nos" },
  { name: "Concrete Pumps", qty: "2 nos" },
  { name: "Batching Plants", qty: "1 no" },
  { name: "Road Rollers", qty: "4 nos" },
  { name: "Paver Finishers", qty: "2 nos" },
  { name: "Pipe Laying Equipment", qty: "2 nos" },
  { name: "Dewatering Pumps", qty: "8 nos" },
  { name: "Generators", qty: "5 nos" },
  { name: "Welding Machines", qty: "10 nos" },
  { name: "Air Compressors", qty: "4 nos" },
  { name: "Drilling Machines", qty: "3 nos" },
];

const MECHANICAL_EQUIPMENT = [
  { name: "Lathe Machines", qty: "3 nos" },
  { name: "Milling Machines", qty: "2 nos" },
  { name: "Drilling Machines", qty: "4 nos" },
  { name: "Grinding Machines", qty: "3 nos" },
  { name: "Welding Sets", qty: "6 nos" },
  { name: "Gas Cutting Sets", qty: "4 nos" },
  { name: "Hydraulic Jacks", qty: "5 nos" },
  { name: "Chain Blocks", qty: "6 nos" },
  { name: "Wire Rope Slings", qty: "10 nos" },
  { name: "Tool Kits", qty: "8 nos" },
];

type Tab = "civil" | "mechanical";

interface RentMachineModalProps {
  open: boolean;
  onClose: () => void;
}

export function RentMachineModal({ open, onClose }: RentMachineModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("civil");

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const items = activeTab === "civil" ? CIVIL_EQUIPMENT : MECHANICAL_EQUIPMENT;

  return (
    <dialog
      open
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-transparent max-w-none m-0 w-full h-full"
      aria-labelledby="rent-modal-title"
      data-ocid="rent-machine-modal"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
        onClick={onClose}
        onKeyUp={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
        role="presentation"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col bg-card border border-border rounded-2xl shadow-elevated overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-6 py-5 border-b border-border bg-navy">
          <div>
            <h2
              id="rent-modal-title"
              className="font-display font-bold text-xl text-inverse"
            >
              Available Machines for Rent
            </h2>
            <p className="font-body text-xs text-inverse/60 mt-0.5">
              Contact us to enquire about availability &amp; rates
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-inverse/60 hover:text-inverse hover:bg-inverse/10 transition-smooth shrink-0 mt-0.5"
            aria-label="Close modal"
            data-ocid="rent-modal-close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border bg-muted/30 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("civil")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-body font-semibold transition-smooth border-b-2 ${
              activeTab === "civil"
                ? "border-accent-teal text-accent-teal bg-accent-teal/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="rent-tab-civil"
          >
            <Truck size={15} />
            Civil Work Equipment
            <Badge className="ml-1 bg-accent-teal/15 text-accent-teal border-accent-teal/30 text-[10px] px-1.5 py-0">
              {CIVIL_EQUIPMENT.length}
            </Badge>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mechanical")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-body font-semibold transition-smooth border-b-2 ${
              activeTab === "mechanical"
                ? "border-accent-teal text-accent-teal bg-accent-teal/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="rent-tab-mechanical"
          >
            <Wrench size={15} />
            Mechanical &amp; Workshop
            <Badge className="ml-1 bg-accent-teal/15 text-accent-teal border-accent-teal/30 text-[10px] px-1.5 py-0">
              {MECHANICAL_EQUIPMENT.length}
            </Badge>
          </button>
        </div>

        {/* Machine List */}
        <div className="overflow-y-auto flex-1 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {items.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-3 bg-background border border-border rounded-lg px-4 py-3 hover:border-accent-teal/40 hover:bg-accent-teal/5 transition-smooth"
                data-ocid="rent-machine-item"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-accent-teal shrink-0" />
                  <span className="font-body text-sm text-foreground truncate">
                    {item.name}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="text-[11px] font-body font-semibold text-accent-teal border-accent-teal/40 bg-accent-teal/5 shrink-0"
                >
                  {item.qty}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Footer CTA */}
        <div className="px-6 py-4 bg-muted/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-muted-foreground">
            For rental enquiries, call us or chat on WhatsApp
          </p>
          <div className="flex gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="font-body font-semibold text-xs gap-1.5"
            >
              <a href="tel:+917869091028">Call Now</a>
            </Button>
            <Button
              size="sm"
              asChild
              className="bg-[#25D366] hover:bg-[#20bb5a] text-white font-body font-semibold text-xs gap-1.5"
              data-ocid="rent-modal-whatsapp"
            >
              <a
                href="https://wa.me/917869091028?text=Hi%2C%20I%20am%20interested%20in%20renting%20machines."
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
