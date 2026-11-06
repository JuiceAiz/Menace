import { ButtonLink } from "@/components/ui/button";
import type { ReactNode } from "react";

export function PendingPage({
  kicker,
  title,
  description,
  bullets,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden pb-10 pt-[104px] md:pt-[132px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 45% at 70% 0%, rgba(139,77,255,0.22), transparent 65%), linear-gradient(180deg, #120a20, #0d0716 65%)",
        }}
        aria-hidden
      />
      <div className="shell">
        <p className="kicker text-brand">{kicker}</p>
        <h1 className="mt-4 max-w-3xl text-[clamp(40px,7vw,72px)] font-bold">{title}</h1>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">{description}</p>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bullets.map((bullet, index) => (
            <div key={bullet} className="border border-line/80 bg-white/[0.02] p-4">
              <span className="font-display text-[11px] font-bold tracking-[0.2em] text-brand/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[13.5px] leading-snug text-lavender/85">{bullet}</p>
            </div>
          ))}
        </div>

        {children}

        <div className="mt-10 flex flex-col gap-3 border-t border-line/70 pt-6 sm:flex-row sm:items-center">
          <ButtonLink href="/">Back to home</ButtonLink>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
            This section ships in the next build phase.
          </p>
        </div>
      </div>
    </div>
  );
}
