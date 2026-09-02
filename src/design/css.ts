import type { DesignSpec } from "./types";
import { getFontStacks, heroScaleVars } from "./language";
import { getThemeOverride } from "./creative";

function shadowValue(spec: DesignSpec, mode: "light" | "dark"): string {
  const { depth, blurSpread, colored } = spec.shadows;
  if (depth === 0) return "none";

  const colors = spec.colors[mode];
  const tint = colored ? colors.accent : "#000000";
  const opacity = mode === "light" ? 0.08 + depth * 0.04 : 0.2 + depth * 0.08;
  const y = depth * 2;
  const blur = blurSpread + depth * 4;
  const spread = depth > 1 ? 1 : 0;

  const r = parseInt(tint.slice(1, 3), 16);
  const g = parseInt(tint.slice(3, 5), 16);
  const b = parseInt(tint.slice(5, 7), 16);

  return `${y}px ${y * 2}px ${blur}px ${spread}px rgba(${r},${g},${b},${opacity})`;
}

export function designSpecToCssVars(spec: DesignSpec): Record<string, string> {
  const light = spec.colors.light;
  const dark = spec.colors.dark;
  const themeOverride = getThemeOverride(spec.creative.themePersona);
  const fonts = themeOverride
    ? { display: themeOverride.display, body: themeOverride.body, mono: themeOverride.mono }
    : getFontStacks(spec.fontPairing);
  const hero = heroScaleVars(spec.heroScale);

  return {
    "--bg": light.bg,
    "--surface": light.surface,
    "--ink": light.ink,
    "--muted": light.muted,
    "--hairline": light.hairline,
    "--accent": light.accent,
    "--accent-text": light.accentText,
    "--card": light.surface,
    "--border": light.hairline,
    "--body": light.ink,
    "--accent-dark": light.accent,
    "--font-display": fonts.display,
    "--font-body": fonts.body,
    "--font-mono": fonts.mono,
    "--radius-btn": `${spec.radiusBtn}px`,
    "--radius-card": `${spec.radiusCard}px`,
    "--space-section": String(spec.spaceSection),
    "--container-max": spec.containerMax,
    "--line-height-body": String(spec.lineHeight),
    "--type-scale": String(spec.typeScale),
    "--display-weight": String(spec.displayWeight),
    "--hero-size-min": hero.min,
    "--hero-size-mid": hero.mid,
    "--hero-size-max": hero.max,
    "--text-align": spec.textAlign,
    "--shadow-sm": shadowValue({ ...spec, shadows: { ...spec.shadows, depth: 1 } }, "light"),
    "--shadow-md": shadowValue(spec, "light"),
    "--shadow-colored": spec.shadows.colored ? shadowValue(spec, "light") : "none",
    "--btn-variant": spec.buttonVariant,
    "--pillar-layout": spec.pillarLayout,
    "--bg-dark": dark.bg,
    "--surface-dark": dark.surface,
    "--ink-dark": dark.ink,
    "--muted-dark": dark.muted,
    "--hairline-dark": dark.hairline,
    "--accent-dark-mode": dark.accent,
    "--accent-text-dark": dark.accentText,
    "--shadow-md-dark": shadowValue(spec, "dark"),
  };
}

export function cssVarsBlock(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
}
