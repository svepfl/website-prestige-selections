'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { getVehiclePlaceholder } from '@/data/images';
import { vehicles, type Vehicle } from '@/data/vehicles';
import TextureLayer from '@/components/visual/TextureLayer';

/**
 * AKT III — Drei aus Dreißig · Magazin-Spread (Tom Hartley × RM Sotheby's)
 *
 * Layout: asymmetric 62/38 split. Photo links, info column rechts —
 * bottom-aligned an die Foto-Baseline (THJ + RM signature). Niemals Text
 * auf dem Fahrzeug. Photo bleibt Protagonist.
 *
 * Scroll: Lenis-driven via useLenis → Apple-tier uniform feel über alle
 * Input-Devices (Wheel · Trackpad · Touch). Native-scroll-fallback für
 * prefers-reduced-motion.
 *
 * Signature-Interaction: Mouse-Parallax INSIDE Photo — Cursor-Position
 * treibt subtile Bild-Translation.
 *
 * Title-Drift: 0 → +55vh über die Section. Title z-10 (hinter Photo).
 */

const FEATURED_IDS = [
  'aston-martin-dbs',
  'ferrari-sf90-spider',
  'porsche-panamera-turbo',
] as const;

type QuoteKey = 'v1Quote' | 'v2Quote' | 'v3Quote';

// Section-depth = 100vh sticky + 80vh scrollable Scrub-Range für Slide-Trans.
// 320vh total → ~100vh pro Slide-Crossfade · matched zu Heritage/Spuren-Tempo.
// Vorher 180vh wirkte zu snappy vs Rest der Site (Heritage 500vh, Spuren ähnlich).
// Slow-cinema-Pace matched die anderen pinned-Sections sitewide.
const SECTION_HEIGHT_VH = 320;

