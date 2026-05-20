import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FahrzeugeContent from './FahrzeugeContent';

const BASE_URL = 'https://www.prestige-selections.com';
const locales = ['de', 'en', 'fr'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'vehicles' });
  const url = `${BASE_URL}/${locale}/fahrzeuge`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/fahrzeuge`])),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      type: 'website',
    },
  };
}

export default function FahrzeugePage() {
  return <FahrzeugeContent />;
}
