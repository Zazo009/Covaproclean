import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export default async function BookingConfirmationFallbackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('booking.confirmation');

  return (
    <Container className="max-w-lg py-20 text-center">
      <h1 className="font-display text-2xl font-semibold text-ink-950">{t('heading')}</h1>
      <p className="mt-3 text-ink-800/75">{t('statusNote')}</p>
      <ButtonLink href="/book" className="mt-8">
        {t('backHome')}
      </ButtonLink>
    </Container>
  );
}
