"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { BrandLogo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { SoundToggle } from "@/components/effects/sound";
import { site } from "@/lib/content";
import { cn } from "@/lib/cn";

const extraLinks = [
  { label: "Achievements", href: "/achievements" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
  { label: "Join Us", href: "/join" },
];

const allLinks = [...site.nav, ...extraLinks];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-all duration-300",
        scrolled || open ? "border-b border-line/80 bg-ink/90 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 py-2" aria-label="Menace Esports — home">
          <BrandLogo className="h-9 w-9 shrink-0 md:h-10 md:w-10" />
          <span className="leading-none">
            <span className="block font-display text-[19px] font-bold tracking-[0.24em] text-white">MENACE</span>
            <span className="mt-1 hidden text-[8px] font-semibold uppercase tracking-[0.3em] text-muted sm:block">
              Esports · Est. 2025
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {site.nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 font-display text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors",
                  active ? "text-white" : "text-muted hover:text-lavender",
                )}
              >
                {item.label}
                {active ? (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] skew-x-[-20deg] bg-brand" aria-hidden />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <SoundToggle className="hidden sm:inline-flex" />
          <ButtonLink href={site.stream.url} external className="hidden sm:inline-flex">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-white" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white/90" />
            </span>
            Watch live
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center border border-line/80 text-lavender transition-colors hover:border-brand/60 lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-[1.5px] w-full bg-current transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <motion.div
        className="h-[2px] origin-left bg-gradient-to-r from-brand via-brand-light to-lavender"
        style={{ scaleX: progress }}
        aria-hidden
      />

      {open ? (
        <div id="mobile-menu" className="lg:hidden">
          <div className="border-t border-line/70 bg-ink/98 px-5 pb-8 pt-2 backdrop-blur-xl">
            <nav aria-label="Mobile" className="flex flex-col">
              {allLinks.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between border-b border-line/60 py-3.5"
                >
                  <span className="font-display text-[22px] font-bold uppercase tracking-[0.06em] text-lavender transition-colors group-hover:text-white">
                    {item.label}
                  </span>
                  <span className="font-display text-[11px] tracking-[0.2em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href={site.stream.url} external size="lg">
                Watch live
              </ButtonLink>
              <ButtonLink href={site.discord.url} external variant="outline" size="lg">
                {site.discord.label}
              </ButtonLink>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted">UI sounds</span>
                <SoundToggle />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
