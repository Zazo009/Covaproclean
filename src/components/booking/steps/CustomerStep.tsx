'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { BookingInput } from '@/lib/booking-schema';
import { contactMethods } from '@/config/booking';

const contactLabelKey: Record<(typeof contactMethods)[number], string> = {
  email: 'contactEmail',
  phone: 'contactPhone',
  whatsapp: 'contactWhatsapp',
};

export function CustomerStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingInput>();
  const t = useTranslations('booking.customer');

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-950">{t('heading')}</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('firstName')}</label>
          <input className="input mt-1" {...register('customerFirstName')} />
          {errors.customerFirstName && <p className="mt-1 text-xs text-coral-600">{errors.customerFirstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('lastName')}</label>
          <input className="input mt-1" {...register('customerLastName')} />
          {errors.customerLastName && <p className="mt-1 text-xs text-coral-600">{errors.customerLastName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('email')}</label>
          <input type="email" className="input mt-1" {...register('customerEmail')} />
          {errors.customerEmail && <p className="mt-1 text-xs text-coral-600">{errors.customerEmail.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('phone')}</label>
          <input type="tel" className="input mt-1" {...register('customerPhone')} />
          {errors.customerPhone && <p className="mt-1 text-xs text-coral-600">{errors.customerPhone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('whatsapp')}</label>
          <input type="tel" className="input mt-1" {...register('whatsappNumber')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('preferredContactMethod')}</label>
          <select className="input mt-1" {...register('preferredContactMethod')}>
            {contactMethods.map((m) => (
              <option key={m} value={m}>
                {t(contactLabelKey[m])}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('companyName')}</label>
          <input className="input mt-1" {...register('companyName')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-950">{t('invoiceInfo')}</label>
          <input className="input mt-1" {...register('invoiceInfo')} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ink-950">{t('notes')}</label>
          <textarea rows={3} className="input mt-1" {...register('customerNotes')} />
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-ink-800/80">
        <input type="checkbox" {...register('marketingConsent')} />
        {t('marketingConsent')}
      </label>
    </div>
  );
}

export const customerStepFields: (keyof BookingInput)[] = [
  'customerFirstName',
  'customerLastName',
  'customerEmail',
  'customerPhone',
  'preferredContactMethod',
];
