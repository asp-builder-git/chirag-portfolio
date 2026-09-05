## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Voice

**READ `VOICE.md` before writing any site copy.** It defines Chirag's voice — first person, no buzzwords, grounded in reality, numbers over adjectives. All generated text follows it. It's a living doc: Chirag's feedback gets folded in every session.

## Pipeline (mandatory)

**NO direct pushes to main. NO merging without review.** Read SKILL.md + gates.md. Every change: branch → `npm run build` passes → review summary for Chirag → his approval → merge → verify live URL. Sub-agents must never push to main or merge without Chirag's recorded approval.

## Model routing (mandatory)

Use the right tier so we don't rework. Details: `.cursor/rules/model-routing.mdc`.

- Prefixes: `[precise]` / `[opus]` = max care; `[deep]` = complex reasoning; no prefix = default only for low-risk work.
- **Auto-elevate to precise** for theme/dark mode, Appearance/playground chrome, live prod bugs, design-token mismatches — even without a prefix.
- Subagents: UI/theme/prod bugs → `generalPurpose` + `inherit` (never `composer-2.5-fast`). Git/ship → `shell`. Broad search → `explore`.
- Interactive chrome is not done until the control is verified; `npm run build` alone is insufficient.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
