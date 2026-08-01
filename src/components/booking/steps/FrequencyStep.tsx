'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';
import { frequencies } from '@/config/booking';
import { cn } from '@/lib/cn';

const labelKey: Record<(typeof frequencies)[number], string> = {
  one_time: 'oneTime',
  weekly: 'weekly',
  biweekly: 'biweekly',
  monthly: 'monthly',
  multiple_weekly: 'multipleWeekly',
  custom: 'custom',
};

export function FrequencyStep() {
  const { register, watch } = useFormContext<BookingInput>();
  const t = useTranslations('booking.frequency');
  const selected = watch('frequency');

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-950">{t('heading')}</h2>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {frequencies.map((freq) => (
          <label
            key={freq}
            className={cn(
              'cursor-pointer rounded-xl2 border p-3 text-center text-sm font-medium transition-colors',
              selected === freq ? 'border-pine-700 bg-pine-50 text-pine-800' : 'border-pine-100 bg-white text-ink-800 hover:border-pine-300'
            )}
          >
            <input type="radio" value={freq} className="sr-only" {...register('frequency')} />
            {t(labelKey[freq])}
          </label>
        ))}
      </div>

      {selected === 'custom' && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-ink-950">{t('customSchedule')}</label>
          <textarea rows={3} className="input mt-1" {...register('customFrequencyDescription')} />
        </div>
      )}

      {selected && selected !== 'one_time' && (
        <p className="mt-4 text-xs text-ink-800/60">{t('discountNote')}</p>
      )}
    </div>
  );
}

export const frequencyStepFields: (keyof BookingInput)[] = ['frequency'];
