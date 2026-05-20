import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-dark-secondary">
      {/* Gold divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1: Logo + tagline */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-sm font-light uppercase tracking-[0.15em] text-gold">
                PRESTIGE SELECTIONS
              </span>
            </Link>
            <p className="mt-4 text-sm text-neutral-500 leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">
              {t('navigation')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/fahrzeuge"
                  className="text-sm text-neutral-400 hover:text-gold transition-colors duration-300"
                >
                  {tNav('vehicles')}
                </Link>
              </li>
              <li>
                <Link
                  href="/werkstatt"
                  className="text-sm text-neutral-400 hover:text-gold transition-colors duration-300"
                >
                  {tNav('workshop')}
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-sm text-neutral-400 hover:text-gold transition-colors duration-300"
                >
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">
              {tNav('contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-neutral-400">
                <MapPin className="w-4 h-4 mt-0.5 text-gold/60 flex-shrink-0" />
                {t('address')}
              </li>
              <li>
                <a
                  href="tel:+497615573168"
                  className="flex items-start gap-3 text-sm text-neutral-400 hover:text-gold transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-gold/60 flex-shrink-0" />
                  +49 761 5573168
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@prestige-selections.com"
                  className="flex items-start gap-3 text-sm text-neutral-400 hover:text-gold transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-gold/60 flex-shrink-0" />
                  info@prestige-selections.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; 2012&ndash;2026 Prestige Selections GmbH. {t('rights')}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/impressum"
              className="text-xs text-neutral-500 hover:text-neutral-400 transition-colors duration-300"
            >
              {t('impressum')}
            </Link>
            <Link
              href="/datenschutz"
              className="text-xs text-neutral-500 hover:text-neutral-400 transition-colors duration-300"
            >
              {t('datenschutz')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
