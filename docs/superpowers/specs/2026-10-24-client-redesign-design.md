# community-client: minimal redesign for companies

Date: 2026-10-24. Status: draft for approval.

## Intent

The public site was ported as-is from the old app (see
`2026-10-24-public-site-design.md`, "logic first, design later"). Now the
design comes: the user wants the client site **calm, clear and minimal**, with
every text that says nothing removed (user, 2026-10-24: «убрать текста у
которых нету смысла и сделать дизайн не таким нагруженным, сделать красиво,
понятно и минималистично»).

**Who it is for.** Companies that order a project. Motion Community is an
internal community of developers that takes orders and builds projects; it is
not the academy (the academy content on `/about` was copied in by mistake) and
students have their own platform. Students get exactly one line with a link to
join through Telegram (user, 2026-10-24).

**What the site must do.** Make it obvious in one screen what Motion builds and
how to order it, show real projects and real people as proof, and lead to the
request form on `/contact`.

## What is wrong today (found 2026-10-24)

- The same three claims repeat about ten times across four pages: «реальные
  проекты», «проверенные люди», «тимлиды проверяют каждый этап».
- Template chrome that carries no information: «MOTION / ABOUT», «§ 01 About»,
  «Portfolio», «assembled by motion», «Motion Community • where talent gets
  hired», a fake window frame captioned «community photo», `01 / 02` numbering
  on lists that are not sequences.
- Placeholders and claims that are not true: testimonials signed «Имя
  Фамилия», hard-coded «120+ специалистов» / «больше 120 участников по семи
  направлениям» while the real count comes from the API, a RU/EN switch with no
  English site, social links pointing at bare `https://t.me/` etc.
- An English headline («Talent becomes your next hire.») on a Russian-only site.
- Whole blocks duplicated: services on `/` and `/about`; «Как мы работаем» on
  `/` vs «Что будет дальше» on `/contact`; team leads on `/` and `/team`.
- Footer links to home-page anchors (`#community`, `#pillars`) that do nothing
  on other pages.
- Visual weight: the wide Unbounded display face at huge sizes in almost every
  heading, monospace all-caps labels, pills, frames and cards everywhere; the
  home page is ~8,200px (about nine screens).

## Goals

- Every page says each thing once, in plain Russian, from the company's point
  of view.
- One visual system (below) applied to all public pages, header, footer and
  error states.
- Home shrinks to five blocks, about four screens.
- `/about` disappears.
- The three mechanics the user likes survive (see Constraints).

## Non-goals

- Data layer, API calls, caching, the request form's fields and validation:
  unchanged (`src/server/api/`, `src/actions/`, `src/server/validation/`).
- English version, new pages, new features.
- Real contact details: the user adds them later himself. Nothing is invented.
- `community-service`: its design stays frozen (memory: design-on-hold).
- Tests (standing request for the frontend split). `tsc` and `eslint` stay
  clean.

## Anti-goals

- A generic template look: no eyebrow labels over headings, no all-caps labels,
  no monospace for small text, no `→` glued to link text, no numbering on
  things that are not a sequence, no cards-for-everything, no gradient washes.
- Decoration that does not inform. Each border, label or animation must carry
  meaning.
- Invented copy that makes promises nobody agreed to (response times, client
  counts, guarantees).
- Breaking the hero particles, the projects hover list or the team contact
  sheet.

## Visual system — direction C (picked by the user in the mockups)

