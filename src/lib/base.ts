/**
 * Join a path onto Astro `BASE_URL` safely.
 *
 * Astro 7 emits `BASE_URL` without a trailing slash for `base: '/chirag-portfolio'`,
 * so `${import.meta.env.BASE_URL}projects` becomes `/chirag-portfolioprojects` (broken).
 * This helper works whether or not BASE_URL already ends with `/`.
 */
export function withBase(path = ""): string {
  const root = String(import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const cleaned = String(path).replace(/^\/+/, "");
  if (!cleaned) return root || "/";
  return `${root}/${cleaned}`;
}
