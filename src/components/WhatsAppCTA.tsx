'use client';

import { useTranslations, useLocale } from 'next-intl';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

export function WhatsAppCTA({ className, variant = 'button' }: { className?: string; variant?: 'button' | 'fab' }) {
  const t = useTranslations('whatsapp');
  const locale = useLocale();

  const message = t('defaultMessage');
  const href = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
    : undefined;

  const track = () => {
    window.dispatchEvent(new CustomEvent('analytics:event', { detail: { name: 'whatsapp_clicked', locale } }));
  };

  if (!href) {
    return (
      <span className={cn('inline-flex items-center gap-2 rounded-full bg-pine-50 px-4 py-2 text-sm text-pine-700', className)}>
        {t('notConfigured')}
      </span>
    );
  }

  if (variant === 'fab') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={track}
        aria-label={t('cta')}
        className={cn(
          'fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition-transform hover:scale-105 md:bottom-6',
          className
        )}
      >
        <WhatsAppIcon />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={track}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1DA851]',
        className
      )}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {t('cta')}
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? 'h-6 w-6'} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.14h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.96-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42-.14 0-.31-.02-.47-.02-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.2 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}
