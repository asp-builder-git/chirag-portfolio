/**
 * Self-contained a11y audit — no TS imports.
 * Run: node scripts/audit-standalone.mjs
 */
import { writeFileSync } from "node:fs";

// --- patterns ---
const VOWELS = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
function charSum(s) { let sum = 0; for (let i = 0; i < s.length; i++) sum += s.charCodeAt(i); return sum; }
function vowelRatio(s) { let c = 0; for (const ch of s) if (VOWELS.has(ch)) c++; return c / s.length; }
function digitDensity(s) { let c = 0; for (const ch of s) if (ch >= "0" && ch <= "9") c++; return c / s.length; }
function uppercaseRatio(s) { let c = 0; for (const ch of s) if (ch >= "A" && ch <= "Z") c++; return c / s.length; }
function maxRunLength(s) {
  let max = 1, run = 1;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) { run++; if (run > max) max = run; } else run = 1;
  }
  return max;
}
function hasTripleRepeat(s) { return /(.)\1{2}/.test(s); }
function hasAlternatingPattern(s) {
  if (s.length < 4) return false;
  for (let i = 0; i < s.length - 3; i++) {
    if (s[i] !== s[i + 1] && s[i] === s[i + 2] && s[i + 1] === s[i + 3]) return true;
  }
  return false;
}
function consonantClusterCount(s) {
  let count = 0, inCluster = false;
  for (const ch of s) {
    const isConsonant = /[a-zA-Z]/.test(ch) && !VOWELS.has(ch);
    if (isConsonant) { if (!inCluster) { count++; inCluster = true; } }
    else inCluster = false;
  }
  return count;
}
function pairwiseHueOffset(s) {
  let sum = 0;
  for (let i = 0; i < s.length - 1; i++) sum += s.charCodeAt(i) + s.charCodeAt(i + 1);
  return (sum % 121) - 60;
}
function zoneHash(s) { return charSum(s) % 997; }
function checksum(s) { return charSum(s) % 97; }
function seedId(seed) { return seed.slice(0, 8); }
function splitZones(seed) {
  return {
    a: seed.slice(0, 10), b: seed.slice(10, 20), c: seed.slice(20, 30), d: seed.slice(30, 40),
    e: seed.slice(40, 50), f: seed.slice(50, 60), g: seed.slice(60, 70), h: seed.slice(70, 80),
    i: seed.slice(80, 90), j: seed.slice(90, 100),
  };
}

// --- a11y ---
function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function relativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
function contrastRatio(fg, bg) {
  const [fr, fg2, fb] = hexToRgb(fg);
  const [br, bg2, bb] = hexToRgb(bg);
  const l1 = relativeLuminance(fr, fg2, fb);
  const l2 = relativeLuminance(br, bg2, bb);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((c) => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, "0")).join("");
}
function adjustLightness(hex, delta) {
  const [r, g, b] = hexToRgb(hex);
  const factor = 1 + delta;
  return rgbToHex(r * factor, g * factor, b * factor);
}
function ensureContrast(accent, surface, minRatio = 4.5, maxAttempts = 12) {
  let color = accent;
  let ratio = contrastRatio(color, surface);
  if (ratio >= minRatio) return { color };
  const direction = relativeLuminance(...hexToRgb(surface)) > 0.5 ? -1 : 1;
  for (let i = 0; i < maxAttempts; i++) {
    color = adjustLightness(color, direction * 0.08);
    ratio = contrastRatio(color, surface);
    if (ratio >= minRatio) return { color, note: `Accent nudged for WCAG AA (${ratio.toFixed(2)}:1 on surface)` };
  }
  return { color, note: `Accent contrast ${ratio.toFixed(2)}:1 — below AA after nudge` };
}
function auditPalette(colors) {
  const notes = [];
  const inkOnBg = contrastRatio(colors.ink, colors.bg);
  const inkOnSurface = contrastRatio(colors.ink, colors.surface);
  const accentOnSurface = contrastRatio(colors.accentText, colors.surface);
  const mutedOnBg = contrastRatio(colors.muted, colors.bg);
  if (inkOnBg < 4.5) notes.push(`Ink on bg: ${inkOnBg.toFixed(2)}:1 (fail)`);
  if (inkOnSurface < 4.5) notes.push(`Ink on surface: ${inkOnSurface.toFixed(2)}:1 (fail)`);
  if (accentOnSurface < 4.5) notes.push(`Accent text on surface: ${accentOnSurface.toFixed(2)}:1 (fail)`);
  if (mutedOnBg < 3) notes.push(`Muted on bg: ${mutedOnBg.toFixed(2)}:1 (fail large text)`);
  return notes;
}

