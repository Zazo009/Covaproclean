import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from './ui/Container';
import { enabledServices } from '@/config/services';
import { enabledAreas } from '@/config/areas';
import { site } from '@/config/site';

const legalDocs = ['privacy', 'cookies', 'terms', 'booking-terms', 'cancellation', 'aviso-legal'] as const;
const legalLabels: Record<(typeof legalDocs)[number], string> = {
  privacy: 'privacy',
  cookies: 'cookies',
  terms: 'terms',
  'booking-terms': 'bookingTerms',
  cancellation: 'cancellation',
  'aviso-legal': 'avisoLegal',
};

export function Footer() {
  const t = useTranslations('footer');
  const tServices = useTranslations('services.items');
  const tAreas = useTranslations('areas.items');
  const tLegal = useTranslations('legal');
  const tNav = useTranslations('nav');

  const featuredServices = enabledServices().slice(0, 6);
  const featuredAreas = enabledAreas().slice(0, 8);

  return (
    <footer className="border-t border-pine-100 bg-ink-950 text-sand-100">
      <Container className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pine-600 text-sm font-bold text-white">CPC</span>
            Cova Pro Clean
          </Link>
          <p className="mt-3 max-w-xs text-sm text-sand-100/70">{t('tagline')}</p>
          <dl className="mt-6 space-y-1 text-sm text-sand-100/70">
            <div className="flex gap-2">
              <dt className="font-medium text-sand-100">{t('emailLabel')}:</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </dd>
            </div>
            {site.phone && (
              <div className="flex gap-2">
                <dt className="font-medium text-sand-100">{t('phoneLabel')}:</dt>
                <dd>{site.phone}</dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="font-medium text-sand-100">{t('hoursLabel')}:</dt>
              <dd>{t('hoursPlaceholder')}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{t('servicesHeading')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-sand-100/70">
            {featuredServices.map((s) => (
              <li key={s.slug}>
                <Link href={{ pathname: '/services/[slug]', params: { slug: s.slug } }} className="hover:text-white">
                  {tServices(`${s.slug}.name`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="font-medium text-sand-100 hover:text-white">
                {t('viewAllServices')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{t('areasHeading')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-sand-100/70">
            {featuredAreas.map((a) => (
              <li key={a.slug}>
                <Link href={{ pathname: '/areas/[slug]', params: { slug: a.slug } }} className="hover:text-white">
                  {tAreas(`${a.slug}.name`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas" className="font-medium text-sand-100 hover:text-white">
                {t('viewAllAreas')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{t('companyHeading')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-sand-100/70">
            <li>
              <Link href="/about" className="hover:text-white">
                {tNav('about')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                {tNav('contact')}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                {tNav('faq')}
              </Link>
            </li>
          </ul>
          <h3 className="mt-6 text-sm font-semibold text-white">{t('legalHeading')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-sand-100/70">
            {legalDocs.map((doc) => (
              <li key={doc}>
                <Link href={{ pathname: '/legal/[doc]', params: { doc } }} className="hover:text-white">
                  {tLegal(`${legalLabels[doc]}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-sand-100/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Cova Pro Clean. {t('rightsReserved')}
          </p>
          <p>Costa del Sol, Spain</p>
        </Container>
      </div>
    </footer>
  );
}
