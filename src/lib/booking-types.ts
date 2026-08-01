import type { BookingStatus } from '@/config/booking';
import type { PricingStatus } from './pricing';
import type { BookingInput } from './booking-schema';

export interface BookingRecord extends BookingInput {
  id: string;
  bookingReference: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  estimatedDuration: number | null;
  estimatedSubtotal: number | null;
  discount: number | null;
  tax: number | null;
  estimatedTotal: number | null;
  pricingStatus: PricingStatus;
  emailDeliveryStatus: 'pending' | 'sent' | 'failed';
  internalNotes?: string;
}
