/**
 * Hreflang-Helper — 2026-konforme Regional-Variants.
 *
 * Hintergrund (Research May 2026):
 * - Google empfiehlt explizite Regional-Targeting selbst wenn Content identisch ist.
 * - Eine deklarierte Regional-Variante (`de-CH` → /de/) signalisiert Relevanz für
 *   den Schweizer Markt, ohne dass eine separate Schweizer Seite nötig ist.
 * - `x-default` ist Pflicht für Global-Fallback (sonst Google rät via Geo-IP).
 * - 75% aller hreflang-Implementierungen haben Fehler — Symmetrie + Self-Reference Pflicht.
 *
 * Implementation: Wir mappen mehrere BCP-47-Tags auf dieselbe URL pro Sprache.
 * next-intl honoriert das via `alternates.languages`.
 */

const BASE_URL = 'https://www.prestige-selections.com';

/**
 * Erzeugt die hreflang-Map für einen Path mit regionalen Varianten.
 *
 * @param path - Pfad nach Locale, z.B. '/werkstatt' oder '/fahrzeuge/aston-martin-dbs'
 * @returns Map mit BCP-47-Tags → URLs (Regional-Variants + x-default)
 *
 * @example
 * buildHreflangMap('/werkstatt')
 * // → {
 * //   'de': 'https://.../de/werkstatt',
 * //   'de-DE': 'https://.../de/werkstatt',
 * //   'de-CH': 'https://.../de/werkstatt',
 * //   'de-AT': 'https://.../de/werkstatt',
 * //   'en': 'https://.../en/werkstatt',
 * //   'en-GB': 'https://.../en/werkstatt',
 * //   'en-US': 'https://.../en/werkstatt',
 * //   'fr': 'https://.../fr/werkstatt',
 * //   'fr-FR': 'https://.../fr/werkstatt',
 * //   'fr-CH': 'https://.../fr/werkstatt',
 * //   'x-default': 'https://.../de/werkstatt',
 * // }
 */
export function buildHreflangMap(path: string = ''): Record<string, string> {
  const de = `${BASE_URL}/de${path}`;
  const en = `${BASE_URL}/en${path}`;
  const fr = `${BASE_URL}/fr${path}`;

  return {
    de,
    'de-DE': de,
    'de-CH': de,
    'de-AT': de,
    'de-LI': de,
    en,
    'en-GB': en,
    'en-US': en,
    fr,
    'fr-FR': fr,
    'fr-CH': fr,
    'x-default': de,
  };
}
