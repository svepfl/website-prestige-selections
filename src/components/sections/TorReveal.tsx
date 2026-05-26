'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { play } from '@/lib/sound';

/**
 * AKT I — Tor-Reveal Hero (Canvas Image-Sequence, Editorial Frame)
 *
 * Apple-style pre-rendered JPEG frame sequence painted to canvas, scroll-driven.
 * Editorial frame: edition mark top-left, headline bottom-left, enter prompt
 * bottom-right. Anti-center composition per design-taste-frontend skill.
 *
 * Frames: /public/assets/videos/frames/frame-001.jpg .. frame-060.jpg (3840×2160)
 */

const FRAME_COUNT = 60;
const FRAME_BASE = '/assets/videos/frames/frame-';
const FRAME_EXT = '.jpg';

function framePath(i: number) {
  return `${FRAME_BASE}${String(i + 1).padStart(3, '0')}${FRAME_EXT}`;
}

export default function TorReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) setSkipAnimation(true);
  }, []);

  // GSAP opening sequence — runs once on mount, sets up choreographed reveal
  // before the scroll-driven scrub takes over.
  //
  // Initial state (opacity:0 + transform) is set via inline style in
  // EditorialFrame's JSX so the server-rendered HTML already paints hidden.
  // Without that, React commits with default opacity:1 first, then GSAP
  // sets opacity:0, then animates — a one-frame FOUC the user perceives
  // as "headline loads 2x". Inline-style init eliminates the flash.
  //
  // Cleanup intentionally does NOT clearProps — that would expose the
  // default opacity:1 between React Strict-Mode mount/remount cycles.
  useEffect(() => {
    if (skipAnimation) return;
    const edition = editionRef.current;
    const headline = headlineRef.current;
    const enter = enterRef.current;
    if (!edition || !headline || !enter) return;

    const tl = gsap.timeline({
      delay: 0.4, // brief settle after first paint
      defaults: { ease: 'expo.out' },
      onStart: () => {
        // Soft cinematic cue at opening — silently fails if sound files absent
        try { play('transition'); } catch { /* noop */ }
      },
    });

    tl
      .to(edition, { opacity: 1, y: 0, duration: 0.9 })
      .to(headline, { opacity: 1, y: 0, scale: 1, duration: 1.4 }, '-=0.5')
      .to(enter, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, [skipAnimation]);

  useEffect(() => {
    if (skipAnimation) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const edition = editionRef.current;
    const headline = headlineRef.current;
    const enter = enterRef.current;
    if (!section || !canvas || !edition || !headline || !enter) return;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    };
    setCanvasSize();

    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let cancelled = false;
    let lastDrawnIndex = -1;

    const drawFrame = (index: number) => {
      const img = frames[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      if (canvas.width === 0 || canvas.height === 0) setCanvasSize();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // object-fit: cover
      const cAspect = canvas.width / canvas.height;
      const iAspect = img.naturalWidth / img.naturalHeight;
      let dw: number, dh: number, dx: number, dy: number;
      if (iAspect > cAspect) {
        dh = canvas.height;
        dw = img.naturalWidth * (canvas.height / img.naturalHeight);
        dx = (canvas.width - dw) / 2;
        dy = 0;
      } else {
        dw = canvas.width;
        dh = img.naturalHeight * (canvas.width / img.naturalWidth);
        dx = 0;
        dy = (canvas.height - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
      lastDrawnIndex = index;
    };

    // Load frame 0 first. onload BEFORE src to catch cached images.
    const onFirstReady = (img: HTMLImageElement) => {
      if (cancelled) return;
      frames[0] = img;
      setCanvasSize();
      drawFrame(0);
      setFirstFrameReady(true);
    };
    const first = new window.Image();
    first.fetchPriority = 'high';
    first.decoding = 'sync';
    first.onload = () => onFirstReady(first);
    first.src = framePath(0);
    if (first.complete && first.naturalWidth > 0) onFirstReady(first);

    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.decoding = 'async';
      const store = () => {
        if (cancelled) return;
        frames[i] = img;
      };
      img.onload = store;
      img.src = framePath(i);
      if (img.complete && img.naturalWidth > 0) store();
    }

    // ────────────────────────────────────────────────────────────────
    // SCROLL-SCRUBBED VIDEO + TEXT FADES
    // ────────────────────────────────────────────────────────────────
    // Video-Frames sind direkt an Scroll-Position gekoppelt: Tor öffnet
    // sich proportional zum Scrollen. Section ist kurz (h-[130vh]) — sobald
    // Tor vollständig offen / Cars sichtbar (= Frame 60 erreicht), endet
    // auch die Section. Kein "wait period" nach Video-Ende.
    let ticking = false;
    let inView = true;
    let previousProgress = 0;

    const update = () => {
      ticking = false;
      if (!inView) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));

      // Sound-cues at narrative beats
      if (previousProgress < 0.15 && progress >= 0.15) {
        try { play('hover'); } catch { /* noop */ }
      }
      if (previousProgress < 0.85 && progress >= 0.85) {
        try { play('click'); } catch { /* noop */ }
      }
      previousProgress = progress;

      // Frames 0-60 mapped to 0-100% of scroll → Video done exactly when
      // section ends. Cars fully visible = next section appears.
      const targetIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(progress * FRAME_COUNT)),
      );

      if (targetIndex !== lastDrawnIndex && frames[targetIndex]) {
        drawFrame(targetIndex);
      } else if (targetIndex !== lastDrawnIndex && !frames[targetIndex]) {
        for (let i = targetIndex; i >= 0; i--) {
          if (frames[i]) {
            if (i !== lastDrawnIndex) drawFrame(i);
            break;
          }
        }
      }

      // Edition mark: visible 0-15%, fades out by 35%
      const editionFade = Math.max(0, (progress - 0.15) / 0.20);
      const editionOpacity = Math.max(0, 1 - editionFade);
      edition.style.opacity = String(editionOpacity);
      edition.style.transform = `translateY(${editionFade * -16}px)`;

      // Headline: visible 0-35%, fades + lifts 35-60%
      const headlineFade = Math.max(0, (progress - 0.35) / 0.25);
      const headlineOpacity = Math.max(0, 1 - headlineFade);
      headline.style.opacity = String(headlineOpacity);
      headline.style.transform = `translateY(${headlineFade * -48}px)`;

      // Enter prompt: visible 0-10%, gone by 30%
      const enterFade = Math.max(0, (progress - 0.10) / 0.20);
      const enterOpacity = Math.max(0, 1 - enterFade);
      enter.style.opacity = String(enterOpacity);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const onResize = () => {
      setCanvasSize();
      if (lastDrawnIndex >= 0) drawFrame(lastDrawnIndex);
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        if (inView) update();
      },
      { rootMargin: '100px' },
    );
    io.observe(section);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    update();

    return () => {
      cancelled = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      io.disconnect();
    };
  }, [skipAnimation]);

  // — Reduced-motion fallback: static end-frame still + identical editorial frame —
  if (skipAnimation) {
    return (
      <section
        className="relative min-h-[100dvh] overflow-hidden bg-shadow grain"
        aria-label="Eintritt — das Showroom-Tor"
      >
        <Image
          src="/assets/videos/tor-reveal-end.jpg"
          alt="Prestige Selections Showroom Freiburg — Sportwagen und Klassiker in der Schusterstraße"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-shadow/65 via-shadow/0 to-shadow/55 pointer-events-none"
          aria-hidden
        />
        <EditorialFrame animated={false} />
      </section>
    );
  }

  return (
    // Section-Höhe: h-[130vh] = 30vh scrollable nach Sticky-Start.
    //
    // Scroll-Scrubbed Video: Frames 0-60 mapped to 0-100% of scroll.
    // → Bei 30vh Scroll ist Video vollständig durchgelaufen (Tor offen,
    //   Cars sichtbar) und Section endet gleichzeitig.
    // → Kein "wait period" nach Video-Ende — sobald Cars in Gänze sichtbar,
    //   appears next section.
    //
    // 30vh / 60 frames = 0.5vh per Frame = ~5px per Frame (smooth-scrub-pace).
    //
    // Fade-Timings:
    //   - Edition gone at  ~10.5vh  (15-35% fade window)
    //   - Headline gone at ~18vh    (35-60% fade window)
    //   - Video done at    30vh     (= section end)
    <section
      ref={sectionRef}
      className="relative h-[130vh] bg-shadow"
      aria-label="Eintritt — das Showroom-Tor öffnet sich"
    >
      <div className="sticky top-0 min-h-[100dvh] h-[100dvh] w-full overflow-hidden bg-shadow">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          aria-hidden="true"
        />

        {/* Poster fallback while canvas hasn't painted */}
        {!firstFrameReady && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <Image
              src={framePath(0)}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        {/* Editorial veil — soft top + bottom darken; middle stays clear so the
            revealed cars come through clean once the door rises */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-shadow/55 via-shadow/0 to-shadow/45"
          aria-hidden
        />

        {/* Grain */}
        <div className="absolute inset-0 grain pointer-events-none" aria-hidden />

        <EditorialFrame
          animated
          editionRef={editionRef}
          headlineRef={headlineRef}
          enterRef={enterRef}
        />
      </div>
      <style>{`.tor-enter-cta:hover span:first-child { color: var(--color-gold); transition: color 300ms cubic-bezier(0.23, 1, 0.32, 1); }`}</style>
    </section>
  );
}

/**
 * Editorial Frame — anti-center composition:
 *   ▣ top-left:    edition mark "I — Tor" (gold mono)
 *   ▣ bottom-left: headline (serif light, 3 lines, italic flourish on tagline)
 *                  + season meta strip
 *   ▣ bottom-right: enter prompt with vertical pulse line
 *
 * Refs are optional — when omitted (reduced-motion fallback), elements render
 * static. When provided, the parent effect drives opacity/transform on scroll.
 */
function EditorialFrame({
  animated,
  editionRef,
  headlineRef,
  enterRef,
}: {
  animated: boolean;
  editionRef?: React.RefObject<HTMLDivElement | null>;
  headlineRef?: React.RefObject<HTMLDivElement | null>;
  enterRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const t = useTranslations('torReveal');

  // Animated path: render with opacity:0 + transform inline so SSR/first
  // paint shows the elements hidden. The parent effect then animates from
  // there. Without inline init, React commits with default opacity:1 and
  // the user sees a one-frame flash (the "headline loads 2x" bug).
  const editionInit = animated
    ? { opacity: 0, transform: 'translateY(16px)' }
    : undefined;
  const headlineInit = animated
    ? { opacity: 0, transform: 'translateY(32px) scale(0.985)' }
    : undefined;
  const enterInit = animated
    ? { opacity: 0, transform: 'translateY(12px)' }
    : undefined;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/*
        Door-rise mechanic: the door opens bottom-to-top, so the headline
        sits in the UPPER HALF (anchored ~24vh) — that area stays covered
        by the door longest. Block is horizontally centered as a single
        magazine-cover composition: edition mark · headline · fact strip.
      */}

      {/* SR-only paragraph — invisible to UI, fully readable by screen readers
          and AI crawlers (GEO/AEO). Carries named-entity density that the
          editorial headline intentionally omits. */}
      <p className="sr-only">{t('seoSummary')}</p>

      {/* Centered cover block — pulled high so the full composition (edition
          mark + 3-line headline + fact strip) fits above the door's rising
          edge throughout the 22-38% headline fade window */}
      <div className="absolute inset-x-0 top-[14vh] md:top-[15vh] flex justify-center px-6">
        <div className="flex flex-col items-center max-w-[min(92vw,72rem)] text-center">
          {/* Edition mark — initial hidden state set inline (see comment above) */}
          <div
            ref={editionRef}
            className="will-change-[transform,opacity]"
            style={editionInit}
          >
            <div className="flex items-center justify-center gap-3 font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold">
              <span aria-hidden className="block h-px w-8 bg-gold/70" />
              <span>{t('edition')}</span>
              <span aria-hidden className="block h-px w-8 bg-gold/70" />
            </div>
          </div>

          {/* Headline — initial hidden state set inline (see comment above) */}
          <div
            ref={headlineRef}
            className="mt-6 md:mt-8 will-change-[transform,opacity]"
            style={headlineInit}
          >
            <h1
              className="font-display text-on-shadow leading-[1.02] tracking-[-0.025em]"
              style={{ fontWeight: 300 }}
            >
              <span className="block text-[clamp(2.75rem,7vw,6.5rem)]">{t('line1')}</span>
              <span className="block text-[clamp(2.75rem,7vw,6.5rem)]">{t('line2')}</span>
              <span
                className="block text-[clamp(2.75rem,7vw,6.5rem)] text-on-shadow/95"
                style={{ fontStyle: 'italic', fontWeight: 300 }}
              >
                {t('line3')}
              </span>
            </h1>

            {/* Fact strip — editorial subtitle AND GEO/AEO signal */}
            <p className="mt-8 md:mt-10 font-mono-spec text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-on-shadow-muted">
              {t('factStrip')}
            </p>
          </div>
        </div>
      </div>

      {/* Enter prompt — clickable scroll-anchor (Fix #4 — Conversion-First).
          Pointer-events: auto (overrides parent pointer-events-none).
          Click → smooth-scroll past the TorReveal section into the next one. */}
      <button
        ref={enterRef}
        type="button"
        onClick={() => {
          if (typeof window === 'undefined') return;
          window.scrollTo({
            top: window.innerHeight * 1.05,
            behavior: 'smooth',
          });
        }}
        className="tor-enter-cta absolute inset-x-0 bottom-10 md:bottom-12 flex flex-col items-center gap-4 will-change-[opacity] pointer-events-auto cursor-pointer focus-ring rounded-sm"
        style={enterInit}
        aria-label={t('enterPrompt')}
      >
        <span className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-on-shadow-muted">
          {t('enterPrompt')}
        </span>
        <span
          aria-hidden
          className="block w-px h-12 bg-gradient-to-b from-on-shadow-muted/40 to-gold/70 animate-tor-pulse"
        />
      </button>
    </div>
  );
}
