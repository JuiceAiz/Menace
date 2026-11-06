import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { fans, site } from "@/lib/content";

const artGradients = [
  "linear-gradient(150deg, #3b1a63 0%, #150a25 60%, #0d0716 100%)",
  "linear-gradient(150deg, #5b21b6 0%, #1b0f2e 55%, #0d0716 100%)",
  "linear-gradient(150deg, #2b1246 0%, #40186f 45%, #0d0716 100%)",
];

export function ArmyWall() {
  return (
    <section className="relative border-y border-line/60 bg-[#0f0818] py-16 md:py-24">
      <div className="shell">
        <SectionHeading
          kicker="Menace Army"
          title={fans.army.headline}
          description={fans.army.blurb}
          action={{ label: "Submit fan art", href: site.discord.url, external: true }}
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="clip-card border border-line/90 bg-panel/60 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.16em] text-white">
                Top of the wall
              </h3>
              <span className="text-[9px] uppercase tracking-[0.16em] text-muted">This month</span>
            </div>
            <ul className="mt-4 divide-y divide-line/60">
              {fans.army.topFans.map((fan, index) => (
                <li key={fan.handle} className="flex items-center gap-3 py-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-line bg-panelAlt font-display text-[12px] font-bold text-lavender"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-white">
                      {fan.name} <span className="text-muted">{fan.handle}</span>
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-brand/80">{fan.badge}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ButtonLink href={site.discord.url} external variant="outline" className="mt-4 w-full">
              Join {site.discord.members} in Discord
            </ButtonLink>
          </div>

          <div>
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {fans.army.fanArt.map((art, index) => (
                <li
                  key={art.title}
                  className="group relative aspect-[4/5] overflow-hidden clip-card-sm border border-line/80"
                  style={{ background: artGradients[index % artGradients.length] }}
                >
                  <span
                    className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-60"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(125deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 12px)",
                    }}
                    aria-hidden
                  />
                  <span
                    className="absolute -bottom-6 -right-4 font-display text-[92px] font-bold leading-none text-white/[0.07]"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent p-3">
                    <p className="font-display text-[12.5px] font-bold uppercase leading-tight text-white">
                      {art.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted">
                      {art.artist} · {art.format}
                    </p>
                  </div>
                  <span className="absolute left-2 top-2 border border-white/15 bg-black/40 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/60">
                    Fan art
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border border-dashed border-line/80 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12.5px] leading-snug text-muted">
                Made something Menace-flavoured? The wall rotates weekly — credit always given.
              </p>
              <ButtonLink href={site.discord.url} external variant="ghost" className="shrink-0">
                Post yours
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
