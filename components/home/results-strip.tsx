import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatMatchDate, recentResults } from "@/lib/content";
import { cn } from "@/lib/cn";

export function ResultsStrip() {
  return (
    <section className="shell py-14 md:py-20" aria-labelledby="results-heading">
      <SectionHeading
        kicker="Latest results"
        title={<span id="results-heading">No soft series.</span>}
        description="Every series from the current MPL Nigeria split, with the VOD attached."
        action={{ label: "All matches", href: "/matches" }}
      />

      <div className="no-scrollbar -mx-5 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
        {recentResults.map((result) => {
          const won = result.outcome === "win";
          return (
            <article
              key={result.id}
              className="group relative w-[268px] shrink-0 snap-start clip-card-sm border border-line/90 bg-panel/70 p-4 transition-colors hover:border-brand/50 sm:w-[300px]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-muted">
                  {result.tournament} · {result.season}
                </span>
                <span
                  className={cn(
                    "clip-badge px-2 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em]",
                    won ? "bg-win/15 text-win" : "bg-loss/15 text-loss",
                  )}
                >
                  {won ? "Win" : "Loss"}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] font-bold uppercase tracking-[0.06em] text-white">
                    Menace
                  </p>
                  <p className="truncate text-[11px] uppercase tracking-[0.1em] text-muted">
                    {result.opponent.name}
                  </p>
                </div>
                <p className={cn("tabular shrink-0 font-display text-[30px] font-bold leading-none", won ? "text-white" : "text-white/80")}>
                  {result.score.menace}
                  <span className="mx-1 text-[18px] text-gold">:</span>
                  {result.score.opponent}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-3">
                <span className="text-[10px] uppercase tracking-[0.12em] text-muted">
                  {formatMatchDate(result.date, false)}
                </span>
                <a
                  href={result.vod}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-lavender transition-colors hover:text-white"
                >
                  Watch VOD
                  <span aria-hidden>↗</span>
                </a>
              </div>

              <span
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                  won ? "bg-win/70" : "bg-loss/70",
                )}
                aria-hidden
              />
            </article>
          );
        })}

        <Link
          href="/matches"
          className="flex w-[190px] shrink-0 snap-start flex-col justify-between border border-dashed border-line/80 p-4 text-muted transition-colors hover:border-brand/50 hover:text-lavender"
        >
          <span className="font-display text-[13px] font-bold uppercase tracking-[0.14em]">Full archive</span>
          <span className="text-[11px] leading-snug">Every result, VOD and stat line since 2025.</span>
          <span aria-hidden className="text-lg">→</span>
        </Link>
      </div>
    </section>
  );
}
