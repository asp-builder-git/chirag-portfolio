import type { HeroMode, PaletteColors, SectionId, TextAlign, ThemePersona, CreativeProfile, VisualLayout, HeroShell } from "./types";
import { charSum, digitDensity, maxRunLength, uppercaseRatio, vowelRatio, zoneHash } from "./patterns";

/** Approved one-liners — VOICE.md compliant; career numbers match CV v8 */
export const HERO_STATEMENTS = [
  "I build internal platforms that turn manual work into deterministic automation.",
  "I build enterprise products at work. I build small tools at home.",
  "A project counts when a stranger can open it.",
  "~850 negotiators across EU and NA depend on what I ship.",
  "Data over opinions — 41K requests argued for deterministic workflows over an AI chatbot.",
  "Automation that compounds: +175 bps successful-schedule rate, protecting >$1.05M/yr.",
  "I revel in watching a well-built solution come alive.",
] as const;

export const HERO_METRICS = [
  { value: "€0.36Bn/yr", label: "profitability supported by negotiations" },
  { value: "~850", label: "negotiators across EU and NA" },
  { value: "+175bps", label: "successful-schedule rate · protecting >$1.05M/yr" },
  { value: "€87MM", label: "negotiation entitlement from a solo 5-week build" },
  { value: "Near-zero → default", label: "failed platform relaunched for ~850 users" },
] as const;

export interface ThemeOverride {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  hairline: string;
  accent: string;
  accentText: string;
  display: string;
  body: string;
  mono: string;
  textAlign: TextAlign;
  forceDark?: boolean;
  glow?: boolean;
  scanlines?: boolean;
  grain?: boolean;
  invertNav?: boolean;
}

export const THEME_OVERRIDES: Record<Exclude<ThemePersona, "default">, ThemeOverride> = {
  matrix: {
    bg: "#000000",
    surface: "#0a0f0a",
    ink: "#00ff41",
    muted: "#008f11",
    hairline: "#003b00",
    accent: "#00ff41",
    accentText: "#39ff14",
    display: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
    body: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
    mono: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
    textAlign: "right",
    forceDark: true,
    glow: true,
    scanlines: true,
  },
  terminal: {
    bg: "#0c0c0c",
    surface: "#141414",
    ink: "#33ff00",
    muted: "#1a8c1a",
    hairline: "#2a2a2a",
    accent: "#ffb000",
    accentText: "#ffb000",
    display: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
    body: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
    mono: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
    textAlign: "left",
    forceDark: true,
  },
  newspaper: {
    bg: "#f4f1ea",
    surface: "#fffef9",
    ink: "#1a1a1a",
    muted: "#5c5c5c",
    hairline: "#ccc9c0",
    accent: "#8b0000",
    accentText: "#8b0000",
    display: '"Instrument Serif", Georgia, serif',
    body: '"Inter", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    textAlign: "left",
  },
  neonTokyo: {
    bg: "#0a0014",
    surface: "#150028",
    ink: "#f0e6ff",
    muted: "#9d8cb8",
    hairline: "#3d2066",
    accent: "#ff2d95",
    accentText: "#00f0ff",
    display: '"Inter", ui-sans-serif, system-ui, sans-serif',
    body: '"Inter", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    textAlign: "center",
    forceDark: true,
    glow: true,
  },
  swissBrutal: {
    bg: "#ffffff",
    surface: "#ffffff",
    ink: "#000000",
    muted: "#333333",
    hairline: "#000000",
    accent: "#ff0000",
    accentText: "#ff0000",
    display: 'ui-sans-serif, system-ui, Helvetica, Arial, sans-serif',
    body: 'ui-sans-serif, system-ui, Helvetica, Arial, sans-serif',
    mono: 'ui-monospace, monospace',
    textAlign: "left",
  },
  warmPaper: {
    bg: "#faf6f0",
    surface: "#fffdf8",
    ink: "#2c2416",
    muted: "#7a6f5d",
    hairline: "#e8dfd0",
    accent: "#c45c26",
    accentText: "#a34a1a",
    display: '"Instrument Serif", Georgia, serif',
    body: '"Inter", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    textAlign: "left",
  },
  voidMono: {
    bg: "#050505",
    surface: "#0a0a0a",
    ink: "#e8e8e8",
    muted: "#666666",
    hairline: "#1a1a1a",
    accent: "#ffffff",
    accentText: "#cccccc",
    display: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    body: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    textAlign: "right",
    forceDark: true,
  },
  retroTerminal: {
    bg: "#1a1400",
    surface: "#2a2200",
    ink: "#ffb000",
    muted: "#997700",
    hairline: "#4a3d00",
    accent: "#ff6600",
    accentText: "#ffcc00",
    display: '"JetBrains Mono", ui-monospace, monospace',
    body: '"JetBrains Mono", ui-monospace, monospace',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    textAlign: "left",
    forceDark: true,
    scanlines: true,
  },
  luxurySerif: {
    bg: "#0f0e0d",
    surface: "#1a1917",
    ink: "#f5f0e8",
    muted: "#a89f8f",
    hairline: "#2e2b26",
    accent: "#c9a962",
    accentText: "#e8d5a3",
    display: '"Instrument Serif", Georgia, serif',
    body: '"Inter", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    textAlign: "center",
    forceDark: true,
  },
  acid: {
    bg: "#1a0033",
    surface: "#2d0052",
    ink: "#e8ff00",
    muted: "#b8cc00",
    hairline: "#5c0099",
    accent: "#ff00ff",
    accentText: "#00ffff",
    display: '"Inter", ui-sans-serif, system-ui, sans-serif',
    body: '"Inter", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    textAlign: "center",
    forceDark: true,
    glow: true,
  },
  glitch: {
    bg: "#0a0a12",
    surface: "#12121f",
    ink: "#ffffff",
    muted: "#8888aa",
    hairline: "#2a2a44",
    accent: "#ff0040",
    accentText: "#00e5ff",
    display: '"JetBrains Mono", ui-monospace, monospace',
    body: '"JetBrains Mono", ui-monospace, monospace',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    textAlign: "left",
    forceDark: true,
    glow: true,
  },
  cyberpunk: {
    bg: "#0d0221",
    surface: "#1a0a2e",
    ink: "#f0e6ff",
    muted: "#9d7cbf",
    hairline: "#4a2080",
    accent: "#ff2a6d",
    accentText: "#05d9e8",
    display: '"Inter", ui-sans-serif, system-ui, sans-serif',
    body: '"Inter", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    textAlign: "left",
    forceDark: true,
    glow: true,
  },
  bauhaus: {
    bg: "#f5f0e8",
    surface: "#ffffff",
    ink: "#1a1a1a",
    muted: "#444444",
    hairline: "#1a1a1a",
    accent: "#e63312",
    accentText: "#1a5cff",
    display: 'ui-sans-serif, system-ui, Helvetica, Arial, sans-serif',
    body: 'ui-sans-serif, system-ui, Helvetica, Arial, sans-serif',
    mono: 'ui-monospace, monospace',
    textAlign: "left",
  },
  bloodMoon: {
    bg: "#0f0000",
    surface: "#1a0808",
    ink: "#ffcccc",
    muted: "#994444",
    hairline: "#440000",
    accent: "#ff2222",
    accentText: "#ff6666",
    display: '"Instrument Serif", Georgia, serif',
    body: '"Inter", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    textAlign: "center",
    forceDark: true,
    glow: true,
  },
  arcade: {
    bg: "#000022",
    surface: "#000044",
    ink: "#ffffff",
    muted: "#6688ff",
    hairline: "#2233aa",
    accent: "#ffff00",
    accentText: "#00ff00",
    display: '"JetBrains Mono", ui-monospace, monospace',
    body: '"JetBrains Mono", ui-monospace, monospace',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    textAlign: "center",
    forceDark: true,
    glow: true,
  },
};

