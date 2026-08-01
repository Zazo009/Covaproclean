'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';
import { propertyTypes } from '@/config/booking';

const propertyTypeLabelKey: Record<(typeof propertyTypes)[number], string> = {
  apartment: 'propertyTypeApartment',
  villa: 'propertyTypeVilla',
  townhouse: 'propertyTypeTownhouse',
  office: 'propertyTypeOffice',
  commercial: 'propertyTypeCommercial',
};

export function LocationStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingInput>();
  const t = useTranslations('booking.location');

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-950">{t('heading')}</h2>
      <p className="mt-1 text-sm text-ink-800/70">{t('subheading')}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

export const locationStepFields: (keyof BookingInput)[] = ['address', 'postalCode', 'city', 'propertyType'];
