'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';
import { estimatePricing } from '@/lib/pricing';

export function SummaryStep() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<BookingInput>();
  const t = useTranslations('booking.summary');
  const tCommon = useTranslations('common');
  const tServices = useTranslations('services.items');
  const tExtras = useTranslations('extras.items');

  const values = watch();
  const pricing = estimatePricing({ serviceType: values.serviceType, extras: values.extras ?? [] });

  const priceLine =
    pricing.status === 'estimated'
      ? `${tCommon('from')} €${pricing.estimatedSubtotal}`
      : pricing.status === 'confirmed'
        ? `€${pricing.estimatedTotal}`
        : tCommon('quoteRequired');

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-950">{t('heading')}</h2>
      <p className="mt-1 text-sm text-ink-800/70">{t('subheading')}</p>

      <dl className="mt-6 space-y-3 rounded-xl2 border border-pine-100 bg-white p-5 text-sm">
        <Row label={t('service')} value={values.serviceType ? tServices(`${values.serviceType}.name`) : '—'} />
        <Row label={t('property')} value={[values.propertyType, values.city].filter(Boolean).join(', ') || '—'} />
        <Row label={t('frequency')} value={values.frequency ?? '—'} />
        <Row
          label={t('extras')}
          value={
            values.extras && values.extras.length > 0
              ? values.extras.map((e) => `${tExtras(`${e.id}.name`)} x${e.quantity}`).join(', ')
              : '—'
          }
        />
        <Row
          label={t('dateTime')}
          value={[values.preferredDate, values.preferredTimeWindow].filter(Boolean).join(' — ') || '—'}
        />
        {pricing.estimatedDurationMinutes && (
          <Row label={t('estimatedDuration')} value={`${pricing.estimatedDurationMinutes} ${tCommon('minutes')}`} />
        )}
        <Row label={t('estimatedPrice')} value={priceLine} />
      </dl>
      <p className="mt-2 text-xs text-ink-800/60">{t('priceNote')}</p>

      <div className="mt-6 rounded-xl2 bg-pine-50 p-5">
        <h3 className="font-semibold text-ink-950">{t('conditionsHeading')}</h3>
        <p className="mt-2 text-sm text-ink-800/80">{t('conditionsBody')}</p>
      </div>

      <label className="mt-6 flex items-start gap-2 text-sm text-ink-800/80">
        <input type="checkbox" className="mt-0.5" {...register('consentAccepted')} />
        {t('termsCheckbox')}
      </label>
      {errors.consentAccepted && <p className="mt-1 text-xs text-coral-600">{t('termsCheckbox')}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-pine-50 pb-2 last:border-0 last:pb-0">
      <dt className="text-ink-800/60">{label}</dt>
      <dd className="text-right font-medium text-ink-950">{value}</dd>
    </div>
  );
}

export const summaryStepFields: (keyof BookingInput)[] = ['consentAccepted'];
