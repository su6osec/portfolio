import { FooterSocialBar } from "@/components/layout/footer-social-bar";

export function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden border-t border-border-dark py-14"
      role="contentinfo"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-fuchsia-500/35 to-transparent" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-1/3 bg-[radial-gradient(ellipse_85%_55%_at_50%_100%,rgba(234,88,12,0.06),transparent_58%)] dark:bg-[radial-gradient(ellipse_85%_55%_at_50%_100%,rgba(251,146,60,0.10),transparent_58%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex max-w-content flex-col gap-8 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-center gap-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-4 sm:text-left">
          <p className="whitespace-nowrap text-sm text-muted-dark">
            <span className="font-mono text-[11px] text-muted-dark/80">
              &copy; 2026
            </span>
            {" "}
            <span className="font-semibold text-ink-dark">Deepanshu Chauhan</span>
            {" "}
            <span className="font-mono text-[11px] text-muted-dark/80">
              · All rights reserved.
            </span>
          </p>
          <FooterSocialBar />
        </div>
      </div>
    </footer>
  );
}
