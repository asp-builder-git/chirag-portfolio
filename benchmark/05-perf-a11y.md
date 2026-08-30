# 05 — Performance & Accessibility (D6)

SA-5 output. Method: fetched live HTML + CSS of all 9 Tier A targets on 2026-08-28, inspected font loading, script weight, image handling, landmarks, and a11y attributes in the served markup. Numbers below are from the served HTML at fetch time, not lab measurements.

---

## 1. What each target does (D6 field notes)

| Site | Fonts | JS weight (homepage) | Dark mode | Landmarks / a11y | Image handling |
|---|---|---|---|---|---|
| leerob.com | Self-hosted via next/font: Geist Sans + Geist Mono (CSS var fallbacks to system stack). Caveat (handwriting, signature) + local Iowan Old Style for quotes. No Google Fonts request. | 12 Next.js chunk scripts + ~43 KB inline. Framework runtime; content itself static. | `prefers-color-scheme` + Tailwind `dark:` classes | 1 h1, 1 main, 7 aria-labels. No skip link. Avatar img has alt, no width/height. | 1 image (avatar). No preloads beyond fonts. |
| antfu.me | Inter + DM Mono + a few decorative families, bundled in one CSS file. No Google Fonts request in HTML. `color-scheme: light dark`. | 1 Vite bundle `app-*.js` = ~258 KB, plus 1.2 KB inline. Heaviest JS of the text-first group; his site behaves like an app. | CSS `color-scheme` + `prefers-color-scheme` | 1 h1, 1 main. 0 aria-labels. No skip link. | Zero images on homepage. |
| mxb.dev | Self-hosted woff2: Noe Display (display serif) + Lobster (logo only). Body from his own stack. No Google Fonts. | 1 small `/assets/scripts` bundle + ~1 KB inline. Near-zero JS — he writes about going buildless and lives it. | 10+ themes via `data-theme` (his Mario Kart theme switcher, mostly CSS-only) | **Has skip link** ("skip to main content"), header role=banner, 1 main, 1 h1, 18 aria-labels. CSS kill-switch: `prefers-reduced-motion: reduce { * { animation-duration: 0s } }`. | 9 imgs, all with alt + width/height, 4 lazy. |
| paco.me | **Self-hosted subsetted fonts**: `inter-subset.woff2`, `newsreader-subset-0.woff2`, `sohne-subset-0.woff2` — only the glyphs he uses ship to the client. | 11 deferred Next chunks, 155 B inline. | `prefers-color-scheme` + `theme-color` meta with `media` attr (light and dark). He wrote next-themes. | 1 main, article, h1 → h2 hierarchy, footer. Icons `aria-hidden` with `role="img"` + `aria-label`. 3 aria-labels. | Zero imgs on homepage. Entrance animations via `--stagger` (reduced-motion handling in CSS not visible in HTML). |
| rauno.me | 1 self-hosted display font `/dd.woff2`, preloaded with `crossorigin`. Body = system stack (`-apple-system, "Segoe UI", ...`). | 9 Next chunks, 1.2 KB inline. | No dark-mode markup on homepage (follows system via CSS). | 1 h1, 1 main, 6 aria-labels. No skip link. | Zero images. |
| brianlovin.com | 2 self-hosted woff2 (next/font), preloaded. | 15 Next chunks. | Tailwind `dark:` classes (class strategy) | 1 h1, 1 main, 1 aria-label. No skip link. | 1 avatar img: alt + width/height + lazy. |
| joshwcomeau.com | Custom fonts via CSS-in-JS vars (`--sp-font-body`), no woff2 preloads in homepage HTML. | 16 Next chunks + ~58 KB inline (Emotion runtime). The "maximal craft" upper bound: most JS of the group. | `prefers-color-scheme` + manual toggle (his docs explain the flash-free approach) | 1 h1, **no `<main>` on homepage**, no skip link, 0 aria-labels found. Notable: the site that teaches a11y fails these on its own homepage. | 2 imgs, alt present, no width/height, lazy. |
| overreacted.io | 3 self-hosted woff2 via next/font, all **preloaded** with `crossorigin`. Avatar image also preloaded. | 7 Next chunks (older, lighter runtime) + Plausible analytics. | `dark:` class strategy (58 instances) | 1 main. **No h1 on homepage** — post titles are h2s, site name is a styled div. Known, self-admitted gap. No skip link. | 1 avatar img: alt present, no width/height. Preloaded as LCP element. |
| levels.io | System stack only (`-apple-system, ...`). Zero webfont bytes. | Cloudflare analytics + Twitter embed + Turnstile + ~5 KB inline. | Inline script sets `data-theme` from `prefers-color-scheme` + live listener | 1 h1, **no main landmark**, no skip link, 1 aria-label. | 867 imgs, **all with alt**, 865 lazy, but 866/867 missing width/height → real CLS. The "brutal honesty" lower bound: he trades polish for density and says so. |

