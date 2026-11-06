"use client";

import { cn } from "@/lib/cn";

/**
 * The official Menace mark is used exactly as supplied — never redrawn.
 *
 * `hasLogo` is resolved on the server (see `lib/brand.ts`) so a missing file
 * never produces a broken image or a 404: the site falls back to a wordmark.
 */
export const LOGO_SRC = "/brand/menace-logo.png";

export function BrandLogo({
  hasLogo,
  variant = "mark",
  className,
  alt = "Menace Esports logo",
}: {
  hasLogo: boolean;
  variant?: "mark" | "wordmark";
  className?: string;
  alt?: string;
}) {
  if (!hasLogo) {
    if (variant === "wordmark") {
      return (
        <span
          className={cn(
            "font-display font-bold uppercase leading-none tracking-[0.06em] text-lavender",
            className,
          )}
          aria-hidden
        >
          Menace
        </span>
      );
    }
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt={alt}
      width={512}
      height={512}
      decoding="async"
      onError={(event) => {
        // Stale build after the asset was removed: hide rather than show a broken icon.
        event.currentTarget.style.display = "none";
      }}
      className={cn("object-contain", className)}
    />
  );
}
