# 01 — Competitive Teardown (SA-1)

Fetched live: 2026-08-28. Method: homepage HTML pulled with curl, linked CSS downloaded and inspected for `@font-face`, `font-family`, font sizes, theme variables. Quotes are verbatim from the fetched pages. Buzzword counts cover the first 300 words of visible homepage text (fewer if the page has less text).

Voice note: quotes from target sites are evidence, quoted verbatim — including their buzzwords where they exist. Everything outside quotes is written against VOICE.md.

---

## Tier A quick reference

| Site | Body | Display/reading | Accent font | Font load | Dark mode |
|---|---|---|---|---|---|
| leerob.io | system sans | Iowan Old Style (local serif) | Caveat | 1 webfont only (Caveat) | toggle + system |
| antfu.me | Inter | — (same) | Bad Script, DM Mono, Roboto Condensed | self-hosted subsets | toggle (class) |
| mxb.dev | system stack | Noe Display (serif, 1 weight) | Fira Code, Lobster (gag) | 2 webfonts, preloaded | 10-theme picker |
| paco.me | Sohne | Inter (headings) | Newsreader italic | 3 self-hosted subsets | system only |
| rauno.me | "X" (custom, dd.woff2) | — (same) | JetBrains Mono, Georgia (em/i) | 2 webfonts | none |
| brianlovin.com | Inter | Source Serif 4 (reading) | JetBrains Mono | self-hosted | toggle + system |
| joshwcomeau.com | Wotfard | — (same) | Cartograph CF, Sriracha | self-hosted | toggle |
| overreacted.io | Merriweather | Montserrat (titles) | — | self-hosted via next/font | system only |
| levels.io | system stack | — (same) | none | zero webfonts | toggle + system |

Dominant pattern: **sans body + serif display/reading accents**, monochrome, one handwritten accent font at most, everything self-hosted. Chirag's Instrument Serif + Inter sits squarely inside this pattern (see synthesis at the end).

---

## Tier A teardowns

### leerob.io (Lee Robinson) — a bio with a length toggle and zero nav
- URL: https://leerob.io
- First line above fold (quote): "I'm an engineer and writer. I work on ML at SpaceX (formerly at Cursor) where I help train useful AI models." | Honesty 5/5
- Fonts: display/reading Iowan Old Style (Apple-bundled, loaded via `local()` — costs nothing, falls back Palatino/Georgia) / body system sans stack / accent Caveat (the only font that downloads)
- Type scale: title clamp(2.2rem → 2.65rem, 3.5vw), line-height 1.4 on reading text, base 16px
- Nav: none. Single page: title, bio, Notes, Blogs. No top nav at all.
- Work vs projects separation: no projects page, no resume page. The job (SpaceX, ex-Cursor, ex-Vercel) lives in two bio sentences. Writing is the only content section.
- Colors: 1 (monochrome). No accent color found in CSS. The Caveat annotations inherit text color.
- Whitespace feel: airy — one narrow column, short bio, two link lists.
- Dark mode: toggle + "system" option (Next theme provider stores light/dark/system).
- Honest/process quote: "I've been coding for 15 years and teaching for the second half."
- Buzzword count (first 300 words): 0 of 171
- What to STEAL: the bio length toggle ("Default / Long") — the one piece of JS on the page serves the reader, and "Long" is where the personal stuff (wife, daughters, music) lives, kept out of the default view. That's professional/personal demarcation as UI.
- What to REJECT: the H1 "@leerob" links to his X profile, and the toggle labels ("Bio Default Long") are cryptic. For Chirag, the name should not hand the visitor to another site, and any toggle needs plain labels.

Notes: the entire page is maybe 170 visible words. It works because Lee is famous; the page is a handshake, not a pitch. The reading serif costs nothing (local font, zero download) — the cheapest possible way to look designed.

