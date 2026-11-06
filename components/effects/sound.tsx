"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type SoundKind = "tap" | "nav" | "toggle" | "success";

interface SoundApi {
  enabled: boolean;
  toggle: () => void;
  play: (kind?: SoundKind) => void;
}

const SoundContext = createContext<SoundApi>({ enabled: false, toggle: () => {}, play: () => {} });

const STORAGE_KEY = "menace-sound";

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setEnabled(sessionStorage.getItem(STORAGE_KEY) === "on");
  }, []);

  const play = useCallback(
    (kind: SoundKind = "tap") => {
      if (!enabled || typeof window === "undefined") return;
      try {
        const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        const ctx = ctxRef.current ?? new Ctor();
        ctxRef.current = ctx;
        if (ctx.state === "suspended") void ctx.resume();

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const settings: Record<SoundKind, { from: number; to: number; dur: number; vol: number; type: OscillatorType }> = {
          tap: { from: 520, to: 380, dur: 0.07, vol: 0.05, type: "triangle" },
          nav: { from: 320, to: 620, dur: 0.11, vol: 0.045, type: "sawtooth" },
          toggle: { from: 700, to: 480, dur: 0.09, vol: 0.05, type: "sine" },
          success: { from: 440, to: 880, dur: 0.16, vol: 0.05, type: "sine" },
        };
        const s = settings[kind];
        osc.type = s.type;
        osc.frequency.setValueAtTime(s.from, now);
        osc.frequency.exponentialRampToValueAtTime(s.to, now + s.dur);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(s.vol, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + s.dur);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + s.dur + 0.02);
      } catch {
        /* audio is a nicety: never let it break the UI */
      }
    },
    [enabled],
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      sessionStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      return next;
    });
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest("a, button");
      if (!el || el.hasAttribute("data-silent")) return;
      play(el.tagName === "A" ? "nav" : "tap");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled, play]);

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export const useSound = () => useContext(SoundContext);

export function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle, play } = useSound();

  return (
    <button
      type="button"
      data-silent
      onClick={() => {
        if (!enabled) {
          toggle();
          return;
        }
        play("toggle");
        toggle();
      }}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn interface sounds off" : "Turn interface sounds on"}
      className={cn(
        "group inline-flex h-11 w-11 items-center justify-center border border-line/80 text-muted transition-colors hover:border-brand/60 hover:text-lavender",
        enabled && "border-brand/60 text-brand",
        className,
      )}
      title={enabled ? "Sound on" : "Sound off"}
    >
      <span className="sr-only">{enabled ? "Sound on" : "Sound off"}</span>
      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M3.5 7.5h2.7L10.5 4v12L6.2 12.5H3.5z" strokeLinejoin="round" />
        {enabled ? (
          <>
            <path d="M13.4 7.2a4 4 0 0 1 0 5.6" strokeLinecap="round" />
            <path d="M15.6 4.8a7.2 7.2 0 0 1 0 10.4" strokeLinecap="round" />
          </>
        ) : (
          <path d="m13.6 8 3 4m0-4-3 4" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}
