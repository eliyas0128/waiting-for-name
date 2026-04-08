import { useEffect, useState } from "react";

export function useActiveSection(
  sectionIds: string[],
  rootMargin = "-20% 0px -60% 0px",
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          }
        },
        { rootMargin },
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) {
        obs.disconnect();
      }
    };
  }, [sectionIds, rootMargin]);

  return activeId;
}
