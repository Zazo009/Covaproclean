import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Reveal } from '@/components/Reveal';
import { buildAlternates } from '@/lib/seo';

const sections = [
  ['storyHeading', 'storyBody'],
  ['missionHeading', 'missionBody'],
  ['qualityHeading', 'qualityBody'],
  ['teamHeading', 'teamBody'],
  ['localHeading', 'localBody'],
  ['reliabilityHeading', 'reliabilityBody'],
  ['commitmentHeading', 'commitmentBody'],
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('pageTitle'), alternates: buildAlternates(locale, '/about') };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <>
      <Hero headline={t('hero.headline')} subheadline={t('hero.subheadline')} compact />
      <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {sections.map(([heading, body], i) => (
            <Reveal key={heading} delay={(i % 4) * 80}>
              <section>
                <h2 className="font-display text-xl font-semibold text-ink-950">{t(heading)}</h2>
                <p className="mt-3 text-ink-800/80">{t(body)}</p>
              </section>
            </Reveal>
          ))}
        </div>
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <PhotoSlot variant="team" caption={t('teamPhotoCaption')} aspect="aspect-[3/4]" />
        </div>
      </Container>
    </>
  );
}
