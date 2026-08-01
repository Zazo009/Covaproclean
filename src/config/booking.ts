export const bookingStatuses = [
  'new',
  'awaiting_review',
  'quote_required',
  'awaiting_customer_confirmation',
  'confirmed',
  'assigned',
  'in_progress',
  'completed',
  'cancelled',
] as const;
export type BookingStatus = (typeof bookingStatuses)[number];

export const frequencies = ['one_time', 'weekly', 'biweekly', 'monthly', 'multiple_weekly', 'custom'] as const;
export type Frequency = (typeof frequencies)[number];

export const propertyTypes = ['apartment', 'villa', 'townhouse', 'office', 'commercial'] as const;
export type PropertyType = (typeof propertyTypes)[number];

export const accessMethods = [
  'customer_present',
  'key_pickup',
  'key_safe',
  'concierge',
  'property_manager',
  'smart_lock',
  'alarm_code',
  'other',
] as const;
export type AccessMethod = (typeof accessMethods)[number];

export const contactMethods = ['email', 'phone', 'whatsapp'] as const;
export type ContactMethod = (typeof contactMethods)[number];

export const propertyConditions = ['well_maintained', 'needs_attention', 'post_construction', 'post_renovation'] as const;
export type PropertyCondition = (typeof propertyConditions)[number];

/** Recurring-cleaning discount placeholder — set the real percentage once confirmed. */
export const recurringDiscountPlaceholder: Record<Exclude<Frequency, 'one_time' | 'custom'>, number | null> = {
  weekly: null,
  biweekly: null,
  monthly: null,
  multiple_weekly: null,
};
