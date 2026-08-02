import { getService } from '@/config/services';
import { extras as extraConfigs } from '@/config/extras';
import type { BookingInput } from './booking-schema';

export type PricingStatus = 'confirmed' | 'estimated' | 'quote_required';

export interface PricingResult {
  status: PricingStatus;
  estimatedDurationMinutes: number | null;
  estimatedSubtotal: number | null;
  discount: number | null;
  tax: number | null;
  estimatedTotal: number | null;
}

/**
 * Estimates duration/price from config values only — never invents a
 * number. Resolves to `quote_required` whenever the service or any
 * selected extra has `fromPrice: null` (pricingModel === 'quote').
 */
export function estimatePricing(input: Pick<BookingInput, 'serviceType' | 'extras'>): PricingResult {
  const service = getService(input.serviceType);

  if (!service || service.pricingModel === 'quote' || service.fromPrice === null) {
    return {
      status: 'quote_required',
      estimatedDurationMinutes: service ? service.durationRangeMinutes[0] : null,
      estimatedSubtotal: null,
      discount: null,
      tax: null,
      estimatedTotal: null,
    };
  }

  let subtotal = service.fromPrice;
  let extraMinutes = 0;
  let hasUnknownExtraPrice = false;

  for (const selected of input.extras) {
    const extra = extraConfigs.find((e) => e.id === selected.id);
    if (!extra) continue;
    extraMinutes += extra.estimatedMinutes * selected.quantity;
    if (extra.pricingModel === 'quote' || extra.fromPrice === null) {
      hasUnknownExtraPrice = true;
    } else {
      subtotal += extra.fromPrice * selected.quantity;
    }
  }

  if (hasUnknownExtraPrice) {
    return {
      status: 'quote_required',
      estimatedDurationMinutes: service.durationRangeMinutes[0] + extraMinutes,
      estimatedSubtotal: null,
      discount: null,
      tax: null,
      estimatedTotal: null,
    };
  }

  return {
    status: 'estimated',
    estimatedDurationMinutes: service.durationRangeMinutes[0] + extraMinutes,
    estimatedSubtotal: subtotal,
    discount: null,
    tax: null,
    estimatedTotal: subtotal,
  };
}
