import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollChrome } from "@/components/layout/scroll-chrome";
import { EasterEgg } from "@/components/ui/easter-egg";
import { GlobalShortcuts } from "@/components/ui/global-shortcuts";
import { SITE_URL } from "@/lib/constants";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Deepanshu Chauhan · Portfolio",
    template: "%s · Deepanshu Chauhan",
  },
  description:
    "Deepanshu Chauhan (su6osec) — cybersecurity researcher and cloud infrastructure engineer focused on bug bounty, penetration testing, recon automation, and secure operations.",
  keywords: [
    "Deepanshu Chauhan",
    "su6osec",
    "cybersecurity",
    "cloud infrastructure",
    "penetration testing",
    "bug bounty",
    "recon automation",
  ],
  authors: [{ name: "Deepanshu Chauhan", url: SITE_URL }],
  creator: "Deepanshu Chauhan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Deepanshu Chauhan",
    title: "Deepanshu Chauhan · Portfolio",
    description:
      "Portfolio of Deepanshu Chauhan — security research, bug bounty, recon automation, and cloud infrastructure engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepanshu Chauhan · su6osec",
    description:
      "Cybersecurity researcher and cloud infrastructure engineer — bug bounty, penetration testing, and automation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#060508",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-fuchsia-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <ScrollChrome />
        <GlobalShortcuts />
        <SiteHeader />
        <main id="main-content" className="relative min-w-0 overflow-x-clip">
          {children}
        </main>
        <SiteFooter />
        <EasterEgg />
      </body>
    </html>
  );
}
