import type { DesignSpec, TextAlign, CreativeProfile } from "./types";
import { getPersonaPalettes, getThemeOverride } from "./creative";

type ForceCreative = Partial<CreativeProfile> & {
  visualLayout?: CreativeProfile["visualLayout"];
  heroShell?: CreativeProfile["heroShell"];
  ghostText?: string;
};

export interface LabForce {
  label: string;
  creative: ForceCreative;
  textAlign?: TextAlign;
  containerMax?: string;
}

export const LAB_FORCES: LabForce[] = [
  { label: "Matrix · statement · right", creative: { themePersona: "matrix", heroMode: "statement", namePlacement: "footer", showNameInFooter: true, navPosition: "bottom", contentWidth: "wide", visualLayout: "immersive", heroShell: "fullscreen", hiddenSections: ["philosophy"], chaosEffects: ["matrix-rain", "text-glow", "oversized-type", "scanlines"], wildness: 98 }, textAlign: "right" },
  { label: "Neon · giant metric", creative: { themePersona: "neonTokyo", heroMode: "metric", namePlacement: "hidden", showNameInFooter: true, visualLayout: "poster", heroShell: "fullscreen", hiddenSections: ["impact", "philosophy"], chaosEffects: ["text-glow", "gradient-border", "oversized-type"], wildness: 96, ghostText: "BUILD" }, textAlign: "center", containerMax: "72rem" },
  { label: "Swiss brutal · role", creative: { themePersona: "swissBrutal", heroMode: "role", namePlacement: "byline", visualLayout: "standard", heroShell: "breakout", sectionOrder: ["impact", "projects", "philosophy"], chaosEffects: ["thick-rules", "all-caps-nav", "asymmetric-grid"], wildness: 94 }, containerMax: "56rem" },
  { label: "Void · statement right", creative: { themePersona: "voidMono", heroMode: "statement", namePlacement: "footer", showNameInFooter: true, navPosition: "side", contentWidth: "narrow", visualLayout: "immersive", heroShell: "fullscreen", hiddenSections: ["projects"], chaosEffects: ["oversized-type"], wildness: 97 }, textAlign: "right" },
  { label: "Terminal · question", creative: { themePersona: "terminal", heroMode: "question", namePlacement: "byline", visualLayout: "marquee", heroShell: "contained", hiddenSections: ["philosophy"], chaosEffects: ["scanlines"], wildness: 91 } },
  { label: "Newspaper columns", creative: { themePersona: "newspaper", heroMode: "statement", namePlacement: "byline", visualLayout: "split", heroShell: "breakout", hiddenSections: ["impact"], sectionOrder: ["philosophy", "projects", "impact"], wildness: 88 }, containerMax: "56rem" },
  { label: "Luxury · metric only", creative: { themePersona: "luxurySerif", heroMode: "metric", namePlacement: "footer", showNameInFooter: true, visualLayout: "poster", heroShell: "fullscreen", hiddenSections: ["philosophy", "projects"], chaosEffects: ["oversized-type"], wildness: 93 }, textAlign: "center" },
  { label: "Retro CRT · statement", creative: { themePersona: "retroTerminal", heroMode: "statement", namePlacement: "footer", showNameInFooter: true, visualLayout: "immersive", heroShell: "diagonal", navPosition: "bottom", chaosEffects: ["scanlines", "text-glow"], wildness: 92 } },
  { label: "Acid · metric poster", creative: { themePersona: "acid", heroMode: "metric", namePlacement: "hidden", showNameInFooter: true, visualLayout: "poster", heroShell: "fullscreen", hiddenSections: ["philosophy", "impact"], chaosEffects: ["acid-bg", "oversized-type", "text-glow"], wildness: 99, ghostText: "AUTOMATE" }, textAlign: "center", containerMax: "72rem" },
  { label: "Glitch · statement", creative: { themePersona: "glitch", heroMode: "statement", namePlacement: "footer", showNameInFooter: true, visualLayout: "immersive", heroShell: "breakout", chaosEffects: ["glitch-text", "text-glow", "oversized-type"], wildness: 98 } },
  { label: "Cyberpunk · role", creative: { themePersona: "cyberpunk", heroMode: "role", namePlacement: "byline", visualLayout: "bento", heroShell: "fullscreen", navPosition: "side", hiddenSections: ["philosophy"], chaosEffects: ["text-glow", "gradient-border"], wildness: 95 }, containerMax: "64rem" },
  { label: "Bauhaus · statement", creative: { themePersona: "bauhaus", heroMode: "statement", namePlacement: "byline", visualLayout: "split", heroShell: "diagonal", hiddenSections: ["impact"], chaosEffects: ["thick-rules", "asymmetric-grid"], wildness: 90 } },
  { label: "Blood moon · question", creative: { themePersona: "bloodMoon", heroMode: "question", namePlacement: "footer", showNameInFooter: true, visualLayout: "poster", heroShell: "fullscreen", hiddenSections: ["projects"], chaosEffects: ["text-glow", "oversized-type"], wildness: 94 }, textAlign: "center" },
  { label: "Arcade · metric alone", creative: { themePersona: "arcade", heroMode: "metric", namePlacement: "hidden", showNameInFooter: true, visualLayout: "marquee", heroShell: "fullscreen", hiddenSections: ["philosophy", "impact", "projects"], chaosEffects: ["text-glow", "oversized-type"], wildness: 100 }, textAlign: "center" },
  { label: "Acid · work line", creative: { themePersona: "acid", heroMode: "statement", namePlacement: "footer", showNameInFooter: true, visualLayout: "immersive", heroShell: "fullscreen", chaosEffects: ["acid-bg", "oversized-type"], wildness: 99, ghostText: "PLATFORM" }, textAlign: "center" },
  { label: "Matrix · metric rain", creative: { themePersona: "matrix", heroMode: "metric", namePlacement: "footer", showNameInFooter: true, visualLayout: "immersive", heroShell: "fullscreen", hiddenSections: ["philosophy", "projects"], chaosEffects: ["matrix-rain", "text-glow", "scanlines"], wildness: 97 }, textAlign: "right" },
  { label: "Neon · statement", creative: { themePersona: "neonTokyo", heroMode: "statement", namePlacement: "footer", showNameInFooter: true, navPosition: "side", visualLayout: "bento", heroShell: "breakout", chaosEffects: ["gradient-border", "text-glow"], wildness: 93 }, textAlign: "center" },
  {
    label: "Swiss · statement poster",
    creative: {
      themePersona: "swissBrutal",
      heroMode: "statement",
      namePlacement: "hidden",
      showNameInFooter: false,
      visualLayout: "poster",
      heroShell: "fullscreen",
      hiddenSections: ["impact", "projects"],
      chaosEffects: ["thick-rules", "all-caps-nav", "oversized-type", "matrix-rain"],
      heroStatement: "I revel in watching a well-built solution come alive.",
      wildness: 96,
    },
    containerMax: "60rem",
  },
  { label: "Glitch · metric", creative: { themePersona: "glitch", heroMode: "metric", namePlacement: "hidden", showNameInFooter: true, visualLayout: "poster", heroShell: "fullscreen", hiddenSections: ["impact"], chaosEffects: ["glitch-text", "oversized-type"], wildness: 98 } },
  { label: "Cyberpunk · statement", creative: { themePersona: "cyberpunk", heroMode: "statement", namePlacement: "byline", visualLayout: "bento", heroShell: "fullscreen", navPosition: "bottom", chaosEffects: ["text-glow", "gradient-border", "oversized-type"], wildness: 97 }, containerMax: "68rem" },
  { label: "Void · projects first", creative: { themePersona: "voidMono", heroMode: "question", namePlacement: "footer", showNameInFooter: true, sectionOrder: ["projects", "impact", "philosophy"], visualLayout: "standard", heroShell: "diagonal", hiddenSections: ["philosophy"], wildness: 89 }, textAlign: "right" },
  { label: "Bauhaus · metric", creative: { themePersona: "bauhaus", heroMode: "metric", namePlacement: "footer", showNameInFooter: true, visualLayout: "split", heroShell: "diagonal", hiddenSections: ["philosophy"], chaosEffects: ["thick-rules", "asymmetric-grid"], wildness: 91 } },
  { label: "Arcade · statement", creative: { themePersona: "arcade", heroMode: "statement", namePlacement: "hidden", showNameInFooter: true, visualLayout: "marquee", heroShell: "fullscreen", hiddenSections: ["philosophy"], chaosEffects: ["text-glow", "oversized-type"], wildness: 99 }, textAlign: "center" },
  { label: "Blood moon · metric", creative: { themePersona: "bloodMoon", heroMode: "metric", namePlacement: "footer", showNameInFooter: true, visualLayout: "poster", heroShell: "fullscreen", hiddenSections: ["philosophy", "projects"], chaosEffects: ["text-glow"], wildness: 95 }, textAlign: "center" },
];

