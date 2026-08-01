import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/services': { en: '/services', es: '/servicios' },
    '/services/[slug]': { en: '/services/[slug]', es: '/servicios/[slug]' },
    '/book': { en: '/book', es: '/reservar' },
    '/pricing': { en: '/pricing', es: '/precios' },
    '/areas': { en: '/areas', es: '/zonas' },
    '/areas/[slug]': { en: '/areas/[slug]', es: '/zonas/[slug]' },
    '/holiday-rental-cleaning': { en: '/holiday-rental-cleaning', es: '/limpieza-alquiler-vacacional' },
    '/commercial-cleaning': { en: '/commercial-cleaning', es: '/limpieza-comercial' },
    '/about': { en: '/about', es: '/nosotros' },
    '/contact': { en: '/contact', es: '/contacto' },
    '/faq': { en: '/faq', es: '/preguntas-frecuentes' },
    '/legal/[doc]': { en: '/legal/[doc]', es: '/legal/[doc]' },
    '/booking/confirmation': { en: '/booking/confirmation', es: '/reserva/confirmacion' },
  },
});
