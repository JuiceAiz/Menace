# Menace Esports — official website

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion. Dark-only, mobile-first,
built around the Menace brand: electric purple `#8b4dff`, lavender `#d9ccff`, near-black
`#0d0716`, panel `#170d26`, gold `#f5b942` for wins and trophies.

Phase 1 (this build) ships the design system, shared layout and the complete home page.
Every other route exists as a branded "next phase" page so no nav link dead-ends.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

Node 18.18+ (tested on Node 24).

## Brand assets

- **Logo:** the official mark must be used exactly as supplied. Save the provided file to
  `public/brand/menace-logo.png` (square, 512px or larger). Every `<BrandLogo />` picks it up
  automatically — nav, footer and the Menace Mode intro.
  Until that file exists, the component renders a plain `MNC` wordmark so nothing breaks.
- **Favicon:** derive it from the same file (`app/icon.png`, 512×512). Do not redraw the mark.
- **Player photography:** drop licensed images into `public/players/` and set `"image"` on the
  matching player in `content/players.json`. Until then, `<PlayerArt />` renders clearly
  labelled abstract placeholder art — no fake likenesses.

## Editing content (no code required)

Everything the team updates lives in `/content`:

| File | What it controls |
| --- | --- |
| `site.json` | Name, tagline, description, socials, Discord, stream link, primary nav |
| `players.json` | Starters, subs, coach, analyst: IGN, real name, role, country, heroes, socials, stats, achievements, clips |
| `matches.json` | Next match, upcoming fixtures, results, and the live-match switch |
| `stats.json` | Home stat dashboard: totals, win rate by tournament, hero pick rate |
| `sponsors.json` | Partner strip entries/tiers and media-kit figures |
| `fans.json` | Pick'em prompt, leaderboard, Menace Army top fans and fan art |

Content is validated at build time by TypeScript types in `lib/types.ts`, so a broken shape fails
`npm run build` instead of shipping.

### Switching the hero into live match mode

In `content/matches.json` set:

```json
"live": { "active": true, "score": { "menace": 1, "opponent": 0 }, "game": 2, "...": "..." }
```

The hero card swaps to the pulsing LIVE panel with the current score and stream CTA. Set
`"active": false` to return to the countdown. The stream `embedId` is used by the watch view.

### Next-match countdown

`next.startsAt` is an ISO timestamp **with offset** (e.g. `2026-11-21T18:00:00+01:00`).
The countdown and calendar links are generated from it; display times are formatted in WAT.

## Environment variables

Copy `.env.example` to `.env.local` (never commit `.env.local`):

```bash
NEXT_PUBLIC_SITE_URL=https://menace.gg        # canonical URL, OG tags, sitemap
NEWSLETTER_WEBHOOK_URL=                       # optional: POST target for /api/subscribe
```

Without `NEWSLETTER_WEBHOOK_URL` the newsletter endpoint accepts addresses in demo mode and says
so in the UI. Point it at a mailing-list webhook (or a small serverless function) to go live.

No keys are needed for the current build. Anything added later (Paystack, Sanity, Supabase)
belongs in environment variables, server-side only.

## Features in this build

- **Menace Mode intro** — logo glitch-and-snap reveal, skippable, once per session,
  disabled entirely under `prefers-reduced-motion`.
- **Hero + next match card** — live countdown, add-to-calendar, live-match takeover.
- **Latest results strip** — horizontal snap scroller with W/L solarisation and VOD links.
- **Interactive roster teaser** — pointer-tilt cards, purple energy glow, signature-hero reveal
  on hover or tap, keyboard focus support.
- **Player spotlight** — click-to-load YouTube facade (no third-party JS until you press play).
- **Stat dashboard** — bars and counters animate once on scroll into view.
- **Fan Pick'em** — one pick per fixture, persisted per device, with season leaderboard.
- **Menace Army wall** — top supporters and fan-art gallery.
- **Partner marquee** — pauses on hover/reduced motion.
- **Newsletter + Discord** — validated signup posting to `/api/subscribe`.
- **Chrome** — sticky header with scroll progress, desktop-only cursor trail, optional UI
  sounds (off by default, toggle in header), branded 404.

## Accessibility & performance notes

- Semantic landmarks, skip link, visible focus rings, `aria-current` on active nav.
- All interactive targets are ≥44px; type scale starts at 360px viewport width.
- Motion respects `prefers-reduced-motion`; nothing animates in a way that blocks reading.
- Images use `next/image`/lazy loading where real assets exist; the video embed is a facade.
- Fonts are self-hosted through `next/font` (Rajdhani + Poppins), no render-blocking Google CSS.
- Placeholder content is labelled in the UI and in this README — pull it before launch.

## Deploy (Vercel)

1. Push the repo to GitHub.
2. Import into Vercel (framework preset: Next.js — no config needed).
3. Add `NEXT_PUBLIC_SITE_URL` (and `NEWSLETTER_WEBHOOK_URL` if used) in Project Settings → Environment Variables.
4. Deploy. `app/sitemap.ts` and `app/robots.ts` publish automatically from the canonical URL.

## Build roadmap

1. ✅ Setup, tokens, layout, home page
2. Roster + player profiles, Matches
3. Achievements, News (MDX), Media, Store (Paystack), Partners, Join, About, Contact
4. Remaining unique features (full pick'em backend, live score feed) and the Lighthouse pass
