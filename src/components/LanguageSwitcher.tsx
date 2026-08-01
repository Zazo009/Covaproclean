'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/cn';

const labels: Record<string, string> = { en: 'EN', es: 'ES' };

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className={cn('flex items-center gap-1 rounded-full border border-pine-200 bg-white p-1', className)} role="group" aria-label="Language">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          aria-pressed={loc === locale}
          onClick={() => {
            document.cookie = `NEXT_LOCALE=${loc};path=/;max-age=31536000`;
            router.replace({ pathname, params } as never, { locale: loc });
          }}
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-semibold transition-colors',
            loc === locale ? 'bg-pine-700 text-white' : 'text-pine-700 hover:bg-pine-50'
          )}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
