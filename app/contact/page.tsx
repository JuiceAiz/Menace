import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Business, press and fan enquiries for Menace Esports.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PendingPage
      kicker="Contact"
      title="Talk to the team."
      description={`Business enquiries: ${site.email}. Press: ${site.pressEmail}. A full contact form with routing is coming in the final phase.`}
      bullets={[
        "Business and sponsorship enquiries",
        "Press and interview requests",
        "Fan mail and community questions",
      ]}
    />
  );
}