### Pattern summary

- **Fonts: the entire field self-hosts or uses system fonts.** Zero of the 9 load Google Fonts at runtime. paco.me subsets his fonts to used glyphs; rauno.me ships one display face and lets the OS handle body text; overreacted.io preloads every font file it needs; levels.io ships zero font bytes.
- **JS: text-first sites ship almost none.** mxb.dev and levels.io prove a readable site needs no framework on the page. The Next.js sites all carry 7–16 framework chunks; that is the cost of their tooling, not a feature, and Astro does not have to pay it.
- **Dark mode: every site decides theme before first paint** (inline head script or CSS `color-scheme` + `prefers-color-scheme`). None of them flash a wrong theme.
- **A11y: the consistent misses are skip links and landmark completeness** — even joshwcomeau.com (no `<main>`) and overreacted.io (no h1 on homepage) drop them. mxb.dev is the only one with a skip link. The consistent hits: exactly one h1 per page, alt text on every image, icons hidden with `aria-hidden`.
- **Reduced motion:** only mxb.dev has a visible global kill-switch in CSS. The motion-heavy sites (paco, josh) handle it in their component CSS; it is rarely visible in HTML.

---

## 2. (a) Checklist — what Astro's static output should adopt

### Font loading
1. **Self-host, drop the Google Fonts request.** `@fontsource` packages or download the woff2 files into `public/fonts/` (or `src/assets` with Astro). Removes a third-party DNS + TLS + origin dependency, works offline, and is one less thing to block on. Source: all 9 targets.
2. **Preload the font that renders the hero heading** (`<link rel="preload" as="font" type="font/woff2" crossorigin>`) so LCP text paints in the real face on the first frame. Source: overreacted.io preloads all 3 of its fonts; rauno.me preloads his one display font.
3. **Keep `font-display: swap`** (or `optional`). Text in a fallback serif beats invisible text. Source: current site already does this correctly; nothing in the field does FOIT.
4. **Subset if it ever matters.** paco.me ships per-glyph subsets. For a two-family setup (Instrument Serif + Inter) at this scale, picking woff2 + `unicode-range` subsets is a P2; the standard latin subset is fine.
5. **Give the fallback stack matching metrics** (`size-adjust`, `ascent-override` in `@font-face` for the fallback serif) so the swap from Georgia to Instrument Serif does not shift layout. Source: no target does this visibly, but it is the only CLS risk left in the current font setup.

### CLS avoidance
6. **Every image gets explicit width + height** (or `aspect-ratio` in CSS). Astro's `<Image>` does this automatically. Source: levels.io's 866/867 images without dimensions are the live demonstration of what this prevents; mxb.dev and brianlovin.com are the compliant side.
7. **No layout shift on theme change**: theme is decided in a head inline script before first paint (already done on the current site — keep it).
8. **Reserve space for anything that mounts later** (ads, embeds, dynamic lists). Not needed today; note for when Writing grows embeds.

### Images
9. **Use Astro `<Image>` (or `astro:assets`)** for every image: it emits width/height, `loading="lazy"` below the fold, `srcset`/AVIF-or-WebP, and a blurred placeholder if wanted. Source: mxb.dev (dims + lazy on all 9 images) is the pattern; nothing in the field beats a static build for this.
10. **`loading="lazy"` below the fold, eager for the hero.** Source: brianlovin.com lazy-loads his avatar; levels.io lazy-loads 865/867.
11. **Every image has meaningful `alt` text; decorative ones get `alt=""`.** Source: levels.io's 867 images all have alt — the most honest site in the group still does this right.

### Dark-mode flash prevention
12. **Keep the current pattern**: inline head script reads `localStorage` first, falls back to `prefers-color-scheme`, sets `data-theme` on `<html>` before paint; CSS `:root:not([data-theme])` media-query fallback for no-JS. This is exactly what the field does (levels.io, paco.me, leerob.com).
13. **Add `<meta name="theme-color">` with `media="(prefers-color-scheme: light|dark)"`** so the browser chrome matches the page in both modes. Source: paco.me.
14. **Set `color-scheme: light dark`** so form controls and scrollbars match — current site already sets it per theme. Keep.

