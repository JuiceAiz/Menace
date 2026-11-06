import Link from "next/link";
import { sponsors } from "@/lib/content";

export function SponsorStrip() {
  const partners = sponsors.partners;

  return (
    <section className="py-14 md:py-16" aria-labelledby="partners-heading">
      <div className="shell flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="kicker text-brand">Partners</p>
          <h2 id="partners-heading" className="mt-2 text-[clamp(24px,3.5vw,32px)] font-bold">
            Backed by people who like noise
          </h2>
        </div>
        <Link
          href="/partners"
          className="link-underline inline-flex min-h-[44px] items-center font-display text-[12px] font-bold uppercase tracking-[0.18em] text-lavender"
        >
          Partner with us
        </Link>
      </div>

      <div
        className="relative mt-7 overflow-hidden border-y border-line/70 py-5"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="marquee-track flex w-max animate-marquee items-center gap-3 pr-3">
          {[...partners, ...partners].map((partner, index) => (
            <li
              key={`${partner.name}-${index}`}
              aria-hidden={index >= partners.length}
              className="clip-chip flex min-w-[190px] items-center gap-3 border border-line/70 bg-white/[0.02] px-4 py-3"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center border border-brand/30 bg-brand/10 font-display text-[12px] font-bold text-brand-light"
                aria-hidden
              >
                {partner.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-[14px] font-bold uppercase tracking-[0.1em] text-lavender/90">
                  {partner.name}
                </span>
                <span className="block truncate text-[8.5px] uppercase tracking-[0.16em] text-muted">
                  {partner.tier}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="shell mt-3 text-[10px] uppercase tracking-[0.16em] text-muted">
        Placeholder partner marks pending signed agreements.
      </p>
    </section>
  );
}
