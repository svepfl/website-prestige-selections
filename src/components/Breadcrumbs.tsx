import { Link } from '@/i18n/navigation';

const BASE_URL = 'https://www.prestige-selections.com';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
}

/**
 * Breadcrumbs — editorial mono-spec tier matching site-wide typography.
 *
 * Container alignt mit Page-Content (max-w-[1500px], px-6/10/14 responsive).
 * Type: font-mono-spec uppercase tracking-wide — matches Header utility-tier.
 * Separator: mono-spec "·" statt Lucide-Chevron (editorial-restraint).
 */
export default function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' as const }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `${BASE_URL}/${locale}${item.href === '/' ? '' : item.href}` }
        : {}),
    })),
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="px-6 md:px-10 lg:px-14 py-5 md:py-6"
      >
        <ol
          className="mx-auto max-w-[1500px] flex items-center gap-3 font-mono-spec text-[10.5px] uppercase tracking-[0.22em] text-ink-muted"
          style={{ fontWeight: 500 }}
        >
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              {index > 0 && (
                <span aria-hidden className="text-ink-muted/40 select-none">
                  ·
                </span>
              )}
              {item.href ? (
                <Link
                  href={item.href as '/'}
                  className="hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-ink" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
