import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { manufacturers } from '@/data/vehicles';
import { buildHreflangMap } from '@/lib/hreflang';
import { jsonLd, buildBreadcrumb } from '@/lib/json-ld';
import Abschluss from '@/components/sections/Abschluss';

const BASE_URL = 'https://www.prestige-selections.com';

type ServiceSlug = 'wartung' | 'reparatur' | 'aufbereitung' | 'restauration';
const SERVICE_SLUGS: readonly ServiceSlug[] = ['wartung', 'reparatur', 'aufbereitung', 'restauration'];

const HERO_IMAGE: Record<ServiceSlug, string> = {
  wartung: '/assets/werkstatt/werkstatt-wartung-hero-placeholder.webp',
  reparatur: '/assets/werkstatt/werkstatt-reparatur-hero-placeholder.webp',
  aufbereitung: '/assets/werkstatt/werkstatt-aufbereitung-hero-placeholder.webp',
  restauration: '/assets/werkstatt/werkstatt-restauration-hero-placeholder.webp',
};

const HERO_ALT: Record<ServiceSlug, string> = {
  wartung: 'Sportwagen-Wartung im Atelier von Prestige Selections in Freiburg',
  reparatur: 'Sportwagen-Reparatur in der Meister-Werkstatt von Prestige Selections in Freiburg',
  aufbereitung: 'Fahrzeug-Aufbereitung und Keramikversiegelung im Atelier von Prestige Selections in Freiburg',
  restauration: 'Klassiker-Restauration und Einlagerung im Atelier von Prestige Selections in Freiburg',
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}): Promise<Metadata> {
  const { locale, service } = await params;
  if (!SERVICE_SLUGS.includes(service as ServiceSlug)) return {};
  const t = await getTranslations({ locale, namespace: 'serviceDetail' });
  const slug = service as ServiceSlug;
  const url = `${BASE_URL}/${locale}/werkstatt/${slug}`;
  return {
    title: t(`${slug}.metaTitle` as 'wartung.metaTitle'),
    description: t(`${slug}.metaDescription` as 'wartung.metaDescription'),
    alternates: {
      canonical: url,
      languages: buildHreflangMap(`/werkstatt/${slug}`),
    },
    openGraph: {
      title: t(`${slug}.metaTitle` as 'wartung.metaTitle'),
      description: t(`${slug}.metaDescription` as 'wartung.metaDescription'),
      url,
      type: 'website',
    },
  };
}

const brands = manufacturers.map((m) =>
  m === 'ROLLS ROYCE'
    ? 'Rolls-Royce'
    : m === 'ASTON MARTIN'
      ? 'Aston Martin'
      : m.charAt(0) + m.slice(1).toLowerCase(),
);

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { service } = await params;
  if (!SERVICE_SLUGS.includes(service as ServiceSlug)) notFound();
  return <ServiceDetailContent slug={service as ServiceSlug} />;
}

