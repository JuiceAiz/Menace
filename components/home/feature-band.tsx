import Link from "next/link";
import { HighlightPlayer } from "./highlight-player";
import { SectionHeading, ArrowIcon } from "@/components/ui/section-heading";
import { featuredPlayer } from "@/lib/content";

export function FeatureBand() {
  const player = featuredPlayer;
  const clip = player.clips[0];
  const statEntries = [
    { label: "KDA", value: player.stats.kda.toFixed(1) },
    { label: "Win rate", value: `${player.stats.winRate}%` },
    { label: "Games", value: String(player.stats.matches) },
    { label: "MVPs", value: String(player.stats.mvp) },
  ];

  return (
    <section className="shell py-16 md:py-24" aria-labelledby="feature-heading">
      <SectionHeading
        kicker="Player spotlight"
        title={<span id="feature-heading">Built for the last five minutes.</span>}
        description="One clip explains this squad better than any graphic: full send, clean execution, no panic."
        action={{ label: "All highlights", href: "/media" }}
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <HighlightPlayer
          title={clip?.title ?? "Menace — season highlight reel"}
          subtitle={`${player.ign} · ${player.role} lane`}
          url={clip?.url ?? "https://youtube.com/@menaceesports"}
          duration={clip?.duration ?? "0:24"}
        />

        <article className="relative flex flex-col justify-between overflow-hidden clip-card border border-line/90 bg-gradient-to-b from-panelAlt/70 to-panel/80 p-5">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full blur-[50px]"
            style={{ background: `${player.accent}55` }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="kicker text-gold">Featured</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">Season 4</span>
            </div>

            <Link href={`/roster/${player.slug}`} className="group mt-5 block">
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.24em] text-brand-light">
                {player.role} · {player.countryCode}
              </p>
              <h3 className="mt-1 font-display text-[42px] font-bold leading-none text-white transition-colors group-hover:text-lavender">
                {player.ign}
              </h3>
              <p className="mt-1 text-[12.5px] text-muted">{player.realName}</p>
            </Link>

            <blockquote className="mt-5 border-l-2 border-brand/60 pl-3 text-[13.5px] italic leading-relaxed text-lavender/90">
              “{player.quote}”
            </blockquote>

            <dl className="mt-6 grid grid-cols-4 gap-1.5">
              {statEntries.map((stat) => (
                <div key={stat.label} className="border border-line/70 bg-ink/40 px-1 py-2 text-center">
                  <dt className="text-[8.5px] font-semibold uppercase tracking-[0.14em] text-muted">{stat.label}</dt>
                  <dd className="tabular mt-1 font-display text-[19px] font-bold leading-none text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Link
            href={`/roster/${player.slug}`}
            className="group mt-6 inline-flex min-h-[44px] items-center justify-between border-t border-line/70 pt-4 font-display text-[12px] font-bold uppercase tracking-[0.18em] text-lavender transition-colors hover:text-white"
          >
            Player profile
            <ArrowIcon />
          </Link>
        </article>
      </div>
    </section>
  );
}
