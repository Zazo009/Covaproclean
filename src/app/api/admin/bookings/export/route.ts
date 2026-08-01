import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, ADMIN_SESSION_COOKIE } from '@/lib/admin-auth';
import { bookingRepository } from '@/lib/booking-repository';

export const runtime = 'nodejs';

const columns = [
  'bookingReference',
  'status',
  'createdAt',
  'serviceType',
  'city',
  'address',
  'customerFirstName',
  'customerLastName',
  'customerEmail',
  'customerPhone',
  'frequency',
  'preferredDate',
  'preferredTimeWindow',
  'estimatedTotal',
  'pricingStatus',
] as const;

function escapeCsv(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

export async function GET(req: NextRequest) {
  if (!verifySessionToken(req.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const bookings = await bookingRepository.list();
    const rows = [
      columns.join(','),
      ...bookings.map((b) => columns.map((col) => escapeCsv(b[col as keyof typeof b])).join(',')),
    ];

    return new NextResponse(rows.join('\n'), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="bookings-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error('[admin:bookings:export] failed', error);
    return NextResponse.json({ error: 'export_failed' }, { status: 500 });
  }
}
