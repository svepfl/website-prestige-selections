'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { manufacturers } from '@/data/vehicles';

type MegaId = 'kollektion' | null;

const LOCALES = ['de', 'en', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

const PHONE_DISPLAY = '+49 176 4145 0810';
const PHONE_HREF = 'tel:+491764145810';

const KOLLEKTION_IMAGE = '/assets/methode/methode-01-kollektion-placeholder.webp';

const BRAND_SLUG: Record<string, string> = {
  FERRARI: 'ferrari',
  PORSCHE: 'porsche',
  LAMBORGHINI: 'lamborghini',
  'ASTON MARTIN': 'aston-martin',
  BENTLEY: 'bentley',
  MASERATI: 'maserati',
  'ROLLS ROYCE': 'rolls-royce',
};

type ShowroomStatus = {
  isOpen: boolean;
  label: string;
  ready: boolean;
};

/**
 * Header — Persistent Top-Bar + Hover-Mega-Menu (Porsche × Bentley × Patek tier).
 *
 * 2026-Pattern für luxury automotive: alle Hauptnav-Items persistent inline,
 * Mega-Menus auf Hover für Items mit Sub-Content (Kollektion = Brand-Filter,
 * Atelier = Services). Kein Full-Screen-Overlay, kein Hamburger-Index.
 *
 * Conversion-First:
 *  - ALLE 5 Pages 1-Click sichtbar (Kollektion, Atelier, Haus, Verkaufen, Kontakt)
 *  - Phone permanent in Chrome mit Live-Status-Pulse
 *  - Locale-Switcher inline (hreflang-reinforcement)
 *
 * Mega-Menu:
 *  - Kollektion → Brand-Filter quick-links + Featured Image-Card
 *  - Atelier → Service-Liste + Atelier-Photo
 *  - Pure CSS group-hover, kein React-State (snappy + a11y-keyboard via :focus-within)
 *
 * Mobile (< lg):
 *  - Wordmark + Phone-Icon + Burger
 *  - Burger → simple Side-Drawer mit 5 Nav-Items (kein Mega-Menu auf Mobile)
 */

function computeShowroomStatus(locale: Locale): ShowroomStatus {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  const dict = {
    de: {
      openToday: (range: string) => `Geöffnet · ${range}`,
      closedMonFri: 'Mo – Fr · 9 – 18',
      closedSat: 'Sa · 10 – 16',
      closedSun: 'Geschlossen',
    },
    en: {
      openToday: (range: string) => `Open · ${range}`,
      closedMonFri: 'Mon – Fri · 9 – 18',
      closedSat: 'Sat · 10 – 16',
      closedSun: 'Closed',
    },
    fr: {
      openToday: (range: string) => `Ouvert · ${range}`,
      closedMonFri: 'Lun – Ven · 9 – 18',
      closedSat: 'Sam · 10 – 16',
      closedSun: 'Fermé',
    },
  }[locale];

  if (day === 0) return { isOpen: false, label: dict.closedSun, ready: true };
  if (day === 6) {
    const isOpen = minutes >= 10 * 60 && minutes < 16 * 60;
    return { isOpen, label: isOpen ? dict.openToday('10 – 16') : dict.closedSat, ready: true };
  }
  const isOpen = minutes >= 9 * 60 && minutes < 18 * 60;
  return { isOpen, label: isOpen ? dict.openToday('9 – 18') : dict.closedMonFri, ready: true };
}

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  // overDark logic per page-type:
  //   - Homepage (/) → dynamic: dark in first viewport (TorReveal), light below
  //   - hasDarkHero pages → dynamic: dark in first viewport (full-bleed hero at top), light below
  //   - Dark pages (/haus) → always dark (Hero + Heritage dominate)
  //   - All listed dark-hero pages must have Hero as FIRST element (no light strip above).
  //     Sub-pages with breadcrumbs overlay them INSIDE the dark hero via `.hero-breadcrumbs` utility.
  const isHomepage = pathname === '/';
  const isDarkPage = pathname === '/haus' || pathname.startsWith('/haus/');
  const DARK_HERO_PAGES = ['/werkstatt', '/verkaufen', '/vermittelt', '/kontakt'];
  const hasDarkHero = DARK_HERO_PAGES.includes(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(isHomepage || isDarkPage || hasDarkHero);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [status, setStatus] = useState<ShowroomStatus>({ isOpen: false, label: '', ready: false });

  // ────────────────────────────────────────────────────────────────
  // MEGA-MENU STATE — single source of truth.
  // Pure CSS group-hover had multi-bugs (overlap on quick-switch, no close
  // on Esc, no click-outside, breaks across cross-gap, no keyboard nav).
  // State-based solution: only ONE mega can be active at a time.
  // ────────────────────────────────────────────────────────────────
  const [activeMega, setActiveMega] = useState<MegaId>(null);
  const closeTimerRef = useRef<number | null>(null);
  const megaWrapperRef = useRef<HTMLDivElement>(null);

  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMega = useCallback(
    (id: Exclude<MegaId, null>) => {
      cancelCloseTimer();
      setActiveMega(id);
    },
    [cancelCloseTimer],
  );

  const closeMegaImmediate = useCallback(() => {
    cancelCloseTimer();
    setActiveMega(null);
  }, [cancelCloseTimer]);

  const closeMegaSoon = useCallback(() => {
    cancelCloseTimer();
    // 120ms close-delay tolerates mouse-traversal across the gap between
    // trigger and menu panel. If user re-enters either before 120ms, cancel.
    closeTimerRef.current = window.setTimeout(() => {
      setActiveMega(null);
      closeTimerRef.current = null;
    }, 120);
  }, [cancelCloseTimer]);

  // Esc-Key closes mega-menu (a11y + UX expectation)
  useEffect(() => {
    if (activeMega === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMegaImmediate();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeMega, closeMegaImmediate]);

  // Route-change closes mega-menu. useEffect (nicht during-render) damit
  // closeMegaImmediate (das Ref accesses) nicht im Render-Phase aufgerufen wird.
  useEffect(() => {
    closeMegaImmediate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Click-outside closes mega-menu (anywhere outside wrapper)
  useEffect(() => {
    if (activeMega === null) return;
    const onDown = (e: MouseEvent) => {
      if (
        megaWrapperRef.current &&
        !megaWrapperRef.current.contains(e.target as Node)
      ) {
        closeMegaImmediate();
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [activeMega, closeMegaImmediate]);

  // Scroll closes mega-menu (avoids menu following scroll awkwardly)
  useEffect(() => {
    if (activeMega === null) return;
    const onScroll = () => closeMegaImmediate();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeMega, closeMegaImmediate]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => cancelCloseTimer();
  }, [cancelCloseTimer]);

  useEffect(() => {
    const tick = () => setStatus(computeShowroomStatus(locale));
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 60_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [locale]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Dark page → always dark · Homepage/DarkHero → scroll-based · Light pages → light
      if (isDarkPage) {
        setOverDark(true);
      } else if (isHomepage || hasDarkHero) {
        setOverDark(y < window.innerHeight * 0.82);
      } else {
        setOverDark(false);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomepage, isDarkPage, hasDarkHero]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const switchLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      router.replace(pathname, { locale: next });
      setMobileOpen(false);
    },
    [locale, pathname, router],
  );

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const chromeTone = overDark
    ? {
        text: 'text-on-shadow',
        textInactive: 'text-on-shadow/70 hover:text-on-shadow',
        rule: 'bg-on-shadow',
        divider: 'bg-on-shadow/15',
      }
    : {
        text: 'text-ink',
        textInactive: 'text-ink/65 hover:text-ink',
        rule: 'bg-ink',
        divider: 'bg-ink/15',
      };

  const surface = scrolled
    ? overDark
      ? 'bg-shadow/85 backdrop-blur-md border-on-shadow/[0.06]'
      : 'bg-canvas/92 backdrop-blur-md border-ink/[0.06]'
    : 'bg-transparent backdrop-blur-none border-transparent';

  return (
    <>
      {/* ════════════════ CHROME ════════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 border-b px-6 md:px-10 lg:px-14 transition-[background-color,backdrop-filter,border-color] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${surface}`}
      >
        <div className="mx-auto max-w-[1500px] h-20 lg:h-24">
          <div className="h-full flex items-center justify-between gap-4 lg:gap-8">
            {/* Wordmark */}
            <Link
              href="/"
              className={`leading-none focus-ring rounded-sm active:translate-y-px ${chromeTone.text} shrink-0`}
              aria-label="Prestige Selections — Startseite"
            >
              <span
                className="font-display italic tracking-[-0.018em] block"
                style={{ fontWeight: 300, fontSize: '1.6rem' }}
              >
                Prestige Selections
              </span>
            </Link>

            {/* Center nav — desktop only (lg+). Wrapper-Ref für Click-outside-Detection. */}
            <nav
              ref={megaWrapperRef}
              className="hidden lg:flex items-center gap-7 xl:gap-10"
              aria-label="Hauptnavigation"
              onMouseLeave={closeMegaSoon}
            >
              {/* KOLLEKTION — with mega-menu */}
              <NavItemWithMega
                href="/fahrzeuge"
                label={t('vehicles')}
                megaId="kollektion"
                active={isActive('/fahrzeuge')}
                isOpen={activeMega === 'kollektion'}
                tone={chromeTone}
                overDark={overDark}
                onOpen={openMega}
                onCloseSoon={closeMegaSoon}
                onCancelClose={cancelCloseTimer}
              >
                <MegaMenuKollektion
                  manufacturers={manufacturers}
                  image={KOLLEKTION_IMAGE}
                  countLabel={t('vehicles')}
                  overDark={overDark}
                  onSelect={closeMegaImmediate}
                />
              </NavItemWithMega>

              {/* ATELIER — direct link, no mega (single page, keine sub-items) */}
              <NavItem
                href="/werkstatt"
                label={t('workshop')}
                active={isActive('/werkstatt')}
                tone={chromeTone}
                onMouseEnter={closeMegaSoon}
              />

              {/* DAS HAUS — direct link */}
              <NavItem
                href="/haus"
                label={t('haus')}
                active={isActive('/haus')}
                tone={chromeTone}
                onMouseEnter={closeMegaSoon}
              />

              {/* VERKAUFEN */}
              <NavItem
                href="/verkaufen"
                label={t('verkaufen')}
                active={isActive('/verkaufen')}
                tone={chromeTone}
                onMouseEnter={closeMegaSoon}
              />

              {/* KONTAKT */}
              <NavItem
                href="/kontakt"
                label={t('contact')}
                active={isActive('/kontakt')}
                tone={chromeTone}
                onMouseEnter={closeMegaSoon}
              />
            </nav>

            {/* Right rail — Phone + Locale (desktop) · Phone-Icon + Burger (mobile) */}
            <div className="flex items-center gap-4 lg:gap-6 shrink-0">
              {/* Phone — desktop: full number + status. Tablet/Mobile: icon. */}
              <a
                href={PHONE_HREF}
                className={`hidden md:inline-flex items-center gap-2.5 font-mono-spec text-[12px] tabular-nums tracking-[0.02em] ${chromeTone.text} hover:text-gold transition-colors duration-300 focus-ring rounded-sm active:translate-y-px`}
                aria-label={`${t('callUs')} — ${PHONE_DISPLAY}`}
                data-analytics="phone_click_header"
              >
                {status.ready && (
                  <span
                    aria-hidden
                    className={`relative block h-1.5 w-1.5 rounded-full ${
                      status.isOpen ? 'bg-gold' : 'bg-on-shadow-muted/40'
                    }`}
                  >
                    {status.isOpen && (
                      <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-60" />
                    )}
                  </span>
                )}
                <span>{PHONE_DISPLAY}</span>
              </a>

              {/* Mobile: Phone icon only */}
              <a
                href={PHONE_HREF}
                className={`md:hidden inline-flex items-center justify-center h-11 w-11 -mr-1 ${chromeTone.text} hover:text-gold transition-colors duration-300 focus-ring rounded-full active:translate-y-px relative`}
                aria-label={`${t('callUs')} — ${PHONE_DISPLAY}`}
                data-analytics="phone_click_header_mobile"
              >
                {status.ready && status.isOpen && (
                  <span
                    aria-hidden
                    className="absolute top-2 right-2 block h-1.5 w-1.5 rounded-full bg-gold"
                  >
                    <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-60" />
                  </span>
                )}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </a>

              {/* Divider — desktop */}
              <span aria-hidden className={`hidden lg:block h-4 w-px ${chromeTone.divider}`} />

              {/* Locale switcher — desktop only inline */}
              <div className="hidden lg:flex items-center gap-2.5 font-mono-spec text-[11px] uppercase tracking-[0.22em]" style={{ fontWeight: 500 }}>
                {LOCALES.map((l, i) => (
                  <span key={l} className="flex items-center gap-2.5">
                    {i > 0 && <span aria-hidden className={`${chromeTone.text} opacity-25`}>·</span>}
                    <button
                      type="button"
                      onClick={() => switchLocale(l)}
                      aria-current={l === locale ? 'true' : undefined}
                      lang={l}
                      className={`transition-colors duration-300 focus-ring rounded-sm active:translate-y-px ${
                        l === locale ? chromeTone.text : `${chromeTone.text} opacity-40 hover:opacity-100`
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  </span>
                ))}
              </div>

              {/* Mobile menu trigger */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                className={`lg:hidden inline-flex items-center justify-center h-11 w-11 -mr-1.5 ${chromeTone.text} focus-ring rounded-sm active:translate-y-px`}
                aria-label={t('menu')}
              >
                <span aria-hidden className="flex flex-col gap-[5px]">
                  <span className={`block h-px w-6 ${chromeTone.rule}`} />
                  <span className={`block h-px w-6 ${chromeTone.rule}`} />
                  <span className={`block h-px w-6 ${chromeTone.rule}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════ MOBILE DRAWER ════════════════ */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        className={`lg:hidden fixed inset-0 z-[60] bg-shadow text-on-shadow transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 30% 50%, rgba(196, 154, 12, 0.07) 0%, transparent 65%)',
          }}
        />

        <div className="relative mx-auto max-w-[1500px] px-6 md:px-10 h-20 flex items-center justify-between gap-6">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="leading-none focus-ring rounded-sm active:translate-y-px text-on-shadow"
            aria-label="Prestige Selections — Startseite"
          >
            <span
              className="font-display italic tracking-[-0.018em] block"
              style={{ fontWeight: 300, fontSize: '1.4rem' }}
            >
              Prestige Selections
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center gap-3 font-mono-spec text-[11px] uppercase tracking-[0.28em] text-on-shadow focus-ring rounded-sm active:translate-y-px"
            style={{ fontWeight: 500 }}
            aria-label={t('close')}
          >
            <span aria-hidden className="relative flex h-4 w-7 items-center">
              <span className="absolute inset-x-0 top-1/2 h-px bg-on-shadow rotate-45 origin-center" />
              <span className="absolute inset-x-0 top-1/2 h-px bg-on-shadow -rotate-45 origin-center" />
            </span>
            <span>{t('close')}</span>
          </button>
        </div>

        <div className="relative h-[calc(100vh-5rem)] flex flex-col px-6 md:px-10 py-6 md:py-10">
          <nav className="flex-1 flex items-center" aria-label="Mobile Navigation">
            <ul className="w-full flex flex-col gap-4 md:gap-6">
              {[
                { href: '/fahrzeuge' as const, label: t('vehicles'), num: 'I' },
                { href: '/werkstatt' as const, label: t('workshop'), num: 'II' },
                { href: '/haus' as const, label: t('haus'), num: 'III' },
                { href: '/verkaufen' as const, label: t('verkaufen'), num: 'IV' },
                { href: '/kontakt' as const, label: t('contact'), num: 'V' },
              ].map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className="group inline-flex items-baseline gap-5 focus-ring rounded-sm active:translate-y-px"
                    >
                      <span
                        className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-on-shadow-muted/50 tabular-nums w-6 shrink-0"
                        style={{ fontWeight: 500 }}
                      >
                        {link.num}.
                      </span>
                      <span
                        className={`font-display italic leading-[0.95] tracking-[-0.025em] transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                          active ? 'text-gold' : 'text-on-shadow group-hover:text-gold'
                        }`}
                        style={{
                          fontWeight: 300,
                          fontSize: 'clamp(2.25rem, 7vw, 4rem)',
                        }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile bottom: Phone + Locale */}
          <div className="pt-7 border-t border-on-shadow/15 flex flex-wrap items-center justify-between gap-y-5 gap-x-8">
            <a
              href={PHONE_HREF}
              aria-label={`${t('callUs')} — ${PHONE_DISPLAY}`}
              className="inline-flex items-center gap-3 font-mono-spec tabular-nums text-[14px] text-on-shadow hover:text-gold transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
            >
              {status.ready && status.isOpen && (
                <span aria-hidden className="relative block h-1.5 w-1.5 rounded-full bg-gold">
                  <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-60" />
                </span>
              )}
              {PHONE_DISPLAY}
            </a>
            <div className="flex items-center gap-3 font-mono-spec text-[12px] uppercase tracking-[0.24em]" style={{ fontWeight: 500 }}>
              {LOCALES.map((l, i) => (
                <span key={l} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="text-on-shadow-muted/35">·</span>}
                  <button
                    type="button"
                    onClick={() => switchLocale(l)}
                    aria-current={l === locale ? 'true' : undefined}
                    lang={l}
                    className={`transition-colors duration-300 focus-ring rounded-sm active:translate-y-px ${
                      l === locale ? 'text-on-shadow' : 'text-on-shadow-muted/50 hover:text-on-shadow'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// NAV-ITEMS
// ════════════════════════════════════════════════════════════════════

type ChromeTone = {
  text: string;
  textInactive: string;
  rule: string;
  divider: string;
};

function NavItem({
  href,
  label,
  active,
  tone,
  onMouseEnter,
}: {
  href: '/fahrzeuge' | '/werkstatt' | '/haus' | '/verkaufen' | '/kontakt';
  label: string;
  active: boolean;
  tone: ChromeTone;
  onMouseEnter?: () => void;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      onMouseEnter={onMouseEnter}
      className={`group relative inline-flex items-center font-mono-spec text-[11px] uppercase tracking-[0.22em] py-2 transition-colors duration-300 focus-ring rounded-sm active:translate-y-px ${
        active ? tone.text : tone.textInactive
      }`}
      style={{ fontWeight: 500 }}
    >
      <span className="relative inline-block">
        {label}
        <span
          aria-hidden
          className={`absolute -bottom-1 left-0 right-0 h-px bg-gold origin-left transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </span>
    </Link>
  );
}

function NavItemWithMega({
  href,
  label,
  megaId,
  active,
  isOpen,
  tone,
  overDark,
  onOpen,
  onCloseSoon,
  onCancelClose,
  children,
}: {
  href: '/fahrzeuge' | '/werkstatt';
  label: string;
  megaId: Exclude<MegaId, null>;
  active: boolean;
  isOpen: boolean;
  tone: ChromeTone;
  overDark: boolean;
  onOpen: (id: Exclude<MegaId, null>) => void;
  onCloseSoon: () => void;
  onCancelClose: () => void;
  children: React.ReactNode;
}) {
  // Open on mouse-enter trigger OR focus-within (keyboard tab). Close-soon on
  // mouse-leave (parent nav handles full close via onMouseLeave on the nav
  // wrapper — so menu stays open while mouse is anywhere in the nav row).
  // Cancel pending close when mouse re-enters trigger or menu.
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpen(megaId)}
      onMouseLeave={onCloseSoon}
      onFocus={() => onOpen(megaId)}
      onBlur={(e) => {
        // close only if focus moves OUTSIDE this wrapper
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          onCloseSoon();
        }
      }}
    >
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`relative inline-flex items-center gap-1.5 font-mono-spec text-[11px] uppercase tracking-[0.22em] py-2 transition-colors duration-300 focus-ring rounded-sm active:translate-y-px ${
          active || isOpen ? tone.text : tone.textInactive
        }`}
        style={{ fontWeight: 500 }}
      >
        <span className="relative inline-block">
          {label}
          <span
            aria-hidden
            className={`absolute -bottom-1 left-0 right-0 h-px bg-gold origin-left transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              active || isOpen ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </span>
        <svg
          aria-hidden
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          className={`transition-transform duration-300 ${isOpen ? 'translate-y-0.5' : ''}`}
        >
          <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </Link>

      {/* Mega-menu container — state-controlled visibility (no group-hover).
          Eliminates overlap-on-quick-switch bug. Pure transform + visibility
          reveal (visibility ist discrete, transform smooth) so card stays
          solid-opaque während Animation. */}
      <div
        aria-hidden={!isOpen}
        onMouseEnter={onCancelClose}
        onMouseLeave={onCloseSoon}
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'visible translate-y-0' : 'invisible translate-y-2 pointer-events-none'
        }`}
      >
        <div
          className={`relative rounded-lg shadow-card-floating ${
            overDark
              ? 'bg-shadow text-on-shadow border border-on-shadow/[0.06]'
              : 'bg-canvas-raised text-ink border border-ink/[0.06]'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MEGA MENUS
// ════════════════════════════════════════════════════════════════════

function MegaMenuKollektion({
  manufacturers,
  image,
  countLabel,
  overDark,
  onSelect,
}: {
  manufacturers: string[];
  image: string;
  countLabel: string;
  overDark: boolean;
  onSelect: () => void;
}) {
  const dim = overDark ? 'text-on-shadow-muted' : 'text-ink-muted';
  const muted = overDark ? 'text-on-shadow/70 hover:text-on-shadow' : 'text-ink/65 hover:text-ink';
  const goldHover = 'hover:text-gold';

  return (
    <div className="grid grid-cols-[1fr_220px] gap-6 p-6 w-[560px]">
      {/* Left — Marken-Liste */}
      <div>
        <p
          className={`font-mono-spec text-[10px] uppercase tracking-[0.28em] ${dim} mb-3`}
          style={{ fontWeight: 500 }}
        >
          Marken
        </p>
        <ul className="flex flex-col gap-1.5">
          {manufacturers.map((m) => {
            const slug = BRAND_SLUG[m] ?? m.toLowerCase().replace(/\s+/g, '-');
            const display = m === 'ROLLS ROYCE' ? 'Rolls-Royce' : m === 'ASTON MARTIN' ? 'Aston Martin' : m.charAt(0) + m.slice(1).toLowerCase();
            return (
              <li key={m}>
                <Link
                  href={`/fahrzeuge?brand=${slug}` as '/fahrzeuge'}
                  onClick={onSelect}
                  className={`group/link inline-flex items-baseline gap-2 font-sans text-[13.5px] ${muted} ${goldHover} transition-colors duration-200 focus-ring rounded-sm active:translate-y-px`}
                >
                  <span className="relative inline-block">{display}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={`mt-5 pt-4 border-t ${overDark ? 'border-on-shadow/10' : 'border-ink/10'}`}>
          <Link
            href="/fahrzeuge"
            onClick={onSelect}
            className={`group/all inline-flex items-center gap-2 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-gold hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm active:translate-y-px`}
            style={{ fontWeight: 500 }}
          >
            <span className="relative inline-block">
              Alle {countLabel}
              <span aria-hidden className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold-deep origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/all:scale-x-100" />
            </span>
            <span aria-hidden className="transition-transform duration-300 group-hover/all:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>

      {/* Right — Featured Image */}
      <Link
        href="/fahrzeuge"
        onClick={onSelect}
        className="group/img relative block aspect-[4/5] rounded-md overflow-hidden focus-ring active:translate-y-px"
      >
        <Image
          src={image}
          alt="Aktuelle Sportwagen-Kollektion bei Prestige Selections Freiburg"
          fill
          sizes="220px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(21,17,13,0.7) 0%, rgba(21,17,13,0.15) 50%, transparent 100%)',
          }}
        />
        <span
          className="absolute left-3 bottom-3 right-3 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-on-shadow"
          style={{ fontWeight: 500 }}
        >
          Kollektion ansehen →
        </span>
      </Link>
    </div>
  );
}