function ServiceDetailContent({ slug }: { slug: ServiceSlug }) {
  const t = useTranslations('serviceDetail');
  const tWorkshop = useTranslations('workshop');
  const locale = useLocale();

  const includesCount = 8;
  const faqCount = 3;
  const otherSlugs = SERVICE_SLUGS.filter((s) => s !== slug);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t(`${slug}.h1Line1` as 'wartung.h1Line1') + ' ' + t(`${slug}.h1Line2` as 'wartung.h1Line2'),
    description: t(`${slug}.metaDescription` as 'wartung.metaDescription'),
    provider: { '@id': `${BASE_URL}/#dealer` },
    areaServed: { '@type': 'City', name: 'Freiburg im Breisgau' },
    serviceType: t(`${slug}.h1Line1` as 'wartung.h1Line1'),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['main h1', 'main h2', 'main h3'],
    },
    mainEntity: Array.from({ length: faqCount }, (_, i) => i + 1).map((i) => ({
      '@type': 'Question',
      name: t(`${slug}.faq.q${i}` as 'wartung.faq.q1'),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`${slug}.faq.a${i}` as 'wartung.faq.a1'),
      },
    })),
  };

  return (
    <main className="bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            buildBreadcrumb(locale, [
              { name: t('commonLabel'), path: '/werkstatt' },
              { name: t(`${slug}.h1Line1` as 'wartung.h1Line1'), path: `/werkstatt/${slug}` },
            ]),
          ),
        }}
      />

      {/* Breadcrumbs */}
      <div className="pt-24 lg:pt-28">
        <Breadcrumbs
          locale={locale}
          items={[
            { label: tWorkshop('title'), href: '/werkstatt' },
            { label: t(`${slug}.h1Line1` as 'wartung.h1Line1').replace(/\.$/, '') },
          ]}
        />
      </div>

      {/* HERO */}
      <section className="px-6 md:px-10 lg:px-14 pt-6 md:pt-10 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-center gap-3 font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-10">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
            <span style={{ fontWeight: 500 }}>{t('commonLabel')}</span>
          </div>

          <h1
            className="font-sans text-ink leading-[0.95] tracking-[-0.03em] uppercase max-w-[18ch]"
            style={{ fontWeight: 700, fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}
          >
            {t(`${slug}.h1Line1` as 'wartung.h1Line1')}<br />
            <span className="text-ink-muted" style={{ fontWeight: 400 }}>
              {t(`${slug}.h1Line2` as 'wartung.h1Line2')}
            </span>
          </h1>

          <p
            className="mt-12 font-sans text-lg md:text-xl text-ink-soft leading-[1.55] max-w-3xl"
            style={{ fontWeight: 400 }}
          >
            {t(`${slug}.intro` as 'wartung.intro')}
          </p>

          <div className="mt-16 md:mt-24 relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl bg-canvas-soft">
            <Image
              src={HERO_IMAGE[slug]}
              alt={HERO_ALT[slug]}
              fill
              sizes="(max-width: 1300px) 100vw, 1300px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* EDITORIAL BODY */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/15">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-16 gap-y-10">
            <div className="lg:col-span-5">
              <div className="flex items-baseline gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold-deep/60" />
                <p
                  className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
                  style={{ fontWeight: 500 }}
                >
                  {t('includesLabel')}
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p
                className="font-sans text-base md:text-lg text-ink-soft leading-[1.7] max-w-[62ch]"
                style={{ fontWeight: 400 }}
              >
                {t(`${slug}.body` as 'wartung.body')}
              </p>

              <ul className="mt-14 divide-y divide-ink/12">
                {Array.from({ length: includesCount }, (_, i) => i).map((i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[3rem_1fr] gap-6 py-5 items-baseline"
                  >
                    <span
                      className="font-mono-spec tabular-nums text-[11px] uppercase tracking-[0.32em] text-gold-deep"
                      style={{ fontWeight: 500 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-sans text-base md:text-lg text-ink leading-[1.55]"
                      style={{ fontWeight: 400 }}
                    >
                      {t(`${slug}.includes.${i}` as 'wartung.includes.0')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/15">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-baseline gap-4 mb-12">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/60" />
            <p
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
              style={{ fontWeight: 500 }}
            >
              {t('brandsLabel')}
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {brands.map((b) => (
              <li
                key={b}
                className="font-sans text-xl md:text-2xl lg:text-3xl text-ink tracking-[-0.01em] uppercase"
                style={{ fontWeight: 600 }}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/15">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-baseline gap-4 mb-12">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/60" />
            <p
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
              style={{ fontWeight: 500 }}
            >
              {t('faqLabel')}
            </p>
          </div>
          <ul className="border-t border-ink/15">
            {Array.from({ length: faqCount }, (_, i) => i + 1).map((i) => (
              <li key={i} className="border-b border-ink/15 py-8">
                <h3
                  className="font-sans text-ink leading-[1.3] tracking-[-0.015em]"
                  style={{ fontWeight: 600, fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)' }}
                >
                  {t(`${slug}.faq.q${i}` as 'wartung.faq.q1')}
                </h3>
                <p
                  className="mt-4 font-sans text-base md:text-lg text-ink-soft leading-[1.65] max-w-[62ch]"
                  style={{ fontWeight: 400 }}
                >
                  {t(`${slug}.faq.a${i}` as 'wartung.faq.a1')}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/15">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-baseline gap-4 mb-12">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/60" />
            <p
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
              style={{ fontWeight: 500 }}
            >
              {t('alsoLabel')}
            </p>
          </div>
          <ul className="divide-y divide-ink/15">
            {otherSlugs.map((other) => (
              <li key={other} className="py-6">
                <Link
                  href={`/werkstatt/${other}` as '/werkstatt'}
                  className="group inline-flex items-baseline gap-4 font-sans text-ink hover:text-gold-deep transition-colors duration-300"
                  style={{ fontWeight: 500, fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)' }}
                >
                  {t(`${other}Short` as 'wartungShort')}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Canonical Abschluss — Sven · Service-Detail */}
      <Abschluss
        label={tWorkshop('abschluss.label')}
        visitLabel={t('ctaLabel')}
        analyticsKey={slug}
      />
    </main>
  );
}

