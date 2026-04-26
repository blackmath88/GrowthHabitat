# Growth Habitat — Design System

> A career discovery lab. Not a job board, not HR software. A reflective, evidence-led environment for finding the people, companies, roles, and conditions where a person's abilities **compound fastest**.

The product turns career uncertainty into a structured journey: **strengths → energy signals → arenas → conversations → opportunity scoring → patterns → next experiments.**

The user is not asking *"Who will hire me?"* They are asking *"Where do my abilities compound fastest?"*

---

## What's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file. Brand, content, visuals, iconography, manifest. |
| `SKILL.md` | Skill manifest so this system can be invoked from Claude Code. |
| `colors_and_type.css` | All design tokens. Import this once. |
| `fonts/` | Webfonts (Fraunces, Inter Tight, JetBrains Mono — see substitution note). |
| `assets/` | Logo, icon set, supporting marks, placeholder imagery. |
| `preview/` | Small specimen cards rendered in the Design System tab. |
| `ui_kits/web_app/` | Hi-fi recreations of all 6 Growth Habitat screens. Open `index.html`. |

---

## Source material

This system was built on top of the **Change Management Platform v2** codebase (`change-management-platform-design2-main/`, mounted via File System Access). That product is the user's existing work — same author, same domain instinct (structured reflection, scoring grids, evidence over advice). Growth Habitat keeps its bones (uppercase eyebrows, scoring rails, 12-col grids, calm crit-room layout) and **shifts the temperature**: warmer canvas, a serif display voice, a single botanical accent, slower motion.

The user also pointed at two reference aesthetics:
- **noon.world** — atmospheric, editorial, ivory canvas, large serif headlines, restrained motion.
- **giga.ai** — calm tech, minimal chrome, generous whitespace, mono labels.

---

## The product, at a glance

Six surfaces, in order:

| # | Surface | The job it does |
|---|---|---|
| — | **Command Center** | Daily home. One headline. Current hypothesis. Strongest arena. Most energizing recent conversation. Next experiment. Warning signals. |
| 01 | **Signal Profile** | Who you are at your best. Strengths, energy in/out, environments, non-negotiables, working positioning statement. |
| 02 | **Arena Explorer** | Compare candidate career arenas across 7 dimensions (fascination, market demand, strength fit, learning speed, access, comp upside, credibility today). |
| 03 | **People & Conversations** | A career intelligence map — not a CRM. Each conversation captures energy in/out, admiration, learning, autonomy, market pull, integrity. Includes a Buffett 10% Test. |
| 04 | **Opportunity Fit** | Decide whether a role/company/project is worth pursuing. 8 scoring dimensions, fit calculation, decision helper. |
| 05 | **Patterns & Direction** | Pattern recognition over time. Top arenas by score, top conversations by energy gain, repeated signals, evidence for/against the hypothesis, 7-day action plan, exportable career brief. |

---

## CONTENT FUNDAMENTALS

The voice is the product. Get this wrong and the whole thing feels like a coaching app.

### Stance
- **Strategic, reflective, practical, honest.** Encouraging but not fluffy.
- Treats the user as a **competent adult mid-career** doing real strategy work — never as a beginner being talked down to.
- Focused on **evidence, not wishful thinking.** "What does the data say?" beats "follow your passion" every time.
- The product is a **lab**, the user is the **researcher**, the people they meet are **signals**, the arenas are **hypotheses**. That metaphor is load-bearing — keep it consistent.

### Person & address
- **Second person ("you")** for prompts and field labels. *"What gives you energy?"* not *"What gives the user energy?"*
- **First person ("I")** for user-authored content like positioning statements, hypotheses, quotes.
- Never "we" — there is no team voice in the product, only the user's own thinking.

### Casing
- **Sentence case** for everything. Headlines, buttons, field labels, modal titles. Never Title Case.
- **UPPERCASE + tracking** reserved for `eyebrow` labels (section/module markers, ~10px, letter-spacing 0.08em). This is the only place all-caps appears.
- Numbers prefix sections: `01 SIGNAL PROFILE`, `02 ARENA EXPLORER`. Always two-digit, always with the eyebrow treatment.

### Tone in microcopy
- **Empty states are reflective prompts**, not sales copy. *"No conversations yet — the first signal usually arrives in the next 7 days."* not *"Get started by adding your first contact!"*
- **Prompts are open questions**, not commands. *"What environment makes you sharper?"* not *"Enter your ideal environment."*
- **Confirmations are quiet.** *"Saved."* — not *"🎉 Successfully saved!"*
- **Errors are honest, not apologetic.** *"That arena needs at least one hypothesis."* — not *"Oops! Something went wrong."*
- **Numbers are evidence.** Always show the score and the n it's based on. *"Fascination 8 · 12 signals"* beats *"High fascination."*

### Vocabulary — words we use
*hypothesis · arena · signal · energy · evidence · pattern · experiment · compound · fit · pull · pursue / explore / park / avoid · admiration · trajectory · sharpen · learning speed · weak signal · trace*

