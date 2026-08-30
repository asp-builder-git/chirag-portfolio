# SA-3 — Voice & Copy Audit

**Date:** 2026-08-28 · **Agent:** SA-3 (reasoner) · **Dimension:** D3 — Language & Voice (highest weight) · **Law:** `VOICE.md` (read fully)

**Method notes:** All Tier A + B targets fetched live on 2026-08-28. Two access notes:
- `pragmaticengineer.com` did **not** block. It returned a 200 with a wall of reader testimonials; the author's own hero lines are thin and sit above the wall. That shape is itself a finding.
- `rauno.me` is client-rendered — the page extractor returned only the title. The homepage copy was recovered from raw HTML (the text is in the initial payload). `joshwcomeau.com/about/` 404s; his real bio page is `/about-josh/`. One search provider call failed; all gaps were closed with direct fetches.

This report quotes exact source lines for every rating. Quoted copy is marked as quotes; everything else is my own writing, written against the same voice law it audits.

---

## 1. The honesty scale (1–5)

A scale, anchored to what the reference sites actually do. Not a vibe check — each anchor is a testable property.

| Score | What a page at this level does | What it never does |
|---|---|---|
| 5 | Reads like the person talking. Every claim is concrete or verifiable. Difficulty and limits get said out loud. Statuses are blunt. | No résumé phrasing, no scale claims without a trace, no theater. |
| 4 | Human voice, mostly plain. One or two soft claims or polished edges, but the person is visible. | No third-person marketing, no template. |
| 3 | Genuinely first-person and real underneath, but sentences carry résumé compression, vague scale talk, or filtered edges that hide the work. | No outright fake claims. |
| 2 | Third-person or template framing. Claims ungrounded. Buzzwords carry the sentences. | — |
| 1 | Boilerplate. Could be any of ten thousand portfolio templates. | — |

---

## 2. Source quotes — every target, scored

### Tier A

### levels.io — the floor of polish, the ceiling of plain talk — 5/5
- **First line above fold:** "Hi. I'm @levelsio and you've found my blog!"
- **Bio:** "I build internet startups by myself: Nomads.com, Remote OK, Hoodmaps, Photo AI and Interior AI. All bootstrapped without funding and just me coding everything on my laptop."
- **Honest passage:** "Since 2013 I write here about building businesses, traveling the world, AI and whatever else is on my mind."
- **Why 5/5:** "All bootstrapped without funding and just me coding everything on my laptop" is a full disclosure in one sentence — who, what, how, and the absence of help. He names the products, then tells you exactly how little machinery sits behind them. No adjectives carry weight here; the nouns do.
- **Buzzword count (first 300 words):** 0.

### mxb.dev — the shortest honest line on the list — 5/5
- **First line above fold:** "I make websites."
- **Bio:** "Hello, my name is Max. I'm a front-end developer and co-founder of Codista, a software studio in Vienna. I also write about the web on my blog and elsewhere."
- **Honest passage (about page):** "I like writing about web development and design on my blog. My articles have been featured on platforms like CSS-Tricks, Codrops, Hackernews and net magazine. Please note that I do not allow guest posts or sponsored articles here."
- **Why 5/5:** "I make websites." is three words, a verb and an object, and it says everything the site needs to say. The guest-post refusal is a limit stated plainly — the kind of line almost nobody writes, which is exactly why it reads true.
- **Buzzword count (first 300 words):** 0.

### overreacted.io — statuses that say the plain thing — 5/5
- **First line above fold:** header "overreacted — A blog by Dan Abramov"; the page is a list of post titles with one-line blurbs.
- **Honest passages (from the post list):** "Hire Me in Japan — I'm looking for a new job." · "Introducing RSC Explorer — My new hobby project." · "There Are No Instances in atproto — Like RSS and Google Reader."
- **Why 5/5:** No bio at all. The titles do the work, and they are as plain as a note taped to a door: "I'm looking for a new job." That is the honesty bar for status language. Note he also publishes his hobby framing openly ("My new hobby project") — small, real, labeled.
- **Buzzword count (first 300 words):** 0.

