'use client';

import { useTranslations, useLocale } from 'next-intl';
import { jsonLd, buildBreadcrumb } from '@/lib/json-ld';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import Reveal from '@/components/editorial/Reveal';
import PageFaq from '@/components/sections/PageFaq';
import Abschluss from '@/components/sections/Abschluss';
import ContactFormSection from '@/components/sections/ContactFormSection';

const HERO_IMAGE = '/assets/verkaufen/verkaufen-hero-placeholder.webp';
const PHONE_HREF = 'tel:+491764145810';

// Per-step photo + alt — concrete process-moment for each step
const STEP_IMAGES = [
  { src: '/assets/verkaufen/verkaufen-hero-placeholder.webp', altKey: 'step1Alt' },
  { src: '/assets/werkstatt/werkstatt-reparatur-hero-placeholder.webp', altKey: 'step2Alt' },
  { src: '/assets/vermittelt/vermittelt-hero-placeholder.webp', altKey: 'step3Alt' },
] as const;

// WhatWeBuy category-tiles — vehicle photos signal what we acquire
const WHATWEBUY_TILES = [
  {
    titleKey: 'whatWeBuy1Title',
    bodyKey: 'whatWeBuy1',
    altKey: 'whatWeBuy1Alt',
    image: '/assets/spuren/spuren-06-porsche-911-gt3rs-placeholder.webp',
    span: 'col-span-12 md:col-span-8 aspect-[16/10]',
  },
  {
    titleKey: 'whatWeBuy2Title',
    bodyKey: 'whatWeBuy2',
    altKey: 'whatWeBuy2Alt',
    image: '/assets/spuren/spuren-08-porsche-911-carrera-placeholder.webp',
    span: 'col-span-12 md:col-span-4 aspect-[16/10] md:aspect-[4/5]',
  },
  {
    titleKey: 'whatWeBuy3Title',
    bodyKey: 'whatWeBuy3',
    altKey: 'whatWeBuy3Alt',
    image: '/assets/spuren/spuren-01-aston-martin-dbs-placeholder.webp',
    span: 'col-span-12 md:col-span-4 aspect-[4/5]',
  },
  {
    titleKey: 'whatWeBuy4Title',
    bodyKey: 'whatWeBuy4',
    altKey: 'whatWeBuy4Alt',
    image: '/assets/spuren/spuren-05-maserati-mc20-placeholder.webp',
    span: 'col-span-12 md:col-span-4 aspect-[4/5]',
  },
  {
    titleKey: 'whatWeBuy5Title',
    bodyKey: 'whatWeBuy5',
    altKey: 'whatWeBuy5Alt',
    image: '/assets/spuren/spuren-03-ferrari-488-pista-placeholder.webp',
    span: 'col-span-12 md:col-span-4 aspect-[4/5]',
  },
] as const;

