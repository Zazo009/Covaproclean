/**
 * Optional extras offered in booking Step 5. Copy lives under
 * `extras.items.<id>` in the translation messages.
 *
 * `fromPrice` was set 2026-08-02 from Costa del Sol market-rate research,
 * using minimum-charge floors for short add-ons — the business's chosen
 * initial live pricing, not a placeholder. Adjust freely. `null` means
 * pricingModel === 'quote' (always custom).
 */
export interface ExtraConfig {
  id: string;
  pricingModel: 'from' | 'quote';
  fromPrice: number | null;
  estimatedMinutes: number;
  allowQuantity: boolean;
  enabled: boolean;
}

export const extras: ExtraConfig[] = [
  { id: 'oven-cleaning', pricingModel: 'from', fromPrice: 25, estimatedMinutes: 30, allowQuantity: false, enabled: true },
  { id: 'fridge-cleaning', pricingModel: 'from', fromPrice: 20, estimatedMinutes: 20, allowQuantity: false, enabled: true },
  { id: 'interior-windows', pricingModel: 'from', fromPrice: 25, estimatedMinutes: 30, allowQuantity: false, enabled: true },
  { id: 'exterior-windows', pricingModel: 'from', fromPrice: 30, estimatedMinutes: 40, allowQuantity: false, enabled: true },
  { id: 'interior-cupboards', pricingModel: 'from', fromPrice: 25, estimatedMinutes: 30, allowQuantity: false, enabled: true },
  { id: 'balcony-terrace', pricingModel: 'from', fromPrice: 25, estimatedMinutes: 30, allowQuantity: false, enabled: true },
  { id: 'sofa-cleaning', pricingModel: 'quote', fromPrice: null, estimatedMinutes: 60, allowQuantity: true, enabled: true },
  { id: 'mattress-cleaning', pricingModel: 'quote', fromPrice: null, estimatedMinutes: 40, allowQuantity: true, enabled: true },
  { id: 'ironing', pricingModel: 'from', fromPrice: 25, estimatedMinutes: 45, allowQuantity: false, enabled: true },
  { id: 'linen-change', pricingModel: 'from', fromPrice: 15, estimatedMinutes: 20, allowQuantity: true, enabled: true },
  { id: 'towel-change', pricingModel: 'from', fromPrice: 10, estimatedMinutes: 15, allowQuantity: true, enabled: true },
  { id: 'laundry', pricingModel: 'quote', fromPrice: null, estimatedMinutes: 60, allowQuantity: false, enabled: true },
  { id: 'consumable-restocking', pricingModel: 'quote', fromPrice: null, estimatedMinutes: 20, allowQuantity: false, enabled: true },
  { id: 'key-pickup', pricingModel: 'quote', fromPrice: null, estimatedMinutes: 20, allowQuantity: false, enabled: true },
  { id: 'property-inspection', pricingModel: 'quote', fromPrice: null, estimatedMinutes: 20, allowQuantity: false, enabled: true },
  { id: 'before-after-photos', pricingModel: 'from', fromPrice: 15, estimatedMinutes: 10, allowQuantity: false, enabled: true },
  { id: 'custom-request', pricingModel: 'quote', fromPrice: null, estimatedMinutes: 0, allowQuantity: false, enabled: true },
];

export const enabledExtras = () => extras.filter((e) => e.enabled);
