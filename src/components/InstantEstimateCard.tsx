'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import type { ServiceConfig } from '@/config/services';
import { Home, Palmtree, Building2, Sparkles, type LucideIcon } from 'lucide-react';

const categoryIcon: Record<ServiceConfig['category'], LucideIcon> = {
  residential: Home,
  'holiday-rental': Palmtree,
  commercial: Building2,
  specialty: Sparkles,
};

/**
 * A quick, honest "what would this take?" tool: pick a service, see its
 * real duration range and starting price straight from the service
 * catalogue — nothing invented on the spot. Services still marked
 * `pricingModel: 'quote'` show "Quote required" instead of a number.
 */
export function InstantEstimateCard({ services }: { services: ServiceConfig[] }) {
  const t = useTranslations('home.instantEstimate');
  const tCommon = useTranslations('common');
  const tServices = useTranslations('services.items');
  const [active, setActive] = useState(services[0]);

  if (!active) return null;

  const Icon = categoryIcon[active.category];
  const priceLabel =
    active.pricingModel === 'from' && active.fromPrice !== null
      ? `${tCommon('from')} €${active.fromPrice}`
      : tCommon('quoteRequired');

  return (
    <div className="rounded-xl2 border border-pine-100 bg-white p-6 shadow-card sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-wide text-pine-700">{t('eyebrow')}</p>
      <h2 className="mt-1 font-display text-lg font-semibold text-ink-950">{t('heading')}</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {services.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => setActive(service)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              active.slug === service.slug
                ? 'border-pine-700 bg-pine-700 text-white'
                : 'border-pine-200 bg-white text-ink-800/80 hover:border-pine-400'
            )}
          >
            {tServices(`${service.slug}.name`)}
          </button>
        ))}
      </div>

      <div key={active.slug} className="animate-pop-in mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl2 bg-pine-50 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine-700 text-white">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-pine-700">{t('durationLabel')}</p>
            <p className="font-display text-lg font-semibold text-ink-950">
              {active.durationRangeMinutes[0]}–{active.durationRangeMinutes[1]} {t('minutes')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl2 bg-sand-100 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine-700/10 text-pine-700">
            <span className="text-base font-bold">€</span>
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-pine-700">{t('priceLabel')}</p>
            <p className="font-display text-lg font-semibold text-ink-950">{priceLabel}</p>
          </div>
        </div>
      </div>

      <ButtonLink href="/book" className="mt-5 w-full">
        {t('cta')}
      </ButtonLink>
      <p className="mt-2 text-center text-[11px] text-ink-800/80">{t('note')}</p>
    </div>
  );
}