### joshwcomeau.com — maximal craft, plain voice — 5/5 (about page; home is a blog list)
- **First line above fold (home):** article list, no hero — the craft lives in the writing.
- **First line of bio (about page):** "Hi there! I'm Josh. I started building on the web in 2007 and never stopped."
- **Honest passages:** "I spent ~6 months unable to use a keyboard or mouse, and learned to code by voice." · "In a cruel twist of fate, I'm a cat person who is allergic to cats." · "My packages are downloaded ~600,000 times per month according to NPM."
- **Why 5/5:** The difficulty admission ("learned to code by voice") is the single most honest line any target site ships. He pairs numbers with a source ("according to NPM") and lets a personal detail sit in the same bio as the work without blending them — each fact gets its own sentence, its own place.
- **Buzzword count (first 300 words of about):** 1 mild ("empowering up-and-coming software developers"). Everything else is concrete.

### rauno.me — principles instead of a pitch — 4/5
- **First line above fold:** "Make it fast. Make it beautiful. Make it consistent. Make it carefully. Make it timeless. Make it soulful. Make it."
- **Meta description (the only bio-like line on the page):** "Rauno Freiberg is an Estonian interaction designer working with Vercel."
- **Why 4/5:** The homepage is a set of commands to himself, not claims about himself — that is honest in a specific way: no achievements asserted, no scale implied. It earns a 4, not a 5, because it is aspirational rather than descriptive; the site never says what he has actually done. The meta line is the plainest factual statement on the page.
- **Buzzword count (first 300 words):** 0.

### leerob.com — plain work line, human life line — 4/5
- **First line above fold:** "I'm an engineer and writer."
- **Bio:** "I work on ML at SpaceX (formerly at Cursor) where I help train useful AI models. Previously, I worked at Vercel on Next.js. I've been coding for 15 years and teaching for the second half. My life's work is to make technology easy to understand and interesting to learn about. I'm a husband to my much cooler wife, a father to two radiant daughters, and a massive music fan."
- **Why 4/5:** The work line is a clean chain of facts with a real count ("15 years"). "My life's work is to make technology easy to understand" is a mission statement, which is a step toward polish — but it sits next to "my much cooler wife", which is pure person. The professional and the personal are two separate sentences, never fused. That separation is the pattern Chirag's home page needs.
- **Buzzword count (first 300 words):** 0.

### antfu.me — concrete list, one earned "passion" — 4/5
- **First line above fold:** "Hey! I'm Anthony Fu, a fanatical open sourceror and design engineer."
- **Bio:** "Creator of Vitest, Slidev, VueUse, UnoCSS, Elk, Type Challenges. Core team of Vue, Nuxt, Vite. … Dreaming up cool ideas and making them come true is where my passion lies."
- **Why 4/5:** The page leads with names of shipped things, not adjectives. "Fanatical open sourceror" is self-aware, not résumé-speak. The word "passion" appears — the one word VOICE.md bans — and it works here, because it follows a list of ten shipped projects. The passion claim is earned by the nouns in front of it. That is the only acceptable way to use that word: after the evidence.
- **Buzzword count (first 300 words):** 1 ("passion", earned).

### brianlovin.com — one sentence, no garnish — 4/5
- **First line above fold:** "I'm a software designer living in San Francisco, currently making AI products at Notion."
- **Why 4/5:** Exactly one sentence: who, where, what, employer. Then the page hands over to a plain list of projects and writing, each with a one-line description ("A minimal hacker news reader"). Nothing is asserted that the reader can't check by clicking. The 4, not 5, is for the absence of any process or difficulty note — the site is a directory, not a conversation.
- **Buzzword count (first 300 words):** 0.