### antfu.me (Anthony Fu) — dense link-wall, one handwritten whisper
- URL: https://antfu.me
- First line above fold (quote): "Hey! I'm Anthony Fu, a fanatical open sourceror and design engineer." | Honesty 4/5
- Fonts: body Inter / labels Roboto Condensed / code DM Mono / accent Bad Script (handwritten "Hey!" annotation). All self-hosted woff2 subsets, font-display swap.
- Type scale: prose h1 2.25em weight 800; base 16px. Dense list typography with tiny category labels.
- Nav: Blog, Projects, Talks, Sponsors (4 items, single page, anchor links).
- Work vs projects separation: explicit verbs as categories — "Working at Vercel / Nuxt", "Creator of Vitest Slidev VueUse UnoCSS Elk Type Challenges", "Core team of Vue Nuxt Vite", "Maintaining Shiki Twoslash ESLint Stylistic". Zero prose, pure lists.
- Colors: 2 (near-black on white, gray-700/200 text). No accent. Dark class variant.
- Whitespace feel: dense — the most content per viewport of any Tier A site.
- Dark mode: toggle (class-based, with `prefers-color-scheme` fallback).
- Honest/process quote: "If you enjoy my work and find them useful, consider sponsor me and the ecosystem to help Open Source sustainable." — a direct ask, no softeners.
- Buzzword count (first 300 words): 1 of 224 ("passion" — "Dreaming up cool ideas and making them come true is where my passion lies"; genuine, first-person, borderline)
- What to STEAL: verb-category lists ("Creator of / Core team of / Maintaining") — replaces three paragraphs of bio with a scannable structure. Chirag could do: "Working on / Built / Learning".
- What to REJECT: the wall-of-links density and "fanatical" energy. It's his brand (open-source maintainer), not Chirag's. Also: no About section — identity is assumed because the projects carry it. Chirag can't assume that yet.

