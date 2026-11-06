import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ResultsStrip } from "@/components/home/results-strip";
import { RosterTeaser } from "@/components/home/roster-teaser";
import { FeatureBand } from "@/components/home/feature-band";
import { StatDashboard } from "@/components/home/stat-dashboard";
import { PickEm } from "@/components/home/pick-em";
import { ArmyWall } from "@/components/home/army-wall";
import { SponsorStrip } from "@/components/home/sponsor-strip";
import { Newsletter } from "@/components/home/newsletter";
import { site, starters } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: `${site.fullName} — ${site.tagline}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
    url: "/",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: site.fullName,
  alternateName: site.shortName,
  sport: "Esports",
  description: site.description,
  url: site.url,
  foundingDate: site.est,
  slogan: site.tagline,
  location: { "@type": "Place", name: site.location },
  member: starters.map((player) => ({
    "@type": "Person",
    name: player.realName,
    alternateName: player.ign,
    jobTitle: `${player.role} laner`,
  })),
  sameAs: site.socials.map((social) => social.url),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Content is static, trusted JSON from local files.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <ResultsStrip />
      <RosterTeaser />
      <FeatureBand />
      <StatDashboard />
      <PickEm />
      <ArmyWall />
      <SponsorStrip />
      <Newsletter />
    </>
  );
}
