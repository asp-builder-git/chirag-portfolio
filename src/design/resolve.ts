import type {
  Archetype,
  ButtonVariant,
  ButtonShape,
  DesignSpec,
  PaletteColors,
  PaletteFamily,
  PillarLayout,
  RadiusMode,
  ShadowSpec,
} from "./types";
import { getThemeOverride, resolveCreativeProfile } from "./creative";
import {
  getFontStacks,
  heroScaleVars,
  resolveButtonShape,
  resolveCtaLayout,
  resolveFontPairing,
  resolveHeroLayout,
  resolveHeroScale,
  resolveInteraction,
  resolveLabelStyle,
  resolveMetricLayout,
  resolveNavStyle,
  resolveProjectsLayout,
  resolveSectionStyle,
  resolveTextAlign,
} from "./language";
import { auditPalette, ensureContrast } from "./a11y";
import {
  charSum,
  checksum,
  consonantClusterCount,
  digitDensity,
  hasAlternatingPattern,
  hasTripleRepeat,
  maxRunLength,
  pairwiseHueOffset,
  seedId,
  splitZones,
  uppercaseRatio,
  vowelRatio,
  zoneHash,
} from "./patterns";

const PALETTE_FAMILIES: PaletteFamily[] = [
  "slate",
  "warmCream",
  "forest",
  "ocean",
  "ink",
  "sand",
  "rose",
  "mint",
  "lavender",
  "charcoal",
  "terracotta",
  "steel",
];

const ARCHETYPES: Archetype[] = ["leerob", "paco", "mxb", "antfu", "brutalist"];

/** Base palettes — light mode values */
const BASE_PALETTES: Record<
  PaletteFamily,
  { light: Omit<PaletteColors, "accent" | "accentText">; accentHue: number }
> = {
  slate: {
    light: { bg: "#F8FAFC", surface: "#FFFFFF", ink: "#0F172A", muted: "#475569", hairline: "#E2E8F0" },
    accentHue: 243,
  },
  warmCream: {
    light: { bg: "#FFFBF5", surface: "#FFFFFF", ink: "#1C1917", muted: "#78716C", hairline: "#E7E5E4" },
    accentHue: 25,
  },
  forest: {
    light: { bg: "#F4F7F4", surface: "#FFFFFF", ink: "#1A2E1A", muted: "#4A5D4A", hairline: "#D4DDD4" },
    accentHue: 142,
  },
  ocean: {
    light: { bg: "#F0F7FA", surface: "#FFFFFF", ink: "#0C1929", muted: "#4A6278", hairline: "#D1E0EA" },
    accentHue: 205,
  },
  ink: {
    light: { bg: "#FAFAFA", surface: "#FFFFFF", ink: "#171717", muted: "#525252", hairline: "#E5E5E5" },
    accentHue: 0,
  },
  sand: {
    light: { bg: "#FAF8F5", surface: "#FFFFFF", ink: "#292524", muted: "#78716C", hairline: "#E7E5E4" },
    accentHue: 35,
  },
  rose: {
    light: { bg: "#FDF4F5", surface: "#FFFFFF", ink: "#1F1315", muted: "#6B4F52", hairline: "#F0D9DC" },
    accentHue: 350,
  },
  mint: {
    light: { bg: "#F2FAF6", surface: "#FFFFFF", ink: "#0F1F17", muted: "#3D5A4A", hairline: "#D4EBE0" },
    accentHue: 160,
  },
  lavender: {
    light: { bg: "#F7F5FC", surface: "#FFFFFF", ink: "#1A1625", muted: "#5C5470", hairline: "#E4DFF0" },
    accentHue: 270,
  },
  charcoal: {
    light: { bg: "#F4F4F5", surface: "#FFFFFF", ink: "#18181B", muted: "#52525B", hairline: "#E4E4E7" },
    accentHue: 220,
  },
  terracotta: {
    light: { bg: "#FBF6F3", surface: "#FFFFFF", ink: "#2C1810", muted: "#6B4F3F", hairline: "#EDD9CE" },
    accentHue: 18,
  },
  steel: {
    light: { bg: "#F1F5F9", surface: "#FFFFFF", ink: "#0F172A", muted: "#64748B", hairline: "#CBD5E1" },
    accentHue: 215,
  },
};