### JS
15. **Ship the current ~zero JS.** Both inline scripts are small and necessary (theme). No hydration, no framework runtime. Astro's static output already beats 8 of 9 targets here; the only thing to add is `is:inline` discipline (already used) and never importing a component that hydrates without a reason.

---

## 3. (b) Accessibility — must-have vs nice-to-have

### Must-have (do these; they are cheap and testable)
1. **Skip link** — first focusable element, "Skip to content", targets `#main`. Only mxb.dev has one in the field, but it is the single highest-value keyboard fix and costs 3 lines. Add `id="main"` to the existing `<main>` and `<a class="skip-link" href="#main">` before the nav, styled to appear on focus.
2. **Exactly one h1 per page, ordered h1 → h2 → h3.** Current site already passes (verified: 1 h1 on every page, h2/h3 used inside). Do not break it when adding sections.
3. **Contrast ≥ 4.5:1 for body text, ≥ 3:1 for UI/focus.** Current palette passes (muted `#6b655c` on `#fffdf8` ≈ 5.7:1; dark-mode muted ≈ 6.3:1; accent focus ring ≈ 3.6:1 — above the 3:1 non-text floor). Keep the accent for focus/selection only, never for body copy.
4. **Visible focus indicator.** Current `:focus-visible` outline (2px accent, offset 2px) already exists — the field mostly skips this; keep it and make sure no `outline: none` without replacement creeps in.
5. **`lang="en"` on `<html>`** — already present.
6. **Alt text on every image; `alt=""` for decorative.** No images exist yet; this is the rule to write down before the first screenshot ships.
7. **Theme toggle is a real `<button type="button">` with `aria-label`** — already correct in the current layout. The two SVGs are `aria-hidden` — correct.
8. **Keyboard nav works with no JS** — the site is plain links and one button; nothing traps focus. Verify after any interactive addition.

### Nice-to-have (do when the relevant feature exists)
9. **`prefers-reduced-motion: reduce` kill-switch** — mxb.dev's one-liner (`* { animation-duration: 0s !important; transition-duration: 0s !important }`) plus guarding `scroll-behavior: smooth` behind the media query. Current site has no animations, but the smooth scroll is a tiny vestibular issue for some users; wrap it.
10. **Landmark completeness** — the current layout already has `nav`, `main`, `footer`; add `role="banner"`/`<header>` only if a page header is introduced. Note that joshwcomeau.com ships no `<main>` and overreacted.io no homepage h1 — do not copy the field's blind spots.
11. **Focusable theme toggle is in tab order and last in the nav** — fine as is; just confirm it stays reachable when the nav wraps on mobile.
12. **`aria-current="page"` on the active nav link** instead of only the `.active` class — one attribute, helps screen-reader users know where they are. (Or keep the underline class and add the attribute.)
13. **Reduced-motion-aware entrance animations** if any are added later (paco.me's `--stagger` pattern with a media-query guard).
14. **Semantic footer links with visible labels** — already text links; nothing needed.
15. **Title + description on every page** — already present; keep unique titles.

---

## 4. Current site score vs the field (D6 only)

Already right:
- Zero framework JS, two small inline scripts. Beats every Next.js target; matches mxb.dev.
- Theme set before first paint with a no-JS CSS fallback — matches the best of the field.
- Correct preconnects for the font origin it does use.
- `display=swap`, one h1 per page, `lang`, visible focus ring, `aria-label` on the toggle, semantic nav/main/footer.

Gaps:
- Third-party Google Fonts (only one in the field; everyone else self-hosts).
- No skip link.
- No reduced-motion guard on `scroll-behavior: smooth`.
- No images yet — the width/height + alt rules are unwritten.
- Font swap (Georgia → Instrument Serif) can shift layout on the hero; fallback metrics not tuned.
- No `theme-color` meta.

---

## 5. Top 3 must-have patterns

1. **Self-host the two fonts** (remove the Google Fonts request, preload the Instrument Serif woff2) — every single target does this; it is the biggest measurable load win and it removes a third party.
2. **Add the skip link** — the one a11y item the whole field misses except mxb.dev, and the highest-value fix for keyboard users; costs 3 lines.
3. **Keep the zero-JS static output and the pre-paint theme script** — this is the field's best practice (static text, theme before first paint, no flash) and the current site already has it; the rule going forward is to preserve it when new features arrive (any new JS must earn its bytes; images go through Astro `<Image>` with dimensions and alt).
