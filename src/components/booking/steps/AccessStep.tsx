'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';
import { accessMethods } from '@/config/booking';

const labelKey: Record<(typeof accessMethods)[number], string> = {
  customer_present: 'customerPresent',
  key_pickup: 'keyPickup',
  key_safe: 'keySafe',
  concierge: 'concierge',
  property_manager: 'propertyManager',
  smart_lock: 'smartLock',
  alarm_code: 'alarmCode',
  other: 'other',
};

export function AccessStep() {
  const { register, watch } = useFormContext<BookingInput>();
  const t = useTranslations('booking.access');
  const selected = watch('accessMethod');

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-950">{t('heading')}</h2>
      <p className="mt-1 text-sm text-ink-800/70">{t('subheading')}</p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {accessMethods.map((method) => (
          <label key={method} className="flex cursor-pointer items-center gap-2 rounded-xl2 border border-pine-100 bg-white p-3 text-sm">
            <input type="radio" value={method} {...register('accessMethod')} />
            {t(labelKey[method])}
          </label>
        ))}
      </div>

      {selected === 'other' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-ink-950">{t('otherDetails')}</label>
          <input className="input mt-1" {...register('accessOtherDetails')} />
        </div>
      )}

      <p className="mt-6 rounded-xl2 bg-coral-400/10 p-4 text-sm text-coral-700">{t('sensitiveNotice')}</p>
    </div>
  );
}

export const accessStepFields: (keyof BookingInput)[] = ['accessMethod'];
