# 04 — Information Architecture & UX (SA-4)

Benchmark of Tier A targets for the chirag-portfolio exercise. Focus: sitemap, nav, home-page layout, dark mode, and the professional-vs-personal demarcation. Companion to `01-teardowns.md` (full dimensions), `02-typography-visual.md`, `03-voice-copy.md`.

**Method note:** All 9 targets fetched 2026-08-28. Navs and dark-mode handling were verified from raw HTML/CSS (link extraction, `data-theme`/`prefers-color-scheme`/toggle greps). `rauno.me` renders most of its home page client-side (Next.js); its map below is from link extraction plus its known structure, marked where inferred.

---

## 1. Per-target IA maps

### leerob.com (leerob.io redirects here) — the bio-first hub
- **Sitemap:** `/` (home hub), topic notes (`/beliefs`, `/ai`, `/dx`, `/devrel`, `/devtools`, `/docs`, `/moderation`, `/personal-software`, `/product-engineers`, `/developer-marketing`), blog posts (`/css`, `/rust`, `/heroku`, `/vercel`, `/cursor`, `/agents`, `/model-behavior`, `/pixo`, `/reflections`). No `/about` and no `/resume` — the bio *is* the home page.
- **Nav:** name/logo + X + email. Nothing else. Navigation happens through the home page's content links.
- **Home layout (top to bottom):** name → bio in 3 short paragraphs (work: "I'm an engineer and writer. I work on ML at SpaceX…"; previously Cursor/Vercel; then one personal line: husband, father, music fan) → "Notes" (10 topic links) → "Blogs" (chronological list).
- **Above the fold:** name + first bio sentence. That's it.
- **Professional/personal:** blended in prose (work, then family), but *content* is separated into topic clusters. No resume page at all — work history is one sentence.
- **Dark mode:** toggle present, defaults to system (`prefers-color-scheme` read in JS, dark CSS variables).

### antfu.me — the link-cloud identity
- **Sitemap:** `/` (bio hub), `/posts`, `/projects`, `/talks`, `/photos`, `/use`, `/podcasts`, `/demos`, `/sponsors-list`, plus a wall of external links.
- **Nav:** Blog · Projects · Talks · Sponsors (4 items) + name.
- **Home layout:** greeting line → "Working at Vercel / Nuxt" → "Creator of…" (6 project links) → "Core team of…" (3) → "Maintaining…" (4) → 2 paragraphs → social links → sponsor block. Every noun is a link. Zero cards, zero images, monochrome.
- **Above the fold:** one sentence of identity + employer line.
- **Professional/personal:** not separated at all — one continuous link cloud. Works because his job *is* his open source.
- **Dark mode:** toggle + system default (`dark` class + `prefers-color-scheme`).
- **What to strip for minimal:** the entire sponsor block; the dense 6+3+4 link nesting (keep only what a visitor can act on).

### mxb.dev — the blog-as-home
- **Sitemap:** `/` (featured posts), `/blog`, `/notes`, `/about`, `/blogroll`, `/privacy`, plus IndieWeb plumbing (webmentions, indieauth).
- **Nav:** logo + theme switcher + menu (items: Blog, Notes, About).
- **Home layout:** "Featured Posts" heading → list of ~8 posts, each title + date + one-line description + comment count. The home *is* the blog index. Bio lives on `/about`.
- **Above the fold:** the first two post titles. No pitch at all.
- **Professional/personal:** work (Codista) is a single footer link; the site is personal. Explicit, by omission.
- **Dark mode:** a theme switcher with 10 named color themes (Mario Kart track names) + auto, following system by default (`data-theme` ×11 in markup).
- **What to strip for minimal:** the multi-theme toy (fun, self-admittedly); comment counts and webmention badges.

### paco.me — the one-column segmented home
- **Sitemap:** `/` (segmented home), `/writing`, `/craft`, plus external project repos (cmdk, writer, next-themes).
- **Nav:** Writing · Craft (2 links). Nearly invisible chrome.
- **Home layout:** name → 2 sentences ("Crafting interfaces. Building polished software and web experiences. Experimenting with magical details in user interfaces.") → "Webmaster at Linear" → four labeled sections: **Building / Projects / Writing / Now**, each a flat one-line list. "Now" is one honest personal paragraph.
- **Above the fold:** name + 2 sentences + Linear line. No CTA button anywhere.
- **Professional/personal:** work is one line ("Webmaster at Linear", past: Vercel); projects and writing are separate labeled sections; "Now" is personal. Cleanest small-site demarcation in the set.
- **Dark mode:** follows OS only (`prefers-color-scheme` in CSS; no manual toggle found).
- **What to strip for minimal:** the ⌘K command palette; the playlist links (charming, not essential).

