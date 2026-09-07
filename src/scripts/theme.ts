export type ThemePref = "light" | "dark" | "system";

/**
 * Apply theme before (or after) paint. Same priority as the BaseDocument FOUC bootstrap:
 * themePref / localStorage explicit choice > forceDark > OS preference.
 */
export function initTheme(forceDark = false, themePref?: ThemePref | string | null): void {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem("theme");
  } catch {
    /* ignore */
  }
  let dark: boolean;
  if (themePref === "light" || stored === "light") dark = false;
  else if (themePref === "dark" || stored === "dark") dark = true;
  else {
    dark = Boolean(forceDark) || window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

/** Bind #theme-toggle click → flip data-theme + persist. */
export function bindThemeToggle(): void {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  });
}
