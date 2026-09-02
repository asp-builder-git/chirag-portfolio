#!/usr/bin/env node
/**
 * Audit curated design seeds for WCAG AA contrast.
 * Usage: node --experimental-strip-types scripts/design-a11y-audit.ts
 */
import { writeFileSync } from "node:fs";
import { contrastRatio } from "../src/design/a11y.ts";
import { CURATED_SEEDS } from "../src/design/seeds.ts";
import { resolveDesign } from "../src/design/resolve.ts";

const AA_NORMAL = 4.5;

interface SeedAudit {
  index: number;
  seedId: string;
  palette: string;
  archetype: string;
  highContrast: boolean;
  light: {
    inkOnBg: number;
    inkOnSurface: number;
    accentTextOnSurface: number;
  };
  dark: {
    inkOnBg: number;
    inkOnSurface: number;
    accentTextOnSurface: number;
  };
  minContrast: number;
  a11yNotes: string[];
  failures: string[];
  nudgeNotes: string[];
  nudgeFailures: string[];
  pass: boolean;
}

function isFailureNote(note: string): boolean {
  return note.includes("(fail)") || note.includes("below AA after nudge");
}

function auditSeed(seed: string, index: number): SeedAudit {
  const spec = resolveDesign(seed);
  const { light, dark } = spec.colors;

  const lightRatios = {
    inkOnBg: contrastRatio(light.ink, light.bg),
    inkOnSurface: contrastRatio(light.ink, light.surface),
    accentTextOnSurface: contrastRatio(light.accentText, light.surface),
  };

  const darkRatios = {
    inkOnBg: contrastRatio(dark.ink, dark.bg),
    inkOnSurface: contrastRatio(dark.ink, dark.surface),
    accentTextOnSurface: contrastRatio(dark.accentText, dark.surface),
  };

  const allRatios = [
    lightRatios.inkOnBg,
    lightRatios.inkOnSurface,
    lightRatios.accentTextOnSurface,
    darkRatios.inkOnBg,
    darkRatios.inkOnSurface,
    darkRatios.accentTextOnSurface,
  ];

  const minContrast = Math.min(...allRatios);
  const failures = spec.a11yNotes.filter(isFailureNote);
  const nudgeNotes = spec.a11yNotes.filter((n) => n.includes("Accent nudged for WCAG AA"));
  const nudgeFailures = spec.a11yNotes.filter((n) => n.includes("below AA after nudge"));

  const ratioPass = allRatios.every((r) => r >= AA_NORMAL);
  const pass = ratioPass && failures.length === 0;

  return {
    index,
    seedId: spec.seedId,
    palette: spec.paletteFamily,
    archetype: spec.archetype,
    highContrast: spec.highContrast,
    light: lightRatios,
    dark: darkRatios,
    minContrast,
    a11yNotes: spec.a11yNotes,
    failures,
    nudgeNotes,
    nudgeFailures,
    pass,
  };
}

const audits = CURATED_SEEDS.map((seed, i) => auditSeed(seed, i + 1));
const passing = audits.filter((a) => a.pass);
const failing = audits.filter((a) => !a.pass);

function fmt(n: number): string {
  return n.toFixed(2);
}

const lines: string[] = [
  "# Design Lab — Accessibility Audit Report",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Overview",
  "",
  `- **Seeds audited:** ${audits.length}`,
  `- **Passing:** ${passing.length}`,
  `- **Failing:** ${failing.length}`,
  `- **WCAG AA threshold (normal text):** ${AA_NORMAL}:1`,
  "",
  "Contrast checks per seed (light + dark):",
  "",
  "1. Ink on background",
  "2. Ink on surface",
  "3. Accent text on surface",
  "",
  "## Summary Table",
  "",
  "| # | Seed ID | Palette | Archetype | HC | Pass | Min ratio | Light ink/bg | Light ink/surf | Light accent/surf | Dark ink/bg | Dark ink/surf | Dark accent/surf |",
  "|---|---------|---------|-----------|----|------|-----------|--------------|----------------|-------------------|-------------|---------------|------------------|",
];

for (const a of audits) {
  lines.push(
    `| ${a.index} | \`${a.seedId}\` | ${a.palette} | ${a.archetype} | ${a.highContrast ? "yes" : "no"} | **${a.pass ? "PASS" : "FAIL"}** | ${fmt(a.minContrast)}:1 | ${fmt(a.light.inkOnBg)} | ${fmt(a.light.inkOnSurface)} | ${fmt(a.light.accentTextOnSurface)} | ${fmt(a.dark.inkOnBg)} | ${fmt(a.dark.inkOnSurface)} | ${fmt(a.dark.accentTextOnSurface)} |`
  );
}

lines.push("");
lines.push("## ensureContrast Nudge Results");
lines.push("");

