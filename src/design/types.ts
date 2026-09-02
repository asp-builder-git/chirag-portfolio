/** Design archetypes inspired by benchmark peers */
export type Archetype = "leerob" | "paco" | "mxb" | "antfu" | "brutalist";

export type ButtonVariant = "filled" | "outline" | "ghost";
export type ButtonShape = "default" | "pill" | "square";

export type RadiusMode = "sharp" | "subtle" | "soft" | "mixed";

export type PillarLayout = "grid" | "stack";

export type FontPairing = "serifClassic" | "editorial" | "monoDense" | "sansClean" | "system";
export type HeroLayout = "classic" | "centered" | "airy" | "compact" | "statement";
export type HeroScale = "compact" | "standard" | "dramatic";
export type TextAlign = "left" | "center" | "right";

export type HeroMode = "name" | "statement" | "metric" | "role" | "question";

export type ThemePersona =
  | "default"
  | "matrix"
  | "terminal"
  | "newspaper"
  | "neonTokyo"
  | "swissBrutal"
  | "warmPaper"
  | "voidMono"
  | "retroTerminal"
  | "luxurySerif"
  | "acid"
  | "glitch"
  | "cyberpunk"
  | "bauhaus"
  | "bloodMoon"
  | "arcade";

export type VisualLayout = "standard" | "poster" | "immersive" | "bento" | "marquee" | "split";
export type HeroShell = "contained" | "breakout" | "fullscreen" | "diagonal";

export type SectionId = "philosophy" | "impact" | "projects";

export type NavPosition = "top" | "bottom" | "side";
export type ContentWidth = "narrow" | "standard" | "wide" | "full";
export type NamePlacement = "hero" | "byline" | "footer" | "hidden";
export type CtaLayout = "row" | "column" | "stacked";
export type InteractionStyle = "underline" | "accent" | "lift" | "glow";
export type NavStyle = "minimal" | "underline" | "spaced";
export type MetricLayout = "flex" | "grid2" | "grid3" | "bar";
export type SectionStyle = "hairline" | "spaced" | "band";
export type LabelStyle = "uppercase" | "sentence" | "mono";
export type ProjectsLayout = "rows" | "cards" | "compact";

export type PaletteFamily =
  | "slate"
  | "warmCream"
  | "forest"
  | "ocean"
  | "ink"
  | "sand"
  | "rose"
  | "mint"
  | "lavender"
  | "charcoal"
  | "terracotta"
  | "steel";

export interface PaletteColors {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  hairline: string;
  accent: string;
  accentText: string;
}

export interface ShadowSpec {
  depth: 0 | 1 | 2 | 3;
  blurSpread: number;
  colored: boolean;
}

export interface CreativeProfile {
  wildness: number;
  themePersona: ThemePersona;
  heroMode: HeroMode;
  heroStatement: string;
  heroMetric: { value: string; label: string };
  heroQuestion: string;
  sectionOrder: SectionId[];
  hiddenSections: SectionId[];
  showNameInFooter: boolean;
  namePlacement: NamePlacement;
  navPosition: NavPosition;
  contentWidth: ContentWidth;
  chaosEffects: string[];
  visualLayout: VisualLayout;
  heroShell: HeroShell;
  ghostText?: string;
  galleryLabel?: string;
}

export interface DesignSpec {
  seed: string;
  seedId: string;
  checksum: number;
  paletteFamily: PaletteFamily;
  archetype: Archetype;
  buttonVariant: ButtonVariant;
  buttonShape: ButtonShape;
  radiusMode: RadiusMode;
  radiusBtn: number;
  radiusCard: number;
  pillarLayout: PillarLayout;
  typeScale: number;
  displayWeight: number;
  spaceSection: number;
  containerMax: string;
  lineHeight: number;
  highContrast: boolean;
  shadows: ShadowSpec;
  /** Full design language */
  fontPairing: FontPairing;
  heroLayout: HeroLayout;
  heroScale: HeroScale;
  textAlign: TextAlign;
  ctaLayout: CtaLayout;
  interaction: InteractionStyle;
  navStyle: NavStyle;
  metricLayout: MetricLayout;
  sectionStyle: SectionStyle;
  labelStyle: LabelStyle;
  projectsLayout: ProjectsLayout;
  /** Creative chaos layer */
  creative: CreativeProfile;
  colors: {
    light: PaletteColors;
    dark: PaletteColors;
  };
  a11yNotes: string[];
}

export interface SeedZones {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
  h: string;
  i: string;
  j: string;
}
