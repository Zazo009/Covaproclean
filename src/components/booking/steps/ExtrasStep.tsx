'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';
import { enabledExtras } from '@/config/extras';
import { getService } from '@/config/services';
import { cn } from '@/lib/cn';
import { StepHeader } from './StepHeader';

export function ExtrasStep() {
  const { watch, setValue } = useFormContext<BookingInput>();
  const t = useTranslations('booking.extras');
  const tCommon = useTranslations('common');
  const tExtras = useTranslations('extras.items');
  const selected = watch('extras') ?? [];
  const serviceType = watch('serviceType');
  const service = getService(serviceType);

  const extraMinutes = selected.reduce((sum, sel) => {
    const extra = enabledExtras().find((e) => e.id === sel.id);
    return sum + (extra ? extra.estimatedMinutes * sel.quantity : 0);
  }, 0);
  const baseRange = service?.durationRangeMinutes;
  const totalMin = baseRange ? baseRange[0] + extraMinutes : null;
  const totalMax = baseRange ? baseRange[1] + extraMinutes : null;

  const isSelected = (id: string) => selected.some((e) => e.id === id);
  const quantityOf = (id: string) => selected.find((e) => e.id === id)?.quantity ?? 1;

  const toggle = (id: string) => {
    if (isSelected(id)) {
      setValue(
        'extras',
        selected.filter((e) => e.id !== id)
      );
    } else {
      setValue('extras', [...selected, { id, quantity: 1 }]);
    }
  };

  const setQuantity = (id: string, quantity: number) => {
    setValue(
      'extras',
      selected.map((e) => (e.id === id ? { ...e, quantity } : e))
    );
  };

  return (
    <div>
      <StepHeader variant="interior" heading={t('heading')} subheading={t('subheading')} />

      {totalMin !== null && totalMax !== null && (
        <div
          key={`${extraMinutes}-${selected.length}`}
          className="animate-pop-in mb-6 flex items-center justify-between rounded-xl2 border border-pine-200 bg-pine-50 px-5 py-3"
        >
          <span className="text-sm font-medium text-pine-800">{t('runningTotalLabel')}</span>
          <span className="font-display text-lg font-semibold text-pine-800">
            {t('runningTotal', { min: totalMin, max: totalMax })}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {enabledExtras().map((extra) => {
          const active = isSelected(extra.id);
          const priceLabel =
            extra.pricingModel === 'from' && extra.fromPrice !== null
              ? `${tCommon('from')} €${extra.fromPrice}`
              : tCommon('quoteRequired');

          return (
            <div
              key={extra.id}
              className={cn(
                'rounded-xl2 border p-4 transition-colors',
                active ? 'border-pine-700 bg-pine-50' : 'border-pine-100 bg-white'
              )}
            >
              <label className="flex cursor-pointer items-start justify-between gap-2">
                <span>
                  <span className="block font-medium text-ink-950">{tExtras(`${extra.id}.name`)}</span>
                  <span className="mt-0.5 block text-xs text-ink-800/70">{tExtras(`${extra.id}.description`)}</span>
                  <span className="mt-1 block text-xs font-semibold text-pine-700">
                    {priceLabel} &middot; {t('estimatedTime', { minutes: extra.estimatedMinutes })}
                  </span>
                </span>
                <input type="checkbox" checked={active} onChange={() => toggle(extra.id)} className="mt-1" />
              </label>
              {active && extra.allowQuantity && (
                <div className="mt-3 flex items-center gap-2">
                  <label className="text-xs text-ink-800/70">{t('quantity')}</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={quantityOf(extra.id)}
                    onChange={(e) => setQuantity(extra.id, Number(e.target.value) || 1)}
                    className="input w-20"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const extrasStepFields: (keyof BookingInput)[] = [];
