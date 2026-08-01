'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('error');

  return (
    <Container className="max-w-lg py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink-950">{t('title')}</h1>
      <p className="mt-3 text-ink-800/75">{t('body')}</p>
      <Button onClick={reset} className="mt-8">
        {t('retry')}
      </Button>
    </Container>
  );
}
