import { Resend } from 'resend';
import { site } from '@/config/site';
import type { BookingRecord } from './booking-types';
import { buildInternalBookingEmail, buildCustomerConfirmationEmail } from './email-templates';

/**
 * Sends the internal notification (to info@covaproclean.com) and the
 * customer confirmation. If RESEND_API_KEY is not configured, emails are
 * skipped and logged instead — the booking flow still succeeds and returns
 * a reference, per the "must function without a mock" requirement. Add the
 * key to enable real delivery (see README "Email service setup").
 */
export async function sendBookingEmails(record: BookingRecord): Promise<'sent' | 'failed' | 'skipped'> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.BOOKING_FROM_EMAIL ?? 'Cova Pro Clean <bookings@covaproclean.com>';

  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY not set — skipping email delivery for', record.bookingReference);
    return 'skipped';
  }

  try {
    const resend = new Resend(apiKey);
    const internal = buildInternalBookingEmail(record);
    const customer = buildCustomerConfirmationEmail(record);

    await resend.emails.send({
      from: fromAddress,
      to: site.email,
      replyTo: record.customerEmail,
      subject: internal.subject,
      html: internal.html,
    });

    await resend.emails.send({
      from: fromAddress,
      to: record.customerEmail,
      subject: customer.subject,
      html: customer.html,
    });

    return 'sent';
  } catch (error) {
    console.error('[email] Failed to send booking emails for', record.bookingReference, error);
    return 'failed';
  }
}
