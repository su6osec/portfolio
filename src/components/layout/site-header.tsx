"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { hrefToSectionId, useActiveSection } from "@/hooks/use-active-section";
import { CursorFollowEyes } from "@/components/ui/cursor-follow-eyes";
import { ResumeButton } from "@/components/ui/resume-button";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#activity", label: "GitHub" },
  { href: "#achievements", label: "Achievements" },
  { href: "#certifications", label: "Certs" },
  { href: "#testimonials", label: "Voices" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
] as const;

const MID = Math.ceil(NAV.length / 2);

function navLinkClass(active: boolean) {
  return active
    ? "bg-fuchsia-500/15 text-fuchsia-300 ring-1 ring-fuchsia-500/30 transition-[color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
    : "text-muted-dark transition-[color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-purple-950/80 hover:text-fuchsia-300";
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-[20px] w-[20px]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <motion.path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        initial={false}
        animate={open ? { d: "M6 6l12 12", opacity: 1 } : { d: "M5 7.5h14", opacity: 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M5 12h14"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      />
      <motion.path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        initial={false}
        animate={open ? { d: "M18 6L6 18", opacity: 1 } : { d: "M5 16.5h14", opacity: 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  const { leftNav, rightNav } = useMemo(() => {
    return {
      leftNav: NAV.slice(0, MID),
      rightNav: NAV.slice(MID),
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const heroActive = active === "hero";

  const link = (item: (typeof NAV)[number]) => {
    const id = hrefToSectionId(item.href);
    const isActive = id !== null && active === id;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={`interactive-link whitespace-nowrap rounded-full px-2.5 py-1.5 text-[12px] font-medium transition-colors sm:text-[13px] ${navLinkClass(isActive)}`}
        onClick={() => setOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[200] ${
        scrolled ? "py-0" : "px-3 pt-3 sm:px-5 sm:pt-4"
      }`}
    >
      <div
        className={
          scrolled
            ? "w-full"
            : "mx-auto w-full max-w-[min(80rem,calc(100%-1.25rem))]"
        }
      >
        <nav
          aria-label="Primary"
          className={`relative flex w-full items-center overflow-visible border border-white/[0.07] bg-zinc-950/70 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150 ${
            scrolled ? "rounded-none border-x-0 border-t-0" : "rounded-[1.5rem]"
          }`}
        >
          <div
            className={`relative flex w-full min-w-0 items-center gap-2 py-2 sm:gap-3 ${
              scrolled
                ? "mx-auto max-w-content px-3 sm:px-5 lg:px-8"
                : "px-2.5 sm:px-4"
            }`}
          >
              <Link
                href="#hero"
                aria-label="Home"
                aria-current={heroActive ? "page" : undefined}
                className="interactive-link relative z-[25] shrink-0 rounded-full px-2 py-1.5 font-heading text-[clamp(0.78rem,0.65rem+1.35vw,1.35rem)] font-semibold leading-none tracking-tight text-ink-dark transition-[color,opacity,transform] duration-200 ease-out hover:text-ink-dark sm:px-2.5 xl:text-[clamp(1rem,0.85rem+1vw,1.5rem)]"
                onClick={() => setOpen(false)}
              >
                <span className="text-gradient">P</span>ortfolio<span className="text-gradient">.</span>
              </Link>

              <div className="pointer-events-none absolute left-1/2 top-1/2 z-[8] -translate-x-1/2 -translate-y-1/2 lg:hidden" aria-hidden>
                <div className="pointer-events-auto">
                  <CursorFollowEyes variant="nav" className="scale-[0.78]" />
                </div>
              </div>

              <div className="hidden min-w-0 flex-1 flex-col overflow-visible lg:flex">
                <div className="flex min-h-[2.75rem] min-w-0 flex-1 items-center gap-3">
                  <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-0.5 lg:gap-1">
                    {leftNav.map((item) => (
                      <span key={item.href}>{link(item)}</span>
                    ))}
                  </div>

                  <div className="flex shrink-0 items-center justify-center px-1" aria-hidden>
                    <CursorFollowEyes variant="nav" />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-wrap items-center justify-start gap-0.5 lg:gap-1">
                    {rightNav.map((item) => (
                      <span key={item.href}>{link(item)}</span>
                    ))}
                  </div>
                </div>
              </div>

              <ResumeButton className="relative z-[25] hidden shrink-0 self-center lg:inline-flex" />

              <div className="relative z-[25] ml-auto flex shrink-0 items-center lg:ml-0">
                <button
                  type="button"
                  className="relative z-[210] inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-dark backdrop-blur-md transition-[color,background-color,box-shadow,transform] duration-200 ease-out hover:bg-white/10 active:scale-[0.97] lg:hidden"
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  onClick={() => setOpen((v) => !v)}
                  aria-label={open ? "Close menu" : "Open menu"}
                >
                  <span className="sr-only">Menu</span>
                  <HamburgerIcon open={open} />
                </button>
              </div>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className={`fixed inset-x-0 bottom-0 z-[150] flex flex-col lg:hidden ${
              scrolled ? "top-14" : "top-[4.25rem]"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <button
              type="button"
              aria-label="Close menu overlay"
              className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-4 mt-3 flex max-h-[min(82dvh,calc(100dvh-5rem))] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/55 shadow-2xl shadow-black/50 ring-1 ring-white/[0.06] backdrop-blur-2xl"
            >
              <nav className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-2 py-2">
                <ul className="flex flex-col gap-2">
                  {NAV.map((item, index) => {
                    const id = hrefToSectionId(item.href);
                    const isActive = id !== null && active === id;
                    const num = String(index + 1).padStart(2, "0");
                    return (
                      <li key={item.href} className="min-w-0">
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={`section-card section-card--compact relative z-0 flex items-center gap-3 text-[15px] font-medium tracking-tight transition-[color,box-shadow,border-color] ${
                            isActive
                              ? "border-fuchsia-500/30 text-fuchsia-200 ring-1 ring-fuchsia-500/25"
                              : "text-ink-dark/95"
                          }`}
                          onClick={() => setOpen(false)}
                        >
                          <span
                            className="relative z-[1] w-8 shrink-0 font-mono text-[clamp(0.625rem,0.58rem+0.12vw,0.75rem)] font-semibold tabular-nums tracking-[0.2em] text-fuchsia-400/85"
                            aria-hidden
                          >
                            {num}
                          </span>
                          <span className="relative z-[1] min-w-0 flex-1">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="shrink-0 border-t border-white/[0.06] p-3">
                <ResumeButton
                  variant="accent"
                  disableAnimation
                  className="w-full justify-center py-3 text-sm font-semibold"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
