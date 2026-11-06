import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partner with Menace Esports — audience data, media kit and sponsorship enquiries.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <PendingPage
      kicker="Commercial"
      title="Reach the loudest room in African MLBB."
      description="Partner logos, a downloadable media kit and an enquiry form with tiered packages."
      bullets={[
        "Partner wall grouped by tier",
        "Media kit with verified audience numbers",
        "Sponsorship enquiry form routed to the commercial inbox",
      ]}
    />
  );
}
