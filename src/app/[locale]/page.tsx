import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ServiceCard } from '@/components/ServiceCard';
import { AreaCard } from '@/components/AreaCard';
import { TrustBadges } from '@/components/TrustBadges';
import { TestimonialCard } from '@/components/TestimonialCard';
import { FAQAccordion } from '@/components/FAQAccordion';
import { PhotoSlot } from '@/components/PhotoSlot';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { Reveal } from '@/components/Reveal';
import { StatCounter } from '@/components/StatCounter';
import { InstantEstimateCard } from '@/components/InstantEstimateCard';
import { CostaSkyline } from '@/components/illustrations/CostaSkyline';
import { enabledServices } from '@/config/services';
import { enabledAreas } from '@/config/areas';
import { testimonials } from '@/config/testimonials';
import { faqs } from '@/config/faqs';
import {
  ClipboardList,
  CalendarCheck,
  Home as HomeIcon,
  Sparkles,
  MapPin,
  MessageCircleHeart,
  Building,
  Palmtree,
  Repeat,
} from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: buildAlternates(locale, '/') };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tAreas = await getTranslations('areas');

  const featuredServices = enabledServices().slice(0, 6);
  const featuredAreas = enabledAreas().filter((a) => a.featured);
  const previewFaqs = faqs.slice(0, 6);

  return (
    <>
      <div className="bg-pine-900 py-2 text-center text-xs font-medium text-white">
        <Container className="flex items-center justify-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-pine-300" aria-hidden />
          {t('announcementBar')}
        </Container>
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
        visual={
          <div className="overflow-hidden rounded-xl2 border border-pine-200/60 shadow-soft">
            <CostaSkyline className="h-full w-full" />
          </div>
        }
      />

      <div className="relative z-10 -mt-8 px-4 sm:-mt-14 sm:px-6 lg:-mt-20 lg:px-8">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-8 rounded-xl2 border border-pine-100 bg-sand-50 p-6 shadow-soft sm:p-8 lg:grid-cols-5 lg:items-start lg:gap-10">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-3 gap-4 rounded-xl2 border border-pine-100 bg-white p-5 shadow-card sm:gap-6 sm:p-6">
                  <StatCounter value={enabledServices().length} label={t('quickStart.statServices')} suffix="+" />
                  <StatCounter value={enabledAreas().length} label={t('quickStart.statAreas')} suffix="+" />
                  <StatCounter value={6} label={t('quickStart.statSteps')} />
                </div>
              </div>
              <div className="lg:col-span-3">
                <InstantEstimateCard services={featuredServices.slice(0, 5)} />
              </div>
            </div>
          </Reveal>
        </Container>
      </div>

      <section className="pb-20 pt-12 sm:pt-16">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-950">{t('categories.heading')}</h2>
            <p className="mt-3 text-ink-800/75">{t('categories.subheading')}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, i) => (
              <Reveal key={service.slug} delay={i * 80}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/services" variant="secondary">
              {t('categories.viewAllCta')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-950">{t('howItWorks.heading')}</h2>
            <p className="mt-3 text-ink-800/75">{t('howItWorks.subheading')}</p>
          </Reveal>
          <ol className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-4 hidden h-px bg-gradient-to-r from-pine-200 via-pine-300 to-pine-200 lg:block"
            />
            {[
              { icon: ClipboardList, title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc') },
              { icon: HomeIcon, title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc') },
              { icon: CalendarCheck, title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc') },
              { icon: Sparkles, title: t('howItWorks.step4Title'), desc: t('howItWorks.step4Desc') },
            ].map((step, i) => (
              <li key={step.title} className="relative h-full">
                <Reveal delay={i * 100} className="group relative h-full rounded-xl2 border border-pine-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-pine-300 hover:shadow-soft">
                  <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-pine-700 text-sm font-bold text-white ring-4 ring-white transition-transform group-hover:scale-110">
                    {i + 1}
                  </span>
                  <step.icon className="mt-2 h-6 w-6 text-pine-600 transition-transform group-hover:-translate-y-0.5" />
                  <h3 className="mt-3 font-semibold text-ink-950">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-800/70">{step.desc}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-sand-100/60 py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-950">{t('showcase.heading')}</h2>
            <p className="mt-3 text-ink-800/75">{t('showcase.subheading')}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Reveal delay={0}>
              <PhotoSlot variant="villa" caption={t('showcase.villa')} />
            </Reveal>
            <Reveal delay={100} className="sm:-mt-6">
              <PhotoSlot variant="interior" caption={t('showcase.interior')} aspect="aspect-[4/5] sm:aspect-[4/6]" />
            </Reveal>
            <Reveal delay={200}>
              <PhotoSlot variant="coast" caption={t('showcase.coast')} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-950">{t('whyChoose.heading')}</h2>
            <p className="mt-3 text-ink-800/75">{t('whyChoose.subheading')}</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              { icon: ClipboardList, title: t('whyChoose.point1Title'), desc: t('whyChoose.point1Desc') },
              { icon: MessageCircleHeart, title: t('whyChoose.point2Title'), desc: t('whyChoose.point2Desc') },
              { icon: HomeIcon, title: t('whyChoose.point3Title'), desc: t('whyChoose.point3Desc') },
              { icon: MapPin, title: t('whyChoose.point4Title'), desc: t('whyChoose.point4Desc') },
            ].map((point, i) => (
              <Reveal key={point.title} delay={i * 80}>
                <div className="group flex gap-4 rounded-xl2 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pine-50 text-pine-700 transition-colors group-hover:bg-pine-700 group-hover:text-white">
                    <point.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink-950">{point.title}</h3>
                    <p className="mt-2 text-sm text-ink-800/70">{point.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-pine-800 py-20 text-white">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {[
            { icon: Repeat, heading: t('recurring.heading'), desc: t('recurring.desc'), cta: t('recurring.cta'), href: '/book' as const },
            {
              icon: Palmtree,
              heading: t('holidayRental.heading'),
              desc: t('holidayRental.desc'),
              cta: t('holidayRental.cta'),
              href: '/holiday-rental-cleaning' as const,
            },
            {
              icon: Building,
              heading: t('commercial.heading'),
              desc: t('commercial.desc'),
              cta: t('commercial.cta'),
              href: '/commercial-cleaning' as const,
            },
          ].map((block, i) => (
            <Reveal key={block.heading} delay={i * 100}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                <block.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{block.heading}</h3>
              <p className="mt-2 text-sm text-white/80">{block.desc}</p>
              <ButtonLink href={block.href} variant="secondary" size="md" className="mt-4">
                {block.cta}
              </ButtonLink>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-950">{t('trust.heading')}</h2>
            <p className="mt-3 text-ink-800/75">{t('trust.subheading')}</p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <TrustBadges />
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold text-ink-950">{tAreas('pageTitle')}</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredAreas.map((area, i) => (
              <Reveal key={area.slug} delay={i * 80}>
                <AreaCard area={area} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/areas" variant="secondary">
              {t('viewAllAreasCta')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-semibold text-ink-950">{t('testimonialsHeading')}</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-ink-800/60">{t('testimonialsNote')}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.id} delay={i * 100}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold text-ink-950">{t('faqPreviewHeading')}</h2>
          </Reveal>
          <Reveal delay={100} className="mt-8">
            <FAQAccordion items={previewFaqs} />
          </Reveal>
          <div className="mt-8 text-center">
            <ButtonLink href="/faq" variant="secondary">
              {t('faqPreviewCta')}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-ink-950 py-20 text-white">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold">{t('finalCta.heading')}</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">{t('finalCta.desc')}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/book" size="lg">
                {t('finalCta.primaryCta')}
              </ButtonLink>
              <WhatsAppCTA variant="button" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-wide text-white/50">{t('finalCta.microTrust')}</p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
