import siteJson from "@/content/site.json";
import playersJson from "@/content/players.json";
import matchesJson from "@/content/matches.json";
import statsJson from "@/content/stats.json";
import sponsorsJson from "@/content/sponsors.json";
import fansJson from "@/content/fans.json";
import type { LiveMatch, MatchResult, Player, SiteConfig, UpcomingMatch } from "./types";

export const site = siteJson as SiteConfig;

export const players = playersJson.players as unknown as Player[];
export const starters = players.filter((p) => p.group === "starter");
export const substitutes = players.filter((p) => p.group === "sub");
export const staff = players.filter((p) => p.group === "staff");
export const featuredPlayer = players.find((p) => p.featured) ?? players[0];
export const getPlayer = (slug: string) => players.find((p) => p.slug === slug);

export const matches = matchesJson as {
  live: LiveMatch;
  next: UpcomingMatch & { calendar: { title: string; durationMinutes: number; location: string } };
  upcoming: UpcomingMatch[];
  results: MatchResult[];
};

export const nextMatch = matches.next;
export const upcomingMatches = matches.upcoming;
export const results = matches.results;
export const liveMatch = matches.live;

export const stats = statsJson;
export const sponsors = sponsorsJson;
export const fans = fansJson;

export const recentResults = results.slice(0, 4);

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const WAT_OFFSET_MS = 60 * 60 * 1000; // West Africa Time is UTC+1 year round (no DST).

/**
 * "Sat 21 Nov · 18:00 WAT" — the squad's home timezone.
 *
 * Deliberately avoids Intl: Node and Chromium ship different ICU builds, so
 * Intl output can differ between the server pass and hydration and trigger a
 * React hydration error. Fixed tables keep server and client byte-identical.
 */
export function formatMatchDate(iso: string, withTime = true) {
  const date = new Date(new Date(iso).getTime() + WAT_OFFSET_MS);
  const day = `${WEEKDAYS[date.getUTCDay()]} ${String(date.getUTCDate()).padStart(2, "0")} ${MONTHS[date.getUTCMonth()]}`;
  if (!withTime) return day;
  const time = `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
  return `${day} · ${time} WAT`;
}

export function googleCalendarUrl(match: UpcomingMatch, durationMinutes = 120) {
  const start = new Date(match.startsAt);
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `MENACE vs ${match.opponent.name} — ${match.tournament} ${match.season}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: `${match.stage} (${match.format}). Watch live: ${match.stream.url}`,
    location: match.venue,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function youtubeEmbed(url: string) {
  const id = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
