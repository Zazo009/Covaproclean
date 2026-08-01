'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/cn';
import { Menu, X } from 'lucide-react';

const navItems = [
  { key: 'services', href: '/services' },
  { key: 'pricing', href: '/pricing' },
  { key: 'areas', href: '/areas' },
  { key: 'holidayRental', href: '/holiday-rental-cleaning' },
  { key: 'commercial', href: '/commercial-cleaning' },
  { key: 'about', href: '/about' },
  { key: 'faq', href: '/faq' },
  { key: 'contact', href: '/contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-pine-100 bg-sand-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-pine-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pine-700 text-sm font-bold text-white">CPC</span>
          Cova Pro Clean
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'text-sm font-medium text-ink-800/80 transition-colors hover:text-pine-700',
                pathname === item.href && 'text-pine-700'
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/book"
            className="rounded-full bg-pine-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pine-800"
          >
            {t('book')}
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-full p-2 text-pine-800 lg:hidden"
          aria-expanded={open}
          aria-label={open ? t('close') : t('menu')}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-pine-100 bg-sand-50 lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-800 hover:bg-pine-50"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3 px-3 pt-2">
              <LanguageSwitcher />
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-pine-700 px-5 py-2.5 text-center text-sm font-medium text-white"
              >
                {t('book')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
