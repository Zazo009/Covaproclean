import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Reveal } from '@/components/Reveal';
import {
  RefreshCw,
  ClipboardCheck,
  BedDouble,
  PackagePlus,
  KeyRound,
  AlertTriangle,
  Camera,
  Zap,
  CalendarClock,
  CalendarRange,
  Building2,
} from 'lucide-react';

const featureKeys = [
  ['turnover', RefreshCw],
  ['guestReady', ClipboardCheck],
  ['linen', BedDouble],
  ['restocking', PackagePlus],
  ['keyCollection', KeyRound],
  ['damageReporting', AlertTriangle],
  ['photoReporting', Camera],
  ['emergencyCleaning', Zap],
  ['sameDay', CalendarClock],
  ['recurring', CalendarRange],
  ['multiProperty', Building2],
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'holidayRentalPage' });
  return { title: t('pageTitle') };
}

export default async function HolidayRentalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('holidayRentalPage');

  return (
    <>
      <Hero
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        subheadline={t('hero.subheadline')}
        actions={
          <>
            <ButtonLink href="/book" size="lg">
              {t('hero.primaryCta')}
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              {t('hero.secondaryCta')}
            </ButtonLink>
          </>
        }
        visual={<PhotoSlot variant="bedroom" caption={t('heroPhotoCaption')} aspect="aspect-[4/5] lg:aspect-[4/3]" />}
      />
      <Container className="py-16">
        <Reveal>
          <h2 className="text-center font-display text-2xl font-semibold text-ink-950">{t('featuresHeading')}</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map(([key, Icon], i) => (
            <Reveal key={key} delay={(i % 6) * 70}>
              <div className="group rounded-xl2 border border-pine-100 bg-white p-6 transition-colors hover:border-pine-300 hover:bg-pine-50/40">
                <Icon className="h-6 w-6 text-pine-600 transition-transform group-hover:-translate-y-0.5" />
                <h3 className="mt-3 font-semibold text-ink-950">{t(`features.${key}.title`)}</h3>
                <p className="mt-2 text-sm text-ink-800/75">{t(`features.${key}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-xl2 bg-pine-800 p-10 text-center text-white">
          <h2 className="font-display text-2xl font-semibold">{t('proposalHeading')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">{t('proposalDesc')}</p>
          <ButtonLink href="/contact" variant="secondary" size="lg" className="mt-6">
            {t('proposalCta')}
          </ButtonLink>
        </Reveal>
      </Container>
    </>
  );
}
