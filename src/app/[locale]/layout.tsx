import { Newsreader, Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import StapeTracking from '@/components/StapeTracking';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import PlausibleAnalytics from '@/components/PlausibleAnalytics';
import SoundToggle from '@/components/SoundToggle';
import { jsonLd } from '@/lib/json-ld';
import { buildHreflangMap } from '@/lib/hreflang';

const BASE_URL = 'https://www.prestige-selections.com';

// Display Serif — Newsreader (opsz variable, magazine-grade, authentic ß glyph).
// Italic carried as separate style for the tagline flourish.
const newsreader = Newsreader({
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz'],
});

// UI Sans — Geist (Vercel, 2026-coded, restrained)
const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

// Mono — Geist Mono (edition marks, specs, micro-meta)
const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const url = `${BASE_URL}/${locale}`;

  return {
    title: {
      default: t('title'),
      template: `%s | Prestige Selections`,
    },
    description: t('description'),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: buildHreflangMap(''),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      siteName: 'Prestige Selections',
      locale: locale === 'de' ? 'de_DE' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'theme-color': '#F2EDE3',
      'color-scheme': 'light',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  // Founder Person-Node — addressable via @id so child pages can reference
  // back instead of re-declaring. E-E-A-T critical for HNW-tier credibility.
  const founderSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#founder`,
    name: 'Sven Pflüger',
    givenName: 'Sven',
    familyName: 'Pflüger',
    jobTitle: 'Gründer & Geschäftsführer',
    description:
      'Gründer und Geschäftsführer des Diensteanbieters. Seit 2012 spezialisiert auf Sportwagen und Klassiker aus Privathand. Über 900 Fahrzeuge persönlich vermittelt.',
    knowsLanguage: ['de', 'en', 'fr'],
    knowsAbout: [
      'Ferrari', 'Porsche', 'Lamborghini', 'Aston Martin', 'Bentley', 'Maserati', 'Rolls-Royce',
      'Sportwagen', 'Klassiker', 'Oldtimer',
      'Sportwagen-Ankauf', 'Sportwagen-Bewertung', 'Sportwagen-Restauration',
      'Premium-Automobilhandel', 'Vehicle Provenance', 'Concours d\'Elegance',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Sportwagen-Spezialist',
      occupationLocation: {
        '@type': 'City',
        name: 'Freiburg im Breisgau',
      },
      experienceRequirements: '20+ Jahre im Premium-Automobilhandel',
    },
    worksFor: { '@id': `${BASE_URL}/#dealer` },
    workLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Schusterstraße 40',
        addressLocality: 'Freiburg im Breisgau',
        postalCode: '79098',
        addressCountry: 'DE',
      },
    },
  };

  // AutoDealer root node — addressable via `@id` so child pages (vehicle
  // detail, legal pages, contact) can reference instead of re-declaring.
  // priceRange + openingHoursSpecification fulfil Google's LocalBusiness
  // best-practices, sameAs links the verified social profiles.
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    '@id': `${BASE_URL}/#dealer`,
    name: 'Prestige Selections',
    alternateName: ['Prestige Selections Freiburg'],
    legalName: 'Sven Pflüger',
    description:
      'Sportwagen-Händler und Meister-Werkstatt in Freiburg. Spezialisiert auf Ferrari, Porsche, Lamborghini, Aston Martin, Bentley, Maserati und Rolls-Royce — Verkauf, Ankauf und Service seit 2012.',
    slogan: 'Außergewöhnliche Automobile. Aus Freiburg.',
    url: BASE_URL,
    image: `${BASE_URL}/assets/markenwelt/markenwelt-aluminum.webp`,
    logo: `${BASE_URL}/logo.svg`,
    telephone: '+49-176-4145-0810',
    email: 'hallo@systembuero.com',
    foundingDate: '2012',
    priceRange: '€€€€',
    knowsAbout: [
      'Ferrari Verkauf', 'Ferrari Ankauf', 'Ferrari Werkstatt',
      'Porsche Verkauf', 'Porsche Ankauf', 'Porsche Werkstatt Freiburg',
      'Lamborghini Verkauf', 'Lamborghini Service',
      'Aston Martin Verkauf', 'Aston Martin Service',
      'Bentley Verkauf', 'Bentley Service',
      'Maserati Verkauf', 'Maserati Service',
      'Rolls-Royce Verkauf', 'Rolls-Royce Service',
      'Mercedes AMG Verkauf', 'Sportwagen Ankauf', 'Sportwagen verkaufen Freiburg',
      'Klassiker Restauration', 'Klassiker-Pflege', 'Oldtimer Werkstatt',
      'Sportwagen Werkstatt Freiburg', 'Meister-Werkstatt Freiburg',
      'Sportwagen Aufbereitung', 'Keramikversiegelung Sportwagen',
      'Sportwagen Inspektion', 'Sportwagen Wartung', 'Premium-Autohaus Freiburg',
    ],
    founder: { '@id': `${BASE_URL}/#founder` },
    employee: [{ '@id': `${BASE_URL}/#founder` }],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Schusterstraße 40',
      addressLocality: 'Freiburg im Breisgau',
      postalCode: '79098',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.9956,
      longitude: 7.8525,
    },
    areaServed: [
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Liechtenstein' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/prestige.selections',
      'https://www.mobile.de/?customerId=10250471',
    ],
    vehicleSpecialty: [
      'Ferrari', 'Porsche', 'Lamborghini', 'Bentley',
      'Rolls-Royce', 'Aston Martin', 'Maserati',
    ],
    makesOffer: [
      'Ferrari', 'Porsche', 'Lamborghini', 'Bentley',
      'Rolls-Royce', 'Aston Martin', 'Maserati',
    ].map((brand) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Car',
        brand: { '@type': 'Brand', name: brand },
      },
    })),
  };

  // WebSite root node with SearchAction for sitelinks-searchbox.
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'Prestige Selections',
    url: BASE_URL,
    publisher: { '@id': `${BASE_URL}/#dealer` },
    inLanguage: ['de', 'en', 'fr'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/${locale}/fahrzeuge?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html
      lang={locale}
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
      style={{ colorScheme: 'light' }}
    >
      <body
        className="min-h-screen flex flex-col bg-canvas text-ink"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-ink focus:px-6 focus:py-3 focus:rounded-full focus:text-sm focus:font-medium focus:tracking-widest focus:uppercase"
        >
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
            <SoundToggle />
            <PlausibleAnalytics />
            <StapeTracking />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(founderSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }}
        />
      </body>
    </html>
  );
}
