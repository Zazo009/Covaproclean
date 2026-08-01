'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { site } from '@/config/site';
import { readConsent, CONSENT_EVENT, type ConsentState } from '@/lib/consent';

/**
 * Loads GA4 / GTM / Meta Pixel only once analytics/marketing consent is
 * granted and the corresponding ID is configured via env vars. Never fires
 * before consent — see `src/components/CookieBanner.tsx`.
 */
export function Analytics() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const handler = (e: Event) => setConsent((e as CustomEvent<ConsentState>).detail);
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  const analyticsAllowed = consent?.analytics && site.analytics.ga4Id;
  const marketingAllowed = consent?.marketing && site.analytics.metaPixelId;

  return (
    <>
      {analyticsAllowed && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.analytics.ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${site.analytics.ga4Id}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
      {marketingAllowed && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${site.analytics.metaPixelId}');
            fbq('track', 'PageView');`}
        </Script>
      )}
    </>
  );
}
