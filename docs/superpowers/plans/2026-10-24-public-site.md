# Public Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the old app's public pages into `community-client`, unchanged in look, running on the new API.

**Architecture:** Server components read the API through a ported, token-free
`src/server/api/` layer (fetch + zod schemas), cached with `"use cache"`.
UI is copied file by file from `../community/` and edited only where field
names or shapes changed. The request form is a Server Action.

**Tech Stack:** Next 16.4 (App Router, `cacheComponents`), React 19.3, TypeScript strict, SCSS modules, motion, gsap, zod 4, bun.

**Spec:** `docs/superpowers/specs/2026-10-24-public-site-design.md`

## Global Constraints

- Source: `../community/` on branch `feat/home-redesign`. "Copy" means the same relative path under `community-client/` (`src/…`, `app/…`), byte for byte, then only the listed edits. No restyling, no new sections or copy. A copied file's `*.module.scss` comes with it; a shared helper it imports that no earlier task copied is copied in the same task.
- No tests and no test runner (user's standing request). Each task ends with `bunx tsc --noEmit` and `bun run lint`, both clean.
- Components PascalCase (`Header.tsx` + `Header.module.scss`, imported as `scss`); other modules lowercase. No Tailwind.
- `'use client'` only where the copied file already has it.
- API calls only on the server; no `NEXT_PUBLIC_` vars. Env: `API_URL` (Django origin, no path), `SERVICE_URL` (origin of `community-service`).
- Russian only: every API path is `${API_URL}/api/ru/…`.
- Commits: Conventional Commits in English, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Work on branch `feat/public-site`.
- `next dev` re-adds a block to `AGENTS.md`; commit it as is.

## Review Focus

No tests by the user's choice, so the reviewer checks these by reading the code:

- API down or slow (10 s timeout) → `/` still renders without the leads/team sections; other pages land in `app/(site)/error.tsx`, never a raw stack.
- More than 20 projects or members → `getAll` follows `next` and every row shows; a broken `next` loop stops (page cap).
- A project member whose profile is not in `members/` (unfilled) → dropped from project teams and leads, so no link points to a 404 profile.
- Two visitors sending requests → the API sees each visitor's IP (`X-Forwarded-For`), not one shared server IP; a 429 shows the rate-limit message and keeps the typed values.
- An enum value the frontend doesn't know (new status, position, role) → that row is dropped or the position reads as none, the page keeps working; `/projects/abc` and `/team/0` → 404.

---

### Task 1: Skeleton (SCSS, config, layout, hero)

**Files:**
- Modify: `package.json`, `next.config.ts`, `app/layout.tsx`, `.gitignore` (add `!.env.example`)
- Delete: `app/globals.css`, `app/page.tsx`, `app/favicon.ico`, `public/{file,globe,next,vercel,window}.svg`
- Copy: `app/globals.scss`, `app/icon.svg`, `public/brand/*`, `public/team/placeholder-1.webp`, `app/(site)/layout.tsx`, `app/(site)/error.tsx`, `src/layout/**`, `src/ui/Button.tsx` + scss, `src/ui/ArrowIcon.tsx`, `src/lib/motion-tokens.ts`, `src/hooks/useMediaQuery.ts`, `src/hooks/use-safe-motion.ts`, `src/data/socials.ts`, `src/components/errors/LoadError.tsx` + scss, `src/animation/HeroLogoParticles.tsx`, `src/components/hero-sections/Welcome.tsx` + scss
- Create: `app/(site)/page.tsx`, `.env.example`

**Interfaces:**
- Produces: `Header` prop `loginHref: string`; `Layout` (server component) passes it.

- [ ] **Step 1: Swap dependencies**

```bash
bun remove tailwindcss @tailwindcss/turbopack
bun add sass@^1.106.0 motion@^13.4.0 gsap@^3.15.0 zod@^4.6.7 server-only@^0.0.1
```

- [ ] **Step 2: Copy the files listed above, delete the template files**

`app/layout.tsx`: take the old one, drop the `cz-shortcut-listen` attribute on `<body>` (a browser-extension leftover).

- [ ] **Step 3: `next.config.ts`**

`cacheComponents: true`, `partialPrefetching: true`, the old app's `images` block (Pexels `remotePatterns`, SVG settings), and `rewrites()` returning `[{ source: "/media/:path*", destination: \`${api}/media/:path*\` }]` when `API_URL` is set (same shape as `../community-service/next.config.ts`). Remove the Tailwind turbopack loader.

- [ ] **Step 4: «Войти» goes to the service**

`src/layout/Layout.tsx` computes `` `${process.env.SERVICE_URL ?? ""}/login` `` and passes it as `loginHref` to `Header`; both «Войти» buttons in `Header.tsx` (desktop and mobile menu) use it instead of `"/login"`.

- [ ] **Step 5: Home placeholder and env example**

`app/(site)/page.tsx` renders `<Welcome />` only (replaced in Task 3). `.env.example` lists `API_URL=` and `SERVICE_URL=` with one-line comments; `.env*` stays git-ignored except `.env.example`.

- [ ] **Step 6: Verify**

Run: `bunx tsc --noEmit && bun run lint` — Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: set up scss, layout and hero"
```

### Task 2: API layer for the new API

**Files:**
- Copy: `src/lib/people.ts`, `src/lib/route-id.ts`, `src/lib/plural.ts`
- Create: `src/lib/api-enums.ts`, `src/lib/api-labels.ts`, `src/lib/media.ts`, `src/server/api/{errors,http,schemas,projects,members,stats,joins,home,client-requests}.ts`

Old files are the starting point for each `src/server/api/*` module; drop everything that needs a token (`client.ts`, `authed*`, admin/account getters, `auth/*`).

**Interfaces:**
- Produces (used by Tasks 3–7):
  - `src/lib/api-enums.ts`: `POSITIONS = ["Frontend_Developer","Backend_Developer","Fullstack_Developer","UI_UX_Designer","QA_Engineer","Mobile_Developer"]`, `PROJECT_STATUSES = ["Planned","In_progress","Completed","Paused"]`, `MEMBERSHIP_ROLES = ["Team_Lead","Member"]`, types `Position`, `ProjectStatus`, `MembershipRole`.
  - `src/lib/api-labels.ts`: `Tone`, `POSITION_LABELS` (`UI_UX_Designer: "UI/UX Designer"`, rest as old), `positionLabel(p: Position | null): string | null`, `PROJECT_STATUS_LABELS`, `PROJECT_STATUS_TONE` (as old), `MEMBERSHIP_ROLE_LABELS = { Team_Lead: "Тимлид", Member: "Участник" }`.
  - `src/lib/media.ts`: `mediaUrl(url: string | null | undefined): string | null` — the service's helper limited to `/media/` paths.
  - `schemas.ts` types (all fields required unless shown):
    - `MemberListItem { id; first_name; last_name; position: Position | null; avatar: string | null }` (also the shape of nested `user`)
    - `TeamShort { id; name; image: string | null }`
    - `ProjectListItem { id; name; status: ProjectStatus; category; image: string | null; team: TeamShort | null }`
    - `Membership { user: MemberListItem; role: MembershipRole }`
    - `ProjectDetail = ProjectListItem & { description; demo_url: string | null; github_url: string | null; created_at; members: Membership[] }`
    - `MemberProject { id; name; status: ProjectStatus; image: string | null; role: MembershipRole }`
    - `MemberDetail = MemberListItem & { bio; skills; github: string | null; linkedin: string | null; portfolio: string | null; resume: string | null; projects: MemberProject[] }`
    - `Stats { members_count; projects_count; companies_count }`
  - `http.ts`: `request<T>(path: string, schema: ZodType<T>, options?: RequestOptions): Promise<T>`, `requestNoContent(path, options?): Promise<void>`, `getAll<T>(path: string, item: ZodType<T>): Promise<T[]>`; `RequestOptions { method?; body?; headers?: Record<string, string>; timeoutMs? }`.
  - `errors.ts`: as old plus kind `"rate_limited"` (status 429, message «Слишком много запросов. Попробуйте позже.»); `ApiError`, `isApiError`, `apiErrorMessage`, `nullIfNotFound`, `parseDrfErrors`.
  - Getters: `getProjects(): Promise<ProjectListItem[]>`, `getProject(id: number): Promise<ProjectDetail | null>`, `getProjectsWithMembers(): Promise<ProjectDetail[]>`, `getMembers(): Promise<MemberListItem[]>`, `getMember(id: number): Promise<MemberDetail | null>`, `getStats(): Promise<Stats>`, `getTeamLeads(): Promise<LeadProfile[]>`.
  - `joins.ts`: `TeamPerson { member: MemberListItem; role }`, `ProjectTeam { project: ProjectDetail; people: TeamPerson[] }`, `withPeople(members: Membership[], roster: MemberListItem[]): TeamPerson[]`, `projectTeams(projects, roster): ProjectTeam[]`, `teamLeads(projects, roster): MemberListItem[]`, `LeadProject { id; name; status; role }`, `LeadProfile { member: MemberListItem; bio: string; projects: LeadProject[] }`, `leadProfile(member: MemberDetail): LeadProfile`, `splitSkills(skills: string): string[]`.
  - `client-requests.ts`: `ClientRequestWrite` (as old), `createClientRequest(data: ClientRequestWrite, clientIp: string | null): Promise<void>`.

- [ ] **Step 1: Enums, labels, media, copied helpers**

- [ ] **Step 2: `errors.ts` and `http.ts`**

`apiUrl(path)` returns `${API_URL}/api/ru${path}` and throws `ApiError("unavailable")` when `API_URL` is unset. No `Authorization` header, no `next`/`cache` fetch options (caching is `"use cache"`). 429 → `rate_limited`. Keep `redirect: "manual"` and the 10 s timeout.

`getAll` reads pages shaped `{ next: string | null, results: [...] }` (rows through `listOf(item)`), turns each `next` URL into a path by stripping the origin and the `/api/ru` prefix, and stops after 50 pages.

- [ ] **Step 3: `schemas.ts`**

Keep the old helpers (`text`, `url`, `listOf`, `position` with `.catch(null)`); `media` now maps through `mediaUrl`. A project's `team` is `teamShort.nullable().catch(null)`. Nested arrays (`members`, `projects`) go through `listOf`. Export the types above with `z.infer`.

- [ ] **Step 4: Getters**

Every getter in `projects.ts`, `members.ts`, `stats.ts` starts with `"use cache"`, `cacheLife("minutes")`, `cacheTag(<tag>)` with tags `"projects"`, `"members"`, `"stats"`; list getters use `getAll`, detail getters wrap `nullIfNotFound`. `getProjectsWithMembers` loads `getProject` for every list row in parallel and drops nulls. Modules import `"server-only"`.

- [ ] **Step 5: `joins.ts` and `home.ts`**

`withPeople` keeps only members whose `user.id` is in the roster (unfilled profiles have no public page), leads first. `teamLeads` = every `Team_Lead` across projects, once, in order of first appearance. `leadProfile` takes bio and `projects` (id, name, status, role) from the member detail. `getTeamLeads` = roster + projects → `teamLeads` → `getMember` for each → `leadProfile`; on any error it calls `unstable_rethrow`, logs, returns `[]` (as old).

- [ ] **Step 6: `client-requests.ts`**

`POST /client-requests/` via `requestNoContent`; when `clientIp` is set, send it as `X-Forwarded-For`.

- [ ] **Step 7: Verify**

Run: `bunx tsc --noEmit && bun run lint` — Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: add public api layer for the new api"
```

### Task 3: Home page

**Files:**
- Copy: `src/components/Hero.tsx`, `src/components/hero-sections/*` except `*.test.ts` and `Welcome` (already there), `src/hooks/use-count-up.ts`, `src/lib/stats-sentence.ts`, `src/lib/project-path.ts`, `src/data/services.ts`, `src/ui/{ProjectCover,ProjectPath,Avatar}.tsx` + scss
- Modify: `app/(site)/page.tsx`

**Interfaces:**
- Consumes: `getStats`, `getProjectsWithMembers`, `getTeamLeads`, `ProjectDetail`, `LeadProfile`, `Stats`.

- [ ] **Step 1: Copy files; `app/(site)/page.tsx` renders `<Home />` from `Hero.tsx` (old page)**

- [ ] **Step 2: Field renames**

`Showcase.tsx`: `ShowcaseProject` picks `"id" | "name" | "category" | "status" | "image" | "description"`; uses `project.image` and `project.status`. `Hero.tsx` maps the same fields. Everything else unchanged.

- [ ] **Step 3: Verify** — `bunx tsc --noEmit && bun run lint`, no errors.

- [ ] **Step 4: Commit** — `feat: add home page on the new api`

### Task 4: Projects list and project page

**Files:**
- Copy: `src/components/Projects.tsx`, `src/components/projects-sections/*`, `app/(site)/projects/page.tsx`, `app/(site)/projects/[id]/page.tsx`

**Interfaces:**
- Consumes: `getProjects`, `getProject`, `getMembers`, `withPeople`, `parseId`, `ProjectListItem`, `ProjectDetail`, `TeamPerson`.

- [ ] **Step 1: Copy files**

- [ ] **Step 2: Field renames**

`project_status` → `status`, `preview_image` → `image` in `Projects.tsx`, `Grid.tsx`, `EditorialList.tsx`, `ProjectDetail.tsx`.

- [ ] **Step 3: Project page under `cacheComponents`**

`[id]/page.tsx`: the default export renders `<Suspense fallback={null}>` around an async inner component that awaits `params`, loads the project (`parseId` → `getProject`, null → `notFound()`), `getProjects()` for the pager (same wrap-around as old) and `getMembers()` for `withPeople(project.members, roster)`. `generateMetadata` as old.

- [ ] **Step 4: Verify** — `bunx tsc --noEmit && bun run lint`, no errors.

- [ ] **Step 5: Commit** — `feat: add projects pages on the new api`

### Task 5: Team and member pages

**Files:**
- Copy: `src/components/Team.tsx` + scss, `src/components/team-sections/*`, `src/ui/Select.tsx` + scss, `src/components/MemberProfile.tsx` + scss, `src/components/member-sections/*`, `app/(site)/team/page.tsx`, `app/(site)/team/[id]/page.tsx`

**Interfaces:**
- Consumes: `getMembers`, `getMember`, `getProjectsWithMembers`, `projectTeams`, `splitSkills`, `MemberDetail`, `MemberProject`.

- [ ] **Step 1: Copy files**

- [ ] **Step 2: Data edits**

`Team.tsx`: `getMembers()` replaces `getPublicRoster()`; `projectTeams(projects, members)`. «Команды по проектам» is secondary: if `getProjectsWithMembers()` throws, `unstable_rethrow`, log, and render the page without it (the roster still shows). `member-sections/ProjectPath.tsx` takes `projects: MemberProject[]`: `status`, `image`, and the `step__role` span shows `MEMBERSHIP_ROLE_LABELS[project.role]` (member projects have no category).

- [ ] **Step 3: Member page under `cacheComponents`**

`[id]/page.tsx`: same Suspense pattern as Task 4; `parseId` → `getMember`, null → `notFound()`. The old `status === "Active"` check goes (the API only lists filled profiles). `generateMetadata` as old.

- [ ] **Step 4: Verify** — `bunx tsc --noEmit && bun run lint`, no errors.

- [ ] **Step 5: Commit** — `feat: add team pages on the new api`

### Task 6: About page

**Files:**
- Copy: `src/components/About.tsx` + scss, `src/components/about-sections/*`, `src/animation/MagicBento.tsx` + `.css`, `src/data/{milestones,testimonials,community-photo}.ts`, `app/(site)/about/page.tsx`

Static page, no API. Copy only; fix imports if any point at files not copied yet.

- [ ] **Step 1: Copy files**
- [ ] **Step 2: Verify** — `bunx tsc --noEmit && bun run lint`, no errors.
- [ ] **Step 3: Commit** — `feat: add about page`

### Task 7: Contact page and request form

**Files:**
- Copy: `src/components/Contact.tsx` + scss, `src/components/contact-sections/*`, `src/actions/client-requests.ts`, `src/server/validation/{form,client-request}.ts`, `app/(site)/contact/page.tsx`

**Interfaces:**
- Consumes: `createClientRequest(data, clientIp)`, `isApiError`, `apiErrorMessage`, `PROJECT_TYPES`.
- Produces: `submitClientRequest(prev: RequestFormState, formData: FormData): Promise<RequestFormState>` (shape as old).

- [ ] **Step 1: Copy files**

- [ ] **Step 2: Client IP and 429 in the action**

Read the visitor's IP from `headers()`: first entry of `x-forwarded-for`, else `x-real-ip`, else `null`; pass it to `createClientRequest`. On `rate_limited` return `error: "Слишком много заявок с вашего адреса. Попробуйте через час или напишите нам в Telegram."` with the echoed values. Validation and other errors as old; `updateTag("stats")` on success.

- [ ] **Step 3: Verify** — `bunx tsc --noEmit && bun run lint`, no errors.

- [ ] **Step 4: Commit** — `feat: add contact page with client request form`

### Task 8: Production build check

`cacheComponents` errors (uncached data outside `<Suspense>`, metadata reading params) only show at build time, so one build closes the work.

- [ ] **Step 1: Build against the live API**

Run: `bun run build` with `.env` holding `API_URL` (the live API) and `SERVICE_URL`.
Expected: build succeeds; `/`, `/about`, `/contact`, `/projects`, `/team` prerendered; `/projects/[id]` and `/team/[id]` partially prerendered.

- [ ] **Step 2: Fix what the build reports, commit as `fix: …` per issue**

- [ ] **Step 3: Note for the backend** — append to the handoff (not code): the client-request throttle must key on `X-Forwarded-For` from the client site's server.
