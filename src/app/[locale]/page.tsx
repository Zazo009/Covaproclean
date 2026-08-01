import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ServiceCard } from '@/components/ServiceCard';
import { AreaCard } from '@/components/AreaCard';
import { TrustBadges } from '@/components/TrustBadges';
import { TestimonialCard } from '@/components/TestimonialCard';
import { FAQAccordion } from '@/components/FAQAccordion';
import { enabledServices } from '@/config/services';
import { enabledAreas } from '@/config/areas';
import { testimonials } from '@/config/testimonials';
import { faqs } from '@/config/faqs';
import { ClipboardList, CalendarCheck, Home as HomeIcon, Sparkles } from 'lucide-react';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  const tAreas = await getTranslations('areas');

  const featuredServices = enabledServices().slice(0, 6);
  const featuredAreas = enabledAreas().filter((a) => a.featured);
  const previewFaqs = faqs.slice(0, 6);

  return (
    <>
      <div className="bg-pine-900 py-2 text-center text-xs font-medium text-white">
        <Container>{t('announcementBar')}</Container>
      </div>

      <Hero
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        subheadline={t('hero.subheadline')}
        microTrust={t('hero.microTrust')}
        actions={
          <>
            <ButtonLink href="/book" size="lg">
              {t('hero.primaryCta')}
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              {t('hero.secondaryCta')}
            </ButtonLink>
          </>
        }
      />

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-950">{t('categories.heading')}</h2>
            <p className="mt-3 text-ink-800/75">{t('categories.subheading')}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/services" variant="secondary">
              {tCommon('learnMore')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-950">{t('howItWorks.heading')}</h2>
            <p className="mt-3 text-ink-800/75">{t('howItWorks.subheading')}</p>
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ClipboardList, title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc') },
              { icon: HomeIcon, title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc') },
              { icon: CalendarCheck, title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc') },
              { icon: Sparkles, title: t('howItWorks.step4Title'), desc: t('howItWorks.step4Desc') },
            ].map((step, i) => (
              <li key={step.title} className="relative rounded-xl2 border border-pine-100 p-6">
                <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-pine-700 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <step.icon className="mt-2 h-6 w-6 text-pine-600" />
                <h3 className="mt-3 font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-800/70">{step.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-950">{t('whyChoose.heading')}</h2>
            <p className="mt-3 text-ink-800/75">{t('whyChoose.subheading')}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              [t('whyChoose.point1Title'), t('whyChoose.point1Desc')],
              [t('whyChoose.point2Title'), t('whyChoose.point2Desc')],
              [t('whyChoose.point3Title'), t('whyChoose.point3Desc')],
              [t('whyChoose.point4Title'), t('whyChoose.point4Desc')],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl2 bg-white p-6 shadow-card">
                <h3 className="font-semibold text-ink-950">{title}</h3>
                <p className="mt-2 text-sm text-ink-800/70">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-pine-800 py-20 text-white">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <h3 className="font-display text-xl font-semibold">{t('recurring.heading')}</h3>
            <p className="mt-2 text-sm text-white/80">{t('recurring.desc')}</p>
            <ButtonLink href="/book" variant="secondary" size="md" className="mt-4">
              {t('recurring.cta')}
            </ButtonLink>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">{t('holidayRental.heading')}</h3>
            <p className="mt-2 text-sm text-white/80">{t('holidayRental.desc')}</p>
            <ButtonLink href="/holiday-rental-cleaning" variant="secondary" size="md" className="mt-4">
              {t('holidayRental.cta')}
            </ButtonLink>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">{t('commercial.heading')}</h3>
            <p className="mt-2 text-sm text-white/80">{t('commercial.desc')}</p>
            <ButtonLink href="/commercial-cleaning" variant="secondary" size="md" className="mt-4">
              {t('commercial.cta')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-950">{t('trust.heading')}</h2>
            <p className="mt-3 text-ink-800/75">{t('trust.subheading')}</p>
          </div>
          <div className="mt-10">
            <TrustBadges />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <h2 className="text-center font-display text-3xl font-semibold text-ink-950">{tAreas('pageTitle')}</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredAreas.map((area) => (
              <AreaCard key={area.slug} area={area} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/areas" variant="secondary">
              {tCommon('learnMore')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-center font-display text-3xl font-semibold text-ink-950">{t('testimonialsHeading')}</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-ink-800/60">{t('testimonialsNote')}</p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          <h2 className="text-center font-display text-3xl font-semibold text-ink-950">{t('faqPreviewHeading')}</h2>
          <div className="mt-8">
            <FAQAccordion items={previewFaqs} />
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/faq" variant="secondary">
              {t('faqPreviewCta')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-ink-950 py-20 text-white">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-semibold">{t('finalCta.heading')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">{t('finalCta.desc')}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/book" size="lg">
              {t('finalCta.primaryCta')}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
