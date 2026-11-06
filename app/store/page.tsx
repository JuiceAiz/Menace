import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";

export const metadata: Metadata = {
  title: "Store",
  description: "Official Menace jerseys, hoodies and mousepads. Shipping across Nigeria.",
  alternates: { canonical: "/store" },
};

export default function StorePage() {
  return (
    <PendingPage
      kicker="The drop"
      title="Wear the noise."
      description="Jerseys, hoodies and mousepads with a real cart and checkout. Paystack is the planned processor for Nigeria-first payments."
      bullets={[
        "Product grid with variants and stock state",
        "Cart drawer with persistent state",
        "Paystack checkout with webhook order confirmation",
      ]}
    />
  );
}