function hslToHex(h: number, s: number, l: number): string {
  const hNorm = ((h % 360) + 360) % 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0,
    g = 0,
    b = 0;
  if (hNorm < 60) [r, g, b] = [c, x, 0];
  else if (hNorm < 120) [r, g, b] = [x, c, 0];
  else if (hNorm < 180) [r, g, b] = [0, c, x];
  else if (hNorm < 240) [r, g, b] = [0, x, c];
  else if (hNorm < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function deriveAccent(hue: number, warmBias: number): string {
  const sat = 45 + warmBias * 15;
  const light = 42;
  return hslToHex(hue, sat, light);
}

function deriveDarkPalette(
  family: PaletteFamily,
  accent: string,
  accentText: string,
  highContrast: boolean
): PaletteColors {
  const base = BASE_PALETTES[family].light;
  if (highContrast) {
    return {
      bg: "#000000",
      surface: "#0A0A0A",
      ink: "#FFFFFF",
      muted: "#A3A3A3",
      hairline: "#333333",
      accent,
      accentText,
    };
  }

  const darkBgs: Partial<Record<PaletteFamily, { bg: string; surface: string }>> = {
    slate: { bg: "#0F172A", surface: "#1E293B" },
    warmCream: { bg: "#1C1917", surface: "#292524" },
    forest: { bg: "#0F1A0F", surface: "#1A2E1A" },
    ocean: { bg: "#0C1929", surface: "#152A40" },
    ink: { bg: "#0A0A0A", surface: "#171717" },
    sand: { bg: "#1C1917", surface: "#292524" },
    rose: { bg: "#1A1012", surface: "#2A1A1E" },
    mint: { bg: "#0A1510", surface: "#142820" },
    lavender: { bg: "#12101A", surface: "#1E1A2E" },
    charcoal: { bg: "#09090B", surface: "#18181B" },
    terracotta: { bg: "#1A1008", surface: "#2C1810" },
    steel: { bg: "#0F172A", surface: "#1E293B" },
  };

  const dark = darkBgs[family] ?? { bg: "#0F172A", surface: "#1E293B" };
  return {
    bg: dark.bg,
    surface: dark.surface,
    ink: "#F1F5F9",
    muted: "#94A3B8",
    hairline: "#334155",
    accent,
    accentText,
  };
}

function resolvePaletteFamily(zoneA: string): PaletteFamily {
  return PALETTE_FAMILIES[charSum(zoneA) % 12];
}

function resolveAccent(zoneB: string, family: PaletteFamily): { accent: string; accentText: string } {
  const base = BASE_PALETTES[family];
  const offset = pairwiseHueOffset(zoneB);
  const warm = vowelRatio(zoneB);
  const hue = base.accentHue + offset + (warm > 0.4 ? 10 : -5);
  const accent = deriveAccent(hue, warm);
  const accentText = deriveAccent(hue, warm * 0.5);
  return { accent, accentText };
}

function resolveShadows(zoneD: string): ShadowSpec {
  const run = maxRunLength(zoneD);
  const depth = Math.min(3, Math.max(0, run - 1)) as 0 | 1 | 2 | 3;
  const blurSpread = 4 + Math.round(uppercaseRatio(zoneD) * 12);
  const colored = hasTripleRepeat(zoneD);
  return { depth, blurSpread, colored };
}

function resolveButtonVariant(zoneE: string): ButtonVariant {
  const first = zoneE[0];
  if (first >= "0" && first <= "9") return "filled";
  if (first >= "A" && first <= "Z") return "outline";
  return "ghost";
}

function resolveRadius(zoneF: string): { mode: RadiusMode; btn: number; card: number } {
  const modeIndex = charSum(zoneF) % 4;
  const modes: RadiusMode[] = ["sharp", "subtle", "soft", "mixed"];
  const mode = modes[modeIndex];
  switch (mode) {
    case "sharp":
      return { mode, btn: 0, card: 0 };
    case "subtle":
      return { mode, btn: 6, card: 6 };
    case "soft":
      return { mode, btn: 8, card: 12 };
    case "mixed":
      return { mode, btn: 6, card: 12 };
  }
}

function resolveTypeScale(zoneG: string): { scale: number; displayWeight: number } {
  const clusters = consonantClusterCount(zoneG);
  const scales = [1.2, 1.25, 1.333];
  const scale = scales[clusters % 3];
  const vowels = Math.round(vowelRatio(zoneG) * 10);
  const displayWeight = vowels > 5 ? 400 : 500;
  return { scale, displayWeight };
}

function resolveLayout(zoneH: string): { spaceSection: number; pillarLayout: PillarLayout } {
  const density = digitDensity(zoneH);
  const spaceSection = 0.85 + density * 0.4;
  const pillarLayout: PillarLayout = charSum(zoneH) % 2 === 0 ? "grid" : "stack";
  return { spaceSection, pillarLayout };
}

function resolveArchetype(zoneI: string): Archetype {
  return ARCHETYPES[zoneHash(zoneI) % 5];
}

function applyArchetypeModifiers(
  archetype: Archetype,
  spec: Partial<DesignSpec>
): Partial<DesignSpec> {
  const mods: Partial<DesignSpec> = {};
  switch (archetype) {
    case "leerob":
      mods.containerMax = "44rem";
      mods.lineHeight = 1.6;
      mods.spaceSection = (spec.spaceSection ?? 1) * 1.1;
      break;
    case "paco":
      mods.containerMax = "48rem";
      mods.lineHeight = 1.55;
      break;
    case "mxb":
      mods.containerMax = "42rem";
      mods.lineHeight = 1.5;
      break;
    case "antfu":
      mods.containerMax = "38rem";
      mods.lineHeight = 1.45;
      mods.spaceSection = (spec.spaceSection ?? 1) * 0.9;
      break;
    case "brutalist":
      mods.containerMax = "40rem";
      mods.radiusBtn = 0;
      mods.radiusCard = 0;
      mods.radiusMode = "sharp";
      mods.lineHeight = 1.4;
      mods.buttonShape = "square";
      break;
  }
  return mods;
}

function applyConflictRules(
  archetype: Archetype,
  shadows: ShadowSpec,
  radiusMode: RadiusMode
): { shadows: ShadowSpec; notes: string[] } {
  const notes: string[] = [];
  let s = { ...shadows };

  if (archetype === "brutalist" && s.depth > 0) {
    s = { ...s, depth: 0 };
    notes.push("Brutalist archetype: shadows disabled");
  }

  if (radiusMode === "sharp" && s.colored) {
    s = { ...s, colored: false };
    notes.push("Sharp radius: colored shadow downgraded to neutral");
  }

  return { shadows: s, notes };
}

export function resolveDesign(seed: string): DesignSpec {
  const zones = splitZones(seed);
  const a11yNotes: string[] = [];

  const paletteFamily = resolvePaletteFamily(zones.a);
  const highContrast = hasAlternatingPattern(zones.c);
  const { accent: rawAccent, accentText: rawAccentText } = resolveAccent(zones.b, paletteFamily);

  const baseLight = BASE_PALETTES[paletteFamily].light;
  const accentResult = ensureContrast(rawAccent, baseLight.surface);
  const accentTextResult = ensureContrast(rawAccentText, baseLight.surface);
  if (accentResult.note) a11yNotes.push(accentResult.note);
  if (accentTextResult.note) a11yNotes.push(accentTextResult.note);

  const lightColors: PaletteColors = {
    ...baseLight,
    accent: accentResult.color,
    accentText: accentTextResult.color,
  };

  const darkAccent = ensureContrast(rawAccent, "#1E293B");
  const darkAccentText = ensureContrast(rawAccentText, "#1E293B");
  if (darkAccent.note) a11yNotes.push(`Dark: ${darkAccent.note}`);
  if (darkAccentText.note) a11yNotes.push(`Dark: ${darkAccentText.note}`);

  const darkColors = deriveDarkPalette(
    paletteFamily,
    darkAccent.color,
    darkAccentText.color,
    highContrast
  );

  a11yNotes.push(...auditPalette(lightColors));
  a11yNotes.push(...auditPalette(darkColors).map((n) => `Dark: ${n}`));

  let shadows = resolveShadows(zones.d);
  const buttonVariant = resolveButtonVariant(zones.e);
  const buttonShape = resolveButtonShape(zones.e);
  const ctaLayout = resolveCtaLayout(zones.e);
  const { mode: radiusMode, btn: radiusBtnBase, card: radiusCard } = resolveRadius(zones.f);
  let radiusBtn = radiusBtnBase;
  if (buttonShape === "pill") radiusBtn = 999;
  if (buttonShape === "square") radiusBtn = 0;
  const fontPairing = resolveFontPairing(zones.g);
  const labelStyle = resolveLabelStyle(zones.g);
  const { scale: typeScale, displayWeight } = resolveTypeScale(zones.g);
  const { spaceSection, pillarLayout } = resolveLayout(zones.h);
  const heroLayout = resolveHeroLayout(zones.h);
  const textAlign = resolveTextAlign(zones.h);
  const archetype = resolveArchetype(zones.i);
  const interaction = resolveInteraction(zones.i);
  const projectsLayout = resolveProjectsLayout(zones.i);
  const heroScale = resolveHeroScale(zones.j);
  const navStyle = resolveNavStyle(zones.j);
  const metricLayout = resolveMetricLayout(zones.j);
  const sectionStyle = resolveSectionStyle(zones.j);
  const cs = checksum(zones.j);

  const conflict = applyConflictRules(archetype, shadows, radiusMode);
  shadows = conflict.shadows;
  a11yNotes.push(...conflict.notes);

  const creative = resolveCreativeProfile(seed, zones);

  // Pinned checksum slots guarantee showcase extremes in the gallery
  const SHOWCASE_PINS: Record<number, Partial<import("./types").CreativeProfile>> = {
    42: { themePersona: "matrix", heroMode: "statement", namePlacement: "footer", showNameInFooter: true, chaosEffects: ["matrix-rain", "text-glow", "oversized-type"] },
    17: { themePersona: "voidMono", heroMode: "statement", namePlacement: "footer", showNameInFooter: true },
    88: { themePersona: "swissBrutal", heroMode: "role", namePlacement: "byline" },
    63: { themePersona: "neonTokyo", heroMode: "metric", namePlacement: "footer", showNameInFooter: true },
  };
  const pinned = SHOWCASE_PINS[cs];
  const finalCreative = pinned ? { ...creative, ...pinned } : creative;
  const finalThemeOverride = getThemeOverride(finalCreative.themePersona);

  let finalLight = { ...lightColors };
  let finalDark = { ...darkColors };
  let finalTextAlign = textAlign;
  let containerMax = "42rem";

  if (finalThemeOverride) {
    finalLight = {
      bg: finalThemeOverride.bg,
      surface: finalThemeOverride.surface,
      ink: finalThemeOverride.ink,
      muted: finalThemeOverride.muted,
      hairline: finalThemeOverride.hairline,
      accent: finalThemeOverride.accent,
      accentText: finalThemeOverride.accentText,
    };
    finalDark = {
      bg: finalThemeOverride.bg,
      surface: finalThemeOverride.surface,
      ink: finalThemeOverride.ink,
      muted: finalThemeOverride.muted,
      hairline: finalThemeOverride.hairline,
      accent: finalThemeOverride.accent,
      accentText: finalThemeOverride.accentText,
    };
    finalTextAlign = finalThemeOverride.textAlign;
  }

  switch (finalCreative.contentWidth) {
    case "narrow": containerMax = "32rem"; break;
    case "wide": containerMax = "56rem"; break;
    case "full": containerMax = "72rem"; break;
    default: containerMax = "42rem";
  }

  const baseSpec: Partial<DesignSpec> = {
    seed,
    seedId: seedId(seed),
    checksum: cs,
    paletteFamily,
    archetype,
    buttonVariant,
    buttonShape,
    radiusMode,
    radiusBtn,
    radiusCard,
    pillarLayout,
    typeScale,
    displayWeight,
    spaceSection,
    containerMax,
    lineHeight: 1.5,
    highContrast,
    shadows,
    fontPairing,
    heroLayout,
    heroScale,
    textAlign: finalTextAlign,
    ctaLayout,
    interaction,
    navStyle,
    metricLayout,
    sectionStyle,
    labelStyle,
    projectsLayout,
    creative: finalCreative,
    colors: { light: finalLight, dark: finalDark },
    a11yNotes: [],
  };

  const archetypeMods = applyArchetypeModifiers(archetype, baseSpec);
  const finalShadows =
    archetype === "brutalist" ? { ...shadows, depth: 0 as const } : shadows;

  if (finalThemeOverride?.glow) {
    a11yNotes.push(`Theme ${finalCreative.themePersona}: glow effects enabled`);
  }

  return {
    ...(baseSpec as DesignSpec),
    ...archetypeMods,
    shadows: finalShadows,
    a11yNotes,
  };
}
