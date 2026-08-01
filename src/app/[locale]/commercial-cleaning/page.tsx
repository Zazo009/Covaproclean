import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Reveal } from '@/components/Reveal';
import { Building, Store, Landmark, UtensilsCrossed, PanelsTopLeft, Users2, Boxes } from 'lucide-react';

const sectorKeys = [
  ['offices', Building],
  ['retail', Store],
  ['agencies', Landmark],
  ['restaurants', UtensilsCrossed],
  ['showrooms', PanelsTopLeft],
  ['communityAreas', Users2],
  ['propertyPortfolios', Boxes],
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'commercialPage' });
  return { title: t('pageTitle') };
}

export default async function CommercialCleaningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('commercialPage');

  return (
    <>
      <Hero
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        subheadline={t('hero.subheadline')}
        actions={
          <>
            <ButtonLink href="/contact" size="lg">
              {t('hero.primaryCta')}
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary" size="lg">
              {t('hero.secondaryCta')}
            </ButtonLink>
          </>
        }
        visual={<PhotoSlot variant="office" caption={t('heroPhotoCaption')} aspect="aspect-[4/5] lg:aspect-[4/3]" />}
      />
      <Container className="py-16">
        <Reveal>
          <h2 className="text-center font-display text-2xl font-semibold text-ink-950">{t('sectorsHeading')}</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {sectorKeys.map(([key, Icon], i) => (
            <Reveal key={key} delay={(i % 6) * 70}>
              <div className="group flex flex-col items-center gap-2 rounded-xl2 border border-pine-100 bg-white p-6 text-center transition-colors hover:border-pine-300 hover:bg-pine-50/40">
                <Icon className="h-6 w-6 text-pine-600 transition-transform group-hover:-translate-y-0.5" />
                <span className="text-sm font-medium text-ink-950">{t(`sectors.${key}`)}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-xl2 bg-pine-50 p-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink-950">{t('flexibleHeading')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-800/80">{t('flexibleDesc')}</p>
          <ButtonLink href="/contact" size="lg" className="mt-6">
            {t('cta')}
          </ButtonLink>
        </Reveal>
      </Container>
    </>
  );
}
