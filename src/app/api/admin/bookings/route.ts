import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifySessionToken, ADMIN_SESSION_COOKIE } from '@/lib/admin-auth';
import { bookingRepository } from '@/lib/booking-repository';
import { bookingStatuses } from '@/config/booking';
import { getSupabaseAdminClient } from '@/lib/supabase';

export const runtime = 'nodejs';

function requireAuth(req: NextRequest): boolean {
  return verifySessionToken(req.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function GET(req: NextRequest) {
  if (!requireAuth(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const city = searchParams.get('city') ?? undefined;
  const from = searchParams.get('from') ?? undefined;
  const to = searchParams.get('to') ?? undefined;

  try {
    const isValidStatus = status !== null && (bookingStatuses as readonly string[]).includes(status);
    const bookings = await bookingRepository.list({
      status: isValidStatus ? (status as (typeof bookingStatuses)[number]) : undefined,
      city,
      from,
      to,
    });
    return NextResponse.json({ bookings, supabaseConfigured: getSupabaseAdminClient() !== null });
  } catch (error) {
    console.error('[admin:bookings] list failed', error);
    return NextResponse.json({ error: 'list_failed' }, { status: 500 });
  }
}

const updateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(bookingStatuses),
  internalNotes: z.string().max(4000).optional(),
});

export async function PATCH(req: NextRequest) {
  if (!requireAuth(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 422 });
  }

  try {
    await bookingRepository.updateStatus(parsed.data.id, parsed.data.status, parsed.data.internalNotes);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[admin:bookings] update failed', error);
    return NextResponse.json({ error: 'update_failed' }, { status: 500 });
  }
}
