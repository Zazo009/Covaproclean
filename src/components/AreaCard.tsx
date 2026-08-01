import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { AreaConfig } from '@/config/areas';
import { MapPin } from 'lucide-react';

export function AreaCard({ area }: { area: AreaConfig }) {
  const t = useTranslations('areas.items');

  return (
    <Link
      href={{ pathname: '/areas/[slug]', params: { slug: area.slug } }}
      className="group flex flex-col rounded-xl2 border border-pine-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="flex items-center gap-2 text-pine-600">
        <MapPin className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wide">{area.region}</span>
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold text-ink-950">{t(`${area.slug}.name`)}</h3>
      <p className="mt-2 text-sm text-ink-800/75">{t(`${area.slug}.intro`)}</p>
    </Link>
  );
}