// --- resolve ---
const PALETTE_FAMILIES = ["slate","warmCream","forest","ocean","ink","sand","rose","mint","lavender","charcoal","terracotta","steel"];
const ARCHETYPES = ["leerob", "paco", "mxb", "antfu", "brutalist"];
const BASE_PALETTES = {
  slate: { light: { bg: "#F8FAFC", surface: "#FFFFFF", ink: "#0F172A", muted: "#475569", hairline: "#E2E8F0" }, accentHue: 243 },
  warmCream: { light: { bg: "#FFFBF5", surface: "#FFFFFF", ink: "#1C1917", muted: "#78716C", hairline: "#E7E5E4" }, accentHue: 25 },
  forest: { light: { bg: "#F4F7F4", surface: "#FFFFFF", ink: "#1A2E1A", muted: "#4A5D4A", hairline: "#D4DDD4" }, accentHue: 142 },
  ocean: { light: { bg: "#F0F7FA", surface: "#FFFFFF", ink: "#0C1929", muted: "#4A6278", hairline: "#D1E0EA" }, accentHue: 205 },
  ink: { light: { bg: "#FAFAFA", surface: "#FFFFFF", ink: "#171717", muted: "#525252", hairline: "#E5E5E5" }, accentHue: 0 },
  sand: { light: { bg: "#FAF8F5", surface: "#FFFFFF", ink: "#292524", muted: "#78716C", hairline: "#E7E5E4" }, accentHue: 35 },
  rose: { light: { bg: "#FDF4F5", surface: "#FFFFFF", ink: "#1F1315", muted: "#6B4F52", hairline: "#F0D9DC" }, accentHue: 350 },
  mint: { light: { bg: "#F2FAF6", surface: "#FFFFFF", ink: "#0F1F17", muted: "#3D5A4A", hairline: "#D4EBE0" }, accentHue: 160 },
  lavender: { light: { bg: "#F7F5FC", surface: "#FFFFFF", ink: "#1A1625", muted: "#5C5470", hairline: "#E4DFF0" }, accentHue: 270 },
  charcoal: { light: { bg: "#F4F4F5", surface: "#FFFFFF", ink: "#18181B", muted: "#52525B", hairline: "#E4E4E7" }, accentHue: 220 },
  terracotta: { light: { bg: "#FBF6F3", surface: "#FFFFFF", ink: "#2C1810", muted: "#6B4F3F", hairline: "#EDD9CE" }, accentHue: 18 },
  steel: { light: { bg: "#F1F5F9", surface: "#FFFFFF", ink: "#0F172A", muted: "#64748B", hairline: "#CBD5E1" }, accentHue: 215 },
};
function hslToHex(h, s, l) {
  const hNorm = ((h % 360) + 360) % 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = lNorm - c / 2;
  let r = 0, g = 0, b = 0;
  if (hNorm < 60) [r, g, b] = [c, x, 0];
  else if (hNorm < 120) [r, g, b] = [x, c, 0];
  else if (hNorm < 180) [r, g, b] = [0, c, x];
  else if (hNorm < 240) [r, g, b] = [0, x, c];
  else if (hNorm < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (n) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function deriveAccent(hue, warmBias) { return hslToHex(hue, 45 + warmBias * 15, 42); }
function deriveDarkPalette(family, accent, accentText, highContrast) {
  const base = BASE_PALETTES[family].light;
  if (highContrast) return { bg: "#000000", surface: "#0A0A0A", ink: "#FFFFFF", muted: "#A3A3A3", hairline: "#333333", accent, accentText };
  const darkBgs = {
    slate: { bg: "#0F172A", surface: "#1E293B" }, warmCream: { bg: "#1C1917", surface: "#292524" },
    forest: { bg: "#0F1A0F", surface: "#1A2E1A" }, ocean: { bg: "#0C1929", surface: "#152A40" },
    ink: { bg: "#0A0A0A", surface: "#171717" }, sand: { bg: "#1C1917", surface: "#292524" },
    rose: { bg: "#1A1012", surface: "#2A1A1E" }, mint: { bg: "#0A1510", surface: "#142820" },
    lavender: { bg: "#12101A", surface: "#1E1A2E" }, charcoal: { bg: "#09090B", surface: "#18181B" },
    terracotta: { bg: "#1A1008", surface: "#2C1810" }, steel: { bg: "#0F172A", surface: "#1E293B" },
  };
  const dark = darkBgs[family] ?? { bg: "#0F172A", surface: "#1E293B" };
  return { bg: dark.bg, surface: dark.surface, ink: "#F1F5F9", muted: "#94A3B8", hairline: "#334155", accent, accentText };
}
function resolveAccent(zoneB, family) {
  const base = BASE_PALETTES[family];
  const offset = pairwiseHueOffset(zoneB);
  const warm = vowelRatio(zoneB);
  const hue = base.accentHue + offset + (warm > 0.4 ? 10 : -5);
  return { accent: deriveAccent(hue, warm), accentText: deriveAccent(hue, warm * 0.5) };
}
function resolveDesign(seed) {
  const zones = splitZones(seed);
  const a11yNotes = [];
  const paletteFamily = PALETTE_FAMILIES[charSum(zones.a) % 12];
  const highContrast = hasAlternatingPattern(zones.c);
  const { accent: rawAccent, accentText: rawAccentText } = resolveAccent(zones.b, paletteFamily);
  const baseLight = BASE_PALETTES[paletteFamily].light;
  const accentResult = ensureContrast(rawAccent, baseLight.surface);
  const accentTextResult = ensureContrast(rawAccentText, baseLight.surface);
  if (accentResult.note) a11yNotes.push(accentResult.note);
  if (accentTextResult.note) a11yNotes.push(accentTextResult.note);
  const lightColors = { ...baseLight, accent: accentResult.color, accentText: accentTextResult.color };
  const darkAccent = ensureContrast(rawAccent, "#1E293B");
  const darkAccentText = ensureContrast(rawAccentText, "#1E293B");
  if (darkAccent.note) a11yNotes.push(`Dark: ${darkAccent.note}`);
  if (darkAccentText.note) a11yNotes.push(`Dark: ${darkAccentText.note}`);
  const darkColors = deriveDarkPalette(paletteFamily, darkAccent.color, darkAccentText.color, highContrast);
  a11yNotes.push(...auditPalette(lightColors));
  a11yNotes.push(...auditPalette(darkColors).map((n) => `Dark: ${n}`));
  const archetype = ARCHETYPES[zoneHash(zones.i) % 5];
  return { seedId: seedId(seed), paletteFamily, archetype, highContrast, colors: { light: lightColors, dark: darkColors }, a11yNotes };
}

// --- seeds ---
function generateSeed(index) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let seed = "", state = (index * 7919 + 104729) >>> 0;
  for (let i = 0; i < 100; i++) { state = (state * 1103515245 + 12345) >>> 0; seed += chars[state % chars.length]; }
  return seed;
}
const CURATED_INDICES = [1, 7, 13, 23, 37, 42, 58, 71, 89, 103, 127, 211, 333, 512, 777, 999];
const CURATED_SEEDS = CURATED_INDICES.map(generateSeed);

const AA = 4.5;
const audits = CURATED_SEEDS.map((seed, i) => {
  const spec = resolveDesign(seed);
  const { light, dark } = spec.colors;
  const lightR = { inkOnBg: contrastRatio(light.ink, light.bg), inkOnSurface: contrastRatio(light.ink, light.surface), accentTextOnSurface: contrastRatio(light.accentText, light.surface) };
  const darkR = { inkOnBg: contrastRatio(dark.ink, dark.bg), inkOnSurface: contrastRatio(dark.ink, dark.surface), accentTextOnSurface: contrastRatio(dark.accentText, dark.surface) };
  const all = [lightR.inkOnBg, lightR.inkOnSurface, lightR.accentTextOnSurface, darkR.inkOnBg, darkR.inkOnSurface, darkR.accentTextOnSurface];
  const failures = spec.a11yNotes.filter((n) => n.includes("(fail)") || n.includes("below AA after nudge"));
  const pass = all.every((r) => r >= AA) && failures.length === 0;
  return { index: i + 1, ...spec, lightR, darkR, minContrast: Math.min(...all), pass, failures,
    nudgeNotes: spec.a11yNotes.filter((n) => n.includes("Accent nudged")),
    nudgeFailures: spec.a11yNotes.filter((n) => n.includes("below AA after nudge")) };
});

const passing = audits.filter((a) => a.pass);
const failing = audits.filter((a) => !a.pass);
const fmt = (n) => n.toFixed(2);

const lines = [
  "# Design Lab — Accessibility Audit Report",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Overview",
  "",
  `- **Seeds audited:** ${audits.length}`,
  `- **Passing:** ${passing.length}`,
  `- **Failing:** ${failing.length}`,
  `- **WCAG AA threshold (normal text):** ${AA}:1`,
  "",
  "Contrast checks per seed (light + dark): ink on bg, ink on surface, accentText on surface.",
  "",
  "## Summary Table",
  "",
  "| # | Seed ID | Palette | HC | Pass | Min ratio | Light ink/bg | Light ink/surf | Light accent/surf | Dark ink/bg | Dark ink/surf | Dark accent/surf |",
  "|---|---------|---------|----|------|-----------|--------------|----------------|-------------------|-------------|---------------|------------------|",
];

for (const a of audits) {
  lines.push(
    `| ${a.index} | \`${a.seedId}\` | ${a.paletteFamily} | ${a.highContrast ? "yes" : "no"} | **${a.pass ? "PASS" : "FAIL"}** | ${fmt(a.minContrast)}:1 | ${fmt(a.lightR.inkOnBg)} | ${fmt(a.lightR.inkOnSurface)} | ${fmt(a.lightR.accentTextOnSurface)} | ${fmt(a.darkR.inkOnBg)} | ${fmt(a.darkR.inkOnSurface)} | ${fmt(a.darkR.accentTextOnSurface)} |`
  );
}

const withNudges = audits.filter((a) => a.a11yNotes.some((n) => n.includes("Accent nudged")));
const withNudgeFailures = audits.filter((a) => a.a11yNotes.some((n) => n.includes("below AA after nudge")));

lines.push("", "## ensureContrast Nudge Results", "");
if (withNudges.length === 0) {
  lines.push("No seeds required accent nudging — all accent colors met AA on first pass.");
} else {
  lines.push(`**${withNudges.length}** seed(s) had accent colors nudged successfully:`);
  lines.push("");
  for (const a of withNudges) {
    const notes = a.a11yNotes.filter((n) => n.includes("Accent nudged"));
    lines.push(`- \`${a.seedId}\` (${a.paletteFamily}): ${notes.join("; ")}`);
  }
}
lines.push("");
if (withNudgeFailures.length === 0) {
  lines.push("No seeds failed accent nudging — `ensureContrast` resolved all sub-threshold accents within 12 attempts.");
} else {
  lines.push(`**${withNudgeFailures.length}** seed(s) still below AA after nudging:`);
  lines.push("");
  for (const a of withNudgeFailures) {
    const notes = a.a11yNotes.filter((n) => n.includes("below AA after nudge"));
    lines.push(`- \`${a.seedId}\` (${a.paletteFamily}): ${notes.join("; ")}`);
  }
}

lines.push("", "## Seeds Failing WCAG AA After Nudging", "");
if (failing.length === 0) {
  lines.push("All 16 curated seeds pass WCAG AA contrast requirements.");
} else {
  for (const a of failing) {
    lines.push(`### \`${a.seedId}\` — ${a.paletteFamily}`);
    lines.push("");
    if (a.failures.length) {
      lines.push("**a11yNotes failures:**");
      for (const f of a.failures) lines.push(`- ${f}`);
    }
    lines.push("");
  }
}

lines.push("", "## Recommendations", "");
if (failing.length === 0 && withNudgeFailures.length === 0) {
  lines.push(
    "No action required. Base palettes and `ensureContrast` nudging keep all curated seeds within WCAG AA for the audited text pairings."
  );
} else {
  if (withNudgeFailures.length) {
    lines.push("- Increase `maxAttempts` in `ensureContrast` or use HSL lightness steps for stubborn accent hues.");
    lines.push("- Clamp accent saturation/lightness in `deriveAccent` so generated accents start closer to AA.");
  }
}

lines.push("", "## Per-Seed a11yNotes", "");
for (const a of audits) {
  lines.push(`### \`${a.seedId}\` (${a.paletteFamily})`, "");
  if (a.a11yNotes.length === 0) lines.push("_No notes — clean pass._");
  else for (const n of a.a11yNotes) lines.push(`- ${n}`);
  lines.push("");
}

const reportPath = "design-lab-a11y-report.md";
writeFileSync(reportPath, lines.join("\n"), "utf8");
writeFileSync("audit-results.json", JSON.stringify(audits, null, 2));
console.log(`Report written to ${reportPath}`);
console.log(JSON.stringify({ passing: passing.length, failing: failing.length }));
