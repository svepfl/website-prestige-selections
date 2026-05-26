import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { vehicles } from '@/data/vehicles';
import { getVehiclePlaceholder } from '@/data/images';
import { buildHreflangMap } from '@/lib/hreflang';
import { jsonLd, buildBreadcrumb } from '@/lib/json-ld';

const PHONE_HREF = 'tel:+491764145810';
const BASE_URL = 'https://www.prestige-selections.com';

type BrandSlug =
  | 'ferrari'
  | 'porsche'
  | 'lamborghini'
  | 'aston-martin'
  | 'bentley'
  | 'maserati'
  | 'rolls-royce';

const BRAND_SLUGS: readonly BrandSlug[] = [
  'ferrari',
  'porsche',
  'lamborghini',
  'aston-martin',
  'bentley',
  'maserati',
  'rolls-royce',
];

const BRAND_LABEL: Record<BrandSlug, string> = {
  ferrari: 'Ferrari',
  porsche: 'Porsche',
  lamborghini: 'Lamborghini',
  'aston-martin': 'Aston Martin',
  bentley: 'Bentley',
  maserati: 'Maserati',
  'rolls-royce': 'Rolls-Royce',
};

const BRAND_MANUFACTURER_KEY: Record<BrandSlug, string> = {
  ferrari: 'FERRARI',
  porsche: 'PORSCHE',
  lamborghini: 'LAMBORGHINI',
  'aston-martin': 'ASTON MARTIN',
  bentley: 'BENTLEY',
  maserati: 'MASERATI',
  'rolls-royce': 'ROLLS ROYCE',
};

// Per-brand hero images — only ferrari + porsche available as placeholders right now.
// Other brands fallback to null (text-only hero) until photography arrives.
const BRAND_HERO_IMAGE: Partial<Record<BrandSlug, string>> = {
  ferrari: '/assets/marken/marken-ferrari-hero-placeholder.webp',
  porsche: '/assets/marken/marken-porsche-hero-placeholder.webp',
};

export function generateStaticParams() {
  return BRAND_SLUGS.map((brand) => ({ brand }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; brand: string }>;
}): Promise<Metadata> {
  const { locale, brand } = await params;
  if (!BRAND_SLUGS.includes(brand as BrandSlug)) return {};
  const t = await getTranslations({ locale, namespace: 'brandHub' });
  const slug = brand as BrandSlug;
  const url = `${BASE_URL}/${locale}/marken/${slug}`;
  return {
    title: t(`${slug}.metaTitle` as 'ferrari.metaTitle'),
    description: t(`${slug}.metaDescription` as 'ferrari.metaDescription'),
    alternates: {
      canonical: url,
      languages: buildHreflangMap(`/marken/${slug}`),
    },
    openGraph: {
      title: t(`${slug}.metaTitle` as 'ferrari.metaTitle'),
      description: t(`${slug}.metaDescription` as 'ferrari.metaDescription'),
      url,
      type: 'website',
    },
  };
}

export default async function BrandHubPage({
  params,
}: {
  params: Promise<{ locale: string; brand: string }>;
}) {
  const { brand } = await params;
  if (!BRAND_SLUGS.includes(brand as BrandSlug)) notFound();
  return <BrandHubContent slug={brand as BrandSlug} />;
}