### paco.me — verb phrases, no claims — 4/5
- **First line above fold:** "Crafting interfaces. Building polished software and web experiences. Experimenting with magical details in user interfaces. Webmaster at Linear."
- **Honest passage (Now):** "Developing skill through doing, guiltlessly exploring passion and interests, imbuing quality. Mindful that everything around me is someone's life work. All I want to do is build websites."
- **Why 4/5:** The first line is almost a poem — no "I", no claims, no numbers, no employer history beyond "Webmaster at Linear". "Polished" and "magical" are soft words, but they read as taste, not marketing, because nothing is being sold. The Now section is honest process talk. The 4, not 5: the page asserts craft without ever showing difficulty; there is no hard part on display.
- **Buzzword count (first 300 words):** 2 mild ("polished", "magical") — both describing his own taste, not his results.

### Tier B

### pragmaticengineer.com — plain author, loud page — 4/5 (voice) with a warning
- **First line above fold:** "Hi 👋, I'm Gergely"
- **Author's own lines:** "I write a newsletter, a blog and published a few books." · "Big tech and startups, from the inside." · "More than 1 million readers"
- **Meta description:** "The Pragmatic Engineer is the #1 newsletter for engineering managers and senior engineers."
- **Honest passage (a reader, on the page):** "Not: 'AI is changing the world, says famous musician' But: 'Facebook is laying off staff, here is the criteria they are using to decide who'"
- **Why 4/5:** Gergely's own voice is plain and short — "Hi, I'm Gergely. I write a newsletter, a blog and published a few books." — and that is exactly the register VOICE.md asks for. But the page around it is a testimonials wall, and the "1 million readers" figure ships without the detail link visible in extraction. The "#1 newsletter" claim is the weakest line on the page — a claim with no trace. Lesson: even the most plain-spoken author lets the marketing page get louder than his own sentences. Keep the plain sentences, lose the wall.
- **Buzzword count (first 300 words):** 1 ("#1 technology newsletter" / "#1 newsletter" claim) plus the wall's own hype, which belongs to readers, not the author.

### lennysnewsletter.com — the funnel voice, as a contrast case — 3/5 (it is a storefront, not a bio)
- **First line above fold:** "Deeply researched product, growth, and career advice for product leaders, founders, and ambitious builders."
- **Stat line:** "Over 1,200,000 subscribers"
- **About page:** "I publish a deeply researched advice column about building product, driving growth, and advancing your career. My goal is to make you more successful at your work."
- **Why 3/5:** Two honest notes: "My goal is to make you more successful at your work" is plain and useful, and the subscriber count is a real number. But the packaging is a funnel: "deeply researched" and "ambitious builders" are claims you must trust to subscribe, and the homepage count (1,200,000) does not match the about page ("Join 1,000,000+ subscribers") — a small mismatch that shows how numbers drift when they are used as decoration. This is the voice of a subscription business, which is fine for a subscription business and wrong for a personal site. Chirag's site is not selling anything; it must not copy this register.
- **Buzzword count (first 300 words):** 3 ("deeply researched", "ambitious builders", "industry leaders" on the about page).

---

## 3. Chirag's current copy — scored against the scale and VOICE.md

Current live copy (v4, from `src/pages/index.astro` and `src/pages/about.astro`):

> Tagline: **"Senior Technical Product Manager, Builder"**
> Lead: **"I build enterprise products used by hundreds of internal Amazon users that support actions driving billion $ impact with engineering teams. I build full-stack apps with Claude in VS Code at work and with Cursor & Openclaw at home."**
> Build line: **"A project counts when a stranger can open it."**
> Project states: **"Live"**, **"In progress"**, **"The meta-project: proof I can finish things."**
> Writing section: **"Why I'm publishing my work in public — Coming soon"**
> About lead: **"Product manager by day, builder by default."**
> About: **"I work at the intersection of product thinking and hands-on engineering: I run multi-agent pipelines, build crawlers, dashboards, and tools, and I care about shipping things people can actually use."**

