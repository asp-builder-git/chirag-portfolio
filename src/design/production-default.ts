import { CURATED_SEEDS, resolveLabDesign } from "./seeds";
import type { DesignSpec } from "./types";
import { HERO_COPY, HERO_METRIC } from "../data/home-content";

/** Gallery index for Swiss statement poster in LAB_FORCES */
export const SWISS_GALLERY_INDEX = 17;

const PRODUCTION_SEED = CURATED_SEEDS[SWISS_GALLERY_INDEX];

/** Frozen production base spec — Swiss poster; philosophy hidden; Impact → Projects */
export function getProductionBaseSpec(): DesignSpec {
  const spec = resolveLabDesign(PRODUCTION_SEED, SWISS_GALLERY_INDEX);
  const chaosEffects = spec.creative.chaosEffects.filter((e) => e !== "matrix-rain");

  return {
    ...spec,
    creative: {
      ...spec.creative,
      hiddenSections: ["philosophy"],
      sectionOrder: ["impact", "projects", "philosophy"],
      chaosEffects,
      showNameInFooter: false,
      namePlacement: "hidden",
      heroStatement: HERO_COPY.statement,
      heroMetric: HERO_METRIC,
    },
  };
}
