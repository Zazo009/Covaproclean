'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';
import { frequencies } from '@/config/booking';
import { cn } from '@/lib/cn';
import { StepHeader } from './StepHeader';

const labelKey: Record<(typeof frequencies)[number], string> = {
  one_time: 'oneTime',
  weekly: 'weekly',
  biweekly: 'biweekly',
  monthly: 'monthly',
  multiple_weekly: 'multipleWeekly',
  custom: 'custom',
};

export function ScheduleStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<BookingInput>();
  const t = useTranslations('booking.frequency');
  const tDate = useTranslations('booking.dateTime');
  const selected = watch('frequency');
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <StepHeader variant="coast" heading={t('heading')} subheading={tDate('subheading')} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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

      {selected && selected !== 'one_time' && <p className="mt-4 text-xs text-ink-800/60">{t('discountNote')}</p>}

      <h3 className="mt-8 font-display text-base font-semibold text-ink-950">{tDate('heading')}</h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950">{tDate('preferredDate')}</label>
          <input type="date" min={today} className="input mt-1" {...register('preferredDate')} />
          {errors.preferredDate && <p className="mt-1 text-xs text-coral-600">{errors.preferredDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{tDate('preferredTimeWindow')}</label>
          <select className="input mt-1" {...register('preferredTimeWindow')}>
            <option value="morning">{tDate('morning')}</option>
            <option value="midday">{tDate('midday')}</option>
            <option value="afternoon">{tDate('afternoon')}</option>
            <option value="flexible">{tDate('flexible')}</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ink-950">{tDate('alternativeDate')}</label>
          <input type="date" min={today} className="input mt-1" {...register('alternativeDate')} />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <label className="flex items-center gap-2 text-sm text-ink-800/80">
          <input type="checkbox" {...register('isFlexible')} />
          {tDate('isFlexible')}
        </label>
        <label className="flex items-center gap-2 text-sm text-ink-800/80">
          <input type="checkbox" {...register('isUrgent')} />
          {tDate('isUrgent')}
        </label>
      </div>

      <p className="mt-6 rounded-xl2 bg-pine-50 p-4 text-sm text-pine-800">{tDate('pendingConfirmationNotice')}</p>
    </div>
  );
}

export const scheduleStepFields: (keyof BookingInput)[] = ['frequency', 'preferredDate', 'preferredTimeWindow'];
