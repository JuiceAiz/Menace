"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { fans, formatMatchDate, nextMatch } from "@/lib/content";
import { cn } from "@/lib/cn";

type Pick = "menace" | "opponent";

export function PickEm() {
  const [pick, setPick] = useState<Pick | null>(null);
  const storageKey = `menace-pickem:${nextMatch.id}`;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "menace" || saved === "opponent") setPick(saved);
  }, [storageKey]);

  const vote = (value: Pick) => {
    window.localStorage.setItem(storageKey, value);
    setPick(value);
  };

  const split = pick === "opponent" ? { menace: 31, opponent: 69 } : { menace: 68, opponent: 32 };

  return (
    <section id="pick-em" className="shell py-16 md:py-24" aria-labelledby="pickem-heading">
      <SectionHeading
        kicker="Fan pick'em"
        title={<span id="pickem-heading">Call it before the draft.</span>}
        description="One pick per match. Correct calls bank 25 Army points and climb the seasonal leaderboard."
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative overflow-hidden clip-card border border-line/90 bg-gradient-to-b from-[#1d1033] to-[#120a1f] p-5 sm:p-6">
          <div
            className="pointer-events-none absolute -right-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-brand/25 blur-[60px]"
            aria-hidden
          />
          <div className="relative flex flex-wrap items-center justify-between gap-2">
            <span className="kicker text-brand">{fans.pickem.prompt}</span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-muted">
              Locks {formatMatchDate(nextMatch.startsAt)}
            </span>
          </div>

          <p className="relative mt-3 font-display text-[22px] font-bold uppercase leading-tight text-white sm:text-[26px]">
            Menace <span className="text-gold">vs</span> {nextMatch.opponent.name}
          </p>
          <p className="relative mt-1 text-[11.5px] uppercase tracking-[0.14em] text-muted">
            {nextMatch.tournament} · {nextMatch.stage}
          </p>

          <div className="relative mt-5 grid grid-cols-2 gap-2.5">
            <PickButton
              label="Menace"
              sub="MNC"
              selected={pick === "menace"}
              onClick={() => vote("menace")}
              accent="brand"
            />
            <PickButton
              label={nextMatch.opponent.name}
              sub={nextMatch.opponent.tag}
              selected={pick === "opponent"}
              onClick={() => vote("opponent")}
              accent="neutral"
            />
          </div>

          <div className="relative mt-5">
            <div className="flex h-2 overflow-hidden bg-white/[0.06]">
              <span
                className="h-full bg-gradient-to-r from-brand-deep to-brand transition-all duration-700"
                style={{ width: `${split.menace}%` }}
              />
              <span className="h-full flex-1 bg-white/20" />
            </div>
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.16em] text-muted">
              <span>Army split · {split.menace}%</span>
              <span>{split.opponent}%</span>
            </div>
          </div>

          <div
            className="relative mt-5 border border-line/70 bg-ink/50 px-3.5 py-3"
            aria-live="polite"
          >
            {pick ? (
              <p className="text-[12.5px] text-lavender">
                <span className="font-semibold text-win">Locked in —</span> you picked{" "}
                {pick === "menace" ? "Menace" : nextMatch.opponent.name}. {fans.pickem.reward}
              </p>
            ) : (
              <p className="text-[12.5px] text-muted">{fans.pickem.reward} Picks save on this device.</p>
            )}
          </div>
        </div>

        <div className="clip-card border border-line/90 bg-[#120a1f]/80 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.16em] text-white">
              Leaderboard
            </h3>
            <span className="border border-gold/30 bg-gold/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-gold">
              Season 4
            </span>
          </div>

          <table className="mt-4 w-full border-collapse text-left">
            <caption className="sr-only">Top five Fan Pick&apos;em players</caption>
            <thead>
              <tr className="text-[9px] uppercase tracking-[0.16em] text-muted">
                <th scope="col" className="pb-2 font-semibold">#</th>
                <th scope="col" className="pb-2 font-semibold">Fan</th>
                <th scope="col" className="pb-2 text-right font-semibold">Streak</th>
                <th scope="col" className="pb-2 text-right font-semibold">Pts</th>
              </tr>
            </thead>
            <tbody>
              {fans.pickem.leaderboard.map((row, index) => (
                <tr key={row.username} className="border-t border-line/60">
                  <td className="py-2.5 font-display text-[12px] font-bold text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-2.5 pr-2 text-[12.5px] text-lavender/90">
                    <span className="block truncate">@{row.username}</span>
                  </td>
                  <td className="tabular py-2.5 text-right text-[11.5px] text-muted">{row.streak}×</td>
                  <td className="tabular py-2.5 text-right font-display text-[14px] font-bold text-white">
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-4 border-t border-line/70 pt-3 text-[10.5px] uppercase tracking-[0.14em] text-muted">
            Local demo — leaderboard syncs once the fan backend ships.
          </p>
        </div>
      </div>
    </section>
  );
}

function PickButton({
  label,
  sub,
  selected,
  onClick,
  accent,
}: {
  label: string;
  sub: string;
  selected: boolean;
  onClick: () => void;
  accent: "brand" | "neutral";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group relative flex min-h-[68px] flex-col items-start justify-center border px-3 py-3 text-left transition-all duration-200",
        selected
          ? accent === "brand"
            ? "border-brand bg-brand/20 shadow-[0_0_30px_-10px_rgba(139,77,255,0.9)]"
            : "border-lavender/50 bg-white/10"
          : "border-line/90 bg-white/[0.02] hover:border-brand/50 hover:bg-brand/[0.07]",
      )}
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">{sub}</span>
      <span className="mt-0.5 truncate font-display text-[16px] font-bold uppercase tracking-[0.04em] text-white">
        {label}
      </span>
      {selected ? (
        <span className="absolute right-2.5 top-2.5 text-[10px] text-win" aria-hidden>
          ✓
        </span>
      ) : null}
    </button>
  );
}
