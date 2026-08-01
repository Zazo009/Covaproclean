import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { ServiceConfig } from '@/config/services';
import { ArrowUpRight } from 'lucide-react';

export function ServiceCard({ service }: { service: ServiceConfig }) {
  const t = useTranslations('services.items');
  const tCommon = useTranslations('common');

  const priceLabel =
    service.pricingModel === 'from' && service.fromPrice !== null
      ? `${tCommon('from')} €${service.fromPrice}`
      : service.pricingModel === 'from'
        ? tCommon('priceCalculatedAfterDetails')
        : tCommon('quoteRequired');

  return (
    <Link
      href={{ pathname: '/services/[slug]', params: { slug: service.slug } }}
      className="group flex flex-col rounded-xl2 border border-pine-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-ink-950">{t(`${service.slug}.name`)}</h3>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-pine-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <p className="mt-2 flex-1 text-sm text-ink-800/75">{t(`${service.slug}.shortDescription`)}</p>
      <p className="mt-4 text-sm font-semibold text-pine-700">{priceLabel}</p>
    </Link>
  );
}
