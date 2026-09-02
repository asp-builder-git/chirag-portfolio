import { charSum, consonantClusterCount, digitDensity, maxRunLength, uppercaseRatio, vowelRatio } from "./patterns";
import type {
  ButtonShape,
  CtaLayout,
  FontPairing,
  HeroLayout,
  HeroScale,
  InteractionStyle,
  LabelStyle,
  MetricLayout,
  NavStyle,
  ProjectsLayout,
  SectionStyle,
  TextAlign,
} from "./types";

export interface FontStacks {
  display: string;
  body: string;
  mono: string;
}

const FONT_STACKS: Record<FontPairing, FontStacks> = {
  serifClassic: {
    display: '"Instrument Serif", "Instrument Serif Fallback", Georgia, serif',
    body: '"Inter", "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
  },
  editorial: {
    display: '"Instrument Serif", "Instrument Serif Fallback", Georgia, serif',
    body: '"Inter", "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
  },
  monoDense: {
    display: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
    body: '"Inter", "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
  },
  sansClean: {
    display: '"Inter", "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
    body: '"Inter", "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
  },
  system: {
    display: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    body: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  },
};

export function getFontStacks(pairing: FontPairing): FontStacks {
  return FONT_STACKS[pairing];
}

export function resolveFontPairing(zoneG: string): FontPairing {
  const pairings: FontPairing[] = ["serifClassic", "editorial", "monoDense", "sansClean", "system"];
  return pairings[charSum(zoneG) % pairings.length];
}

export function resolveHeroLayout(zoneH: string): HeroLayout {
  const layouts: HeroLayout[] = ["classic", "centered", "airy", "compact", "statement"];
  return layouts[charSum(zoneH) % layouts.length];
}

export function resolveTextAlign(zoneH: string): TextAlign {
  return digitDensity(zoneH) > 0.35 ? "center" : "left";
}

export function resolveHeroScale(zoneJ: string): HeroScale {
  const scales: HeroScale[] = ["compact", "standard", "dramatic"];
  return scales[maxRunLength(zoneJ) % scales.length];
}

export function resolveCtaLayout(zoneE: string): CtaLayout {
  const layouts: CtaLayout[] = ["row", "column", "stacked"];
  return layouts[charSum(zoneE) % layouts.length];
}

export function resolveButtonShape(zoneE: string): ButtonShape {
  const shapes: ButtonShape[] = ["default", "pill", "square"];
  return shapes[uppercaseRatio(zoneE) * 10 % shapes.length | 0];
}

export function resolveInteraction(zoneI: string): InteractionStyle {
  const styles: InteractionStyle[] = ["underline", "accent", "lift", "glow"];
  return styles[zoneHash(zoneI) % styles.length];
}

export function resolveNavStyle(zoneJ: string): NavStyle {
  const styles: NavStyle[] = ["minimal", "underline", "spaced"];
  return styles[vowelRatio(zoneJ) * 10 % styles.length | 0];
}

export function resolveMetricLayout(zoneJ: string): MetricLayout {
  const layouts: MetricLayout[] = ["flex", "grid2", "grid3", "bar"];
  return layouts[consonantClusterCount(zoneJ) % layouts.length];
}

export function resolveSectionStyle(zoneJ: string): SectionStyle {
  const styles: SectionStyle[] = ["hairline", "spaced", "band"];
  return styles[digitDensity(zoneJ) * 10 % styles.length | 0];
}

export function resolveLabelStyle(zoneG: string): LabelStyle {
  const styles: LabelStyle[] = ["uppercase", "sentence", "mono"];
  return styles[consonantClusterCount(zoneG) % styles.length];
}

export function resolveProjectsLayout(zoneI: string): ProjectsLayout {
  const layouts: ProjectsLayout[] = ["rows", "cards", "compact"];
  return layouts[charSum(zoneI) % layouts.length];
}

function zoneHash(s: string): number {
  return charSum(s) % 997;
}

export function heroScaleVars(scale: HeroScale): { min: string; mid: string; max: string } {
  switch (scale) {
    case "compact":
      return { min: "2rem", mid: "1.75rem + 2.5vw", max: "3rem" };
    case "dramatic":
      return { min: "3rem", mid: "2.5rem + 4.5vw", max: "5rem" };
    default:
      return { min: "2.5rem", mid: "2rem + 3.5vw", max: "4rem" };
  }
}
