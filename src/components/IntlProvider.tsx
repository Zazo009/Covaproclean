'use client';

import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';
import type { ReactNode } from 'react';

export function IntlProvider({
  locale,
  messages,
  timeZone,
  children,
}: {
  locale: string;
  messages: AbstractIntlMessages;
  timeZone: string;
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
      onError={(error) => {
        if (process.env.NODE_ENV !== 'production') console.error('[i18n:client]', error.message);
      }}
      getMessageFallback={({ namespace, key }) => `${namespace ?? ''}.${key}`}
    >
      {children}
    </NextIntlClientProvider>
  );
}
