/** WCAG contrast utilities and accent nudging */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function contrastRatio(fg: string, bg: string): number {
  const [fr, fg2, fb] = hexToRgb(fg);
  const [br, bg2, bb] = hexToRgb(bg);
  const l1 = relativeLuminance(fr, fg2, fb);
  const l2 = relativeLuminance(br, bg2, bb);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((c) => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, "0"))
      .join("")
  );
}

function adjustLightness(hex: string, delta: number): string {
  const [r, g, b] = hexToRgb(hex);
  const factor = 1 + delta;
  return rgbToHex(r * factor, g * factor, b * factor);
}

export function ensureContrast(
  accent: string,
  surface: string,
  minRatio = 4.5,
  maxAttempts = 12
): { color: string; note?: string } {
  let color = accent;
  let ratio = contrastRatio(color, surface);

  if (ratio >= minRatio) {
    return { color };
  }

  const direction = relativeLuminance(...hexToRgb(surface)) > 0.5 ? -1 : 1;
  for (let i = 0; i < maxAttempts; i++) {
    color = adjustLightness(color, direction * 0.08);
    ratio = contrastRatio(color, surface);
    if (ratio >= minRatio) {
      return {
        color,
        note: `Accent nudged for WCAG AA (${ratio.toFixed(2)}:1 on surface)`,
      };
    }
  }

  return {
    color,
    note: `Accent contrast ${ratio.toFixed(2)}:1 — below AA after nudge`,
  };
}

export function auditPalette(colors: {
  ink: string;
  muted: string;
  accent: string;
  accentText: string;
  bg: string;
  surface: string;
}): string[] {
  const notes: string[] = [];
  const inkOnBg = contrastRatio(colors.ink, colors.bg);
  const inkOnSurface = contrastRatio(colors.ink, colors.surface);
  const accentOnSurface = contrastRatio(colors.accentText, colors.surface);
  const mutedOnBg = contrastRatio(colors.muted, colors.bg);

  if (inkOnBg < 4.5) notes.push(`Ink on bg: ${inkOnBg.toFixed(2)}:1 (fail)`);
  if (inkOnSurface < 4.5) notes.push(`Ink on surface: ${inkOnSurface.toFixed(2)}:1 (fail)`);
  if (accentOnSurface < 4.5) notes.push(`Accent text on surface: ${accentOnSurface.toFixed(2)}:1 (fail)`);
  if (mutedOnBg < 3) notes.push(`Muted on bg: ${mutedOnBg.toFixed(2)}:1 (fail large text)`);

  return notes;
}
