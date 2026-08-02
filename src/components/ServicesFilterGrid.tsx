'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ServiceCard } from '@/components/ServiceCard';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/cn';
import type { ServiceConfig } from '@/config/services';
import { Home, Palmtree, Building2, Sparkles, LayoutGrid, type LucideIcon } from 'lucide-react';

const categories = ['all', 'residential', 'holiday-rental', 'commercial', 'specialty'] as const;
type Category = (typeof categories)[number];

const categoryIcon: Record<Category, LucideIcon> = {
  all: LayoutGrid,
  residential: Home,
  'holiday-rental': Palmtree,
  commercial: Building2,
  specialty: Sparkles,
};

const filterLabelKey: Record<Category, string> = {
  all: 'filterAll',
  residential: 'filterResidential',
  'holiday-rental': 'filterHolidayRental',
  commercial: 'filterCommercial',
  specialty: 'filterSpecialty',
};

export function ServicesFilterGrid({ services }: { services: ServiceConfig[] }) {
  const t = useTranslations('services');
  const [active, setActive] = useState<Category>('all');

  const filtered = useMemo(
    () => (active === 'all' ? services : services.filter((s) => s.category === active)),
    [services, active]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={t('filterAll')}>
        {categories.map((category) => {
          const Icon = categoryIcon[category];
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'border-pine-700 bg-pine-700 text-white'
                  : 'border-pine-200 bg-white text-ink-800/80 hover:border-pine-400'
              )}
            >
              <Icon className="h-4 w-4" />
              {t(filterLabelKey[category])}
            </button>
          );
        })}
      </div>

      <div key={active} className="animate-step-in mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service, i) => (
          <Reveal key={service.slug} delay={(i % 6) * 70}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