export default function Schaufenster() {
  const t = useTranslations('schaufenster');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const featured = FEATURED_IDS.map((id) => vehicles.find((v) => v.id === id)).filter(
    (v): v is Vehicle => Boolean(v),
  );

  const quoteKeys: QuoteKey[] = ['v1Quote', 'v2Quote', 'v3Quote'];

  // Single source of truth for progress reading — used both by Lenis tick
  // (Apple-tier path) and native scroll fallback (reduced-motion path).
  const updateProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const scrolled = Math.max(0, -rect.top);
    const total = section.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    setProgress(Math.min(1, Math.max(0, scrolled / total)));
  }, []);

  // Lenis-driven update (active when smooth scroll is enabled). Fires on
  // every Lenis rAF tick — single-rAF, no jank, uniform across devices.
  useLenis(updateProgress);

  // Native scroll fallback for prefers-reduced-motion + initial sync + resize.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [updateProgress]);

  const slideCount = featured.length;

  function computeSlide(i: number, p: number) {
    const SPEED_VH = 180;
    const FADE_START_VH = 60;
    const FADE_END_VH = 90;
    const isLast = i === slideCount - 1;
    const centeredP = slideCount > 1 ? i / (slideCount - 1) : 0;

    let translateY = (centeredP - p) * SPEED_VH;
    if (isLast && translateY < 0) translateY = 0;

    const abs = Math.abs(translateY);
    let opacity = 1;
    if (abs > FADE_END_VH) {
      opacity = 0;
    } else if (abs > FADE_START_VH) {
      opacity = 1 - (abs - FADE_START_VH) / (FADE_END_VH - FADE_START_VH);
    }

    return { opacity, translateY };
  }

  const TITLE_FADE_OUT_START = 0.82;
  let titleVisibility = 1;
  if (progress > TITLE_FADE_OUT_START) {
    titleVisibility = Math.max(
      0,
      1 - (progress - TITLE_FADE_OUT_START) / (1 - TITLE_FADE_OUT_START),
    );
  }
  // Moderater Drift — Title beginnt oben als Section-Headline, driftet
  // dann in die Photo-Card-Zone wo der Text-Swap unsichtbar hinter dem
  // Card (z-10 vs z-20) passiert.
  const titleY = progress * 55;
  const titleOpacity = 0.55 * titleVisibility;
  const subtitleOpacity = 0.90 * titleVisibility;

  // Swap-Timing: nicht closest-to-center (würde bei p=0.75 swappen, da ist
  // kein Foto am Title-Position → Swap sichtbar). Stattdessen früher: bei
  // p≈0.23 (1→2) und p≈0.57 (2→3) — beide Momente ist der ausscheidende
  // Slide noch zentriert genug, dass sein Foto die Title-Position abdeckt.
  // Floor mit Offset 0.1 → Swaps shiften gleichmäßig nach vorne.
  const TITLE_SWAP_OFFSET = 0.1;
  const activeTitleIndex = Math.min(
    slideCount - 1,
    Math.floor((progress + TITLE_SWAP_OFFSET) * slideCount),
  );
  const slideKey = (activeTitleIndex + 1) as 1 | 2 | 3;
  const titleKey = `slideTitle${slideKey}` as
    | 'slideTitle1'
    | 'slideTitle2'
    | 'slideTitle3';
  const subKey = `slideSub${slideKey}` as
    | 'slideSub1'
    | 'slideSub2'
    | 'slideSub3';

  return (
    <section
      ref={sectionRef}
      className="relative bg-canvas text-ink"
      aria-labelledby="schaufenster-label"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <TextureLayer variant="paper" opacity={0.04} />

        {/* Top markers — Lot (left) + Progress (right). Padding OUTSIDE max-w-1500
            damit Markers exakt mit Card-Content-Edges alignen (Card hat px-padding
            am parent, max-w am inner — gleiches Pattern hier). */}
        <div className="absolute top-8 md:top-12 inset-x-0 px-6 md:px-10 lg:px-14 z-30 pointer-events-none">
          <div className="mx-auto max-w-[1500px] flex items-baseline justify-between">
            <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep">
              Akt III · {t('lotMarker')}
            </p>
            <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted tabular-nums">
              {String(
                Math.min(slideCount, Math.floor(progress * slideCount) + 1),
              ).padStart(2, '0')}{' '}
              / {String(slideCount).padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* Editorial vertical index — right edge */}
        <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-30 pointer-events-none hidden md:block">
          <div className="origin-right rotate-90 transform">
            <span className="font-mono-spec text-[9px] uppercase tracking-[0.4em] text-ink-muted/40 whitespace-nowrap">
              Akt III — Kuration der Woche
            </span>
          </div>
        </div>

        {/* Section Title — zweizeilig (whitespace-pre-line ehrt das `\n`
            in den Translations). Sitzt oben über der Photo-Card mit klarem
            Headline-Abstand zu den Top-Markers (top-8 mobile / top-12 desktop).
            top-20 mobile (= 80px) garantiert kein Overlap auf small viewports.
            Drift versteckt den Text-Swap später hinter der Card (z-10 vs z-20). */}
        <div
          className="absolute inset-x-0 top-20 md:top-[6%] lg:top-[5%] flex flex-col items-center z-10 pointer-events-none px-6"
          style={{
            transform: `translateY(${titleY}vh)`,
            willChange: 'transform',
          }}
        >
          <h2
            id="schaufenster-label"
            className="font-sans text-ink leading-[0.95] tracking-[-0.03em] uppercase select-none text-center whitespace-pre-line"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 4rem)',
              opacity: titleOpacity,
            }}
          >
            {t(titleKey)}
          </h2>
          <p
            className="mt-4 md:mt-5 font-display text-ink/70 leading-none text-center select-none"
            style={{
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(0.95rem, 1.3vw, 1.25rem)',
              opacity: subtitleOpacity,
            }}
          >
            {t(subKey)}
          </p>
        </div>

        {/* Vehicle slides — Magazin-Spread Layout */}
        <div className="absolute inset-0 z-20">
          {featured.map((vehicle, i) => {
            const { opacity, translateY } = computeSlide(i, progress);
            const pullQuote = t(quoteKeys[i] ?? 'v1Quote');

            return (
              <VehicleSlide
                key={vehicle.id}
                vehicle={vehicle}
                index={i}
                pullQuote={pullQuote}
                discoverLabel={t('discover')}
                locale={locale}
                opacity={opacity}
                translateY={translateY}
                zIndex={20 + i}
                priority={i === 0}
              />
            );
          })}
        </div>

        {/* Section CTA — fades in at end of scroll */}
        <div
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-30"
          style={{
            opacity: Math.max(0, Math.min(1, (progress - 0.65) / 0.25)),
            pointerEvents: progress > 0.85 ? 'auto' : 'none',
            transition: 'opacity 200ms linear',
          }}
        >
          <Link
            href="/fahrzeuge"
            className="group inline-flex items-center gap-3 bg-ink text-canvas rounded-full px-6 py-3 font-mono-spec text-[10px] uppercase tracking-[0.28em] hover:bg-ink-soft transition-colors duration-300 active:translate-y-px focus-ring"
            style={{ fontWeight: 600 }}
          >
            {t('viewAll')}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * VehicleSlide — Cinematic-Plate + Caption-Band (Movie-Poster-Pattern).
 *
 * Single Card aus zwei Etagen:
 *   ▣ OBEN: Photo Cinemascope (aspect 2:1 desktop) — Vehicle bleibt clean,
 *     niemals Text darüber. Untere Photo-Kante fadet via Gradient nahtlos
 *     in den dunklen Caption-Band.
 *   ▣ UNTEN: Caption-Band auf `bg-shadow` (Cinema-Dark) — trägt Lot-Mark,
 *     Model-Headline, Spec-Strip, Editorial-Quote, Preis, CTA.
 *
 * Der Übergang Photo→Band ist ein vertical Gradient von transparent zu
 * Shadow — die Schatten in den Studio-Aufnahmen verschmelzen organisch
 * mit dem Band, wie bei Movie-Postern.
 *
 * Signature-Interaction: Mouse-Parallax INSIDE Photo (cursor-driven).
 */
