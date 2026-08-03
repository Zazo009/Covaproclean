import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { ServicesFilterGrid } from '@/components/ServicesFilterGrid';
import { enabledServices } from '@/config/services';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('pageTitle'), description: t('pageDescription'), alternates: buildAlternates(locale, '/services') };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');

  const list = enabledServices();

  return (
    <>
      <Hero headline={t('pageTitle')} subheadline={t('pageDescription')} compact />
      <Container className="py-16">
        <h2 className="sr-only">{t('gridHeading')}</h2>
        <ServicesFilterGrid services={list} />
      </Container>
    </>
  );
}
