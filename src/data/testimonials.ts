export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  org: string;
};

/** Placeholder endorsements — swap with real quotes and attributions when available. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Deepanshu communicates findings with clarity and respects scope. His reports were actionable and easy to triage.",
    name: "A. Sharma",
    role: "Engineering lead",
    org: "Placeholder org",
  },
  {
    quote:
      "Reliable partner on infrastructure hardening—thoughtful about trade-offs and documentation.",
    name: "R. Mehta",
    role: "Security program manager",
    org: "Placeholder org",
  },
  {
    quote:
      "Strong automation mindset: less manual toil, more signal for the team.",
    name: "K. Verma",
    role: "DevOps engineer",
    org: "Placeholder org",
  },
];
