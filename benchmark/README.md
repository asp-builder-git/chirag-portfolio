# chirag-portfolio — Benchmark Master Report

**Date:** 2026-08-28 · **Status:** study only, no site code changed · **Feeds:** gate G1 (DESIGN) of `SKILL.md`
**Inputs:** `01-teardowns.md` (SA-1), `02-typography-visual.md` (SA-2), `03-voice-copy.md` (SA-3), `04-ia-ux.md` (SA-4), `05-perf-a11y.md` (SA-5). Live target sites fetched 2026-08-28.

The short version: the site is closer to its peers than it looks. The pairing (serif + Inter), the 42rem column, the four-item nav, the dark toggle, the honest project states, and the near-zero JS are all already the peer pattern. What holds it back is two sentences, one status label, and a handful of cheap fixes. Fix those and it reads like the references it was built against.

---

## 1. Scorecard — current site vs best-of-peer

Scale: 1–5 per dimension. "Best-of-peer" is the top of the observed field, named per dimension.

| Dim | Current | Best-of-peer | What the best does that we don't |
|---|---|---|---|
| D1 UX & Interaction | 2.5/5 | 5/5 — leerob, brianlovin, paco | First action is reading one plain sentence. Everything is flat — no tabs, no reveals, no hover theater. Home is a hub of labeled lists, not a pitch. |
| D2 Typography | 3.5/5 | 5/5 — brianlovin | Same pairing shape (sans + serif), but self-hosted, preloaded, with metric-matched fallbacks, and the serif restricted to display/reading sizes it can actually hold. |
| D3 Language & Voice | 3/5 | 5/5 — mxb, levels | Page opens with one plain verb sentence. Numbers carry receipts. Difficulty is said out loud. Statuses are blunt ("My new hobby project"), never "Coming soon". |
| D4 Structure / IA | 3.5/5 | 5/5 — paco, brianlovin | Home is a two-band hub: work and projects labeled, never interleaved. Professional history lives on one page, the only page that names employers. Projects have detail pages. |
| D5 Visual Design | 4/5 | 5/5 — leerob | Monochrome + one accent, used for links/selection only. No second color, no decoration that has to be explained. |
| D6 Performance & A11y | 3.5/5 | 5/5 — mxb | Self-hosted fonts, a skip link, a reduced-motion guard, and near-zero JS. We already beat 8 of 9 targets on JS weight; the gaps are the cheap ones. |

**Overall: 3.3/5.** D3 carries the highest weight and is the biggest lever: two sentence rewrites and one deleted label take it from 3/5 to 4/5 (the last point is difficulty admissions, earned one honest line at a time per project — SA-3 §7).

---

## 2. Verdicts in one place

- **Instrument Serif + Inter: TUNE, keep.** The idea is exactly the peer norm (brianlovin: Inter + Source Serif 4; paco: Inter + Newsreader; overreacted: Merriweather + Montserrat). Three changes: restrict Instrument Serif to h1 + the italic lead accents (h2 goes to Inter 600 — explicit h2 sizing is the single highest-value typography change, SA-2 §4), self-host both families, and add metric-adjusted fallbacks so the swap doesn't shift layout (SA-2 §4–6, SA-5 §1). Replacement path (Newsreader / Source Serif 4 / Fraunces) exists in `02` only if the serif ever gets a second job.
- **Voice: 3/5, fixable by substitution, not rewrite.** The lead sentence violates VOICE rules 5, 8 and 9 in its first clause. The "Coming soon" item breaks rule 7. The about page has one LinkedIn-phrase sentence. Everything else is already honest (SA-3 §3).
- **IA: three structural gaps, everything else right.** Home is a mild pitch (make it a two-band hub), projects have no detail pages (add `/projects/{slug}`), and two "coming soon" items must go (SA-4 §7).

---

## 3. Steal / Reject / Do-Differently

Every row is a concrete move. "Lands in" = the repo file it changes.

### Steal