### Score by scale anchor

| Anchor | Score | Evidence |
|---|---|---|
| First person | 4/5 | "I build…" throughout. But the lead sentence is résumé compression, not a person talking. |
| Buzzword-free | 3/5 | "billion $ impact" is a scale claim in the loudest spot. "At the intersection of product thinking and hands-on engineering" (about page) is LinkedIn phrasing. The rest is clean. |
| Numbers over adjectives | 3/5 | "hundreds of internal Amazon users" and "billion $" are numbers with no trace on the page. The honest numbers are in the projects: "4-week market study compressed into a single day", "4-agent pipeline". |
| Honest about difficulty | 2/5 | No line anywhere says a thing was hard. "Proof I can finish things" is the closest and it is good — but nothing else admits friction, limits, or process. |
| Short sentences, plain words | 2/5 | The lead is one 32-word tangle: "I build enterprise products used by hundreds of internal Amazon users that support actions driving billion $ impact with engineering teams." Three clauses, two of them vague. VOICE.md rule 5 says split it. |
| No theater | 2/5 | Three "In progress" projects are honest. But the Writing section ships exactly one item and marks it **"Coming soon"** — VOICE.md rule 7 bans this. |
| Professional ≠ Amazon | 0/5 | VOICE.md rule 8: "The home page does not mention Amazon." The first sentence of the home page mentions Amazon. Hard violation. |
| Professional vs personal separation | 2/5 | One paragraph blends enterprise work, Amazon users, a dollar claim, and home tools (Claude, Cursor, Openclaw). VOICE.md rule 9 says never one mush. The About page does the same in one sentence. |
| Claims trace to reality | 3/5 | The projects section traces perfectly — real names, real states, real repos. The headline claim traces to nothing visible on the page. |
| Build-in-public thread | 4/5 | "A project counts when a stranger can open it" is the best line on the site and the whole meta-story in one sentence. Undercut only by the "Coming soon" item next to it. |

### Overall current-copy honesty score: **3/5**

The bones are honest: first person, real projects, no third-person marketing, no "passionate about", and one genuinely good line ("A project counts when a stranger can open it"). But the flagship sentence — the first thing read — is exactly the thing VOICE.md was written to stop: it is résumé-compressed, it violates rule 8 (Amazon on home), it violates rule 9 (work and home blended in one clause), and it claims scale ("billion $ impact") that the page does not trace. The "Coming soon" item breaks rule 7. Structure is honest; the lead sentence and the theater are not. Compared against the reference set: same starting point as the honest sites, held back by the two sentences that matter most.

**Buzzword count (first 300 words of home):** 2 loud-ish ("impact", "driving") inside one clause, plus 1 mild ("enterprise", used as a real descriptor, acceptable). The about page adds 1 ("intersection"). That is better than Lenny's page and worse than every Tier A page except paco's, whose soft words describe taste, not results.

### What the references prove about the fix
- The lead sentence is fixable by the same move mxb and levels make: **one plain verb sentence, then stop.** "I make websites." → "I build enterprise products at work. I build small tools at home."
- The Amazon line is fixable by the same move leerob and Brian make: **work sentence, then separate life sentence, never fused.**
- The "billion $" claim is fixable by Gergely's move: **state the number that exists, link the trace, or say nothing.** The resume has real counts; the home page should use them or drop the claim.
- The "Coming soon" item is fixable by Dan's move: **label the thing that exists ("My new hobby project") or don't list it.**
- The difficulty gap is fixable by Josh's move: **one honest line about a hard part, per project or per bio.**

---

## 4. (a) Rewritten headline options — Chirag's voice

Written against VOICE.md: first person, plain words, no claims without traces, professional and personal in separate sentences. Each option lists the evidence it borrows from.