### mxb.dev (Max Böck) — "I make websites." and a Mario Kart theme picker
- URL: https://mxb.dev
- First line above fold (quote): "I make websites." | Honesty 5/5
- Fonts: display Noe Display (serif, medium weight only, self-hosted woff2, preloaded) / body system stack / code Fira Code. Lobster appears as a gag inside one theme.
- Type scale: base 16px, line-height 1.625, single display weight. Restraint via omission (only one serif weight exists).
- Nav: 01 Home, 02 Writing, 03 Notes, 04 About — numbered, 4 items.
- Work vs projects separation: the studio (Codista) is one footer link under "Work". No projects page. The site is writing-first; the about page carries the professional story.
- Colors: 1 base scheme × 10 user themes (Classic, Dark, Koopa Beach, Choco Mountain, Moo Moo Farm, Bowser's Castle, Yoshi Valley, Rainbow Road, Lobster Life, Hacker News). The themes are the site's personality.
- Whitespace feel: balanced — standard blog rhythm.
- Dark mode: via the theme picker (one of the 10 themes is Dark), stored in localStorage, data-theme attribute.
- Honest/process quote: "Can we do modern web development without a build step? How can we solve common build problems in HTML, CSS and Javascript using just the platform?" — blog intros that admit the industry is re-learning basics. Also the HTML source comment inviting inspectors to the repo.
- Buzzword count (first 300 words): 0
- What to STEAL: the four-item numbered nav (structure you can count), and the idea that the site's single "toy" (theme picker) doubles as personality. Also: preloading one display font weight.
- What to REJECT: 10 themes incl. a Lobster gag theme — that's a mature personal site's indulgence, not something to build at v5. And writing-first only works if you actually write; Chirag's writing page has one placeholder post.

### paco.me (Paco Coursey) — craft manifesto with a Now section
- URL: https://paco.me
- First line above fold (quote): "Crafting interfaces. Building polished software and web experiences. Experimenting with magical details in user interfaces. Webmaster at Linear." | Honesty 4/5
- Fonts: headings/UI Inter / body Sohne (self-hosted subset) / accent Newsreader italic (self-hosted subset, used for dropcaps and emphases). font-display: block, base 16px.
- Type scale: giant headline (~4rem), modest body, dropcap serif openings on prose blocks. Three families, each with one job.
- Nav: none. One-pager: Craft (what he's building) → Projects → Writing → Now → Connect.
- Work vs projects separation: sections, not pages. "Webmaster at Linear" is one clause in the intro; "In the past I've developed the Vercel design system, website, and dashboard" is the next sentence. Projects are named one-liners (⌘K, Writer, Next Themes).
- Colors: 1 (monochrome). No accent detected.
- Whitespace feel: airy — big type, big gaps, few words.
- Dark mode: system only (`prefers-color-scheme`), no manual toggle.
- Honest/process quote: "All I want to do is build websites. Typography, motion design, copywriting, performance—the web is an endless medium of opportunity and creativity of which I've only scratched the surface." Plus the footer: "Pray at the altar of hard work."
- Buzzword count (first 300 words): 2 of 201 ("passion", "efficient" — both inside the Now section, personal voice, not pitch voice)
- What to STEAL: the Now section (what he's currently doing, including the music he's listening to) and the short sign-off line in the footer. Both cost nothing and read human. Also: section headers as one verb ("Craft", "Now", "Connect").
- What to REJECT: "magical details" and "polished" — self-praise that only lands because his work is famous. And a homepage with no job title visible unless you read carefully; Chirag needs the role stated plainly.

### rauno.me (Rauno Freiberg) — 54 words total
- URL: https://rauno.me
- First line above fold (quote): "Rauno Freiberg is an Estonian interaction designer working with Vercel and Devouring Details." Then the manifesto: "Make it fast. Make it beautiful. Make it consistent. Make it carefully. Make it timeless. Make it soulful. Make it." | Honesty 4/5
- Fonts: body "X" — a custom grotesque commissioned for Devouring Details (dd.woff2, weights 400/500) / mono JetBrains Mono / serif accents Georgia on em/i. Self-hosted.
- Type scale: one enormous statement, then small section labels. Total visible copy: 54 words.
- Nav: none. Corner link list: Twitter, 2023, 2022, GitHub, Email. Sections: Devouring Details (DD), Craft, Projects, Field Notes.
- Work vs projects separation: Craft (work with Vercel) and Projects are separate sections; the Vercel relationship is one clause.
- Colors: 1 (monochrome). No dark mode at all — the one Tier A site without it.
- Whitespace feel: extremely airy — negative space is most of the page.
- Honest/process quote: "Make it." — the list ends on an unfinished sentence, which is the honesty: work is never done.
- Buzzword count (first 300 words): 0 of 54
- What to STEAL: word-count discipline. The entire site is a manifesto and it still communicates role, employer, and projects. Any section of Chirag's site should be able to survive at 10% of its current length.
- What to REJECT: this page is a gallery statement for a designer whose portfolio lives elsewhere. For Chirag, 54 words means no resume, no project details, nothing a recruiter or a stranger can act on. Also: entry animation (clip-reveal, translateY) adds JS for theater, and there's no dark mode.

### brianlovin.com (Brian Lovin) — the name is 24px; the content is the hero
- URL: https://brianlovin.com
- First line above fold (quote): "I'm a software designer living in San Francisco, currently making AI products at Notion." | Honesty 5/5
- Fonts: body Inter / reading Source Serif 4 (used for long-form) / code JetBrains Mono (self-hosted). H1 is text-2xl (24px) — deliberately small.
- Type scale: base 16px, small name, list-driven sections with one-line descriptions.
- Nav: none. Sticky header: name + dark toggle. Homepage sections: Writing (latest 5) → Projects → then a long flat list of everything else (HN, App Dissection, Stack, AMA, TIL, Listening, Sites, Shiori, Staff Design, Design Details, How to Computer Better, Crit, HN CLI, Tax UI).
- Work vs projects separation: professional (Notion) is one clause in the bio. Everything else on the page is side-work, and the volume does the demarcation. No resume page.
- Colors: 1 (monochrome, bg-white / dark:bg-black). No accent.
- Whitespace feel: airy — lists with generous gaps.
- Dark mode: toggle + system follow (matchMedia + localStorage).
- Honest/process quote: "currently making AI products at Notion" — "currently" admits impermanence. And the TIL/AMA sections are literally him saying "ask me anything" — zero gatekeeping.
- Buzzword count (first 300 words): 0 of 138
- What to STEAL: the one-line bio formula: "I'm a [role] living in [place], currently [verb]ing [thing] at [company]." And the decision that your own name doesn't need to be the biggest thing on the page.
- What to REJECT: 14+ bare one-liner projects works because he has 14+ projects. Chirag has 3 real ones — bare one-liners would make the page look unfinished. Chirag needs slightly more per project (2 sentences + status), which is what he already does.

### joshwcomeau.com (Josh Comeau) — maximal craft, zero pitch
- URL: https://joshwcomeau.com
- First line above fold (quote): "Articles and Tutorials" — the page opens straight into content; no personal pitch anywhere above the fold. First article: "For decades, one of the most notoriously-challenging problems on the web has been sticking one element to another element..." | Honesty 5/5
- Fonts: body Wotfard (self-hosted sans) / mono Cartograph CF / accent Sriracha (handwritten annotations, self-hosted). Body line-height: calc(.95 + .62rem) — fluid with font size.
- Type scale: blog scale, generous; the identity lives in the decorative system (gradient blobs, spring-physics animations, sprite easter eggs).
- Nav: logo + About + categories + courses + goodies. Blog-first; "About" is where the personal story lives.
- Work vs projects separation: this site is a content business (courses). Projects aren't showcased as portfolio pieces; everything is articles and courses. Not a model for Chirag's structure, only for voice and craft ceiling.
- Colors: full light/dark theme systems with hsl custom properties, pastel accents, gradient decorations. The most color of any Tier A site.
- Whitespace feel: blog-dense, airy cards on the homepage.
- Dark mode: toggle (data-color-mode) + system.
- Honest/process quote: "Most people don't even notice it, but the ones who do often reach out, asking how on earth it works." — he writes to a curious reader and admits his own tricks are hidden. Tone throughout: "It's pretty friggin' cool!", "super cool things" — enthusiasm, not hype.
- Buzzword count (first 300 words): 3 hits of 300 — all false positives ("dynamic animations", "scroll-driven animations", "first-class solution" — technical terms, not marketing)
- What to STEAL: the conversational explanation voice — enthusiasm for the work itself, directed at a reader who wants to learn. That's the difference between "I'm excited about this" and "passionate about delivering solutions". Also: the handwritten annotation trick (Sriracha) — same role as Chirag's italic Instrument Serif.
- What to REJECT: the decorative maximalism (gradients, spring animations, easter eggs) — an enormous build cost and off-brand for "clean, minimal, honest". This is the upper bound: study it, don't copy it.

### overreacted.io (Dan Abramov) — blog-only, one-line subtitles, job hunt as a post
- URL: https://overreacted.io
- First line above fold (quote): "There Are No Instances in atproto — Like RSS and Google Reader." (Latest post + its subtitle.) | Honesty 5/5
- Fonts: titles Montserrat (next/font, self-hosted) / body Merriweather (next/font, self-hosted). Titles 28px weight 900; meta text 13px.
- Type scale: dense post list; each post = title + one-line subtitle + date.
- Nav: none — "overreacted" wordmark only.
- Work vs projects separation: none exists. The blog IS the site. Job hunting appears as a post: "Hire Me in Japan — I'm looking for a new job." Personal updates are posts: "I'm Doing a Little Consulting".
- Colors: 1 (monochrome) + dark variants via Tailwind's media-based dark (OS-follow only, no manual toggle).
- Whitespace feel: dense but calm — a pure reading list.
- Honest/process quote: "I'm looking for a new job." — as a blog title. Every post subtitle is a plain-words summary: "Formats over apps.", "My new hobby project.", "The joys of vibecoding."
- Buzzword count (first 300 words): 0
- What to STEAL: the one-line subtitle discipline — every piece of content gets one plain sentence that says what it is. Chirag's project cards could adopt exactly this: title + one honest sentence.
- What to REJECT: the site works without a bio only because Dan's name is the context. Chirag's site must say who he is on the home page. Also: dense 28px-black Montserrat list has no self hierarchy — fine for a blog, wrong for a portfolio hub.

### levels.io (Pieter Levels) — system fonts, real numbers, everything in public
- URL: https://levels.io
- First line above fold (quote): "Hi. I'm @levelsio and you've found my blog! I build internet startups by myself: Nomads.com, Remote OK, Hoodmaps, Photo AI and Interior AI. All bootstrapped without funding and just me coding everything on my laptop." | Honesty 5/5
- Fonts: 100% system stack (-apple-system, Segoe UI, Roboto...). Zero webfonts. Base 15px, line-height 1.65.
- Type scale: small, dense, utilitarian. The stream is the design.
- Nav: home, stats, projects, rss, api, llms, mcp, investments (8 items) + sort/filter controls on the post stream.
- Work vs projects separation: projects = separate page (the list of everything he's ever made). The blog stream is the work — build-in-public is the content strategy. No resume, no case studies.
- Colors: light/dark themes via data-theme; one accent (#3eb0ef) in dark mode; yellow selection. Mostly monochrome.
- Whitespace feel: dense stream, functional.
- Dark mode: toggle + system + localStorage.
- Honest/process quote: "Hotel ACs in Europe are designed to show rooms about 4°C/9°F colder than they really are" — posts are observations with receipts. The stats page publishes real revenue/traffic numbers. Pinned post: "Ask me anything".
- Buzzword count (first 300 words): 0
- What to STEAL: the product list as the bio — "I build X, Y, Z. All bootstrapped, just me." Chirag's version writes itself: "I build X and Y. All in public, one laptop." Also: zero webfonts is a legitimate choice when the content is the product, and the "Ask me anything" affordance.
- What to REJECT: the machine-shop layout (sort/filter links, api/mcp nav, a 67k-char stream) is infrastructure for his decade of output, not a template. And with no resume or case studies, it only works because the products are famous on their own. Chirag's products aren't — his pages need the context.

---

## Tier C — Anti-references (template sites)

Fetched three BootstrapMade template demos (the actual demo pages, not the marketing frames): iPortfolio, DevFolio, Kelly.

### iPortfolio — placeholder identity, typed title, progress-bar theater
- URL: https://bootstrapmade.com/content/demo/iPortfolio/ (template demo)
- First line above fold (quote): "Alex Smith — I'm Designer" (typed, cycles through "Designer, Developer, Freelancer, Photographer") | Honesty 1/5
- Fonts: Roboto at 10 weights via Google Fonts (100–900 + italics) — typography with no opinion.
- Failure patterns observed:
  - Placeholder person ("Alex Smith"), lorem ipsum in the About section, verbatim: "Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem."
  - Title-stacking: "UI/UX Designer & Web Developer." — slashes and ampersands instead of a sentence.
  - Skill progress bars: HTML 100%, CSS 90%, JavaScript 75%, PHP 80%, WordPress/CMS 90%, Photoshop 55% — precision with no evidence, and no reader can verify or use them.
  - Stat theater: "Happy Clients", "Hours Of Support", "Hard Workers" counters.
  - Mega-nav: 10 items with three-level dropdowns.

### DevFolio — celebrity placeholder, "innovative and deadline-driven"
- URL: https://bootstrapmade.com/content/demo/DevFolio/ (template demo)
- First line above fold (quote): "I am Morgan Freeman" (typed rotation identical to iPortfolio: Designer, Developer, Freelancer, Photographer) | Honesty 1/5
- Fonts: Roboto, 10 weights.
- Failure patterns observed:
  - Same typed-title rotation, copy-pasted across templates.
  - Third-person resume summary, verbatim: "Innovative and deadline-driven Graphic Designer with 3+ years of experience designing and developing user-centered digital/print marketing material from initial concept to final, polished deliverable." — this is the exact sentence VOICE.md exists to ban. Five buzzwords in one line, zero evidence.
  - Same progress bars, same Services card grid.

### Kelly — a profession with no proof
- URL: https://bootstrapmade.com/content/demo/Kelly/ (template demo)
- First line above fold (quote): "Kelly Adams — I'm a professional illustrator from San Francisco" | Honesty 2/5
- Fonts: Roboto, 10 weights.
- Failure patterns observed: mostly empty page (content lazy-loads or is missing), a claim of profession with zero work shown, footer credit "Designed by BootstrapMade". First-person sentence but no substance behind it — the "coming soon" theater VOICE.md forbids, in template form.

### Tier C failure-pattern catalog (what these share, and what to never do)

1. **Typed-title rotation** ("I'm a Designer, Developer, Freelancer, Photographer") — the hero says four things and commits to none.
2. **Placeholder/celebrity names** (Alex Smith, Morgan Freeman, Kelly Adams) — identity as a fill-in-the-blank.
3. **Third-person, buzzword resume summary** ("Innovative and deadline-driven...") — marketing voice about oneself.
4. **Skill progress bars** — unverifiable precision (HTML 100%), reads as decoration, ignored by every human.
5. **Stat counters** (Happy Clients, Hard Workers) — theater numbers with no source.
6. **Lorem ipsum in the About** — shipping emptiness; the template assumes you'll replace it and most people never do.
7. **Mega-nav with dropdowns** — 10 items because the template can, not because the visitor needs them.
8. **Roboto at 10 weights** — a font with no opinion, loaded in full.
9. **Services grid** — "what I offer" cards are agency furniture, not human furniture.

Every one of these is the opposite of the Tier A pattern: one sentence, real names, real numbers, one font opinion, 0–4 nav items.

---

## Synthesis — what this means for chirag-portfolio

**Honesty table.** First-line honesty ratings: leerob 5, antfu 4, mxb 5, paco 4, rauno 4, brian 5, josh 5, overreacted 5, levels 5. The 5s all share one move: a single plain sentence naming a real job and/or real products. The 4s lose a point for self-praise ("fanatical", "magical details") or a stylistic statement instead of a fact.

**Font verdict on Instrument Serif + Inter (D2 pre-read).** The tier's dominant pattern is exactly what Chirag already has: sans body (Inter everywhere — Brian, Antfu, Paco) + serif accents for reading/display (Iowan, Noe Display, Source Serif 4, Merriweather, Newsreader). Instrument Serif holds up. Two tunings the peers suggest: (1) peers use serif sparingly — headlines and italic emphases, not paragraphs (SA-2 should confirm weights/scale); (2) every peer self-hosts or uses local/system fonts — none load Google Fonts at runtime, which is the one change worth making regardless of pairing.

**Demarcation.** No Tier A site has a resume page; jobs live in one clause of the bio and everything else is projects/writing. Chirag's resume page is his differentiator (enterprise artifact), but the home page must follow the peers: role + what he builds, no company-name clause (VOICE rule 8 already says this).

**Build-in-public.** levels.io's stream, Brian's TIL/AMA, Lee's notes, Dan's "job hunt as a post" — the honest-sites move is to publish process. Chirag's Writing page is the right slot; its one placeholder post is currently the weakest point on the site.

**Restraint inventory for the current site.** Peers' pages run 54–300 visible words on the home page. Chirag's current home is close to this. The two things no peer has: buzzword-adjacent filler and "coming soon" placeholders (Writing page, Projects "Planned" card). Levels' equivalent of a planned project is a shipped post about it. The fix is to say "in progress" honestly (Projects page does this well already) and let Writing ship only when the first post exists.
