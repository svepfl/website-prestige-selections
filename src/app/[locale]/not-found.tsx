import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="bg-dark min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-8xl font-display font-light text-gold mb-6">404</p>
        <h1 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight mb-4">
          {t('title')}
        </h1>
        <p className="text-neutral-400 mb-8 max-w-md mx-auto">
          {t('text')}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-gold text-dark px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('cta')}
        </Link>
      </div>
    </section>
  );
}
