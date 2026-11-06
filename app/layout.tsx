import type { Metadata, Viewport } from "next";
import { Poppins, Rajdhani } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ClientChrome } from "@/components/effects/client-chrome";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.fullName} — ${site.tagline}`,
    template: `%s | ${site.fullName}`,
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: [
    "Menace Esports",
    "MLBB",
    "Mobile Legends Bang Bang",
    "MPL Nigeria",
    "esports Nigeria",
    "Mobile Legends team",
  ],
  authors: [{ name: site.fullName, url: siteUrl }],
  creator: site.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.fullName,
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
    url: siteUrl,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d0716",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${rajdhani.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-ink font-body text-[15px] leading-relaxed text-[var(--text)] antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-brand focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-bold focus:uppercase focus:tracking-[0.2em] focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ClientChrome />
      </body>
    </html>
  );
}
