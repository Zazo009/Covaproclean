import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ServiceCard } from '@/components/ServiceCard';
import { JsonLd } from '@/components/JsonLd';
import { areas, getArea } from '@/config/areas';
import { enabledServices } from '@/config/services';
import { site } from '@/config/site';
import { buildAlternates } from '@/lib/seo';

export function generateStaticParams() {
  return areas.filter((a) => a.enabled).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  const t = await getTranslations({ locale, namespace: 'areas.items' });
  return {
    title: `${t(`${slug}.name`)} — Cova Pro Clean`,
    description: t(`${slug}.intro`),
    alternates: buildAlternates(locale, { pathname: '/areas/[slug]', params: { slug } }),
  };
}

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const area = getArea(slug);
  if (!area || !area.enabled) notFound();

  const t = await getTranslations('areas.items');
  const tCommon = await getTranslations('common');
  const services = enabledServices().slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${site.name} — ${t(`${slug}.name`)}`,
    areaServed: t(`${slug}.name`),
    parentOrganization: { '@type': 'Organization', name: site.name },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero
        headline={t(`${slug}.name`)}
        subheadline={t(`${slug}.intro`)}
        actions={<ButtonLink href="/book" size="lg">{tCommon('bookNow')}</ButtonLink>}
        compact
      />
      <Container className="py-16">
        <p className="mx-auto max-w-2xl text-center text-ink-800/80">{t(`${slug}.highlight`)}</p>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </>
  );
}