### rauno.me — the quiet craft home *(partially JS-rendered; map from link extraction)*
- **Sitemap:** `/`, `/craft`, `/notes`, `/projects`, plus archived year-sites (`2022.rauno.me`, `2023.rauno.me`).
- **Nav:** Home · Craft · Notes · Projects (from extracted links).
- **Home layout (recalled + extracted):** name, one-line statement of what he does, a few curated links. Extremely low word count.
- **Dark mode:** none found in CSS → light-only.
- **Notable pattern:** yearly site archives as separate subdomains — "the site is a living version history" (overkill for Chirag; noted and rejected).

### brianlovin.com — everything-is-a-list, About holds the history
- **Sitemap (from his `llms.txt`):** Home, About, Writing, HN, Stack, Sites, TIL, AMA, Computer, Listening, Activity, App Dissection + external products (Shiori, Staff Design, Design Details, Crit, HN CLI, Tax UI).
- **Nav:** icon-only header (logo + icons). Text nav lives in the page content.
- **Home layout:** name → one line ("I'm a software designer living in San Francisco, currently making AI products at Notion.") → **Writing** (5 recent) → **Projects** (14 items, one line each) → **Elsewhere**.
- **About page:** bio, work history, speaking, investments — the formal document, kept off the home page.
- **Above the fold:** name + one line. Then lists.
- **Professional/personal:** the *cleanest structural* separation in the set: About = professional history, Projects/Writing = personal output, never interleaved.
- **Dark mode:** system-following with `dark:` variants; site presents dark-first.
- **What to strip for minimal:** Activity (public likes/visits — self-surveillance theater), and 10 of the 14 "projects" are side-quests (HN reader, TIL, Listening, Stack, Sites…). Keep Writing + Projects + About and the site loses nothing.

### joshwcomeau.com — the upper bound of craft
- **Sitemap:** `/` (latest), `/blog`, `/css`, `/animation`, `/react`, `/javascript`, `/nextjs`, `/about-josh`, `/career`, `/contact`, plus the paid course.
- **Nav:** logo · categories · courses · goodies · About (+ theme toggle, search).
- **Home layout:** long list of articles/tutorials, each title + description + "Read more". Structurally a flat list; visually heavy (interactive widgets, animated shadows, gradients).
- **Dark mode:** toggle, system default.
- **What to strip for minimal:** every decorative layer. The underlying structure (flat title+description list) is plain and worth copying; the decoration is the whole point of *his* site and the wrong move for Chirag's.
- **Verdict:** upper bound. Study for structure, reject for decoration.

### overreacted.io — the floor of minimalism
- **Sitemap:** `/` (blog index) + ~60 posts, flat. Nothing else. No about, no projects, no resume.
- **Nav:** "overreacted by Dan Abramov" + GitHub/Twitter/RSS icons + dark toggle.
- **Home layout:** newest-first post list with short excerpts.
- **Dark mode:** toggle, light default (heavy `dark:` Tailwind usage).
- **What to steal:** the total absence of self-description theater. What to reject: it's single-purpose (a blog). Chirag needs three purposes (work, projects, writing), so he needs three sections — but each section can be this quiet.

### levels.io — honesty floor, polish floor
- **Sitemap:** `/` (blog), thousands of posts, `/stats`, `/projects`, `/rss`, `/api`, `/llms`, `/mcp`, `/investments`, plus special pages (`/12-startups-12-months`).
- **Nav:** home · stats · projects · rss · api · llms · mcp · investments (tiny text links).
- **Home layout:** "Hi. I'm @levelsio and you've found my blog!" → 2 sentences naming his 5 startups and how they're built ("All bootstrapped without funding and just me coding everything on my laptop") → email capture → post list.
- **Above the fold:** identity + the 2-sentence honest pitch. The one "pitch" in the whole set, and it's two plain sentences.
- **Dark mode:** toggle + follows system (`data-theme` set server-side, `prefers-color-scheme` listener).
- **What to strip for minimal:** the meta-links in the nav (rss/api/llms/mcp belong in a footer or `llms.txt`), the email-capture block.

---

## 2. Cross-site patterns

Three families emerge:

| Pattern | Sites | Shape |
|---|---|---|
| **Bio-first hub** | leerob, paco, rauno, brianlovin | Home = name + 1–3 sentence statement + labeled sections that are lists. Nav ≤ 4 items or none. No hero image, no pitch. |
| **Blog-as-home** | mxb, overreacted, levels, joshwcomeau | Home = the content index itself. Identity is one line. |
| **Link-cloud** | antfu | Every noun is a link; zero chrome; highest density. |