| Move | Source (site + pattern) | Lands in |
|---|---|---|
| Open the home page with one plain verb sentence, then stop | mxb "I make websites." (5/5); levels' two-sentence bio (5/5) | `src/pages/index.astro` (lead) |
| Work sentence, then life sentence, never fused | leerob bio: SpaceX sentence and wife/daughters sentence never share a line | `src/pages/index.astro`, `src/pages/about.astro` |
| Project rows = title + one clause + status, flat, nothing hidden | brianlovin's one-line list; overreacted's subtitle discipline ("My new hobby project.") | `src/pages/projects.astro` |
| Numbers only with receipts | Josh "~600,000 downloads per month according to NPM"; Gergely's "More than 1 million readers" + details link | `src/pages/resume.astro` (the only page with numbers) |
| One honest difficulty line per project | Josh "learned to code by voice" — the most honest line in the field | `src/pages/projects.astro`, future case studies |
| Verb-category lists instead of bio paragraphs | antfu "Creator of / Core team of / Maintaining" | `src/pages/about.astro` (block 2) |
| Self-host both fonts, preload the serif, metric-matched fallbacks | all 9 targets self-host; brianlovin's `ascent-override`/`size-adjust` is best-in-set | `src/layouts/Layout.astro` (`<head>`) |
| Skip link ("Skip to content" → `#main`) | mxb — the only target that has one (SA-5 §1) | `src/layouts/Layout.astro` |
| Reduced-motion kill-switch | mxb: `* { animation-duration: 0s }` behind the media query | `src/layouts/Layout.astro` (global CSS) |
| `theme-color` meta, light and dark variants | paco.me (`media="(prefers-color-scheme: …)"`) | `src/layouts/Layout.astro` (`<head>`) |
| Now section — what I'm doing right now, plain | paco: "Developing skill through doing… All I want to do is build websites." | `src/pages/about.astro` (later) |
| Short sign-off line in the footer | paco: "Pray at the altar of hard work." | `src/layouts/Layout.astro` (later) |
| Ask-me-anything affordance | levels' pinned AMA post; brianlovin's AMA section | `src/pages/about.astro` (later) |

### Reject

| Move | Source (site + pattern) | Why it's out |
|---|---|---|
| Third-person buzzword summary | DevFolio: "Innovative and deadline-driven Graphic Designer with 3+ years…" | The exact sentence VOICE.md exists to ban (SA-1 Tier C) |
| Typed-title rotation | iPortfolio/DevFolio: "I'm Designer, Developer, Freelancer, Photographer" | Says four things, commits to none |
| Skill progress bars / skill grids | iPortfolio: "HTML 100%, CSS 90%" — and our own `/resume` noun grid | Unverifiable precision; the one thing every template does (SA-1, SA-4 §6) |
| Stat counters | iPortfolio: "Happy Clients, Hours Of Support, Hard Workers" | Theater numbers with no source |
| Mega-nav with dropdowns | iPortfolio's 10 items | Visitors don't need it; nav stays 4 items |
| A font with no opinion | Roboto at 10 weights (all three templates) | Typography that says nothing |
| "Coming soon" / placeholder content | Kelly template; our own Writing card | Shipping emptiness; VOICE rule 7 (SA-1 Tier C, SA-3 §3) |
| Decorative maximalism | joshwcomeau: gradients, spring animations, easter eggs | The upper bound — study it, don't copy it (SA-1, SA-4) |
| Multi-theme picker | mxb's 10 Mario Kart themes | A mature site's indulgence, not a v5 feature |
| Wall-of-links density + sponsor block | antfu's 13-deep link cloud | His brand (open-source maintainer), not ours |
| Funnel register | Lenny: "deeply researched … ambitious builders"; pragmaticengineer's testimonials wall and "#1 newsletter" claim | A storefront voice; we sell nothing (SA-3 §2) |
| Machine-shop nav | levels: rss/api/llms/mcp in the top nav | Infrastructure for a decade of output; meta-links belong in a footer |
| JS for theater | rauno's entry animation; antfu's ~258KB bundle | The site is static; keep it that way (SA-5 §1) |
| Blog-as-home | mxb, overreacted, levels | Works only when writing exists; ours has zero posts (SA-4 §3) |

### Do-Differently

| Move | Source (site + pattern) | Why we deviate |
|---|---|---|
| No employer on the home page | leerob and levels name employers in the bio | VOICE rule 8 overrides the peer norm; Amazon lives only on `/resume` (SA-3 §6) |
| Keep the resume page | no Tier A site has one | Our differentiator as an enterprise PM; home points to it with one link (SA-1 synthesis) |
| Long bio is a page, not a toggle | leerob's "Default / Long" toggle | The toggle is UI theater for a famous name; our "long" is the resume, with plain labels |
| Two sentences per project, not one | brianlovin's 14 bare one-liners | One-liners work at 14 projects; we have 3 real ones, so each gets name + state + one plain sentence + link (SA-1) |
| Home is a two-band hub, not a pitch | paco's segmented home, leerob's hub | Two bands (Work / Projects), never interleaved; the €0.9Bn number stays off the fold (SA-4 §4) |
| Writing waits for a real post | mxb/overreacted are blogs first | A section ships only when its content exists (SA-4 §4) |
| Keep the dark toggle + no-flash script | paco has OS-only, rauno none; leerob/antfu/levels have the toggle | Our pattern is the field's majority best — keep it, add `theme-color` (SA-4 §5) |
| Keep "A project counts when a stranger can open it." | our own best line (SA-3 §3) | The whole build-in-public thread in one sentence; promote it to the Projects header |
| Keep Instrument Serif + Inter, tuned | brianlovin / paco pairing shape | Right idea; restrict the serif to h1 + italic accents, fix the loading (SA-2 §4) |

