'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { CheckCircle2 } from 'lucide-react';

export function ConfirmationStep({ bookingReference }: { bookingReference: string }) {
  const t = useTranslations('booking.confirmation');

  return (
    <div className="text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-pine-600" />
      <h2 className="mt-4 font-display text-2xl font-semibold text-ink-950">{t('heading')}</h2>
      <p className="mt-2 text-ink-800/75">{t('subheading')}</p>

      <div className="mx-auto mt-6 w-fit rounded-xl2 border border-pine-200 bg-pine-50 px-6 py-4">
        <p className="text-xs uppercase tracking-wide text-pine-700">{t('referenceLabel')}</p>
        <p className="mt-1 font-mono text-lg font-semibold text-ink-950">{bookingReference}</p>
        <p className="mt-2 text-sm font-medium text-coral-600">{t('statusPending')}</p>
      </div>

      <p className="mx-auto mt-4 max-w-md text-sm text-ink-800/70">{t('statusNote')}</p>

      <div className="mx-auto mt-8 max-w-md text-left">
        <h3 className="font-semibold text-ink-950">{t('nextStepsHeading')}</h3>
        <ol className="mt-3 space-y-2 text-sm text-ink-800/80">
          <li>1. {t('nextStep1')}</li>
          <li>2. {t('nextStep2')}</li>
          <li>3. {t('nextStep3')}</li>
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <WhatsAppCTA />
        <Link href="/" className="rounded-full border border-pine-200 px-5 py-2.5 text-sm font-medium text-pine-800">
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
