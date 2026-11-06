import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";

export const metadata: Metadata = {
  title: "Media",
  description: "Menace highlight reels, stream schedule, gallery and social embeds.",
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  return (
    <PendingPage
      kicker="Media hub"
      title="Clips that do the talking."
      description="Highlight reels, the weekly stream schedule, photo galleries and YouTube/TikTok embeds are queued for phase three."
      bullets={[
        "Highlight reels with lazy-loaded players",
        "Weekly stream schedule with local time",
        "Gallery grid and social embeds",
      ]}
    />
  );
}
