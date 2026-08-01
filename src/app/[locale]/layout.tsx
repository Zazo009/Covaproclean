import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getTranslations, getMessages, getTimeZone, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Fraunces } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { IntlProvider } from '@/components/IntlProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { CookieBanner } from '@/components/CookieBanner';
import { Analytics } from '@/components/Analytics';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/config/site';
import '../globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['500', '600'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(site.domain),
    title: { default: t('defaultTitle'), template: `%s | ${t('siteName')}` },
    description: t('defaultDescription'),
    // No site-wide `alternates` here on purpose — every page below sets its
    // own canonical/hreflang via `buildAlternates()` (see src/lib/seo.ts).
    // A single shared default here would silently become every page's
    // canonical if that page forgot to override it (a real duplicate-
    // content bug, not just a testing artifact).
    icons: { icon: '/favicon.ico', apple: '/icon.png' },
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.domain}/#organization`,
    name: site.name,
    email: site.email,
    url: site.domain,
    areaServed: 'Costa del Sol, Spain',
    additionalType: 'https://schema.org/CleaningService',
  };

  return (
    <html lang={locale} className={`${sans.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col bg-sand-50 font-sans text-ink-950 antialiased">
        <IntlProvider locale={locale} messages={messages} timeZone={timeZone}>
          <JsonLd data={organizationJsonLd} />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-pine-700 focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <Footer />
          <StickyMobileCTA />
          <WhatsAppCTA variant="fab" className="hidden md:flex" />
          <CookieBanner />
          <Analytics />
        </IntlProvider>
      </body>
    </html>
  );
}
