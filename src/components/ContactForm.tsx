'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import { Button } from './ui/Button';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale() as 'en' | 'es';
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { locale, enquiryType: 'general', consentAccepted: undefined as unknown as true },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('company')} aria-hidden="true" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink-950">
          {t('name')}
        </label>
        <input id="name" className="mt-1 w-full rounded-lg border border-pine-200 px-3 py-2 text-sm" {...register('name')} />
        {errors.name && <p className="mt-1 text-xs text-coral-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-950">
          {t('email')}
        </label>
        <input id="email" type="email" className="mt-1 w-full rounded-lg border border-pine-200 px-3 py-2 text-sm" {...register('email')} />
        {errors.email && <p className="mt-1 text-xs text-coral-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink-950">
          {t('phone')}
        </label>
        <input id="phone" className="mt-1 w-full rounded-lg border border-pine-200 px-3 py-2 text-sm" {...register('phone')} />
      </div>

      <div>
        <label htmlFor="enquiryType" className="block text-sm font-medium text-ink-950">
          {t('enquiryType')}
        </label>
        <select id="enquiryType" className="mt-1 w-full rounded-lg border border-pine-200 px-3 py-2 text-sm" {...register('enquiryType')}>
          <option value="general">{t('enquiryGeneral')}</option>
          <option value="business">{t('enquiryBusiness')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink-950">
          {t('message')}
        </label>
        <textarea id="message" rows={5} className="mt-1 w-full rounded-lg border border-pine-200 px-3 py-2 text-sm" {...register('message')} />
        {errors.message && <p className="mt-1 text-xs text-coral-600">{errors.message.message}</p>}
      </div>

      <label className="flex items-start gap-2 text-xs text-ink-800/80">
        <input type="checkbox" className="mt-0.5" {...register('consentAccepted')} />
        {t('consent')}
      </label>
      {errors.consentAccepted && <p className="text-xs text-coral-600">{t('consent')}</p>}

      <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
        {t('submit')}
      </Button>

      {status === 'success' && <p className="text-sm text-pine-700">{t('success')}</p>}
      {status === 'error' && <p className="text-sm text-coral-600">{t('error')}</p>}
    </form>
  );
}
