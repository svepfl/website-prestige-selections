'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import NewsletterForm from '@/components/NewsletterForm';
import { useEffect, useState, useCallback } from 'react';

const LOCALES = ['de', 'en', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

const PHONE_HREF = 'tel:+491764145810';
const WHATSAPP_HREF = 'https://wa.me/497615573168?text=Hallo%20Prestige%20Selections';
const EMAIL_HREF = 'mailto:hallo@systembuero.com';
const MAPS_HREF = 'https://maps.google.com/?q=Schusterstra%C3%9Fe+1+79098+Freiburg';

/**
 * Footer — 4-Col Letterhead + Legal Hairline (Conversion-First Editorial).
 *
 * 2 visuelle Zonen, keine Doppelung:
 *
 *  Zone 1 — Letterhead 4-Col (alles drin, gleichgewichtig):
 *    Atelier (NAP + Hours + Maps · Local-SEO + L5)
 *    Reach   (Phone + WhatsApp + Email · Conversion + L9)
 *    Index   (Sitemap · Internal-Linking + IA)
 *    Vorab   (Newsletter · Retention-Stage-Capture)
 *
 *  Zone 2 — Legal Hairline:
 *    © + Impressum/Datenschutz/Barrierefreiheit + Locale-Switcher + AI-Disclosure
 *
 *  Was bewusst NICHT mehr im Footer: Wordmark / Tagline-Block. Lebt in Header
 *  (permanent sichtbar) und in Abschluss-Section. Footer = Letterhead-Surface,
 *  nicht Brand-Reprise.
 *
 * Rules applied: 12 (Conversion), 16 (Q-Coverage L1/L5/L9/L10), 18 (Journey
 * Retention), 19 (State-Library Pulse-Dot), 20 (Form-Design Newsletter),
 * 21 (Motion), 22 (Analytics data-attributes), 23 (NAP-exact-match Schema),
 * 24 (IA Sitemap-Reflection), conversion-first override-rule.
 */

type ShowroomStatus = { isOpen: boolean; ready: boolean };

function computeShowroomStatus(): ShowroomStatus {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  if (day === 0) return { isOpen: false, ready: true };
  if (day === 6) return { isOpen: minutes >= 600 && minutes < 960, ready: true };
  return { isOpen: minutes >= 540 && minutes < 1080, ready: true };
}

export default function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('newsletter');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const year = new Date().getFullYear();
  const [status, setStatus] = useState<ShowroomStatus>({ isOpen: false, ready: false });

  useEffect(() => {
    const raf = requestAnimationFrame(() => setStatus(computeShowroomStatus()));
    const id = setInterval(() => setStatus(computeShowroomStatus()), 60_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  const switchLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      router.replace(pathname, { locale: next });
    },
    [locale, pathname, router],
  );

  const indexLinks = [
    { href: '/fahrzeuge' as const, label: t('navFahrzeuge') },
    { href: '/werkstatt' as const, label: t('navAtelier') },
    { href: '/haus' as const, label: t('navHaus') },
    { href: '/verkaufen' as const, label: t('navVerkaufen') },
    { href: '/vermittelt' as const, label: t('navVermittelt') },
    { href: '/kontakt' as const, label: t('navKontakt') },
  ];

  return (
    <footer
      role="contentinfo"
      className="relative bg-canvas-soft text-ink overflow-hidden"
    >
      {/* Subtle warm radial glow — atmospheric anchor, kein content */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 28% 65%, rgba(196, 154, 12, 0.05) 0%, transparent 65%)',
        }}
      />

      {/* ════════ ZONE 1 — 4-COL LETTERHEAD ════════ */}
      <div className="relative px-6 md:px-10 lg:px-14 pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-14">
            {/* ── COL 1 — Atelier (NAP + Hours + Maps) ── */}
            <div>
              <p
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-5"
                style={{ fontWeight: 500 }}
              >
                {t('atelierLabel')}
              </p>
              <address className="not-italic font-sans text-[14px] leading-[1.7] text-ink-soft">
                <strong className="block font-normal text-ink">Sven Pflüger</strong>
                <span className="block">{t('addressLine1')}</span>
                <span className="block">{t('addressLine2')}</span>
              </address>
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noreferrer noopener"
                className="group/maps mt-4 inline-flex items-center gap-2 font-mono-spec text-[11px] uppercase tracking-[0.24em] text-ink-soft hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
                style={{ fontWeight: 500 }}
              >
                <span className="relative inline-block">
                  {t('mapsLabel')}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gold-deep origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/maps:scale-x-100"
                  />
                </span>
                <span aria-hidden className="transition-transform duration-300 group-hover/maps:translate-x-0.5">→</span>
              </a>

              {/* Hours mit Live-Status-Pulse */}
              <div className="mt-7 pt-5 border-t border-ink/10">
                <div className="flex items-center gap-3 mb-3">
                  <p
                    className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted"
                    style={{ fontWeight: 500 }}
                  >
                    {t('hoursLabel')}
                  </p>
                  {status.ready && (
                    <span
                      aria-label={status.isOpen ? t('openLabel') : t('closedLabel')}
                      className={`relative block h-1.5 w-1.5 rounded-full ${
                        status.isOpen ? 'bg-gold-deep' : 'bg-ink-muted/40'
                      }`}
                    >
                      {status.isOpen && (
                        <span aria-hidden className="absolute inset-0 rounded-full bg-gold-deep animate-ping opacity-60" />
                      )}
                    </span>
                  )}
                </div>
                <ul className="font-sans text-[13px] tabular-nums text-ink-soft leading-[1.85]">
                  <li>{t('hoursMonFri')}</li>
                  <li>{t('hoursSat')}</li>
                  <li className="text-ink-muted">{t('hoursSun')}</li>
                </ul>
              </div>
            </div>

            {/* ── COL 2 — Reach (Phone + WhatsApp + Email) ── */}
            <div>
              <p
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-5"
                style={{ fontWeight: 500 }}
              >
                {t('reachLabel')}
              </p>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href={PHONE_HREF}
                    className="group/phone inline-flex items-baseline gap-3 font-mono-spec tabular-nums text-[14px] text-ink hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
                    data-analytics="phone_click_footer"
                  >
                    {status.ready && status.isOpen && (
                      <span
                        aria-hidden
                        className="relative block h-1.5 w-1.5 rounded-full bg-gold-deep self-center"
                      >
                        <span className="absolute inset-0 rounded-full bg-gold-deep animate-ping opacity-60" />
                      </span>
                    )}
                    <span>{t('phoneLine')}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/wa inline-flex items-center gap-2 font-sans text-[14px] text-ink-soft hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
                    data-analytics="whatsapp_click_footer"
                  >
                    <span className="relative inline-block">
                      {t('whatsappLabel')}
                      <span
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold-deep origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/wa:scale-x-100"
                      />
                    </span>
                    <span aria-hidden className="text-[11px]">→</span>
                  </a>
                </li>
                <li>
                  <a
                    href={EMAIL_HREF}
                    className="group/mail inline-flex items-baseline font-sans text-[14px] text-ink-soft hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm break-all active:translate-y-px"
                    data-analytics="email_click_footer"
                  >
                    <span className="relative inline-block">
                      {t('emailLine')}
                      <span
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold-deep origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/mail:scale-x-100"
                      />
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* ── COL 3 — Index (Sitemap) ── */}
            <nav aria-label={t('indexLabel')}>
              <p
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-5"
                style={{ fontWeight: 500 }}
              >
                {t('indexLabel')}
              </p>
              <ul className="font-sans text-[14px] text-ink-soft leading-[2]">
                {indexLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group/link inline-block hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
                    >
                      <span className="relative inline-block">
                        {link.label}
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold-deep origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/link:scale-x-100"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── COL 4 — Vorab (Newsletter) — i18n via newsletter namespace ── */}
            <div>
              <p
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-5"
                style={{ fontWeight: 500 }}
              >
                {tn('label')}
              </p>
              <p
                className="font-display italic text-ink leading-[1.2] tracking-[-0.015em] mb-3"
                style={{
                  fontWeight: 300,
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.375rem)',
                }}
              >
                {tn('promise')}
              </p>
              <p className="font-sans text-[13px] text-ink-soft leading-[1.55] mb-5 max-w-[32ch]">
                {tn('body')}
              </p>
              <NewsletterFormLight />
            </div>
          </div>
        </div>
      </div>

      {/* ════════ ZONE 2 — LEGAL HAIRLINE ════════ */}
      <div className="relative px-6 md:px-10 lg:px-14 pb-10 md:pb-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="pt-7 border-t border-ink/15">
            <div className="flex flex-col gap-5 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <p
                className="font-mono-spec text-[10.5px] uppercase tracking-[0.24em] text-ink-muted"
                style={{ fontWeight: 500 }}
              >
                © 2012 — {year} · Sven Pflüger
              </p>

              <div
                className="flex flex-wrap items-center gap-x-7 gap-y-3 font-mono-spec text-[10.5px] uppercase tracking-[0.24em] text-ink-muted"
                style={{ fontWeight: 500 }}
              >
                <Link
                  href="/impressum"
                  className="hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
                >
                  {t('impressum')}
                </Link>
                <Link
                  href="/datenschutz"
                  className="hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
                >
                  {t('datenschutz')}
                </Link>
                <Link
                  href="/barrierefreiheit"
                  className="hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
                >
                  {t('barrierefreiheit')}
                </Link>

                <span aria-hidden className="text-ink-muted/40">·</span>

                {/* Locale switcher — hreflang-reinforcement */}
                <span className="sr-only">{t('languagesLabel')}: </span>
                <div className="flex items-center gap-3">
                  {LOCALES.map((l, i) => (
                    <span key={l} className="flex items-center gap-3">
                      {i > 0 && (
                        <span aria-hidden className="text-ink-muted/40">·</span>
                      )}
                      <button
                        type="button"
                        onClick={() => switchLocale(l)}
                        aria-current={l === locale ? 'true' : undefined}
                        lang={l}
                        className={`transition-colors duration-300 focus-ring rounded-sm active:translate-y-px ${
                          l === locale ? 'text-ink' : 'text-ink-muted/60 hover:text-ink'
                        }`}
                      >
                        {l.toUpperCase()}
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI-Disclosure — EU AI Act Art 50 Pflicht */}
            <p
              className="mt-6 font-sans text-[11.5px] text-ink-muted leading-[1.6] max-w-[64ch]"
              style={{ fontWeight: 400 }}
            >
              <span aria-hidden className="text-gold-deep/80 mr-1">*</span>
              {t('aiDisclosure')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * NewsletterFormLight — wraps NewsletterForm with light-surface CSS overrides.
 * NewsletterForm uses on-shadow tokens internally (designed for dark BG).
 */
function NewsletterFormLight() {
  return (
    <div className="newsletter-light">
      <NewsletterForm />
      <style>{`
        .newsletter-light input[name="email"] { color: var(--color-ink); font-size: 14px; }
        .newsletter-light input[name="email"]::placeholder { color: rgba(139,123,106,0.55); }
        .newsletter-light .border-b.border-on-shadow\\/30 { border-color: rgba(26,22,18,0.18); }
        .newsletter-light .focus-within\\:border-gold { border-color: rgba(196, 154, 12, 0.6); }
        .newsletter-light button[type="submit"] { color: var(--color-ink); font-size: 10.5px; }
        .newsletter-light button[type="submit"]:hover { color: var(--color-gold-deep); }
        .newsletter-light p { color: var(--color-ink-muted); font-size: 10.5px; }
        .newsletter-light p.text-gold { color: var(--color-gold-deep); }
      `}</style>
    </div>
  );
}
