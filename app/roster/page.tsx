import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";

export const metadata: Metadata = {
  title: "Roster",
  description: "Meet the Menace Mobile Legends: Bang Bang starting five, substitutes and coaching staff.",
  alternates: { canonical: "/roster" },
};

export default function RosterPage() {
  return (
    <PendingPage
      kicker="The squad"
      title="Five starters. Two staff. Zero passengers."
      description="The full roster experience — player cards, 3D hover states, signature picks and deep profile pages — is next in the build queue."
      bullets={[
        "Starter cards with 3D tilt, purple energy glow and hero-splash reveals",
        "Profile pages with bio, KDA, win rate, hero pool and achievements",
        "Subs, coach and analyst cards with their own socials",
      ]}
    />
  );
}
