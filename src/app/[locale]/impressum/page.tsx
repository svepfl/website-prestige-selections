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
  const t = await getTranslations({ locale: safeLocale, namespace: 'impressum' });
  const url = `${BASE_URL}/${safeLocale}/impressum`;
  return {
    title: t('title'),
    description: `${t('title')} — Sven Pflüger, Schusterstraße 40, 79098 Freiburg.`,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/impressum`])),
    },
    robots: { index: true, follow: true },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = (locales as readonly string[]).includes(locale) ? locale : 'de';
  return <ImpressumContent locale={safeLocale} />;
}

function ImpressumContent({ locale }: { locale: string }) {
  const t = useTranslations('impressum');
  const isNonBinding = locale !== 'de';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('title'),
    description: `${t('title')} — Sven Pflüger, Freiburg.`,
    url: `${BASE_URL}/${locale}/impressum`,
    inLanguage: locale,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#dealer` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('title'), item: `${BASE_URL}/${locale}/impressum` },
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
          className="font-sans text-ink leading-[0.95] tracking-[-0.03em] uppercase mb-12"
          style={{ fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          {t('title')}
        </h1>

        {isNonBinding && (
          <p className="mb-12 font-mono-spec text-[11px] uppercase tracking-[0.24em] text-ink-muted border-l-2 border-gold-deep/40 pl-5 py-1 leading-[1.7]">
            {t('bindingNotice')}
          </p>
        )}

        <div className="space-y-12 text-ink-soft text-[15px] leading-[1.7]">
          {/* § 5 DDG — Diensteanbieter */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-4" style={{ fontWeight: 700 }}>
              {t('tmgHeading')}
            </h2>
            <address className="not-italic">
              {t('companyName')}<br />
              {t('companyAddress1')}<br />
              {t('companyAddress2')}<br />
              {t('companyCountry')}
            </address>
            <p className="mt-4 font-mono-spec text-[13px]">
              {t('phoneLabel')}: <a href="tel:+491764145810" className="hover:text-gold-deep transition-colors duration-300">+49 176 4145 0810</a><br />
              {t('emailLabel')}: <a href="mailto:hallo@systembuero.com" className="hover:text-gold-deep transition-colors duration-300">hallo@systembuero.com</a><br />
              {t('webLabel')}: www.prestige-selections.com
            </p>
          </section>

          {/* Inhaltlich Verantwortlich */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-4" style={{ fontWeight: 700 }}>
              {t('responsibleHeading')}
            </h2>
            <p>
              {t('companyName')}<br />
              {t('companyAddress1')}<br />
              {t('companyAddress2')}
            </p>
          </section>

          {/* EU-Streitschlichtung — Pflicht für Online-Anbieter mit Verbraucherbezug */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-4" style={{ fontWeight: 700 }}>
              {t('disputeHeading')}
            </h2>
            <p>
              {t('disputeBody')}{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noreferrer noopener"
                className="underline hover:text-gold-deep transition-colors duration-300"
              >
                ec.europa.eu/consumers/odr
              </a>
              . {t('disputeBodyTail')}
            </p>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.02em] mb-8" style={{ fontWeight: 700, fontSize: '1.25rem' }}>
              {t('liabilityHeading')}
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700 }}>
                  {t('liabilityContentHeading')}
                </h3>
                <p>{t('liabilityContentBody')}</p>
              </div>

              <div>
                <h3 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700 }}>
                  {t('liabilityLinksHeading')}
                </h3>
                <p>{t('liabilityLinksBody')}</p>
              </div>

              <div>
                <h3 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700 }}>
                  {t('liabilityCopyrightHeading')}
                </h3>
                <p>{t('liabilityCopyrightBody')}</p>
              </div>

              <div>
                <h3 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700 }}>
                  {t('liabilityPrivacyHeading')}
                </h3>
                <p>{t('liabilityPrivacyBody')}</p>
              </div>

              <div>
                <h3 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700 }}>
                  {t('liabilitySeverabilityHeading')}
                </h3>
                <p>{t('liabilitySeverabilityBody')}</p>
              </div>
            </div>
          </section>

          {/* Gleichstellungshinweis */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-4" style={{ fontWeight: 700 }}>
              {t('equalityHeading')}
            </h2>
            <p>{t('equalityBody')}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