/** Dark-mode palette swaps for personas that need real dark themes (not CSS invert). */
export const THEME_DARK_OVERRIDES: Partial<Record<ThemePersona, PaletteColors>> = {
  warmPaper: {
    bg: "#1c1917",
    surface: "#292524",
    ink: "#faf6f0",
    muted: "#a8a29e",
    hairline: "#44403c",
    accent: "#ea580c",
    accentText: "#fb923c",
  },
  swissBrutal: {
    bg: "#000000",
    surface: "#0a0a0a",
    ink: "#ffffff",
    muted: "#b3b3b3",
    hairline: "#333333",
    accent: "#ff0000",
    accentText: "#ff3333",
  },
};

function themeOverrideToPalette(override: ThemeOverride): PaletteColors {
  return {
    bg: override.bg,
    surface: override.surface,
    ink: override.ink,
    muted: override.muted,
    hairline: override.hairline,
    accent: override.accent,
    accentText: override.accentText,
  };
}

/** Light + dark palette pair for a theme persona, when overrides exist. */
export function getPersonaPalettes(persona: ThemePersona): { light: PaletteColors; dark: PaletteColors } | null {
  if (persona === "default") return null;
  const lightOverride = THEME_OVERRIDES[persona];
  if (!lightOverride) return null;
  const light = themeOverrideToPalette(lightOverride);
  const darkOverride = THEME_DARK_OVERRIDES[persona];
  const dark = darkOverride ?? { ...light };
  return { light, dark };
}

const THEME_PERSONAS: ThemePersona[] = [
  "default",
  "matrix",
  "terminal",
  "newspaper",
  "neonTokyo",
  "swissBrutal",
  "warmPaper",
  "voidMono",
  "retroTerminal",
  "luxurySerif",
];

const HERO_MODES: HeroMode[] = ["name", "statement", "metric", "role", "question"];

