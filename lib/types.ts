export type Role = "Gold" | "EXP" | "Mid" | "Jungle" | "Roam" | "Coach" | "Analyst";

export type SocialPlatform = "x" | "instagram" | "tiktok" | "youtube" | "twitch";

export interface Social {
  platform: SocialPlatform;
  url: string;
  label?: string;
}

export interface HeroRef {
  name: string;
  slug: string;
}

export interface Player {
  slug: string;
  ign: string;
  realName: string;
  role: Role;
  group: "starter" | "sub" | "staff";
  number: string;
  country: string;
  countryCode: string;
  image: string | null;
  heroSplash: string | null;
  accent: string;
  signatureHeroes: HeroRef[];
  socials: Social[];
  featured: boolean;
  quote: string;
  bio: string;
  stats: Record<string, number>;
  achievements: string[];
  clips: { title: string; duration: string; url: string }[];
}

export interface Opponent {
  name: string;
  tag: string;
  logo: string | null;
}

export interface UpcomingMatch {
  id: string;
  opponent: Opponent;
  tournament: string;
  season: string;
  stage: string;
  startsAt: string;
  format: string;
  venue: string;
  stream: { platform: string; url: string };
}

export interface MatchResult {
  id: string;
  date: string;
  opponent: Opponent;
  tournament: string;
  season: string;
  stage: string;
  format: string;
  score: { menace: number; opponent: number };
  outcome: "win" | "loss";
  vod: string;
}

export interface LiveMatch {
  active: boolean;
  matchId: string;
  opponent: Opponent;
  tournament: string;
  stage: string;
  format: string;
  score: { menace: number; opponent: number };
  game: number;
  stream: { platform: string; url: string; embedId: string };
}

export interface SiteConfig {
  name: string;
  fullName: string;
  shortName: string;
  tagline: string;
  est: string;
  game: string;
  description: string;
  url: string;
  email: string;
  pressEmail: string;
  location: string;
  socials: Social[];
  discord: { label: string; url: string; members: string };
  stream: { platform: string; label: string; url: string };
  nav: { label: string; href: string }[];
}
