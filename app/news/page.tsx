import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";

export const metadata: Metadata = {
  title: "News",
  description: "Match recaps, announcements and behind-the-scenes stories from the Menace camp.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <PendingPage
      kicker="Newsroom"
      title="Recaps, receipts, and the occasional rant."
      description="Article index and individual posts are coming with MDX-backed content, share buttons and per-page OG images."
      bullets={[
        "MDX articles the team can publish without touching code",
        "Match recaps, announcements and behind-the-scenes",
        "Share buttons plus per-article SEO and OG tags",
      ]}
    />
  );
}
