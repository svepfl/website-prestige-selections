import Script from 'next/script';
import { publicEnv } from '@/lib/env';

/**
 * Plausible Analytics — EU-hosted, cookie-free, DSGVO-konform by default.
 * Only loads when NEXT_PUBLIC_PLAUSIBLE_DOMAIN env var is set.
 *
 * Tracked events:
 * - Pageviews (automatic)
 * - Outbound link clicks
 * - Phone/messaging clicks (custom — implement via plausible('Phone Click'))
 * - Form submissions (custom)
 */

export default function PlausibleAnalytics() {
  const domain = publicEnv.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.outbound-links.tagged-events.js"
      strategy="afterInteractive"
    />
  );
}
