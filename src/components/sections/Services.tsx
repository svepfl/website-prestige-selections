'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/editorial/Reveal';

/**
 * AKT V — Leistungen · Tab-Reveal mit Photo-Background-Cards
 *
 * 4 Cards horizontal, eine expandiert (~4fr), drei als Spines (~1fr).
 * Klick auf Spine → wird aktiv, andere kollabieren mit smooth grid-
 * template-columns transition.
 *
 * Photo-Background pro Card (Methode-Storyboards aus
 * /assets/methode/), Dark-Gradient für Text-Lesbarkeit. Editorial-
 * Tier, NICHT glassmorphism, NICHT UI-Mockups in Cards.
 *
 * Photo-Storyboards (Rule 13): `-placeholder` Suffix — werden später
 * via Real-Shoot 1:1 ersetzt. REPLICATION NOTEs in
 * /public/assets/methode/_brief.md
 */

type ServiceHref = '/fahrzeuge' | '/verkaufen' | '/werkstatt' | '/kontakt';

interface Service {
  key: 1 | 2 | 3 | 4;
  href: ServiceHref;
  image: string;
  imageAlt: string;
}

const SERVICES: Service[] = [
  {
    key: 1,
    href: '/fahrzeuge',
    image: '/assets/methode/methode-01-kollektion-placeholder.webp',
    imageAlt: 'Sven Pflüger bei der Vehicle-Verifizierung am offenen Bonnet',
  },
  {
    key: 2,
    href: '/verkaufen',
    image: '/assets/methode/methode-02-ankauf-placeholder.webp',
    imageAlt: 'Schlüsselübergabe an einem polished-concrete Display-Plinth',
  },
  {
    key: 3,
    href: '/werkstatt',
    image: '/assets/methode/methode-03-atelier-placeholder.webp',
    imageAlt: 'Werkstatt-Meister am Vorderrad mit Drehmomentschlüssel',
  },
  {
    key: 4,
    href: '/kontakt',
    image: '/assets/methode/methode-04-concierge-placeholder.webp',
    imageAlt: 'Sven Pflüger im Atelier-Office beim internationalen Concierge-Anruf',
  },
];

