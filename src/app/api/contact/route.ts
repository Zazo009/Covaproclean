import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact-schema';
import { checkRateLimit } from '@/lib/rate-limit';
import { site } from '@/config/site';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const clientKey = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const rateLimit = checkRateLimit(`contact:${clientKey}`);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 422 });
  }

  const input = parsed.data;
  if (input.company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY not set — message logged only:', input.email);
    return NextResponse.json({ ok: true, delivered: false }, { status: 200 });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL ?? 'Cova Pro Clean <bookings@covaproclean.com>',
      to: site.email,
      replyTo: input.email,
      subject: `[Contact form] ${input.enquiryType === 'business' ? 'Business enquiry' : 'General enquiry'} — ${input.name}`,
      html: `<p><strong>Name:</strong> ${input.name}</p><p><strong>Email:</strong> ${input.email}</p><p><strong>Phone:</strong> ${input.phone ?? '—'}</p><p><strong>Type:</strong> ${input.enquiryType}</p><p><strong>Message:</strong><br/>${input.message.replace(/\n/g, '<br/>')}</p>`,
    });
    return NextResponse.json({ ok: true, delivered: true }, { status: 200 });
  } catch (error) {
    console.error('[contact] failed to send', error);
    return NextResponse.json({ error: 'send_failed' }, { status: 500 });
  }
}