---

## 4. Build backlog — P0 → P2

Ordered within each tier. Every item: the change, the file, the evidence. P0 items are small diffs that fix rule violations or cheap wins. Nothing here touches `main` directly — each item goes through the normal branch → build → review → approve → merge flow (`SKILL.md`, `gates.md`).

### P0 — must-do now

1. **Rewrite the home lead into two plain sentences.** Replace the 32-word lead ("I build enterprise products used by hundreds of internal Amazon users that support actions driving billion $ impact…") with "I build enterprise products at work. I build small tools at home." Keep "Product manager by day, builder by default." as the sub-line. The current first sentence names Amazon (VOICE rule 8, scored 0/5), claims a scale number with no trace (rule 3), and fuses work and home in one clause (rule 9). Evidence: mxb "I make websites." (5/5); leerob's separate work/life sentences; SA-3 §3–4.
   → `src/pages/index.astro` (lead paragraph)
2. **Delete the "Coming soon" writing card and drop Writing from the nav.** Remove the Writing section from the home page and the nav until the first post exists. "Why I'm publishing my work in public — Coming soon" is the one piece of front-page theater on the site (VOICE rule 7). Evidence: overreacted labels what exists ("My new hobby project"); SA-1: the Writing placeholder is "the weakest point on the site"; SA-4 §4: "When Writing has zero posts, drop it from the nav."
   → `src/pages/index.astro` (Writing section), `src/layouts/Layout.astro` (nav)
3. **Delete the "More coming" card on /projects.** Planned-but-private items listed publicly are the same theater one page over. Evidence: VOICE rule 7; SA-4 §6 strip list; levels' equivalent of a planned project is a shipped post.
   → `src/pages/projects.astro`
4. **Strip the resume page: cut the skill grid and the hover-lift shadows.** A document doesn't hover, and a 3×7 noun grid is the one thing every Tier C template does (progress-bar theater in a static form). The experience bullets already carry the proof. Evidence: Tier C iPortfolio skill bars (SA-1 failure catalog #4); SA-4 §6.
   → `src/pages/resume.astro`
5. **Self-host Inter + Instrument Serif; preload the serif; add metric-adjusted fallbacks.** Remove the Google CDN link. All 9 targets self-host; brianlovin's fallback `@font-face` (Georgia → Instrument Serif with `size-adjust`/`ascent-override`) is the best-in-set pattern and the only CLS risk left in the hero. Evidence: SA-2 §4 (tune list), SA-2 §6 (loading strategy), SA-5 must-have #1.
   → `src/layouts/Layout.astro` (`<head>`, fonts)
6. **Add a skip link.** `id="main"` on `<main>`, `<a class="skip-link" href="#main">` first in the body, styled to appear on focus. mxb is the only target that has one — the whole field misses it, and it is the highest-value keyboard fix. Evidence: SA-5 §1 (mxb), SA-5 must-have #2.
   → `src/layouts/Layout.astro`
7. **Guard smooth scroll behind `prefers-reduced-motion`.** The site has no animations, but smooth scroll is a real vestibular issue for some readers. Evidence: mxb's kill-switch one-liner (SA-5 nice-to-have #9).
   → `src/layouts/Layout.astro` (global CSS)

### P1 — build next (structural)

1. **Restructure Home into a two-band hub.** Above the fold: h1, role line, the new three-sentence lead, two text links (Resume — work history & results, Projects →). Nothing else — no hero image, no chips, no stats, no social row. Below: a "Work" band (3 rows + "Full resume →") and a "Projects" band (live rows + "All projects →"). Evidence: SA-4 §4 (the exact above/below-the-fold spec); leerob + paco bio-first hub (SA-4 pattern 1); paco's two-link restraint.
   → `src/pages/index.astro`
2. **Set h2 to Inter 600; keep Instrument Serif for h1 + italic accents only.** The 24px serif h2 is the weakest spot in the typesetting; explicit h2 sizing is the single highest-value typography change. Evidence: SA-2 §4 tune list item 1, SA-2 §7 scale.
   → `src/layouts/Layout.astro` (typography CSS)
3. **Add `/projects/{slug}` case-study pages.** Structure: title → proof row (status + "Open it: {url}" + "Source: {repo}") → Problem → What I built (one honest difficulty line) → Outcome (numbers or current state; if none, say so). No testimonials, no tech tag cloud, no tabs. Evidence: SA-4 §4 case-study spec; overreacted's title + one-line blurbs; mxb's flat essays as the text model; Josh's difficulty admission (SA-3 §2).
   → new `src/pages/projects/[slug].astro` + a data file for project entries