export default function Services() {
  const t = useTranslations('leistungen');
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutsRef = useRef<number[]>([]);
  const demoCompleteRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // One-time demo sweep on first viewport entry — communicates "these cards
  // are tabs you can open." Sweeps once through 1→2→3→0, then stays static.
  // User interaction cancels pending timeouts.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (demoCompleteRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      demoCompleteRef.current = true;
      return;
    }
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || demoCompleteRef.current) return;
        demoCompleteRef.current = true;
        io.disconnect();
        // Schedule sweep: 1 → 2 → 3 → 0, each step 900ms apart
        timeoutsRef.current = [
          window.setTimeout(() => setActiveIndex(1), 1200),
          window.setTimeout(() => setActiveIndex(2), 2100),
          window.setTimeout(() => setActiveIndex(3), 3000),
          window.setTimeout(() => setActiveIndex(0), 3900),
        ];
      },
      { threshold: 0.3 },
    );
    io.observe(section);
    return () => {
      io.disconnect();
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleActivate = (i: number) => {
    // Cancel any pending demo timeouts and lock to user's choice
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
    demoCompleteRef.current = true;
    setActiveIndex(i);
  };

  // Grid template — active card 4fr, inactive cards 1fr each.
  const gridTemplate = SERVICES.map((_, i) =>
    i === activeIndex ? '4fr' : '1fr',
  ).join(' ');

  return (
    <section
      ref={sectionRef}
      className="relative bg-canvas text-ink"
      aria-labelledby="leistungen-label"
    >
      <div className="relative px-6 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1500px]">
          {/* Header — mono strip */}
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/15 pb-5 mb-16 md:mb-20">
              <h2
                id="leistungen-label"
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted"
              >
                {t('label')}
              </h2>
              <span className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted/70">
                {t('lotMarker')}
              </span>
            </div>
          </Reveal>

          {/* Intro Manifesto — "Vier Disziplinen. / Eine Hand." */}
          <Reveal delayMs={80}>
            <p
              className="font-sans text-ink leading-[0.95] tracking-[-0.025em] uppercase max-w-[14ch] mb-16 md:mb-20"
              style={{
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                whiteSpace: 'pre-line',
              }}
            >
              {t('introShort')}
            </p>
          </Reveal>

          {/* Desktop: Tab-Reveal Grid im natürlichen Flow.
              activeIndex wandert durch alle Cards während die Grid durch
              den Viewport scrollt — kein Pin, kein Scroll-Jack. User
              scrollt normal weiter und sieht subtile Card-Rotation als
              Affordance ("die sind klickbar"). */}
          <Reveal delayMs={160} className="hidden md:block">
            <div
              role="tablist"
              aria-label={t('label')}
              className="grid gap-0 rounded-lg overflow-hidden border border-ink/10"
              style={{
                gridTemplateColumns: gridTemplate,
                height: 'clamp(520px, 70vh, 720px)',
                transition: 'grid-template-columns 700ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              {SERVICES.map((service, i) => (
                <ServiceTab
                  key={service.key}
                  service={service}
                  isActive={i === activeIndex}
                  onActivate={() => handleActivate(i)}
                />
              ))}
            </div>
          </Reveal>

          {/* Mobile: Vertical stack mit Photo-Cards */}
          <div className="md:hidden space-y-4">
            {SERVICES.map((service, i) => (
              <Reveal key={service.key} delayMs={160 + i * 100}>
                <MobileServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          {/* Outro — Phone-CTA */}
          <Reveal delayMs={SERVICES.length * 100 + 400}>
            <div className="mt-20 md:mt-28 pt-8 border-t border-ink/15 flex flex-wrap items-baseline justify-between gap-4">
              <p
                className="font-display italic text-ink-soft leading-snug max-w-[40ch]"
                style={{
                  fontWeight: 300,
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)',
                }}
              >
                {t('outro')}
              </p>
              <ServicesPhoneCta t={t} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * ServicesPhoneCta — phone link only when the translation actually resolves
 * to a phone number, so a missing translation can never produce `tel:phone`.
 */
function ServicesPhoneCta({
  t,
}: {
  t: ReturnType<typeof useTranslations<'leistungen'>>;
}) {
  const phone = t('phone');
  if (!phone || !phone.startsWith('+')) return null;
  return (
    <a
      href={`tel:${phone.replace(/\s/g, '')}`}
      className="group inline-flex items-center gap-2 font-mono-spec text-[11px] md:text-[12px] uppercase tracking-[0.28em] text-ink hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm tabular-nums"
      style={{ fontWeight: 600 }}
    >
      <span>{phone}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

function ServiceTab({
  service,
  isActive,
  onActivate,
}: {
  service: Service;
  isActive: boolean;
  onActivate: () => void;
}) {
  const t = useTranslations('leistungen');
  const { key, href, image, imageAlt } = service;

  return (
    <div
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate();
        }
      }}
      className="relative overflow-hidden cursor-pointer border-r border-ink/10 last:border-r-0 bg-shadow"
    >
      {/* Photo-Background-Card */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        className={`object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isActive ? 'scale-100' : 'scale-110 brightness-75'
        }`}
        sizes={isActive ? '60vw' : '15vw'}
        priority={key === 1}
      />

      {/* Dark gradient overlay */}
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isActive
            ? 'bg-gradient-to-t from-shadow via-shadow/60 to-shadow/20 opacity-100'
            : 'bg-gradient-to-t from-shadow/95 via-shadow/70 to-shadow/40 opacity-100'
        }`}
      />

      {/* Spine — vertical title, only visible when inactive */}
      <div
        aria-hidden={isActive}
        className={`absolute inset-0 flex flex-col items-center justify-between py-8 px-3 z-10 transition-opacity duration-500 ${
          isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold tabular-nums">
          {t(`s${key}Number` as 's1Number')}
        </span>
        <span
          className="font-sans text-on-shadow uppercase tracking-[-0.01em] leading-none select-none"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontWeight: 700,
            fontSize: 'clamp(1.125rem, 1.6vw, 1.75rem)',
          }}
        >
          {t(`s${key}Title` as 's1Title')}
        </span>
        <span
          aria-hidden
          className="block w-1.5 h-1.5 rounded-full bg-on-shadow/50"
        />
      </div>

      {/* Active content */}
      <div
        className={`relative h-full p-8 md:p-10 lg:p-14 flex flex-col justify-end z-10 transition-opacity duration-500 ${
          isActive ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top — Lot-mark + metric */}
        <div className="flex items-baseline gap-3 font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold tabular-nums mb-6">
          <span>{t(`s${key}Number` as 's1Number')}</span>
          <span aria-hidden className="block h-px w-8 bg-gold/60" />
          <span>
            {t(`s${key}Metric` as 's1Metric')}{' '}
            {t(`s${key}MetricLabel` as 's1MetricLabel')}
          </span>
        </div>

        {/* Middle — title + manifesto + body */}
        <div className="mb-8">
          <h3
            className="font-sans text-on-shadow uppercase tracking-[-0.02em] leading-[0.95] mb-4 md:mb-6"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
            }}
          >
            {t(`s${key}Title` as 's1Title')}
          </h3>
          <p
            className="font-display text-on-shadow leading-[1.1] tracking-[-0.01em] max-w-[20ch] mb-6"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
            }}
          >
            {t(`s${key}Manifesto` as 's1Manifesto')}
          </p>
          <p
            className="font-sans text-on-shadow-muted leading-[1.55] max-w-[42ch]"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(0.95rem, 1.05vw, 1rem)',
            }}
          >
            {t(`s${key}Body` as 's1Body')}
          </p>
        </div>

        {/* CTA */}
        <Link
          href={href}
          className="group/cta self-start inline-flex items-center gap-2 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-gold hover:text-on-shadow transition-colors duration-300 focus-ring rounded-sm"
          style={{ fontWeight: 600 }}
          tabIndex={isActive ? 0 : -1}
        >
          <span className="relative inline-block">
            {t(`s${key}Link` as 's1Link')}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 right-0 h-px bg-gold origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/cta:scale-x-100"
            />
          </span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover/cta:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

function MobileServiceCard({ service }: { service: Service }) {
  const t = useTranslations('leistungen');
  const { key, href, image, imageAlt } = service;
  return (
    <Link
      href={href}
      className="group relative block rounded-lg overflow-hidden focus-ring active:translate-y-px bg-shadow"
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.04]"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-shadow via-shadow/65 to-shadow/15 pointer-events-none"
        />

        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex items-baseline gap-3 font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold tabular-nums mb-3">
            <span>{t(`s${key}Number` as 's1Number')}</span>
            <span aria-hidden className="block h-px w-6 bg-gold/60" />
            <span>
              {t(`s${key}Metric` as 's1Metric')}{' '}
              {t(`s${key}MetricLabel` as 's1MetricLabel')}
            </span>
          </div>

          <h3
            className="font-sans text-on-shadow uppercase tracking-[-0.02em] leading-[0.95] mb-2"
            style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 6vw, 2.25rem)' }}
          >
            {t(`s${key}Title` as 's1Title')}
          </h3>

          <p
            className="font-display text-on-shadow leading-[1.15] mb-3 max-w-[20ch]"
            style={{ fontWeight: 400, fontSize: '1.15rem' }}
          >
            {t(`s${key}Manifesto` as 's1Manifesto')}
          </p>

          <p className="font-sans text-on-shadow-muted text-[0.95rem] leading-[1.55] mb-4 max-w-[42ch]">
            {t(`s${key}Body` as 's1Body')}
          </p>

          <div
            className="inline-flex items-center gap-2 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-gold group-hover:text-on-shadow transition-colors duration-300"
            style={{ fontWeight: 600 }}
          >
            <span>{t(`s${key}Link` as 's1Link')}</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
