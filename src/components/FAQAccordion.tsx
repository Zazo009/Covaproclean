'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import type { FaqEntry } from '@/config/faqs';
import { cn } from '@/lib/cn';

export function FAQAccordion({ items }: { items: FaqEntry[] }) {
  const t = useTranslations('faq.items');
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-pine-100 rounded-xl2 border border-pine-100 bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine-600"
              >
                {t(`${item.id}.q`)}
                <ChevronDown className={cn('h-4 w-4 shrink-0 text-pine-600 transition-transform', isOpen && 'rotate-180')} />
              </button>
            </h3>
            <div id={`faq-panel-${item.id}`} role="region" className={cn('px-5 text-sm text-ink-800/80', isOpen ? 'block pb-4' : 'hidden')}>
              {t(`${item.id}.a`)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
