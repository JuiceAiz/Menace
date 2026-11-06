import Link from "next/link";
import { BrandLogo } from "@/components/brand/logo";
import { site } from "@/lib/content";
import { SocialIcon } from "@/components/ui/social-icon";

const columns = [
  {
    title: "Team",
    links: [
      { label: "Roster", href: "/roster" },
      { label: "Matches", href: "/matches" },
      { label: "Achievements", href: "/achievements" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Fans",
    links: [
      { label: "News", href: "/news" },
      { label: "Media", href: "/media" },
      { label: "Store", href: "/store" },
      { label: "Menace Army", href: "/join" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Partners", href: "/partners" },
      { label: "Join us", href: "/join" },
      { label: "Contact", href: "/contact" },
      { label: "Press kit", href: "/partners" },
    ],
  },
];

export function SiteFooter({ hasLogo }: { hasLogo: boolean }) {
  return (
    <footer className="relative mt-24 border-t border-line/80 bg-[#0a0512]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full bg-brand/10 blur-[90px]" aria-hidden />
      <div className="shell relative py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo hasLogo={hasLogo} className="h-11 w-11" />
              <div>
                <p className="font-display text-2xl font-bold tracking-[0.2em] text-white">MENACE</p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-muted">
                  Esports · Est. 2025
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-muted">
              {site.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {site.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center border border-line text-muted transition-colors hover:border-brand/60 hover:text-lavender"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="kicker text-brand">{column.title}</p>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex min-h-[40px] items-center text-[13.5px] text-muted transition-colors hover:text-lavender"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line/70 pt-6 text-[11.5px] text-muted md:flex-row md:items-center md:justify-between">
          <p suppressHydrationWarning>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
          <p className="max-w-lg md:text-right">
            Placeholder roster, fixture and sponsor content — clearly labelled demo data pending official assets.
          </p>
        </div>
      </div>
    </footer>
  );
}
