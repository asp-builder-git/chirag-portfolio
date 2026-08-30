# chirag-portfolio — Recommendations (condensed)

What to do with this: read the scorecard, skim the table, then work the backlog from the top. Full reasoning and evidence trail live in `README.md` and `01`–`05`.

---

## Scorecard — current site vs best-of-peer

| Dim | Current | Best-of-peer | Gap in one line |
|---|---|---|---|
| D1 UX & Interaction | 2.5/5 | 5/5 — leerob, brianlovin, paco | Home is a mild pitch, not a hub; nothing has a detail page |
| D2 Typography | 3.5/5 | 5/5 — brianlovin | Right pairing, wrong loading (Google CDN), weak 24px serif h2 |
| D3 Language & Voice | 3/5 | 5/5 — mxb, levels | Lead sentence + one "Coming soon" label break the site's own rules |
| D4 Structure / IA | 3.5/5 | 5/5 — paco, brianlovin | Three gaps: hub home, case-study pages, two theater cards |
| D5 Visual Design | 4/5 | 5/5 — leerob | Already conforms; one fourth color stop to retire |
| D6 Performance & A11y | 3.5/5 | 5/5 — mxb | Already beats 8/9 targets on JS; gaps are fonts, skip link, motion |

**Overall 3.3/5.** Voice is the highest-weight dimension and the biggest lever: two sentence rewrites + one deleted label → 4/5.

**Instrument Serif + Inter: TUNE, keep.** Restrict the serif to h1 + italic accents, h2 → Inter 600, self-host both, add metric-adjusted fallbacks. Replacement path (Newsreader / Source Serif 4) only if the serif ever gets a second job.

---

## Steal / Reject / Do-Differently

### Steal

| Move | Source | Lands in |
|---|---|---|
| Open with one plain verb sentence, then stop | mxb "I make websites."; levels' two-sentence bio | `src/pages/index.astro` (lead) |
| Work sentence, life sentence, never fused | leerob's bio | `index.astro`, `about.astro` |
| Project rows = title + one clause + status, flat | brianlovin; overreacted's subtitles | `src/pages/projects.astro` |
| Numbers only with receipts | Josh "~600,000/month according to NPM" | `src/pages/resume.astro` |
| One honest difficulty line per project | Josh "learned to code by voice" | `projects.astro`, case studies |
| Verb-category lists instead of bio prose | antfu "Creator of / Core team of" | `src/pages/about.astro` |
| Self-host fonts, preload serif, matched fallbacks | all 9 targets; brianlovin best-in-set | `src/layouts/Layout.astro` |
| Skip link | mxb — the only one in the field | `src/layouts/Layout.astro` |
| Reduced-motion kill-switch | mxb | `src/layouts/Layout.astro` |
| `theme-color` meta (light/dark) | paco | `src/layouts/Layout.astro` |
| Now section | paco | `about.astro` (later) |
| Footer sign-off line | paco | `Layout.astro` (later) |
| Ask-me-anything affordance | levels, brianlovin | `about.astro` (later) |

### Reject

| Move | Source | Why |
|---|---|---|
| Third-person buzzword summary | DevFolio | The sentence VOICE.md exists to ban |
| Typed-title rotation ("I'm Designer, Developer…") | iPortfolio/DevFolio | Four commitments, zero follow-through |
| Skill progress bars / skill grid | iPortfolio — and our own `/resume` grid | Unverifiable precision; every template does it |
| Stat counters ("Happy Clients") | iPortfolio | Theater numbers |
| Mega-nav with dropdowns | iPortfolio | Nav stays 4 items |
| Roboto at 10 weights | all three templates | A font with no opinion |
| "Coming soon" / placeholders | Kelly — and our Writing card | Shipping emptiness; VOICE rule 7 |
| Gradients, spring animations, easter eggs | joshwcomeau | The upper bound — study, don't copy |
| 10-theme picker | mxb | A mature site's indulgence |
| Wall-of-links density | antfu | His brand, not ours |
| Funnel register ("deeply researched…") | Lenny, pragmaticengineer | A storefront voice; we sell nothing |
| Meta-links in top nav (rss/api/llms/mcp) | levels | Footer material |
| JS for theater | rauno's entry animation, antfu's 258KB bundle | The site is static; keep it that way |

### Do-Differently

| Move | Source | Why |
|---|---|---|
| No employer on home | leerob/levels name theirs | VOICE rule 8; Amazon lives on `/resume` only |
| Keep the resume page | no Tier A site has one | Our differentiator; home links to it once |
| Long bio is a page, not a toggle | leerob's "Default/Long" | Our "long" is the resume, with plain labels |
| Two sentences per project, not one | brianlovin's one-liners | One-liners work at 14 projects; we have 3 |
| Home is a two-band hub, not a pitch | paco + leerob | The €0.9Bn number stays off the fold |
| Writing waits for a real post | mxb/overreacted are blogs first | A section ships when its content exists |
| Keep dark toggle + no-flash script | paco OS-only, rauno none | Ours is the field's majority best — keep |
| Keep "A project counts when a stranger can open it." | our own best line | Promote it to the Projects header |
| Keep Instrument Serif + Inter, tuned | brianlovin/paco shape | Right idea; fix h2 and the loading |

