import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FahrzeugeContent from './FahrzeugeContent';
import { buildHreflangMap } from '@/lib/hreflang';

const BASE_URL = 'https://www.prestige-selections.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'vehicles' });
  const url = `${BASE_URL}/${locale}/fahrzeuge`;

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: url,
      languages: buildHreflangMap('/fahrzeuge'),
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url,
      type: 'website',
    },
  };
}

export default function FahrzeugePage() {
  return <FahrzeugeContent />;
}
