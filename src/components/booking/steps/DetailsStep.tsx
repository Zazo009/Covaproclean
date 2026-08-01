'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';
import { accessMethods, contactMethods } from '@/config/booking';
import { StepHeader } from './StepHeader';

const accessLabelKey: Record<(typeof accessMethods)[number], string> = {
  customer_present: 'customerPresent',
  key_pickup: 'keyPickup',
  key_safe: 'keySafe',
  concierge: 'concierge',
  property_manager: 'propertyManager',
  smart_lock: 'smartLock',
  alarm_code: 'alarmCode',
  other: 'other',
};

const contactLabelKey: Record<(typeof contactMethods)[number], string> = {
  email: 'contactEmail',
  phone: 'contactPhone',
  whatsapp: 'contactWhatsapp',
};

export function DetailsStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<BookingInput>();
  const t = useTranslations('booking.access');
  const tCustomer = useTranslations('booking.customer');
  const selected = watch('accessMethod');

  return (
    <div>
      <StepHeader variant="team" heading={tCustomer('heading')} subheading={t('subheading')} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950">{tCustomer('firstName')}</label>
          <input className="input mt-1" {...register('customerFirstName')} />
          {errors.customerFirstName && <p className="mt-1 text-xs text-coral-600">{errors.customerFirstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{tCustomer('lastName')}</label>
          <input className="input mt-1" {...register('customerLastName')} />
          {errors.customerLastName && <p className="mt-1 text-xs text-coral-600">{errors.customerLastName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{tCustomer('email')}</label>
          <input type="email" className="input mt-1" {...register('customerEmail')} />
          {errors.customerEmail && <p className="mt-1 text-xs text-coral-600">{errors.customerEmail.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{tCustomer('phone')}</label>
          <input type="tel" className="input mt-1" {...register('customerPhone')} />
          {errors.customerPhone && <p className="mt-1 text-xs text-coral-600">{errors.customerPhone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{tCustomer('whatsapp')}</label>
          <input type="tel" className="input mt-1" {...register('whatsappNumber')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{tCustomer('preferredContactMethod')}</label>
          <select className="input mt-1" {...register('preferredContactMethod')}>
            {contactMethods.map((m) => (
              <option key={m} value={m}>
                {tCustomer(contactLabelKey[m])}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{tCustomer('companyName')}</label>
          <input className="input mt-1" {...register('companyName')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{tCustomer('invoiceInfo')}</label>
          <input className="input mt-1" {...register('invoiceInfo')} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ink-950">{tCustomer('notes')}</label>
          <textarea rows={3} className="input mt-1" {...register('customerNotes')} />
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-ink-800/80">
        <input type="checkbox" {...register('marketingConsent')} />
        {tCustomer('marketingConsent')}
      </label>

      <h3 className="mt-8 font-display text-base font-semibold text-ink-950">{t('heading')}</h3>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {accessMethods.map((method) => (
          <label key={method} className="flex cursor-pointer items-center gap-2 rounded-xl2 border border-pine-100 bg-white p-3 text-sm">
            <input type="radio" value={method} {...register('accessMethod')} />
            {t(accessLabelKey[method])}
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

export const detailsStepFields: (keyof BookingInput)[] = [
  'customerFirstName',
  'customerLastName',
  'customerEmail',
  'customerPhone',
  'preferredContactMethod',
  'accessMethod',
];
