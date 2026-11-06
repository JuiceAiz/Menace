import type { Player } from "@/lib/types";
import { cn } from "@/lib/cn";

/**
 * Placeholder player art. Deliberately abstract (no fake likeness) so the layout
 * reads well until real, licensed player photography lands in /public/players.
 */
export function PlayerArt({
  player,
  className,
  showLabel = true,
}: {
  player: Player;
  className?: string;
  showLabel?: boolean;
}) {
  if (player.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={player.image}
        alt={`${player.ign} — Menace Esports ${player.role}`}
        className={cn("h-full w-full object-cover object-top", className)}
        loading="lazy"
      />
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(130% 80% at 50% 0%, ${player.accent}66 0%, transparent 62%), linear-gradient(180deg, #1c0f31 0%, #120a20 62%, #0d0716 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 11px)",
        }}
      />
      <div
        className="absolute bottom-[18%] left-1/2 h-[62%] w-[58%] -translate-x-1/2"
        style={{
          background: `linear-gradient(180deg, ${player.accent}55, ${player.accent}05 75%)`,
          clipPath: "polygon(50% 0, 96% 26%, 82% 100%, 18% 100%, 4% 26%)",
          filter: "blur(6px)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      {showLabel ? (
        <span className="absolute left-3 top-3 border border-white/10 bg-black/30 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/45">
          Photo pending
        </span>
      ) : null}
    </div>
  );
}