export default function VerkaufenContent() {
  const t = useTranslations('verkaufen');
  const locale = useLocale();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('label'),
    description: t('intro'),
    provider: { '@id': 'https://www.prestige-selections.com/#dealer' },
    serviceType: 'Vehicle acquisition',
    areaServed: ['DE', 'CH', 'AT', 'FR', 'LI'],
  };

  return (
    <main className="bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildBreadcrumb(locale, [{ name: t('title'), path: '/verkaufen' }])) }}
      />

      {/* ═══════════════ HERO — Full-Bleed Cinema (Rule 09 Canonical Hero Pattern A) ═══════════════ */}
      <section className="relative w-full overflow-hidden bg-shadow" aria-labelledby="verkaufen-h1">
        <div className="relative sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] xl:aspect-[2.4/1] min-h-[80vh]">
          <Image
            src={HERO_IMAGE}
            alt={t('heroImageAlt')}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          {/* Cinema-Gradient — bottom-up + left-side for text legibility */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, color-mix(in oklab, var(--color-shadow) 92%, transparent) 0%, color-mix(in oklab, var(--color-shadow) 70%, transparent) 30%, color-mix(in oklab, var(--color-shadow) 30%, transparent) 60%, color-mix(in oklab, var(--color-shadow) 10%, transparent) 100%)',
            }}
          />

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full min-w-0 px-6 md:px-10 lg:px-14 pb-16 md:pb-24 lg:pb-28">
              <div className="mx-auto max-w-[1500px] min-w-0">
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <span aria-hidden className="block h-px w-12 bg-gold/80" />
                  <p
                    className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold"
                    style={{ fontWeight: 500 }}
                  >
                    {t('label')}
                  </p>
                </div>

                <h1
                  id="verkaufen-h1"
                  className="font-sans text-on-shadow leading-[0.92] tracking-[-0.025em] [overflow-wrap:anywhere] min-w-0 max-w-full lg:max-w-[18ch] [text-wrap:balance]"
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 6vw, 7.5rem)',
                  }}
                >
                  <span className="block">{t('heroTitle')}</span>
                  <span
                    className="block font-display italic text-on-shadow/85 tracking-[-0.015em]"
                    style={{ fontWeight: 300 }}
                  >
                    {t('heroTitleItalic')}
                  </span>
                </h1>

                <p
                  className="mt-8 md:mt-10 font-sans text-on-shadow/85 leading-[1.55] max-w-[58ch]"
                  style={{ fontWeight: 400, fontSize: 'clamp(1rem, 1.2vw, 1.15rem)' }}
                >
                  {t('intro')}
                </p>

                {/* Trust-Stat-Strip — 3 micro-stats */}
                <dl className="mt-10 md:mt-14 grid grid-cols-3 gap-x-6 gap-y-2 max-w-[640px]">
                  {[1, 2, 3].map((n) => (
                    <div key={n}>
                      <dt className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-on-shadow-muted">
                        {t(`heroStat${n}Label` as 'heroStat1Label')}
                      </dt>
                      <dd
                        className="mt-2 font-sans tabular-nums text-gold leading-none"
                        style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
                      >
                        {t(`heroStat${n}Value` as 'heroStat1Value')}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT FORM — 2nd Section after Hero (Anbieten-specific) ═══════════════ */}
      <ContactFormSection
        label={t('formLabel')}
        headline={t('formHeadline')}
        intro={t('formIntro')}
        vehicleHint={t('formVehicleHint')}
        messageHint={t('formMessageHint')}
        analyticsKey="verkaufen"
      />

      {/* ═══════════════ STEPS — Editorial Bento with Photo per Step (Rule 05 Pattern C) ═══════════════ */}
      <section
        className="px-6 md:px-10 lg:px-14 py-24 md:py-32 border-t border-ink/15"
        aria-labelledby="steps-label"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-12 md:mb-16 border-b border-ink/15 pb-5">
              <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
              <p
                id="steps-label"
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
                style={{ fontWeight: 500 }}
              >
                {t('stepsLabel')}
              </p>
            </div>
          </Reveal>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16">
            {[1, 2, 3].map((i) => {
              const img = STEP_IMAGES[i - 1]!;
              return (
                <Reveal key={i} delayMs={i * 80}>
                  <li className="relative group">
                    {/* Step-Image */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-canvas-soft shadow-card-rest mb-7">
                      <Image
                        src={img.src}
                        alt={t(img.altKey as 'step1Alt')}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                      />
                      {/* Step-Number bottom-left massive */}
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
                          {t(`step${i}Number` as 'step1Number')}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="font-sans text-ink leading-tight tracking-[-0.015em] uppercase"
                      style={{ fontWeight: 700, fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)' }}
                    >
                      {t(`step${i}Title` as 'step1Title')}
                    </h3>
                    <p
                      className="mt-4 font-sans text-base text-ink-soft leading-[1.6] max-w-[36ch]"
                      style={{ fontWeight: 400 }}
                    >
                      {t(`step${i}Body` as 'step1Body')}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ═══════════════ MID-PAGE ANCHOR — Heap 2022 Decision-Zone (Rule 17) ═══════════════ */}
      <section
        className="relative px-6 md:px-10 lg:px-14 py-20 md:py-24 border-t border-ink/15 overflow-hidden bg-shadow"
        aria-labelledby="midpage-h"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 78% 50%, color-mix(in oklab, var(--color-gold-deep) 18%, transparent) 0%, transparent 55%)',
          }}
        />
        <div className="relative mx-auto max-w-[1500px] flex flex-wrap items-baseline justify-between gap-x-12 gap-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span aria-hidden className="block h-px w-10 bg-gold/70" />
              <span
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold"
                style={{ fontWeight: 500 }}
              >
                {t('midPageEyebrow')}
              </span>
            </div>
            <h2
              id="midpage-h"
              className="font-display italic text-on-shadow leading-[1.05] tracking-[-0.015em] max-w-[26ch]"
              style={{ fontWeight: 300, fontSize: 'clamp(1.5rem, 2.6vw, 2.5rem)' }}
            >
              {t('midPageLine1')}
              <br />
              <span className="text-on-shadow-muted">{t('midPageLine2')}</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={PHONE_HREF}
              data-analytics="phone_click_verkaufen_midpage"
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-full bg-gold text-shadow hover:bg-gold-deep transition-colors duration-300 focus-ring active:translate-y-px font-sans tabular-nums"
              style={{ fontWeight: 600, fontSize: 'clamp(0.85rem, 0.95vw, 0.95rem)' }}
            >
              <span className="font-mono-spec text-[10px] uppercase tracking-[0.28em]" style={{ fontWeight: 600 }}>
                {t('midPagePhoneLabel')}
              </span>
              <span aria-hidden className="block w-px h-3.5 bg-shadow/40" />
              <span>+49 176 4145 0810</span>
            </a>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-on-shadow/25 text-on-shadow hover:border-gold hover:text-gold transition-colors duration-300 focus-ring active:translate-y-px"
              style={{ fontWeight: 500, fontSize: 'clamp(0.825rem, 0.9vw, 0.9rem)' }}
            >
              <span>{t('midPageVisitLabel')}</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT WE BUY — Asymmetric Bento with Vehicle-Photo per Category (Rule 05 Pattern C) ═══════════════ */}
      <section
        className="px-6 md:px-10 lg:px-14 py-24 md:py-32 border-t border-ink/15 bg-canvas"
        aria-labelledby="whatwebuy-label"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-12 md:mb-16 border-b border-ink/15 pb-5">
              <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
              <p
                id="whatwebuy-label"
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
                style={{ fontWeight: 500 }}
              >
                {t('whatWeBuyLabel')}
              </p>
            </div>
          </Reveal>

          <ul className="grid grid-cols-12 gap-3 md:gap-4">
            {WHATWEBUY_TILES.map((tile, i) => (
              <Reveal key={tile.titleKey} delayMs={i * 60} className={tile.span}>
                <li
                  className="relative h-full overflow-hidden rounded-2xl bg-canvas-soft shadow-card-rest hover:shadow-card-hover transition-shadow duration-500 group"
                >
                  <Image
                    src={tile.image}
                    alt={t(tile.altKey as 'whatWeBuy1Alt')}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                  />
                  {/* Cinema-Gradient bottom-up */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, color-mix(in oklab, var(--color-shadow) 82%, transparent) 0%, color-mix(in oklab, var(--color-shadow) 35%, transparent) 40%, transparent 65%)',
                    }}
                  />
                  {/* Lot-Marker top-right */}
                  <span
                    aria-hidden
                    className="absolute top-4 right-5 md:top-5 md:right-6 font-mono-spec tabular-nums text-[10px] uppercase tracking-[0.32em] text-on-shadow/70"
                    style={{ fontWeight: 500 }}
                  >
                    {String(i + 1).padStart(2, '0')} / {String(WHATWEBUY_TILES.length).padStart(2, '0')}
                  </span>
                  {/* Title + Body bottom-left */}
                  <div className="absolute bottom-5 left-5 md:bottom-6 md:left-7 right-5 md:right-7">
                    <h3
                      className="font-sans text-on-shadow uppercase leading-[0.95] tracking-[-0.02em] mb-3"
                      style={{ fontWeight: 700, fontSize: 'clamp(1.125rem, 1.8vw, 1.75rem)' }}
                    >
                      {t(tile.titleKey as 'whatWeBuy1Title')}
                    </h3>
                    <p
                      className="font-sans text-on-shadow/85 leading-[1.4] max-w-[44ch]"
                      style={{ fontWeight: 400, fontSize: 'clamp(0.8rem, 0.95vw, 0.95rem)' }}
                    >
                      {t(tile.bodyKey as 'whatWeBuy1')}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════ FAQ (SEO + AEO) ═══════════════ */}
      <PageFaq namespace="verkaufen" tone="light" />

      {/* ═══════════════ FINAL CTA — Canonical Abschluss (Sell-Override · ankauf-bridge hidden) ═══════════════ */}
      <Abschluss
        label={t('abschluss.label')}
        eyebrow={t('abschluss.eyebrow')}
        headline={t('abschluss.headline')}
        subline={t('abschluss.subline')}
        visitLabel={t('abschluss.visitLabel')}
        ankaufHint={null}
        ankaufLink={null}
        analyticsKey="verkaufen"
      />
    </main>
  );
}
