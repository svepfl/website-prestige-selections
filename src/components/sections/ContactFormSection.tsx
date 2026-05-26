'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { submitContact, type ContactState } from '@/app/actions/contact';

const initial: ContactState = { status: 'idle' };

type Props = {
  /** Section eyebrow label (mono-spec) */
  label: string;
  /** Main headline */
  headline: string;
  /** Subline body */
  intro: string;
  /** Vehicle-field placeholder hint (e.g. "Marke · Modell · Jahr · KM") */
  vehicleHint?: string;
  /** Message-field placeholder hint */
  messageHint?: string;
  /** Analytics id appended to data-analytics for submit tracking */
  analyticsKey?: string;
};

/**
 * Canonical sitewide contact-form section · Apple-tier flat (no card-shadow) ·
 * inputs use hairline-underline style on section background. Submits via
 * `submitContact` server action — reused for Verkaufen (Anbieten) + Kontakt.
 */
export default function ContactFormSection({
  label,
  headline,
  intro,
  vehicleHint,
  messageHint,
  analyticsKey,
}: Props) {
  const t = useTranslations('contact');
  const [state, formAction, isPending] = useActionState(submitContact, initial);
  const submitted = state.status === 'success';
  const errors = state.status === 'error' ? state.fieldErrors : undefined;
  const analyticsTag = analyticsKey ? `contact_submit_${analyticsKey}` : 'contact_submit';

  return (
    <section
      className="px-6 md:px-10 lg:px-14 py-24 md:py-32 border-t border-ink/15 bg-canvas"
      aria-labelledby="contact-form-h"
    >
      <div className="mx-auto max-w-[1500px] grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">
        {/* LEFT — Eyebrow + Headline + Intro */}
        <div className="lg:pr-4 lg:sticky lg:top-32">
          <div className="flex items-baseline gap-3 mb-8">
            <span aria-hidden className="block h-px w-10 bg-gold-deep/70" />
            <p
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
              style={{ fontWeight: 500 }}
            >
              {label}
            </p>
          </div>
          <h2
            id="contact-form-h"
            className="font-sans text-ink leading-[1.0] tracking-[-0.02em] uppercase max-w-[18ch]"
            style={{ fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            {headline}
          </h2>
          <p
            className="mt-8 font-sans text-ink-soft leading-[1.6] max-w-[44ch]"
            style={{ fontWeight: 400, fontSize: 'clamp(1rem, 1.15vw, 1.125rem)' }}
          >
            {intro}
          </p>
        </div>

        {/* RIGHT — Form (flat, no card-shadow, hairline inputs) */}
        <div>
          {submitted ? (
            <div className="py-12 border-y border-ink/15" role="status">
              <p
                className="font-display italic text-ink leading-[1.3]"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 300 }}
              >
                {t('form.success')}
              </p>
            </div>
          ) : (
            <form action={formAction} className="space-y-9" noValidate>
              <FormField
                id="name"
                name="name"
                type="text"
                label={t('form.name')}
                required
                autoComplete="name"
                autoCapitalize="words"
                error={errors?.name?.[0]}
              />
              <FormField
                id="email"
                name="email"
                type="email"
                label={t('form.email')}
                required
                autoComplete="email"
                inputMode="email"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                error={errors?.email?.[0]}
              />
              <FormField
                id="phone"
                name="phone"
                type="tel"
                label={`${t('form.phone')} ${t('form.optionalSuffix')}`}
                autoComplete="tel"
                inputMode="tel"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                error={errors?.phone?.[0]}
              />
              <FormField
                id="vehicle"
                name="vehicle"
                type="text"
                label={`${vehicleHint ?? t('form.vehicle')} ${t('form.optionalSuffix')}`}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                error={errors?.vehicle?.[0]}
              />

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono-spec text-[10px] uppercase tracking-[0.28em] text-ink-muted mb-2"
                >
                  {messageHint ?? t('form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-transparent border-0 border-b border-ink/20 focus:border-gold-deep focus:outline-none font-sans text-base text-ink py-3 transition-colors duration-300 resize-none"
                />
                {errors?.message?.[0] && (
                  <p
                    className="mt-2 font-mono-spec text-[10px] uppercase tracking-[0.22em] text-gold-deep"
                    aria-live="polite"
                  >
                    {errors.message[0]}
                  </p>
                )}
              </div>

              {/* Honeypot — invisible to humans, traps bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
              />

              {/* DSGVO Pflicht-Hinweis · Art. 13 DSGVO · Rechtsgrundlage + Aufbewahrung + Link */}
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.22em] text-ink-soft leading-[1.8]">
                {t.rich('form.privacy', {
                  link: (chunks) => (
                    <Link
                      href="/datenschutz"
                      className="text-ink hover:text-gold-deep transition-colors duration-300 underline-offset-4 underline"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>

              {state.status === 'error' && !errors && (
                <p
                  className="font-mono-spec text-[10px] uppercase tracking-[0.22em] text-gold-deep"
                  role="alert"
                  aria-live="assertive"
                >
                  {t('form.error')}
                </p>
              )}

              {/* Submit + Trust-Signal — Baymard-Pattern direkt am Action-Element */}
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isPending}
                  data-analytics={analyticsTag}
                  className="group inline-flex items-center gap-3 bg-ink text-canvas rounded-full py-4 px-8 font-mono-spec text-[11px] uppercase tracking-[0.28em] hover:bg-ink-soft transition-colors duration-300 active:translate-y-px focus-ring disabled:opacity-50"
                  style={{ fontWeight: 600 }}
                  aria-live="polite"
                >
                  {isPending ? t('form.pending') : t('form.submit')}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <p className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-gold-deep flex items-center gap-2">
                  <span aria-hidden className="inline-block w-2 h-2 rounded-full bg-gold-deep" />
                  {t('form.trustSignal')}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FormField({
  id,
  name,
  type,
  label,
  required,
  autoComplete,
  inputMode,
  autoCapitalize,
  autoCorrect,
  spellCheck,
  error,
}: {
  id: string;
  name: string;
  type: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'url' | 'numeric' | 'decimal' | 'search';
  autoCapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  autoCorrect?: 'on' | 'off';
  spellCheck?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono-spec text-[10px] uppercase tracking-[0.28em] text-ink-muted mb-2"
      >
        {label}
        {required ? ' *' : ''}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        spellCheck={spellCheck}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full bg-transparent border-0 border-b border-ink/20 focus:border-gold-deep focus:outline-none font-sans text-base text-ink py-3 transition-colors duration-300"
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 font-mono-spec text-[10px] uppercase tracking-[0.22em] text-gold-deep"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
