import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { FAQAccordion } from '@/components/FAQAccordion';
import { JsonLd } from '@/components/JsonLd';
import { faqCategories, faqs } from '@/config/faqs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');
  const tItems = await getTranslations('faq.items');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: tItems(`${f.id}.q`),
      acceptedAnswer: { '@type': 'Answer', text: tItems(`${f.id}.a`) },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero headline={t('heading')} subheadline={t('pageDescription')} compact />
      <Container className="max-w-3xl space-y-10 py-16">
        {faqCategories.map((category) => {
          const items = faqs.filter((f) => f.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category}>
              <h2 className="font-display text-xl font-semibold text-ink-950">{t(`categories.${category}`)}</h2>
              <div className="mt-4">
                <FAQAccordion items={items} />
              </div>
            </section>
          );
        })}
      </Container>
    </>
  );
}
