import { Link } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';

const BASE_URL = 'https://www.prestige-selections.com';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
}

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
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6">
        <ol className="flex items-center gap-1.5 text-sm text-neutral-500">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3 h-3 text-neutral-500" />}
              {item.href ? (
                <Link
                  href={item.href as '/'}
                  className="hover:text-gold transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-neutral-400">{item.label}</span>
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
