'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Reveal from '@/components/editorial/Reveal';

/**
 * Abschluss — Sitewide canonical Final-CTA mit Sven-Portrait.
 * Props erlauben per-Page Override für Label/Eyebrow/Headline/Subline/Ankauf-Bridge.
 * Defaults greifen auf 'abschluss' i18n-Namespace zurück (Homepage-Content).
 */

const PHONE_HREF = 'tel:+491764145810';
const EMAIL_HREF = 'mailto:hallo@systembuero.com';
const FOUNDER_LANDSCAPE = '/assets/abschluss/abschluss-founder-landscape-placeholder.webp';

type AbschlussProps = {
  label?: string;
  eyebrow?: string;
  headline?: string;
  subline?: string;
  visitLabel?: string;
  ankaufHint?: string | null;
  ankaufLink?: string | null;
  analyticsKey?: string;
};

type ShowroomStatus = {
  isOpen: boolean;
  ready: boolean;
  minutesUntil: number;
};

function computeShowroomStatus(): ShowroomStatus {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  if (day === 0) {
    return { isOpen: false, ready: true, minutesUntil: (1440 - minutes) + 24 * 60 + 540 };
  }
  if (day === 6) {
    const open = minutes >= 600 && minutes < 960;
    return {
      isOpen: open,
      ready: true,
      minutesUntil: open ? 960 - minutes : (minutes < 600 ? 600 - minutes : (1440 - minutes) + 540),
    };
  }
  const open = minutes >= 540 && minutes < 1080;
  return {
    isOpen: open,
    ready: true,
    minutesUntil: open ? 1080 - minutes : (minutes < 540 ? 540 - minutes : (1440 - minutes) + 540),
  };
}

function formatCountdown(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return `${h}h ${m}min`;
}

