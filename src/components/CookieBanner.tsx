'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { readConsent, writeConsent, type ConsentState } from '@/lib/consent';

export function CookieBanner() {
  const t = useTranslations('cookieConsent');
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
  }, []);

  const save = (state: ConsentState) => {
    writeConsent(state);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t('heading')}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-pine-100 bg-white p-4 shadow-soft sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-xl2 sm:border"
    >
      <h2 className="text-sm font-semibold text-ink-950">{t('heading')}</h2>
      <p className="mt-1.5 text-xs text-ink-800/75">{t('body')}</p>

      {customizing && (
        <div className="mt-3 space-y-2">
          <label className="flex items-center justify-between text-xs text-ink-800/80">
            <span>
              <span className="font-medium text-ink-950">{t('necessary')}</span> — {t('necessaryDesc')}
            </span>
            <input type="checkbox" checked disabled aria-label={t('necessary')} />
          </label>
          <label className="flex items-center justify-between text-xs text-ink-800/80">
            <span>
              <span className="font-medium text-ink-950">{t('analytics')}</span> — {t('analyticsDesc')}
            </span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              aria-label={t('analytics')}
            />
          </label>
          <label className="flex items-center justify-between text-xs text-ink-800/80">
            <span>
              <span className="font-medium text-ink-950">{t('marketing')}</span> — {t('marketingDesc')}
            </span>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              aria-label={t('marketing')}
            />
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => save({ necessary: true, analytics: true, marketing: true })}
          className="rounded-full bg-pine-700 px-4 py-2 text-xs font-semibold text-white"
        >
          {t('acceptAll')}
        </button>
        <button
          type="button"
          onClick={() => save({ necessary: true, analytics: false, marketing: false })}
          className="rounded-full border border-pine-200 px-4 py-2 text-xs font-semibold text-pine-800"
        >
          {t('rejectNonEssential')}
        </button>
        {customizing ? (
          <button
            type="button"
            onClick={() => save({ necessary: true, analytics, marketing })}
            className="rounded-full border border-pine-200 px-4 py-2 text-xs font-semibold text-pine-800"
          >
            {t('save')}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCustomizing(true)}
            className="rounded-full px-4 py-2 text-xs font-semibold text-pine-700 underline"
          >
            {t('customize')}
          </button>
        )}
      </div>
      <Link href={{ pathname: '/legal/[doc]', params: { doc: 'cookies' } }} className="mt-2 inline-block text-[11px] text-pine-700 underline">
        {t('policyLink')}
      </Link>
    </div>
  );
}
