"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

export function useCountdown(target: string) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date(target).getTime();
    const update = () => setRemaining(Math.max(0, end - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return remaining;
}

export function Countdown({ target, className }: { target: string; className?: string }) {
  const remaining = useCountdown(target);

  const parts = useMemo(() => {
    if (remaining === null) {
      return [
        { label: "Days", value: "--" },
        { label: "Hours", value: "--" },
        { label: "Mins", value: "--" },
        { label: "Secs", value: "--" },
      ];
    }
    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [
      { label: "Days", value: String(days).padStart(2, "0") },
      { label: "Hours", value: String(hours).padStart(2, "0") },
      { label: "Mins", value: String(minutes).padStart(2, "0") },
      { label: "Secs", value: String(seconds).padStart(2, "0") },
    ];
  }, [remaining]);

  return (
    <div className={cn("grid grid-cols-4 gap-1.5 sm:gap-2", className)} role="timer" aria-live="off">
      {parts.map((part) => (
        <div
          key={part.label}
          className="relative border border-line/80 bg-[#0b0513]/80 px-1 py-2 text-center sm:px-2 sm:py-2.5"
        >
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" aria-hidden />
          <span className="tabular block font-display text-[26px] font-bold leading-none text-white sm:text-[30px]">
            {part.value}
          </span>
          <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-[9px]">
            {part.label}
          </span>
        </div>
      ))}
    </div>
  );
}