### Vocabulary — words we never use
*~~unlock~~ ~~empower~~ ~~journey~~ (use "trace" or "discovery") ~~passion~~ ~~dream job~~ ~~hustle~~ ~~side gig~~ ~~candidate~~ ~~recruiter~~ ~~hire~~ ~~apply~~ ~~ATS~~ ~~résumé~~ (use "career brief") ~~networking~~ (use "conversations") ~~personal brand~~ ~~rockstar~~ ~~ninja~~ ~~level up~~ ~~game changer~~*

### Specific copy patterns

**Headline / hero pattern.** Serif headline, mono eyebrow, sans subtitle.
> EYEBROW: COMMAND CENTER
> Find the place where your abilities compound.
> A career discovery lab for turning weak signals into direction.

**Score chip pattern.** Always `Label · n · interpretation`.
> Strength fit · 8/10 · top quartile of arenas you're tracking

**Decision pattern.** Four verbs, always lowercased, always in this order: **pursue · explore · park · avoid.**

**Hypothesis pattern.** Stated in the first person, present tense, falsifiable.
> *"I'm betting that AI workforce adoption inside large governance-aware organizations is where my translator/activator strengths compound fastest over the next 3 years."*

### Emoji
**No.** No emoji anywhere in product UI. Two narrow exceptions: the user can paste them into their own notes, and the export brief preserves anything they wrote. Iconography is line-based SVG (Lucide), never emoji.

---

## VISUAL FOUNDATIONS

### The metaphor
The product is a **field notebook for a botanist of your own career.** Paper canvas, ink, careful margins, faint grid, occasional pressed leaf. The grid is doing science; the serif is doing reflection.

### Canvas
- Background is **paper cream — `#F5F1EA`** (warm, low-chroma, not white). This is non-negotiable; it does the most work of any single decision in the system. Pure white would make it feel like a SaaS dashboard.
- Surface (cards) sit one notch lighter: **`#FBF8F2`**. The lift is barely perceptible — that's the point.
- A **faint dot grid** (24px, ~5% ink) sits under the canvas on dashboard / explorer views. Forms don't get the grid (it adds noise to writing).
- Full-bleed imagery is rare. When it appears, it's **monochrome botanical** (a fern frond, a cross-section, a topographic line) at very low contrast — never stock photography of people in offices.

### Color
**One ink, one accent, one set of evidence colors. That's it.**
- **Ink: `#1A1814`** — almost-black, warm bias. All primary text.
- **Accent: `#3D5A3F` ("moss")** — a deep botanical green. Used for: active nav, focus rings, the primary CTA, score bar fills, the live-cursor in editors. It's the only saturated color in the system and it earns its place.
- **Evidence colors** — used on scoring chips and only there:
  - `#3D5A3F` moss (positive signal: pursue, high score, energizing)
  - `#9C7A3C` ochre (caution: explore, mid score, mixed signal)
  - `#A14A3A` clay (negative signal: avoid, drain, warning)
  - `#5A6F8A` slate (neutral: parked, on hold, observed)
- **Grays** are warm: `#1A1814 → #3D3833 → #6B6259 → #9C9389 → #C7BFB3 → #E3DCCF → #F5F1EA → #FBF8F2`. No cool grays anywhere.

### Type
- **Display: Fraunces** (variable serif). Optical size, soft, slightly literary. Used for page titles, large numbers (scores, hypotheses), pull-quotes from conversations. Weight 400–500 — never bold-bold.
- **Body / UI: Inter Tight** (sans). Compact tracking, reads well at small sizes, sits next to Fraunces without fighting it. Weights 400 / 500 / 600.
- **Mono: JetBrains Mono.** Used for eyebrow labels, score values, table data, the export-brief preview. Weight 500.
- **Type scale (rem on 16px root):** display 3.5 / 2.5 / 1.75 · body 1.0 / 0.875 · eyebrow 0.6875 (uppercase, tracked +0.08em).
- Headlines use Fraunces with `font-variation-settings: "opsz" 144, "SOFT" 50` for the soft optical-size variant — this is what gives it the magazine feel.

### Spacing & layout
- **8px base unit.** Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.
- **12-column grid**, 24px gutters, max-width 1440. Inherited from CMT — it works.
- **Generous vertical rhythm.** Section gaps are 64px+, never 24. Pages should feel uncrowded.
- **Sidebar 264px** (slightly wider than CMT to accommodate longer module titles like "People & Conversations").

### Borders, radii, shadows
- **Borders: 1px, color `#E3DCCF`** (canvas-tinted, never gray-blue). One weight only — no double rules, no thicker emphasis borders.
- **Radii:** `2px` micro (chips, score buttons), `4px` controls (inputs, buttons), `8px` panels/cards, `999px` capsule chips. **No big rounded corners.** This is a workspace, not a marketing page.
- **Shadows are almost absent.** One token: `0 1px 0 rgba(26,24,20,0.04)` — a single hairline beneath cards. Modals get `0 24px 60px rgba(26,24,20,0.10)`. Nothing else lifts.

