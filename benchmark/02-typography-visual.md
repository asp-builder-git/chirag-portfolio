# SA-2 — Typography & Visual System

*Benchmark dimensions D2 (Typography & Fonts) and D5 (Visual Design).*
*Study only. No site code touched. Evidence = actual CSS extracted from each target on 2026-08-28 (HTML + linked stylesheets + @font-face rules). SA-1's teardown (`01-teardowns.md`) had not landed when this was written, so font findings here are self-collected, not copied.*

---

## 1. What I found per site (fonts, scale, color, spacing)

### leerob.io — serif-first reading, system UI, monochrome
- **Fonts:** Body and headings use `--font-reading: "Iowan Old Style Local", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif`. No webfont for body. UI/meta text uses a system stack (`--font-ui`). Mono: Geist Mono / SF Mono for code. Accent handwriting: Caveat (self-hosted woff2, `font-display:swap`).
- **Scale:** body 17px, line-height 1.6. Headings: h2 1.45rem weight 600, letter-spacing -0.02em. Hero title `clamp(2.2rem, 3.5vw, 2.65rem)`. Meta text 13–14px.
- **Color:** white background, near-black text (`--accent:#262626` light-mode ink). Essentially monochrome; color appears only in code blocks.
- **Spacing:** `--spacing: .25rem` (4pt base). Section margins 3.1rem / 2.8rem / 2.2rem. Loose, editorial.

### antfu.me — Inter + DM Mono, monochrome, dense
- **Fonts:** Inter (self-hosted woff2 subsets via fontsource-style files, `font-display:swap`) + DM Mono for code. Bad Script used once for a handwritten accent.
- **Scale:** prose 1rem, line-height 1.75; UI text steps down to 0.875rem/0.9em. Dense two-column utility layout, not a reading layout.
- **Color:** `--c-bg:#fff`, body text `#555`, headings `#222`/`#000`. **No accent color at all.** Pure grays + monochrome.
- **Spacing:** 8px/4px grid (unocss default scale).

### mxb.dev — system stack body, Noe Display accents, 41rem column
- **Fonts:** Body = full system stack (`-apple-system, … Segoe UI, Roboto …`). Display = `Noe Display, Georgia, Times, serif` for h1–h3. Mono = Fira Code. No webfonts for the main theme. (He also ships retro "themes" with Lobster/Verdana — playful, opt-in.)
- **Scale:** base 1rem (`font-size:100%`), line-height 1.625. h1 2.5rem, h2 2.25rem, h3 2rem — big serif display headings on a small column.
- **Layout:** `--content-max-width: 41rem`, narrow container. Same column width family as Chirag's 42rem.
- **Color:** cream/warm offset backgrounds (`#F8F8EC`, `#f2ede9`…) with dark text; accent on hover only.

### paco.me — Newsreader + Inter, craft-calm
- **Fonts:** `--font-sans:"Sohne","Inter",fallback` with Inter actually loaded (self-hosted subset woff2, **`font-display:block`** on the main variable file — the one FOIT case in the set). Serif display = `Newsreader, Signifier, Times`. Mono for code.
- **Scale:** `--text:16px`, `--text-s:14px`, `--text-l:20px`, `--text-xl:24px`. Small, tight steps. Headings go large (3rem, 64px) but only where earned.
- **Color:** white bg, `#000`/`#1a1a1a` ink, gray12 `#ededed` (dark mode), one subtle accent. Monochrome + restraint.

### rauno.me — craft piece, not a calm reference
- Custom variable font (self-hosted `dd.woff2`), Georgia italic accents, JetBrains Mono. Index headline runs at **85px**, one decorative element at 720px. Radix-style color tokens (many colors, used one at a time).
- Verdict for our purposes: art piece. Steal nothing for "calm minimal". Note only: 8px grid gap, self-hosted fonts, `font-display:swap`.

### brianlovin.com — Inter + Source Serif 4, the product-builder pairing
- **Fonts:** Inter (variable, self-hosted via next/font) + Source Serif 4 (variable, self-hosted, weights 400/700, `font-display:swap`). **Metric-adjusted fallbacks**: `@font-face` "Source Serif 4 Fallback" → `local(Times New Roman)` with `ascent-override/descent-override/size-adjust`; same for Inter Fallback → Arial. This is the best loading pattern in the set.
- **Scale:** `--text-base:1rem` up to `--text-7xl:4.5rem`. Serif for headings/reading, sans for UI. ~15px for small UI text.
- **Color:** warm white `neutral-50`, ink `neutral-950`, **one brand accent `#fc532a`** (orange-red). Nothing else.

