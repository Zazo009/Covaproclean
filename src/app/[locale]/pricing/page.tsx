import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/Reveal';
import { ServicesFilterGrid } from '@/components/ServicesFilterGrid';
import { enabledServices } from '@/config/services';
import { buildAlternates } from '@/lib/seo';
import {
  Maximize2,
  BedDouble,
  Sparkles,
  ClipboardCheck,
  Repeat,
  PlusCircle,
  MapPin,
  KeyRound,
  CheckCircle2,
  Calculator,
  MessageCircleQuestion,
  type LucideIcon,
} from 'lucide-react';

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

const factorIcon: Record<(typeof factorKeys)[number], LucideIcon> = {
  propertySize: Maximize2,
  bedroomsBathrooms: BedDouble,
  cleaningType: Sparkles,
  propertyCondition: ClipboardCheck,
  frequency: Repeat,
  extras: PlusCircle,
  location: MapPin,
  access: KeyRound,
};

const statusKeys = ['statusConfirmed', 'statusEstimated', 'statusQuote'] as const;

const statusStyle: Record<(typeof statusKeys)[number], { icon: LucideIcon; className: string }> = {
  statusConfirmed: { icon: CheckCircle2, className: 'bg-pine-50 text-pine-700' },
  statusEstimated: { icon: Calculator, className: 'bg-sand-100 text-pine-700' },
  statusQuote: { icon: MessageCircleQuestion, className: 'bg-coral-400/10 text-coral-600' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return { title: t('pageTitle'), description: t('pageDescription'), alternates: buildAlternates(locale, '/pricing') };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pricing');

  return (
    <>
      <Hero headline={t('heading')} subheadline={t('intro')} compact />

      <Container className="py-16">
        <Reveal className="text-center">
          <h2 className="font-display text-2xl font-semibold text-ink-950">{t('startingPricesHeading')}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-ink-800/70">{t('startingPricesSubheading')}</p>
        </Reveal>
        <div className="mt-10">
          <ServicesFilterGrid services={enabledServices()} />
        </div>

        <h2 className="mt-20 font-display text-2xl font-semibold text-ink-950">{t('factorsHeading')}</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {factorKeys.map((key, i) => {
            const Icon = factorIcon[key];
            return (
              <Reveal key={key} delay={i * 60}>
                <div className="h-full rounded-xl2 border border-pine-100 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-soft">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pine-50 text-pine-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-semibold text-ink-950">{t(`factors.${key}.title`)}</h3>
                  <p className="mt-2 text-sm text-ink-800/75">{t(`factors.${key}.desc`)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 rounded-xl2 bg-pine-50 p-8">
          <h2 className="font-display text-xl font-semibold text-ink-950">{t('customQuoteHeading')}</h2>
          <p className="mt-3 text-ink-800/80">{t('customQuoteDesc')}</p>
        </Reveal>

        <div className="mt-14">
          <h2 className="font-display text-xl font-semibold text-ink-950">{t('statusHeading')}</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {statusKeys.map((key, i) => {
              const { icon: Icon, className } = statusStyle[key];
              return (
                <Reveal key={key} delay={i * 80}>
                  <div className="flex h-full items-start gap-3 rounded-xl2 border border-pine-100 bg-white p-5">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${className}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-sm text-ink-800/80">{t(key)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
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
