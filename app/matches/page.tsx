import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";

export const metadata: Metadata = {
  title: "Matches",
  description: "Menace fixtures, live scores and past results with VODs across every tournament.",
  alternates: { canonical: "/matches" },
};

export default function MatchesPage() {
  return (
    <PendingPage
      kicker="Fixtures & results"
      title="Every series, every VOD."
      description="The full match centre — upcoming fixtures, live scores, past results with filters by tournament and season — lands in phase two."
      bullets={[
        "Upcoming, live and past results in one filterable feed",
        "Add-to-calendar for every fixture",
        "VOD links and per-game scorelines",
      ]}
    />
  );
}
