# Client minimal redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle community-client to the approved minimal "direction C" for companies, cut every text that says nothing, and delete `/about`.

**Architecture:** Presentation-only change. Data layer (`src/server/api/`), the request action and validation stay as they are. Deletions go first so later tasks restyle only what survives; a shared `PageIntro` and `ProjectListing` keep the page heads and the project list in one place each.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, SCSS modules (`scss` import), motion/react, bun.

**Spec:** `docs/superpowers/specs/2026-10-24-client-redesign-design.md`

## Global Constraints

- No tests (user's standing request for the frontend split). Every task ends with `bunx tsc --noEmit` and `bun run lint` clean.
- Visual check: full-page screenshots at 1440px and 375px of every page the task touches (dev server on `http://localhost:3000`), read before committing.
- Tokens exactly as in the spec: ink `#0A0C11`, paper `#ECEEF2`, mist `#8B91A0`, line `#1C2029`, field `#12151C` / border `#222734`, accent `#389FFF`, on-accent `#04101F`, danger `#f87171`.
- Unbounded 600 only on each page's single `h1`; everything else Onest 400/500; sentence case; no monospace, no all-caps, no eyebrows, no `01` numbering outside the process steps, no `→` in link text.
- Blue only on primary buttons, logo/particles, focus ring, the one active-state marker, the process line.
- Copy is fixed by the spec where quoted; don't invent claims.
- PascalCase component files, SCSS modules, Server Components unless a piece needs the client. Keep `cz-shortcut-listen="true"` on `<body>`.
- Conventional Commits in English, one logical change per commit, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

- No data: zero projects / zero members → home hides the projects block, `/projects` shows the empty-state line, `/team` shows an empty frame without breaking layout (check by temporarily passing `[]` in the page, not committed).
- Long names: a 40-character project name as the Unbounded `h1` at 375px wraps without horizontal scroll (`overflow-wrap: anywhere` on page titles).
- Missing images: projects without `image` and members without `avatar` render the existing `ProjectCover` / `Avatar` fallbacks in the hover list, phone grid, roster and detail pages.
- Reduced motion: with `prefers-reduced-motion` the hero shows the static logo, the hover preview is off, nothing that carries information is hidden behind an animation.
- Keyboard: every link, tab, select and button shows the accent focus ring on the dark background; the header menu works with Enter/Escape.

---

### Task 1: Branch, ignore companion files, commit the spec

**Files:**
- Modify: `.gitignore`
- Add: `docs/superpowers/specs/2026-10-24-client-redesign-design.md`, `docs/superpowers/plans/2026-10-24-client-redesign.md`

- [ ] **Step 1:** `git switch -c feat/client-redesign` (from `feat/public-site`).
- [ ] **Step 2:** Append `.superpowers/` to `.gitignore` under `# misc`. `git status` no longer lists `.superpowers/`.
- [ ] **Step 3: Commit** — `docs: add client redesign spec and plan` (`.gitignore` + both docs).

### Task 2: Delete `/about` and its dead code

**Files:**
- Delete: `app/(site)/about/`, `src/components/About.tsx`, `src/components/About.module.scss`, `src/components/about-sections/`, `src/animation/MagicBento.tsx`, `src/animation/MagicBento.css`, `src/data/milestones.ts`, `src/data/testimonials.ts`, `src/data/community-photo.ts`
- Modify: `next.config.ts`, `src/layout/header/Header.tsx` (drop the «О нас» link), `src/layout/footer/Footer.tsx` (drop the «О нас» link)

- [ ] **Step 1:** Delete the files above; remove the two «О нас» links.
- [ ] **Step 2:** Add `redirects()` to `next.config.ts`: `{ source: "/about", destination: "/", permanent: true }`.
- [ ] **Step 3:** `grep -rn "about-sections\|MagicBento\|milestones\|testimonials\|community-photo" app src` → no hits. `bunx tsc --noEmit`, `bun run lint` clean. `curl -sI localhost:3000/about` → `308` with `location: /`.
- [ ] **Step 4: Commit** — `feat: remove the about page and redirect it home`.

### Task 3: Foundation — fonts, tokens, container, Button, PageIntro

**Files:**
- Modify: `app/layout.tsx`, `app/globals.scss`, `src/ui/Button.tsx`, `src/ui/Button.module.scss`
- Create: `src/ui/PageIntro.tsx`, `src/ui/PageIntro.module.scss`

**Interfaces:**
- Produces: CSS vars `--color-ink|paper|mist|line|field|field-border|accent|on-accent|danger`, `--font-display` (Unbounded), `--font-body` (Onest); global class `.page-title` (Unbounded 600, `clamp(2rem, 1.3rem + 2.4vw, 3.25rem)`, line-height 1.12, `overflow-wrap: anywhere`); `Button` with `variant?: "primary" | "link"`; `PageIntro: FC<{ title: string; lead?: string; children?: ReactNode }>` rendering `<div class="container"><h1 class="page-title">` + muted lead (17px, max 46ch) + children.

- [ ] **Step 1:** `app/layout.tsx`: `Onest` from `next/font/google` (`variable: "--font-onest"`, subsets latin+cyrillic, weights 400/500) replaces Inter; JetBrains Mono removed; Unbounded weight `["600"]`. Root description: «Сообщество разработчиков Motion из Бишкека: сайты, веб-системы, Telegram-боты и AI-интеграции под ваш проект.» `<body cz-shortcut-listen="true">` stays (this also commits the user's pending change to that line).
- [ ] **Step 2:** `globals.scss`: new tokens; `--font-body` → Onest; `--font-mono` → alias of `--font-body` until Task 10 removes it. Old names stay as aliases for now (`--color-border` → line, `--color-surface`/`--color-surface-2` → field, `--color-accent-soft` → `#7cc0ff`, `--color-signal` → mist) so untouched modules still compile. `.container`: `max-width: 1280px; padding-inline: clamp(20px, 4vw, 48px)`. Body text 16px/1.55.
- [ ] **Step 3:** `Button`: `ghost` → `link` (underlined text, offset 4px, 1px thickness, paper colour, no pill); primary: accent background, on-accent text, 44px tall, hover lighter accent. Fix every `variant="ghost"` call site `tsc` reports (switch to `link`).
- [ ] **Step 4:** Create `PageIntro` per Interfaces.
- [ ] **Step 5:** tsc + lint clean; screenshot `/` and `/projects` at 1440 — text is Onest, nothing broken.
- [ ] **Step 6: Commit** — `feat: switch the client to the new type and colour tokens`.

### Task 4: Header, footer, socials

**Files:**
- Modify: `src/layout/Layout.tsx`, `src/layout/header/Header.tsx` + `.module.scss`, `src/layout/footer/Footer.tsx` + `.module.scss`, `src/data/socials.ts`

**Interfaces:**
- Produces: `SOCIAL_LINKS` keeps `SocialLink { href: string; label: string }` with `href: ""` for WhatsApp, Telegram, Instagram, LinkedIn and a comment «fill in the real links»; `TELEGRAM_URL: string` (`""` when unset); `visibleSocials(): SocialLink[]` in `src/data/socials.ts` returning only entries with a non-empty `href`. `Footer` takes `{ loginHref: string }`; `Header` takes no props.

- [ ] **Step 1:** Header: logo · «Проекты» · «Команда» · «Контакты» · primary `Button` «Обсудить проект» → `/contact`. Active = `pathname === href || pathname.startsWith(href + "/")`, paper vs mist colour; remove the islands, both measured pills, the RU/EN switch, «Главная», «Войти». Keep sticky + background after 8px scroll, burger + mobile menu (three links + button), `AnimatePresence` as now, Escape closes the menu.
- [ ] **Step 2:** Footer per spec: logo + «Сообщество разработчиков, Бишкек»; Проекты / Команда / Контакты; «Войти для участников» → `loginHref`; `visibleSocials()` list (block hidden when empty); «© {year} Motion Community». Hairline top border, no column headings in caps.
- [ ] **Step 3:** `Layout` passes `loginHref` to `Footer` instead of `Header`.
- [ ] **Step 4:** tsc + lint; screenshots of `/` header/footer at 1440 and 375, plus the open mobile menu at 375.
- [ ] **Step 5: Commit** — `feat: simplify the client header and footer`.

### Task 5: Projects page and the shared project list

**Files:**
- Create: `src/components/projects-sections/ProjectListing.tsx`
- Modify: `src/components/Projects.tsx`, `src/components/projects-sections/Header.tsx` + `.module.scss`, `EditorialList.tsx` + `.module.scss`, `Grid.tsx` + `.module.scss`
- Modify: `app/(site)/projects/page.tsx` (metadata description: «Проекты сообщества Motion: что мы делаем и что уже в работе.»)

**Interfaces:**
- Produces: `ProjectListing: FC<{ projects: ProjectListItem[] }>` rendering `Grid` (phones) and `EditorialList` (≥960px) as today's page does.

- [ ] **Step 1:** `Header`: `PageIntro title="Проекты"` without lead; category tabs as text buttons (active: paper + 1px accent underline, `aria-pressed`), status as the existing `Select` (options «Все статусы» + `STATUS_ORDER`) aligned right on the same row, stacking under the tabs ≤768px. Remove «Portfolio», the subtitle, the motion pill.
- [ ] **Step 2:** `EditorialList`: no index column, no coloured status dot, no arrow; name Onest 500 ~32px; meta one muted line «{status label}, {category}»; hairline rows; keep the cursor-following preview, dimming and reduced-motion behaviour untouched.
- [ ] **Step 3:** `Grid` (phones): image + name + the same meta line, no card border/shadow/status badge; keep the existing enter/exit motion.
- [ ] **Step 4:** `ProjectListing` + use it in `Projects.tsx`.
- [ ] **Step 5:** tsc + lint; screenshots `/projects` 1440 + 375; hover a row in a headed check (or trust unchanged logic) — preview still appears.
- [ ] **Step 6: Commit** — `feat: restyle the projects list and filters`.

### Task 6: Home page

**Files:**
- Modify: `src/components/Hero.tsx`, `src/components/hero-sections/Welcome.tsx` + `.module.scss`, `ServiceRows.tsx` + `.module.scss`, `Process.tsx` + `.module.scss`
- Create: `src/components/hero-sections/FinalCall.tsx` + `.module.scss`
- Delete: `Showcase.tsx`/`.module.scss`, `showcase-ranges.ts`, `StatsStatement.tsx`/`.module.scss`, `CountUp.tsx`, `src/hooks/use-count-up.ts`, `Leads.tsx`/`.module.scss`, `Doors.tsx`/`.module.scss`, `src/server/api/home.ts`, `src/ui/ProjectPath.tsx`/`.module.scss`, and in `src/server/api/joins.ts` the exports only `home.ts`/`Leads` used (`teamLeads`, `LeadProject`, `LeadProfile`, `leadProfile`) after grep confirms

**Interfaces:**
- Consumes: `ProjectListing` (Task 5), `PageIntro` not used here (hero has its own layout), `TELEGRAM_URL` (Task 4), `statsSentence`, `getStats`, `getProjects`.
- Produces: `Welcome: FC<{ stats: SentencePart[] }>`; `FinalCall: FC` (server).

- [ ] **Step 1:** `Hero.tsx`: `Promise.all([getStats(), getProjects()])`; render `Welcome stats={statsSentence(stats)}`, then (if any projects) a section with `h2` «Проекты» + `Button variant="link" href="/projects"` «Все проекты» + `ProjectListing projects={projects.slice(0, 6)}`, then `ServiceRows`, `Process`, `FinalCall`.
- [ ] **Step 2:** `Welcome`: exact copy from spec (`h1.page-title` «Соберём команду разработчиков под ваш проект», lead, primary «Обсудить проект» → `/contact`, link «Наши проекты» → `/projects`, muted stats line = parts joined as plain text, hidden when empty). Keep `HeroLogoParticles` ≥1025px and the static image below it; remove top copy, kicker, English headline, both «assembled by motion» captions.
- [ ] **Step 3:** `ServiceRows`: `h2` «Что делаем»; four plain rows (title Onest 500 18px in a fixed column, description muted); no links, no chevron, no head CTA, no lead.
- [ ] **Step 4:** `Process`: keep the four steps (numbers stay), static 1px accent line on top instead of the scroll rail (drop `useScroll`, make it a Server Component), drop the closing sentence.
- [ ] **Step 5:** `FinalCall`: `h2` «Расскажите о задаче — предложим команду и сроки», primary «Обсудить проект» → `/contact`; when `TELEGRAM_URL` is non-empty, muted line «Разработчик и хотите в сообщество?» + external link «Напишите нам в Telegram».
- [ ] **Step 6:** Delete the files listed; `grep` for each deleted name → no hits. tsc + lint.
- [ ] **Step 7:** Screenshots `/` 1440 + 375: five blocks, page height roughly 4 screens at 1440 (≈3,600–4,200px).
- [ ] **Step 8: Commit** — `feat: rebuild the home page around five blocks`.

### Task 7: Project page

**Files:**
- Modify: `src/components/projects-sections/ProjectDetail.tsx` + `.module.scss`, `HeroImage.tsx` + `.module.scss`, `TeamSection.tsx` + `.module.scss`

- [ ] **Step 1:** Meta as one muted line «{status}, {category}, {year}»; `h1.page-title` name in paper (drop `.shine`); description 17px muted; `h2` «Команда проекта»; demo/GitHub buttons (primary + link); pager: two plain links with muted «Предыдущий»/«Следующий» and the name in Onest 500 24px, hairline top.
- [ ] **Step 2:** `HeroImage` without scroll parallax (Server Component if nothing else needs the client); `TeamSection` without scroll reveal, people as avatar + name + role rows.
- [ ] **Step 3:** tsc + lint; screenshots `/projects/{id}` 1440 + 375 for a project with and without image/team.
- [ ] **Step 4: Commit** — `feat: restyle the project page`.

### Task 8: Team page and member profile

**Files:**
- Modify: `src/components/Team.tsx` + `Team.module.scss`, `team-sections/Roster.tsx` + `.module.scss`, `src/components/MemberProfile.tsx` + `.module.scss`, `member-sections/ProfileCard.tsx` + `.module.scss`, `member-sections/ProjectPath.tsx` + `.module.scss`, `app/(site)/team/page.tsx` (metadata if missing: title «Команда — Motion Community», description «Разработчики, дизайнеры и тимлиды сообщества Motion.»)
- Delete: `team-sections/Intro.tsx` + `.module.scss`, `team-sections/Teams.tsx` + `.module.scss`; `projectTeams` / `ProjectTeam` in `joins.ts` if unused afterwards

- [ ] **Step 1:** `Team.tsx`: only `getMembers()`; `PageIntro title="Команда" lead="Разработчики, дизайнеры и тимлиды, которые делают наши проекты."` + `Roster`.
- [ ] **Step 2:** `Roster`: drop the «Участники» `h2`, the `01…` index and the footer band with both buttons; keep frame, hairlines, greyscale → colour on hover/focus, caption, direction `Select`. Caption text Onest, no mono.
- [ ] **Step 3:** Profile: section labels as normal `h2` (Onest 500 18px); skills as plain muted chips without monospace; `ProfileCard` name in Onest 500 (the page `h1` stays the member's name — make it `.page-title` if it is the only `h1`); project path rows quiet (no card borders/shadows).
- [ ] **Step 4:** tsc + lint; screenshots `/team` and `/team/{id}` at 1440 + 375.
- [ ] **Step 5: Commit** — `feat: restyle the team page and member profile`.

### Task 9: Contact page

**Files:**
- Modify: `src/components/Contact.tsx` + `Contact.module.scss`, `contact-sections/RequestForm.module.scss` (+ `.tsx` only for label text), `contact-sections/NextSteps.tsx` + `.module.scss`, `app/(site)/contact/page.tsx` (metadata: «Заявка на проект — Motion Community», description «Расскажите о задаче — предложим команду и сроки.»)
- Delete: `contact-sections/Intro.tsx` + `.module.scss`

- [ ] **Step 1:** `PageIntro title="Расскажите о проекте" lead="Изучим заявку и вернёмся с вопросами или предложением."`.
- [ ] **Step 2:** Form: labels Onest 13–14px sentence case, no dot markers, «Бюджет, сом — необязательно»; inputs `--color-field` with `--color-field-border`, 44px tall, 10px radius, accent focus ring; errors in danger under the field (existing logic). Field names, action and validation unchanged.
- [ ] **Step 3:** `NextSteps`: three steps as a quiet ordered list; «Удобнее напрямую?» block from `visibleSocials()`, hidden when empty.
- [ ] **Step 4:** tsc + lint; screenshots `/contact` 1440 + 375, and with a submitted empty form (field errors visible).
- [ ] **Step 5: Commit** — `feat: restyle the contact page and request form`.

### Task 10: Error states, token cleanup, final pass

**Files:**
- Modify: `src/components/errors/LoadError.tsx` + `.module.scss`, `app/globals.scss`, any module still using an alias

- [ ] **Step 1:** `LoadError`: `h1.page-title`-sized heading only when it is the page's `h1`, muted line, primary retry button.
- [ ] **Step 2:** Remove the aliases from Task 3 (`--font-mono`, `--color-border`, `--color-surface*`, `--color-accent-soft`, `--color-signal`); `grep -rn` each → no hits; also no `text-transform: uppercase` and no `letter-spacing` above `0.02em` left in `src/`.
- [ ] **Step 3:** Delete what is now unused (`ArrowIcon` if no callers, `specialization-icons` stays for the roster `Select`). `bun run build` passes against the live API.
- [ ] **Step 4:** Full screenshot pass of every page at 1440 + 375; run the Review Focus checks.
- [ ] **Step 5: Commit** — `refactor: drop the old client style tokens`.
