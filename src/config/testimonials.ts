/**
 * Placeholder testimonials only. `isPlaceholder: true` must stay set until
 * the business supplies genuine, consented customer reviews — the UI
 * renders a visible "sample" label whenever this flag is true.
 */
export interface Testimonial {
  id: string;
  isPlaceholder: boolean;
  rating: number;
  serviceSlug: string;
  areaSlug: string;
  date: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  { id: 'sample-1', isPlaceholder: true, rating: 5, serviceSlug: 'regular-home-cleaning', areaSlug: 'marbella', date: '2026-01-15', verified: false },
  { id: 'sample-2', isPlaceholder: true, rating: 5, serviceSlug: 'holiday-rental-cleaning', areaSlug: 'puerto-banus', date: '2026-02-02', verified: false },
  { id: 'sample-3', isPlaceholder: true, rating: 4, serviceSlug: 'office-commercial-cleaning', areaSlug: 'estepona', date: '2026-02-20', verified: false },
];
