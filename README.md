# Portfolio — scaffold

Dark, glassmorphic, scroll-driven portfolio. Content is managed in Sanity
Studio (embedded at `/studio`) instead of pulled live from LinkedIn — see
the note at the bottom for why.

## Setup

1. `npm install`
2. Copy `.env.local.example` → `.env.local` and fill in:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — from sanity.io/manage
   - `SANITY_API_WRITE_TOKEN` — Sanity → API → Tokens → create one with Editor rights
   - `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — from console.upstash.com (free tier)
   - `SYNC_SECRET` — make up any random string
3. `npm run dev` → visit `localhost:3000` for the site, `localhost:3000/studio` for the CMS
4. Add your About, Skills, Experience, Certifications, and Projects entries in `/studio`

## Deploying

1. Push this repo to GitHub
2. Import into Vercel → add the same env vars from `.env.local` in Vercel's project settings
3. Also add `CRON_SECRET` in Vercel (Vercel automatically sends this as a Bearer token
   to cron-triggered routes) — set it to the same value as `SYNC_SECRET`
4. `vercel.json` already schedules a daily hit to `/api/sync-linkedin` at 6am UTC

## How "sync" works here

New content (a certification, a project, a skill) is added in Sanity Studio —
takes about as long as updating LinkedIn itself. From there everything is
automatic:

`Sanity edit → daily Cron hits /api/sync-linkedin → Upstash Redis cache refreshed
→ revalidateTag('linkedin-data' | 'linkedin-projects') → ISR rebuilds the page
→ new card animates into the grid` — zero code changes, zero redeploys.

If Sanity or the cron job is ever unreachable, the last successful Redis
snapshot keeps serving (stale-while-revalidate), so the live site never breaks.

**Why not pull directly from LinkedIn?** LinkedIn's public API only exposes
basic profile fields (name/photo/headline). Certifications, education, and
work history are behind LinkedIn's Partner Program, which requires a formal
approval process aimed at enterprise integrations (3–6 month timeline) — not
available for a personal site. Scraping violates LinkedIn's ToS and risks
account bans. Sanity is the practical stand-in: same "edit once, site updates
everywhere" experience, without a dependency on an API you can't get access to.

## Still to build

- [ ] R3F/Three.js hero background (mesh/particle scene)
- [ ] Lenis smooth scroll wiring
- [ ] Full page-transition system between routes
- [ ] Experience timeline component
- [ ] About section component
- [ ] OG image generation for projects
