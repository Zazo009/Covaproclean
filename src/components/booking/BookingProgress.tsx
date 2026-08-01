import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';

const stepKeys = [
  'service',
  'location',
  'propertyDetails',
  'frequency',
  'extras',
  'dateTime',
  'access',
  'customer',
  'summary',
] as const;

export function BookingProgress({ currentStep }: { currentStep: number }) {
  const t = useTranslations('booking');
  const tSteps = useTranslations('booking.steps');

  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-pine-700">
        {t('progress', { current: currentStep + 1, total: stepKeys.length })}
      </p>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-pine-100">
        <div
          className="h-full rounded-full bg-pine-700 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / stepKeys.length) * 100}%` }}
        />
      </div>
      <p className="mt-2 text-sm font-medium text-ink-950">{tSteps(stepKeys[currentStep])}</p>
    </div>
  );
}

export const bookingStepKeys = stepKeys;
