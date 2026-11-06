"use client";

import Link from "next/link";
import { Countdown } from "./countdown";
import { ButtonLink } from "@/components/ui/button";
import { formatMatchDate, googleCalendarUrl } from "@/lib/content";
import type { LiveMatch, UpcomingMatch } from "@/lib/types";
import { cn } from "@/lib/cn";

type NextMatch = UpcomingMatch & { calendar?: { title: string; durationMinutes: number; location: string } };

export function HeroMatchCard({ live, next }: { live: LiveMatch; next: NextMatch }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-6 rounded-full bg-brand/20 blur-[70px]"
        aria-hidden
      />
      <div className="relative clip-card border border-line/90 bg-[#120a1f]/95 p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:p-5">
        <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-brand via-brand-light to-transparent" aria-hidden />
        {live.active ? <LivePanel live={live} /> : <UpcomingPanel next={next} />}
      </div>
      <p className="mt-3 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.2em] text-muted">
        <span>Times shown in WAT</span>
        <span className="text-brand/80">Placeholder fixture</span>
      </p>
    </div>
  );
}

function UpcomingPanel({ next }: { next: NextMatch }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="kicker text-brand">Next match</span>
        <span className="clip-chip border border-line px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-lavender">
          {next.format}
        </span>
      </div>

      <p className="mt-3 font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-white">
        {next.tournament} <span className="text-muted">· {next.season}</span>
      </p>
      <p className="text-[11.5px] uppercase tracking-[0.12em] text-muted">{next.stage}</p>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <TeamTile tag="MNC" name="Menace" primary />
        <span className="font-display text-[13px] font-bold uppercase tracking-[0.14em] text-gold">vs</span>
        <TeamTile tag={next.opponent.tag} name={next.opponent.name} />
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
          {formatMatchDate(next.startsAt)}
        </p>
        <Countdown target={next.startsAt} />
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <ButtonLink
          href={googleCalendarUrl(next, next.calendar?.durationMinutes ?? 120)}
          external
          className="w-full sm:flex-1"
        >
          Add to calendar
        </ButtonLink>
        <ButtonLink href={next.stream.url} external variant="outline" className="w-full sm:flex-1">
          Watch live
        </ButtonLink>
      </div>

      <Link
        href="#pick-em"
        className="group mt-4 flex min-h-[44px] items-center justify-between border-t border-line/70 pt-3 text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-lavender"
      >
        Predict this match
        <span className="text-gold transition-transform group-hover:translate-x-0.5" aria-hidden>
          +25 pts
        </span>
      </Link>
    </div>
  );
}

function LivePanel({ live }: { live: LiveMatch }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-loss opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-loss" />
          </span>
          <span className="font-display text-[12px] font-bold uppercase tracking-[0.3em] text-loss">Live now</span>
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-lavender">
          Game {live.game} · {live.format}
        </span>
      </div>

      <div className="mt-4 overflow-hidden border border-line/80">
        <div className="relative flex aspect-video items-center justify-center bg-[#0a0512]">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 40%, rgba(139,77,255,0.35), transparent 70%), repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 12px)",
            }}
            aria-hidden
          />
          <div className="relative text-center">
            <p className="font-display text-[11px] uppercase tracking-[0.3em] text-lavender">Stream embed</p>
            <p className="mt-1 text-[11px] text-muted">Loads on the watch page</p>
          </div>
        </div>
      </div>

      <p className="mt-4 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
        {live.tournament} · {live.stage}
      </p>
      <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <TeamTile tag="MNC" name="Menace" primary />
        <span className="tabular font-display text-[26px] font-bold text-white">
          {live.score.menace}
          <span className="mx-1 text-gold">:</span>
          {live.score.opponent}
        </span>
        <TeamTile tag={live.opponent.tag} name={live.opponent.name} />
      </div>

      <ButtonLink href={live.stream.url} external className="mt-5 w-full">
        Watch live stream
      </ButtonLink>
    </div>
  );
}

function TeamTile({ tag, name, primary }: { tag: string; name: string; primary?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center gap-1.5 text-center")}>
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center border font-display text-[17px] font-bold tracking-[0.04em]",
          primary
            ? "border-brand/70 bg-brand/15 text-white shadow-[0_0_24px_-8px_rgba(139,77,255,0.9)]"
            : "border-line bg-white/[0.03] text-lavender",
        )}
        aria-hidden
      >
        {tag}
      </span>
      <span className="max-w-[5.5rem] truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
        {name}
      </span>
    </div>
  );
}
