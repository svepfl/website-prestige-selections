'use client';

import { useState, useEffect, useCallback } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const localeLabels: Record<string, string> = {
  de: 'DE',
  en: 'EN',
  fr: 'FR',
};

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = useCallback(
    (newLocale: string) => {
      router.replace(pathname, { locale: newLocale as 'de' | 'en' | 'fr' });
      setLangOpen(false);
    },
    [pathname, router],
  );

  const navLinks = [
    { href: '/fahrzeuge' as const, label: t('vehicles') },
    { href: '/werkstatt' as const, label: t('workshop') },
    { href: '/kontakt' as const, label: t('contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-sm font-light uppercase tracking-[0.15em] text-gold">
            PRESTIGE SELECTIONS
          </span>
        </Link>

        {/* Center nav — desktop */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase text-neutral-300 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: lang + CTA — desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm tracking-widest uppercase text-neutral-400 hover:text-white transition-colors duration-300"
              aria-label="Change language"
              aria-expanded={langOpen}
            >
              {localeLabels[locale]}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {langOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-50 bg-dark-secondary border border-dark-border rounded-lg overflow-hidden shadow-xl min-w-[80px]">
                  {Object.entries(localeLabels)
                    .filter(([key]) => key !== locale)
                    .map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => switchLocale(key)}
                        className="block w-full px-4 py-2.5 text-sm tracking-widest text-neutral-400 hover:text-white hover:bg-dark-tertiary transition-colors text-left"
                      >
                        {label}
                      </button>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* Phone CTA */}
          <a
            href="tel:+497615573168"
            className="flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold hover:text-dark px-4 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{t('callUs')}</span>
          </a>
        </div>

        {/* Mobile: phone + hamburger */}
        <div className="flex lg:hidden items-center gap-4">
          <a
            href="tel:+497615573168"
            className="text-gold hover:text-gold-light transition-colors"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-20 z-40 bg-dark/98 backdrop-blur-lg transition-all duration-500 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-10 -mt-20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl tracking-[0.2em] uppercase font-light text-neutral-200 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile language switcher */}
          <div className="flex items-center gap-4 mt-6">
            {Object.entries(localeLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  switchLocale(key);
                  setMobileOpen(false);
                }}
                className={`text-sm tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors duration-300 ${
                  key === locale
                    ? 'border-gold text-gold'
                    : 'border-dark-border text-neutral-500 hover:text-white hover:border-neutral-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <a
            href="tel:+497615573168"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center gap-3 border border-gold/40 text-gold hover:bg-gold hover:text-dark px-6 py-3 rounded-full text-sm tracking-widest uppercase transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            {t('callUs')}
          </a>
        </nav>
      </div>
    </header>
  );
}
