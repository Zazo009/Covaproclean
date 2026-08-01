/**
 * Structural service catalogue. All customer-facing copy (name, descriptions,
 * inclusions, FAQs) lives in the translation messages under
 * `services.items.<slug>` so English/Spanish never drift out of sync.
 * Toggle `enabled: false` to hide a service without deleting it.
 */
export type PricingModel = 'from' | 'quote' | 'calculated';

export interface ServiceConfig {
  slug: string;
  category: 'residential' | 'holiday-rental' | 'commercial' | 'specialty';
  enabled: boolean;
  pricingModel: PricingModel;
  /** Starting price placeholder, only used when pricingModel === 'from'. Leave null until confirmed. */
  fromPrice: number | null;
  durationRangeMinutes: [number, number];
  suitableProperties: Array<'apartment' | 'villa' | 'townhouse' | 'office' | 'commercial'>;
  bookable: boolean;
}

export const services: ServiceConfig[] = [
  { slug: 'regular-home-cleaning', category: 'residential', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [90, 180], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'one-time-home-cleaning', category: 'residential', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [120, 240], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'deep-cleaning', category: 'residential', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [180, 360], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'holiday-rental-cleaning', category: 'holiday-rental', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [60, 180], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'move-in-move-out-cleaning', category: 'residential', enabled: true, pricingModel: 'quote', fromPrice: null, durationRangeMinutes: [180, 420], suitableProperties: ['apartment', 'villa', 'townhouse', 'office'], bookable: true },
  { slug: 'post-construction-cleaning', category: 'specialty', enabled: true, pricingModel: 'quote', fromPrice: null, durationRangeMinutes: [240, 600], suitableProperties: ['apartment', 'villa', 'townhouse', 'office', 'commercial'], bookable: true },
  { slug: 'office-commercial-cleaning', category: 'commercial', enabled: true, pricingModel: 'quote', fromPrice: null, durationRangeMinutes: [60, 240], suitableProperties: ['office', 'commercial'], bookable: true },
  { slug: 'villa-luxury-property-cleaning', category: 'residential', enabled: true, pricingModel: 'quote', fromPrice: null, durationRangeMinutes: [120, 360], suitableProperties: ['villa'], bookable: true },
  { slug: 'community-common-area-cleaning', category: 'commercial', enabled: true, pricingModel: 'quote', fromPrice: null, durationRangeMinutes: [60, 240], suitableProperties: ['commercial'], bookable: true },
  { slug: 'window-cleaning', category: 'specialty', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [45, 150], suitableProperties: ['apartment', 'villa', 'townhouse', 'office', 'commercial'], bookable: true },
  { slug: 'upholstery-sofa-cleaning', category: 'specialty', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [45, 120], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'mattress-cleaning', category: 'specialty', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [30, 90], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'terrace-outdoor-cleaning', category: 'specialty', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [45, 150], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'guest-arrival-preparation', category: 'holiday-rental', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [45, 120], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'linen-towel-change', category: 'holiday-rental', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [20, 60], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'ironing', category: 'specialty', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [30, 120], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'fridge-cleaning', category: 'specialty', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [20, 45], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'oven-cleaning', category: 'specialty', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [30, 60], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'interior-cabinet-cleaning', category: 'specialty', enabled: true, pricingModel: 'from', fromPrice: null, durationRangeMinutes: [30, 90], suitableProperties: ['apartment', 'villa', 'townhouse'], bookable: true },
  { slug: 'custom-cleaning-request', category: 'specialty', enabled: true, pricingModel: 'quote', fromPrice: null, durationRangeMinutes: [60, 240], suitableProperties: ['apartment', 'villa', 'townhouse', 'office', 'commercial'], bookable: true },
];

export const enabledServices = () => services.filter((s) => s.enabled);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
