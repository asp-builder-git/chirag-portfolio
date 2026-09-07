/**
 * Appearance drawer client logic — playground only.
 * Bundled via AppearanceDrawer <script>, not triplicated is:inline.
 */
export type AppearanceDefaults = {
  preset: string;
  theme: string;
  hero: string;
  density: string;
  motion: string;
};

export type PresetAppearanceMap = Record<
  string,
  { hero: string; density: string; theme?: string; motion?: string; preset?: string }
>;

export function bindAppearanceDrawer(opts: {
  defaultAppearance: AppearanceDefaults;
  presetAppearance: PresetAppearanceMap;
  playgroundBase: string;
}): void {
  const STORAGE_KEY = "chirag-appearance";
  const drawer = document.getElementById("appearance-drawer");
  const trigger = document.getElementById("appearance-trigger");
  const form = document.getElementById("appearance-form") as HTMLFormElement | null;
  const copyBtn = document.getElementById("copy-share-link");
  const base = String(opts.playgroundBase || "/playground").replace(/\/+$/, "");
  const defaultAppearance = opts.defaultAppearance;
  const presetAppearance = opts.presetAppearance;

  function pathPreset(): string | null {
    const path = window.location.pathname.replace(/\/+$/, "");
    if (path === base) return defaultAppearance.preset;
    if (path.indexOf(base + "/") === 0) {
      const id = path.slice(base.length + 1).split("/")[0];
      if (id && presetAppearance[id]) return id;
    }
    return null;
  }

  function isPlaygroundPath(): boolean {
    const path = window.location.pathname.replace(/\/+$/, "");
    return path === base || path.indexOf(base + "/") === 0;
  }

  function readState() {
    const params = new URLSearchParams(window.location.search);
    const fromPath = pathPreset();
    let preset = fromPath || params.get("preset") || defaultAppearance.preset;
    if (!presetAppearance[preset]) preset = defaultAppearance.preset;
    const presetDefaults = presetAppearance[preset] || {
      hero: defaultAppearance.hero,
      density: defaultAppearance.density,
    };
    return {
      preset,
      theme: params.get("theme") || defaultAppearance.theme,
      hero: params.get("hero") || presetDefaults.hero,
      density: params.get("density") || presetDefaults.density,
      motion: params.get("motion") || defaultAppearance.motion,
    };
  }

  function saveState(state: Record<string, string>) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }

  function loadStoredState(): Record<string, string> | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }
    return null;
  }

  function buildUrl(state: {
    preset: string;
    theme: string;
    hero: string;
    density: string;
    motion: string;
  }) {
    const params = new URLSearchParams();
    const presetDefaults = presetAppearance[state.preset] || {
      hero: defaultAppearance.hero,
      density: defaultAppearance.density,
    };
    if (state.theme !== defaultAppearance.theme) params.set("theme", state.theme);
    if (state.hero !== presetDefaults.hero) params.set("hero", state.hero);
    if (state.density !== presetDefaults.density) params.set("density", state.density);
    if (state.motion !== defaultAppearance.motion) params.set("motion", state.motion);
    const path =
      state.preset === defaultAppearance.preset ? base : base + "/" + state.preset;
    const qs = params.toString();
    return path + (qs ? "?" + qs : "");
  }

  function navigateWithState(state: {
    preset: string;
    theme: string;
    hero: string;
    density: string;
    motion: string;
  }) {
    saveState(state);
    window.location.assign(buildUrl(state));
  }

  function openDrawer() {
    if (!drawer || !trigger) return;
    drawer.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    document.body.classList.add("drawer-open");
  }

  function closeDrawer() {
    if (!drawer || !trigger) return;
    drawer.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("drawer-open");
  }

  if (trigger) {
    trigger.addEventListener("click", () => {
      if (drawer && drawer.hidden) openDrawer();
      else closeDrawer();
    });
  }

  document.querySelectorAll("[data-drawer-close]").forEach((el) => {
    el.addEventListener("click", closeDrawer);
  });

  if (form) {
    form.querySelectorAll("select").forEach((sel) => {
      sel.addEventListener("change", () => {
        const current = readState();
        const fd = new FormData(form);
        navigateWithState({
          preset: current.preset,
          theme: current.theme,
          hero: String(fd.get("hero") || current.hero),
          density: String(fd.get("density") || current.density),
          motion: String(fd.get("motion") || current.motion),
        });
      });
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const state = readState();
      const url = window.location.origin + buildUrl(state);
      navigator.clipboard.writeText(url).then(() => {
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = "Copy share link";
        }, 2000);
      });
    });
  }

  if (isPlaygroundPath()) {
    const params = new URLSearchParams(window.location.search);
    const qPreset = params.get("preset");
    const fromPath = pathPreset();
    if (qPreset && presetAppearance[qPreset] && qPreset !== fromPath) {
      params.delete("preset");
      const next = qPreset === defaultAppearance.preset ? base : base + "/" + qPreset;
      const qs = params.toString();
      window.location.replace(next + (qs ? "?" + qs : ""));
      return;
    }
  }

  const stored = loadStoredState();
  const hasParams = window.location.search.length > 1;
  if (
    stored &&
    !hasParams &&
    isPlaygroundPath() &&
    pathPreset() === defaultAppearance.preset
  ) {
    let needsRedirect = false;
    if (
      stored.preset &&
      stored.preset !== defaultAppearance.preset &&
      presetAppearance[stored.preset]
    ) {
      needsRedirect = true;
    }
    (["theme", "hero", "density", "motion"] as const).forEach((key) => {
      const presetDefaults =
        presetAppearance[stored.preset || defaultAppearance.preset] || defaultAppearance;
      const fallback =
        key === "hero" || key === "density"
          ? (presetDefaults as AppearanceDefaults)[key] || defaultAppearance[key]
          : defaultAppearance[key];
      if (stored[key] && stored[key] !== fallback && stored[key] !== defaultAppearance[key]) {
        needsRedirect = true;
      }
    });
    if (needsRedirect) {
      window.location.replace(
        buildUrl({
          preset: stored.preset || defaultAppearance.preset,
          theme: stored.theme || defaultAppearance.theme,
          hero: stored.hero || defaultAppearance.hero,
          density: stored.density || defaultAppearance.density,
          motion: stored.motion || defaultAppearance.motion,
        }),
      );
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer && !drawer.hidden) closeDrawer();
  });
}
