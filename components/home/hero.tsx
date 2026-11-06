import Link from "next/link";
import { HeroMatchCard } from "./hero-match-card";
import { ButtonLink } from "@/components/ui/button";
import { liveMatch, nextMatch, site, stats, starters } from "@/lib/content";
import { SocialIcon } from "@/components/ui/social-icon";

const seasonRecord = { wins: 8, losses: 2 };

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-14 pt-[100px] md:pb-20 md:pt-[128px]">
      {/* Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 55% at 78% 18%, rgba(139,77,255,0.28) 0%, transparent 62%), radial-gradient(60% 50% at 8% 8%, rgba(91,33,182,0.22) 0%, transparent 60%), linear-gradient(180deg, #120a20 0%, #0d0716 62%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(217,204,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(217,204,255,0.06) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(70% 60% at 50% 30%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 30%, black, transparent 75%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 -z-10 h-[560px] w-[560px] rotate-[18deg] opacity-40"
        style={{
          background:
            "conic-gradient(from 210deg at 50% 50%, rgba(139,77,255,0.5), transparent 35%, rgba(245,185,66,0.16) 55%, transparent 75%)",
          filter: "blur(50px)",
        }}
        aria-hidden
      />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="clip-chip inline-flex items-center gap-2 border border-brand/40 bg-brand/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              <span className="font-display text-[10.5px] font-bold uppercase tracking-[0.22em] text-lavender">
                Est. {site.est} · Lagos, NG
              </span>
            </span>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-muted">
              {site.game}
            </span>
          </div>

          <h1 className="mt-5 font-display text-[clamp(58px,12vw,112px)] font-bold leading-[0.86] tracking-[-0.01em]">
            <span className="block text-white">Be a</span>
            <span className="relative mt-1 block">
              <span className="relative z-10 bg-gradient-to-r from-white via-lavender to-brand-light bg-clip-text text-transparent">
                Menace
              </span>
              <span className="text-gold">.</span>
              <span
                className="absolute -bottom-2 left-1 h-[6px] w-[62%] skew-x-[-24deg] bg-gradient-to-r from-brand to-transparent md:h-[8px]"
                aria-hidden
              />
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-muted md:text-[16.5px]">
            Five players. One city. Zero quiet weekends. Menace is the Mobile Legends squad
            putting Nigerian esports on the map — pick by pick, series by series.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={site.stream.url} external size="lg" className="w-full sm:w-auto">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Watch live
            </ButtonLink>
            <ButtonLink href="/roster" variant="outline" size="lg" className="w-full sm:w-auto">
              Meet the squad
            </ButtonLink>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 divide-x divide-line/70 border-y border-line/70 py-4">
            <div className="pr-3">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted">S4 record</dt>
              <dd className="tabular mt-1 font-display text-[24px] font-bold leading-none text-white">
                {seasonRecord.wins}<span className="mx-0.5 text-gold">–</span>{seasonRecord.losses}
              </dd>
            </div>
            <div className="px-3">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted">Trophies</dt>
              <dd className="tabular mt-1 font-display text-[24px] font-bold leading-none text-white">
                {stats.totals.find((t) => t.label === "Trophies")?.value ?? 3}
              </dd>
            </div>
            <div className="pl-3">
              <dt className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted">Army</dt>
              <dd className="mt-1 font-display text-[24px] font-bold leading-none text-white">{site.discord.members}</dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex -space-x-2" aria-hidden>
              {starters.slice(0, 4).map((player) => (
                <span
                  key={player.slug}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ink bg-panelAlt font-display text-[10px] font-bold text-lavender"
                  style={{ boxShadow: `inset 0 0 12px ${player.accent}55` }}
                >
                  {player.ign.slice(0, 2)}
                </span>
              ))}
            </div>
            <p className="text-[11.5px] uppercase tracking-[0.14em] text-muted">
              Backed by {site.discord.members} in the Menace Army
            </p>
            <div className="ml-auto hidden items-center gap-1.5 sm:flex">
              {site.socials.slice(0, 3).map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center border border-line/80 text-muted transition-colors hover:border-brand/60 hover:text-lavender"
                >
                  <SocialIcon platform={social.platform} size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <HeroMatchCard live={liveMatch} next={nextMatch} />
          <Link
            href="/matches"
            className="mt-4 flex min-h-[48px] items-center justify-between border border-line/70 bg-white/[0.02] px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-brand/50 hover:text-lavender"
          >
            Full season schedule
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <p
        className="pointer-events-none absolute -bottom-6 left-1/2 hidden w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[clamp(80px,16vw,220px)] font-bold uppercase leading-none text-outline lg:block"
        aria-hidden
      >
        Menace
      </p>
    </section>
  );
}