### Hover & press
- **Hover on cards:** background shifts from `#FBF8F2` → `#F5F1EA` (drops one notch into the canvas), a 2px moss bar appears on the left edge. No translateY, no scale.
- **Hover on buttons:** primary deepens (`#3D5A3F` → `#2E4630`); secondary background fills `#F5F1EA`.
- **Press:** primary buttons shift down 1px, no shadow change. Score buttons fill on press, animate fill in 80ms.
- **Focus ring:** `0 0 0 3px rgba(61,90,63,0.18)` — moss at 18% opacity, never blue.

### Motion
- **Slow, considered, almost imperceptible.** Default duration 240ms, easing `cubic-bezier(0.2, 0, 0, 1)` ("contemplative" — long tail, no bounce).
- Transitions allowed: opacity, color, background, border-color, transform up to 1px translation. **No scale, no rotation, no spring/bounce.**
- Page transitions: 280ms fade through canvas.
- Numbers and scores **count up on first reveal** over 600ms (this is the one liberty — it makes evidence feel like it's arriving).

### Transparency & blur
- The topbar uses `rgba(245,241,234,0.86)` + `backdrop-filter: blur(14px)` — kept from CMT, looks great on cream.
- Modal scrim: `rgba(26,24,20,0.32)` (warm-black, not pure black).
- No frosted glass cards anywhere else. Blur is structural, not decorative.

### Imagery vibe
- When imagery appears: **warm, low-saturation, slightly grainy.** Botanical line art, topographic contours, archival photography of writing or fieldwork. Never gradients-as-decoration. Never AI-generated abstract blobs.
- Conversation/people avatars are **monogram circles** in canvas-cream with ink letters (no photos by default — this is a reflection space, not LinkedIn).

### Cards
A Growth Habitat card is: `background: #FBF8F2; border: 1px solid #E3DCCF; border-radius: 8px; box-shadow: 0 1px 0 rgba(26,24,20,0.04); padding: 24px;`. That's it. The hierarchy comes from the eyebrow + serif title + sans body inside, not from the card chrome.

### Layout rules (non-negotiable)
- Topbar fixed, 64px, blurred cream.
- Sidebar fixed, 264px, slightly inset from canvas (`#F1ECE2`).
- Page heading area always: eyebrow → serif H1 → sans subtitle, in that order.
- Score grids are always **8 columns × N rows**, mono numbers right-aligned. Never bar charts when a number will do.

---

## ICONOGRAPHY

### System
**Lucide Icons** — line, 1.5px stroke, 24×24 default. Loaded via CDN at `https://unpkg.com/lucide@latest`. The CMT codebase used unicode glyphs (`⌕`, etc.); Growth Habitat replaces these with Lucide for consistency.

**Why Lucide:** open-source, MIT-licensed, ~1500 icons, uniform stroke weight, calm geometry, ships SVG (we color them with `currentColor`). It matches the warm/calm tone — Heroicons are slightly too rounded, Phosphor too playful, Tabler too thick.

### Substitution flag
The CMT source code did not bundle an icon set — it relied on unicode characters and emoji-adjacent glyphs. **I substituted Lucide** as the closest match to the project's restraint. If the user has a preferred set, it slots into `assets/icons/` and the `colors_and_type.css` import switches.

### Specific icon mappings (in this product)
- **Command Center** → `compass`
- **01 Signal Profile** → `radio-tower`
- **02 Arena Explorer** → `target`
- **03 People & Conversations** → `users`
- **04 Opportunity Fit** → `scale`
- **05 Patterns & Direction** → `git-branch`
- pursue → `arrow-up-right`, explore → `search`, park → `pause`, avoid → `x`
- energy gain → `trending-up`, energy drain → `trending-down`, integrity ✓ → `check`, warning → `alert-triangle`
- export brief → `file-text`, add → `plus`, filter → `filter`

### Emoji
**Never** in product UI. The exception (user-authored note content) is preserved verbatim but not styled.

### Logo
The Growth Habitat mark is a **small leaf-and-line geometric** ideogram + wordmark in Fraunces. See `assets/logo-light.svg` and `assets/logo-mark.svg`. The mark works at 24px (favicon) up to 96px (login). Above 96px, lockup with the wordmark.

---

## Index — what to open next

1. **`ui_kits/web_app/index.html`** — interactive walkthrough of all 6 screens. Start here.
2. **`preview/`** — open the Design System tab in the project to see specimen cards.
3. **`colors_and_type.css`** — single source of truth for tokens.
4. **`SKILL.md`** — manifest for use as a Claude Code skill.

---

## Caveats

- **Fonts are Google Fonts substitutions.** Fraunces, Inter Tight, JetBrains Mono are all close to what the brand wants but not bespoke. If a custom face exists, drop the WOFF2s into `fonts/` and update the `@font-face` declarations in `colors_and_type.css`.
- **Logo is interpretive.** The CMT codebase had only a "CM" text favicon — Growth Habitat needed a fresh mark. The leaf-and-line in `assets/logo-mark.svg` is a starting point, not a final identity.
- **Imagery is placeholders.** Botanical line art is referenced but not committed; bring real assets when ready.
