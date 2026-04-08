import { useActiveSection } from "@/hooks/useActiveSection";
import { TOC_ITEMS } from "@/types/index";
import { ChevronDown, ChevronUp, List } from "lucide-react";
import { useState } from "react";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function TableOfContents() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = TOC_ITEMS.map((t) => t.id);
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      {/* Desktop sidebar TOC — rendered inside Layout already, this is a standalone fallback */}
      {/* Mobile floating TOC toggle */}
      <div
        className="xl:hidden fixed bottom-28 left-5 z-40"
        data-ocid="toc-mobile-toggle"
      >
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="w-11 h-11 bg-card border border-border shadow-elevated rounded-full flex items-center justify-center text-foreground hover:border-accent-teal/50 hover:text-accent-teal transition-smooth"
          aria-label="Toggle table of contents"
          aria-expanded={mobileOpen}
        >
          <List size={18} />
        </button>

        {mobileOpen && (
          <div className="absolute bottom-14 left-0 bg-card border border-border rounded-xl shadow-elevated w-56 p-3">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-muted-foreground">
                Contents
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close table of contents"
              >
                <ChevronDown size={14} />
              </button>
            </div>
            <nav className="flex flex-col gap-0.5">
              {TOC_ITEMS.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileOpen(false);
                  }}
                  className={`text-left text-sm px-3 py-2 rounded transition-smooth flex items-center gap-2 ${
                    activeId === item.id
                      ? "bg-primary/10 text-accent-teal font-medium border-l-2 border-accent-teal"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-ocid={`toc-mobile-${item.id}`}
                >
                  <span className="text-[10px] font-mono text-muted-foreground/60 w-4">
                    {i + 1}
                  </span>
                  <span>{item.label}</span>
                  {activeId === item.id && (
                    <ChevronUp size={12} className="ml-auto text-accent-teal" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