### joshwcomeau.com — maximal craft, upper bound
- **Fonts:** Wotfard (licensed, paid) + Cartograph CF (licensed, paid) + Sriracha accent. Self-hosted woff2, `font-display:fallback` on Cartograph.
- **Scale:** base `calc(17/16 * 1rem)` = 17px; body line-height `calc(.95 + .62rem)` ≈ 1.53. Fluid, custom.
- **Color:** white/near-black, **two accents** (blue `#4242fa` + pink `#e60067`), gradients, springy animation.
- Verdict: the "how much craft is possible" bound. Reject for this site: paid fonts + two accents + animation = wrong trade for "honest builder".

### overreacted.io — Merriweather + Montserrat, extreme minimal
- **Fonts:** Merriweather body, Montserrat headings, both self-hosted via next/font, `font-display:swap`, with metric-adjusted fallbacks. System mono for code.
- **Scale:** `body` class: `max-w-2xl` (**42rem — same as Chirag's container**), px-5, py-12. Long-form article layout, ~18px reading size, generous line-height.
- **Color:** white bg, `#222` text, **one accent `#d23669`** (pink) for links only. Dark mode = `#282c35` bg with `#ffa7c4` links.

### levels.io — system stack, zero fonts, zero polish
- **Fonts:** one inline stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`. No webfonts, no preload, nothing.
- **Scale:** body ~0.85em/0.85rem (small), 12–15px UI. Dense.
- Verdict: the honesty bound (his voice is the benchmark, see SA-3), and the typography floor. Mine the voice, reject the typesetting.

---

## 2. The pattern across the calm builders

Four things the credible-minimal sites share, and how Chirag's site scores:

1. **Two families max, and one of them is usually a text-grade serif or nothing.** leerob (serif + system UI), overreacted (serif + sans), brianlovin (sans + serif), paco (sans + serif), mxb (system + serif display), antfu (sans + mono), levels (system only). Nobody in the calm set uses three.
2. **One accent color, used only for links/hover/selection — or no accent at all.** overreacted: 1 pink. brianlovin: 1 orange. antfu: zero. leerob: monochrome. josh (2 accents + gradients) is the outlier and he's the "maximal" bound, not the model.
3. **Single column around 41–42rem.** mxb 41rem, overreacted 42rem, Chirag 42rem. Already matches.
4. **Self-hosted woff2 with `font-display:swap` + metric-adjusted fallbacks** is the norm for the ones that load webfonts at all (brianlovin, paco, overreacted, antfu, leerob's Caveat). levels and mxb skip webfonts entirely.

---

## 3. Ranking: pairings for "calm + minimal + credible for a builder"

| Rank | Site | Pairing | Why it ranks here |
|---|---|---|---|
| 1 | brianlovin.com | Inter + Source Serif 4 | Product-builder credibility (sans UI) + warm reading (serif headings). One accent. Metric-matched fallbacks. |
| 2 | leerob.io | Iowan/Palatino serif + system UI | Editorial calm. Serif for reading, system stack for UI = near-zero font cost. Monochrome. |
| 3 | overreacted.io | Merriweather + Montserrat | The quietest proven pairing for long-form. One accent. 42rem column. |
| 4 | paco.me | Newsreader + Inter | Same shape as #1 with a softer serif. Slightly more "designy". |
| 5 | mxb.dev | system stack + Noe Display accents | Honest and fast. Personality comes from one display serif used sparingly. |
| 6 | antfu.me | Inter + DM Mono | Utility credibility, zero accent. Dense — right for a tool site, too dense for a portfolio reading experience. |
| — | joshwcomeau.com | Wotfard + Cartograph (paid) | Craft upper bound. Reject: licensed fonts, two accents, animation. |
| — | rauno.me | custom font, 85px headline | Art piece. Reject as a model. |
| — | levels.io | system stack, 0.85em text | Honesty bound, typography floor. |

**Pattern worth naming:** the calm builders use a *text-grade serif* for display/reading — Iowan, Merriweather, Source Serif 4, Newsreader — not a *display-only* serif. That's the single most relevant fact for the verdict below.

---

## 4. Verdict on Instrument Serif + Inter → **TUNE, with a replacement path ready**

**Keep Inter. It is the peer-standard body face.** antfu, paco, brianlovin all run Inter (or Inter-in-stack); leerob runs a system stack that Inter reads as its sibling. Current weights (400/500/600, no 700) are restrained and right. Nothing to change there except how it loads (Section 6).

**Instrument Serif: the idea is right, the face is half-right.**
- Right: serif display + sans body is exactly what the calm tier does (overreacted, leerob, brianlovin, paco). Chirag's instinct matched the peer norm.
- Half-right: Instrument Serif is a **display-only** face — one weight, high stroke contrast, no optical sizing. It is built for 2.5rem+ fashion-magazine headlines. At h2 (24px) it thins out and starts to fight Inter's neutrality; it can't bold; its "editorial chic" flavor is trendier than "builder-credible". Every serif the calm tier actually uses (Iowan, Merriweather, Source Serif 4, Newsreader) is a *text-grade* face that stays legible from 14px to 64px.
- Current usage is already nearly correct by accident: h1 + the italic `em` accents in the lead paragraph. That's where a display serif belongs. The problem is h2, and the fact that the font can't grow into a second job if the site ever needs one.

**Tune list (in priority order):**
1. Restrict Instrument Serif to h1 + the italic lead accents. Set h2/h3 to Inter (h2: 600 weight, -0.01em tracking). This removes the 24px-serif legibility problem without changing the look anyone notices.
2. Self-host both families (Section 6). The current Google CDN link loads a render-blocking CSS request plus a gstatic round trip, and `display=swap` with no metric fallback means the serif headline visibly jumps when it lands (Georgia is much wider than Instrument Serif).
3. Add a metric-adjusted serif fallback (Georgia with `size-adjust`/`ascent-override`) so the swap doesn't shift layout. If tuning by hand is annoying, run the `fontaine` Astro integration to compute the overrides.
4. Drop the Instrument Serif italic from the global request if the `em`-lead ever goes away — it's a second file for one sentence. (Keep it while the lead keeps it; the italic accent is a genuinely nice, leerob-like detail.)
5. Optional, later: if the site adds a Writing page with real long-form, Instrument Serif is the wrong reading face. Switch reading/headings to one of the alternatives below at that point.

**When to replace instead of tune:** if Chirag wants the serif to do more than one job (headings at all sizes, maybe pull quotes, maybe reading), replace now. If the serif stays a one-liner accent, tuning is enough.

---

## 5. Two–three concrete alternatives (Google Fonts, self-hosted)

All three keep Inter as body. All are variable fonts with optical sizing where noted, so they do display *and* text work.

### A. Newsreader (variable, opsz axis) + Inter — closest to current look, better legs
- Google Fonts: `Newsreader:opsz,wght@6..72,300..800` + italics. Self-host via `@fontsource-variable/newsreader`.
- Evidence: paco.me uses Newsreader as display serif over Inter. It reads calm and literary without the fashion-magazine gloss of Instrument Serif. Optical sizing keeps it solid from 16px to 64px.
- Feel: "the same site, but the headings stopped being precious."

### B. Source Serif 4 (variable) + Inter — the product-builder pairing
- Google Fonts: `Source Serif 4:opsz,wght@8..60,300..700` + italics. Self-host via `@fontsource-variable/source-serif-4`.
- Evidence: brianlovin.com — the top-ranked pairing in Section 3. Warm, credible, works at body sizes (it's designed for reading), pairs quietly with Inter.
- Feel: "serious builder who reads." Slightly less character than A; slightly more credibility.

### C. Fraunces (variable, opsz + SOFT/WONK) — same fashion energy, more range
- Google Fonts: `Fraunces:opsz,wght@9..144,300..700` + italics. Self-host via `@fontsource-variable/fraunces`.
- Evidence: none in the target set — this one is my judgment call. If Chirag specifically likes Instrument Serif's high-contrast, old-style flavor, Fraunces keeps that flavor but has 5 weights, optical sizing down to 9pt, and stays readable at h2/h3. The SOFT/WONK axes are optional; ship the defaults.
- Feel: "keeps the serif personality, loses the fragility." Trendier than A and B — pick it only if the serif character is the point.

**Loading strategy (all three, and the current pair):**
- **Self-host woff2** (latin subset only; ~15–45KB per file) through `@fontsource-variable/*` or downloaded files. Astro makes this trivial and it kills the render-blocking Google CSS request.
- **Preload** the two critical files (Inter variable + serif variable) in `<head>` with `crossorigin`.
- **`font-display:swap`** on both, plus a **metric-adjusted fallback** (`size-adjust`/`ascent-override` pointing at Georgia for serif, Arial/Helvetica for Inter) — this is exactly what brianlovin ships and it's the best-in-set pattern.
- **FOIT/FOUT tradeoffs, stated plainly:**
  - `swap` = FOUT: fallback text shows immediately, then swaps in. Best LCP; text is never invisible; the cost is one visible swap. With metric-adjusted fallbacks the swap barely moves anything. **Use this.**
  - `block` = FOIT up to ~3s: invisible text until the font arrives. paco.me gets away with it only because his subset is tiny. A serif display headline on a slow connection = blank hero. **Don't.**
  - `optional` = give up the font if it's late: zero layout shift, but the site can permanently render in the fallback. Acceptable for meta text, wrong for the headline. **Don't.**
- The Google CDN + `display=swap` the site uses today is acceptable-but-not-best: it works, it's just two extra network hops and an un-metered fallback jump. Self-hosting is a small change with visible payoff on LCP and CLS.

---

## 6. Color palette recommendation (max 3 colors + neutrals)

The current palette already conforms to the peer norm — monochrome + one accent, accent used only on hover/selection/focus. **Keep it, make two small corrections.**

**Neutrals (keep as-is):**
- Paper: `#fffdf8` (warm cream — distinct from brianlovin's neutral-50 and mxb's cream, already Chirag's own)
- Ink: `#1a1a1a`
- Muted: `#6b655c` (5.2:1 on paper — passes AA for normal text, fine)
- Hairline: `#e9e5da`

**Color (one family, two shades max):**
- **Accent ink-safe: `#c2410c`** (ember, ~4.7:1 on paper) — the shade to use any time accent color appears as *text* (a link, a status).
- **Accent hover/selection: `#e8590c`** (current) — fine for hover underline, selection, focus outline, where contrast rules don't bite the same way.
- Dark mode: ink `#16140f`, accent `#ff9d5c` (current) — keep.

**What to remove/normalize:**
- `--accent-soft` (the chip background) uses a 10% tint of the orange — that's a fourth color stop. Either drop the chips or tint them with the hairline instead. One accent family, two shades, done.
- No second accent. The targets that feel calm all run one (overreacted pink, brianlovin orange) or zero (antfu). Two accents is the first step toward joshwcomeau, which this site explicitly is not.

---

## 7. Type scale + rhythm for a 42rem column

**Base:** 1rem (16px) for UI/portfolio pages; bump to 17px on the Writing page (leerob runs 17px, josh 17px, overreacted ~18px — long-form reads better slightly larger).

**Scale (major-second-ish, 4–5 steps, no more):**
- h1 (serif, 400): `clamp(2.25rem, 1.7rem + 2.4vw, 3rem)`, line-height 1.05–1.1, -0.01em — **current values are already right, keep them.**
- h2 (Inter, 600): 1.5rem, line-height 1.2 — after the tune in Section 4. Or keep h2 serif only if switching to a text-grade serif (A/B/C above).
- h3 (Inter, 600): 1.125rem, line-height 1.4 — current, keep.
- Lead paragraph: 1.125rem, line-height 1.7 — current, keep.
- Body: 1rem, line-height 1.6–1.65 — current 1.65 is fine for Inter at 16px; don't go lower than 1.6.
- Meta/eyebrow/footer: 0.8125rem (13px), 0.08em uppercase — matches leerob's 13–14px meta band. Current, keep.

**What to fix in the scale:** h2 currently inherits the serif at default 1.5em (24px) — the weakest spot in the site, per Section 4. Explicit h2 sizing is the single highest-value typography change.

**Spacing rhythm:** 4pt base unit, spend it in 8pt multiples.
- Base unit `--spacing: 0.25rem` (4px), like leerob. Use 0.5rem steps in practice: 0.5 / 1 / 1.5 / 2 / 3rem.
- Section gap: `clamp(3rem, 6vw, 4.5rem)` — currently a flat 3.5rem; the targets run 3.1rem–5rem depending on screen, fluid is the pattern to copy.
- Row padding: 1.25rem (current, fine — it's a 20px/8pt-multiple-compatible value).
- Container padding: `clamp(1.5rem, 5vw, 3rem)` — current, already the right pattern (fluid clamp), keep.
- Hairline: 1px. Card radius 10px → consider 8px, not for design purity but so corners sit on the same grid language as everything else (minor).
- Footer margin 5rem — matches the airy end-of-page feel of the targets, keep.

**Dark mode:** keep the toggle and the no-flash script (already good). Warm ink `#16140f` is calmer than pure black and matches the cream identity inverted. The one check: `--accent-soft` tint is nearly invisible on the dark bg — another reason to retire it (Section 6).

---

## 8. Sources (what I inspected, verbatim evidence)

- leerob.io HTML + `_next/static/chunks/38df25e…css`, `b11252cb…css` — `--font-reading: "Iowan Old Style Local", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif`; `body{font-size:17px;line-height:1.6}`; `h2{font-size:1.45rem;font-weight:600;letter-spacing:-.02em}`; `--spacing:.25rem`; `font-size:clamp(2.2rem,3.5vw,2.65rem)`; Caveat self-hosted, `font-display:swap`.
- antfu.me HTML + `assets/app-BcNORnHM.css` — Inter + DM Mono self-hosted; `.prose{font-size:1rem;line-height:1.75}`; `--c-bg:#fff`; `--fg:#555`, `--fg-deep:#222`, `--fg-deeper:#000`; no accent color.
- mxb.dev HTML + `assets/styles/main.cnN1gdHB.css`, `themes.css` — `--font-family-base: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto…`; `--font-family-display: Noe Display, Georgia, Times, serif`; `--content-max-width: 41rem`; h1 2.5rem / h2 2.25rem / h3 2rem; base `font-size:100%`, `line-height:1.625`; Fira Code mono.
- paco.me HTML + `_next/static/chunks/043ac70f…css`, `1902af4a…css`, `6f8cd1f2…css` — `--font-sans:"Sohne","Inter",system-ui` with Inter self-hosted (`/fonts/inter-subset.woff2`, `font-display:block`); `--font-serif:"Newsreader","Signifier","Times"`; `--text:16px / --text-s:14px / --text-l:20px / --text-xl:24px`; white/`#1a1a1a`/gray12.
- rauno.me HTML + `_next/static/css/647af292…css`, `a8072ef9…css` — custom `X` font (`dd.woff2`), JetBrains Mono self-hosted, `em{font-family:Georgia,serif}`, index headline `font-size:85px`, `.grid{--gap:8px}`.
- brianlovin.com HTML + `_next/static/immutable/chunks/2epi01k483-x8.css` — `--font-sans:"Inter","Inter Fallback"`, `--font-serif:"Source Serif 4","Source Serif 4 Fallback"`; fallbacks with `ascent-override/descent-override/size-adjust` (Inter→Arial, Source Serif 4→Times New Roman); `--text-base:1rem … --text-7xl:4.5rem`; `background-color-brand:#fc532a`; `neutral-50`/`neutral-950`; `font-display:swap`.
- joshwcomeau.com HTML + `_next/static/css/5f479326…css`, `7536305590…css`, `8e8c255c…css` — `--font-family:"Wotfard","Wotfard-fallback",sans-serif`; `--font-family-mono:"Cartograph CF",monospace` (licensed); `--color-primary:#4242fa`, `--color-secondary:#e60067`; body `font-size:calc(17/16*1rem)`, `line-height:calc(.95 + .62rem)`; Cartograph `font-display:fallback`.
- overreacted.io HTML + `_next/static/css/405e5b76…css`, `7198505728…css`, `bb2d4900…css` — Merriweather + Montserrat self-hosted, `font-display:swap`; `body class="mx-auto max-w-2xl … px-5 py-12"` (42rem); `--text:#222`, `--link:#d23669`, dark `--bg:rgb(40,44,53)` with `--link:#ffa7c4`.
- levels.io HTML — inline `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`; body ~0.85em; no webfonts.
- Chirag's current site: `src/layouts/Layout.astro`, `src/pages/index.astro` — Google CDN `Instrument Serif:ital@0;1 + Inter:wght@400;500;600`, `display=swap`; 42rem container; h1 `clamp(2.25rem, 1.7rem + 2.4vw, 3.25rem)` / 1.05; body 1rem / 1.65; `#fffdf8` / `#1a1a1a` / `#6b655c` / `#e9e5da` / `#e8590c`.

*End of SA-2. Feeds Section 4 (D2 + D5) of `benchmark/README.md` synthesis.*