1. **"I build enterprise products at work. I build small tools at home."**
   *Two plain verb sentences, zero claims. Does the professional/personal separation in the headline itself — the thing VOICE.md rule 9 asks for. Structure echoes mxb ("I make websites.") and leerob (work sentence, then life sentence).*
2. **"Product manager at work. Builder everywhere else."**
   *Kills the résumé title "Senior Technical Product Manager" while keeping both halves true. "Builder everywhere else" covers Claude, Cursor, Openclaw, and the Luxembourg crawler in four words.*
3. **"I manage products with teams. I build tools with Claude and Cursor."**
   *Names the real tools — his own current copy's best move, promoted to headline. Concrete nouns instead of adjectives.*
4. **"My day job is product. My side projects ship."**
   *Plain, and it quietly carries the meta-story ("proof I can finish things") without saying it.*
5. **"I build crawlers, dashboards, and small tools — the kind a stranger can open."**
   *The projects-section voice, promoted. Ends on the stranger rule, the site's best line.*
6. **"Two kinds of work live here: the products I own at work, and the tools I build at home."**
   *Spells out the demarcation for the reader. Slightly longer; works as a sub-line under any of the others.*
7. **"I work on enterprise products by day. I build in public by night."**
   *"Build in public" is a real practice term, not a buzzword; the sentence pair keeps the two halves apart.*
8. **"I run multi-agent pipelines, build crawlers, and finish what I start."**
   *All concrete verbs, ends on the one character claim the site can actually support ("proof I can finish things").*

**Suggested default:** option 1 as the headline, with the existing about line "Product manager by day, builder by default." kept as a sub-line, and "A project counts when a stranger can open it." kept as the closing build-line where it already lives. That is the whole site in three lines, all of them plain.

---

## 5. (b) Microcopy — do / don't

Each item is tied to a quoted source.

**Do**
- **Open with a plain verb sentence and stop.** "I make websites." (mxb) — Chirag's version: "I build enterprise products at work. I build small tools at home."
- **State a number only when it has a trace.** "More than 1 million readers" with a details link (pragmaticengineer) and "~600,000 times per month according to NPM" (Josh) both carry their receipts. Chirag's "hundreds of internal Amazon users" needs the real count from the resume, or it goes.
- **Keep "Live" and "In progress" as project states.** These are the honest labels; the reference set confirms plain status language ("My new hobby project" — Dan). "In progress" is a fact, not theater.
- **Keep "A project counts when a stranger can open it."** It is the best line on the site and the whole build-in-public thread in one sentence.
- **Keep "The meta-project: proof I can finish things."** It is a claim about himself, but it is checkable — the projects list on the same page is the evidence, exactly how antfu earns "passion" by listing shipped tools first.
- **Name the tools plainly.** "just me coding everything on my laptop" (levels) — Chirag's "with Claude in VS Code at work and with Cursor & Openclaw at home" is already at this level. Keep it.
- **Separate sections with headers, not prose.** mxb's about page runs "Work / Writing / Speaking / Offline" as four clear blocks. Chirag's home already does this ("Projects", "Writing") — the fix is in what sits inside the blocks, not the blocks themselves.

