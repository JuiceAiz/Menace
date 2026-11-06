import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PendingPage } from "@/components/layout/pending-page";
import { getPlayer, players } from "@/lib/content";

export function generateStaticParams() {
  return players.map((player) => ({ slug: player.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const player = getPlayer(slug);
  if (!player) return { title: "Player not found" };
  return {
    title: `${player.ign} — ${player.role}`,
    description: player.bio,
    alternates: { canonical: `/roster/${player.slug}` },
  };
}

export default async function PlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const player = getPlayer(slug);
  if (!player) notFound();

  return (
    <PendingPage
      kicker={`${player.role} · ${player.country}`}
      title={`${player.ign} — ${player.realName}`}
      description={player.bio}
      bullets={[
        "Full career stats with animated KDA and win-rate charts",
        "Hero pool with pick rates and signature plays",
        "Achievements timeline and highlight reel",
      ]}
    />
  );
}
