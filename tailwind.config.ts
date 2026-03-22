import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: "#f4f6fb",
          dark: "#060508",
        },
        surface: {
          light: "rgba(255, 255, 255, 0.72)",
          dark: "rgba(12, 10, 18, 0.88)",
        },
        ink: {
          light: "#0f172a",
          dark: "#ece8f4",
        },
        muted: {
          light: "#475569",
          dark: "#9ca3af",
        },
        border: {
          light: "rgba(15, 23, 42, 0.08)",
          dark: "rgba(139, 92, 246, 0.12)",
        },
        accent: {
          DEFAULT: "#c026d3",
          soft: "#e879f9",
          hoverLight: "#a21caf",
          hoverDark: "#f0abfc",
        },
        glow: {
          purple: "#7c3aed",
          violet: "#8b5cf6",
          plum: "#581c87",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: [
          "clamp(2.75rem, 5.5vw + 1rem, 4.75rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "650" },
        ],
        "section-title": [
          "clamp(1.85rem, 2.2vw + 1rem, 2.65rem)",
          { lineHeight: "1.12", letterSpacing: "-0.025em", fontWeight: "650" },
        ],
        body: ["clamp(1rem, 0.25vw + 0.94rem, 1.125rem)", { lineHeight: "1.7" }],
        overline: ["0.7rem", { lineHeight: "1.4", letterSpacing: "0.28em" }],
      },
      maxWidth: {
        content: "1240px",
      },
      boxShadow: {
        glass:
          "0 1px 0 rgba(255,255,255,0.55) inset, 0 8px 32px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)",
        "glass-dark":
          "0 1px 0 rgba(167, 139, 250, 0.06) inset, 0 12px 40px rgba(0, 0, 0, 0.55), 0 2px 12px rgba(88, 28, 135, 0.15)",
        lift: "0 18px 50px -24px rgba(192, 38, 211, 0.35)",
        "lift-dark": "0 18px 50px -24px rgba(167, 139, 250, 0.28)",
      },
      backdropBlur: {
        nav: "16px",
        panel: "20px",
      },
      transitionDuration: {
        DEFAULT: "220ms",
      },
      keyframes: {
        "grid-drift": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "28px 28px" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "grid-drift": "grid-drift 22s linear infinite",
        shimmer: "shimmer 2.4s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