export default function Abschluss({
  label: labelProp,
  eyebrow: eyebrowProp,
  headline: headlineProp,
  subline: sublineProp,
  visitLabel: visitLabelProp,
  ankaufHint: ankaufHintProp,
  ankaufLink: ankaufLinkProp,
  analyticsKey,
}: AbschlussProps = {}) {
  const t = useTranslations('abschluss');
  const locale = useLocale();
  const [status, setStatus] = useState<ShowroomStatus>({ isOpen: false, ready: false, minutesUntil: 0 });

  const label = labelProp ?? t('label');
  const eyebrow = eyebrowProp ?? t('eyebrow');
  const headline = headlineProp ?? t('headline');
  const subline = sublineProp ?? t('subline');
  const visitLabel = visitLabelProp ?? t('visitLabel');
  const showAnkauf = ankaufHintProp !== null;
  const ankaufHint = ankaufHintProp ?? t('ankaufHint');
  const ankaufLink = ankaufLinkProp ?? t('ankaufLink');
  const phoneAnalytics = analyticsKey ? `phone_click_${analyticsKey}` : 'phone_click_abschluss';

  useEffect(() => {
    const tick = () => setStatus(computeShowroomStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t('label'),
    about: { '@id': 'https://www.prestige-selections.com/#dealer' },
    inLanguage: locale,
  };

  return (
    <section
      className="relative bg-canvas-soft text-ink overflow-hidden"
      aria-labelledby="abschluss-label"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema).replace(/</g, '\\u003c') }}
      />

      <div className="relative px-6 md:px-10 lg:px-14 pt-24 md:pt-32 lg:pt-40 pb-20 md:pb-24">
        <div className="mx-auto max-w-[1500px]">
          {/* Section header — Eyebrow + Live Open-Status mit Countdown */}
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/15 pb-5 mb-12 md:mb-16">
              <h2
                id="abschluss-label"
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted"
              >
                {label}
              </h2>
              {status.ready && (
                <span className="flex items-center gap-3 font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted">
                  <span aria-hidden className={`relative block h-2 w-2 rounded-full ${status.isOpen ? 'bg-gold-deep' : 'bg-ink-muted/40'}`}>
                    {status.isOpen && <span className="absolute inset-0 rounded-full bg-gold-deep animate-ping opacity-60" />}
                  </span>
                  <span>{status.isOpen ? t('openNow') : t('closedNow')}</span>
                  {status.isOpen && status.minutesUntil > 0 && (
                    <span aria-hidden className="text-ink-muted/60">
                      · {t('untilClose', { time: formatCountdown(status.minutesUntil) })}
                    </span>
                  )}
                </span>
              )}
            </div>
          </Reveal>

          {/* ── FULL-BLEED CTA-CARD — Image als ganze Card-Fläche ──
              Text-Overlay LEFT-aligned mit linkem Dark-Gradient damit Sven
              rechts naturell hell bleibt. Responsive Aspect-Ratios:
              - Mobile: 4:5 portrait (kompakt, text spans full-width via overlay)
              - sm: 16:10 (kompakt landscape)
              - md: 16:9
              - lg: 21:9 (cinematic-wide, kompakte Höhe)
              - xl: 2.4:1 (ultra-cinematic)
              Card-Höhen typisch ~440-560px (kompakter als vorher 640px). */}
          <Reveal delayMs={120}>
            <article className="relative rounded-3xl overflow-hidden bg-shadow-soft text-on-shadow shadow-card-rest hover:shadow-card-hover transition-shadow duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]">
              <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] xl:aspect-[2.4/1]">
                {/* Full-bleed Image */}
                {/* Mobile: shift image so Sven's head is right-of-text within portrait crop.
                    Desktop: keep right-center (landscape container has space for both). */}
                <Image
                  src={FOUNDER_LANDSCAPE}
                  alt={t('portraitAlt')}
                  fill
                  sizes="(max-width: 1500px) 100vw, 1500px"
                  className="object-cover [object-position:75%_28%] sm:[object-position:right_center]"
                  priority={false}
                />

                {/* Gradient — LEFT dark → RIGHT transparent (Desktop).
                    Mobile gets stronger overlay damit Text-Stack über
                    schmalerem Frame lesbar bleibt. */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to right, rgba(21, 17, 13, 0.92) 0%, rgba(21, 17, 13, 0.65) 32%, rgba(21, 17, 13, 0.2) 62%, transparent 82%)',
                  }}
                />

                {/* Subtle Ghost-"P" decoration left edge — Brand-Anchor */}
                <p
                  aria-hidden
                  className="absolute select-none pointer-events-none font-display italic text-gold/[0.10] leading-none"
                  style={{
                    fontWeight: 300,
                    fontSize: 'clamp(14rem, 28vw, 24rem)',
                    top: '50%',
                    left: '-4%',
                    transform: 'translateY(-50%)',
                    letterSpacing: '-0.06em',
                  }}
                >
                  P
                </p>

                {/* Text-Overlay — LEFT-aligned, vertically centered.
                    Mobile: spans bis ~80%; Desktop: limit auf 56% damit
                    Sven rechts frei sichtbar bleibt. */}
                <div className="absolute inset-y-0 left-0 right-0 sm:right-4 md:right-auto md:w-[60%] lg:w-[54%] flex flex-col justify-center p-7 sm:p-9 md:p-12 lg:p-14 xl:p-16">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-3 mb-4 md:mb-5">
                    <span aria-hidden className="block h-px w-10 bg-gold" />
                    <span
                      className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold"
                      style={{ fontWeight: 500 }}
                    >
                      {eyebrow}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3
                    className="font-display italic text-on-shadow leading-[1.05] tracking-[-0.02em] max-w-[18ch]"
                    style={{
                      fontWeight: 300,
                      fontSize: 'clamp(1.625rem, 3.4vw, 2.875rem)',
                    }}
                  >
                    {headline}
                  </h3>

                  {/* Sub */}
                  <p
                    className="mt-4 md:mt-5 font-sans text-on-shadow-muted leading-[1.5] max-w-[42ch]"
                    style={{
                      fontWeight: 400,
                      fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                    }}
                  >
                    {subline}
                  </p>

                  {/* CTAs */}
                  <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
                    {/* Primary — Phone Pill (gold) */}
                    <a
                      href={PHONE_HREF}
                      aria-label={`${t('callLabel')} — ${t('callValue')}`}
                      data-analytics={phoneAnalytics}
                      className="inline-flex items-center gap-3 px-5 py-3 sm:py-3.5 rounded-full bg-gold text-shadow hover:bg-gold-deep transition-colors duration-300 focus-ring active:translate-y-px font-sans tabular-nums"
                      style={{ fontWeight: 600, fontSize: 'clamp(0.85rem, 0.95vw, 0.95rem)' }}
                    >
                      <span aria-hidden className="text-[10px] uppercase tracking-[0.28em] font-mono-spec" style={{ fontWeight: 600 }}>
                        {t('callLabel')}
                      </span>
                      <span aria-hidden className="block w-px h-3.5 bg-shadow/40" />
                      <span>{t('callValue')}</span>
                    </a>

                    {/* Secondary — Termin Outline */}
                    <Link
                      href="/kontakt"
                      className="group/btn inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full border border-on-shadow/25 text-on-shadow hover:border-gold hover:text-gold transition-colors duration-300 focus-ring active:translate-y-px"
                      style={{ fontWeight: 500, fontSize: 'clamp(0.825rem, 0.9vw, 0.9rem)' }}
                    >
                      <span>{visitLabel}</span>
                      <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
                    </Link>
                  </div>

                  {/* Tertiary — Email (only md+ to save mobile space) */}
                  <a
                    href={EMAIL_HREF}
                    className="hidden md:inline-flex mt-5 items-center gap-2 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-on-shadow-muted hover:text-gold transition-colors duration-300 focus-ring rounded-sm active:translate-y-px self-start"
                    style={{ fontWeight: 500 }}
                  >
                    {t('writeValue')} <span aria-hidden>→</span>
                  </a>
                </div>

                {/* Caption overlay — bottom-right corner. Hidden on mobile
                    weil Sven dort weniger sichtbar. */}
                <div className="hidden md:block absolute bottom-5 right-5 lg:bottom-6 lg:right-6 text-right">
                  <p
                    className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-on-shadow"
                    style={{ fontWeight: 500 }}
                  >
                    {t('signatureName')}
                  </p>
                  <p
                    className="mt-1 font-mono-spec text-[9px] uppercase tracking-[0.32em] text-on-shadow/70"
                    style={{ fontWeight: 500 }}
                  >
                    {t('signatureRole')} · {t('reach')}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Ankauf-Hint — quiet sell-side bridge (null = hide) */}
          {showAnkauf && (
            <Reveal delayMs={280}>
              <div className="mt-14 md:mt-20 pt-10 md:pt-12 border-t border-ink/15 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                <p className="font-display italic text-ink-soft leading-snug max-w-[52ch]" style={{ fontWeight: 300, fontSize: 'clamp(1rem, 1.3vw, 1.25rem)' }}>
                  {ankaufHint}
                </p>
                <Link
                  href="/verkaufen"
                  className="group inline-flex items-center gap-3 font-mono-spec text-[11px] uppercase tracking-[0.28em] text-gold-deep hover:text-ink transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
                  style={{ fontWeight: 500 }}
                >
                  <span className="relative inline-block">
                    {ankaufLink}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gold-deep origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
                    />
                  </span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
