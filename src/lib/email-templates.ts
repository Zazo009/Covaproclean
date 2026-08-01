import type { BookingRecord } from './booking-types';
import { getService } from '@/config/services';
import { site } from '@/config/site';

function row(label: string, value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined || value === '') return '';
  const display = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;
  return `<tr><td style="padding:6px 12px;color:#5b6b64;font-size:13px;white-space:nowrap;">${label}</td><td style="padding:6px 12px;color:#0f1f1a;font-size:13px;">${display}</td></tr>`;
}

function wrap(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f0e4;font-family:Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e4;padding:24px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
          <tr><td style="background:#124237;padding:20px 28px;">
            <span style="color:#ffffff;font-size:18px;font-weight:600;">Cova Pro Clean</span>
          </td></tr>
          <tr><td style="padding:28px;">
            <h1 style="font-size:18px;color:#0f1f1a;margin:0 0 16px;">${title}</h1>
            ${bodyHtml}
          </td></tr>
          <tr><td style="padding:16px 28px;background:#f5f0e4;color:#5b6b64;font-size:12px;">
            Cova Pro Clean &middot; ${site.email}
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function buildInternalBookingEmail(record: BookingRecord): { subject: string; html: string } {
  const service = getService(record.serviceType);
  const table = `<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
    ${row('Booking reference', record.bookingReference)}
    ${row('Submitted', record.createdAt)}
    ${row('Status', record.status)}
    ${row('Language', record.locale)}
    ${row('Service', service?.slug ?? record.serviceType)}
    ${row('Custom service notes', record.customServiceDescription)}
    ${row('Property type', record.propertyType)}
    ${row('Address', record.address)}
    ${row('Postal code', record.postalCode)}
    ${row('City', record.city)}
    ${row('Urbanization', record.urbanization)}
    ${row('Floor', record.floor)}
    ${row('Lift available', record.liftAvailable)}
    ${row('Parking instructions', record.parkingInstructions)}
    ${row('Square metres', record.squareMetres)}
    ${row('Bedrooms', record.bedrooms)}
    ${row('Bathrooms', record.bathrooms)}
    ${row('Kitchens', record.kitchens)}
    ${row('Living areas', record.livingAreas)}
    ${row('Floors in property', record.floorsInProperty)}
    ${row('Terrace/balcony', record.hasTerrace)}
    ${row('Pets', record.hasPets)}
    ${row('Property condition', record.propertyCondition)}
    ${row('Furnished', record.furnished)}
    ${row('Recent construction work', record.recentConstructionWork)}
    ${row('Last professional clean', record.lastProfessionalClean)}
    ${row('Frequency', record.frequency)}
    ${row('Custom frequency', record.customFrequencyDescription)}
    ${row('Extras', record.extras.map((e) => `${e.id} x${e.quantity}`).join(', '))}
    ${row('Preferred date', record.preferredDate)}
    ${row('Preferred time window', record.preferredTimeWindow)}
    ${row('Alternative date', record.alternativeDate)}
    ${row('Flexible timing', record.isFlexible)}
    ${row('Urgent / same-day', record.isUrgent)}
    ${row('Access method', record.accessMethod)}
    ${row('Access details', record.accessOtherDetails)}
    ${row('Customer name', `${record.customerFirstName} ${record.customerLastName}`)}
    ${row('Customer email', record.customerEmail)}
    ${row('Customer phone', record.customerPhone)}
    ${row('WhatsApp', record.whatsappNumber)}
    ${row('Preferred contact method', record.preferredContactMethod)}
    ${row('Company name', record.companyName)}
    ${row('Invoice info', record.invoiceInfo)}
    ${row('Notes', record.customerNotes)}
    ${row('Estimated duration (min)', record.estimatedDuration)}
    ${row('Estimated subtotal', record.estimatedSubtotal)}
    ${row('Discount', record.discount)}
    ${row('Tax', record.tax)}
    ${row('Estimated total', record.estimatedTotal)}
    ${row('Pricing status', record.pricingStatus)}
    ${row('Terms consent', record.consentAccepted)}
    ${row('Marketing consent', record.marketingConsent)}
    ${row('Source', record.source)}
    ${row('Campaign', record.campaign)}
  </table>`;

  return {
    subject: `New booking request ${record.bookingReference} — ${service?.slug ?? record.serviceType}`,
    html: wrap(`New booking request — ${record.bookingReference}`, table),
  };
}

export function buildCustomerConfirmationEmail(record: BookingRecord): { subject: string; html: string } {
  if (record.locale === 'es') {
    const body = `
      <p style="color:#0f1f1a;font-size:14px;line-height:1.6;">Hola ${record.customerFirstName},</p>
      <p style="color:#0f1f1a;font-size:14px;line-height:1.6;">Hemos recibido tu solicitud de reserva. Tu referencia es <strong>${record.bookingReference}</strong>.</p>
      <p style="color:#0f1f1a;font-size:14px;line-height:1.6;"><strong>Esto es una solicitud, no una reserva confirmada.</strong> Revisaremos los detalles y te contactaremos para confirmar la disponibilidad final y el precio.</p>
      <p style="color:#0f1f1a;font-size:14px;line-height:1.6;">Si tienes alguna pregunta mientras tanto, escríbenos a ${site.email}.</p>
      <p style="color:#0f1f1a;font-size:14px;line-height:1.6;">Gracias por confiar en Cova Pro Clean.</p>`;
    return { subject: 'Tu solicitud de reserva con Cova Pro Clean', html: wrap('Solicitud de reserva recibida', body) };
  }

  const body = `
    <p style="color:#0f1f1a;font-size:14px;line-height:1.6;">Hi ${record.customerFirstName},</p>
    <p style="color:#0f1f1a;font-size:14px;line-height:1.6;">We've received your booking request. Your reference is <strong>${record.bookingReference}</strong>.</p>
    <p style="color:#0f1f1a;font-size:14px;line-height:1.6;"><strong>This is a request, not a confirmed booking yet.</strong> We'll review the details and contact you to confirm final availability and pricing.</p>
    <p style="color:#0f1f1a;font-size:14px;line-height:1.6;">If you have any questions in the meantime, reach us at ${site.email}.</p>
    <p style="color:#0f1f1a;font-size:14px;line-height:1.6;">Thank you for choosing Cova Pro Clean.</p>`;
  return { subject: 'Your Cova Pro Clean booking request', html: wrap('Booking request received', body) };
}
