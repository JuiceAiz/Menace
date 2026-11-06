"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { CountUp } from "@/components/ui/count-up";
import { stats } from "@/lib/content";

const barVariants = {
  hidden: { scaleX: 0 },
  visible: (value: number) => ({
    scaleX: value / 100,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function StatDashboard() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24" aria-labelledby="stats-heading">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 12% 20%, rgba(91,33,182,0.22), transparent 65%), linear-gradient(180deg, #0d0716, #10081b)",
        }}
        aria-hidden
      />
      <div className="shell relative">
        <SectionHeading
          kicker="By the numbers"
          title={<span id="stats-heading">Not vibes. Data.</span>}
          description="Season 4 figures, updated after every series. Bars animate once as they scroll into view."
          action={{ label: "Trophy cabinet", href: "/achievements" }}
        />

        <div className="mt-9 grid gap-4 lg:grid-cols-2">
          <div className="clip-card border border-line/90 bg-[#120a1f]/80 p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.16em] text-white">
                Series win rate
              </h3>
              <span className="text-[9.5px] uppercase tracking-[0.18em] text-muted">by tournament</span>
            </div>

            <ul className="mt-6 space-y-4">
              {stats.winRateByTournament.map((row, index) => (
                <li key={row.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[12.5px] font-medium text-lavender/90">{row.label}</span>
                    <span className="tabular font-display text-[17px] font-bold text-white">
                      <CountUp value={row.value} suffix="%" />
                    </span>
                  </div>
                  <div className="relative mt-2 h-[7px] overflow-hidden bg-white/[0.05]">
                    <motion.span
                      className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-brand-deep via-brand to-brand-light"
                      custom={row.value}
                      variants={barVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: index * 0.08 }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted">{row.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="clip-card border border-line/90 bg-[#120a1f]/80 p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.16em] text-white">
                Hero pick rate
              </h3>
              <span className="text-[9.5px] uppercase tracking-[0.18em] text-muted">S4 draft share</span>
            </div>

            <ul className="mt-6 space-y-4">
              {stats.heroPickRates.map((row, index) => (
                <li key={row.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[12.5px] font-medium text-lavender/90">{row.label}</span>
                    <span className="tabular font-display text-[17px] font-bold text-white">
                      <CountUp value={row.value} suffix="%" />
                    </span>
                  </div>
                  <div className="relative mt-2 h-[7px] overflow-hidden bg-white/[0.05]">
                    <motion.span
                      className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-gold/70 via-gold to-[#ffe0a3]"
                      custom={row.value}
                      variants={barVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: index * 0.08 }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted">{row.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {stats.totals.map((total) => (
            <div key={total.label} className="border border-line/80 bg-white/[0.02] px-4 py-4">
              <dd className="font-display text-[34px] font-bold leading-none text-white">
                <CountUp value={total.value} suffix={total.suffix} />
              </dd>
              <dt className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                {total.label}
              </dt>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-[10.5px] uppercase tracking-[0.16em] text-muted">
          Placeholder performance data — swap in official league stats in <code className="text-lavender/80">content/stats.json</code>.
        </p>
      </div>
    </section>
  );
}
