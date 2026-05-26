import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import VerkaufenContent from './VerkaufenContent';
import { buildHreflangMap } from '@/lib/hreflang';

const BASE_URL = 'https://www.prestige-selections.com';
const locales = ['de', 'en', 'fr'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (locales as readonly string[]).includes(locale) ? locale : 'de';
  const t = await getTranslations({ locale: safeLocale, namespace: 'verkaufen' });
  const url = `${BASE_URL}/${safeLocale}/verkaufen`;
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: url,
      languages: buildHreflangMap('/verkaufen'),
    },
  };
}

export default function VerkaufenPage() {
  return <VerkaufenContent />;
}
