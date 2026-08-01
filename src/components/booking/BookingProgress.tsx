import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { Check } from 'lucide-react';

const stepKeys = ['service', 'property', 'schedule', 'extras', 'details', 'summary'] as const;

export function BookingProgress({ currentStep }: { currentStep: number }) {
  const t = useTranslations('booking');
  const tSteps = useTranslations('booking.steps');

  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-pine-700">
        {t('progress', { current: currentStep + 1, total: stepKeys.length })}
      </p>

      <div className="mt-3 flex items-center">
        {stepKeys.map((key, i) => (
          <div key={key} className="flex flex-1 items-center last:flex-none">
            <div
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-300',
                i < currentStep
                  ? 'bg-pine-700 text-white'
                  : i === currentStep
                    ? 'bg-pine-700 text-white ring-4 ring-pine-100'
                    : 'bg-pine-100 text-pine-700/60'
              )}
              aria-hidden="true"
            >
              {i < currentStep ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            {i < stepKeys.length - 1 && (
              <div className="mx-1 h-1 flex-1 overflow-hidden rounded-full bg-pine-100">
                <div
                  className="h-full rounded-full bg-pine-700 transition-all duration-500 ease-out"
                  style={{ width: i < currentStep ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-3 text-sm font-medium text-ink-950">{tSteps(stepKeys[currentStep])}</p>
    </div>
  );
}

export const bookingStepKeys = stepKeys;
