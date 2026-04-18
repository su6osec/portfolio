export type TimelineEntry = {
  title: string;
  org: string;
  year: string;
  description: string;
  /** Short vibe label for the card (Gen-Z style chip). */
  vibe?: string;
};

export const TIMELINE: TimelineEntry[] = [
  {
    title: "BCA — Industry Integrated",
    org: "Graphic Era Hill University",
    year: "2022–2025",
    vibe: "Edu",
    description:
      "Undergraduate program combining computer applications with industry exposure, building foundations in systems, networking, and security fundamentals.",
  },
  {
    title: "Top 5% — Offensive Security Paths",
    org: "TryHackMe",
    year: "2024",
    vibe: "Certs",
    description:
      "Consistently ranked in the top percentile across offensive security learning paths, sharpening practical exploitation and privilege escalation skills.",
  },
  {
    title: "CTF Participant",
    org: "Security BSides Dehradun",
    year: "2024",
    vibe: "Community",
    description:
      "Competed in community CTF challenges, collaborating on cryptography, web, and forensics-style problems in a conference setting.",
  },
  {
    title: "Cloud & Infrastructure Engineer",
    org: "LTIMindtree",
    year: "2026 — Present",
    vibe: "Role",
    description:
      "Operating and hardening cloud and on-prem infrastructure, supporting reliability, observability, and secure delivery practices.",
  },
];
