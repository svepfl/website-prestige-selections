'use client';

import { useState, useEffect } from 'react';
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
  return match ? decodeURIComponent(match[2]) : null;
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

  useEffect(() => {
    const existing = getCookie('ps_consent');
    if (!existing) {
      setVisible(true);
    }
  }, []);

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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[60] max-w-lg">
      <div className="bg-dark-secondary border border-dark-border rounded-2xl p-6 shadow-2xl shadow-black/50">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-white mb-1">{t('title')}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {t('text')}{' '}
              <Link href="/datenschutz" className="text-gold/60 hover:text-gold underline transition-colors">
                {t('privacyLink')}
              </Link>
            </p>
          </div>
        </div>

        {showCustomize && (
          <div className="space-y-3 mb-5 pl-8">
            {/* Necessary — always on */}
            <label className="flex items-center justify-between">
              <div>
                <span className="text-xs text-white">{t('necessary')}</span>
                <p className="text-[11px] text-neutral-500">{t('necessaryDesc')}</p>
              </div>
              <div className="w-10 h-5 bg-gold/30 rounded-full relative pointer-events-none">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-gold rounded-full" />
              </div>
            </label>

            {/* Analytics */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs text-white">{t('analytics')}</span>
                <p className="text-[11px] text-neutral-500">{t('analyticsDesc')}</p>
              </div>
              <button
                onClick={() => setConsent((c) => ({ ...c, analytics: !c.analytics }))}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${
                  consent.analytics ? 'bg-gold/30' : 'bg-dark-tertiary'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${
                    consent.analytics ? 'right-0.5 bg-gold' : 'left-0.5 bg-neutral-600'
                  }`}
                />
              </button>
            </label>

            {/* Marketing */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs text-white">{t('marketing')}</span>
                <p className="text-[11px] text-neutral-500">{t('marketingDesc')}</p>
              </div>
              <button
                onClick={() => setConsent((c) => ({ ...c, marketing: !c.marketing }))}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${
                  consent.marketing ? 'bg-gold/30' : 'bg-dark-tertiary'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${
                    consent.marketing ? 'right-0.5 bg-gold' : 'left-0.5 bg-neutral-600'
                  }`}
                />
              </button>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pl-8">
          {showCustomize ? (
            <button
              onClick={saveCustom}
              className="flex-1 bg-gold text-dark text-xs font-medium tracking-wider uppercase py-2.5 px-4 rounded-full hover:bg-gold-light transition-colors duration-300"
            >
              {t('save')}
            </button>
          ) : (
            <>
              <button
                onClick={acceptAll}
                className="flex-1 bg-gold text-dark text-xs font-medium tracking-wider uppercase py-2.5 px-4 rounded-full hover:bg-gold-light transition-colors duration-300"
              >
                {t('acceptAll')}
              </button>
              <button
                onClick={rejectAll}
                className="flex-1 border border-dark-border text-neutral-400 text-xs tracking-wider uppercase py-2.5 px-4 rounded-full hover:text-white hover:border-neutral-500 transition-colors duration-300"
              >
                {t('rejectAll')}
              </button>
              <button
                onClick={() => setShowCustomize(true)}
                className="flex-1 text-neutral-500 text-xs tracking-wider uppercase py-2.5 px-4 rounded-full hover:text-neutral-300 transition-colors duration-300"
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
