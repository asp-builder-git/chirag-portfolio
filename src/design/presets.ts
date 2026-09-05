import type { DesignSpec, HeroMode, ThemePersona, VisualLayout, HeroShell, NamePlacement } from "./types";
import { getPersonaPalettes } from "./creative";
import { HERO_COPY, HERO_METRIC } from "../data/home-content";

export type PresetId = "swiss-statement" | "bio-hub" | "metric-proof" | "terminal";
export type ThemePref = "light" | "dark" | "system";
export type HeroPref = "statement" | "name" | "metric";
export type DensityPref = "standard" | "poster";
export type MotionPref = "off" | "full";
export type TexturePref = "off" | "subtle";

export interface AppearanceState {
  preset: PresetId;
  theme: ThemePref;
  hero: HeroPref;
  density: DensityPref;
  motion: MotionPref;
}

/** Per-preset hero + density so switching presets is not overridden by swiss defaults */
export const PRESET_APPEARANCE: Record<PresetId, Pick<AppearanceState, "hero" | "density">> = {
  "swiss-statement": { hero: "statement", density: "poster" },
  "bio-hub": { hero: "name", density: "standard" },
  "metric-proof": { hero: "metric", density: "standard" },
  terminal: { hero: "statement", density: "standard" },
};

export const DEFAULT_APPEARANCE: AppearanceState = {
  preset: "swiss-statement",
  theme: "system",
  hero: "statement",
  density: "poster",
  motion: "off",
};

export const PRESET_OPTIONS: { id: PresetId; label: string; shortLabel: string }[] = [
  { id: "swiss-statement", label: "Poster typography. Statement first.", shortLabel: "Swiss poster" },
  { id: "bio-hub", label: "Classic portfolio. Name and role up front.", shortLabel: "Classic" },
  { id: "metric-proof", label: "One number, then proof.", shortLabel: "Metric" },
  { id: "terminal", label: "Monospace, scanlines. For builders.", shortLabel: "Terminal" },
];

interface PresetCreative {
  themePersona: ThemePersona;
  heroMode: HeroMode;
  visualLayout: VisualLayout;
  heroShell: HeroShell;
  namePlacement: NamePlacement;
  showNameInFooter: boolean;
  chaosEffects: string[];
}

const PRESET_CREATIVES: Record<PresetId, PresetCreative> = {
  "swiss-statement": {
    themePersona: "swissBrutal",
    heroMode: "statement",
    visualLayout: "poster",
    heroShell: "fullscreen",
    namePlacement: "hidden",
    showNameInFooter: false,
    chaosEffects: ["thick-rules", "all-caps-nav", "oversized-type"],
  },
  "bio-hub": {
    themePersona: "warmPaper",
    heroMode: "name",
    visualLayout: "standard",
    heroShell: "contained",
    namePlacement: "hero",
    showNameInFooter: false,
    chaosEffects: [],
  },
  "metric-proof": {
    themePersona: "swissBrutal",
    heroMode: "metric",
    visualLayout: "standard",
    heroShell: "contained",
    namePlacement: "byline",
    showNameInFooter: false,
    chaosEffects: ["thick-rules"],
  },
  terminal: {
    themePersona: "terminal",
    heroMode: "statement",
    visualLayout: "standard",
    heroShell: "contained",
    namePlacement: "byline",
    showNameInFooter: false,
    chaosEffects: ["scanlines"],
  },
};

const VALID_PRESETS = new Set<PresetId>(["swiss-statement", "bio-hub", "metric-proof", "terminal"]);
const VALID_THEMES = new Set<ThemePref>(["light", "dark", "system"]);
const VALID_HERO = new Set<HeroPref>(["statement", "name", "metric"]);
const VALID_DENSITY = new Set<DensityPref>(["standard", "poster"]);
const VALID_MOTION = new Set<MotionPref>(["off", "full"]);

function pick<T extends string>(value: string | null, valid: Set<T>, fallback: T): T {
  return value && valid.has(value as T) ? (value as T) : fallback;
}

