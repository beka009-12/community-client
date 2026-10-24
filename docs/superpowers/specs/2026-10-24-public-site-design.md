# community-client: public site on the new API

Date: 2026-10-24. Status: draft for approval.

## Intent

`community-client` is the public site of Motion Community for clients and
visitors: what the community is, what it builds, who is in it, and a form to
order a project. Today it is an empty create-next-app. The public pages already
exist in the old all-in-one app (`community/`, branch `feat/home-redesign`);
they are moved here and switched to the new API (`/api/{lang}/...`, live at
`API_URL`, Swagger at `/api/docs/?format=openapi`).

**Logic first, design later.** A radical redesign of the whole site is
planned, but not now (user, 2026-10-24: «сначала логика, потом дизайн»). This
step moves the existing components with their current look; no restyling, no
visual exploration. Keep data and markup separate so the redesign is a swap of
the presentation layer.

The user explicitly wants these three to survive the future redesign, so they
are moved untouched:

- **Home, first screen** — `Welcome` with the particle logo animation
  (`HeroLogoParticles`, «assembled by motion»); ≤1024px shows the static logo
  image instead of the canvas.
- **Projects** — the editorial list where hovering a row shows the project
  image following the cursor and dims other rows (`EditorialList`, desktop
  only; phones keep the card `Grid`). Category/status filters stay.
- **Team** — the member "contact sheet" (`Roster`): one frame with hairline
  dividers, greyscale photos turning colour on hover, name and role caption,
  position filter. Option A in the brainstorm mockup.

## Goals

- All public pages work on the new API with real data: `/`, `/about`,
  `/contact`, `/projects`, `/projects/[id]`, `/team`, `/team/[id]`, plus header,
  footer, error and not-found states.
- The request form on `/contact` creates a client request
  (`POST client-requests/`) and shows field errors.
- Pages are server-rendered for SEO, with per-page metadata as in the old app.

## Non-goals

- The redesign itself, new sections or copy changes.
- English: Russian only for now (`/api/ru/...`), no `/en` routes, no locale
  switcher.
- Login, cabinet, admin: they live in `community-service`. The header «Войти»
  button just links there.
- Tests and verification runs (user's standing request for the frontend split:
  small steps, no tests yet). `tsc` and `eslint` stay clean.
- sitemap/robots, analytics.

## Anti-goals

- The API address or a token reaching the browser. No `NEXT_PUBLIC_` API URL;
  all API calls happen on the server.
- Plain-http API media breaking on an https site.
- One visitor triggering a fan-out of API requests: every API read is cached.

## Constraints

- Stack follows `community-service`: Next 16.4 (App Router), React 19.3,
  TypeScript strict, bun, SCSS modules + `app/globals.scss` (Tailwind is
  removed from the template), `motion` for animation.
- File naming: components in PascalCase (`Header.tsx`, `Header.module.scss`
  imported as `scss`); other modules lowercase as in the old app.
- `'use client'` only where the old component needs it (animations, filters,
  form).
- Env (server only): `API_URL` (Django origin, no path) and `SERVICE_URL`
  (origin of `community-service`, for «Войти» → `${SERVICE_URL}/login`). Ship
  `.env.example`, never `.env`.

### What changed in the API (old app → new)

| Old app read | New API |
| --- | --- |
| Project `project_status`, `preview_image` | `status`, `image`; list also has `team {id, name, image}` |
| Project `members: [{id, user: <id>, role}]`, joined with `/members/` for names | `members: [{user: {id, first_name, last_name, position, avatar}, role}]`, no join needed |
| Members list had `status`, public site filtered `Active` | `members/` returns only filled profiles, no `status`; no filter |
| Stats `{members_count, projects_count, companies_count}` | adds `teams_count` |
| — | Every list is paginated: `{count, next, previous, results}`, 20 per page |
| `teams/` | needs a token: not used by the public site |

Media URLs come back absolute on the API host (`http://…/media/…`).

## Decided

- **Source of truth for UI**: the old `community/` components and data files
  (`src/data/*`, `src/lib/*` helpers, `src/ui/*`, `src/animation/*`,
  `src/hooks/*`) are copied as-is and only edited where the data shape changed.
  Copy only what the public pages import.
- **Data layer** (my call): orval generates types and plain fetch functions
  from the live Swagger for the public endpoints only (`projects`, `members`,
  `stats`, `choices`, `client-requests` create), same transformer as the
  service (drop `/api/{lang}` prefix and `api_` operationId prefix), with a
  custom fetch mutator that prefixes `${API_URL}/api/ru`. Nested arrays that
  Swagger leaves untyped (`members`, `teams`, `projects`, `work`, …) get
  hand-written types next to the getters. Getters live in `src/api/` and are
  cached with `"use cache"` + `cacheLife` (about a minute, like the old
  `PUBLIC_REVALIDATE_SECONDS = 60`) + `cacheTag` per resource
  (`cacheComponents: true`, as in the service).
- **Lists**: getters follow `next` until the list is complete, so the site
  never silently shows only the first 20.
- **Data the list endpoints lack** (my call): the home showcase (description),
  home team leads and «Команды по проектам» on `/team` need project details
  and lead bios. They are built from cached `projects/{id}/` and
  `members/{id}/` reads, as the old app did; the fan-out happens on cache
  refresh, not per visitor. Secondary sections (leads, teams) degrade to
  hidden on failure instead of failing the page. A combined endpoint can be
  asked of the backend later.
- **Media**: `next.config.ts` rewrites `/media/:path*` to `${API_URL}/media/…`;
  a `mediaUrl()` helper turns API media URLs into `/media/…` paths (as in the
  service's `src/lib/media.ts`). Images stay plain `<img>`, as in the old app.
- **Request form**: Server Action `submitClientRequest` with
  `useActionState`, as in the old app: zod validation on the server (fields
  and limits from `ClientRequestCreate`), DRF 400 `{field: [msg]}` mapped to
  field errors, values echoed back on error, 429 shown as «слишком много
  заявок, попробуйте позже», `stats` tag invalidated on success.
  `project_type` is free text in the API; the select keeps the old
  `PROJECT_TYPES` list (services + «Другое»).
- **Member and project 404**: `members/{id}/` or `projects/{id}/` returning
  404 → `notFound()`.

## Left to the builder

- Exact order of small steps (suggested: skeleton (SCSS, fonts, layout, env,
  orval, media) → home → projects + project page → team + member page →
  about → contact form).
- Error boundary and not-found pages: reuse `LoadError` and the old
  `(site)/error.tsx`.
- Whether `src/lib/api-labels.ts` reads labels from `choices/` or keeps the
  old hard-coded maps (both fine while the site is Russian only).
