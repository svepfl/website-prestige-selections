import type { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Wrench, Settings, Clock, Sparkles, Phone, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';

const BASE_URL = 'https://www.prestige-selections.com';
const locales = ['de', 'en', 'fr'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'workshop' });
  const url = `${BASE_URL}/${locale}/werkstatt`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/werkstatt`])),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      type: 'website',
    },
  };
}

const serviceIcons = {
  maintenance: Wrench,
  repair: Settings,
  restoration: Clock,
  detailing: Sparkles,
} as const;

const serviceKeys = ['maintenance', 'repair', 'restoration', 'detailing'] as const;

const brands = [
  'Ferrari',
  'Porsche',
  'Lamborghini',
  'Bentley',
  'Aston Martin',
  'Maserati',
  'Mercedes',
  'Rolls Royce',
];

export default function WerkstattPage() {
  const t = useTranslations('workshop');
  const locale = useLocale();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/8985462/pexels-photo-8985462.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Workshop"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/60 to-dark/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
            {t('subtitle')}
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-neutral-300 max-w-2xl leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="bg-dark pt-6 pb-2">
        <Breadcrumbs
          locale={locale}
          items={[{ label: t('title'), href: undefined }]}
        />
      </section>

      {/* Service cards */}
      <section className="py-24 md:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceKeys.map((key) => {
              const Icon = serviceIcons[key];
              return (
                <div
                  key={key}
                  className="bg-dark-secondary border border-dark-border rounded-xl p-8 hover:border-gold/20 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-full bg-dark-tertiary flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-lg font-light text-white mb-3">
                    {t(`services.${key}.title`)}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {t(`services.${key}.text`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand logos */}
      <section className="py-20 bg-dark-secondary border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-neutral-500 mb-12">
            {t('brands')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-lg md:text-xl font-light tracking-[0.1em] text-neutral-500 hover:text-gold transition-colors duration-300"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight mb-8">
            {t('cta')}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-3 bg-gold text-dark px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300"
            >
              {t('cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+497615573168"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:border-white/40 transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              +49 761 5573168
            </a>
          </div>
        </div>
      </section>

      {/* AutoRepair Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AutoRepair',
            name: 'Prestige Selections Meister-Werkstatt',
            url: `https://www.prestige-selections.com/${locale}/werkstatt`,
            description: t('description'),
            telephone: '+49-761-5573168',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Engesserstraße 1',
              addressLocality: 'Freiburg im Breisgau',
              postalCode: '79108',
              addressCountry: 'DE',
            },
            parentOrganization: {
              '@type': 'AutoDealer',
              name: 'Prestige Selections GmbH',
              url: 'https://www.prestige-selections.com',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Workshop Services',
              itemListElement: serviceKeys.map((key) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: t(`services.${key}.title`),
                  description: t(`services.${key}.text`),
                },
              })),
            },
          }).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
