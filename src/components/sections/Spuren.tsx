'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import TextureLayer from '@/components/visual/TextureLayer';

// — Tuning-Konstanten — am Modul-Top damit Designer/Reviewer einen
// einzigen Anlaufpunkt für Animation-Parameter haben.
const AUTO_ADVANCE_CARDS = 1;          // Card-Widths pro Auto-Advance
const AUTO_ADVANCE_DURATION_MS = 2400; // ease-in-out cubic Gesamt-Dauer
const AUTO_ADVANCE_THRESHOLD = 0.2;    // IO Sichtbarkeits-Anteil zum Start
const CARD_WIDTH_FALLBACK = 320;       // wenn querySelector den ersten Card nicht findet
const GAP_FALLBACK_PX = 24;            // wenn computed gap nicht parsbar
import Reveal from '@/components/editorial/Reveal';
import { SPUREN_LEDGER, type LedgerEntry } from '@/data/spuren-ledger';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

/**
 * AKT VII — Spuren · Editorial-Stream Hauptbuch (Phase 1, 8 Cards)
 *
 * Horizontal-Scroll-Layout: jede Card = 1:1 zu einem Customer-Photo. Card-Bg
 * ist `--color-shadow` (warmes Near-Black), Photo schmilzt am unteren Rand
 * in den Card-Boden — Photo & Caption lesen als eine durchgehende Fläche
 * (Cinematic-Movie-Poster-Logik, kompakt).
 *
 * Affordance-Layer (Apple-Product-Page-Tier — keine User-Education nötig):
 * - Autonomes One-Shot Auto-Advance: sobald Section sichtbar wird, scrollen
 *   die Cards von selbst um EINE Card-Width nach links. Custom rAF easing
 *   ease-in-out cubic über 2400ms — ruhiges Anfahren + Auslaufen.
 *   Ein ruhiger Anstoß als Affordance-Signal ("hier gibt's mehr"), kein
 *   Auto-Carousel. Spielt durch egal ob User weiter scrollt oder
 *   stehenbleibt. Stoppt sofort wenn User selbst eingreift.
 * - Mono-Chevron-Buttons (Desktop only, hidden on touch) — Singer/Hodinkee-Tier
 * - Edge-Fade-Gradients links/rechts vom Scroller — hint auf mehr Content
 *
 * Mobile (<md): kleinere Cards (w-280), tighter Gaps, keine Arrows
 * (Swipe ist native Geste), Padding kompakter.
 *
 * Phase 2 (Real-Shoot): pro Real-Photo wird `photoOverride` getauscht und
 * neue Einträge dem Ledger hinzugefügt — Component unverändert.
 */

