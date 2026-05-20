import { Cormorant, Montserrat } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import StapeTracking from '@/components/StapeTracking';

const BASE_URL = 'https://www.prestige-selections.com';
const locales = ['de', 'en', 'fr'] as const;

const cormorant = Cormorant({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
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
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
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
      'theme-color': '#0C0A09',
      'color-scheme': 'dark',
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

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'Prestige Selections GmbH',
    alternateName: 'Prestige Selections',
    legalName: 'Prestige GmbH',
    url: BASE_URL,
    telephone: '+49-761-5573168',
    email: 'info@prestige-selections.com',
    foundingDate: '2012',
    founder: {
      '@type': 'Person',
      name: 'Jérôme Gay',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Engesserstraße 1',
      addressLocality: 'Freiburg im Breisgau',
      postalCode: '79108',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.013,
      longitude: 7.8354,
    },
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

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Prestige Selections',
    url: BASE_URL,
    publisher: {
      '@type': 'AutoDealer',
      name: 'Prestige Selections GmbH',
    },
    inLanguage: ['de', 'en', 'fr'],
  };

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-dark focus:px-6 focus:py-3 focus:rounded-full focus:text-sm focus:font-medium focus:tracking-widest focus:uppercase"
        >
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <StapeTracking />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
}
