/**
 * Safe JSON-LD serialization for inline <script type="application/ld+json">.
 * Escapes `<` to prevent any premature `</script>` close in user-supplied
 * strings. Centralised so individual schema blocks never reimplement it
 * (and silently forget the escape).
 */
export function jsonLd(payload: object): string {
  return JSON.stringify(payload).replace(/</g, '\\u003c');
}

const BASE_URL = 'https://www.prestige-selections.com';

/**
 * BreadcrumbList builder — Pflicht per May-2026 SEO/AEO state on every sub-page.
 * Pass items as ordered [{ name, path }] tuples; the home entry is added.
 *   buildBreadcrumb('de', [{ name: 'Kontakt', path: '/kontakt' }])
 */
export function buildBreadcrumb(
  locale: string,
  items: Array<{ name: string; path: string }>,
  homeName = 'Prestige Selections',
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeName, item: `${BASE_URL}/${locale}` },
      ...items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: it.name,
        item: `${BASE_URL}/${locale}${it.path}`,
      })),
    ],
  };
}
