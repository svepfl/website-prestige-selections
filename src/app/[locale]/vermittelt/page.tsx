import type { Metadata } from 'next';
import { jsonLd, buildBreadcrumb } from '@/lib/json-ld';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildHreflangMap } from '@/lib/hreflang';
import Abschluss from '@/components/sections/Abschluss';

const BASE_URL = 'https://www.prestige-selections.com';
const VERMITTELT_HERO_IMAGE = '/assets/vermittelt/vermittelt-hero-placeholder.webp';
const BRAND_BREAKDOWN_IMAGE = '/assets/spuren/spuren-07-rolls-royce-wraith-placeholder.webp';

const BRAND_BREAKDOWN: { label: string; share: number; href: '/marken' }[] = [
  { label: 'Ferrari', share: 22, href: '/marken' },
  { label: 'Porsche', share: 28, href: '/marken' },
  { label: 'Lamborghini', share: 11, href: '/marken' },
  { label: 'Aston Martin', share: 14, href: '/marken' },
  { label: 'Bentley', share: 9, href: '/marken' },
  { label: 'Maserati', share: 8, href: '/marken' },
  { label: 'Rolls-Royce', share: 8, href: '/marken' },
];

const BRAND_HREF: Record<string, string> = {
  Ferrari: '/marken/ferrari',
  Porsche: '/marken/porsche',
  Lamborghini: '/marken/lamborghini',
  'Aston Martin': '/marken/aston-martin',
  Bentley: '/marken/bentley',
  Maserati: '/marken/maserati',
  'Rolls-Royce': '/marken/rolls-royce',
};

// 7 vermittelte Vehicles — each anchored to a representative photo.
// Placeholder-Mapping: einige Modelle nutzen Brand-Stellvertreter aus dem
// vorhandenen spuren-Pool. Echte per-Fahrzeug-Photos folgen mit Shoot.
const SELECTED_PLACEMENTS: ReadonlyArray<{
  brand: string;
  model: string;
  detail: string;
  image: string;
}> = [
  { brand: 'Ferrari', model: '488 GTB', detail: 'Erste Hand · 19.400 km · vermittelt 2024', image: '/assets/spuren/spuren-03-ferrari-488-pista-placeholder.webp' },
  { brand: 'Porsche', model: '911 GT3 (991.2)', detail: 'Werks-Konfiguration · 12.800 km · vermittelt 2024', image: '/assets/spuren/spuren-06-porsche-911-gt3rs-placeholder.webp' },
  { brand: 'Aston Martin', model: 'DBS Superleggera', detail: 'Carbon-Paket · Garagenfahrzeug · vermittelt 2024', image: '/assets/spuren/spuren-01-aston-martin-dbs-placeholder.webp' },
  { brand: 'Lamborghini', model: 'Huracán EVO', detail: 'Erste Hand · Vollausstattung · vermittelt 2025', image: '/assets/spuren/spuren-04-lamborghini-urus-placeholder.webp' },
  { brand: 'Bentley', model: 'Continental GT W12', detail: 'Mulliner-Spec · 28.000 km · vermittelt 2025', image: '/assets/spuren/spuren-02-bentley-continental-gt-placeholder.webp' },
  { brand: 'Maserati', model: 'GranTurismo MC Stradale', detail: 'Liebhaberstück · Historie lückenlos · vermittelt 2024', image: '/assets/spuren/spuren-05-maserati-mc20-placeholder.webp' },
  { brand: 'Rolls-Royce', model: 'Wraith Black Badge', detail: 'Bespoke · 14.200 km · vermittelt 2025', image: '/assets/spuren/spuren-07-rolls-royce-wraith-placeholder.webp' },
];

const VOICES = ['q01', 'q05', 'q12', 'q17', 'q22', 'q30'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'vermittelt' });
  const url = `${BASE_URL}/${locale}/vermittelt`;
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: url,
      languages: buildHreflangMap('/vermittelt'),
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url,
      type: 'website',
    },
  };
}

