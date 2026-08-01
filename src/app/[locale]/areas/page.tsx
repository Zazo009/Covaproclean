import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { AreaCard } from '@/components/AreaCard';
import { enabledAreas } from '@/config/areas';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'areas' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function AreasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('areas');

  return (
    <>
      <Hero headline={t('pageTitle')} subheadline={t('pageDescription')} compact />
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enabledAreas().map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-ink-800/70">
          {t('notListed')} {t('notListedCta')}
        </p>
      </Container>
    </>
  );
}
