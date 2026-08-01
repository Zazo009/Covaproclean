'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { WhatsAppCTA } from './WhatsAppCTA';

export function StickyMobileCTA() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  // Redundant on the booking page itself — the wizard has its own
  // Back/Next/Submit controls, and this bar would sit on top of them.
  if (pathname === '/book') return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-pine-100 bg-white/95 p-3 backdrop-blur md:hidden" role="region" aria-label="Quick actions">
      <Link
        href="/book"
        className="flex-1 rounded-full bg-pine-700 px-4 py-3 text-center text-sm font-semibold text-white"
      >
        {t('book')}
      </Link>
      <WhatsAppCTA className="!px-4" />
    </div>
  );
}
