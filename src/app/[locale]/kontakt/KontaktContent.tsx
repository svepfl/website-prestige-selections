'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

export default function KontaktContent() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: in production this would POST to an API
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Header */}
      <section className="bg-dark pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs locale={locale} items={[{ label: t('title') }]} />
          <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">{t('label')}</p>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-neutral-400 max-w-xl leading-relaxed">{t('description')}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-dark py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Contact info + map */}
            <div>
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-dark-secondary border border-dark-border flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1">
                      {t('form.addressLabel') || 'Adresse'}
                    </p>
                    <p className="text-white text-sm">{t('address')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-dark-secondary border border-dark-border flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1">
                      {t('form.phoneLabel') || 'Telefon'}
                    </p>
                    <a
                      href="tel:+497615573168"
                      className="text-white text-sm hover:text-gold transition-colors duration-300"
                    >
                      {t('phone')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-dark-secondary border border-dark-border flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1">
                      {t('form.emailLabel') || 'E-Mail'}
                    </p>
                    <a
                      href="mailto:info@prestige-selections.com"
                      className="text-white text-sm hover:text-gold transition-colors duration-300"
                    >
                      {t('email')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="aspect-[4/3] rounded-xl bg-dark-secondary border border-dark-border flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold/30 mx-auto mb-3" />
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">
                    Google Maps
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact form */}
            <div>
              {submitted ? (
                <div className="bg-dark-secondary border border-dark-border rounded-xl p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-gold mx-auto mb-4" />
                  <p className="text-white text-lg font-light">{t('form.success')}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-dark-secondary border border-dark-border rounded-xl p-8 space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2"
                    >
                      {t('form.name')} *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-dark-tertiary border border-dark-border rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/40 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2"
                    >
                      {t('form.email')} *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-dark-tertiary border border-dark-border rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/40 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2"
                    >
                      {t('form.phone')}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-dark-tertiary border border-dark-border rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/40 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Vehicle interest (optional) */}
                  <div>
                    <label
                      htmlFor="vehicle"
                      className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2"
                    >
                      {t('form.vehicle')}
                    </label>
                    <input
                      id="vehicle"
                      name="vehicle"
                      type="text"
                      value={formData.vehicle}
                      onChange={handleChange}
                      className="w-full bg-dark-tertiary border border-dark-border rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/40 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2"
                    >
                      {t('form.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-dark-tertiary border border-dark-border rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/40 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Privacy */}
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    {t.rich('form.privacy', {
                      link: (chunks) => (
                        <Link
                          href="/datenschutz"
                          className="text-gold/60 hover:text-gold transition-colors underline"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-gold text-dark py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300 flex items-center justify-center gap-3"
                  >
                    <Send className="w-4 h-4" />
                    {t('form.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
