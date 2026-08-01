'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';
import { enabledServices } from '@/config/services';
import { cn } from '@/lib/cn';

export function ServiceStep() {
  const { register, watch } = useFormContext<BookingInput>();
  const t = useTranslations('booking.service');
  const tServices = useTranslations('services.items');
  const selected = watch('serviceType');

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-950">{t('heading')}</h2>
      <p className="mt-1 text-sm text-ink-800/70">{t('subheading')}</p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {enabledServices().map((service) => (
          <label
            key={service.slug}
            className={cn(
              'cursor-pointer rounded-xl2 border p-4 transition-colors',
              selected === service.slug ? 'border-pine-700 bg-pine-50' : 'border-pine-100 bg-white hover:border-pine-300'
            )}
          >
            <input type="radio" value={service.slug} className="sr-only" {...register('serviceType')} />
            <span className="block font-semibold text-ink-950">{tServices(`${service.slug}.name`)}</span>
            <span className="mt-1 block text-xs text-ink-800/70">{tServices(`${service.slug}.shortDescription`)}</span>
          </label>
        ))}
      </div>

      {selected === 'custom-cleaning-request' && (
        <div className="mt-6">
          <label htmlFor="customServiceDescription" className="block text-sm font-medium text-ink-950">
            {t('customServiceDesc')}
          </label>
          <textarea
            id="customServiceDescription"
            rows={4}
            className="mt-1 w-full rounded-lg border border-pine-200 px-3 py-2 text-sm"
            {...register('customServiceDescription')}
          />
        </div>
      )}
    </div>
  );
}

export const serviceStepFields: (keyof BookingInput)[] = ['serviceType'];