export default function VermitteltPage() {
  const t = useTranslations('vermittelt');
  const tSpuren = useTranslations('spuren');
  const locale = useLocale();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('metaTitle'),
    description: t('metaDescription'),
    publisher: { '@id': `${BASE_URL}/#dealer` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: SELECTED_PLACEMENTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${p.brand} ${p.model}`,
      })),
    },
  };

  return (
    <main className="bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildBreadcrumb(locale, [{ name: t('title'), path: '/vermittelt' }])) }}
      />

      {/* ═══════════════ HERO — Full-Bleed Cinema + Stats-Strip + Breadcrumbs Overlay ═══════════════ */}
      <section className="relative w-full overflow-hidden bg-shadow" aria-labelledby="vermittelt-h1">
        <div className="relative sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] xl:aspect-[2.4/1] min-h-[80vh]">
          <Image
            src={VERMITTELT_HERO_IMAGE}
            alt={t('heroAlt')}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, color-mix(in oklab, var(--color-shadow) 92%, transparent) 0%, color-mix(in oklab, var(--color-shadow) 68%, transparent) 32%, color-mix(in oklab, var(--color-shadow) 25%, transparent) 65%, color-mix(in oklab, var(--color-shadow) 8%, transparent) 100%)',
            }}
          />

          {/* Breadcrumbs Overlay — top, below navbar, recolored for dark via .hero-breadcrumbs */}
          <div className="hero-breadcrumbs absolute top-24 lg:top-28 left-0 right-0 z-10">
            <Breadcrumbs locale={locale} items={[{ label: t('eyebrow') }]} />
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="w-full min-w-0 px-6 md:px-10 lg:px-14 pb-16 md:pb-24 lg:pb-28">
              <div className="mx-auto max-w-[1500px] min-w-0">
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <span aria-hidden className="block h-px w-12 bg-gold/80" />
                  <p
                    className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold"
                    style={{ fontWeight: 500 }}
                  >
                    {t('eyebrow')}
                  </p>
                </div>

                <h1
                  id="vermittelt-h1"
                  className="font-sans text-on-shadow leading-[0.92] tracking-[-0.025em] [overflow-wrap:anywhere] min-w-0 max-w-full lg:max-w-[18ch] [text-wrap:balance]"
                  style={{ fontWeight: 700, fontSize: 'clamp(2rem, 6vw, 7.5rem)' }}
                >
                  <span className="block">{t('h1Line1')}</span>
                  <span
                    className="block font-display italic text-on-shadow/85 tracking-[-0.015em]"
                    style={{ fontWeight: 300 }}
                  >
                    {t('h1Line2')}
                  </span>
                </h1>

                <p
                  className="mt-8 md:mt-10 font-sans text-on-shadow/85 leading-[1.55] max-w-[58ch]"
                  style={{ fontWeight: 400, fontSize: 'clamp(1rem, 1.2vw, 1.15rem)' }}
                >
                  {t('intro')}
                </p>

                {/* Stat-Strip — 3 columns moved into Hero (replaces former Stats section) */}
                <dl className="mt-10 md:mt-14 grid grid-cols-3 gap-x-6 gap-y-2 max-w-[680px]">
                  {[1, 2, 3].map((n) => (
                    <div key={n}>
                      <dt className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-on-shadow-muted">
                        {t(`statLabel${n}` as 'statLabel1')}
                      </dt>
                      <dd
                        className="mt-2 font-sans tabular-nums text-gold leading-none"
                        style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 3.2vw, 3rem)' }}
                      >
                        {t(`statValue${n}` as 'statValue1')}
                      </dd>
                      <p
                        className="mt-2 font-mono-spec text-[10px] uppercase tracking-[0.22em] text-on-shadow-muted/80 max-w-[22ch]"
                        style={{ fontWeight: 500 }}
                      >
                        {t(`statSub${n}` as 'statSub1')}
                      </p>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ BRAND BREAKDOWN — Asymmetric Image-Lead (Rule 05 Pattern B 6/6) ═══════════════ */}
      <section
        className="px-6 md:px-10 lg:px-14 py-24 md:py-32 border-t border-ink/15 bg-canvas"
        aria-labelledby="breakdown-label"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-baseline gap-4 mb-12 md:mb-16 border-b border-ink/15 pb-5">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
            <p
              id="breakdown-label"
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
              style={{ fontWeight: 500 }}
            >
              {t('brandBreakdownLabel')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left — single representative vehicle photo */}
            <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden rounded-2xl bg-canvas-soft shadow-card-rest lg:sticky lg:top-32">
              <Image
                src={BRAND_BREAKDOWN_IMAGE}
                alt={t('brandBreakdownImageAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, color-mix(in oklab, var(--color-shadow) 55%, transparent) 0%, transparent 45%)',
                }}
              />
              <div className="absolute bottom-5 left-5 md:bottom-6 md:left-7 right-5 md:right-7">
                <p
                  className="font-mono-spec tabular-nums text-[10px] uppercase tracking-[0.32em] text-on-shadow/80"
                  style={{ fontWeight: 500 }}
                >
                  100 % · 900+ vermittelt
                </p>
              </div>
            </div>

            {/* Right — breakdown list */}
            <ul className="divide-y divide-ink/12">
              {BRAND_BREAKDOWN.map((b) => {
                const href = BRAND_HREF[b.label] || '/marken';
                return (
                  <li key={b.label} className="py-5 md:py-6">
                    <Link
                      href={href as '/fahrzeuge'}
                      className="group grid grid-cols-[1fr_auto_3rem] items-baseline gap-6 hover:opacity-100"
                    >
                      <span
                        className="font-sans text-ink leading-[1.1] tracking-[-0.015em] uppercase group-hover:text-gold-deep transition-colors duration-300"
                        style={{ fontWeight: 600, fontSize: 'clamp(1.25rem, 2vw, 1.625rem)' }}
                      >
                        {b.label}
                      </span>
                      <div className="hidden sm:flex items-center w-40 md:w-56">
                        <div className="relative w-full h-px bg-ink/15">
                          <div
                            className="absolute inset-y-0 left-0 bg-gold-deep/80 transition-[background-color] duration-700 group-hover:bg-gold-deep"
                            style={{ width: `${b.share}%` }}
                          />
                        </div>
                      </div>
                      <span
                        className="font-mono-spec tabular-nums text-base md:text-lg text-ink-muted text-right group-hover:text-gold-deep transition-colors duration-300"
                        style={{ fontWeight: 500 }}
                      >
                        {b.share}%
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ SELECTION — Editorial List with Side-Thumbnails (Hodinkee Reference Points Pattern) ═══════════════ */}
      <section
        className="px-6 md:px-10 lg:px-14 py-24 md:py-32 border-t border-ink/15 bg-canvas-raised"
        aria-labelledby="selection-label"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-baseline gap-4 mb-6 border-b border-ink/15 pb-5">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
            <p
              id="selection-label"
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
              style={{ fontWeight: 500 }}
            >
              {t('selectionLabel')}
            </p>
          </div>
          <p
            className="font-sans text-ink-soft text-base md:text-lg leading-[1.6] max-w-[58ch] mb-14 md:mb-20"
            style={{ fontWeight: 400 }}
          >
            {t('selectionIntro')}
          </p>

          <ol className="divide-y divide-ink/12">
            {SELECTED_PLACEMENTS.map((p, i) => (
              <li key={`${p.brand}-${p.model}`} className="group">
                <div className="grid grid-cols-[3.5rem_5rem_1fr] md:grid-cols-[4rem_7rem_1fr_minmax(0,2fr)] items-center gap-x-4 md:gap-x-8 py-5 md:py-7">
                  {/* Lot-Marker */}
                  <span
                    className="font-mono-spec tabular-nums text-[11px] uppercase tracking-[0.32em] text-gold-deep"
                    style={{ fontWeight: 500 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Thumbnail Photo */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-canvas-soft">
                    <Image
                      src={p.image}
                      alt={`${p.brand} ${p.model} — vermittelt durch Prestige Selections`}
                      fill
                      sizes="(max-width: 768px) 80px, 112px"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  {/* Brand + Model */}
                  <div className="col-span-2 md:col-span-1">
                    <p
                      className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted mb-1"
                      style={{ fontWeight: 500 }}
                    >
                      {p.brand}
                    </p>
                    <h3
                      className="font-sans text-ink leading-tight tracking-[-0.015em] uppercase group-hover:text-gold-deep transition-colors duration-300"
                      style={{ fontWeight: 700, fontSize: 'clamp(1.125rem, 1.6vw, 1.5rem)' }}
                    >
                      {p.model}
                    </h3>
                  </div>
                  {/* Detail mono-spec */}
                  <p
                    className="col-span-3 md:col-span-1 font-mono-spec text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-ink-muted leading-[1.5] md:text-right pl-[7.5rem] md:pl-0"
                    style={{ fontWeight: 500 }}
                  >
                    {p.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════ VOICES — Editorial 2-Col Pull-Quote Grid (mit subtle atmospheric BG) ═══════════════ */}
      <section
        className="relative px-6 md:px-10 lg:px-14 py-24 md:py-32 border-t border-ink/15 overflow-hidden bg-canvas"
        aria-labelledby="voices-label"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/atmospherics/markenwelt-engine-turned.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.05,
          }}
        />
        <div className="relative mx-auto max-w-[1500px]" style={{ zIndex: 2 }}>
          <div className="flex items-baseline gap-4 mb-12 md:mb-16 border-b border-ink/15 pb-5">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
            <p
              id="voices-label"
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
              style={{ fontWeight: 500 }}
            >
              {t('voicesLabel')}
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 md:gap-y-16">
            {VOICES.map((qKey, i) => (
              <li key={qKey} className="border-l border-gold-deep/30 pl-6 md:pl-8">
                <p
                  className="font-mono-spec tabular-nums text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-4"
                  style={{ fontWeight: 500 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <blockquote
                  className="font-display italic text-ink leading-[1.3] tracking-[-0.015em] max-w-[40ch]"
                  style={{ fontWeight: 300, fontSize: 'clamp(1.125rem, 2vw, 1.5rem)' }}
                >
                  {tSpuren(qKey as 'q01')}
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════ TRUST — Single Cinematic Pull-Quote (Rule 09 Pattern A var.) ═══════════════ */}
      <section
        className="relative px-6 md:px-10 lg:px-14 py-32 md:py-48 border-t border-ink/15 overflow-hidden bg-shadow text-on-shadow"
        aria-labelledby="trust-label"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${VERMITTELT_HERO_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.14,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, color-mix(in oklab, var(--color-shadow) 78%, transparent) 0%, color-mix(in oklab, var(--color-shadow) 85%, transparent) 100%)',
          }}
        />
        <div className="relative mx-auto max-w-[1500px]" style={{ zIndex: 2 }}>
          <div className="flex items-baseline gap-4 mb-12">
            <span aria-hidden className="block h-px w-10 bg-gold/70" />
            <p
              id="trust-label"
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold"
              style={{ fontWeight: 500 }}
            >
              {t('trustLabel')}
            </p>
          </div>
          <blockquote className="max-w-[28ch]">
            <p
              className="font-display italic text-on-shadow leading-[1.05] tracking-[-0.02em]"
              style={{ fontWeight: 300, fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}
            >
              {t('trustBody')}
            </p>
          </blockquote>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA — Canonical Abschluss (Search-Override · ankauf-bridge hidden) ═══════════════ */}
      <Abschluss
        label={t('abschluss.label')}
        headline={t('abschluss.headline')}
        subline={t('abschluss.subline')}
        visitLabel={t('abschluss.visitLabel')}
        ankaufHint={null}
        ankaufLink={null}
        analyticsKey="vermittelt"
      />
    </main>
  );
}
