import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Hero } from '@/components/Hero';
import { ButtonLink } from '@/components/ui/Button';
import { ServiceCard } from '@/components/ServiceCard';
import { JsonLd } from '@/components/JsonLd';
import { Link } from '@/i18n/navigation';
import { enabledServices, getService, services } from '@/config/services';
import { enabledAreas } from '@/config/areas';
import { site } from '@/config/site';
import { buildAlternates } from '@/lib/seo';
import { Check, X } from 'lucide-react';

export function generateStaticParams() {
  return services.filter((s) => s.enabled).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const t = await getTranslations({ locale, namespace: 'services.items' });
  return {
    title: t(`${slug}.name`),
    description: t(`${slug}.shortDescription`),
    alternates: buildAlternates(locale, { pathname: '/services/[slug]', params: { slug } }),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getService(slug);
  if (!service || !service.enabled) notFound();

  const t = await getTranslations('services.items');
  const tCommon = await getTranslations('common');
  const tAreas = await getTranslations('areas.items');

  const includes = t.raw(`${slug}.includes`) as string[];
  const excludes = t.raw(`${slug}.excludes`) as string[];
  const process = t.raw(`${slug}.process`) as string[];
  const preparation = t.raw(`${slug}.preparation`) as string[];
  const related = enabledServices()
    .filter((s) => s.slug !== slug && s.category === service.category)
    .slice(0, 3);

  const priceLabel =
    service.pricingModel === 'from' && service.fromPrice !== null
      ? `${tCommon('from')} €${service.fromPrice}`
      : service.pricingModel === 'from'
        ? tCommon('priceCalculatedAfterDetails')
        : tCommon('quoteRequired');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: t(`${slug}.name`),
    provider: { '@type': 'LocalBusiness', name: site.name },
    areaServed: 'Costa del Sol, Spain',
    description: t(`${slug}.shortDescription`),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@position': 1, name: 'Home', item: site.domain },
      { '@position': 2, name: 'Services', item: `${site.domain}/services` },
      { '@position': 3, name: t(`${slug}.name`), item: `${site.domain}/services/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbLd} />
      <Hero
        eyebrow={priceLabel}
        headline={t(`${slug}.name`)}
        subheadline={t(`${slug}.shortDescription`)}
        actions={<ButtonLink href="/book" size="lg">{tCommon('bookNow')}</ButtonLink>}
        compact
      />

      <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink-950">{t(`${slug}.problem`)}</h2>
            <p className="mt-3 text-ink-800/80">{t(`${slug}.solution`)}</p>
          </section>

          <section className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-ink-950">{tCommon('whatsIncluded')}</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-800/80">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-pine-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-ink-950">{tCommon('whatsNotIncluded')}</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-800/80">
                {excludes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-ink-950">{tCommon('serviceProcess')}</h3>
            <ol className="mt-3 space-y-2 text-sm text-ink-800/80">
              {process.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pine-100 text-xs font-semibold text-pine-700">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="font-semibold text-ink-950">{tCommon('propertyPreparation')}</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-800/80">
              {preparation.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-pine-600" /> {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-ink-950">{tCommon('areasServed')}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {enabledAreas().map((area) => (
                <Link
                  key={area.slug}
                  href={{ pathname: '/areas/[slug]', params: { slug: area.slug } }}
                  className="rounded-full border border-pine-200 px-3 py-1 text-xs text-pine-700 hover:bg-pine-50"
                >
                  {tAreas(`${area.slug}.name`)}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl2 border border-pine-100 bg-white p-6 shadow-card">
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-medium text-ink-800/60">{tCommon('suitableFor')}</dt>
                <dd className="text-ink-950">{t(`${slug}.idealFor`)}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink-800/60">{tCommon('duration')}</dt>
                <dd className="text-ink-950">
                  {service.durationRangeMinutes[0]}–{service.durationRangeMinutes[1]} {tCommon('minutes')}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-ink-800/60">{tCommon('recommendedFrequency')}</dt>
                <dd className="text-ink-950">{t(`${slug}.recommendedFrequency`)}</dd>
              </div>
            </dl>
            <ButtonLink href="/book" className="mt-6 w-full">
              {tCommon('bookNow')}
            </ButtonLink>
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <section className="bg-white py-16">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-ink-950">{tCommon('relatedServices')}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