function VehicleSlide({
  vehicle,
  index,
  pullQuote,
  discoverLabel,
  locale,
  opacity,
  translateY,
  zIndex,
  priority,
}: {
  vehicle: Vehicle;
  index: number;
  pullQuote: string;
  discoverLabel: string;
  locale: string;
  opacity: number;
  translateY: number;
  zIndex: number;
  priority: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const card = cardRef.current;
    const wrap = imageWrapRef.current;
    if (!card || !wrap) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const MAX_PARALLAX = 14;
    const LERP = 0.08;

    const handleMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = nx * MAX_PARALLAX * 2;
      targetY = ny * MAX_PARALLAX * 2;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;
      wrap.style.transform = `scale(1.06) translate3d(${currentX}px, ${currentY}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    card.addEventListener('pointermove', handleMove);
    card.addEventListener('pointerleave', handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      card.removeEventListener('pointermove', handleMove);
      card.removeEventListener('pointerleave', handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const img = getVehiclePlaceholder(vehicle.manufacturer, vehicle.id);
  const formattedMileage = vehicle.mileage.toLocaleString('de-DE');
  const year = vehicle.firstRegistration
    ? vehicle.firstRegistration.split('/').slice(-1)[0]
    : null;
  const lotNumber = String(index + 1).padStart(2, '0');

  const priceFormatter = new Intl.NumberFormat(
    locale === 'de' ? 'de-DE' : locale === 'fr' ? 'fr-FR' : 'en-GB',
    { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 },
  );
  const priceLabel = priceFormatter.format(vehicle.price);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-6 md:px-10 lg:px-14 pt-[14vh] sm:pt-0"
      style={{
        opacity,
        transform: `translateY(${translateY}vh)`,
        willChange: 'opacity, transform',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        zIndex,
      }}
      aria-hidden={opacity < 0.5}
    >
      <Link
        ref={cardRef}
        href={`/fahrzeuge/${vehicle.id}` as '/fahrzeuge'}
        className="group block w-full max-w-[1500px] overflow-hidden rounded-lg focus-ring bg-shadow"
        aria-label={`${vehicle.manufacturer} ${vehicle.model}`}
      >
        {/* Photo plate — Cinemascope. Headline + Lot-Mark sitzen ABSOLUT
            in der Fade-Zone, wie ein Filmposter-Titel. */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/9] overflow-hidden">
          <div
            ref={imageWrapRef}
            className="absolute inset-0 will-change-transform"
            style={{ transform: 'scale(1.06)' }}
          >
            <Image
              src={img}
              alt={`${vehicle.manufacturer} ${vehicle.model} — Wochen-Auswahl von Sven · Sportwagen aus Freiburg`}
              fill
              className="object-cover"
              sizes="(max-width: 1500px) 100vw, 1500px"
              priority={priority}
            />
          </div>

          {/* Fade-to-band — verschmilzt Studio-Schatten organisch ins
              Caption-Band. Halbe Photo-Höhe für satte Movie-Poster-Tiefe. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent via-shadow/55 to-shadow pointer-events-none"
          />

          {/* Title-Block in der Fade-Zone — Lot-Mark + Model + Quote
              wandern als Movie-Poster-Titel in den Übergang */}
          <div className="absolute inset-x-0 bottom-0 px-5 sm:px-7 md:px-10 pb-3 md:pb-4 lg:pb-5 pointer-events-none">
            <div className="flex items-end justify-between gap-4 md:gap-8">
              {/* Linke Seite — Lot + Model + Editorial-Line */}
              <div className="min-w-0 flex-1">
                <p className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold mb-1.5 md:mb-2">
                  Lot {lotNumber} — {vehicle.manufacturer}
                </p>
                <h3
                  className="font-sans text-on-shadow uppercase tracking-[-0.02em] leading-[0.92] truncate"
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(1.75rem, 3.6vw, 3.5rem)',
                  }}
                >
                  {vehicle.model}
                </h3>
                <p
                  className="hidden md:block mt-2 font-display italic text-on-shadow/70 leading-snug max-w-[42ch]"
                  style={{
                    fontWeight: 300,
                    fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                  }}
                >
                  «{pullQuote}»
                </p>
              </div>

              {/* Rechte Seite — Spec-Strip + Preis (desktop) */}
              <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0 pb-1">
                <div className="font-mono-spec text-[10px] uppercase tracking-[0.26em] text-on-shadow/85 tabular-nums whitespace-nowrap">
                  <span className="text-gold mr-1.5">›</span>
                  {vehicle.power} PS
                  <span aria-hidden className="text-on-shadow/35 mx-2">·</span>
                  {formattedMileage} km
                  {year && (
                    <>
                      <span aria-hidden className="text-on-shadow/35 mx-2">·</span>
                      {year}
                    </>
                  )}
                </div>
                <div className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-on-shadow tabular-nums">
                  {priceLabel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Caption-Band — bg-shadow nahtlos. Desktop: dünner Hover-CTA-
            Streifen. Mobile: Quote + Spec-Strip (passt nicht in die Fade-
            Zone bei kleinen Aspect-Ratios). */}
        <div className="relative bg-shadow text-on-shadow px-5 sm:px-7 md:px-10 pt-3 md:pt-3 pb-4 md:pb-4">
          {/* Mobile-only: Quote + Spec-Strip (auf desktop in Fade-Zone) */}
          <div className="md:hidden space-y-2.5">
            <p
              className="font-display italic text-on-shadow/70 leading-snug"
              style={{ fontWeight: 300, fontSize: '0.95rem' }}
            >
              «{pullQuote}»
            </p>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono-spec text-[10px] uppercase tracking-[0.26em] text-on-shadow/75 tabular-nums">
              <span>
                <span className="text-gold mr-1.5">›</span>
                {vehicle.power} PS
              </span>
              <span aria-hidden className="text-on-shadow/35">·</span>
              <span>{formattedMileage} km</span>
              {year && (
                <>
                  <span aria-hidden className="text-on-shadow/35">·</span>
                  <span>{year}</span>
                </>
              )}
              <span aria-hidden className="text-on-shadow/35">·</span>
              <span className="text-on-shadow/90">{priceLabel}</span>
            </div>
          </div>

          {/* Hover-Reveal CTA */}
          <div
            className="mt-3 md:mt-0 inline-flex items-center gap-2 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-gold md:opacity-0 md:-translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ fontWeight: 600 }}
          >
            <span>{discoverLabel}</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

