'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Shield } from 'lucide-react';

interface ConsentValues {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  const value = match?.[2];
  return value ? decodeURIComponent(value) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax;Secure`;
}

export default function CookieConsent() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [consent, setConsent] = useState<ConsentValues>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const acceptAllRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (getCookie('ps_consent')) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // WCAG 2.4.3 — move focus into the dialog when it appears so keyboard users
  // know it opened and can act on it without hunting.
  useEffect(() => {
    if (visible) acceptAllRef.current?.focus();
  }, [visible]);

  const saveConsent = (values: ConsentValues) => {
    setCookie('ps_consent', JSON.stringify(values), 365);
    setVisible(false);
    window.dispatchEvent(new CustomEvent('consentUpdated', { detail: values }));
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const saveCustom = () => {
    saveConsent(consent);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[60] max-w-lg"
    >
      <div className="bg-shadow-soft rounded-lg p-6 shadow-card-floating">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden />
          <div>
            <h3
              id="cookie-consent-title"
              className="text-sm font-medium text-on-shadow mb-1"
            >
              {t('title')}
            </h3>
            <p className="text-xs text-on-shadow-muted leading-relaxed">
              {t('text')}{' '}
              <Link
                href="/datenschutz"
                className="text-gold/70 hover:text-gold underline transition-colors duration-300"
              >
                {t('privacyLink')}
              </Link>
            </p>
          </div>
        </div>

        {showCustomize && (
          <div className="space-y-3 mb-5 pl-8">
            {/* Necessary — always on */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-on-shadow">{t('necessary')}</span>
                <p className="text-[11px] text-on-shadow-muted/70">{t('necessaryDesc')}</p>
              </div>
              <div
                aria-hidden
                className="w-10 h-5 bg-gold/30 rounded-full relative pointer-events-none"
              >
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-gold rounded-full" />
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-on-shadow">{t('analytics')}</span>
                <p className="text-[11px] text-on-shadow-muted/70">{t('analyticsDesc')}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={consent.analytics}
                aria-label={t('analytics')}
                onClick={() => setConsent((c) => ({ ...c, analytics: !c.analytics }))}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${
                  consent.analytics ? 'bg-gold/30' : 'bg-shadow-border'
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute top-0.5 w-4 h-4 rounded-full transition-[left,right,background-color] duration-300 ${
                    consent.analytics
                      ? 'right-0.5 bg-gold'
                      : 'left-0.5 bg-on-shadow-muted/40'
                  }`}
                />
              </button>
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-on-shadow">{t('marketing')}</span>
                <p className="text-[11px] text-on-shadow-muted/70">{t('marketingDesc')}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={consent.marketing}
                aria-label={t('marketing')}
                onClick={() => setConsent((c) => ({ ...c, marketing: !c.marketing }))}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${
                  consent.marketing ? 'bg-gold/30' : 'bg-shadow-border'
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute top-0.5 w-4 h-4 rounded-full transition-[left,right,background-color] duration-300 ${
                    consent.marketing
                      ? 'right-0.5 bg-gold'
                      : 'left-0.5 bg-on-shadow-muted/40'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pl-8">
          {showCustomize ? (
            <button
              type="button"
              onClick={saveCustom}
              className="flex-1 bg-gold text-shadow text-xs font-medium tracking-wider uppercase py-2.5 px-4 rounded-full hover:bg-gold-deep hover:text-on-shadow transition-colors duration-300"
            >
              {t('save')}
            </button>
          ) : (
            <>
              <button
                ref={acceptAllRef}
                type="button"
                onClick={acceptAll}
                className="flex-1 bg-gold text-shadow text-xs font-medium tracking-wider uppercase py-2.5 px-4 rounded-full hover:bg-gold-deep hover:text-on-shadow transition-colors duration-300"
              >
                {t('acceptAll')}
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="flex-1 bg-shadow-border text-on-shadow-muted text-xs tracking-wider uppercase py-2.5 px-4 rounded-full hover:text-on-shadow transition-colors duration-300"
              >
                {t('rejectAll')}
              </button>
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className="flex-1 text-on-shadow-muted text-xs tracking-wider uppercase py-2.5 px-4 rounded-full hover:text-on-shadow transition-colors duration-300"
              >
                {t('customize')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
