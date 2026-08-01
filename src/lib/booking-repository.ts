import type { BookingRecord } from './booking-types';

/**
 * Storage abstraction for booking records. The default implementation only
 * logs (no database configured yet). Swap this for a Supabase-backed
 * implementation by replacing `saveBooking` — the API route and any future
 * admin dashboard only depend on this interface, not on how data is stored.
 */
export interface BookingRepository {
  save(record: BookingRecord): Promise<void>;
}

class LoggingBookingRepository implements BookingRepository {
  async save(record: BookingRecord): Promise<void> {
    // TODO: replace with a Supabase insert (see README "Database setup").
    // Logged server-side only — never expose full booking records to the client.
    console.log('[booking:new]', {
      bookingReference: record.bookingReference,
      status: record.status,
      serviceType: record.serviceType,
      city: record.city,
      createdAt: record.createdAt,
    });
  }
}

export const bookingRepository: BookingRepository = new LoggingBookingRepository();
