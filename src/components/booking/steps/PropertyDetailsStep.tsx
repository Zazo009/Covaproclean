'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';
import { propertyConditions } from '@/config/booking';

const conditionLabelKey: Record<(typeof propertyConditions)[number], string> = {
  well_maintained: 'conditionWellMaintained',
  needs_attention: 'conditionNeedsAttention',
  post_construction: 'conditionPostConstruction',
  post_renovation: 'conditionPostRenovation',
};

export function PropertyDetailsStep() {
  const { register } = useFormContext<BookingInput>();
  const t = useTranslations('booking.propertyDetails');

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-950">{t('heading')}</h2>
      <p className="mt-1 text-sm text-ink-800/70">{t('subheading')}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <NumberField label={t('squareMetres')} {...register('squareMetres', { valueAsNumber: true })} />
        <NumberField label={t('bedrooms')} {...register('bedrooms', { valueAsNumber: true })} />
        <NumberField label={t('bathrooms')} {...register('bathrooms', { valueAsNumber: true })} />
        <NumberField label={t('kitchens')} {...register('kitchens', { valueAsNumber: true })} />
        <NumberField label={t('livingAreas')} {...register('livingAreas', { valueAsNumber: true })} />
        <NumberField label={t('floorsInProperty')} {...register('floorsInProperty', { valueAsNumber: true })} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('propertyCondition')}</label>
          <select className="input mt-1" {...register('propertyCondition')}>
            <option value="">—</option>
            {propertyConditions.map((c) => (
              <option key={c} value={c}>
                {t(conditionLabelKey[c])}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('lastProfessionalClean')}</label>
          <input type="date" className="input mt-1" {...register('lastProfessionalClean')} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Checkbox label={t('hasTerrace')} {...register('hasTerrace')} />
        <Checkbox label={t('hasPets')} {...register('hasPets')} />
        <Checkbox label={t('furnished')} {...register('furnished')} />
        <Checkbox label={t('recentConstructionWork')} {...register('recentConstructionWork')} />
      </div>
    </div>
  );
}

function NumberField({ label, ...rest }: { label: string } & React.ComponentPropsWithRef<'input'>) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-950">{label}</label>
      <input type="number" min={0} className="input mt-1" {...rest} />
    </div>
  );
}

function Checkbox({ label, ...rest }: { label: string } & React.ComponentPropsWithRef<'input'>) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink-800/80">
      <input type="checkbox" {...rest} />
      {label}
    </label>
  );
}

export const propertyDetailsStepFields: (keyof BookingInput)[] = [];
