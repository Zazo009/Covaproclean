import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as (typeof routing.locales)[number])
    ? (requested as (typeof routing.locales)[number])
    : routing.defaultLocale;

  return {
    locale,
    timeZone: 'Europe/Madrid',
    messages: (await import(`../../messages/${locale}.json`)).default,
    onError(error) {
      if (process.env.NODE_ENV !== 'production') console.error('[i18n]', error.message);
    },
    getMessageFallback({ namespace, key }) {
      return `${namespace ?? ''}.${key}`;
    },
  };
});
