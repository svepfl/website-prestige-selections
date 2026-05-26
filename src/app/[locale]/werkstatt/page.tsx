import type { Metadata } from 'next';
import { jsonLd, buildBreadcrumb } from '@/lib/json-ld';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import PageFaq from '@/components/sections/PageFaq';
import WerkstattHero from '@/components/sections/werkstatt/WerkstattHero';
import Pruefpunkte from '@/components/sections/werkstatt/Pruefpunkte';
import LeistungenCards from '@/components/sections/werkstatt/LeistungenCards';
import MidPageAnchor from '@/components/sections/MidPageAnchor';
import PromiseQuote from '@/components/sections/werkstatt/PromiseQuote';
import Abschluss from '@/components/sections/Abschluss';
import { manufacturers } from '@/data/vehicles';
import { buildHreflangMap } from '@/lib/hreflang';

const BASE_URL = 'https://www.prestige-selections.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'workshop' });
  const url = `${BASE_URL}/${locale}/werkstatt`;

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: url,
      languages: buildHreflangMap('/werkstatt'),
    },
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), url, type: 'website' },
  };
}

const serviceKeys = ['maintenance', 'repair', 'restoration', 'detailing'] as const;

// Schema-knowsAbout — kombiniert Brand-Keywords (SEO) mit Service-Typologien
// (Atelier betreut Sportwagen breit, nicht nur diese 7 Marken — Visual zeigt das nicht,
// aber Schema bleibt brand-keyword-relevant für AI/Search).
const brands = manufacturers.map((m) =>
  m === 'ROLLS ROYCE'
    ? 'Rolls-Royce'
    : m === 'ASTON MARTIN'
      ? 'Aston Martin'
      : m.charAt(0) + m.slice(1).toLowerCase(),
);

const serviceTypologies = [
  'Sportwagen-Wartung',
  'V8-Service',
  'V10-Service',
  'V12-Service',
  'W12-Service',
  'Boxer-Motor-Service',
  'Karbon-Monocoque-Reparatur',
  'Aluminium-Karosserie',
  'OEM-Diagnose',
  'GT-Restauration',
  'Hand-Aufbau-Service',
  'Sammlerfahrzeug-Pflege',
];

const knowsAboutCombined = [...brands, ...serviceTypologies];

const processSteps = [1, 2, 3] as const;

// Per-step atelier image + alt — concrete process-moment per step.
const PROCESS_IMAGE: Record<number, { src: string; alt: string }> = {
  1: {
    src: '/assets/verkaufen/verkaufen-hero-placeholder.webp',
    alt: 'Annahme — Schlüsselübergabe auf Workbench mit Lederfolder bei Prestige Selections',
  },
  2: {
    src: '/assets/werkstatt/werkstatt-reparatur-hero-placeholder.webp',
    alt: 'Absprache — OEM-Diagnose-Tablet auf aged-oak Workbench im Atelier Prestige Selections',
  },
  3: {
    src: '/assets/vermittelt/vermittelt-hero-placeholder.webp',
    alt: 'Übergabe — drei Sportwagen in Echelon-Formation im Showroom Prestige Selections',
  },
};

export default function WerkstattPage() {
  const t = useTranslations('workshop');
  const locale = useLocale();

  return (
    <main className="bg-canvas text-ink">
      {/* ═══════════════ HERO — Full-Bleed Cinematic (Breadcrumbs als Overlay) ═══════════════ */}
      <WerkstattHero />

      {/* ═══════════════ SERVICES (WHAT) — Editorial 2×2 Cards ═══════════════ */}
      <LeistungenCards />

      {/* ═══════════════ 142 PRÜFPUNKTE (PROOF) — SIGNATURE MECHANISM ═══════════════ */}
      <Pruefpunkte />

      {/* ═══════════════ MID-PAGE-CTA (Heap 2022 Decision-Zone bei 40-60%) ═══════════════ */}
      <MidPageAnchor />

      {/* ═══════════════ PROCESS (HOW) — Editorial Step-Cards mit Photos ═══════════════ */}
      <section className="relative px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/15 overflow-hidden">
        {/* Atmospheric Background — sehr subtle Atelier-Wash */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/werkstatt/werkstatt-hero-placeholder.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.06,
          }}
        />
        {/* Canvas-Overlay damit Text primär bleibt */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, color-mix(in oklab, var(--color-canvas) 88%, transparent) 0%, color-mix(in oklab, var(--color-canvas) 95%, transparent) 100%)',
          }}
        />

        <div className="relative mx-auto max-w-[1500px]" style={{ zIndex: 2 }}>
          <div className="flex items-baseline gap-4 mb-14 md:mb-20">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/60" />
            <p
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
              style={{ fontWeight: 500 }}
            >
              {t('processLabel')}
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16">
            {processSteps.map((step) => {
              const img = PROCESS_IMAGE[step]!;
              return (
                <li key={step} className="relative group">
                  {/* Step-Image — editorial Portrait */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-canvas-soft mb-7">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                    />
                    {/* Step-Number-Overlay — Massive italic über dem Image bottom-left */}
                    <div className="absolute bottom-4 left-5 md:bottom-6 md:left-6">
                      <span
                        aria-hidden
                        className="font-display italic text-on-shadow leading-none block"
                        style={{
                          fontWeight: 300,
                          fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                          textShadow:
                            '0 2px 16px color-mix(in oklab, var(--color-shadow) 50%, transparent)',
                        }}
                      >
                        {String(step).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="font-sans text-ink leading-tight tracking-[-0.015em] uppercase"
                    style={{ fontWeight: 700, fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)' }}
                  >
                    {t(`process${step}Title` as 'process1Title')}
                  </h3>
                  <p
                    className="mt-4 font-sans text-base text-ink-soft leading-[1.6] max-w-[36ch]"
                    style={{ fontWeight: 400 }}
                  >
                    {t(`process${step}Body` as 'process1Body')}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ═══════════════ PROMISE QUOTE — Cinematic Risk-Reversal Close ═══════════════ */}
      <PromiseQuote />

      {/* ═══════════════ FAQ (SEO + AEO) ═══════════════ */}
      <PageFaq namespace="workshop" tone="light" />

      {/* ═══════════════ FINAL CTA — Canonical Abschluss (Sven) ═══════════════ */}
      <Abschluss
        label={t('abschluss.label')}
        visitLabel={t('cta')}
        analyticsKey="werkstatt"
      />

      {/* AutoRepair Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AutoRepair',
            name: 'Prestige Selections Atelier',
            url: `${BASE_URL}/${locale}/werkstatt`,
            description: t('intro'),
            telephone: '+49-176-4145-0810',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Schusterstraße 40',
              addressLocality: 'Freiburg im Breisgau',
              postalCode: '79098',
              addressCountry: 'DE',
            },
            parentOrganization: {
              '@id': `${BASE_URL}/#dealer`,
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Atelier Services',
              itemListElement: serviceKeys.map((key) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: t(`services.${key}.title`),
                  description: t(`services.${key}.text`),
                },
              })),
            },
            knowsAbout: knowsAboutCombined,
          }).replace(/</g, '\\u003c'),
        }}
      />

      {/* HowTo Schema — 3-step process */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: t('processLabel'),
            step: processSteps.map((step) => ({
              '@type': 'HowToStep',
              position: step,
              name: t(`process${step}Title` as 'process1Title'),
              text: t(`process${step}Body` as 'process1Body'),
            })),
          }).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildBreadcrumb(locale, [{ name: t('title'), path: '/werkstatt' }])) }}
      />
    </main>
  );
}

