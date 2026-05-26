import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { jsonLd } from '@/lib/json-ld';
import Breadcrumbs from '@/components/Breadcrumbs';

const BASE_URL = 'https://www.prestige-selections.com';
const locales = ['de', 'en', 'fr'] as const;

/**
 * /barrierefreiheit — Accessibility-Statement nach EAA (European Accessibility
 * Act, in Kraft seit Juni 2025) + WCAG 2.2 AA + BFSG (DE-Umsetzung).
 *
 * Pflicht-Inhalte:
 *  1. Selbstverpflichtung + Geltungsbereich (welche Domain)
 *  2. Konformitätsstatus (WCAG 2.2 AA als Ziel)
 *  3. Bekannte Einschränkungen / Nicht-Konformitäten
 *  4. Feedback-Mechanismus + Eskalation
 *  5. Datum der Erklärung + letzter Review
 *  6. Methodik (Self-Assessment vs. Third-Party)
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (locales as readonly string[]).includes(locale) ? locale : 'de';
  const title = 'Barrierefreiheit · Prestige Selections';
  const description = 'Erklärung zur Barrierefreiheit nach EAA / BFSG — WCAG 2.2 AA als Ziel, Feedback-Mechanismus, Stand der Konformität.';
  const url = `${BASE_URL}/${safeLocale}/barrierefreiheit`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/barrierefreiheit`])),
    },
    robots: { index: true, follow: true },
  };
}

export default async function BarrierefreiheitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = (locales as readonly string[]).includes(locale) ? locale : 'de';
  return <BarrierefreiheitContent locale={safeLocale} />;
}

function BarrierefreiheitContent({ locale }: { locale: string }) {
  const t = useTranslations('barrierefreiheit');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('title'),
    description: t('intro'),
    url: `${BASE_URL}/${locale}/barrierefreiheit`,
    inLanguage: locale,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#dealer` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('title'), item: `${BASE_URL}/${locale}/barrierefreiheit` },
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

        <p className="font-display italic text-ink-soft leading-[1.5] mb-12 max-w-[60ch]" style={{ fontWeight: 300, fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)' }}>
          {t('intro')}
        </p>

        <div className="space-y-10 text-ink-soft text-sm leading-relaxed">
          {/* 1. Geltungsbereich */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700, fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {t('scopeTitle')}
            </h2>
            <p>{t('scopeBody')}</p>
          </section>

          {/* 2. Konformitätsstatus */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700, fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {t('conformanceTitle')}
            </h2>
            <p>{t('conformanceBody')}</p>
          </section>

          {/* 3. Bekannte Einschränkungen */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700, fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {t('limitationsTitle')}
            </h2>
            <p>{t('limitationsBody')}</p>
          </section>

          {/* 4. Maßnahmen */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700, fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {t('measuresTitle')}
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>{t('measureItem1')}</li>
              <li>{t('measureItem2')}</li>
              <li>{t('measureItem3')}</li>
              <li>{t('measureItem4')}</li>
              <li>{t('measureItem5')}</li>
            </ul>
          </section>

          {/* 5. Feedback */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700, fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {t('feedbackTitle')}
            </h2>
            <p>{t('feedbackBody')}</p>
            <p className="mt-3 font-mono-spec text-[12px] tabular-nums">
              <a href="mailto:hallo@systembuero.com" className="hover:text-gold-deep transition-colors">
                hallo@systembuero.com
              </a>
              <br />
              <a href="tel:+491764145810" className="hover:text-gold-deep transition-colors">
                +49 176 4145 0810
              </a>
            </p>
          </section>

          {/* 6. Eskalation / Schlichtungsstelle */}
          <section>
            <h2 className="font-sans text-ink uppercase tracking-[-0.015em] mb-3" style={{ fontWeight: 700, fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
              {t('escalationTitle')}
            </h2>
            <p>{t('escalationBody')}</p>
          </section>

          {/* Metadata */}
          <section className="pt-6 border-t border-ink/15 font-mono-spec text-[11px] uppercase tracking-[0.22em] text-ink-muted space-y-1.5">
            <p>{t('statementDateLabel')}: <span className="tabular-nums">{t('statementDate')}</span></p>
            <p>{t('lastReviewLabel')}: <span className="tabular-nums">{t('lastReview')}</span></p>
            <p>{t('methodologyLabel')}: {t('methodology')}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