---

## Backlog — P0 → P2

### P0 — must-do now (small diffs, fix rule violations + cheap wins)

1. **Rewrite the home lead**: replace the 32-word sentence (Amazon on home, untraced "billion $", work+home fused) with "I build enterprise products at work. I build small tools at home." Keep "Product manager by day, builder by default." as sub-line. — `src/pages/index.astro` · evidence: mxb (5/5), leerob's separate sentences, VOICE rules 5/8/9, SA-3 §3
2. **Delete the "Coming soon" writing card; drop Writing from nav** until the first post exists. — `index.astro`, `Layout.astro` (nav) · evidence: VOICE rule 7, overreacted's blunt statuses, SA-1 ("weakest point on the site")
3. **Delete the "More coming" card on /projects.** — `src/pages/projects.astro` · evidence: VOICE rule 7, SA-4 §6, levels ships posts instead of promises
4. **Strip the resume: cut skill grid + hover-lift shadows.** A document doesn't hover; the bullets already prove the skills. — `src/pages/resume.astro` · evidence: Tier C progress-bar theater, SA-4 §6
5. **Self-host Inter + Instrument Serif; preload serif; metric-adjusted fallbacks.** Drop the Google CDN link. — `Layout.astro` (`<head>`) · evidence: all 9 targets self-host, brianlovin's fallbacks, SA-5 must-have #1
6. **Add skip link** (`#main` + focus-styled link before nav). — `Layout.astro` · evidence: mxb only one in field, SA-5 must-have #2
7. **Guard smooth scroll behind `prefers-reduced-motion`.** — `Layout.astro` (CSS) · evidence: mxb kill-switch, SA-5 nice-to-have #9

### P1 — build next (structural)

1. **Restructure Home into two-band hub.** Above fold: h1, role line, 3-sentence lead, two text links (Resume, Projects). Below: "Work" band (3 rows + full resume link), "Projects" band (live rows + all projects link). — `src/pages/index.astro` · evidence: SA-4 §4 spec, leerob+paco hub pattern
2. **h2 → Inter 600; serif stays on h1 + italic accents.** The single highest-value typography change. — `Layout.astro` · evidence: SA-2 §4/§7
3. **Add `/projects/{slug}` case studies**: proof row (status + open-it + source) → Problem → What I built (one honest difficulty line) → Outcome (or "none yet" in one sentence). No testimonials, no tag clouds, no tabs. — new `src/pages/projects/[slug].astro` + data file · evidence: SA-4 §4 spec, overreacted subtitles, Josh's difficulty line
4. **Restructure About into Work / Personal / The meta blocks.** Kill "at the intersection of…"; keep "I run multi-agent pipelines, build crawlers, dashboards, and tools." Personal block as verb lists ("Working on / Built / Learning"). — `src/pages/about.astro` · evidence: SA-3 §6, mxb's about-page shape, antfu verb categories
5. **One honest difficulty line per project blurb.** — `projects.astro`, `index.astro` · evidence: Josh, VOICE rule 6, SA-3 §7
6. **Footer split made explicit: Email + LinkedIn | GitHub.** — `Layout.astro` · evidence: SA-4 §4, brianlovin separation
7. **`theme-color` meta with light/dark media variants.** — `Layout.astro` · evidence: paco, SA-5 §2 item 13
8. **Retire `--accent-soft` chip tint** (fourth color stop; invisible on dark). — `Layout.astro` · evidence: SA-2 §6

### P2 — later (ships only when the thing it supports exists)

1. Write the first real post; only then bring Writing back into nav + home. — `writing.astro`, `Layout.astro` · evidence: SA-1, SA-4 §4
2. Swap Instrument Serif → Newsreader or Source Serif 4 if the serif gets a long-form job; keep Inter. — `Layout.astro` + `package.json` · evidence: SA-2 §5
3. Subset fonts to used glyphs when load is a measured problem. — font loading · evidence: paco, SA-5 §2 item 4
4. Now section on About (building / learning / listening, one plain paragraph). — `about.astro` · evidence: paco, brianlovin's "currently"
5. Footer sign-off line in Chirag's voice. — `Layout.astro` · evidence: paco's "Pray at the altar of hard work."
6. Ask-me-anything affordance. — `about.astro` or footer · evidence: levels, brianlovin
7. `aria-current="page"` on active nav link. — `Layout.astro` · evidence: SA-5 nice-to-have #12
8. `llms.txt` + meta-links to footer when content grows. — `Layout.astro` · evidence: levels nav pattern

---

**North-star:** Like Chirag talking: one plain sentence about work, one about home, projects a stranger can open, a resume for the formal record. Calm, monochrome, fast, honest. Nothing fake.
