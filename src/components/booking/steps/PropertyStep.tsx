'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';
import { propertyTypes, propertyConditions } from '@/config/booking';
import { StepHeader } from './StepHeader';

const propertyTypeLabelKey: Record<(typeof propertyTypes)[number], string> = {
  apartment: 'propertyTypeApartment',
  villa: 'propertyTypeVilla',
  townhouse: 'propertyTypeTownhouse',
  office: 'propertyTypeOffice',
  commercial: 'propertyTypeCommercial',
};

const conditionLabelKey: Record<(typeof propertyConditions)[number], string> = {
  well_maintained: 'conditionWellMaintained',
  needs_attention: 'conditionNeedsAttention',
  post_construction: 'conditionPostConstruction',
  post_renovation: 'conditionPostRenovation',
};

export function PropertyStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingInput>();
  const t = useTranslations('booking.location');
  const tDetails = useTranslations('booking.propertyDetails');

  return (
    <div>
      <StepHeader variant="villa" heading={t('heading')} subheading={t('subheading')} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t('address')} error={errors.address?.message}>
          <input className="input" {...register('address')} />
        </Field>
        <Field label={t('postalCode')} error={errors.postalCode?.message}>
          <input className="input" {...register('postalCode')} />
        </Field>
        <Field label={t('city')} error={errors.city?.message}>
          <input className="input" {...register('city')} />
        </Field>
        <Field label={t('urbanization')}>
          <input className="input" {...register('urbanization')} />
        </Field>
        <Field label={t('propertyType')} error={errors.propertyType?.message}>
          <select className="input" {...register('propertyType')}>
            <option value="">—</option>
            {propertyTypes.map((pt) => (
              <option key={pt} value={pt}>
                {t(propertyTypeLabelKey[pt])}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t('floor')}>
          <input className="input" {...register('floor')} />
        </Field>
        <Field label={t('parkingInstructions')} full>
          <input className="input" {...register('parkingInstructions')} />
        </Field>
        <label className="flex items-center gap-2 text-sm text-ink-800/80">
          <input type="checkbox" {...register('liftAvailable')} />
          {t('liftAvailable')}
        </label>
      </div>

      <h3 className="mt-8 font-display text-base font-semibold text-ink-950">{tDetails('heading')}</h3>
      <p className="mt-1 text-sm text-ink-800/70">{tDetails('subheading')}</p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <NumberField label={tDetails('squareMetres')} {...register('squareMetres', { valueAsNumber: true })} />
        <NumberField label={tDetails('bedrooms')} {...register('bedrooms', { valueAsNumber: true })} />
        <NumberField label={tDetails('bathrooms')} {...register('bathrooms', { valueAsNumber: true })} />
        <NumberField label={tDetails('kitchens')} {...register('kitchens', { valueAsNumber: true })} />
        <NumberField label={tDetails('livingAreas')} {...register('livingAreas', { valueAsNumber: true })} />
        <NumberField label={tDetails('floorsInProperty')} {...register('floorsInProperty', { valueAsNumber: true })} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950">{tDetails('propertyCondition')}</label>
          <select className="input mt-1" {...register('propertyCondition')}>
            <option value="">—</option>
            {propertyConditions.map((c) => (
              <option key={c} value={c}>
                {tDetails(conditionLabelKey[c])}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{tDetails('lastProfessionalClean')}</label>
          <input type="date" className="input mt-1" {...register('lastProfessionalClean')} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Checkbox label={tDetails('hasTerrace')} {...register('hasTerrace')} />
        <Checkbox label={tDetails('hasPets')} {...register('hasPets')} />
        <Checkbox label={tDetails('furnished')} {...register('furnished')} />
        <Checkbox label={tDetails('recentConstructionWork')} {...register('recentConstructionWork')} />
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? 'sm:col-span-2' : undefined}>
      <label className="block text-sm font-medium text-ink-950">{label}</label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-coral-600">{error}</p>}
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

export const propertyStepFields: (keyof BookingInput)[] = ['address', 'postalCode', 'city', 'propertyType'];
