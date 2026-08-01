import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';

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
  return { title: t('pageTitle') };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <>
      <Hero headline={t('hero.headline')} subheadline={t('hero.subheadline')} compact />
      <Container className="max-w-3xl space-y-10 py-16">
        {sections.map(([heading, body]) => (
          <section key={heading}>
            <h2 className="font-display text-xl font-semibold text-ink-950">{t(heading)}</h2>
            <p className="mt-3 text-ink-800/80">{t(body)}</p>
          </section>
        ))}
      </Container>
    </>
  );
}
