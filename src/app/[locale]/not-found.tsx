import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';

export default async function LocaleNotFound() {
  const t = await getTranslations('notFound');

  return (
    <Container className="max-w-lg py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink-950">{t('title')}</h1>
      <p className="mt-3 text-ink-800/75">{t('body')}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="rounded-full bg-pine-700 px-5 py-2.5 text-sm font-medium text-white">
          {t('cta')}
        </Link>
        <Link href="/book" className="rounded-full border border-pine-200 px-5 py-2.5 text-sm font-medium text-pine-800">
          {t('bookCta')}
        </Link>
      </div>
    </Container>
  );
}
