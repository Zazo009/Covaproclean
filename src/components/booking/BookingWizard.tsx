'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { bookingSchema, type BookingInput } from '@/lib/booking-schema';
import { Button } from '@/components/ui/Button';
import { BookingProgress } from './BookingProgress';
import { ServiceStep, serviceStepFields } from './steps/ServiceStep';
import { PropertyStep, propertyStepFields } from './steps/PropertyStep';
import { ScheduleStep, scheduleStepFields } from './steps/ScheduleStep';
import { ExtrasStep, extrasStepFields } from './steps/ExtrasStep';
import { DetailsStep, detailsStepFields } from './steps/DetailsStep';
import { SummaryStep, summaryStepFields } from './steps/SummaryStep';
import { ConfirmationStep } from './steps/ConfirmationStep';

const steps = [
  { Component: ServiceStep, fields: serviceStepFields },
  { Component: PropertyStep, fields: propertyStepFields },
  { Component: ScheduleStep, fields: scheduleStepFields },
  { Component: ExtrasStep, fields: extrasStepFields },
  { Component: DetailsStep, fields: detailsStepFields },
  { Component: SummaryStep, fields: summaryStepFields },
];

function track(name: string, detail?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('analytics:event', { detail: { name, ...detail } }));
  }
}

export function BookingWizard() {
  const locale = useLocale() as 'en' | 'es';
  const t = useTranslations('booking.errors');
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const methods = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    mode: 'onSubmit',
    defaultValues: {
      locale,
      extras: [],
      preferredTimeWindow: 'flexible',
      preferredContactMethod: 'email',
      marketingConsent: false,
      consentAccepted: false as unknown as true,
      company: '',
    },
  });

  const { trigger, handleSubmit, getValues } = methods;

  useEffect(() => {
    if (!started) {
      track('booking_started');
      setStarted(true);
    }
  }, [started]);

  const goNext = async () => {
    const isValid = await trigger((steps[stepIndex]?.fields ?? []) as (keyof BookingInput)[]);
    if (!isValid) return;
    track('booking_step_completed', { step: stepIndex });
    if (stepIndex === 0) track('service_selected', { service: getValues('serviceType') });
    setDirection('forward');
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setDirection('back');
    setStepIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: BookingInput) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });

      if (res.status === 429) {
        setSubmitError(t('duplicateSubmission'));
        track('booking_error', { reason: 'rate_limited' });
        return;
      }
      if (!res.ok) {
        setSubmitError(t('submissionFailed'));
        track('booking_error', { reason: 'server_error', status: res.status });
        return;
      }

      const json = (await res.json()) as { bookingReference: string };
      setBookingReference(json.bookingReference);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      track('booking_submitted', { service: data.serviceType });
    } catch {
      setSubmitError(t('networkError'));
      track('booking_error', { reason: 'network' });
    } finally {
      setSubmitting(false);
    }
  };

  if (bookingReference) {
    return <ConfirmationStep bookingReference={bookingReference} />;
  }

  const isLastStep = stepIndex === steps.length - 1;
  const StepComponent = steps[stepIndex]!.Component;

  return (
    <FormProvider {...methods}>
      <BookingProgress currentStep={stepIndex} />
      <form
        onSubmit={isLastStep ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
        noValidate
      >
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...methods.register('company')} aria-hidden="true" />

        <div key={stepIndex} className={direction === 'forward' ? 'animate-step-in' : 'animate-step-in-back'}>
          <StepComponent />
        </div>

        {submitError && <p className="mt-4 rounded-lg bg-coral-400/10 p-3 text-sm text-coral-700">{submitError}</p>}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button type="button" variant="secondary" onClick={goBack} disabled={stepIndex === 0}>
            <BackLabel />
          </Button>

          {isLastStep ? (
            <Button type="submit" disabled={submitting}>
              <SubmitLabel submitting={submitting} />
            </Button>
          ) : (
            <Button type="button" onClick={goNext}>
              <NextLabel />
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

function BackLabel() {
  const t = useTranslations('common');
  return <>{t('back')}</>;
}

function NextLabel() {
  const t = useTranslations('common');
  return <>{t('next')}</>;
}

function SubmitLabel({ submitting }: { submitting: boolean }) {
  const t = useTranslations('booking.summary');
  return <>{submitting ? t('submitting') : t('submit')}</>;
}
