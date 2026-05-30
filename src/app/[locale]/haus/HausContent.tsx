'use client';

import { useEffect, useRef, useState } from 'react';
import { jsonLd, buildBreadcrumb } from '@/lib/json-ld';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Reveal from '@/components/editorial/Reveal';
import Abschluss from '@/components/sections/Abschluss';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

const FOUNDER_PORTRAIT = '/assets/founder/sven-pflueger.webp';
const HAUS_HERO_IMAGE = '/assets/haus/haus-hero-placeholder.webp';
const PULLQUOTE_BG = '/assets/atmospherics/markenwelt-engine-turned.webp';
const FOUNDER_EMAIL = 'hallo@systembuero.com';

/**
 * Smooth state-opacity: returns 0-1 based on scroll-progress p relative to state's window.
 * Includes fade-in / fade-out zones at boundaries for buttery cross-fades between adjacent states.
 */
function stateOpacity(p: number, start: number, end: number, fadeZone = 0.035): number {
  if (p < start - fadeZone) return 0;
  if (p < start + fadeZone) return (p - start + fadeZone) / (2 * fadeZone);
  if (p < end - fadeZone) return 1;
  if (p < end + fadeZone) return (end + fadeZone - p) / (2 * fadeZone);
  return 0;
}

/**
 * Tracks scroll progress through a tall section during its sticky-pinned phase.
 * Returns 0 when section top hits viewport top (sticky just pinned),
 * 1 when section bottom hits viewport bottom (sticky about to unpin).
 */
function useStickyScrollProgress(ref: React.RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollableRange = rect.height - vh;
      if (scrollableRange <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = Math.max(0, -rect.top);
      const p = scrolled / scrollableRange;
      setProgress(Math.max(0, Math.min(1, p)));
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [ref]);

  return progress;
}

// Heritage milestone-images — per-year visual anchor along the road-spine
const HERITAGE_IMAGES = [
  { src: '/assets/founder/sven-pflueger.webp', altKey: 'heritage1Alt' },
  { src: '/assets/werkstatt/werkstatt-hero-placeholder.webp', altKey: 'heritage2Alt' },
  { src: '/assets/spuren/spuren-03-ferrari-488-pista-placeholder.webp', altKey: 'heritage3Alt' },
  { src: '/assets/werkstatt/werkstatt-restauration-hero-placeholder.webp', altKey: 'heritage4Alt' },
  { src: '/assets/vermittelt/vermittelt-hero-placeholder.webp', altKey: 'heritage5Alt' },
] as const;