const SECTION_ORDERS: SectionId[][] = [
  ["philosophy", "impact", "projects"],
  ["impact", "philosophy", "projects"],
  ["projects", "impact", "philosophy"],
  ["impact", "projects", "philosophy"],
  ["philosophy", "projects", "impact"],
];

export function resolveCreativeProfile(
  seed: string,
  zones: { a: string; b: string; h: string; i: string; j: string; d: string }
): CreativeProfile {
  const wildness = charSum(seed) % 100;
  const entropy = zoneHash(zones.i + zones.j + zones.h);

  // Theme: high wildness unlocks extreme personas more often
  let themeIndex = entropy % THEME_PERSONAS.length;
  if (wildness > 70) themeIndex = (entropy + wildness) % THEME_PERSONAS.length;
  if (wildness > 85) themeIndex = 1 + (entropy % (THEME_PERSONAS.length - 1)); // skip default
  const themePersona = THEME_PERSONAS[themeIndex];

  // Hero mode: themes bias hero
  let heroMode = HERO_MODES[charSum(zones.h) % HERO_MODES.length];
  if (themePersona === "matrix" || themePersona === "voidMono") heroMode = "statement";
  if (themePersona === "neonTokyo" || themePersona === "luxurySerif") heroMode = wildness > 50 ? "statement" : "metric";
  if (themePersona === "swissBrutal") heroMode = "role";
  if (themePersona === "newspaper") heroMode = charSum(zones.j) % 2 === 0 ? "name" : "statement";
  if (wildness > 90) heroMode = HERO_MODES[(entropy + wildness) % HERO_MODES.length];

  const stmtIdx = charSum(zones.a + zones.j) % HERO_STATEMENTS.length;
  const metricIdx = charSum(zones.b + zones.h) % HERO_METRICS.length;

  const heroQuestion = "What happens when ~850 people depend on your platform every day?";

  const orderIdx = (entropy + charSum(zones.j)) % SECTION_ORDERS.length;
  const sectionOrder = [...SECTION_ORDERS[orderIdx]];

  const hiddenSections: SectionId[] = [];
  if (digitDensity(zones.j) < 0.2) hiddenSections.push("philosophy");
  if (maxRunLength(zones.i) > 2) hiddenSections.push("impact");
  if (wildness > 80 && vowelRatio(zones.h) < 0.3) hiddenSections.push("projects");
  if (heroMode === "metric" && wildness > 60) hiddenSections.push("impact"); // metric hero replaces impact strip feel

  let namePlacement: CreativeProfile["namePlacement"] = "hero";
  if (heroMode === "statement" || heroMode === "metric" || heroMode === "question") {
    namePlacement = wildness > 40 ? "byline" : "footer";
  }
  if (heroMode === "role") namePlacement = "byline";
  if (themePersona === "matrix") namePlacement = "footer";

  const navPositions: CreativeProfile["navPosition"][] = ["top", "bottom", "side"];
  const navPosition = wildness > 75 ? navPositions[entropy % 3] : "top";

  const widths: CreativeProfile["contentWidth"][] = ["narrow", "standard", "wide", "full"];
  const contentWidth = widths[(entropy + wildness) % widths.length];

  const chaosEffects: string[] = [];
  if (wildness > 60) chaosEffects.push("oversized-type");
  if (wildness > 75) chaosEffects.push("asymmetric-grid");
  if (uppercaseRatio(zones.d) > 0.4) chaosEffects.push("all-caps-nav");
  if (themePersona === "matrix") chaosEffects.push("matrix-rain", "text-glow");
  if (themePersona === "neonTokyo") chaosEffects.push("text-glow", "gradient-border");
  if (themePersona === "swissBrutal") chaosEffects.push("thick-rules", "all-caps-nav");

  const visualLayouts: VisualLayout[] = ["standard", "poster", "immersive", "bento", "marquee", "split"];
  const heroShells: HeroShell[] = ["contained", "breakout", "fullscreen", "diagonal"];
  const visualLayout = visualLayouts[entropy % visualLayouts.length];
  const heroShell = heroShells[(entropy + wildness) % heroShells.length];
  const ghostTexts = ["BUILD", "SHIP", "AUTOMATE", "PLATFORM", "DATA", "SCALE"];
  const ghostText = wildness > 70 ? ghostTexts[charSum(zones.d) % ghostTexts.length] : undefined;

  return {
    wildness,
    themePersona,
    heroMode,
    heroStatement: HERO_STATEMENTS[stmtIdx],
    heroMetric: HERO_METRICS[metricIdx],
    heroQuestion,
    sectionOrder,
    hiddenSections,
    showNameInFooter: namePlacement === "footer" || namePlacement === "hidden",
    namePlacement,
    navPosition,
    contentWidth,
    chaosEffects,
    visualLayout,
    heroShell,
    ghostText,
  };
}

export function getThemeOverride(persona: ThemePersona): ThemeOverride | null {
  if (persona === "default") return null;
  return THEME_OVERRIDES[persona];
}
