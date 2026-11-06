import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";

export const metadata: Metadata = {
  title: "About",
  description: "The Menace story — a Lagos-born Mobile Legends squad built in 2025.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PendingPage
      kicker="Our story"
      title="Born loud. Built to last."
      description="The full squad story, staff directory and mission — with the timeline from pickup squad to MPL champions."
      bullets={[
        "Founding story and mission",
        "Staff and support team directory",
        "Social links and press contact",
      ]}
    />
  );
}
