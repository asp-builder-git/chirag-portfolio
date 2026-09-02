#!/usr/bin/env node
/**
 * Generate design-lab-a11y-report.md from curated seeds.
 * Usage: npm run design:a11y
 */
import { writeFileSync } from "node:fs";
import { getSeedCatalog } from "../src/design/seeds.ts";
import { contrastRatio } from "../src/design/a11y.ts";

const catalog = getSeedCatalog();
const lines: string[] = [
  "# Design Lab — A11y Audit Report",
  "",
  `Generated: ${new Date().toISOString().slice(0, 10)}`,
  "",
  "Audits all 16 curated seeds for WCAG AA contrast (4.5:1 text, 3:1 large/muted).",
  "",
  "## Summary",
  "",
];

let passCount = 0;
let failCount = 0;

for (const { spec } of catalog) {
  const light = spec.colors.light;
  const dark = spec.colors.dark;

  const checks = [
    { label: "ink on bg (light)", ratio: contrastRatio(light.ink, light.bg), min: 4.5 },
    { label: "ink on surface (light)", ratio: contrastRatio(light.ink, light.surface), min: 4.5 },
    { label: "accent-text on surface (light)", ratio: contrastRatio(light.accentText, light.surface), min: 4.5 },
    { label: "muted on bg (light)", ratio: contrastRatio(light.muted, light.bg), min: 3 },
    { label: "ink on bg (dark)", ratio: contrastRatio(dark.ink, dark.bg), min: 4.5 },
    { label: "accent-text on surface (dark)", ratio: contrastRatio(dark.accentText, dark.surface), min: 4.5 },
  ];

  const failures = checks.filter((c) => c.ratio < c.min);
  if (failures.length === 0) passCount++;
  else failCount++;
}

lines.push(`| Metric | Value |`);
lines.push(`|--------|-------|`);
lines.push(`| Seeds audited | ${catalog.length} |`);
lines.push(`| Pass (all checks) | ${passCount} |`);
lines.push(`| Fail (≥1 check) | ${failCount} |`);
lines.push("");
lines.push("## Per-seed results");
lines.push("");

for (const { spec } of catalog) {
  const light = spec.colors.light;
  const dark = spec.colors.dark;

  lines.push(`### ${spec.seedId} — ${spec.paletteFamily} / ${spec.archetype}`);
  lines.push("");
  lines.push("| Check | Ratio | Min | Status |");
  lines.push("|-------|-------|-----|--------|");

  const rows = [
    ["ink on bg (light)", contrastRatio(light.ink, light.bg), 4.5],
    ["ink on surface (light)", contrastRatio(light.ink, light.surface), 4.5],
    ["accent on surface (light)", contrastRatio(light.accentText, light.surface), 4.5],
    ["muted on bg (light)", contrastRatio(light.muted, light.bg), 3],
    ["ink on bg (dark)", contrastRatio(dark.ink, dark.bg), 4.5],
    ["accent on surface (dark)", contrastRatio(dark.accentText, dark.surface), 4.5],
  ];

  for (const [label, ratio, min] of rows) {
    const r = ratio as number;
    const m = min as number;
    const status = r >= m ? "pass" : "**fail**";
    lines.push(`| ${label} | ${r.toFixed(2)}:1 | ${m}:1 | ${status} |`);
  }

  if (spec.a11yNotes.length > 0) {
    lines.push("");
    lines.push("Notes:");
    for (const note of spec.a11yNotes) {
      lines.push(`- ${note}`);
    }
  }
  lines.push("");
}

const outPath = new URL("../design-lab-a11y-report.md", import.meta.url);
writeFileSync(outPath, lines.join("\n"));
console.log(`Wrote ${outPath.pathname}`);
