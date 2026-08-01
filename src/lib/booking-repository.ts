import type { BookingRecord } from './booking-types';
import type { BookingStatus } from '@/config/booking';
import { getSupabaseAdminClient, BOOKINGS_TABLE } from './supabase';

export interface BookingListFilters {
  status?: BookingStatus;
  city?: string;
  from?: string; // ISO date, inclusive
  to?: string; // ISO date, inclusive
}

/**
 * Storage abstraction for booking records. Two implementations exist:
 * `LoggingBookingRepository` (default, no database configured) and
 * `SupabaseBookingRepository` (used automatically once Supabase env vars
 * are set — see `src/lib/supabase.ts`). Callers only depend on this
 * interface, never on which backend is active.
 */
export interface BookingRepository {
  save(record: BookingRecord): Promise<void>;
  list(filters?: BookingListFilters): Promise<BookingRecord[]>;
  updateStatus(id: string, status: BookingStatus, internalNotes?: string): Promise<void>;
}

class LoggingBookingRepository implements BookingRepository {
  async save(record: BookingRecord): Promise<void> {
    // Logged server-side only — never expose full booking records to the client.
    console.log('[booking:new]', {
      bookingReference: record.bookingReference,
      status: record.status,
      serviceType: record.serviceType,
      city: record.city,
      createdAt: record.createdAt,
    });
  }

  async list(): Promise<BookingRecord[]> {
    console.warn('[booking:list] Supabase not configured — no bookings to show. See README "Database setup".');
    return [];
  }

  async updateStatus(): Promise<void> {
    console.warn('[booking:updateStatus] Supabase not configured — nothing to update. See README "Database setup".');
  }
}

interface BookingRow {
  id: string;
  booking_reference: string;
  status: BookingStatus;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
  data: BookingRecord;
}

function rowToRecord(row: BookingRow): BookingRecord {
  return { ...row.data, id: row.id, status: row.status, internalNotes: row.internal_notes ?? undefined };
}

class SupabaseBookingRepository implements BookingRepository {
  async save(record: BookingRecord): Promise<void> {
    const client = getSupabaseAdminClient();
    if (!client) return;

    const { error } = await client.from(BOOKINGS_TABLE).insert({
      id: record.id,
      booking_reference: record.bookingReference,
      status: record.status,
      service_type: record.serviceType,
      city: record.city,
      customer_email: record.customerEmail,
      created_at: record.createdAt,
      updated_at: record.updatedAt,
      data: record,
    });

    if (error) throw new Error(`Supabase insert failed: ${error.message}`);
  }

  async list(filters?: BookingListFilters): Promise<BookingRecord[]> {
    const client = getSupabaseAdminClient();
    if (!client) return [];

    let query = client.from(BOOKINGS_TABLE).select('*').order('created_at', { ascending: false });
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.city) query = query.ilike('city', `%${filters.city}%`);
    if (filters?.from) query = query.gte('created_at', filters.from);
    if (filters?.to) query = query.lte('created_at', filters.to);

    const { data, error } = await query;
    if (error) throw new Error(`Supabase query failed: ${error.message}`);
    return (data as BookingRow[]).map(rowToRecord);
  }

  async updateStatus(id: string, status: BookingStatus, internalNotes?: string): Promise<void> {
    const client = getSupabaseAdminClient();
    if (!client) return;

    const { data: existing, error: fetchError } = await client
      .from(BOOKINGS_TABLE)
      .select('data')
      .eq('id', id)
      .single();
    if (fetchError) throw new Error(`Supabase fetch failed: ${fetchError.message}`);

    const updatedAt = new Date().toISOString();
    const mergedData: BookingRecord = { ...(existing as { data: BookingRecord }).data, status, updatedAt };
    if (internalNotes !== undefined) mergedData.internalNotes = internalNotes;

    const { error } = await client
      .from(BOOKINGS_TABLE)
      .update({
        status,
        internal_notes: internalNotes ?? null,
        updated_at: updatedAt,
        data: mergedData,
      })
      .eq('id', id);

    if (error) throw new Error(`Supabase update failed: ${error.message}`);
  }
}

export const bookingRepository: BookingRepository = getSupabaseAdminClient()
  ? new SupabaseBookingRepository()
  : new LoggingBookingRepository();