Dark background as today, the brand display face in exactly one place (the
page's `h1`), everything else in one quiet sans.

**Colour** (replace the tokens in `app/globals.scss`):

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#0A0C11` | page background |
| `--color-paper` | `#ECEEF2` | main text |
| `--color-mist` | `#8B91A0` | secondary text |
| `--color-line` | `#1C2029` | hairlines between rows, footer top |
| `--color-field` | `#12151C` | form inputs; border `#222734` |
| `--color-accent` | `#389FFF` | logo blue: primary buttons, focus ring, active filter underline, process line |
| `--color-on-accent` | `#04101F` | text on accent buttons |
| `--color-danger` | keep `#f87171` | form errors |

Blue appears only on primary buttons, the logo/particles, focus and the one
active-state marker; never on headings or project names.

**Type**

- Display: Unbounded 600, only for each page's `h1`. Size about
  `clamp(2rem, 1.3rem + 2.4vw, 3.25rem)`, line-height ~1.12, max ~15ch on home.
- Everything else: **Onest** (Google Fonts via `next/font`, `latin` +
  `cyrillic`, weights 400/500). Replaces Inter and JetBrains Mono; both fonts
  are removed from `app/layout.tsx`.
- Scale (Onest): 14 small/meta, 16 body, 17 lead, 24 section `h2` and list
  rows, up to ~32 for project names in the hover list on desktop. Weights: 400
  body, 500 headings/rows/buttons. Sentence case everywhere.

**Layout**: left-aligned; one container (narrower than today's 1440px is the
builder's call), generous vertical spacing between sections, hairline rows
instead of cards. Mobile from 375px, no horizontal scroll.

**Buttons**: primary = accent pill with dark text; secondary = underlined text
link. The ghost-pill style goes.

**Motion** (motion/react, existing tokens in `src/lib/motion-tokens.ts`,
reduced motion respected):

- Keep: hero particle logo (the page's one orchestrated moment), projects
  hover image, roster greyscale → colour on hover, mobile menu open/close.
- Remove: the sticky stacked project plates (`Showcase`), count-up numbers,
  the scroll-filled process rail (becomes a static line), testimonial stagger,
  the project page image parallax, the header's sliding pills.

## Header and footer

**Header**: logo (links home) · «Проекты» · «Команда» · «Контакты» · primary
button «Обсудить проект» → `/contact`. Active link is `--color-paper`, others
`--color-mist`. Removed: «Главная», RU/EN switch, «Войти», the separate pill
"islands". Sticky; gets a background once scrolled (as today). Mobile: burger
→ the same three links plus the button.

**Footer**: logo + «Сообщество разработчиков, Бишкек»; links Проекты /
Команда / Контакты; «Войти для участников» → `${SERVICE_URL}/login` (moved here
from the header; `Layout` passes `loginHref` to the footer instead); social
links from `src/data/socials.ts`, rendered only when an `href` is set; «©
{year} Motion Community». Removed: the «Сообщество» / «Академия» columns and
their anchors, the academy phone and address, «Бишкек, Кыргызстан» duplicate.

**Socials**: `src/data/socials.ts` keeps the same shape, hrefs become empty
strings with a comment telling the user to fill them in. Every place that
renders a social link (footer, contact page, the students line) skips empty
ones; a block with no links left is not rendered.

## Pages

### `/` — five blocks

1. **Hero** (`Welcome`, rewritten copy, same particle mechanics):
   - `h1` «Соберём команду разработчиков под ваш проект»
   - lead «Сайты, веб-системы, Telegram-боты и AI-интеграции. Сообщество
     разработчиков Motion, Бишкек.»
   - primary «Обсудить проект» → `/contact`; text link «Наши проекты» →
     `/projects`
   - one quiet line with the real numbers from `getStats()` built by
     `statsSentence` (plain text, no count-up); hidden when it returns nothing
   - particle canvas on the right ≥1025px, static logo image below (as today)
   - removed: the paragraph above the headline, «120+ специалистов…», the
     kicker, the English headline, «assembled by motion»
2. **Проекты**: `h2` «Проекты» + text link «Все проекты»; the first six
   projects in the same hover list as `/projects` (`EditorialList` on desktop,
   `Grid` on phones). Replaces `Showcase`.
3. **Что делаем**: four rows from `SERVICES` (title + existing one-line
   description). Plain rows, not links (they linked to `/about#services`).
4. **Как работаем**: the four existing steps (a real sequence, so numbers stay),
   static accent line on top. Drop the closing «Каждый этап проверяют тимлиды
   сообщества.»
5. **Final call**: `h2` «Расскажите о задаче — предложим команду и сроки» +
   «Обсудить проект». Under it one muted line for students: «Разработчик и
   хотите в сообщество? Напишите нам в Telegram» linking to `TELEGRAM_URL`
   (the line is hidden while that is empty).

Removed from home: `Showcase`, `StatsStatement` (its sentence moves into the
hero), `Leads`, `Doors`.

### `/projects`

`h1` «Проекты»; no eyebrow, no subtitle. Category filter as plain text tabs
(active one `--color-paper` with an accent underline); status filter as the
existing `Select` on the right. The hover list and the phone grid restyled to
the system: Onest names, status and category as one muted text line, no row
numbers, no coloured status dots.

### `/projects/[id]`

Back link «Все проекты»; meta as one muted line («В разработке, web service,
2026»); `h1` project name in `--color-paper` (not blue); description; cover
image (no parallax); «Команда проекта» as a normal `h2` with the existing team
list or «Команда проекта ещё собирается.»; demo/GitHub buttons when present;
prev/next pager kept, visually quieter.

### `/team`

`h1` «Команда»; lead «Разработчики, дизайнеры и тимлиды, которые делают наши
проекты.» The roster contact sheet stays (frame, hairlines, greyscale → colour,
name and role, position `Select`), minus the `01…` numbers and minus the
«Нужна команда под ваш проект?» band with its two buttons. The «Команды по
проектам» block (`Teams`) is removed, and with it `Team.tsx` no longer loads
project details.

### `/team/[id]`

Same content; section labels («О себе», «Навыки», «Путь в проектах») become
normal `h2` in Onest; skills as plain text chips or a comma line (builder's
call), no monospace.

### `/contact`

`h1` «Расскажите о проекте»; lead «Изучим заявку и вернёмся с вопросами или
предложением.» Same form fields and behaviour; labels in sentence case Onest
(no caps, no dot markers; required/optional shown in words where it matters,
e.g. «Бюджет, сом — необязательно»). Right column: the three «Что будет
дальше» steps and a «Удобнее напрямую?» block with the socials that are set.

### `/about`

Deleted: the route, `src/components/About*`, `src/components/about-sections/`,
`src/animation/MagicBento.*`, `src/data/milestones.ts`,
`src/data/testimonials.ts`, `src/data/community-photo.ts`. `next.config.ts`
redirects `/about` → `/` (permanent). `src/data/services.ts` stays: the request
form uses it.

### Cleanup that follows from the above

Remove code left without users: `Showcase` (+ `showcase-ranges.ts`),
`StatsStatement`, `CountUp`, `use-count-up`, `Leads`, `Doors`, `Teams`,
`getTeamLeads` / `home.ts` if nothing else uses it, `src/ui/ProjectPath` if
unused. Update metadata: root description and page titles written for
companies, «О нас» gone; add metadata for `/contact` and `/team` if missing.

## Constraints

- Stack and conventions as in the repo: Next.js 16 App Router, React 19,
  TypeScript strict, SCSS modules imported as `scss`, PascalCase component
  files, no Tailwind, Server Components unless a piece needs the client.
- Keep `cz-shortcut-listen="true"` on `<body>` (memory: frontend-conventions).
- The three mechanics stay: hero particle logo (`HeroLogoParticles`), projects
  hover list (`EditorialList`), team contact sheet (`Roster`). Restyle around
  them, don't rewrite their behaviour.
- Work on a branch off `feat/public-site` (it is not merged into `main` yet).
- Check each page visually at 1440px and 375px (screenshots) before calling a
  step done.

## Calls made while writing this (not discussed with the user)

- `/about` redirects to `/` rather than 404, so old links keep working.
- «Войти» moves from the header to the footer: it is for members, not
  companies.
- Empty social links are hidden instead of pointing at bare `t.me/` etc.; the
  user fills them in later.
- The home projects block uses `getProjects()` (list items), not
  `getProjectsWithMembers()`: the hover list needs no descriptions or members.
- A header link is active on its nested routes too (`/projects/12` marks
  «Проекты»).
- Only Unbounded 600 is loaded (700/800 are no longer used).
- «Error states» means `app/(site)/error.tsx` and `LoadError`; no custom
  not-found page is added.

## Left to the builder

Exact spacing scale and container width, breakpoints, hover/focus details,
mobile menu layout, how the active filter tab is marked beyond the colour, the
branch name and the order of commits.
