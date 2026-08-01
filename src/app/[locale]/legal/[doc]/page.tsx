import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { buildAlternates } from '@/lib/seo';

const docs = ['privacy', 'cookies', 'terms', 'booking-terms', 'cancellation', 'aviso-legal'] as const;
type Doc = (typeof docs)[number];
const keyMap: Record<Doc, string> = {
  privacy: 'privacy',
  cookies: 'cookies',
  terms: 'terms',
  'booking-terms': 'bookingTerms',
  cancellation: 'cancellation',
  'aviso-legal': 'avisoLegal',
};

export function generateStaticParams() {
  return docs.map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!docs.includes(doc as Doc)) return {};
  const t = await getTranslations({ locale, namespace: 'legal' });
  return {
    title: t(`${keyMap[doc as Doc]}.title`),
    alternates: buildAlternates(locale, { pathname: '/legal/[doc]', params: { doc } }),
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { locale, doc } = await params;
  setRequestLocale(locale);
  if (!docs.includes(doc as Doc)) notFound();
  const key = keyMap[doc as Doc];
  const t = await getTranslations('legal');

  return (
    <Container className="max-w-3xl py-16">
      <div className="mb-6 rounded-xl2 border border-coral-400/40 bg-coral-400/5 p-4 text-sm text-coral-700">{t('disclaimer')}</div>
      <h1 className="font-display text-3xl font-semibold text-ink-950">{t(`${key}.title`)}</h1>
      <p className="mt-4 text-ink-800/80">{t(`${key}.intro`)}</p>
      <p className="mt-4 whitespace-pre-line text-ink-800/80">{t(`${key}.body`)}</p>
    </Container>
  );
}
