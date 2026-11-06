import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  kicker,
  title,
  description,
  action,
  className,
  align = "left",
}: {
  kicker?: string;
  title: ReactNode;
  description?: string;
  action?: { label: string; href: string; external?: boolean };
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {kicker ? (
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[10px] w-[3px] skew-x-[-18deg] bg-brand" aria-hidden />
            <span className="kicker text-brand">{kicker}</span>
          </div>
        ) : null}
        <h2 className="text-[clamp(30px,5vw,46px)] font-bold">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted md:text-[15px]">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noreferrer noopener" : undefined}
          className="link-underline inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start font-display text-[13px] font-bold uppercase tracking-[0.18em] text-lavender hover:text-white md:self-auto"
        >
          {action.label}
          <ArrowIcon />
        </Link>
      ) : null}
    </div>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden
      className={cn("transition-transform duration-200 group-hover:translate-x-0.5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="square" />
    </svg>
  );
}
