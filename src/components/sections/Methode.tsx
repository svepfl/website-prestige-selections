'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';

/**
 * AKT VI — Die Methode · Compact Editorial-Index mit IntersectionObserver-
 * driven Card-Rotation.
 *
 * Desktop: linke Step-List + rechte Card-Säule. Section ist genau so hoch
 * wie die Steps + tight padding (keine artifiziell aufgeblasene Scroll-
 * Distanz). Card rotiert sofort sobald ein Step in den Viewport-Center
 * scrollt — fast triggers, keine tote Fläche.
 *
 * Mobile: jede Step bekommt ihre eigene Photo-Card direkt darunter
 * (vertikale Editorial-Sequenz). Sauberes natural-scroll Reading.
 */

interface MethodeStep {
  key: 1 | 2 | 3;
  image: string;
  imageAlt: string;
}

const STEPS: MethodeStep[] = [
  {
    key: 1,
    image: '/assets/methode/methode-01-kollektion-placeholder.webp',
    imageAlt: 'Ankauf — Sven bei Vehicle-Verifizierung am offenen Bonnet',
  },
  {
    key: 2,
    image: '/assets/methode/methode-03-atelier-placeholder.webp',
    imageAlt: 'Prüfung — Werkstatt-Meister am Vorderrad mit Drehmomentschlüssel',
  },
  {
    key: 3,
    image: '/assets/methode/methode-02-ankauf-placeholder.webp',
    imageAlt: 'Übergabe — Schlüsselübergabe am Display-Plinth',
  },
];

