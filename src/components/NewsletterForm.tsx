'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useActionState } from 'react';
import { subscribeNewsletter, type NewsletterState } from '@/app/actions/newsletter';

/**
 * Newsletter — Double-Opt-In via Server Action.
 * Editorial promise: "Vorab. Vor allen anderen."
 *
 * Locale wird als Hidden-Field an die Server-Action gegeben, damit
 * Confirm-Mail (Subject + Body) in der Sprache des Submitters versandt wird,
 * nicht hardcoded auf Deutsch.
 */

const initial: NewsletterState = { status: 'idle' };

export default function NewsletterForm() {
  const t = useTranslations('newsletter');
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, initial);

  if (state.status === 'success') {
    return (
      <p className="font-sans text-[13px] text-gold leading-relaxed" style={{ fontWeight: 500 }}>
        {t('success')}
      </p>
    );
  }

  return (
    <form action={formAction} noValidate className="w-full max-w-md">
      <div className="relative flex items-baseline gap-3 border-b border-on-shadow/30 focus-within:border-gold transition-colors duration-300 pb-1">
        <input type="hidden" name="locale" value={locale} />
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          aria-label={t('emailPlaceholder')}
          placeholder={t('emailPlaceholder')}
          disabled={isPending}
          className="flex-1 min-w-0 bg-transparent border-0 font-sans text-base text-on-shadow placeholder:text-on-shadow-muted/60 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-gold rounded-sm"
        />
        {/* Honeypot — invisible to humans, traps bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
        />
        <button
          type="submit"
          disabled={isPending}
          className="font-mono-spec text-[11px] uppercase tracking-[0.28em] text-on-shadow hover:text-gold transition-colors duration-300 active:translate-y-px focus-ring rounded-sm py-2 disabled:opacity-50"
          style={{ fontWeight: 600 }}
        >
          {isPending ? '…' : t('submit')}
          <span aria-hidden className="ml-2">→</span>
        </button>
      </div>
      {state.status === 'error' && (
        <p className="mt-3 font-mono-spec text-[10px] uppercase tracking-[0.22em] text-gold" aria-live="polite">
          {state.message ?? t('error')}
        </p>
      )}
      <p className="mt-4 font-mono-spec text-[10px] uppercase tracking-[0.22em] text-on-shadow-muted/70 leading-[1.8] max-w-md">
        {t('privacy')}
      </p>
    </form>
  );
}