**Don't**
- **Don't put the employer on the home page.** VOICE.md rule 8, currently violated. Amazon belongs on the resume page, the way Gergely's work history lives on his own terms and leerob's employer is one clause, not the headline.
- **Don't claim scale without a trace.** "billion $ impact" is the same failure mode as "#1 newsletter" (pragmaticengineer) and "deeply researched" (Lenny) — a claim the reader must trust. Chirag's version is worse because the numbers sit in the first sentence.
- **Don't write "Coming soon".** VOICE.md rule 7, currently violated. Dan's "My new hobby project" is the alternative: label what exists. If the post isn't written, the section shows nothing.
- **Don't write "at the intersection of product thinking and hands-on engineering."** It is LinkedIn phrasing. The very next clause in the same paragraph is the honest version: "I run multi-agent pipelines, build crawlers, dashboards, and tools." Cut the first, keep the second.
- **Don't blend work and home in one paragraph.** VOICE.md rule 9, currently violated twice (home lead, about lead). leerob keeps "I work on ML at SpaceX…" and "I'm a husband to my much cooler wife" as separate sentences, separate registers. Copy that structure.
- **Don't use "passionate" or "passion" before the evidence.** antfu's "passion lies" works only because ten shipped projects precede it. Chirag's evidence is the projects list — the adjective stays out of the headline.
- **Don't copy the funnel register.** "Deeply researched … for product leaders, founders, and ambitious builders" (Lenny) is a storefront voice. Chirag sells nothing; the site's job is to be openable, not to convert.

---

## 6. (c) Revised bio structure — professional and personal, strictly separate

The rule, from the evidence: **work sentences answer "what do you do?", personal sentences answer "what do you build when nobody is paying?", and the two never share a sentence or a paragraph.** Every target that reads honest does this — leerob's two-sentence bio is the clearest case; Brian's one-sentence bio and mxb's four-header about page are the same move in different sizes.

**Home page — professional only, no company names (VOICE.md rule 8):**
- Line 1 (headline): "I build enterprise products at work. I build small tools at home."
- Line 2 (scope, traceable): the real counts — teams, users, markets — taken from the resume. If a number exists, use it; if it doesn't, this line is one sentence about the job ("I manage products for internal enterprise teams.").
- CTAs: Professional → Resume. Projects → Projects. (Already correct; keep.)
- No Amazon, no title, no dollar claim. All of that lives on the resume page, where the formal record belongs.

**Resume page — the formal record, unashamedly résumé-shaped:**
- Title, employer, dates, scope, numbers. This is where "Senior Technical Product Manager", Amazon, and the dollar figures have a home. The resume page is allowed to sound like a resume; the home page is not. This split is exactly what VOICE.md rule 8 and rule 9 point at.

**Projects page — personal / build-in-public:**
- Section header: "A project counts when a stranger can open it." — the rule as the label.
- Each project: name, state (Live / In progress), one plain sentence, link when the repo is open. No "coming soon", ever. (Dan's post-list is the model: title + one-line blurb + date.)
- This page is where Claude, Cursor, Openclaw, the Luxembourg crawler, and the market study live — the tools and the tinkering, all in one place, none of it touching the resume page.

**About page — the one place both halves appear, still in separate blocks (mxb's "Work / Writing / Speaking / Offline" shape):**
- Block 1, Work: what the day job is, in plain words, no company name. One or two sentences.
- Block 2, Personal: tools, Luxembourg, Luxembourgish, the build-in-public rule. One or two sentences.
- Block 3, The meta: "This site is the standing example — every project here reached a state a stranger could open and try." (Already written well; keep.)

**The one-sentence test:** if a sentence contains both a work fact and a home fact, split it. "I build enterprise products at work, and I build apps with Claude at home" fails the test; the two halves of that sentence are the two halves of the site.

---

## 7. Summary

The current copy scores **3/5** on honesty: real person, real projects, one great line, and a build-in-public thread that actually shows. What holds it back is exactly two sentences and one status label — the home lead (Amazon on the home page, a dollar claim with no trace, work and home fused in one 32-word tangle), the about "intersection" phrase, and the "Coming soon" writing item. The reference set shows the fix is not a rewrite of the whole site but a substitution: plain verb sentences (mxb), work and life in separate sentences (leerob), numbers only with traces (Gergely, Josh), blunt statuses (Dan), and difficulty said out loud (Josh). The voice law already contains all of these rules; the current copy breaks three of them in the first screen. Fix the lead, the about phrase, and the "Coming soon" label, and the site jumps to a 4 — the remaining point is difficulty admissions, which the projects pages can earn one honest line at a time.