4. **Restructure About into three blocks: Work / Personal / The meta.** Kill "at the intersection of product thinking and hands-on engineering" (LinkedIn phrasing); keep "I run multi-agent pipelines, build crawlers, dashboards, and tools." Personal block uses verb lists: "Working on / Built / Learning" (antfu's pattern). The meta block keeps the build-in-public rule. Evidence: SA-3 §6 revised bio structure; mxb's "Work / Writing / Speaking / Offline" about-page shape; antfu's verb categories (SA-1).
   → `src/pages/about.astro`
5. **Add one honest difficulty line per project blurb** (projects index + Work band). "The matching step was harder than it looked." — the one thing every 5/5 site does that we don't. Evidence: Josh "learned to code by voice"; VOICE rule 6; SA-3 §7 (the remaining point after the lead fix).
   → `src/pages/projects.astro`, `src/pages/index.astro`
6. **Make the footer split explicit: Email + LinkedIn (professional) | GitHub (personal).** The demarcation should survive below the fold too. Evidence: SA-4 §4 footer; brianlovin's structural separation (SA-4 pattern 3).
   → `src/layouts/Layout.astro` (footer)
7. **Add `<meta name="theme-color">` with light/dark media variants.** Browser chrome should match the page in both modes. Evidence: paco.me (SA-5 §2 item 13).
   → `src/layouts/Layout.astro` (`<head>`)
8. **Retire the `--accent-soft` chip tint; tint chips with the hairline or drop them.** One accent family, two shades max; the soft tint is a fourth color stop and is nearly invisible on the dark background. Evidence: SA-2 §6.
   → `src/layouts/Layout.astro` (CSS variables)

### P2 — later (each ships only when the thing it supports exists)

1. **Write the first real post; only then bring Writing back into the nav and home.** The Writing page is a slot, not a promise. Evidence: SA-1 (placeholder post is the weakest point); SA-4 §4; overreacted/mxb as the writing-first models.
   → `src/pages/writing.astro`, `src/layouts/Layout.astro` (nav)
2. **If the serif gets a second job (long-form reading), swap Instrument Serif → Newsreader or Source Serif 4** (variable, optical sizing), keep Inter. Don't do this while the serif is a one-liner accent. Evidence: SA-2 §5 alternatives A/B; paco (Newsreader), brianlovin (Source Serif 4).
   → `src/layouts/Layout.astro` + `package.json` (`@fontsource-variable/*`)
3. **Subset fonts to used glyphs (unicode-range latin subsets).** Only when load is a measured problem. Evidence: paco ships per-glyph subsets (SA-5 §2 item 4).
   → font files / font loading in `Layout.astro`
4. **Now section on About** — what Chirag is currently building, learning, or listening to, one plain paragraph. Evidence: paco's Now (SA-1 steal list); brianlovin "currently making AI products at Notion" (impermanence as honesty).
   → `src/pages/about.astro`
5. **Footer sign-off line in Chirag's voice** (paco: "Pray at the altar of hard work." → e.g. "Built in public, one project at a time."). Evidence: SA-1 paco steal list.
   → `src/layouts/Layout.astro` (footer)
6. **Ask-me-anything affordance** — a plainly labeled link, or a page if volume ever justifies it. Evidence: levels' pinned AMA; brianlovin's AMA section (SA-1).
   → `src/pages/about.astro` or footer
7. **`aria-current="page"` on the active nav link.** One attribute for screen-reader users. Evidence: SA-5 nice-to-have #12.
   → `src/layouts/Layout.astro` (nav)
8. **Optional: `llms.txt` and machine meta-links moved to a footer line** when the site's content volume grows. Evidence: levels' nav pattern — useful, but not top-nav material (SA-4 §1).
   → `src/layouts/Layout.astro` (footer)

---

## 5. North-star

Like Chirag talking: one plain sentence about work, one about home, projects a stranger can open, a resume for the formal record. Calm, monochrome, fast, honest. Nothing fake.

---

## 6. Handoff

This report feeds gate G1 (DESIGN). After Chirag reviews, P0/P1/P2 items become discrete work items in the normal branch → build → review → approve → merge flow. Definition-of-Done status for this exercise: `01`–`05` + this file written; every recommendation cites a source; Instrument Serif + Inter verdict delivered (TUNE, with alternatives in `02`); 8 rewritten headlines in `03`; scorecard, Steal/Reject/Do-Differently table, and P0→P2 backlog in this file; zero buzzwords in this report's own prose.
