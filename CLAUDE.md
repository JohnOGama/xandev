# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server on :3000
npm run build        # production build (also type-checks)
npm run lint         # eslint (use `npx eslint src` to lint only source)
npx tsc --noEmit     # type-check only
npm run seed:admin   # create the admin user; reads DATABASE_URL from .env
```

There is no test suite. Verify changes with lint + `npm run build`.

`npx tsc --noEmit` also checks generated files under `.next/dev/types`. If it reports errors only there, they come from a stale dev server, not the source; `npm run build` is the authoritative type check.

## What this is

John Ogama's personal portfolio: Next.js 16 (App Router), React 19, Tailwind CSS v4, PostgreSQL via `pg`. Deployed on Vercel at `https://johnogama.is-a.dev` (`SITE_URL` in `src/app/config/constants.ts`).

Public pages (`/`, `/experience`, `/stack`) are static. Do not add request-time work (`headers()`, DB calls) to them: the home page used to await a DB write on every render, which made it slow.

## Content lives in one file

`src/app/config/constants.ts` holds all site content and the helpers derived from it:

- `WORK_TIMELINE` feeds both the compact rows on the home page and the full `/experience` page. Wording mirrors the resume at `public/pdf/JohnOgama.pdf`.
- `SKILL_GROUPS` feeds `/stack` (grouped by category) and the structured data in `layout.tsx`.
- `FILTER_SKILLS` is derived: only skills that at least one entry in `PROJECTS` uses (via `projectUsesSkill`, a case-insensitive substring match in both directions). These are the clickable filter chips on the home page, so skill and `builtWith` spellings must stay compatible ("Next Js", "Nest Js", "ethers-js").
- `initials()` produces the two-letter tiles for projects and companies.

Strivio (the featured personal project) is not in `PROJECTS`; it has its own card in `components/FeaturedApp.tsx`.

## Analytics and consent

Self-hosted analytics, no third parties. The rule is: nothing is stored without consent, enforced on both sides.

- `src/lib/client-analytics.ts`: consent is kept in `localStorage` (`analytics_consent`). `trackClickEvent` and `initializeSessionTracking` are no-ops unless it is `"granted"`, and every request body carries `consent: "granted"`.
- `src/app/api/analytics/{session,event}/route.ts`: reject with 403 unless the body has `consent: "granted"`, before touching the database. The unique-visitor row (`trackPortfolioView`) is written on session start, not during page render.
- `components/CookieConsent.tsx` (mounted in `layout.tsx`): renders the banner, starts session tracking once consent is granted, and shows the "Visit analytics: on/off · change" footer. It does nothing on `/admin`.
- `src/lib/analytics.ts`: creates its tables lazily (`ensureAnalyticsTable`) and stores a hashed visitor key (`sha256(ip|user-agent)` from `request-meta.ts`), never the raw IP. Geo fields come from Vercel's `x-vercel-ip-*` headers.

New click tracking: call `trackClickEvent("click.something")`; names must match `/^[a-z0-9._-]{2,64}$/i`.

## Admin

`/admin` is a private analytics dashboard behind `/admin/login`. Auth is in `src/lib/admin-auth.ts`: scrypt password hashes, a session token in the `admin_session` cookie, tables created lazily. `src/lib/rate-limit.ts` is an in-memory per-IP limiter used by the API routes (it resets per server instance). `src/app/admin/layout.tsx` marks these pages `noindex`.

## Design system

Light monochrome, single narrow column (`max-w-2xl`), modeled on the content layout of bryllim.com: flat sections, hairline-divided rows, small mono labels, bordered cards only for projects.

- Tokens are CSS variables in `src/app/globals.css` (`--background`, `--foreground`, `--muted`, `--line`, `--surface`), exposed to Tailwind through `@theme inline` as `bg-background`, `text-muted`, `border-line`, etc. Use these, not hard-coded colors or `text-white`/`bg-black`.
- Custom classes in `globals.css`: `.card`, `.dots` (fixed dot-field backdrop), `.font-pixel` (Geist Pixel, used for the name), `.font-geist` (intro line). The two font classes are plain CSS on purpose: defining them as `@theme` font entries was not picked up by the dev server.
- Fonts are loaded in `layout.tsx` with `next/font/google`: Montserrat (default sans), Roboto Mono (`font-mono`), Geist Pixel, Geist.
- `src/app/opengraph-image.tsx` duplicates the palette as constants because it renders outside the page CSS. Its renderer does not support repeating gradient backgrounds, which is why the dots are individual elements.

## SEO

`src/app/robots.ts` (allows all crawlers, names AI crawlers explicitly, blocks `/admin` and `/api/`), `src/app/sitemap.ts` (add new public pages here), `public/llms.txt`, and a schema.org `Person` JSON-LD block in `layout.tsx`. Do not set `openGraph.images` manually in metadata; the `opengraph-image.tsx` file convention supplies it.

## Gotchas

- Use `next/link` `Link` for links, including external and `mailto:` ones (project convention). Set `prefetch={false}` when linking to static files such as the resume PDF.
- `next/image` caches optimized images by URL. If you regenerate an image in `public/` under the same name, the old one can keep being served; rename the file.
- Environment: `DATABASE_URL` (see `.env.example`). `.env*` and `PROJECT_OVERVIEW.md` are git-ignored.