const withNudges = audits.filter((a) => a.nudgeNotes.length > 0);
const withNudgeFailures = audits.filter((a) => a.nudgeFailures.length > 0);

if (withNudges.length === 0) {
  lines.push("No seeds required accent nudging — all accent colors met AA on first pass.");
} else {
  lines.push(`**${withNudges.length}** seed(s) had accent colors nudged successfully:`);
  lines.push("");
  for (const a of withNudges) {
    lines.push(`- \`${a.seedId}\` (${a.palette}): ${a.nudgeNotes.join("; ")}`);
  }
}

lines.push("");

if (withNudgeFailures.length === 0) {
  lines.push("No seeds failed accent nudging — `ensureContrast` resolved all sub-threshold accents within 12 attempts.");
} else {
  lines.push(`**${withNudgeFailures.length}** seed(s) still below AA after nudging:`);
  lines.push("");
  for (const a of withNudgeFailures) {
    lines.push(`- \`${a.seedId}\` (${a.palette}): ${a.nudgeFailures.join("; ")}`);
  }
}

lines.push("");
lines.push("## Seeds Failing WCAG AA After Nudging");
lines.push("");

if (failing.length === 0) {
  lines.push("All 16 curated seeds pass WCAG AA contrast requirements.");
} else {
  for (const a of failing) {
    lines.push(`### \`${a.seedId}\` — ${a.palette} / ${a.archetype}`);
    lines.push("");
    lines.push("| Check | Ratio | Status |");
    lines.push("|-------|-------|--------|");
    const checks: [string, number][] = [
      ["Light ink on bg", a.light.inkOnBg],
      ["Light ink on surface", a.light.inkOnSurface],
      ["Light accent text on surface", a.light.accentTextOnSurface],
      ["Dark ink on bg", a.dark.inkOnBg],
      ["Dark ink on surface", a.dark.inkOnSurface],
      ["Dark accent text on surface", a.dark.accentTextOnSurface],
    ];
    for (const [label, ratio] of checks) {
      lines.push(`| ${label} | ${fmt(ratio)}:1 | ${ratio >= AA_NORMAL ? "pass" : "**fail**"} |`);
    }
    if (a.failures.length > 0) {
      lines.push("");
      lines.push("**a11yNotes failures:**");
      for (const f of a.failures) {
        lines.push(`- ${f}`);
      }
    }
    if (a.a11yNotes.length > 0) {
      lines.push("");
      lines.push("**All a11yNotes:**");
      for (const n of a.a11yNotes) {
        lines.push(`- ${n}`);
      }
    }
    lines.push("");
  }
}

lines.push("## Recommendations");
lines.push("");

if (failing.length === 0 && withNudgeFailures.length === 0) {
  lines.push(
    "No action required. Base palettes and `ensureContrast` nudging keep all curated seeds within WCAG AA for the audited text pairings."
  );
} else {
  if (withNudgeFailures.length > 0) {
    lines.push(
      "- Increase `maxAttempts` in `ensureContrast` or switch from multiplicative lightness adjustment to HSL-based lightness steps for stubborn accent hues."
    );
    lines.push(
      "- Consider clamping accent saturation/lightness ranges in `deriveAccent` so generated accents start closer to AA-compliant values."
    );
  }
  const mutedFails = audits.flatMap((a) =>
    a.failures.filter((f) => f.includes("Muted on bg")).map((f) => ({ id: a.seedId, note: f }))
  );
  if (mutedFails.length > 0) {
    lines.push("- Review `muted` token contrast on background (large-text AA is 3:1). Failing seeds:");
    for (const m of mutedFails) {
      lines.push(`  - \`${m.id}\`: ${m.note}`);
    }
  }
  const inkFails = failing.filter(
    (a) =>
      a.light.inkOnBg < AA_NORMAL ||
      a.light.inkOnSurface < AA_NORMAL ||
      a.dark.inkOnBg < AA_NORMAL ||
      a.dark.inkOnSurface < AA_NORMAL
  );
  if (inkFails.length > 0) {
    lines.push("- Ink contrast failures indicate base palette tuning needed in `BASE_PALETTES` or `deriveDarkPalette`.");
  }
}

lines.push("");
lines.push("## Per-Seed a11yNotes");
lines.push("");

for (const a of audits) {
  lines.push(`### \`${a.seedId}\` (${a.palette})`);
  lines.push("");
  if (a.a11yNotes.length === 0) {
    lines.push("_No notes — clean pass._");
  } else {
    for (const n of a.a11yNotes) {
      lines.push(`- ${n}`);
    }
  }
  lines.push("");
}

const reportPath = "design-lab-a11y-report.md";
writeFileSync(reportPath, lines.join("\n"), "utf8");

console.log(`Report written to ${reportPath}`);
console.log(`Passing: ${passing.length} / ${audits.length}`);
console.log(`Failing: ${failing.length} / ${audits.length}`);
