import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";

export const metadata: Metadata = {
  title: "Achievements",
  description: "The Menace trophy cabinet and a season-by-season timeline of placements.",
  alternates: { canonical: "/achievements" },
};

export default function AchievementsPage() {
  return (
    <PendingPage
      kicker="Trophy cabinet"
      title="Built in public. Won in public."
      description="A trophy cabinet and placement timeline by season, with the story behind each run."
      bullets={[
        "Gold-accented trophy cabinet",
        "Season-by-season placement timeline",
        "Roster and staff credits for every title",
      ]}
    />
  );
}
