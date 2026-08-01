import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

const factorKeys = [
  'propertySize',
  'bedroomsBathrooms',
  'cleaningType',
  'propertyCondition',
  'frequency',
  'extras',
  'location',
  'access',
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pricing');

  return (
    <>
      <Hero headline={t('heading')} subheadline={t('intro')} compact />
      <Container className="py-16">
        <h2 className="font-display text-2xl font-semibold text-ink-950">{t('factorsHeading')}</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {factorKeys.map((key) => (
            <div key={key} className="rounded-xl2 border border-pine-100 bg-white p-5">
              <h3 className="font-semibold text-ink-950">{t(`factors.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-ink-800/75">{t(`factors.${key}.desc`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-xl2 bg-pine-50 p-8">
          <h2 className="font-display text-xl font-semibold text-ink-950">{t('customQuoteHeading')}</h2>
          <p className="mt-3 text-ink-800/80">{t('customQuoteDesc')}</p>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-xl font-semibold text-ink-950">{t('statusHeading')}</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-800/80">
            <li>&bull; {t('statusConfirmed')}</li>
            <li>&bull; {t('statusEstimated')}</li>
            <li>&bull; {t('statusQuote')}</li>
          </ul>
        </div>

        <div className="mt-14 text-center">
          <ButtonLink href="/book" size="lg">
            {t('cta')}
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
