"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The official Menace mark must be used exactly as supplied.
 * Drop the provided PNG at `public/brand/menace-logo.png` (any square size, 512px+).
 * Until that file exists we render a typographic fallback so no layout is broken.
 */
export const LOGO_SRC = "/brand/menace-logo.png";

export function BrandLogo({
  className,
  wordmarkClassName,
  alt = "Menace Esports logo",
}: {
  className?: string;
  wordmarkClassName?: string;
  alt?: string;
}) {
  const [missing, setMissing] = useState(false);

  // Never approximate the mark: rather than faking it, hold an empty brand-coloured
  // slot until the official file is dropped in.
  if (missing) {
    return (
      <span
        aria-hidden
        className={cn(
          "block border border-brand/40 bg-brand/15",
          className,
          wordmarkClassName,
        )}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt={alt}
      width={512}
      height={512}
      decoding="async"
      onError={() => setMissing(true)}
      className={cn("object-contain", className)}
    />
  );
}
