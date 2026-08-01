import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null | undefined;

/**
 * Server-only Supabase client using the service role key. Returns null when
 * Supabase isn't configured yet — callers (booking repository, admin API
 * routes) fall back to a "not configured" behaviour instead of crashing.
 * Never import this from a client component: the service role key must
 * stay server-side.
 */
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    cachedClient = null;
    return null;
  }

  cachedClient = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedClient;
}

export const BOOKINGS_TABLE = 'bookings';
