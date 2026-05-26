'use server';

import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import { sendMail } from '@/lib/mail';
import { serverEnv, publicEnv } from '@/lib/env';
import { generateNewsletterToken } from '@/lib/newsletter-token';

const SUPPORTED_LOCALES = ['de', 'en', 'fr'] as const;
type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export const NewsletterSchema = z.object({
  email: z.email(),
  website: z.string().max(0).optional(), // honeypot
  locale: z.enum(SUPPORTED_LOCALES).optional(),
});

export type NewsletterState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message?: string };

/**
 * Newsletter Double-Opt-In Flow:
 * 1. User submits email + locale (hidden field)
 * 2. We send confirmation mail in the user's language with signed HMAC token
 * 3. User clicks link → /api/newsletter/confirm?token=...
 * 4. We add to subscriber list (V1.5 — currently only token-validation)
 *
 * Locale-aware: Subject + Body werden in der Sprache des Submitters
 * gerendert (next-intl getTranslations), nicht hardcoded auf Deutsch.
 *
 * Error-Messages: kein hardcoded String — Client fällt auf t('error')
 * zurück, das die Sprache automatisch passt.
 */
export async function subscribeNewsletter(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const parsed = NewsletterSchema.safeParse({
    email: formData.get('email'),
    website: formData.get('website'),
    locale: formData.get('locale'),
  });

  if (!parsed.success) {
    return { status: 'error' };
  }

  // Honeypot triggered → silent success (don't tell the bot)
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { status: 'success' };
  }

  const { email } = parsed.data;
  const locale: SupportedLocale = parsed.data.locale ?? 'de';
  const t = await getTranslations({ locale, namespace: 'newsletter' });

  const token = generateNewsletterToken(email);
  const confirmUrl = `${publicEnv.NEXT_PUBLIC_BASE_URL}/api/newsletter/confirm?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;

  // Body styled as plain editorial — keine Marketing-HTML-Templates.
  const html = `
    <p>${t('confirmIntro')}</p>
    <p><a href="${confirmUrl}">${t('confirmCta')}</a></p>
    <p style="color:#8B7B6A; font-size:12px; margin-top:32px;">
      ${t('confirmIgnore')}
    </p>
    <p style="color:#8B7B6A; font-size:12px;">${t('confirmSignoff')}</p>
  `;

  const result = await sendMail({
    to: email,
    from: serverEnv.NEWSLETTER_FROM_EMAIL,
    replyTo: serverEnv.CONTACT_TO_EMAIL,
    subject: t('confirmSubject'),
    html,
  });

  if (!result.ok) {
    return { status: 'error' };
  }

  return { status: 'success' };
}