export function parseAppearanceParams(searchParams: URLSearchParams): AppearanceState {
  const preset = pick(searchParams.get("preset"), VALID_PRESETS, DEFAULT_APPEARANCE.preset);
  const presetDefaults = PRESET_APPEARANCE[preset];
  return {
    preset,
    theme: pick(searchParams.get("theme"), VALID_THEMES, DEFAULT_APPEARANCE.theme),
    hero: pick(searchParams.get("hero"), VALID_HERO, presetDefaults.hero),
    density: pick(searchParams.get("density"), VALID_DENSITY, presetDefaults.density),
    motion: pick(searchParams.get("motion"), VALID_MOTION, DEFAULT_APPEARANCE.motion),
  };
}

/** Build share/nav URL params; omit values that match the active preset's defaults */
export function appearanceToSearchParams(state: AppearanceState): URLSearchParams {
  const params = new URLSearchParams();
  const presetDefaults = PRESET_APPEARANCE[state.preset];
  if (state.preset !== DEFAULT_APPEARANCE.preset) params.set("preset", state.preset);
  if (state.theme !== DEFAULT_APPEARANCE.theme) params.set("theme", state.theme);
  if (state.hero !== presetDefaults.hero) params.set("hero", state.hero);
  if (state.density !== presetDefaults.density) params.set("density", state.density);
  if (state.motion !== DEFAULT_APPEARANCE.motion) params.set("motion", state.motion);
  return params;
}

/** Full appearance state for a preset click (resets hero/density to that preset) */
export function appearanceForPreset(
  presetId: PresetId,
  current: AppearanceState,
): AppearanceState {
  const presetDefaults = PRESET_APPEARANCE[presetId];
  return {
    ...current,
    preset: presetId,
    hero: presetDefaults.hero,
    density: presetDefaults.density,
  };
}

function heroPrefToMode(hero: HeroPref): HeroMode {
  if (hero === "name") return "name";
  if (hero === "metric") return "metric";
  return "statement";
}

function namePlacementForHero(hero: HeroPref, preset: PresetId): NamePlacement {
  if (hero === "name") return "hero";
  if (hero === "metric") return "byline";
  if (preset === "swiss-statement") return "hidden";
  return "byline";
}

function densityOverrides(density: DensityPref): Pick<PresetCreative, "visualLayout" | "heroShell"> {
  if (density === "poster") {
    return { visualLayout: "poster", heroShell: "fullscreen" };
  }
  return { visualLayout: "standard", heroShell: "contained" };
}

export function applyAppearance(base: DesignSpec, state: AppearanceState): DesignSpec {
  const preset = PRESET_CREATIVES[state.preset];
  const density = densityOverrides(state.density);
  const heroMode = heroPrefToMode(state.hero);
  const namePlacement = namePlacementForHero(state.hero, state.preset);

  let chaosEffects = [...preset.chaosEffects];
  if (state.motion === "full" && preset.themePersona === "swissBrutal") {
    chaosEffects = [...new Set([...chaosEffects, "matrix-rain"])];
  }

  const hiddenSections =
    state.preset === "swiss-statement"
      ? (["philosophy"] as typeof base.creative.hiddenSections)
      : ([] as typeof base.creative.hiddenSections);

  const creative = {
    ...base.creative,
    themePersona: preset.themePersona,
    heroMode,
    visualLayout: density.visualLayout,
    heroShell: density.heroShell,
    namePlacement,
    showNameInFooter: false,
    hiddenSections,
    sectionOrder: ["impact", "projects", "philosophy"] as typeof base.creative.sectionOrder,
    chaosEffects,
    heroStatement: HERO_COPY.statement,
    heroMetric: HERO_METRIC,
  };

  const palettes = getPersonaPalettes(creative.themePersona);
  let colors = base.colors;
  if (palettes) {
    colors = { light: { ...palettes.light }, dark: { ...palettes.dark } };
  }

  let containerMax = base.containerMax;
  if (state.preset === "swiss-statement" || state.density === "poster") {
    containerMax = "60rem";
  } else if (state.preset === "bio-hub") {
    containerMax = "42rem";
  }

  return {
    ...base,
    containerMax,
    creative,
    colors,
  };
}

export function textureFromMotion(motion: MotionPref): TexturePref {
  return motion === "full" ? "subtle" : "off";
}
