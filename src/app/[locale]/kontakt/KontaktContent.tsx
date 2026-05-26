'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { jsonLd, buildBreadcrumb } from '@/lib/json-ld';

const PHONE_HREF = 'tel:+491764145810';
const WHATSAPP_HREF = 'https://wa.me/497615573168?text=Hallo%20Prestige%20Selections';
const EMAIL_HREF = 'mailto:hallo@systembuero.com';
const KONTAKT_HERO_IMAGE = '/assets/kontakt/kontakt-hero-placeholder.webp';

export default function KontaktContent() {
  const t = useTranslations('contact');
  const locale = useLocale();

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t('title'),
    description: t('description'),
    url: `https://www.prestige-selections.com/${locale}/kontakt`,
    inLanguage: locale,
    mainEntityOfPage: { '@id': 'https://www.prestige-selections.com/#dealer' },
  };

  const breadcrumbSchema = buildBreadcrumb(locale, [{ name: t('title'), path: '/kontakt' }]);

  return (
    <main className="bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />

      {/* ═══════════════ HERO — Full-Bleed Cinema + Breadcrumbs Overlay ═══════════════ */}
      <section className="relative w-full overflow-hidden bg-shadow" aria-labelledby="kontakt-h1">
        <div className="relative sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] xl:aspect-[2.4/1] min-h-[80vh]">
          <Image
            src={KONTAKT_HERO_IMAGE}
            alt={t('heroAlt')}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          {/* Cinema Gradient — bottom-up for text legibility */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, color-mix(in oklab, var(--color-shadow) 92%, transparent) 0%, color-mix(in oklab, var(--color-shadow) 70%, transparent) 30%, color-mix(in oklab, var(--color-shadow) 28%, transparent) 62%, color-mix(in oklab, var(--color-shadow) 8%, transparent) 100%)',
            }}
          />

          {/* Breadcrumbs Overlay — top, below navbar, recolored for dark via .hero-breadcrumbs */}
          <div className="hero-breadcrumbs absolute top-24 lg:top-28 left-0 right-0 z-10">
            <Breadcrumbs locale={locale} items={[{ label: t('title') }]} />
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
                    {t('label')}
                  </p>
                </div>

                <h1
                  id="kontakt-h1"
                  className="font-sans text-on-shadow leading-[0.92] tracking-[-0.025em] [overflow-wrap:anywhere] min-w-0 max-w-full lg:max-w-[16ch] [text-wrap:balance]"
                  style={{ fontWeight: 700, fontSize: 'clamp(2rem, 6vw, 7.5rem)' }}
                >
                  {t('h1')}
                </h1>

                <p
                  className="mt-8 md:mt-10 font-sans text-on-shadow/85 leading-[1.55] max-w-[58ch]"
                  style={{ fontWeight: 400, fontSize: 'clamp(1rem, 1.2vw, 1.15rem)' }}
                >
                  {t('description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT FORM — 2nd Section · canonical ContactFormSection ═══════════════ */}
      <ContactFormSection
        label={t('formLabel')}
        headline={t('formHeadline')}
        intro={t('formIntro')}
        vehicleHint={t('formVehicleHint')}
        messageHint={t('formMessageHint')}
        analyticsKey="kontakt"
      />

      {/* ═══════════════ CHANNELS — Phone · WhatsApp · Email · Showroom ═══════════════ */}
      <section className="px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/15 bg-canvas-soft">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-baseline gap-4 mb-12 border-b border-ink/15 pb-5">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
            <p
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
              style={{ fontWeight: 500 }}
            >
              {t('channelsLabel')}
            </p>
          </div>
          <div className="divide-y divide-ink/15">
            <Channel
              index="01"
              label={t('channels.phoneLabel')}
              value={t('channels.phoneValue')}
              sub={t('channels.phoneSub')}
              href={PHONE_HREF}
            />
            <Channel
              index="02"
              label={t('channels.whatsappLabel')}
              value={t('channels.whatsappValue')}
              sub={t('channels.whatsappSub')}
              href={WHATSAPP_HREF}
              external
            />
            <Channel
              index="03"
              label={t('channels.emailLabel')}
              value={t('channels.emailValue')}
              sub={t('channels.emailSub')}
              href={EMAIL_HREF}
            />
            <Channel
              index="04"
              label={t('channels.showroomLabel')}
              value={t('channels.showroomValue')}
              sub={t('channels.showroomSub')}
              href={'https://maps.google.com/?q=Schusterstra%C3%9Fe+1+Freiburg'}
              external
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Channel({
  index,
  label,
  value,
  sub,
  href,
  external,
}: {
  index: string;
  label: string;
  value: string;
  sub: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      className="group block py-7 md:py-9 focus-ring rounded-sm active:translate-y-px"
    >
      <div className="grid grid-cols-[3rem_minmax(0,1fr)_minmax(0,2fr)_auto] gap-4 md:gap-8 items-baseline">
        <span className="font-mono-spec tabular-nums text-[11px] text-ink-muted">{index}</span>
        <span className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted">{label}</span>
        <span
          className="font-sans text-xl md:text-2xl lg:text-3xl text-ink leading-tight tracking-[-0.01em] group-hover:text-gold-deep transition-colors duration-300 break-words"
          style={{ fontWeight: 500 }}
        >
          {value}
        </span>
        <span
          aria-hidden
          className="text-ink-muted text-lg md:text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-deep"
        >
          →
        </span>
      </div>
      <p className="mt-3 md:ml-[calc(3rem+2rem)] font-mono-spec text-[10px] uppercase tracking-[0.22em] text-ink-muted">
        {sub}
      </p>
    </a>
  );
}
