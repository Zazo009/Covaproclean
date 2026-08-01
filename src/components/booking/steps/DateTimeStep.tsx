'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';

export function DateTimeStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingInput>();
  const t = useTranslations('booking.dateTime');

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-950">{t('heading')}</h2>
      <p className="mt-1 text-sm text-ink-800/70">{t('subheading')}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('preferredDate')}</label>
          <input type="date" min={today} className="input mt-1" {...register('preferredDate')} />
          {errors.preferredDate && <p className="mt-1 text-xs text-coral-600">{errors.preferredDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('preferredTimeWindow')}</label>
          <select className="input mt-1" {...register('preferredTimeWindow')}>
            <option value="morning">{t('morning')}</option>
            <option value="midday">{t('midday')}</option>
            <option value="afternoon">{t('afternoon')}</option>
            <option value="flexible">{t('flexible')}</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ink-950">{t('alternativeDate')}</label>
          <input type="date" min={today} className="input mt-1" {...register('alternativeDate')} />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <label className="flex items-center gap-2 text-sm text-ink-800/80">
          <input type="checkbox" {...register('isFlexible')} />
          {t('isFlexible')}
        </label>
        <label className="flex items-center gap-2 text-sm text-ink-800/80">
          <input type="checkbox" {...register('isUrgent')} />
          {t('isUrgent')}
        </label>
      </div>

      <p className="mt-6 rounded-xl2 bg-pine-50 p-4 text-sm text-pine-800">{t('pendingConfirmationNotice')}</p>
    </div>
  );
}

export const dateTimeStepFields: (keyof BookingInput)[] = ['preferredDate', 'preferredTimeWindow'];
