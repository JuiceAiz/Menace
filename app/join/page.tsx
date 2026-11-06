import type { Metadata } from "next";
import { PendingPage } from "@/components/layout/pending-page";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Apply for Menace trials, the academy squad, or the content creator programme.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  return (
    <PendingPage
      kicker="Open trials"
      title="We are always listening for the next problem."
      description="Trial and academy applications, plus the content creator programme, with validated forms and a reviewer inbox."
      bullets={[
        "Trial and academy application with rank and role checks",
        "Content creator programme application",
        "Server-side validation and email notification",
      ]}
    />
  );
}
