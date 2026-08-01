import { useTranslations } from 'next-intl';
import type { Testimonial } from '@/config/testimonials';
import { Star } from 'lucide-react';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const tCommon = useTranslations('common');
  const tServices = useTranslations('services.items');
  const tAreas = useTranslations('areas.items');
  const tTestimonial = useTranslations(`testimonialsContent.${testimonial.id}`);

  return (
    <figure className="flex h-full flex-col rounded-xl2 border border-pine-100 bg-white p-6 shadow-card">
      {testimonial.isPlaceholder && (
        <span className="mb-3 inline-block w-fit rounded-full bg-coral-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-coral-600">
          {tCommon('sampleTestimonial')}
        </span>
      )}
      <div className="flex gap-0.5 text-coral-500" aria-label={`${testimonial.rating} / 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4" fill={i < testimonial.rating ? 'currentColor' : 'none'} />
        ))}
      </div>
      <blockquote className="mt-3 flex-1 text-sm text-ink-800/85">&ldquo;{tTestimonial('quote')}&rdquo;</blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-semibold text-ink-950">{tTestimonial('name')}</span>
        <span className="text-ink-800/60">
          {' '}
          &middot; {tAreas(`${testimonial.areaSlug}.name`)} &middot; {tServices(`${testimonial.serviceSlug}.name`)}
        </span>
      </figcaption>
    </figure>
  );
}
