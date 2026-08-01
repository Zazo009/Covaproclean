import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/ContactForm';
import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { site } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      <Hero headline={t('heading')} subheadline={t('subheading')} compact />
      <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink-950">{t('formHeading')}</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl2 border border-pine-100 bg-white p-6">
            <h3 className="font-semibold text-ink-950">{t('directHeading')}</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-800/60">{t('emailLabel')}</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="font-medium text-pine-700">
                    {site.email}
                  </a>
                </dd>
              </div>
              {site.phone && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-800/60">{t('phoneLabel')}</dt>
                  <dd className="text-ink-950">{site.phone}</dd>
                </div>
              )}
              {site.whatsapp && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-800/60">{t('whatsappLabel')}</dt>
                  <dd className="text-ink-950">{site.whatsapp}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt className="text-ink-800/60">{t('hoursLabel')}</dt>
                <dd className="text-ink-950">{t('hoursPlaceholder')}</dd>
              </div>
            </dl>
            {site.whatsapp && (
              <div className="mt-4">
                <WhatsAppCTA />
              </div>
            )}
          </div>

          <div className="rounded-xl2 border border-pine-100 bg-white p-6">
            <h3 className="font-semibold text-ink-950">{t('mapHeading')}</h3>
            <p className="mt-2 text-sm text-ink-800/70">{t('mapNote')}</p>
          </div>

          <div className="rounded-xl2 bg-pine-50 p-6">
            <h3 className="font-semibold text-ink-950">{t('quickBookHeading')}</h3>
            <ButtonLink href="/book" className="mt-4">
              {t('quickBookCta')}
            </ButtonLink>
          </div>

          <div className="rounded-xl2 bg-pine-800 p-6 text-white">
            <h3 className="font-semibold">{t('businessHeading')}</h3>
            <ButtonLink href="/commercial-cleaning" variant="secondary" className="mt-4">
              {t('businessCta')}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
