# Repo backlog — structure / process / scale

Ongoing work queue for repo organization, structure, and process (orthogonal to [M6-PLAN.md](M6-PLAN.md) product IA/content).

**Structure truth:** [`docs/ORG-BLUEPRINT.md`](docs/ORG-BLUEPRINT.md) — desired-state architecture. Read it before adding chrome, theme, nav, layout, or CSS.

### How to use

1. Add new items under **Active** with an ID, description, and accept criteria.
2. Check them off in the same PR that ships the work.
3. Cite IDs in `REVIEW.md` (e.g. `ORG-7.1`).
4. **Pipeline:** branch → build → REVIEW → Chirag approval → merge → G5. No direct pushes to main.

ID prefix convention: `ORG-N.M` for structure/process items (next free series after completed ORG-0–6 is **ORG-7**). Use other prefixes if useful (`PROC-`, `CI-`, etc.) — keep IDs unique and citeable.

---

## Active

_None yet. Copy the template below when adding work._

### Template

```markdown
## ORG-N — Short title

- [ ] ORG-N.1 Description
- [ ] ORG-N.2 …

**Accept:** Concrete pass/fail criteria for Chirag and agents.
```

---

## Completed (ORG-0–6, [PR #11](https://github.com/asp-builder-git/chirag-portfolio/pull/11))

Organization-scale roadmap shipped 2026-09-07 (`chore/org-scale-roadmap`). G5 theme click-pass confirmed 2026-09-08.

| Epic | Outcome (one line) |
|------|--------------------|
| ORG-0 / 0b | Backlog + package identity + agent org rules |
| ORG-1 | `BaseDocument` → Site/Lab layouts; single `nav.ts` |
| ORG-2 | `styles/production` vs `styles/lab` |
| ORG-3 | Shared theme/appearance scripts + CI beyond build |
| ORG-4 | Content collections (`projects`, writing schema) |
| ORG-5 | Component taxonomy; HomeContent by variant |
| ORG-6 | Docs process/archive; aliases; meta hygiene |

Full checklist: [`docs/archive/ORG-0-6.md`](docs/archive/ORG-0-6.md). REVIEW narrative: top of [`REVIEW.md`](REVIEW.md).
