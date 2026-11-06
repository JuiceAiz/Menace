"use client";

import { useState } from "react";
import { youtubeEmbed } from "@/lib/content";

export function HighlightPlayer({
  title,
  subtitle,
  url,
  duration,
}: {
  title: string;
  subtitle: string;
  url: string;
  duration: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative overflow-hidden clip-card border border-line/90 bg-[#0b0513]">
      <div className="relative aspect-video w-full">
        {playing ? (
          <iframe
            src={`${youtubeEmbed(url)}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 70% at 50% 20%, rgba(139,77,255,0.45), transparent 65%), linear-gradient(160deg, #22103c 0%, #120a20 55%, #0a0512 100%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 14px)",
              }}
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="border border-white/15 bg-black/35 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Highlight · Placeholder clip
                </span>
                <span className="tabular border border-white/15 bg-black/35 px-2 py-1 text-[9px] font-semibold tracking-[0.14em] text-white/70">
                  {duration}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center"
                aria-label={`Play highlight: ${title}`}
              >
                <span className="relative flex h-[74px] w-[74px] items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/60 group-hover:bg-brand/40 sm:h-[86px] sm:w-[86px]">
                  <span className="absolute inset-0 animate-ping rounded-full border border-brand/40" aria-hidden />
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="white" aria-hidden>
                    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                  </svg>
                </span>
              </button>

              <div>
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.24em] text-brand-light">
                  {subtitle}
                </p>
                <p className="mt-1 max-w-md font-display text-[20px] font-bold uppercase leading-tight text-white sm:text-[26px]">
                  {title}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
