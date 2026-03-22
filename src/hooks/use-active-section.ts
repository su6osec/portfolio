"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "activity",
  "achievements",
  "certifications",
  "testimonials",
  "writing",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const resolve = () => {
      const scrollY = window.scrollY;
      const offset = Math.min(180, window.innerHeight * 0.24);
      let current: SectionId = "hero";

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY + offset >= top) {
          current = id;
        }
      }
      setActive(current);
    };

    resolve();
    window.addEventListener("scroll", resolve, { passive: true });
    window.addEventListener("resize", resolve, { passive: true });
    return () => {
      window.removeEventListener("scroll", resolve);
      window.removeEventListener("resize", resolve);
    };
  }, []);

  return active;
}

export function hrefToSectionId(href: string): SectionId | null {
  if (!href.startsWith("#")) return null;
  const id = href.slice(1) as SectionId;
  return SECTION_IDS.includes(id as SectionId) ? (id as SectionId) : null;
}