Across all 9, five invariants hold:
1. **Home is a hub, not a pitch.** Even joshwcomeau and levels.io are lists at heart. Nobody shows a hero with a stock tagline.
2. **Nav is 0–6 items.** leerob has effectively 0; paco 2; antfu 4; mxb 3. Anything beyond ~5 is a footer.
3. **Everything is flat.** No tabs, no accordions, no "click to reveal". One site (levels.io) hides nothing. If content exists, it's a visible row.
4. **Professional history is either one sentence (leerob, paco, rauno) or one dedicated page (brianlovin's About, mxb's About).** Never interleaved with projects.
5. **Writing is first-class or absent.** mxb/overreacted/levels/joshwcomeau are blogs first; paco/brianlovin list writing next to projects; nobody has a "coming soon" post.

## 3. The 2–3 IA patterns that fit Chirag

For "resume + projects + build-in-public" as a Senior Technical PM:

**Pattern 1 — Bio-first hub (leerob + paco).** Home = name, role line, a lead paragraph that names both halves of his life (work: enterprise PM; personal: builder), then two labeled bands: "Work" and "Projects". This is the base. Chirag's identity is split by design (VOICE rule 9), and the hub is the only place both halves can appear without blending.

**Pattern 2 — Flat one-line lists (mxb + antfu + brianlovin).** Every project and every writing item is one plain row: title + one clause + status. No cards, no images, no reveal. This matches VOICE rule 7 directly: a project row exists only when the thing is public ("In progress" with a repo link is honest; "Planned" is not).

**Pattern 3 — The formal document lives alone (brianlovin's About + leerob's bio sentence).** The resume (companies, numbers, titles) is one self-contained page, and the only page that names employers. Home references it with a label ("Work") and a link, never with content.

Rejected for Chirag: blog-as-home (his writing corpus is 0 posts; the site must not front empty content), link-cloud (his identity is not his open source), yearly site archives (rauno), 10 theme switchers (mxb).

## 4. Proposed sitemap for Chirag

```
/                      Home — hub (identity + "Work" band + "Projects" band)
/about                 The person — Luxembourg, learning Luxembourgish, why build-in-public
/projects              Index — flat one-line list, only shareable things
/projects/{slug}       Case study — created when the project becomes public
/writing               Only when ≥1 real post exists
/resume                The professional document — the only page that names employers
```

Changes vs. today's 5 pages: the five top-level pages are right and stay. The changes are (a) home restructure into a two-band hub, (b) case-study pages under `/projects` (today project blurbs live only as cards, so "what I built" has no home), (c) delete the "More coming" card and the "Coming soon" writing card, (d) nav/footer wording that makes the demarcation explicit.

**Nav (keep 4 items, current order is fine):** About · Projects · Writing · Resume. When Writing has zero posts, drop it from the nav and keep the section off the home page until the first post ships. Resume stays last in the nav but is the primary link on Home — the recruiters' path is home CTA → resume, one click.

**The professional/personal demarcation, solved structurally (not just in copy):**
- `/resume` = professional. Company names, numbers, titles, dates. Links out to LinkedIn. It does *not* link to projects; "at work I build with Claude" is the only bridge, and it appears in the summary, not as a project row.
- `/projects` and `/writing` = personal, build-in-public. No employer names anywhere. **Entry rule (enforced):** a project appears only with a public link — live URL or repo. Statuses allowed: "Live", "In progress" (with repo). "Planned" is deleted.
- `/about` = the person. Luxembourg, the Luxembourgish projects, the build-in-public rule. No career chronology here — that's the resume.
- **Home** shows both bands but never interleaves: one "Work" band (label → 2–3 rows → "Full resume →"), one "Projects" band (label → live rows → "All projects →"). Two bands, two labels, two links. The split is visible, which is the point of VOICE rule 9.
- **Footer** keeps the same split: Email + LinkedIn (professional) on one side, GitHub (personal) on the other. Already roughly the case; make it explicit.

