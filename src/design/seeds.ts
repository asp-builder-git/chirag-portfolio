import { isValidSeed } from "./patterns";
import { resolveDesign } from "./resolve";
import { applyLabForce } from "./lab-force";
import type { DesignSpec } from "./types";

/** LCG-based deterministic seed generator */
export function generateSeed(index: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let seed = "";
  let state = (index * 7919 + 104729) >>> 0;
  for (let i = 0; i < 100; i++) {
    state = (state * 1103515245 + 12345) >>> 0;
    seed += chars[state % chars.length];
  }
  return seed;
}

const CURATED_INDICES = [
  1, 7, 13, 23, 37, 42, 58, 71, 89, 103, 127, 211, 333, 512, 777, 999,
  1337, 2048, 3141, 4096, 5555, 6666, 7777, 8888,
];

export const CURATED_SEEDS: string[] = CURATED_INDICES.map(generateSeed);

/** Lab-only: base seed resolution + forced gallery extreme */
export function resolveLabDesign(seed: string, galleryIndex: number): DesignSpec {
  return applyLabForce(resolveDesign(seed), galleryIndex);
}

export function getSeedCatalog(): { seed: string; spec: DesignSpec; index: number }[] {
  return CURATED_SEEDS.map((seed, index) => ({
    seed,
    index,
    spec: resolveLabDesign(seed, index),
  }));
}

export function findSeed(id: string): string | undefined {
  return CURATED_SEEDS.find((s) => s.startsWith(id) || s === id);
}

export function getGalleryIndexForSeed(seed: string): number {
  const idx = CURATED_SEEDS.indexOf(seed);
  return idx >= 0 ? idx : 0;
}

export function validateCatalog(): void {
  for (const seed of CURATED_SEEDS) {
    if (!isValidSeed(seed)) {
      throw new Error(`Invalid seed in catalog: ${seed.slice(0, 8)}…`);
    }
    if (seed.length !== 100) {
      throw new Error(`Seed length ${seed.length}, expected 100`);
    }
  }
}

validateCatalog();
