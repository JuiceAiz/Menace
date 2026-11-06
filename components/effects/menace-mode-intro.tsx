"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/logo";

const KEY = "menace-mode-seen";
const HOLD_MS = 1700;
const FADE_MS = 300;

type Phase = "closed" | "open" | "closing";

/**
 * Menace Mode: logo glitch, snap, reveal. Skips entirely for reduced motion and
 * shows at most once per session. Unmounting is driven by explicit phase state
 * (never by an exit animation), so the overlay can't get stuck over the page.
 */
export function MenaceModeIntro({ hasLogo }: { hasLogo: boolean }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    setPhase("open");
  }, [reduceMotion]);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode: still close the overlay */
    }
    setPhase((current) => (current === "open" ? "closing" : current));
  }, []);

  useEffect(() => {
    if (phase !== "open") return;
    const timer = window.setTimeout(dismiss, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [phase, dismiss]);

  useEffect(() => {
    if (phase !== "closing") return;
    const timer = window.setTimeout(() => setPhase("closed"), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "closed") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, dismiss]);

  if (phase === "closed") return null;

  const closing = phase === "closing";
  const markClass = hasLogo ? "h-full w-full" : "whitespace-nowrap text-[34px] sm:text-[46px]";

  return (
    <motion.div
      role="presentation"
      onClick={dismiss}
      initial={{ opacity: 1 }}
      animate={{ opacity: closing ? 0 : 1 }}
      transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
      className={`fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-hidden bg-ink ${
        closing ? "pointer-events-none" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 45%, rgba(139,77,255,0.35), transparent 70%), repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 4px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[80px]"
        aria-hidden
      />

      <div className="relative flex flex-col items-center">
        <motion.div
          className="relative flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36"
          initial={{ scale: 1.35, rotate: -6, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="absolute inset-0 flex items-center justify-center opacity-80 blur-[2px] mix-blend-screen" aria-hidden>
            <BrandLogo hasLogo={hasLogo} variant="wordmark" className={markClass} alt="" />
          </span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{ x: [0, -4, 5, -3, 0], opacity: [1, 0.55, 1, 0.7, 1] }}
            transition={{ duration: 0.85, repeat: 1, repeatDelay: 0 }}
            aria-hidden
          >
            <BrandLogo hasLogo={hasLogo} variant="wordmark" className={markClass} alt="" />
          </motion.span>
          <span className="absolute inset-0 flex items-center justify-center">
            <BrandLogo hasLogo={hasLogo} variant="wordmark" className={markClass} alt="Menace Esports logo" />
          </span>
        </motion.div>

        <motion.p
          className="mt-6 font-display text-[11px] font-bold uppercase tracking-[0.55em] text-muted"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
        >
          Est. 2025
        </motion.p>
        <motion.p
          className="mt-2 px-4 text-center font-display text-3xl font-bold uppercase tracking-[0.14em] text-lavender sm:text-4xl"
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, letterSpacing: "0.14em" }}
          transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
        >
          Be a Menace
        </motion.p>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          dismiss();
        }}
        className="absolute bottom-8 right-6 min-h-[44px] border border-line px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted transition-colors hover:border-brand/60 hover:text-lavender sm:bottom-10 sm:right-10"
      >
        Skip intro
      </button>
      <span className="sr-only" aria-live="polite">
        Intro animation. Press Escape to skip.
      </span>
    </motion.div>
  );
}
