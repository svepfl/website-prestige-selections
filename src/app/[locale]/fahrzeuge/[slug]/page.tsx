import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { vehicles } from '@/data/vehicles';
import { getVehiclePlaceholder } from '@/data/images';
import { jsonLd } from '@/lib/json-ld';
import { buildHreflangMap } from '@/lib/hreflang';

const BASE_URL = 'https://www.prestige-selections.com';

/** Schema.org priceValidUntil — 90 days from server-side generation time. */
function computePriceValidUntil(): string {
  return new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

/**
 * Infers Schema.org bodyType from vehicle id/model.
 * Returns Schema.org URL form (https://schema.org/Coupe etc.) since
 * Google's Vehicle Listing spec prefers canonical IRIs over freetext.
 */
function inferBodyType(id: string, model: string): string {
  const haystack = `${id} ${model}`.toLowerCase();
  if (/(urus|bentayga|cullinan|cayenne|levante|macan|dbx)/.test(haystack)) return 'https://schema.org/SUV';
  if (/(spider|cabrio|cabriolet|gts|grancabrio|convertible|roadster|dawn|gtc)/.test(haystack)) return 'https://schema.org/Convertible';
  if (/(panamera|quattroporte|ghost|flying spur|rapide|phantom)/.test(haystack)) return 'https://schema.org/Sedan';
  return 'https://schema.org/Coupe';
}

/**
 * Marketing category — broad Schema.org category for Product/Vehicle multi-type.
 */
function inferCategory(manufacturer: string, bodyType: string): string {
  if (bodyType.endsWith('/SUV')) return 'Luxury SUV';
  if (manufacturer === 'BENTLEY' || manufacturer === 'ROLLS ROYCE') return 'Luxury Vehicle';
  return 'Sports Car';
}
const locales = ['de', 'en', 'fr'] as const;
type Locale = (typeof locales)[number];

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return vehicles.flatMap((v) =>
    locales.map((locale) => ({ locale, slug: v.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const vehicle = vehicles.find((v) => v.id === slug);
  if (!vehicle) return {};

  const safeLocale: Locale = isLocale(locale) ? locale : 'de';
  const title = `${vehicle.manufacturer} ${vehicle.model} · Freiburg`;
  const description = vehicle.description[safeLocale];
  const url = `${BASE_URL}/${safeLocale}/fahrzeuge/${vehicle.id}`;
  const image = getVehiclePlaceholder(vehicle.manufacturer, vehicle.id);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildHreflangMap(`/fahrzeuge/${vehicle.id}`),
    },
    openGraph: { title, description, url, type: 'website', images: [{ url: image }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    other: {
      'product:price:amount': vehicle.price.toString(),
      'product:price:currency': 'EUR',
    },
    keywords: [
      vehicle.manufacturer, vehicle.model,
      `${vehicle.manufacturer} ${vehicle.model} kaufen`,
      `${vehicle.manufacturer} Freiburg`, 'Prestige Selections',
    ],
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const vehicle = vehicles.find((v) => v.id === slug);
  if (!vehicle) notFound();

  const safeLocale: Locale = isLocale(locale) ? locale : 'de';
  const t = await getTranslations({ locale: safeLocale, namespace: 'vehicleDetail' });

  const priceFormatter = new Intl.NumberFormat(
    safeLocale === 'de' ? 'de-DE' : safeLocale === 'fr' ? 'fr-FR' : 'en-GB',
    { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }
  );
  const numberFormatter = new Intl.NumberFormat(
    safeLocale === 'de' ? 'de-DE' : safeLocale === 'fr' ? 'fr-FR' : 'en-GB'
  );

  const fuelLabel =
    vehicle.fuel === 'petrol' ? t('petrol') : vehicle.fuel === 'hybrid' ? t('hybrid') : vehicle.fuel;
  const transmissionLabel =
    vehicle.transmission === 'automatic' ? t('automatic') : t('manual');
  const firstRegLabel = vehicle.firstRegistration ?? t('newVehicle');

  const image = getVehiclePlaceholder(vehicle.manufacturer, vehicle.id);

  const specs = [
    { label: t('power'), value: `${vehicle.power} PS` },
    { label: t('mileage'), value: `${numberFormatter.format(vehicle.mileage)} km` },
    { label: t('fuel'), value: fuelLabel },
    { label: t('transmission'), value: transmissionLabel },
    { label: t('firstReg'), value: firstRegLabel },
    { label: t('price'), value: priceFormatter.format(vehicle.price) },
  ];

  const related = vehicles
    .filter((v) => v.id !== vehicle.id && v.manufacturer === vehicle.manufacturer)
    .slice(0, 3);

  // Vehicle model year derived from first-registration (e.g. "04/2019" → "2019")
  const modelYear = vehicle.firstRegistration?.match(/\d{4}$/)?.[0];

  // Offer validity window — 90 days from build/request time, ISO date.
  // Server-component render: this is computed once per static generation
  // (or per request when ISR revalidates), not on every client paint.
  const priceValidUntil = computePriceValidUntil();

  // Multi-type [Vehicle, Product, Car] surfaces the listing in Google Merchant
  // + Vehicle rich-results + general Product. Price is string-formatted per
  // Google's spec, AutoDealer references the layout's `#dealer` @id node.
  const bodyType = inferBodyType(vehicle.id, vehicle.model);
  const category = inferCategory(vehicle.manufacturer, bodyType);

  const vehicleSchema = {
    '@context': 'https://schema.org',
    '@type': ['Vehicle', 'Product', 'Car'],
    '@id': `${BASE_URL}/${safeLocale}/fahrzeuge/${vehicle.id}#vehicle`,
    name: `${vehicle.manufacturer} ${vehicle.model}`,
    description: vehicle.description[safeLocale],
    brand: { '@type': 'Brand', name: vehicle.manufacturer },
    manufacturer: { '@type': 'Organization', name: vehicle.manufacturer },
    model: vehicle.model,
    bodyType,
    category,
    productID: vehicle.id,
    sku: vehicle.id,
    ...(modelYear && { vehicleModelDate: modelYear, productionDate: modelYear }),
    vehicleTransmission: transmissionLabel,
    fuelType: fuelLabel,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: vehicle.mileage, unitCode: 'KMT' },
    vehicleEngine: {
      '@type': 'EngineSpecification',
      enginePower: { '@type': 'QuantitativeValue', value: vehicle.power, unitCode: 'BHP' },
    },
    ...(vehicle.firstRegistration && { dateVehicleFirstRegistered: vehicle.firstRegistration }),
    image,
    inLanguage: safeLocale,
    offers: {
      '@type': 'Offer',
      price: vehicle.price.toFixed(2),
      priceCurrency: 'EUR',
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      url: `${BASE_URL}/${safeLocale}/fahrzeuge/${vehicle.id}`,
      seller: { '@id': `${BASE_URL}/#dealer` },
      areaServed: [
        { '@type': 'Country', name: 'Germany' },
        { '@type': 'Country', name: 'Switzerland' },
        { '@type': 'Country', name: 'Austria' },
        { '@type': 'Country', name: 'France' },
        { '@type': 'Country', name: 'Liechtenstein' },
      ],
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('breadcrumbCollection'),
        item: `${BASE_URL}/${safeLocale}/fahrzeuge`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${vehicle.manufacturer} ${vehicle.model}`,
        item: `${BASE_URL}/${safeLocale}/fahrzeuge/${vehicle.id}`,
      },
    ],
  };

  return (
    <main className="bg-canvas text-ink">
      {/* Breadcrumbs in masthead area */}
      <div className="pt-24 md:pt-28 bg-canvas">
        <Breadcrumbs
          locale={safeLocale}
          items={[
            { label: t('breadcrumbCollection'), href: '/fahrzeuge' },
            { label: `${vehicle.manufacturer} ${vehicle.model}` },
          ]}
        />
      </div>

      {/* Editorial hero — letterboxed image on canvas-soft */}
      <section className="px-6 md:px-10 lg:px-14 pt-8 md:pt-12 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-baseline gap-3 font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-8">
            <span aria-hidden className="block h-px w-8 bg-gold-deep/70" />
            <span>{vehicle.manufacturer}</span>
          </div>

          <h1
            className="font-sans text-ink leading-[0.9] tracking-[-0.03em] uppercase max-w-[22ch]"
            style={{ fontWeight: 700, fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            {vehicle.manufacturer}
            <br />
            <span className="text-ink-muted" style={{ fontWeight: 400 }}>{vehicle.model}</span>
          </h1>

          <p className="mt-10 font-mono-spec text-[11px] uppercase tracking-[0.28em] text-ink-muted max-w-2xl line-clamp-2">
            {vehicle.title}
          </p>

          <div className="mt-14 md:mt-20 relative aspect-[16/9] bg-canvas-soft overflow-hidden">
            <Image
              src={image}
              alt={`${vehicle.manufacturer} ${vehicle.model}${
                vehicle.firstRegistration ? `, Erstzulassung ${vehicle.firstRegistration}` : ''
              }, ${vehicle.power} PS, ${vehicle.mileage.toLocaleString('de-DE')} km — kaufen bei Prestige Selections Freiburg`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1400px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Two-column editorial layout */}
      <section className="px-6 md:px-10 lg:px-14 pb-24 md:pb-32 border-t border-ink/15">
        <div className="mx-auto max-w-[1500px] pt-16 md:pt-24 grid grid-cols-1 lg:grid-cols-[7fr_4fr] gap-12 lg:gap-20">
          {/* Left — editorial body */}
          <div className="space-y-20">
            {/* Description as editorial prose */}
            <div>
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-6">
                {t('noteLabel')}
              </p>
              <p className="font-sans text-lg md:text-xl lg:text-2xl text-ink-soft leading-[1.55] max-w-[58ch]" style={{ fontWeight: 400 }}>
                {vehicle.description[safeLocale]}
              </p>
              <p className="mt-8 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-ink-muted">
                — {t('noteSignature')}
              </p>
            </div>

            {/* Specs — editorial list, not card grid */}
            <div>
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-8">
                {t('specs')}
              </p>
              <dl className="divide-y divide-ink/12">
                {specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[1fr_auto] gap-6 py-5">
                    <dt className="font-mono-spec text-[11px] uppercase tracking-[0.28em] text-ink-muted self-baseline">
                      {s.label}
                    </dt>
                    <dd className="font-mono-spec tabular-nums text-base md:text-lg text-ink tracking-[-0.01em] text-right">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Highlights */}
            {vehicle.highlights.length > 0 && (
              <div>
                <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-8">
                  {t('highlights')}
                </p>
                <ul className="space-y-3">
                  {vehicle.highlights.map((h, i) => (
                    <li key={h} className="grid grid-cols-[3rem_1fr] gap-4 items-baseline">
                      <span className="font-mono-spec tabular-nums text-[11px] text-ink-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-sans text-base md:text-lg text-ink leading-[1.55]" style={{ fontWeight: 400 }}>
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contextual internal links — editorial, not nav-like */}
            <div>
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-6">
                {t('alsoLabel')}
              </p>
              <ul className="divide-y divide-ink/12">
                <li className="py-5">
                  <Link href="/werkstatt" className="group inline-flex items-baseline gap-3 font-sans text-base md:text-lg text-ink hover:text-gold-deep transition-colors duration-300" style={{ fontWeight: 500 }}>
                    {t('alsoWerkstatt', { brand: vehicle.manufacturer })}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </li>
                <li className="py-5">
                  <Link href="/verkaufen" className="group inline-flex items-baseline gap-3 font-sans text-base md:text-lg text-ink hover:text-gold-deep transition-colors duration-300" style={{ fontWeight: 500 }}>
                    {t('alsoVerkaufen', { brand: vehicle.manufacturer })}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </li>
                <li className="py-5">
                  <Link href="/haus" className="group inline-flex items-baseline gap-3 font-sans text-base md:text-lg text-ink hover:text-gold-deep transition-colors duration-300" style={{ fontWeight: 500 }}>
                    {t('alsoHaus')}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right — sticky offer card */}
          <aside>
            <div className="lg:sticky lg:top-32 bg-canvas-raised rounded-lg p-8 md:p-10 shadow-card-rest">
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted mb-4">
                {t('price')}
              </p>
              <p className="font-mono-spec tabular-nums text-3xl md:text-4xl text-ink leading-none tracking-[-0.01em]">
                {priceFormatter.format(vehicle.price)}
              </p>
              <p className="mt-3 font-mono-spec text-[10px] uppercase tracking-[0.22em] text-ink-muted/80">
                {vehicle.vatInfo === 'included'
                  ? t('vatIncluded', { rate: vehicle.vatRate ?? 19 })
                  : t('vatNotApplicable')}
              </p>

              <div className="mt-10 space-y-3">
                <Link
                  href={`/kontakt?vehicle=${vehicle.id}` as '/kontakt'}
                  className="group block w-full bg-ink text-canvas rounded-full py-4 px-6 text-center font-mono-spec text-[11px] uppercase tracking-[0.28em] hover:bg-ink-soft transition-colors duration-300 active:translate-y-px focus-ring"
                  style={{ fontWeight: 600 }}
                >
                  {t('inquire')}
                  <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <a
                  href="tel:+491764145810"
                  className="group block w-full border border-ink/20 text-ink rounded-full py-4 px-6 text-center font-mono-spec text-[11px] uppercase tracking-[0.28em] hover:border-ink hover:text-gold-deep transition-colors duration-300 active:translate-y-px focus-ring"
                  style={{ fontWeight: 600 }}
                >
                  +49 176 4145 0810
                </a>
                <a
                  href={`https://wa.me/497615573168?text=Hallo%20Prestige%20Selections%20%E2%80%94%20Interesse%20${encodeURIComponent(vehicle.manufacturer + ' ' + vehicle.model)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group block w-full text-ink-soft hover:text-gold-deep text-center font-mono-spec text-[11px] uppercase tracking-[0.28em] py-2 transition-colors duration-300"
                  style={{ fontWeight: 600 }}
                >
                  WhatsApp →
                </a>
              </div>

              <p className="mt-10 pt-8 border-t border-ink/10 font-mono-spec text-[10px] uppercase tracking-[0.22em] text-ink-muted/80 leading-[1.8] whitespace-pre-line">
                {t('addressBlock')}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-canvas-soft px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/10">
          <div className="mx-auto max-w-[1500px]">
            <div className="flex items-baseline justify-between gap-3 border-b border-ink/15 pb-6 mb-12">
              <h2 className="font-sans text-xl md:text-2xl text-ink uppercase tracking-[-0.02em]" style={{ fontWeight: 700 }}>
                {t('relatedHeading', { brand: vehicle.manufacturer })}
              </h2>
              <Link href="/fahrzeuge" className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-ink hover:text-gold-deep transition-colors duration-300" style={{ fontWeight: 600 }}>
                {t('moreVehicles')} →
              </Link>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((v) => {
                const relImg = getVehiclePlaceholder(v.manufacturer, v.id);
                return (
                  <li key={v.id}>
                    <Link
                      href={`/fahrzeuge/${v.id}` as '/fahrzeuge'}
                      className="group block bg-canvas-raised rounded-lg shadow-card-rest hover:shadow-card-hover transition-shadow duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] overflow-hidden focus-ring active:translate-y-px"
                    >
                      <div className="relative aspect-[5/4] overflow-hidden bg-canvas-soft">
                        <Image src={relImg} alt={`${v.manufacturer} ${v.model} — weiterer ${v.manufacturer} bei Prestige Selections Freiburg`} fill className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-sans text-ink uppercase tracking-[-0.015em]" style={{ fontWeight: 700, fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)' }}>
                          {v.model}
                        </h3>
                        <p className="mt-2 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-ink-muted">
                          {v.firstRegistration} · {v.power} PS · {v.mileage.toLocaleString('de-DE')} km
                        </p>
                        <p className="mt-5 font-mono-spec tabular-nums text-base md:text-lg text-ink tracking-[-0.01em]">
                          {priceFormatter.format(v.price)}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="bg-canvas px-6 md:px-10 lg:px-14 py-12 border-t border-ink/10">
        <div className="mx-auto max-w-[1500px]">
          <Link href="/fahrzeuge" className="inline-flex items-center gap-3 font-mono-spec text-[11px] uppercase tracking-[0.28em] text-ink-soft hover:text-gold-deep transition-colors duration-300 active:translate-y-px" style={{ fontWeight: 600 }}>
            <span aria-hidden>←</span>
            {t('back')}
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(vehicleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
    </main>
  );
}
