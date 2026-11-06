"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlayerArt } from "@/components/ui/player-art";
import { starters } from "@/lib/content";
import type { Player } from "@/lib/types";
import { cn } from "@/lib/cn";

export function RosterTeaser() {
  return (
    <section className="relative border-y border-line/60 bg-[#100819]/80 py-16 md:py-24" id="roster">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background: "radial-gradient(60% 50% at 50% 0%, rgba(139,77,255,0.16), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="shell relative">
        <SectionHeading
          kicker="The starting five"
          title="Five lanes. One nasty habit of winning."
          description="Hover or tap a player to see the signature pick. Every card links to a full profile with stats, achievements and clips."
          action={{ label: "Full roster", href: "/roster" }}
        />

        <ul className="mt-9 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
          {starters.map((player, index) => (
            <PlayerCard key={player.slug} player={player} index={index} />
          ))}
        </ul>

        <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-muted">
          Photography pending — placeholder art shown.
        </p>
      </div>
    </section>
  );
}

function PlayerCard({ player, index }: { player: Player; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [revealed, setRevealed] = useState(false);
  // On touch, the first tap reveals the signature pick instead of navigating;
  // the second tap follows the link.
  const blockNextClick = useRef(false);

  const handleMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse") return;
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    node.style.setProperty("--rx", `${(0.5 - py) * 12}deg`);
    node.style.setProperty("--ry", `${(px - 0.5) * 14}deg`);
    node.style.setProperty("--gx", `${px * 100}%`);
    node.style.setProperty("--gy", `${py * 100}%`);
  };

  const handleLeave = () => {
    const node = cardRef.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  };

  const signature = player.signatureHeroes[0]?.name ?? player.role;

  return (
    <li className="[perspective:900px]">
      <Link
        ref={cardRef}
        href={`/roster/${player.slug}`}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse") return;
          blockNextClick.current = !revealed;
          setRevealed((prev) => !prev);
        }}
        onClick={(event) => {
          if (blockNextClick.current) {
            event.preventDefault();
            blockNextClick.current = false;
          }
        }}
        onFocus={() => setRevealed(true)}
        onBlur={() => setRevealed(false)}
        className="tilt-surface group relative block h-full overflow-hidden clip-card border border-line/90 bg-panel/60 focus-visible:outline-offset-4"
        style={{
          transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        }}
      >
        <div className="relative aspect-[3/4.15] w-full overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
            <PlayerArt player={player} showLabel={false} />
          </div>

          {/* Signature hero splash */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-between p-3 transition-opacity duration-300",
              "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
              revealed && "opacity-100",
            )}
            style={{
              background: `radial-gradient(110% 80% at 50% 100%, ${player.accent}bb 0%, rgba(13,7,22,0.86) 60%, rgba(13,7,22,0.95) 100%)`,
            }}
            aria-hidden
          >
            <span className="self-end border border-white/20 bg-black/30 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/70">
              Signature pick
            </span>
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
                {player.role} lane
              </p>
              <p className="mt-1 font-display text-[26px] font-bold uppercase leading-[0.9] text-white">
                {signature}
              </p>
              <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                View profile <span aria-hidden>→</span>
              </p>
            </div>
          </div>

          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(220px circle at var(--gx,50%) var(--gy,50%), ${player.accent}33, transparent 65%)`,
            }}
            aria-hidden
          />

          <span className="absolute left-2.5 top-2.5 font-display text-[11px] font-bold tracking-[0.16em] text-white/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute right-2.5 top-2.5 border border-white/15 bg-black/30 px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-[0.16em] text-white/70">
            {player.countryCode}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-brand-light">
              {player.role}
            </p>
            <p className="mt-1 font-display text-[26px] font-bold uppercase leading-none text-white sm:text-[28px]">
              {player.ign}
            </p>
            <p className="mt-1 truncate text-[10.5px] text-white/55">{player.realName}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 border-t border-line/70 bg-[#0f0819]/90 p-2.5">
          {player.signatureHeroes.slice(0, 2).map((hero) => (
            <span
              key={hero.slug}
              className="clip-chip border border-line/80 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted"
            >
              {hero.name}
            </span>
          ))}
          <span className="ml-auto self-center text-[9px] uppercase tracking-[0.14em] text-brand/80">
            {player.stats.winRate}% WR
          </span>
        </div>
      </Link>
    </li>
  );
}
