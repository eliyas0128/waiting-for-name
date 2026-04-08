import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { COMPANY_CONTACT, TOC_ITEMS } from "@/types/index";
import { ChevronUp, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#company-profile", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#quality-policy", label: "Quality" },
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
  const sectionIds = TOC_ITEMS.map((t) => t.id);
  const activeId = useActiveSection(sectionIds);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top contact bar */}
      <div className="bg-navy text-inverse text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${COMPANY_CONTACT.phone}`}
              className="flex items-center gap-1.5 hover:text-accent-teal transition-colors"
            >
              <Phone size={11} />
              <span>{COMPANY_CONTACT.phone}</span>
            </a>
            <a
              href={`mailto:${COMPANY_CONTACT.email}`}
              className="flex items-center gap-1.5 hover:text-accent-teal transition-colors"
            >
              <Mail size={11} />
              <span>{COMPANY_CONTACT.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin size={11} />
            <span className="truncate max-w-xs">
              Bhilai, Durg – 490023, Chhattisgarh
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("company-profile")}
            className="flex items-center gap-3 group"
            aria-label="PDH Tech Consultancy – go to top"
          >
            <div className="w-10 h-10 bg-navy rounded-sm flex items-center justify-center text-inverse font-display font-bold text-lg leading-none relative overflow-hidden">
              <span className="relative z-10">P</span>
              <div className="absolute bottom-0 right-0 w-4 h-4 gradient-primary opacity-70" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-foreground text-base group-hover:text-accent-teal transition-colors">
                PDH
              </div>
              <div className="text-muted-foreground text-[10px] font-body tracking-wide uppercase">
                Tech Consultancy
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollToSection(link.href.slice(1))}
                className="px-3 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded transition-smooth"
              >
                {link.label}
              </button>
            ))}
            <Button
              size="sm"
              className="ml-3 bg-primary text-primary-foreground hover:bg-primary/90 font-body"
              onClick={() => scrollToSection("company-profile")}
              data-ocid="header-cta"
            >
              Get in Touch
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded text-foreground hover:bg-muted/60"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-ocid="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 pb-4 pt-2">
            <div className="text-xs text-muted-foreground mb-3 flex gap-4">
              <a
                href={`tel:${COMPANY_CONTACT.phone}`}
                className="hover:text-accent-teal"
              >
                {COMPANY_CONTACT.phone}
              </a>
              <a
                href={`mailto:${COMPANY_CONTACT.email}`}
                className="hover:text-accent-teal"
              >
                {COMPANY_CONTACT.email}
              </a>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => {
                    scrollToSection(link.href.slice(1));
                    setMobileOpen(false);
                  }}
                  className="text-left px-3 py-2.5 text-sm font-body text-foreground hover:bg-muted/60 rounded transition-smooth"
                >
                  {link.label}
                </button>
              ))}
              <Button
                className="mt-2 bg-primary text-primary-foreground"
                onClick={() => {
                  scrollToSection("company-profile");
                  setMobileOpen(false);
                }}
                data-ocid="mobile-cta"
              >
                Get in Touch
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Body with TOC sidebar + content */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 gap-8 pt-8 pb-12">
        {/* Sticky TOC Sidebar */}
        <aside
          className="hidden xl:block w-52 shrink-0"
          aria-label="Table of contents"
        >
          <div className="sticky top-24 bg-card border border-border rounded-lg shadow-card p-4">
            <div className="text-[11px] font-body font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Contents
            </div>
            <nav className="flex flex-col gap-0.5">
              {TOC_ITEMS.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-sm px-3 py-2 rounded transition-smooth flex items-center gap-2 ${
                    activeId === item.id
                      ? "bg-primary/10 text-accent-teal font-medium border-l-2 border-accent-teal"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-ocid={`toc-${item.id}`}
                >
                  <span className="text-[10px] font-mono text-muted-foreground/60 w-4">
                    {i + 1}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0" id="main-content">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-navy text-inverse border-t border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-display font-bold text-xl mb-2 text-accent-teal">
                PDH
              </div>
              <div className="text-sm text-inverse/70 font-body mb-3">
                Tech Consultancy
              </div>
              <p className="text-xs text-inverse/50 leading-relaxed">
                ISO certified engineering and strategic consultancy. 8+ years
                delivering excellence in civil, structural, MEP, and
                environmental engineering.
              </p>
            </div>
            <div>
              <div className="font-body font-semibold text-sm mb-3 text-inverse/80">
                Contact
              </div>
              <div className="flex flex-col gap-2 text-xs text-inverse/60">
                <a
                  href={`tel:${COMPANY_CONTACT.phone}`}
                  className="flex items-center gap-2 hover:text-accent-teal transition-colors"
                >
                  <Phone size={12} />
                  {COMPANY_CONTACT.phone}
                </a>
                <a
                  href={`mailto:${COMPANY_CONTACT.email}`}
                  className="flex items-center gap-2 hover:text-accent-teal transition-colors"
                >
                  <Mail size={12} />
                  {COMPANY_CONTACT.email}
                </a>
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="mt-0.5 shrink-0" />
                  <span className="leading-relaxed">
                    {COMPANY_CONTACT.address}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="font-body font-semibold text-sm mb-3 text-inverse/80">
                Quick Links
              </div>
              <div className="grid grid-cols-2 gap-1">
                {TOC_ITEMS.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-xs text-inverse/60 hover:text-accent-teal transition-colors py-0.5"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-inverse/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-inverse/40">
            <span>
              © {new Date().getFullYear()} PDH Tech Consultancy. All rights
              reserved.
            </span>
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

        {/* Back to top */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-28 right-5 z-40 w-10 h-10 bg-navy border border-accent-teal/40 rounded-full flex items-center justify-center text-accent-teal hover:bg-primary/20 transition-smooth shadow-elevated"
          aria-label="Back to top"
          data-ocid="back-to-top"
        >
          <ChevronUp size={18} />
        </button>
      </footer>
    </div>
  );
}
