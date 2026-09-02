import type { SeedZones } from "./types";

const SEED_RE = /^[A-Za-z0-9]{100}$/;

export function isValidSeed(seed: string): boolean {
  return SEED_RE.test(seed);
}

export function splitZones(seed: string): SeedZones {
  if (!isValidSeed(seed)) {
    throw new Error(`Seed must be exactly 100 alphanumeric characters, got ${seed.length}`);
  }
  return {
    a: seed.slice(0, 10),
    b: seed.slice(10, 20),
    c: seed.slice(20, 30),
    d: seed.slice(30, 40),
    e: seed.slice(40, 50),
    f: seed.slice(50, 60),
    g: seed.slice(60, 70),
    h: seed.slice(70, 80),
    i: seed.slice(80, 90),
    j: seed.slice(90, 100),
  };
}

export function charSum(segment: string): number {
  let sum = 0;
  for (let i = 0; i < segment.length; i++) {
    sum += segment.charCodeAt(i);
  }
  return sum;
}

const VOWELS = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

export function vowelRatio(segment: string): number {
  if (segment.length === 0) return 0;
  let count = 0;
  for (const ch of segment) {
    if (VOWELS.has(ch)) count++;
  }
  return count / segment.length;
}

export function digitDensity(segment: string): number {
  if (segment.length === 0) return 0;
  let count = 0;
  for (const ch of segment) {
    if (ch >= "0" && ch <= "9") count++;
  }
  return count / segment.length;
}

export function uppercaseRatio(segment: string): number {
  if (segment.length === 0) return 0;
  let count = 0;
  for (const ch of segment) {
    if (ch >= "A" && ch <= "Z") count++;
  }
  return count / segment.length;
}

export function maxRunLength(segment: string): number {
  if (segment.length === 0) return 0;
  let max = 1;
  let run = 1;
  for (let i = 1; i < segment.length; i++) {
    if (segment[i] === segment[i - 1]) {
      run++;
      if (run > max) max = run;
    } else {
      run = 1;
    }
  }
  return max;
}

export function hasTripleRepeat(segment: string): boolean {
  return /(.)\1{2}/.test(segment);
}

export function hasAlternatingPattern(segment: string): boolean {
  if (segment.length < 4) return false;
  for (let i = 0; i < segment.length - 3; i++) {
    if (
      segment[i] !== segment[i + 1] &&
      segment[i] === segment[i + 2] &&
      segment[i + 1] === segment[i + 3]
    ) {
      return true;
    }
  }
  return false;
}

export function consonantClusterCount(segment: string): number {
  let count = 0;
  let inCluster = false;
  for (const ch of segment) {
    const isConsonant =
      /[a-zA-Z]/.test(ch) && !VOWELS.has(ch);
    if (isConsonant) {
      if (!inCluster) {
        count++;
        inCluster = true;
      }
    } else {
      inCluster = false;
    }
  }
  return count;
}

export function pairwiseHueOffset(segment: string): number {
  let sum = 0;
  for (let i = 0; i < segment.length - 1; i++) {
    sum += segment.charCodeAt(i) + segment.charCodeAt(i + 1);
  }
  return (sum % 121) - 60; // -60 to +60
}

export function zoneHash(segment: string): number {
  return charSum(segment) % 997;
}

export function checksum(segment: string): number {
  return charSum(segment) % 97;
}

export function seedId(seed: string): string {
  return seed.slice(0, 8);
}