export default function HausContent() {
  const t = useTranslations('haus');
  const locale = useLocale();
  const reducedMotion = usePrefersReducedMotion();
  const heritageSectionRef = useRef<HTMLElement>(null);
  const rawProgress = useStickyScrollProgress(heritageSectionRef);
  const progress = reducedMotion ? 0 : rawProgress;
  const trailProgress = reducedMotion ? 1 : rawProgress;
  // Endcap intensity — controls road-retraction + destination card fade-in.
  // Window starts at 0.91 (after milestone 5 ends at 0.86 cleanly) so they don't visually collide.
  const endcapClip = reducedMotion ? 0 : stateOpacity(progress, 0.91, 1.08);

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t('label'),
    description: t('intro'),
    inLanguage: locale,
    isPartOf: { '@id': 'https://www.prestige-selections.com/#website' },
    about: { '@id': 'https://www.prestige-selections.com/#dealer' },
    mainEntity: { '@id': 'https://www.prestige-selections.com/#founder' },
  };

  const milestones = [1, 2, 3, 4, 5] as const;

  return (
    <main className="bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildBreadcrumb(locale, [{ name: t('title'), path: '/haus' }])) }}
      />

      {/* ═══════════════ HERO — Full-Bleed Cinema (Pattern A canonical) ═══════════════ */}
      <section className="relative w-full overflow-hidden bg-shadow" aria-labelledby="haus-h1">
        <div className="relative sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] xl:aspect-[2.4/1] min-h-[80vh]">
          <Image
            src={HAUS_HERO_IMAGE}
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
                'linear-gradient(to top, color-mix(in oklab, var(--color-shadow) 92%, transparent) 0%, color-mix(in oklab, var(--color-shadow) 70%, transparent) 30%, color-mix(in oklab, var(--color-shadow) 30%, transparent) 60%, color-mix(in oklab, var(--color-shadow) 8%, transparent) 100%)',
            }}
          />

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
                  id="haus-h1"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOUNDER — Editorial 3-Col Card Spread · LIGHT canvas ═══════════════ */}
      <section
        className="px-6 md:px-10 lg:px-14 py-24 md:py-32 border-t border-ink/15 bg-canvas text-ink"
        aria-labelledby="founder-h2"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT — Eyebrow + Headline + Intro */}
            <Reveal className="lg:col-span-4 lg:pr-4">
              <div className="flex items-center gap-3 mb-8">
                <span aria-hidden className="block h-px w-6 bg-ink-muted/50" />
                <p
                  className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted"
                  style={{ fontWeight: 500 }}
                >
                  {t('pillarsLabel')}
                </p>
                <span aria-hidden className="block h-px w-6 bg-ink-muted/50" />
              </div>
              <h2
                id="founder-h2"
                className="font-sans text-ink leading-[0.95] tracking-[-0.025em] max-w-[14ch]"
                style={{ fontWeight: 700, fontSize: 'clamp(2.25rem, 4.8vw, 4rem)' }}
              >
                {t('pillarsH1Line1')}
                <br />
                {t('pillarsH1Line2')}
              </h2>
              <p
                className="mt-8 md:mt-10 font-sans text-ink-soft leading-[1.6] max-w-[34ch]"
                style={{ fontWeight: 400, fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)' }}
              >
                {t('pillarsBody')}
              </p>
            </Reveal>

            {/* MIDDLE — Sven Portrait Card · dark frame on light bg for contrast */}
            <Reveal delayMs={150} className="lg:col-span-4 group">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-shadow-soft shadow-card-rest hover:shadow-card-hover transition-shadow duration-500"
              >
                <Image
                  src={FOUNDER_PORTRAIT}
                  alt={t('founderPortraitAlt')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 0%, transparent 70%, color-mix(in oklab, var(--color-shadow) 25%, transparent) 100%)',
                  }}
                />
              </div>
            </Reveal>

            {/* RIGHT — Name + Title + Bio + Email */}
            <Reveal delayMs={300} className="lg:col-span-4 lg:pl-2">
              <h3
                className="font-sans text-ink leading-[0.95] tracking-[-0.02em]"
                style={{ fontWeight: 700, fontSize: 'clamp(2rem, 3.6vw, 3.25rem)' }}
              >
                {t('pillar1Name')}
              </h3>
              <p
                className="mt-3 md:mt-4 font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
                style={{ fontWeight: 500 }}
              >
                {t('pillar1Title')}
              </p>
              <p
                className="mt-8 md:mt-10 font-sans text-ink-soft leading-[1.6] max-w-[42ch]"
                style={{ fontWeight: 400, fontSize: 'clamp(0.975rem, 1.1vw, 1.05rem)' }}
              >
                {t('founderBody')}
              </p>

              <a
                href={`mailto:${FOUNDER_EMAIL}`}
                className="group/email mt-10 md:mt-12 inline-flex items-center gap-3 focus-ring rounded-sm active:translate-y-px"
                data-analytics="email_click_haus_founder"
              >
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-canvas-soft text-gold-deep transition-colors duration-300 group-hover/email:bg-gold-deep group-hover/email:text-canvas"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="1.5" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <span className="relative font-sans text-ink group-hover/email:text-gold-deep transition-colors duration-300" style={{ fontWeight: 500, fontSize: 'clamp(0.9rem, 1vw, 1rem)' }}>
                  {FOUNDER_EMAIL}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold-deep origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/email:scale-x-100"
                  />
                </span>
              </a>
            </Reveal>
          </div>

          {/* Stat-Strip — light variant */}
          <Reveal delayMs={420}>
            <dl className="mt-20 md:mt-28 grid grid-cols-3 gap-x-6 md:gap-x-10 border-t border-ink/15 pt-12 md:pt-14">
              <div>
                <dt className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-ink-muted">
                  {t('foundedLabel')}
                </dt>
                <dd
                  className="mt-3 font-sans tabular-nums text-ink leading-none"
                  style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}
                >
                  {t('foundedYear')}
                </dd>
              </div>
              <div>
                <dt className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-ink-muted">
                  {t('languagesLabel')}
                </dt>
                <dd
                  className="mt-3 font-mono-spec tabular-nums text-ink leading-none"
                  style={{ fontWeight: 600, fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}
                >
                  {t('languagesValue')}
                </dd>
              </div>
              <div>
                <dt className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-ink-muted">
                  {t('vehiclesLabel')}
                </dt>
                <dd
                  className="mt-3 font-sans tabular-nums text-gold-deep leading-none"
                  style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}
                >
                  {t('vehiclesValue')}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ HERITAGE — Sticky-Pinned Scroll-Story (Magazine-Tier Light Mode) ═══════════════ */}
      <section
        ref={heritageSectionRef}
        className="relative bg-canvas text-ink"
        style={{ height: reducedMotion ? 'auto' : '500vh' }}
        aria-labelledby="heritage-label"
      >
        <div className={reducedMotion ? 'py-32 px-6 md:px-10 lg:px-14' : 'sticky top-0 h-screen w-full overflow-hidden'}>
          {/* Atmospheric Engine-Turned Overlay — subtle paper-tint texture on light bg */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{
              backgroundImage: `url(${PULLQUOTE_BG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.04,
            }}
          />
          {/* Warm paper vignette — soft gold-tinted top + barely-perceptible bottom fade */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 100% 60% at 50% 0%, color-mix(in oklab, var(--color-gold-deep) 5%, transparent) 0%, transparent 60%), linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--color-canvas-soft) 60%, transparent) 100%)',
            }}
          />

          {/* Top Eyebrow — always visible */}
          <div className="absolute top-10 md:top-16 left-0 right-0 z-30 px-6 md:px-10 lg:px-14 pointer-events-none">
            <div className="flex items-baseline gap-4 max-w-[1500px] mx-auto">
              <span aria-hidden className="block h-px w-12 bg-gold-deep/70" />
              <p
                id="heritage-label"
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
                style={{ fontWeight: 500 }}
              >
                {t('heritageLabel')}
              </p>
            </div>
          </div>

          {/* Vertical Road — German lane-marking · Desktop · retracts during endcap to terminate above destination card */}
          <div
            aria-hidden
            className="absolute top-0 left-1/2 -translate-x-1/2 hidden lg:block pointer-events-none"
            style={{
              bottom: `${endcapClip * 55}vh`,
              transition: 'bottom 700ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <div className="relative h-full" style={{ width: '32px' }}>
              {/* LEFT outer SOLID lane edge */}
              <div
                className="absolute top-0 bottom-0 left-0"
                style={{
                  width: '1px',
                  backgroundColor: 'color-mix(in oklab, var(--color-ink) 22%, transparent)',
                }}
              />
              {/* RIGHT outer SOLID lane edge */}
              <div
                className="absolute top-0 bottom-0 right-0"
                style={{
                  width: '1px',
                  backgroundColor: 'color-mix(in oklab, var(--color-ink) 22%, transparent)',
                }}
              />
              {/* CENTER dashed lane divider (Mittelstreifen) */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
                style={{
                  width: '2px',
                  backgroundImage:
                    'linear-gradient(to bottom, color-mix(in oklab, var(--color-ink) 28%, transparent) 0 24px, transparent 24px 54px)',
                  backgroundSize: '100% 54px',
                  backgroundRepeat: 'repeat-y',
                }}
              />
              {/* Gold scroll-trail overlay on center — gold replaces dashes as user travels */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 overflow-hidden" style={{ width: '2px' }}>
                <div
                  className="absolute inset-0 w-full origin-top"
                  style={{
                    transform: `scaleY(${trailProgress})`,
                    backgroundColor: 'var(--color-gold)',
                    boxShadow:
                      '0 0 14px color-mix(in oklab, var(--color-gold) 55%, transparent), 0 0 4px color-mix(in oklab, var(--color-gold) 90%, transparent)',
                    transition: 'transform 60ms linear',
                  }}
                />
              </div>
              {/* Road Terminator — horizontal hairline crossing road at bottom edge, appears during endcap */}
              <div
                aria-hidden
                className="absolute left-0 right-0 bottom-0 h-px"
                style={{
                  backgroundColor: 'var(--color-gold)',
                  boxShadow:
                    '0 0 18px color-mix(in oklab, var(--color-gold) 70%, transparent), 0 0 4px color-mix(in oklab, var(--color-gold) 95%, transparent)',
                  opacity: endcapClip,
                  transition: 'opacity 700ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              />
            </div>
          </div>

          {/* Mobile Road — same structure, narrower, also retracts during endcap */}
          <div
            aria-hidden
            className="absolute top-0 left-3 lg:hidden pointer-events-none"
            style={{
              bottom: `${endcapClip * 55}vh`,
              transition: 'bottom 700ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <div className="relative h-full" style={{ width: '20px' }}>
              {/* LEFT outer solid */}
              <div
                className="absolute top-0 bottom-0 left-0"
                style={{
                  width: '1px',
                  backgroundColor: 'color-mix(in oklab, var(--color-ink) 22%, transparent)',
                }}
              />
              {/* RIGHT outer solid */}
              <div
                className="absolute top-0 bottom-0 right-0"
                style={{
                  width: '1px',
                  backgroundColor: 'color-mix(in oklab, var(--color-ink) 22%, transparent)',
                }}
              />
              {/* CENTER dashed */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
                style={{
                  width: '2px',
                  backgroundImage:
                    'linear-gradient(to bottom, color-mix(in oklab, var(--color-ink) 28%, transparent) 0 16px, transparent 16px 36px)',
                  backgroundSize: '100% 36px',
                  backgroundRepeat: 'repeat-y',
                }}
              />
              {/* Gold scroll-trail */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 overflow-hidden" style={{ width: '2px' }}>
                <div
                  className="absolute inset-0 w-full origin-top"
                  style={{
                    transform: `scaleY(${trailProgress})`,
                    backgroundColor: 'var(--color-gold)',
                    boxShadow: '0 0 10px color-mix(in oklab, var(--color-gold) 55%, transparent)',
                    transition: 'transform 60ms linear',
                  }}
                />
              </div>
              {/* Mobile Road Terminator */}
              <div
                aria-hidden
                className="absolute left-0 right-0 bottom-0 h-px"
                style={{
                  backgroundColor: 'var(--color-gold)',
                  boxShadow: '0 0 14px color-mix(in oklab, var(--color-gold) 70%, transparent)',
                  opacity: endcapClip,
                  transition: 'opacity 700ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              />
            </div>
          </div>

          {/* Photo Cards — Pure scroll-tied translation · multiple visible simultaneously · no fade */}
          {!reducedMotion &&
            HERITAGE_IMAGES.map((img, idx) => {
              // Each photo has a "center position" in scroll-progress where it sits at viewport-center.
              // P_i = 0.12 + idx * 0.18 → 0.12, 0.30, 0.48, 0.66, 0.84
              // Factor 280vh per progress unit → adjacent photos ~50vh apart at any moment (3 visible)
              const photoCenter = 0.12 + idx * 0.18;
              const translateY = (photoCenter - progress) * 280;
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  aria-hidden
                  className="absolute top-1/2 z-10 pointer-events-none"
                  style={{
                    left: isLeft ? '6%' : 'auto',
                    right: isLeft ? 'auto' : '6%',
                    width: 'clamp(280px, 30vw, 460px)',
                    transform: `translate3d(0, calc(-50% + ${translateY}vh), 0)`,
                    willChange: 'transform',
                  }}
                >
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-canvas-soft">
                    <Image
                      src={img.src}
                      alt={t(img.altKey as 'heritage1Alt')}
                      fill
                      sizes="(max-width: 768px) 280px, (max-width: 1280px) 30vw, 460px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              );
            })}

          {/* Center Text Stack — heading → milestones → endcap, continuous cross-fade */}
          {!reducedMotion && (
            <div className="absolute inset-0 z-20 flex items-center justify-center px-6 pointer-events-none">
              <div className="relative max-w-[40ch] text-center w-full">
                {/* State 0: Heading */}
                {(() => {
                  const op = stateOpacity(progress, -0.04, 0.07);
                  return (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center"
                      style={{
                        opacity: op,
                        transform: `translate3d(0, ${(1 - op) * -14}px, 0)`,
                        willChange: 'opacity, transform',
                      }}
                    >
                      {/* Backdrop shield — masks road behind text */}
                      <div
                        aria-hidden
                        className="absolute pointer-events-none"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 'clamp(420px, 56vw, 760px)',
                          height: 'clamp(280px, 38vh, 440px)',
                          background:
                            'radial-gradient(ellipse at center, var(--color-canvas) 65%, color-mix(in oklab, var(--color-canvas) 88%, transparent) 62%, transparent 80%)',
                        }}
                      />
                      <p
                        className="relative font-display italic text-ink leading-[1.1] tracking-[-0.025em]"
                        style={{ fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                      >
                        {t('heritageH1')}
                      </p>
                      <p
                        className="relative mt-6 font-sans text-ink-muted leading-[1.55] max-w-[36ch] px-4"
                        style={{ fontWeight: 400, fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}
                      >
                        {t('heritageSubline')}
                      </p>
                    </div>
                  );
                })()}

                {/* States 1-5: Milestones — backdrop shield masks road + text-shadow on year for clean readability */}
                {milestones.map((m, idx) => {
                  const photoCenter = 0.12 + idx * 0.18;
                  const isLast = idx === milestones.length - 1;
                  // Last milestone gets tighter end so endcap takes over cleanly without overlap
                  const stateStart = photoCenter - 0.085;
                  const stateEnd = isLast ? photoCenter + 0.02 : photoCenter + 0.085;
                  const op = stateOpacity(progress, stateStart, stateEnd);
                  return (
                    <div
                      key={m}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                      style={{
                        opacity: op,
                        transform: `translate3d(0, ${(1 - op) * -14}px, 0)`,
                        willChange: 'opacity, transform',
                      }}
                    >
                      {/* Backdrop shield — radial dark ellipse masks road behind text */}
                      <div
                        aria-hidden
                        className="absolute pointer-events-none"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 'clamp(420px, 56vw, 760px)',
                          height: 'clamp(320px, 44vh, 500px)',
                          background:
                            'radial-gradient(ellipse at center, var(--color-canvas) 68%, color-mix(in oklab, var(--color-canvas) 88%, transparent) 62%, transparent 80%)',
                        }}
                      />
                      <p
                        className="relative font-mono-spec tabular-nums text-[10px] uppercase tracking-[0.32em] text-gold mb-6"
                        style={{ fontWeight: 500 }}
                      >
                        {String(idx + 1).padStart(2, '0')} · {t('milestoneLabel')}
                      </p>
                      <p
                        className="relative font-display italic tabular-nums text-gold leading-none"
                        style={{
                          fontWeight: 300,
                          fontSize: 'clamp(4rem, 10vw, 8.5rem)',
                          textShadow:
                            '0 0 40px var(--color-canvas), 0 0 80px var(--color-canvas)',
                        }}
                      >
                        {t(`milestone${m}Year` as 'milestone1Year')}
                      </p>
                      <p
                        className="relative mt-6 md:mt-8 font-display italic text-ink leading-[1.4] max-w-[36ch] px-4"
                        style={{ fontWeight: 300, fontSize: 'clamp(1.05rem, 1.4vw, 1.375rem)' }}
                      >
                        {t(`milestone${m}Text` as 'milestone1Text')}
                      </p>
                    </div>
                  );
                })}

              </div>
            </div>
          )}

          {/* Destination Card — combined Pull-Quote + Attribution + Address, sits below road terminator */}
          {!reducedMotion && (
            <div
              className="absolute inset-x-0 z-30 px-6 pointer-events-none"
              style={{
                top: '54vh',
                opacity: endcapClip,
                transform: `translate3d(0, ${(1 - endcapClip) * 28}px, 0)`,
                transition: 'opacity 700ms cubic-bezier(0.23, 1, 0.32, 1), transform 700ms cubic-bezier(0.23, 1, 0.32, 1)',
                willChange: 'opacity, transform',
              }}
            >
              <div className="mx-auto max-w-[44ch] text-center">
                <blockquote>
                  <p
                    className="font-display italic text-ink leading-[1.1] tracking-[-0.025em]"
                    style={{ fontWeight: 300, fontSize: 'clamp(1.875rem, 4.5vw, 3.75rem)' }}
                  >
                    {t('pullQuote')}
                  </p>
                  <footer className="mt-6 md:mt-8">
                    <cite
                      className="not-italic font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold"
                      style={{ fontWeight: 500 }}
                    >
                      {t('pullQuoteAttribution')}
                    </cite>
                  </footer>
                </blockquote>
                <span
                  aria-hidden
                  className="block w-12 h-px mx-auto my-7 md:my-8 bg-ink-muted/40"
                />
                <p
                  className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted"
                  style={{ fontWeight: 500 }}
                >
                  {t('roadEndcap')}
                </p>
              </div>
            </div>
          )}

          {/* Reduced-Motion Fallback — static vertical milestone stack */}
          {reducedMotion && (
            <div className="relative mx-auto max-w-[1500px] mt-16 space-y-20">
              <div className="text-center mb-16">
                <p
                  className="font-display italic text-ink leading-[1.1] tracking-[-0.025em]"
                  style={{ fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                >
                  {t('heritageH1')}
                </p>
                <p className="mt-4 font-sans text-ink-muted max-w-[40ch] mx-auto">
                  {t('heritageSubline')}
                </p>
              </div>
              {milestones.map((m, idx) => {
                const img = HERITAGE_IMAGES[idx]!;
                return (
                  <div key={m} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="relative aspect-[4/5] max-w-[320px] mx-auto rounded-xl overflow-hidden bg-canvas-soft">
                      <Image
                        src={img.src}
                        alt={t(img.altKey as 'heritage1Alt')}
                        fill
                        sizes="320px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold mb-4" style={{ fontWeight: 500 }}>
                        {String(idx + 1).padStart(2, '0')} · {t('milestoneLabel')}
                      </p>
                      <p
                        className="font-display italic text-gold mb-6"
                        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 300 }}
                      >
                        {t(`milestone${m}Year` as 'milestone1Year')}
                      </p>
                      <p
                        className="font-display italic text-ink"
                        style={{ fontSize: 'clamp(1rem, 1.3vw, 1.25rem)', fontWeight: 300 }}
                      >
                        {t(`milestone${m}Text` as 'milestone1Text')}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="text-center pt-8">
                <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold" style={{ fontWeight: 500 }}>
                  {t('roadEndcap')}
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ═══════════════ FINAL CTA — Canonical Abschluss (Sven) ═══════════════ */}
      <Abschluss
        label={t('abschluss.label')}
        visitLabel={t('abschluss.visitLabel')}
        analyticsKey="haus"
      />
    </main>
  );
}
