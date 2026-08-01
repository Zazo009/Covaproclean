import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/booking-schema';
import { estimatePricing } from '@/lib/pricing';
import { generateBookingReference } from '@/lib/booking-reference';
import { bookingRepository } from '@/lib/booking-repository';
import { sendBookingEmails } from '@/lib/send-booking-emails';
import { checkRateLimit } from '@/lib/rate-limit';
import type { BookingRecord } from '@/lib/booking-types';

export const runtime = 'nodejs';

function getClientKey(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

export async function POST(req: NextRequest) {
  const clientKey = getClientKey(req);
  const rateLimit = checkRateLimit(clientKey);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'rate_limited', retryAfterSeconds: rateLimit.retryAfterSeconds },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 422 });
  }

  const input = parsed.data;

  // Honeypot: a filled-in "company" field indicates a bot submission.
  if (input.company) {
    return NextResponse.json({ bookingReference: generateBookingReference(), status: 'new' }, { status: 200 });
  }

  const pricing = estimatePricing(input);
  const now = new Date().toISOString();

  const record: BookingRecord = {
    ...input,
    id: crypto.randomUUID(),
    bookingReference: generateBookingReference(),
    status: pricing.status === 'quote_required' ? 'quote_required' : 'awaiting_review',
    createdAt: now,
    updatedAt: now,
    estimatedDuration: pricing.estimatedDurationMinutes,
    estimatedSubtotal: pricing.estimatedSubtotal,
    discount: pricing.discount,
    tax: pricing.tax,
    estimatedTotal: pricing.estimatedTotal,
    pricingStatus: pricing.status,
    emailDeliveryStatus: 'pending',
  };

  try {
    await bookingRepository.save(record);
  } catch (error) {
    console.error('[booking] failed to persist record', error);
    return NextResponse.json({ error: 'storage_failed' }, { status: 500 });
  }

  const emailStatus = await sendBookingEmails(record);
  record.emailDeliveryStatus = emailStatus === 'sent' ? 'sent' : emailStatus === 'failed' ? 'failed' : 'pending';

  return NextResponse.json(
    {
      bookingReference: record.bookingReference,
      status: record.status,
      pricingStatus: record.pricingStatus,
      estimatedDuration: record.estimatedDuration,
      estimatedTotal: record.estimatedTotal,
    },
    { status: 201 }
  );
}
