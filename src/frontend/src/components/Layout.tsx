import { Button } from "@/components/ui/button";
import { COMPANY_CONTACT } from "@/types/index";
import {
  Award,
  ChevronUp,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#company-profile", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#gallery", label: "Gallery" },
  { href: "#feedback", label: "Feedback" },
];

const SERVICE_CATEGORIES = [
  "CHP & Conveyors",
  "Industrial Equipments",
  "Building & Structures",
  "Pipeline & Trenchless",
  "Urban Infrastructure",
  "Pavement Management",
];

const FOOTER_LINKS = [
  { href: "#company-profile", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#gallery", label: "Gallery" },
  { href: "#feedback", label: "Feedback" },
  { href: "#contact", label: "Contact" },
];

const CERTIFICATIONS = [
  { label: "ISO 9001:2015", highlight: true },
  { label: "EPF Registered", highlight: false },
  { label: "ESIC Registered", highlight: false },
  { label: "MSME Registered", highlight: false },
  { label: "Coal India Approved", highlight: false },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Main Header ──────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("company-profile")}
            className="flex items-center gap-3 group shrink-0"
            aria-label="Perfect Designing Hub – go to top"
            data-ocid="header.logo"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-navy rounded flex items-center justify-center text-inverse font-display font-bold text-lg leading-none relative overflow-hidden shrink-0">
              <span className="relative z-10">P</span>
              <div className="absolute bottom-0 right-0 w-4 h-4 gradient-primary opacity-70" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-foreground text-sm sm:text-base group-hover:text-accent-teal transition-colors whitespace-nowrap">
                Perfect Designing Hub
              </div>
              <div className="text-muted-foreground text-[9px] sm:text-[10px] font-body tracking-wide uppercase">
                Engineering & Consultancy
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-0.5 xl:gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollToSection(link.href.slice(1))}
                className="px-2.5 xl:px-3 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded transition-smooth whitespace-nowrap"
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              size="sm"
              className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 font-body whitespace-nowrap"
              onClick={() => scrollToSection("contact")}
              data-ocid="header.contact_cta"
            >
              <Phone size={13} className="mr-1.5" />
              Contact Us
            </Button>
          </nav>

          {/* Tablet: show phone + hamburger */}
          <div className="hidden sm:flex lg:hidden items-center gap-3">
            <a
              href={`tel:${COMPANY_CONTACT.phone}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent-teal transition-colors"
              data-ocid="header.phone_link"
            >
              <Phone size={13} />
              <span>{COMPANY_CONTACT.phone}</span>
            </a>
            <button
              type="button"
              className="p-2 rounded text-foreground hover:bg-muted/60 border border-border"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              data-ocid="mobile.menu_toggle"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile: hamburger only */}
          <button
            type="button"
            className="sm:hidden p-2 rounded text-foreground hover:bg-muted/60"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-ocid="mobile.menu_toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile / Tablet nav drawer */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t border-border bg-card"
            data-ocid="mobile.nav_drawer"
          >
            {/* Contact strip */}
            <div className="px-4 py-3 bg-muted/40 flex flex-wrap gap-x-5 gap-y-1.5 text-xs border-b border-border">
              <a
                href={`tel:${COMPANY_CONTACT.phone}`}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-accent-teal transition-colors"
              >
                <Phone size={12} />
                <span>{COMPANY_CONTACT.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_CONTACT.email}`}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-accent-teal transition-colors"
              >
                <Mail size={12} />
                <span className="truncate max-w-[200px]">
                  {COMPANY_CONTACT.email}
                </span>
              </a>
            </div>

            <nav className="flex flex-col px-3 py-3 gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => {
                    scrollToSection(link.href.slice(1));
                    setMobileOpen(false);
                  }}
                  className="text-left px-4 py-3 text-sm font-body text-foreground hover:bg-muted/60 hover:text-accent-teal rounded-lg transition-smooth min-h-[44px] flex items-center"
                  data-ocid={`mobile.nav.${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-2 flex gap-2">
                <Button
                  className="flex-1 bg-primary text-primary-foreground min-h-[44px]"
                  onClick={() => {
                    scrollToSection("contact");
                    setMobileOpen(false);
                  }}
                  data-ocid="mobile.contact_cta"
                >
                  <Phone size={15} className="mr-2" />
                  Contact Us
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 min-h-[44px] border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                  asChild
                >
                  <a
                    href="https://wa.me/917869091028"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="mobile.whatsapp_cta"
                  >
                    <MessageCircle size={15} className="mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ── Main Content (no sidebar) ─────────────────────── */}
      <main className="flex-1" id="main-content">
        {children}
      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer
        className="bg-navy text-inverse border-t border-border/20"
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
          {/* 4-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Col 1 — Company */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-accent-teal text-xl">
                    P
                  </span>
                </div>
                <div>
                  <div className="font-display font-bold text-base text-inverse">
                    Perfect Designing Hub
                  </div>
                  <div className="text-[10px] text-inverse/50 uppercase tracking-wider">
                    Engineering & Consultancy
                  </div>
                </div>
              </div>
              <p className="text-xs text-inverse/55 leading-relaxed mb-4">
                Premier engineering and strategic consultancy firm based in
                Bhilai, Chhattisgarh. ISO 9001:2015 certified, delivering
                precision since 2018.
              </p>
              <div className="flex items-center gap-1.5 text-accent-teal text-xs font-body font-semibold">
                <Award size={14} />
                <span>ISO 9001:2015 Certified</span>
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div>
              <div className="font-body font-semibold text-sm mb-4 text-inverse/90 uppercase tracking-wide">
                Quick Links
              </div>
              <ul className="flex flex-col gap-2">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.href.slice(1))}
                      className="text-xs text-inverse/60 hover:text-accent-teal transition-colors text-left min-h-[28px] flex items-center"
                      data-ocid={`footer.link.${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <a
                    href="/gallery"
                    className="text-xs text-inverse/60 hover:text-accent-teal transition-colors min-h-[28px] flex items-center"
                    data-ocid="footer.link.gallery-page"
                  >
                    Full Gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 — Services */}
            <div>
              <div className="font-body font-semibold text-sm mb-4 text-inverse/90 uppercase tracking-wide">
                Our Services
              </div>
              <ul className="flex flex-col gap-2">
                {SERVICE_CATEGORIES.map((svc) => (
                  <li key={svc}>
                    <button
                      type="button"
                      onClick={() => scrollToSection("services")}
                      className="text-xs text-inverse/60 hover:text-accent-teal transition-colors text-left min-h-[28px] flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-teal/60 shrink-0" />
                      {svc}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contact */}
            <div>
              <div className="font-body font-semibold text-sm mb-4 text-inverse/90 uppercase tracking-wide">
                Contact Us
              </div>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href={`tel:${COMPANY_CONTACT.phone}`}
                    className="flex items-start gap-2.5 text-xs text-inverse/60 hover:text-accent-teal transition-colors group"
                    data-ocid="footer.phone_link"
                  >
                    <Phone
                      size={13}
                      className="mt-0.5 shrink-0 group-hover:text-accent-teal"
                    />
                    <span>{COMPANY_CONTACT.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${COMPANY_CONTACT.email}`}
                    className="flex items-start gap-2.5 text-xs text-inverse/60 hover:text-accent-teal transition-colors group"
                    data-ocid="footer.email_link"
                  >
                    <Mail
                      size={13}
                      className="mt-0.5 shrink-0 group-hover:text-accent-teal"
                    />
                    <span className="break-words">{COMPANY_CONTACT.email}</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-2.5 text-xs text-inverse/60">
                    <MapPin size={13} className="mt-0.5 shrink-0" />
                    <span className="leading-relaxed">
                      {COMPANY_CONTACT.address}
                    </span>
                  </div>
                </li>
                <li>
                  <a
                    href="https://wa.me/917869091028"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-lg bg-[#25D366]/15 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/25 transition-colors min-h-[40px]"
                    data-ocid="footer.whatsapp_link"
                  >
                    <MessageCircle size={14} />
                    Chat on WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=2nd+floor+Tiranga+Bhawan+Junwani+Road+Bhilai+Durg+Chhattisgarh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/15 text-accent-teal text-xs font-semibold hover:bg-primary/25 transition-colors min-h-[40px]"
                    data-ocid="footer.directions_link"
                  >
                    <MapPin size={14} />
                    Get Directions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Certifications row */}
          <div className="border-t border-inverse/10 pt-5 pb-4">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {CERTIFICATIONS.map((cert, i) => (
                <div key={cert.label} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-inverse/20 hidden sm:inline">|</span>
                  )}
                  <span
                    className={`text-xs font-body flex items-center gap-1 ${cert.highlight ? "text-accent-teal font-semibold" : "text-inverse/50"}`}
                  >
                    {cert.highlight && <Award size={12} />}
                    {cert.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-inverse/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-inverse/40">
            <span>
              © {new Date().getFullYear()} Perfect Designing Hub. All rights
              reserved.
            </span>
            <div className="flex items-center gap-4">
              <a
                href="/admin"
                className="hover:text-accent-teal transition-colors underline-offset-2 hover:underline"
                data-ocid="footer.admin_link"
              >
                Admin
              </a>
              <span>
                Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-teal transition-colors underline-offset-2 hover:underline"
                >
                  caffeine.ai
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Back to top */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-5 z-40 w-10 h-10 bg-navy border border-accent-teal/40 rounded-full flex items-center justify-center text-accent-teal hover:bg-primary/20 transition-smooth shadow-elevated"
          aria-label="Back to top"
          data-ocid="back_to_top"
        >
          <ChevronUp size={18} />
        </button>
      </footer>
    </div>
  );
}