export function applyLabForce(spec: DesignSpec, galleryIndex: number): DesignSpec {
  const force = LAB_FORCES[galleryIndex % LAB_FORCES.length];
  const fc = force.creative;

  const creative: CreativeProfile = {
    ...spec.creative,
    themePersona: fc.themePersona ?? spec.creative.themePersona,
    heroMode: fc.heroMode ?? spec.creative.heroMode,
    heroStatement: fc.heroStatement ?? spec.creative.heroStatement,
    heroMetric: fc.heroMetric ?? spec.creative.heroMetric,
    heroQuestion: fc.heroQuestion ?? spec.creative.heroQuestion,
    sectionOrder: fc.sectionOrder ?? spec.creative.sectionOrder,
    hiddenSections: fc.hiddenSections ?? spec.creative.hiddenSections,
    showNameInFooter: fc.showNameInFooter ?? spec.creative.showNameInFooter,
    namePlacement: fc.namePlacement ?? spec.creative.namePlacement,
    navPosition: fc.navPosition ?? spec.creative.navPosition,
    contentWidth: fc.contentWidth ?? spec.creative.contentWidth,
    visualLayout: fc.visualLayout ?? spec.creative.visualLayout,
    heroShell: fc.heroShell ?? spec.creative.heroShell,
    ghostText: fc.ghostText ?? spec.creative.ghostText,
    galleryLabel: force.label,
    wildness: fc.wildness ?? 95,
    chaosEffects: [...new Set([...(fc.chaosEffects ?? []), ...(spec.creative.chaosEffects ?? [])])],
  };

  const palettes = getPersonaPalettes(creative.themePersona);
  const themeOverride = getThemeOverride(creative.themePersona);
  const textAlign = force.textAlign ?? themeOverride?.textAlign ?? spec.textAlign;
  const containerMax = force.containerMax ?? spec.containerMax;

  let light = { ...spec.colors.light };
  let dark = { ...spec.colors.dark };

  if (palettes) {
    light = { ...palettes.light };
    dark = { ...palettes.dark };
  }

  return {
    ...spec,
    textAlign,
    containerMax,
    creative,
    colors: { light, dark },
  };
}
