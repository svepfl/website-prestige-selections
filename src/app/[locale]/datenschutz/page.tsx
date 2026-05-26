import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { jsonLd } from '@/lib/json-ld';
import Breadcrumbs from '@/components/Breadcrumbs';

const BASE_URL = 'https://www.prestige-selections.com';
const locales = ['de', 'en', 'fr'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (locales as readonly string[]).includes(locale) ? locale : 'de';
  const t = await getTranslations({ locale: safeLocale, namespace: 'datenschutz' });
  const url = `${BASE_URL}/${safeLocale}/datenschutz`;
  return {
    title: t('title'),
    description: t('intro'),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/datenschutz`])),
    },
    robots: { index: true, follow: true },
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = (locales as readonly string[]).includes(locale) ? locale : 'de';
  return <DatenschutzContent locale={safeLocale} />;
}

function DatenschutzContent({ locale }: { locale: string }) {
  const t = useTranslations('datenschutz');
  const isNonBinding = locale !== 'de';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('title'),
    description: t('intro'),
    url: `${BASE_URL}/${locale}/datenschutz`,
    inLanguage: locale,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#dealer` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('title'), item: `${BASE_URL}/${locale}/datenschutz` },
    ],
  };

  return (
    <main className="bg-canvas text-ink pt-32 pb-24 md:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <div className="px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[920px]">
          <Breadcrumbs locale={locale} items={[{ label: t('title') }]} />
        </div>
      </div>

      <div className="max-w-[920px] mx-auto px-6 md:px-10 lg:px-14">
        <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-6">
          {t('label')}
        </p>
        <h1
          className="font-sans text-ink leading-[0.95] tracking-[-0.03em] uppercase mb-10"
          style={{ fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          {t('title')}
        </h1>

        <p
          className="font-display italic text-ink-soft leading-[1.55] mb-10 max-w-[60ch]"
          style={{ fontWeight: 300, fontSize: 'clamp(1.0625rem, 1.7vw, 1.3rem)' }}
        >
          {t('intro')}
        </p>

        {isNonBinding && (
          <p className="mb-12 font-mono-spec text-[11px] uppercase tracking-[0.24em] text-ink-muted border-l-2 border-gold-deep/40 pl-5 py-1 leading-[1.7]">
            {t('bindingNotice')}
          </p>
        )}

        <div className="space-y-12 text-ink-soft text-[15px] leading-[1.7]">
          {/* 1. Verantwortlicher */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-4" style={{ fontWeight: 700 }}>
              {t('controllerHeading')}
            </h2>
            <p>{t('controllerBody')}</p>
            <p className="mt-4 font-mono-spec text-[13px] leading-[1.7]">
              {t('controllerContact')}
            </p>
          </section>

          {/* 2. Collection */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-6" style={{ fontWeight: 700 }}>
              {t('collectionHeading')}
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700 }}>
                  {t('visitHeading')}
                </h3>
                <p>{t('visitBody')}</p>
                <ul className="list-disc pl-6 mt-3 space-y-1.5">
                  <li>{t('visitLog1')}</li>
                  <li>{t('visitLog2')}</li>
                  <li>{t('visitLog3')}</li>
                  <li>{t('visitLog4')}</li>
                  <li>{t('visitLog5')}</li>
                </ul>
                <p className="mt-4 font-medium text-ink">{t('visitPurposes')}</p>
                <ul className="list-disc pl-6 mt-3 space-y-1.5">
                  <li>{t('visitPurpose1')}</li>
                  <li>{t('visitPurpose2')}</li>
                  <li>{t('visitPurpose3')}</li>
                  <li>{t('visitPurpose4')}</li>
                </ul>
                <p className="mt-4 italic text-ink-muted">{t('visitLegal')}</p>
              </div>

              <div>
                <h3 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700 }}>
                  {t('formHeading')}
                </h3>
                <p>{t('formBody')}</p>
              </div>
            </div>
          </section>

          {/* 3. Analytics */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-4" style={{ fontWeight: 700 }}>
              {t('analyticsHeading')}
            </h2>
            <p className="mb-6">{t('analyticsIntro')}</p>

            <div className="space-y-8">
              <div>
                <h3 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700 }}>
                  {t('plausibleHeading')}
                </h3>
                <p>{t('plausibleBody')}</p>
              </div>

              <div>
                <h3 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700 }}>
                  {t('stapeHeading')}
                </h3>
                <p>{t('stapeBody')}</p>
                <p className="mt-4 font-mono-spec text-[12px] uppercase tracking-[0.22em] text-ink-muted leading-[1.7] border-l border-ink/15 pl-4 py-1">
                  {t('consentModeNote')}
                </p>
              </div>
            </div>
          </section>

          {/* 4. Cookies */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-4" style={{ fontWeight: 700 }}>
              {t('cookiesHeading')}
            </h2>
            <p>{t('cookiesIntro')}</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong className="text-ink">{t('cookieNecessary')}</strong></li>
              <li>{t('cookieAnalytics')}</li>
              <li>{t('cookieMarketing')}</li>
            </ul>
            <p className="mt-4 italic">{t('cookieControl')}</p>
          </section>

          {/* 5. AI */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-4" style={{ fontWeight: 700 }}>
              {t('aiHeading')}
            </h2>
            <p>{t('aiBody')}</p>
          </section>

          {/* 6. Rights */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-4" style={{ fontWeight: 700 }}>
              {t('rightsHeading')}
            </h2>
            <p>{t('rightsIntro')}</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>{t('rightsItem1')}</li>
              <li>{t('rightsItem2')}</li>
              <li>{t('rightsItem3')}</li>
              <li>{t('rightsItem4')}</li>
              <li>{t('rightsItem5')}</li>
              <li>{t('rightsItem6')}</li>
              <li>{t('rightsItem7')}</li>
              <li>{t('rightsItem8')}</li>
            </ul>
            <p className="mt-5 font-mono-spec text-[12px] leading-[1.7]">{t('rightsAuthority')}</p>
          </section>

          {/* 7. SSL */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-4" style={{ fontWeight: 700 }}>
              {t('sslHeading')}
            </h2>
            <p>{t('sslBody')}</p>
          </section>

          {/* 8. Updates */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-4" style={{ fontWeight: 700 }}>
              {t('updatesHeading')}
            </h2>
            <p>{t('updatesBody')}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
