/**
 * FAQ categories. Question/answer copy lives under `faq.items.<id>` in the
 * translation messages, grouped by these category ids.
 */
export const faqCategories = [
  'bookings',
  'payments',
  'cancellations',
  'propertyAccess',
  'cleaningSupplies',
  'pets',
  'parking',
  'recurringCleaning',
  'holidayRentals',
  'commercialServices',
  'addOns',
  'keysAndAlarmCodes',
  'sameDayBookings',
  'serviceAreas',
  'refundsAndComplaints',
] as const;

export type FaqCategory = (typeof faqCategories)[number];

export interface FaqEntry {
  id: string;
  category: FaqCategory;
}

export const faqs: FaqEntry[] = [
  { id: 'how-to-book', category: 'bookings' },
  { id: 'booking-confirmation-time', category: 'bookings' },
  { id: 'payment-methods', category: 'payments' },
  { id: 'when-do-i-pay', category: 'payments' },
  { id: 'cancellation-notice', category: 'cancellations' },
  { id: 'late-cancellation', category: 'cancellations' },
  { id: 'do-i-need-to-be-home', category: 'propertyAccess' },
  { id: 'key-safe-support', category: 'propertyAccess' },
  { id: 'do-you-bring-supplies', category: 'cleaningSupplies' },
  { id: 'eco-products', category: 'cleaningSupplies' },
  { id: 'pets-at-home', category: 'pets' },
  { id: 'parking-availability', category: 'parking' },
  { id: 'gated-community-access', category: 'parking' },
  { id: 'recurring-discounts', category: 'recurringCleaning' },
  { id: 'change-recurring-schedule', category: 'recurringCleaning' },
  { id: 'airbnb-turnaround', category: 'holidayRentals' },
  { id: 'multi-property-management', category: 'holidayRentals' },
  { id: 'commercial-contracts', category: 'commercialServices' },
  { id: 'office-out-of-hours', category: 'commercialServices' },
  { id: 'add-on-pricing', category: 'addOns' },
  { id: 'sharing-alarm-codes', category: 'keysAndAlarmCodes' },
  { id: 'key-return-process', category: 'keysAndAlarmCodes' },
  { id: 'same-day-availability', category: 'sameDayBookings' },
  { id: 'areas-covered', category: 'serviceAreas' },
  { id: 'area-not-listed', category: 'serviceAreas' },
  { id: 'not-satisfied', category: 'refundsAndComplaints' },
  { id: 'refund-policy', category: 'refundsAndComplaints' },
];
