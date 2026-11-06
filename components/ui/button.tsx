import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost" | "gold";
type Size = "md" | "lg";

const base =
  "clip-btn group relative inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-[0.16em] transition-all duration-200 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-light hover:shadow-[0_0_32px_-6px_rgba(139,77,255,0.8)] active:translate-y-[1px]",
  outline:
    "bg-brand/[0.14] text-lavender hover:bg-brand/[0.26] hover:text-white active:translate-y-[1px]",
  ghost: "bg-white/[0.06] text-lavender hover:bg-white/[0.11] hover:text-white active:translate-y-[1px]",
  gold: "bg-gold text-[#1a1204] hover:brightness-110",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[12px]",
  lg: "h-[52px] px-7 text-[13px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