**Home page — exactly what goes above the fold:**
1. `h1`: "Chirag R Gandhi"
2. Role line, one line, muted: "Senior Technical Product Manager · Builder"
3. Lead paragraph, max 3 sentences, first person: one sentence on what he does at work (no company name — VOICE rule 8), one sentence on what he builds at home, optionally the rule line ("A project counts when a stranger can open it.") as the third.
4. Two links, one primary, one secondary: `Resume — work history & results` and `Projects →`. Text-style links, not stacked buttons (paco shows this restraint; leerob shows one primary path).
5. Nothing else. No hero image, no skill chips, no stats grid, no social icon row, no newsletter form. (The €0.9Bn number lives on the resume page and in the Work band below the fold; putting it above the fold makes Home a pitch.)

**Below the fold on Home:**
- "Work" band: 3 rows — current role + one line, two strongest numbers (€0.9Bn platform / 5%→100% adoption), then "Full resume →".
- "Projects" band: one row per public project (title + one clause + status), then "All projects →".
- "Writing" band: only when real posts exist.
- "Elsewhere": Email, LinkedIn, GitHub — one quiet line.

**Project case-study page structure** (title → problem → what I built → outcome, with the shareable-proof up top):
1. **Title** — project name, `h1`, no subtitle.
2. **Proof row** — status + "Open it: {url}" + "Source: {repo}". This is the VOICE rule made visible: the page only exists because a stranger can open it.
3. **Problem** (`h2`) — 2–4 sentences, first person, concrete: the messy real-world situation that motivated it (e.g., broker listings scattered across sites, aggregator misses some; restaurant ratings gamed by fake reviews).
4. **What I built** (`h2`) — plain description of what it does, at most one screenshot, the stack in one sentence, and one honest difficulty line ("the matching step was harder than it looked" — VOICE rule 6).
5. **Outcome** (`h2`) — numbers or current state, then what's next ("In progress: …"). If there's no outcome yet, this section says so in one sentence. No "Outcome" heading with nothing under it.
6. **Back link** — "← All projects".

No testimonials, no "technologies used" tag cloud, no tabs, no key-features bullet grid. Flat text, like mxb's essays and brianlovin's one-liners, expanded.

## 5. Dark-mode handling across targets

| Site | Default | Toggle | Notes |
|---|---|---|---|
| leerob.com | system | yes | JS reads `prefers-color-scheme`, sets class |
| antfu.me | system | yes | `dark` class + media query |
| mxb.dev | system | yes (×10 themes) | `data-theme` attribute, overkill |
| paco.me | system | no | OS-only, no manual control |
| rauno.me | light | no | no dark CSS found |
| brianlovin.com | system | yes | `dark:` variants, dark-first feel |
| joshwcomeau.com | system | yes | toggle in header |
| overreacted.io | light | yes | toggle in header |
| levels.io | system | yes | `data-theme` pre-rendered + toggle |

**Recommendation:** Chirag's current implementation (inline no-flash script: stored choice wins, else OS; manual toggle; no-JS fallback via `prefers-color-scheme`) is exactly the majority pattern — keep it. Nothing to change.

## 6. What feels unnecessary (strip list)

From the targets:
- **joshwcomeau:** all decoration — gradients, animated widgets, heavy shadows. Structure yes, chrome no.
- **brianlovin:** Activity page, icon-only nav, 10 side-quest projects. Keep Writing + Projects + About.
- **antfu:** sponsor block, 13-deep link nesting.
- **mxb:** 10 theme variants, comment counts.
- **paco:** ⌘K palette, playlist links.
- **levels.io:** meta-links in nav (rss/api/llms/mcp), email capture.
- **leerob / overreacted / rauno:** nothing — they are the floor.

From Chirag's current site (IA-level only; visual findings live in `02-typography-visual.md`):
- **"More coming" card on `/projects`** — planned-but-private items listed publicly. Delete. Replaces with silence, per VOICE rule 7.
- **"Coming soon" card on `/writing`** — same violation, worse (it's front-page theater). Delete; the Writing page exists the day the first post ships.
- **Hover-lift cards with shadows on `/resume`** — motion that signals "marketing site". The resume is a document; documents don't hover.
- **Skill chips / skills grid on `/resume`** — a 3×7 list of nouns is the one thing every generic template does (Tier C failure pattern). The experience bullets already prove the skills; cut the grid or reduce it to one line.
- **42rem column** — keep. It matches overreacted/leerob exactly and is correct for text-forward pages.

## 7. Verdict vs. current IA

Current site is closer to the cohort than it looks: 5 flat pages, 4-item text nav, honest statuses, single column. The gaps are exactly three: (1) Home is a mild pitch, not a hub — fix with the two-band structure; (2) projects have no detail pages, so "what I built" has nowhere to live — add `/projects/{slug}`; (3) two "coming soon" items violate the site's own rule — delete. Every other change in this report is a wording or ordering detail.