function BrandHubContent({ slug }: { slug: BrandSlug }) {
  const t = useTranslations('brandHub');
  const locale = useLocale();
  const label = BRAND_LABEL[slug];
  const manufacturerKey = BRAND_MANUFACTURER_KEY[slug];
  const brandVehicles = vehicles.filter((v) => v.manufacturer === manufacturerKey);
  const visibleVehicles = brandVehicles.slice(0, 6);

  const faqCount = slug === 'maserati' || slug === 'bentley' || slug === 'rolls-royce' ? 3 : 4;

  const brandSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t(`${slug}.metaTitle` as 'ferrari.metaTitle'),
    description: t(`${slug}.metaDescription` as 'ferrari.metaDescription'),
    about: { '@type': 'Brand', name: label },
    publisher: { '@id': `${BASE_URL}/#dealer` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: brandVehicles.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BASE_URL}/${locale}/fahrzeuge/${v.id}`,
        name: `${v.manufacturer} ${v.model}`,
      })),
    },
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
      name: t(`${slug}.faq.q${i}` as 'ferrari.faq.q1'),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`${slug}.faq.a${i}` as 'ferrari.faq.a1'),
      },
    })),
  };

  return (
    <main className="bg-canvas text-ink pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(brandSchema) }}
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
              { name: t('commonLabel'), path: '/marken' },
              { name: label, path: `/marken/${slug}` },
            ]),
          ),
        }}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: t('commonLabel') },
          { label },
        ]}
      />

      {/* HERO */}
      <section className="px-6 md:px-10 lg:px-14 pt-6 md:pt-12 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-center gap-3 font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-10">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
            <span style={{ fontWeight: 500 }}>{t('commonLabel')}</span>
          </div>

          <h1
            className="font-sans text-ink leading-[0.95] tracking-[-0.03em] uppercase max-w-[18ch]"
            style={{ fontWeight: 700, fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}
          >
            {t(`${slug}.h1Line1` as 'ferrari.h1Line1')}<br />
            <span className="text-ink-muted" style={{ fontWeight: 400, fontStyle: 'italic' }}>
              {t(`${slug}.h1Line2` as 'ferrari.h1Line2')}
            </span>
          </h1>

          <p
            className="mt-12 font-sans text-lg md:text-xl text-ink-soft leading-[1.55] max-w-3xl"
            style={{ fontWeight: 400 }}
          >
            {t(`${slug}.intro` as 'ferrari.intro')}
          </p>

          {/* Cinematic banner — brand-specific material detail (only if asset exists) */}
          {BRAND_HERO_IMAGE[slug] && (
            <div className="mt-16 md:mt-24 relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl bg-canvas-soft">
              <Image
                src={BRAND_HERO_IMAGE[slug]!}
                alt={`${label} Material-Detail bei Prestige Selections Freiburg — Sportwagen-Atelier`}
                fill
                sizes="(max-width: 1300px) 100vw, 1300px"
                priority
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* EDITORIAL BODY + MODELS */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/15 bg-canvas-raised">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-16 gap-y-10">
            <div className="lg:col-span-5">
              <div className="flex items-baseline gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
                <p
                  className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
                  style={{ fontWeight: 500 }}
                >
                  {label}
                </p>
              </div>
              <p
                className="mt-7 font-display italic text-ink leading-[1.15] tracking-[-0.015em] max-w-[16ch]"
                style={{ fontWeight: 300, fontSize: 'clamp(1.75rem, 3.6vw, 2.875rem)' }}
              >
                {label}
              </p>
            </div>
            <div className="lg:col-span-7">
              <p
                className="font-sans text-base md:text-lg text-ink-soft leading-[1.7] max-w-[62ch]"
                style={{ fontWeight: 400 }}
              >
                {t(`${slug}.body` as 'ferrari.body')}
              </p>
              <p
                className="mt-10 font-mono-spec text-[11px] uppercase tracking-[0.28em] text-ink-muted leading-[1.9] max-w-[62ch]"
                style={{ fontWeight: 500 }}
              >
                {t(`${slug}.models` as 'ferrari.models')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT STOCK */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/15">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-12">
            <div className="flex items-baseline gap-4">
              <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
              <p
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
                style={{ fontWeight: 500 }}
              >
                {t('stockLabel')}
              </p>
            </div>
            {brandVehicles.length > visibleVehicles.length && (
              <Link
                href="/fahrzeuge"
                className="group font-mono-spec text-[10px] uppercase tracking-[0.28em] text-ink hover:text-gold-deep transition-colors duration-300"
                style={{ fontWeight: 600 }}
              >
                {t('stockMore', { brand: label })} →
              </Link>
            )}
          </div>

          {visibleVehicles.length === 0 ? (
            <p className="font-display italic text-ink leading-[1.3] tracking-[-0.015em] max-w-[28ch]" style={{ fontWeight: 300, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              {t('stockEmpty', { brand: label })}
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-16">
              {visibleVehicles.map((vehicle) => (
                <li key={vehicle.id}>
                  <Link
                    href={`/fahrzeuge/${vehicle.id}` as '/fahrzeuge'}
                    className="group block focus-ring rounded-2xl active:translate-y-px"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-canvas-soft">
                      <Image
                        src={getVehiclePlaceholder(vehicle.manufacturer, vehicle.id)}
                        alt={`${vehicle.manufacturer} ${vehicle.model} — ${label} bei Prestige Selections Freiburg`}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="mt-5">
                      <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-2" style={{ fontWeight: 500 }}>
                        {label}
                      </p>
                      <h3 className="font-sans text-ink leading-[1.05] tracking-[-0.02em] uppercase" style={{ fontWeight: 700, fontSize: 'clamp(1.25rem, 1.7vw, 1.5rem)' }}>
                        {vehicle.model}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* BUY / SELL / SERVICE TRIPTYCH */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/15 bg-canvas-raised">
        <div className="mx-auto max-w-[1500px]">
          <ol className="space-y-16 md:space-y-20">
            <ActionRow
              index="01"
              label={t('buyLabel')}
              body={t('buyBody', { brand: label })}
              cta={t('buyCta', { brand: label })}
              href="/fahrzeuge"
            />
            <ActionRow
              index="02"
              label={t('sellLabel', { brand: label })}
              body={t('sellBody', { brand: label })}
              cta={t('sellCta', { brand: label })}
              href="/verkaufen"
            />
            <ActionRow
              index="03"
              label={t('serviceLabel', { brand: label })}
              body={t('serviceBody', { brand: label })}
              cta={t('serviceCta')}
              href="/werkstatt"
            />
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/15">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-baseline gap-4 mb-12">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
            <p
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
              style={{ fontWeight: 500 }}
            >
              {t('faqLabel', { brand: label })}
            </p>
          </div>
          <ul className="border-t border-ink/15">
            {Array.from({ length: faqCount }, (_, i) => i + 1).map((i) => (
              <li key={i} className="border-b border-ink/15 py-8">
                <h3
                  className="font-sans text-ink leading-[1.3] tracking-[-0.015em]"
                  style={{ fontWeight: 600, fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)' }}
                >
                  {t(`${slug}.faq.q${i}` as 'ferrari.faq.q1')}
                </h3>
                <p
                  className="mt-4 font-sans text-base md:text-lg text-ink-soft leading-[1.65] max-w-[62ch]"
                  style={{ fontWeight: 400 }}
                >
                  {t(`${slug}.faq.a${i}` as 'ferrari.faq.a1')}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 md:px-10 lg:px-14 py-24 md:py-32 border-t border-ink/15">
        <div className="mx-auto max-w-[1500px]">
          <h2
            className="font-sans text-ink leading-[0.95] tracking-[-0.03em] uppercase max-w-[18ch]"
            style={{ fontWeight: 700, fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
          >
            {t('ctaH2')}
          </h2>
          <p
            className="mt-6 font-sans text-lg md:text-xl text-ink-soft leading-[1.55] max-w-2xl"
            style={{ fontWeight: 400 }}
          >
            {t('ctaSub', { brand: label })}
          </p>
          <div className="mt-12 md:mt-14 flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-3 bg-ink text-canvas rounded-full px-8 py-4 font-mono-spec text-[11px] uppercase tracking-[0.28em] hover:bg-ink-soft transition-colors duration-300 active:translate-y-px focus-ring"
              style={{ fontWeight: 600 }}
            >
              {t('serviceCta')}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={PHONE_HREF}
              className="group inline-flex items-center gap-3 border border-ink/20 text-ink rounded-full px-8 py-4 font-mono-spec text-[11px] uppercase tracking-[0.28em] hover:border-ink hover:text-gold-deep transition-colors duration-300 active:translate-y-px focus-ring"
              style={{ fontWeight: 600 }}
              data-analytics={`phone_click_brand_${slug}`}
            >
              +49 176 4145 0810
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ActionRow({
  index,
  label,
  body,
  cta,
  href,
}: {
  index: string;
  label: string;
  body: string;
  cta: string;
  href: '/fahrzeuge' | '/verkaufen' | '/werkstatt';
}) {
  return (
    <li className="grid grid-cols-1 md:grid-cols-[6rem_1fr_auto] gap-x-8 gap-y-5 items-baseline">
      <span
        className="font-mono-spec tabular-nums text-[11px] uppercase tracking-[0.32em] text-gold-deep pt-1"
        style={{ fontWeight: 500 }}
      >
        {index}
      </span>
      <div className="max-w-[58ch]">
        <h3
          className="font-sans text-ink leading-tight tracking-[-0.02em] uppercase"
          style={{ fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          {label}
        </h3>
        <p
          className="mt-4 font-sans text-base md:text-lg text-ink-soft leading-[1.65]"
          style={{ fontWeight: 400 }}
        >
          {body}
        </p>
      </div>
      <Link
        href={href}
        className="group inline-flex items-center gap-3 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-ink hover:text-gold-deep transition-colors duration-300 md:mt-0 mt-4"
        style={{ fontWeight: 600 }}
      >
        {cta}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </li>
  );
}
