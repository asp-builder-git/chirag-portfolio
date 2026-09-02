#!/usr/bin/env node
/**
 * Print resolved design specs for all curated seeds.
 * Usage: npm run design:seeds
 */
import { getSeedCatalog } from "../src/design/seeds.ts";

const catalog = getSeedCatalog();

console.log("\nDesign Lab — Curated Seed Catalog\n");
console.log(
  "ID".padEnd(10) +
    "Wild".padEnd(6) +
    "Theme".padEnd(14) +
    "Hero".padEnd(12) +
    "Align".padEnd(8) +
    "Nav".padEnd(8) +
    "Hide"
);
console.log("-".repeat(72));

for (const { spec } of catalog) {
  const c = spec.creative;
  console.log(
    spec.seedId.padEnd(10) +
      String(c.wildness).padEnd(6) +
      c.themePersona.padEnd(14) +
      c.heroMode.padEnd(12) +
      spec.textAlign.padEnd(8) +
      c.navPosition.padEnd(8) +
      (c.hiddenSections.join(",") || "—")
  );
}

console.log(`\n${catalog.length} seeds total.\n`);

const withIssues = catalog.filter((c) =>
  c.spec.a11yNotes.some((n) => n.includes("fail"))
);
if (withIssues.length > 0) {
  console.log(`${withIssues.length} seed(s) with a11y notes:\n`);
  for (const { spec } of withIssues) {
    console.log(
      `  ${spec.seedId}: ${spec.a11yNotes.filter((n) => n.includes("fail")).join("; ")}`
    );
  }
} else {
  console.log("All seeds pass contrast audit.\n");
}
