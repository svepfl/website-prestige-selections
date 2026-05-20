'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GTM_ID = 'GTM-XXXXXXX';
const STAPE_URL = 'https://stape.prestige-selections.com';

interface ConsentValues {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function pushConsentDefaults() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'consent': 'default',
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500,
  });
}

function updateConsent(values: ConsentValues) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'consent': 'update',
    'analytics_storage': values.analytics ? 'granted' : 'denied',
    'ad_storage': values.marketing ? 'granted' : 'denied',
    'ad_user_data': values.marketing ? 'granted' : 'denied',
    'ad_personalization': values.marketing ? 'granted' : 'denied',
  });
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function StapeTracking() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Push default denied state immediately
    pushConsentDefaults();

    // Check existing cookie
    const existing = getCookie('ps_consent');
    if (existing) {
      try {
        const values: ConsentValues = JSON.parse(existing);
        if (values.analytics || values.marketing) {
          updateConsent(values);
          setHasConsent(true);
        }
      } catch {
        // Invalid cookie, ignore
      }
    }

    // Listen for consent updates
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentValues>).detail;
      updateConsent(detail);
      if (detail.analytics || detail.marketing) {
        setHasConsent(true);
      }
    };

    window.addEventListener('consentUpdated', handler);
    return () => window.removeEventListener('consentUpdated', handler);
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            '${STAPE_URL}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`${STAPE_URL}/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
