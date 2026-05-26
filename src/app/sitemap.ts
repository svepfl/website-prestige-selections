import type { MetadataRoute } from 'next';
import { vehicles } from '@/data/vehicles';

const BASE_URL = 'https://www.prestige-selections.com';
const locales = ['de', 'en', 'fr'] as const;

function localizedUrl(locale: string, path: string = '') {
  return `${BASE_URL}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/fahrzeuge', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: '/haus', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/verkaufen', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/werkstatt', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/werkstatt/wartung', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/werkstatt/reparatur', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/werkstatt/aufbereitung', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/werkstatt/restauration', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/marken/ferrari', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/marken/porsche', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/marken/lamborghini', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/marken/aston-martin', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/marken/bentley', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/marken/maserati', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/marken/rolls-royce', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/vermittelt', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/kontakt', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/impressum', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/datenschutz', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/barrierefreiheit', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(locale, route.path),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, localizedUrl(l, route.path)])
          ),
        },
      });
    }
  }

  for (const vehicle of vehicles) {
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(locale, `/fahrzeuge/${vehicle.id}`),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, localizedUrl(l, `/fahrzeuge/${vehicle.id}`)])
          ),
        },
      });
    }
  }

  return entries;
}
