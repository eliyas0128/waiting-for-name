import { CheckCircle2, ShieldCheck } from "lucide-react";

const CERTIFICATES = [
  {
    id: "cert-iso",
    name: "ISO 9001:2015",
    issuer: "CDG Certification",
    type: "Quality Management",
  },
  {
    id: "cert-epf",
    name: "EPF Registration",
    issuer: "Employees Provident Fund",
    type: "Labour Compliance",
  },
  {
    id: "cert-coal",
    name: "Coal India Empanelment",
    issuer: "Coal India Limited",
    type: "Empanelment",
  },
  {
    id: "cert-esic",
    name: "ESIC Registration",
    issuer: "Employees State Insurance Corp.",
    type: "Labour Compliance",
  },
  {
    id: "cert-wci",
    name: "Workers Compensation Insurance",
    issuer: "Insurance Authority",
    type: "Insurance",
  },
  {
    id: "cert-msme",
    name: "MSME Registration",
    issuer: "Government of India",
    type: "Government",
  },
];

const QUALITY_COMMITMENTS = [
  "Delivering engineering services that consistently meet or exceed client requirements",
  "Complying with all applicable statutory, regulatory, and contractual obligations",
  "Fostering a culture of continuous improvement across all service lines",
  "Maintaining ISO 9001:2015 certified Quality Management System",
  "Ensuring every team member is trained and quality-conscious",
  "Providing timely, accurate, and complete deliverables in every project",
];

export function QualityPolicy() {
  return (
    <section id="quality-policy" className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          Quality Policy
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Our Commitment to Quality
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          Quality is not just a requirement — it is our culture and the
          foundation of every project we undertake.
        </p>
      </div>

      {/* ISO Banner */}
      <div className="bg-navy rounded-2xl p-8 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent-teal/10 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-16 h-16 bg-accent-teal/20 rounded-2xl flex items-center justify-center shrink-0">
            <ShieldCheck size={32} className="text-accent-teal" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-display font-bold text-xl text-inverse">
                ISO 9001:2015 Certified
              </span>
              <span className="text-xs bg-accent-teal/20 text-accent-teal px-2 py-0.5 rounded-full font-body">
                CDG Certified
              </span>
            </div>
            <p className="font-body text-sm text-inverse/70 leading-relaxed max-w-xl">
              PDH Tech Consultancy is ISO 9001:2015 certified by CDG
              Certification, demonstrating our adherence to international
              quality management standards. This certification is a testament to
              our systematic approach to quality in every process and
              deliverable.
            </p>
          </div>
        </div>
      </div>

      {/* Quality Commitments */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-card mb-8">
        <h3 className="font-display font-bold text-lg text-foreground mb-5">
          Quality Commitments
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUALITY_COMMITMENTS.map((commitment) => (
            <div key={commitment} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 bg-accent-teal/15 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={12} className="text-accent-teal" />
              </div>
              <span className="font-body text-sm text-muted-foreground leading-snug">
                {commitment}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates Grid */}
      <div>
        <h3 className="font-display font-bold text-lg text-foreground mb-5">
          Registrations & Certifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CERTIFICATES.map(({ id, name, issuer, type }) => (
            <div
              key={id}
              className="bg-card border border-border rounded-xl p-5 shadow-card hover:border-accent-teal/40 hover:shadow-elevated transition-smooth group"
              data-ocid={id}
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-smooth">
                <ShieldCheck size={16} className="text-accent-teal" />
              </div>
              <div className="font-display font-bold text-sm text-foreground mb-1">
                {name}
              </div>
              <div className="font-body text-xs text-muted-foreground mb-2">
                {issuer}
              </div>
              <span className="inline-block text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-body">
                {type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