export default function Methode() {
  const t = useTranslations('methode');
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualOverride, setManualOverride] = useState<number | null>(null);

  // Closest-to-viewport-center tracking — deterministic, no threshold races
  const updateActive = useCallback(() => {
    if (manualOverride !== null) return;
    const items = stepRefs.current.filter((el): el is HTMLLIElement => el !== null);
    if (items.length === 0) return;
    const viewportCenter = window.innerHeight * 0.5;
    let closestIdx = 0;
    let minDist = Infinity;
    items.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.abs(elCenter - viewportCenter);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = i;
      }
    });
    setActiveIndex(closestIdx);
  }, [manualOverride]);

  useLenis(updateActive);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Defer initial computation off the effect commit so setState isn't
    // called synchronously inside the effect body (React 19 set-state-in-
    // effect lint rule). RAF runs after paint — no visible delay.
    const raf = requestAnimationFrame(updateActive);
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [updateActive]);

  useEffect(() => {
    if (manualOverride === null) return;
    const id = setTimeout(() => setManualOverride(null), 1500);
    return () => clearTimeout(id);
  }, [manualOverride]);

  const handleStepClick = (i: number) => {
    setActiveIndex(i);
    setManualOverride(i);
  };

  return (
    <section
      className="relative bg-canvas text-ink"
      aria-labelledby="methode-label"
    >
      <div className="relative px-6 md:px-10 lg:px-14 py-24 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          {/* Header — mono strip */}
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/15 pb-5 mb-12 md:mb-20">
            <h2
              id="methode-label"
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted"
            >
              {t('label')}
            </h2>
            <span className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted/70">
              {t('lotMarker')}
            </span>
          </div>

          {/* Massive heading — die These der Section, NICHT der Section-Name */}
          <div className="mb-12 md:mb-24">
            <h3
              className="font-sans text-ink leading-[0.95] tracking-[-0.025em] uppercase mb-6 md:mb-8 whitespace-pre-line"
              style={{
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              }}
            >
              {t('heading')}
            </h3>
            <p
              className="font-display italic text-ink-soft leading-snug max-w-[52ch]"
              style={{
                fontWeight: 300,
                fontSize: 'clamp(1.05rem, 1.4vw, 1.4rem)',
              }}
            >
              {t('tagline')}
            </p>
          </div>

          {/* DESKTOP: two-column layout (md+) — natural height, observer-driven */}
          <div className="hidden md:grid grid-cols-12 gap-8 md:gap-12 lg:gap-20">
            {/* LEFT — Step-List, items spaced enough that each enters viewport center distinctly */}
            <ol className="col-span-5 lg:col-span-4 space-y-12 md:space-y-14 lg:space-y-16">
              {STEPS.map((step, i) => {
                const isActive = i === activeIndex;
                return (
                  <li
                    key={step.key}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleStepClick(i)}
                      className="group block text-left w-full focus-ring rounded-sm py-2"
                      aria-pressed={isActive}
                    >
                      <div
                        className={`flex items-baseline gap-4 transition-colors duration-500 ${
                          isActive ? 'text-ink' : 'text-ink-muted/50'
                        }`}
                      >
                        <span
                          className="font-mono-spec tabular-nums text-[11px] uppercase tracking-[0.28em]"
                          style={{ fontWeight: 500 }}
                        >
                          {t(`step${step.key}Number` as 'step1Number')}
                        </span>
                        <span
                          aria-hidden
                          className={`block h-px transition-[width,background-color] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                            isActive
                              ? 'w-12 lg:w-16 bg-gold-deep'
                              : 'w-6 lg:w-8 bg-ink-muted/30 group-hover:w-10 group-hover:bg-ink-muted/60'
                          }`}
                        />
                        <span
                          className="font-sans uppercase tracking-[-0.015em] leading-none transition-colors duration-300 group-hover:text-ink"
                          style={{
                            fontWeight: 700,
                            fontSize: 'clamp(1.125rem, 1.6vw, 1.5rem)',
                          }}
                        >
                          {t(`step${step.key}Title` as 'step1Title')}
                        </span>
                      </div>
                      {/* Step 2 carries the 142 trust-anchor as inline mono-spec */}
                      {step.key === 2 && (
                        <p
                          className={`mt-2 ml-12 lg:ml-16 font-mono-spec tabular-nums text-[10px] uppercase tracking-[0.24em] transition-colors duration-500 ${
                            isActive ? 'text-gold-deep' : 'text-ink-muted/40'
                          }`}
                          style={{ fontWeight: 500 }}
                        >
                          {t('step2Spec')}
                        </p>
                      )}
                      <p
                        className={`mt-3 ml-12 lg:ml-16 font-sans leading-[1.55] max-w-[42ch] transition-[opacity,max-height] duration-500 ${
                          isActive
                            ? 'text-ink-soft opacity-100 max-h-[240px]'
                            : 'text-ink-muted/50 opacity-60 max-h-[80px] overflow-hidden'
                        }`}
                        style={{ fontSize: 'clamp(0.9rem, 1vw, 1rem)' }}
                      >
                        {t(`step${step.key}Body` as 'step1Body')}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* RIGHT — Sticky Photo-Stack-Stage. Drei Cards übereinander
                wie ein Stapel Photographien auf einem Tisch.
                Tiefe via translate + scale + opacity (KEIN rotateY —
                rotateY = Carousel-Vibe). Editorial-Tier, nicht Slot-Machine.
                Inspiration: Hodinkee Gallery, Sotheby's Auction-Lot-View. */}
            <div className="col-span-7 lg:col-span-8">
              <div className="sticky top-[12vh]">
                <div
                  className="relative w-full max-w-[520px] ml-auto"
                  style={{ aspectRatio: '4 / 5' }}
                >
                  {STEPS.map((step, i) => {
                    const slot = (i - activeIndex + STEPS.length) % STEPS.length;
                    return (
                      <StackCard
                        key={step.key}
                        step={step}
                        slot={slot}
                        zIndex={STEPS.length - slot}
                        t={t}
                        priority={step.key === 1}
                      />
                    );
                  })}
                </div>

                {/* Vertical step-progress hairline — right of the stage,
                    goldener Strich wandert mit aktivem Step. */}
                <div
                  aria-hidden
                  className="hidden lg:block absolute top-0 right-0 lg:-right-6 h-full w-px bg-ink-muted/15"
                  style={{ maxWidth: '520px' }}
                >
                  <div
                    className="absolute left-0 w-full bg-gold-deep transition-[top,height] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                    style={{
                      top: `${(activeIndex / STEPS.length) * 100}%`,
                      height: `${(1 / STEPS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE: vertikale Step-Card-Sequenz (jede Step hat eigene Photo) */}
          <div className="md:hidden">
            <ol className="space-y-14">
              {STEPS.map((step) => (
                <li key={step.key}>
                  <MobileStepCard step={step} t={t} />
                </li>
              ))}
            </ol>
          </div>

          {/* Closer — Trust führt in Aktion. Hairline + restrained phone-link */}
          <MethodeCloser t={t} />
        </div>
      </div>
    </section>
  );
}

/**
 * MethodeCloser — Hairline + Mono-Label + restrained tel:-CTA.
 * Phone-link only renders when the translation actually resolves to a phone
 * number (avoids accidental `tel:closerPhone` URLs if a translation key is
 * missing).
 */
function MethodeCloser({ t }: { t: ReturnType<typeof useTranslations<'methode'>> }) {
  const phone = t('closerPhone');
  const phoneHref = phone && phone.startsWith('+')
    ? `tel:${phone.replace(/\s/g, '')}`
    : undefined;

  const inner = (
    <>
      <span>{t('closerCta')}</span>
      {phone && (
        <span
          aria-hidden
          className="font-mono-spec text-[12px] tracking-[0.2em] text-ink-muted group-hover:text-gold-deep transition-colors duration-300"
        >
          {phone}
        </span>
      )}
    </>
  );

  const sharedClass =
    'group inline-flex items-baseline gap-3 font-sans text-ink hover:text-gold-deep transition-colors duration-300';
  const sharedStyle = {
    fontWeight: 700,
    fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)',
    letterSpacing: '-0.02em',
  } as const;

  return (
    <div className="mt-24 md:mt-32 pt-8 md:pt-10 border-t border-ink/15">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
        <p
          className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted"
          style={{ fontWeight: 500 }}
        >
          {t('closerLabel')}
        </p>
        {phoneHref ? (
          <a href={phoneHref} className={sharedClass} style={sharedStyle}>
            {inner}
          </a>
        ) : (
          <span className={sharedClass} style={sharedStyle}>{inner}</span>
        )}
      </div>
    </div>
  );
}

/**
 * StackCard — Photo-Stack-Tier. Drei Cards übereinander, jede in
 * ihrem Slot. Active vorne, zwei weitere peeken nach hinten-rechts und
 * hinten-links (asymmetrisch — wie zufällig gelegte Photographien).
 *
 * Wichtig: KEIN rotateY. Cards bleiben axis-aligned. Tiefe entsteht
 * ausschließlich aus translate + scale + opacity + shadow-tier. Rotation
 * würde die Cards in einen 3D-Carousel-Look zwingen (Apple-TV-Gallery-Vibe),
 * den wir explizit nicht wollen.
 *
 * Photo bleibt unverbaut. Lot-Mark als kleiner Corner sitzt innerhalb der
 * Card — bei back-cards peekt er natürlich mit hinter dem Active.
 */
function StackCard({
  step,
  slot,
  zIndex,
  t,
  priority,
}: {
  step: MethodeStep;
  slot: number;
  zIndex: number;
  t: ReturnType<typeof useTranslations<'methode'>>;
  priority: boolean;
}) {
  // Slot-positions: active center-front, +1 peeks down-right, +2 peeks
  // down-left (further). Asymmetrie macht es organisch statt mathematisch.
  //
  // ALLE Cards solid (opacity 1) — Tiefe kommt aus scale + translate +
  // shadow-tier. Transparenz auf back-cards würde wie "kaputtes Bild"
  // wirken, nicht wie ein Photo-Stack. Premium-Stacks (Hodinkee, Sotheby's)
  // arbeiten mit echten Schatten und Größenstaffelung, nicht mit Geistern.
  let transform: string;
  let shadow: string;

  if (slot === 0) {
    transform = 'translate3d(0, 0, 0) scale(1)';
    shadow = '0 32px 64px -16px rgba(21, 17, 13, 0.32), 0 8px 16px -4px rgba(21, 17, 13, 0.14)';
  } else if (slot === 1) {
    transform = 'translate3d(7%, 4%, 0) scale(0.93)';
    shadow = '0 20px 40px -12px rgba(21, 17, 13, 0.26)';
  } else {
    transform = 'translate3d(-7%, 8%, 0) scale(0.86)';
    shadow = '0 14px 28px -8px rgba(21, 17, 13, 0.22)';
  }

  return (
    <div
      aria-hidden={slot !== 0}
      className="absolute inset-0 pointer-events-none"
      style={{
        transform,
        zIndex,
        transition: 'transform 800ms cubic-bezier(0.65, 0, 0.35, 1)',
      }}
    >
      <div
        className="relative w-full h-full rounded-lg overflow-hidden"
        style={{ boxShadow: shadow, transition: 'box-shadow 600ms cubic-bezier(0.65, 0, 0.35, 1)' }}
      >
        <Image
          src={step.image}
          alt={step.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 60vw, 520px"
          priority={priority}
        />
        {/* Lot-style corner mark — within each card so back-cards peek
            with their own number visible. Kein Heavy-Title-Overlay. */}
        <div className="absolute top-5 left-5 pointer-events-none">
          <span
            className="inline-block px-2.5 py-1 font-mono-spec text-[9px] uppercase tracking-[0.32em] tabular-nums text-on-shadow bg-shadow/55 backdrop-blur-[2px] rounded-sm"
            style={{ fontWeight: 500 }}
          >
            {t(`step${step.key}Number` as 'step1Number')}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * MobileStepCard — auf mobile bekommt jede Step ihre eigene volle
 * Photo-Card direkt unter dem Step-Title. Saubere vertikale
 * Editorial-Sequenz, kein scroll-trick, kein orbit.
 */
function MobileStepCard({
  step,
  t,
}: {
  step: MethodeStep;
  t: ReturnType<typeof useTranslations<'methode'>>;
}) {
  return (
    <div>
      {/* Step Header */}
      <div className="flex items-baseline gap-4 mb-3">
        <span
          className="font-mono-spec tabular-nums text-[11px] uppercase tracking-[0.28em] text-ink"
          style={{ fontWeight: 500 }}
        >
          {t(`step${step.key}Number` as 'step1Number')}
        </span>
        <span aria-hidden className="block h-px w-12 bg-gold-deep" />
        <span
          className="font-sans text-ink uppercase tracking-[-0.015em] leading-none"
          style={{ fontWeight: 700, fontSize: '1.375rem' }}
        >
          {t(`step${step.key}Title` as 'step1Title')}
        </span>
      </div>

      {/* Body */}
      <p
        className="ml-16 mb-5 font-sans text-ink-soft leading-[1.55] max-w-[48ch]"
        style={{ fontSize: '0.95rem' }}
      >
        {t(`step${step.key}Body` as 'step1Body')}
      </p>

      {/* Photo Card — unverbaut. Title steht schon im Header darüber,
          kein Heavy-Overlay, nur ein dezenter Lot-style corner-mark. */}
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
        <Image
          src={step.image}
          alt={step.imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute top-4 left-4 pointer-events-none">
          <span
            className="inline-block px-2.5 py-1 font-mono-spec text-[9px] uppercase tracking-[0.32em] tabular-nums text-on-shadow bg-shadow/55 backdrop-blur-[2px] rounded-sm"
            style={{ fontWeight: 500 }}
          >
            {t(`step${step.key}Number` as 'step1Number')}
          </span>
        </div>
      </div>
    </div>
  );
}
