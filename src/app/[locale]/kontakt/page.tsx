import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import KontaktContent from './KontaktContent';

const BASE_URL = 'https://www.prestige-selections.com';
const locales = ['de', 'en', 'fr'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const url = `${BASE_URL}/${locale}/kontakt`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/kontakt`])),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      type: 'website',
    },
  };
}

export default function KontaktPage() {
  return <KontaktContent />;
}