export default function Spuren() {
  const t = useTranslations('spuren');
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const userInteractedRef = useRef(false);
  const advanceDoneRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState({ index: 1, ratio: 0 });
  const [bounds, setBounds] = useState({ atStart: true, atEnd: false });

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setProgress({ index: 1, ratio: 0 });
      setBounds({ atStart: true, atEnd: true });
      return;
    }
    const ratio = Math.min(1, Math.max(0, el.scrollLeft / maxScroll));
    const centerX = el.scrollLeft + el.clientWidth / 2;
    const cards = el.querySelectorAll<HTMLElement>('[data-ledger-card]');
    let closest = 1;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(centerX - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i + 1;
      }
    });
    setProgress({ index: closest, ratio });
    setBounds({
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= maxScroll - 4,
    });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // Defer initial setState out of the effect body (cascading-render guard).
    const raf = requestAnimationFrame(onScroll);
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => onScroll();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [onScroll]);

  // Direct user-interaction flag — sobald User selbst horizontal scrollt,
  // tritt die Auto-Drift permanent zur Seite (kein Tauziehen).
  //
  // WICHTIG: nur DOMINANTER Horizontal-Wheel-Intent flaggt (deltaX > deltaY
  // UND deltaX > 4). macOS-Trackpads emittieren oft diagonale Wheel-Events
  // selbst bei reinem Vertikal-Scroll — diese würden den Drift sofort killen
  // wenn wir auf jedes deltaX > 0 reagierten.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const flag = () => {
      userInteractedRef.current = true;
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) {
        flag();
      }
    };
    el.addEventListener('touchstart', flag, { passive: true });
    el.addEventListener('pointerdown', flag, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      el.removeEventListener('touchstart', flag);
      el.removeEventListener('pointerdown', flag);
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  // ── Autonomes One-Shot Auto-Advance ── sobald die Section ~20% sichtbar
  // wird, scrollen die Cards autonom um ~3 Card-Widths nach links. Spielt
  // unabhängig vom weiteren User-Scroll durch (vollständige Animation egal
  // ob User weiter scrollt oder stehenbleibt) — Hodinkee/Aesop-Tier
  // Affordance-Signal, nicht scroll-gekoppelt.
  //
  // Custom rAF ease-in-out cubic über 2400ms — ruhiges Anfahren UND
  // Auslaufen (im Gegensatz zu ease-out das aggressiver startet).
  // Bei 2400ms + 3 Cards bewegen sich die Cards mit ca. einer Card pro
  // 800ms — fühlbar, aber nicht hektisch.
  //
  // Guards:
  // - Spielt nur EINMAL pro Page-Load (advanceDoneRef)
  // - Stoppt sofort wenn User selbst angreift (userInteractedRef)
  // - Disabled bei prefers-reduced-motion
  // - Bricht ab wenn maxScroll < advance-target (kein Overscroll)
  useEffect(() => {
    if (reducedMotion) return;
    const sectionEl = sectionRef.current;
    const scrollerEl = scrollerRef.current;
    if (!sectionEl || !scrollerEl) return;

    let rafId = 0;
    // ease-in-out cubic: ruhiger Start, ruhiger Stop, voll in der Mitte
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const startAdvance = () => {
      if (advanceDoneRef.current || userInteractedRef.current) return;
      advanceDoneRef.current = true;

      const firstCard = scrollerEl.querySelector<HTMLElement>('[data-ledger-card]');
      const cardWidth = firstCard?.offsetWidth ?? CARD_WIDTH_FALLBACK;
      const cs = window.getComputedStyle(scrollerEl);
      const gap = parseFloat(cs.columnGap || cs.gap || String(GAP_FALLBACK_PX)) || GAP_FALLBACK_PX;
      const stride = cardWidth + gap;
      const maxScroll = scrollerEl.scrollWidth - scrollerEl.clientWidth;
      if (maxScroll <= 0) return;

      const from = scrollerEl.scrollLeft;
      // Nur EIN Card-Peek (siehe AUTO_ADVANCE_CARDS) — genug um klar zu
      // signalisieren "mehr Cards rechts", nicht so viel dass es wirkt
      // wie ein Auto-Carousel. Ein ruhiger Anstoß, dann übernimmt der User.
      const target = Math.min(from + stride * AUTO_ADVANCE_CARDS, maxScroll);
      if (target <= from) return;

      // Scroll-Snap während der Animation aus — sonst snapt der Browser
      // jeden Frame zu Card-Boundaries und es ruckelt card-für-card.
      // Nach der Animation wieder an, damit User-Drag/Swipe sauber snapt.
      // (Embla, Swiper, Pagani etc. machen es genauso.)
      scrollerEl.style.scrollSnapType = 'none';

      const restoreSnap = () => {
        scrollerEl.style.scrollSnapType = '';
      };

      const start = performance.now();
      const tick = (now: number) => {
        rafId = 0;
        if (userInteractedRef.current) {
          restoreSnap();
          return;
        }
        const t = Math.min(1, (now - start) / AUTO_ADVANCE_DURATION_MS);
        scrollerEl.scrollLeft = from + (target - from) * easeInOutCubic(t);
        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          restoreSnap();
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (advanceDoneRef.current || userInteractedRef.current) return;
        // Direkt starten ohne Delay — User hat die Section schon gesehen
        startAdvance();
      },
      { threshold: AUTO_ADVANCE_THRESHOLD },
    );
    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      // Ensure snap is restored if cleanup happens mid-animation
      scrollerEl.style.scrollSnapType = '';
    };
  }, [reducedMotion]);

  // Arrow-Button-Step — scroll by one card width + gap. Wert wird zur
  // Laufzeit aus dem ersten Card-Element abgeleitet (responsive-safe).
  const scrollByCards = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    userInteractedRef.current = true;
    const firstCard = el.querySelector<HTMLElement>('[data-ledger-card]');
    const cardWidth = firstCard?.offsetWidth ?? 320;
    // Approximate gap (matches Tailwind gap-6/8/10) — read from computed style
    // for accuracy across breakpoints.
    const cs = window.getComputedStyle(el);
    const gap = parseFloat(cs.columnGap || cs.gap || '24');
    el.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-canvas-soft text-ink overflow-hidden"
      aria-labelledby="spuren-label"
    >
      <TextureLayer variant="paper" opacity={0.05} />

      <div className="relative" style={{ zIndex: 2 }}>
        {/* Header + Title — confined to max-w container */}
        <div className="px-6 md:px-10 lg:px-14 pt-20 sm:pt-24 md:pt-32 lg:pt-40">
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/15 pb-4 sm:pb-5 mb-10 sm:mb-14 md:mb-20">
                <h2
                  id="spuren-label"
                  className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted"
                >
                  {t('label')}
                </h2>
                <span className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted/70">
                  {t('lotMarker')}
                </span>
              </div>
            </Reveal>

            <div className="relative mb-10 sm:mb-14 md:mb-20 lg:mb-24">
              <span
                aria-hidden
                className="font-display italic text-ink/8 leading-none tracking-[-0.04em] pointer-events-none select-none absolute -top-4 sm:-top-6 md:-top-10 right-0 whitespace-nowrap"
                style={{
                  fontWeight: 300,
                  fontSize: 'clamp(3rem, 10vw, 10rem)',
                }}
              >
                {t('anchor')}
              </span>

              <Reveal delayMs={120}>
                <p
                  className="relative font-display italic text-ink leading-[1.2] tracking-[-0.015em] max-w-[28ch]"
                  style={{
                    fontWeight: 300,
                    fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
                  }}
                >
                  {t('intro')}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── HORIZONTAL STREAM ── Card-Layout: shadow-bg + photo→shadow-fade.
            Edge-Fade-Overlays signalisieren "mehr Content links/rechts" ohne
            UI-Schreierei. */}
        <div className="relative">
          {/* Edge fade left — hint at off-screen content. Hidden when at start. */}
          <div
            aria-hidden
            className={[
              'pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20 z-10',
              'bg-gradient-to-r from-canvas-soft via-canvas-soft/70 to-transparent',
              'transition-opacity duration-300',
              bounds.atStart ? 'opacity-0' : 'opacity-100',
            ].join(' ')}
          />
          {/* Edge fade right */}
          <div
            aria-hidden
            className={[
              'pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20 z-10',
              'bg-gradient-to-l from-canvas-soft via-canvas-soft/70 to-transparent',
              'transition-opacity duration-300',
              bounds.atEnd ? 'opacity-0' : 'opacity-100',
            ].join(' ')}
          />

          <div
            ref={scrollerRef}
            role="region"
            aria-label="Ledger der vermittelten Fahrzeuge"
            className="ledger-scroller flex overflow-x-auto overflow-y-hidden snap-x snap-proximity gap-4 sm:gap-6 md:gap-8 lg:gap-10 pb-6 items-stretch"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div
              aria-hidden
              className="shrink-0 w-[max(1.25rem,calc((100vw-1500px)/2))]"
            />
            {SPUREN_LEDGER.map((entry, i) => (
              <LedgerCard
                key={`${entry.period}-${entry.vehicle}-${i}`}
                entry={entry}
                index={i}
                priority={i < 3}
                t={t}
              />
            ))}
            <div
              aria-hidden
              className="shrink-0 w-[max(1.25rem,calc((100vw-1500px)/2))]"
            />
          </div>

          {/* Footer-Row — Progress + Arrows. Arrows desktop-only; mobile users
              swipe natively. */}
          <div className="px-6 md:px-10 lg:px-14 mt-5 md:mt-6">
            <div className="mx-auto max-w-[1500px] flex items-center justify-between gap-4">
              {/* Progress */}
              <span
                aria-live="polite"
                className="font-mono-spec tabular-nums text-[11px] uppercase tracking-[0.28em] text-ink-muted shrink-0"
                style={{ fontWeight: 500 }}
              >
                <span className="text-ink">
                  {String(progress.index).padStart(2, '0')}
                </span>
                <span className="mx-2 text-ink-muted/40">{t('streamProgress')}</span>
                <span>{String(SPUREN_LEDGER.length).padStart(2, '0')}</span>
              </span>

              {/* Hairline progress-bar */}
              <div
                aria-hidden
                className="relative flex-1 max-w-[420px] h-px bg-ink/15"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-gold-deep transition-[width] duration-200 ease-out"
                  style={{ width: `${Math.max(2, progress.ratio * 100)}%` }}
                />
              </div>

              {/* Arrow controls — desktop only. ChevronLeft / ChevronRight as
                  mono unicode. Disabled at bounds. */}
              <div className="hidden md:flex items-center gap-1.5 shrink-0">
                <ArrowButton
                  direction="prev"
                  disabled={bounds.atStart}
                  onClick={() => scrollByCards(-1)}
                  label={t('prev')}
                />
                <ArrowButton
                  direction="next"
                  disabled={bounds.atEnd}
                  onClick={() => scrollByCards(1)}
                  label={t('next')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pb-20 sm:pb-24 md:pb-32 lg:pb-40" />
      </div>

      <style>{`
        .ledger-scroller::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        'group inline-flex items-center justify-center',
        'h-9 w-9 rounded-full',
        'border border-ink/15 bg-canvas-raised',
        'text-ink transition-[color,background-color,transform] duration-200 ease-[cubic-bezier(0.65,0,0.35,1)]',
        'hover:border-ink/30 hover:bg-canvas',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-soft',
        'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-ink/15 disabled:hover:bg-canvas-raised',
      ].join(' ')}
    >
      {/* Mono-chevron — kein Lucide-Icon, reines unicode für Editorial-Reduktion */}
      <span
        aria-hidden
        className="font-mono-spec text-[14px] leading-none transition-transform duration-200"
        style={{
          fontWeight: 500,
          transform: direction === 'next' ? 'translateX(0.5px)' : 'translateX(-0.5px)',
        }}
      >
        {direction === 'prev' ? '‹' : '›'}
      </span>
    </button>
  );
}

function LedgerCard({
  entry,
  index,
  priority,
  t,
}: {
  entry: LedgerEntry;
  index: number;
  priority: boolean;
  t: ReturnType<typeof useTranslations<'spuren'>>;
}) {
  const altLine = `${entry.vehicle} — übergeben ${entry.period} nach ${entry.city}`;
  // Archive-Lot: latest 8 → Lot 0947 → 0940 (sequential, signals "documented
  // record" within a 14-year/900+ archive). Implicit rolling count.
  const lotNumber = (947 - index).toString().padStart(4, '0');

  return (
    <article
      data-ledger-card
      className="shrink-0 snap-start w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] flex flex-col rounded-2xl overflow-hidden group bg-shadow text-on-shadow"
    >
      {/* Photo plate — 4:5 portrait matches source photos (1122×1402). Photo
          fadet am unteren Rand in den Card-Boden (var(--color-shadow))
          via flacher 25%-Höhen-Gradient — kürzer als Standard-Movie-Poster,
          weil die Card kompakt ist und sonst zu viel vom Photo überlagert
          würde. */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={entry.photoOverride}
          alt={altLine}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 360px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.04]"
          style={{
            filter: 'saturate(0.88) contrast(1.02) brightness(0.97)',
          }}
          priority={priority}
        />
        {/* Bottom-fade INTO shadow — kompakter (25%), weicher Stop */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--color-shadow) 70%, transparent) 60%, var(--color-shadow) 100%)',
          }}
        />
        {/* Archive-Lot badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span
            className="inline-block px-2.5 py-1 font-mono-spec text-[9px] uppercase tracking-[0.32em] tabular-nums text-on-shadow bg-shadow/55 backdrop-blur-[2px] rounded-sm"
            style={{ fontWeight: 500 }}
          >
            Lot {lotNumber}
          </span>
        </div>
      </div>

      {/* Caption body — text-on-shadow auf warmem Near-Black. Compact stack:
          Period · Vehicle · City · Quote. */}
      <div className="px-5 sm:px-6 md:px-7 pt-1 pb-6 md:pb-7 flex flex-col flex-1">
        {/* Period — gold reads gegen shadow (höchster APCA-Kontrast) */}
        <p
          className="font-mono-spec text-[10.5px] sm:text-[11px] uppercase tracking-[0.28em] tabular-nums text-gold"
          style={{ fontWeight: 500 }}
        >
          {entry.period}
        </p>
        {/* Vehicle */}
        <p
          className="mt-2 font-sans text-on-shadow uppercase tracking-[-0.015em] leading-[1.15]"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(1.0625rem, 1.3vw, 1.25rem)',
          }}
        >
          {entry.vehicle}
        </p>
        {/* City — Geographic-Anchor */}
        <p
          className="mt-1.5 font-mono-spec uppercase tracking-[0.22em] text-on-shadow-muted"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(0.7rem, 0.8vw, 0.75rem)',
          }}
        >
          {entry.city}
        </p>

        {/* Flex spacer — pushes quote to card-bottom for cross-card alignment */}
        <div className="flex-1 min-h-[1.25rem]" />

        {/* Quote — JEDE Card hat eine Stimme. ✦ als Archive-Accent. */}
        <figure>
          <div
            aria-hidden
            className="font-mono-spec text-gold/60 text-[10px] tracking-[0.5em] leading-none mb-3"
            style={{ fontWeight: 500 }}
          >
            ✦
          </div>
          <blockquote
            className="font-display italic text-on-shadow leading-[1.4] tracking-[-0.005em]"
            style={{
              fontWeight: 300,
              fontSize: 'clamp(0.95rem, 1.05vw, 1.0625rem)',
            }}
          >
            «{t(entry.quoteKey)}»
          </blockquote>
        </figure>
      </div>
    </article>
  );
}
