/**
 * Central place for facts that have not yet been confirmed by the business.
 * Nothing here may be invented — every unconfirmed value is an explicit
 * placeholder so it can't accidentally leak into copy as fact.
 */
export const site = {
  name: 'Cova Pro Clean',
  // Source: Spanish mercantile registry data (CIF/address), cross-checked
  // across eInforma, Iberinform and Empresite (eleconomista.es) —
  // 2026-08-01 and re-confirmed 2026-08-02. Registered business activity per
  // Empresite: CNAE 81.21 (general building cleaning) and CNAE 81.22 (other
  // cleaning activities). Re-verify against an official registry extract
  // (Registro Mercantil) before relying on this for legal filings — phone,
  // incorporation date and share capital are not published on any of these
  // sources and remain unconfirmed.
  legalName: 'Cova Pro Clean SL',
  cif: 'B22466536',
  registeredAddress: 'Calle Somera, 10, 6º 11, 29001 Málaga, Spain',
  publicAddress: null as string | null, // null = operate as service-area business, no public address
  domain: 'https://covaproclean.com',
  email: 'info@covaproclean.com',
  phone: null as string | null, // TODO: add once confirmed, e.g. '+34 6XX XXX XXX'
  whatsapp: null as string | null, // TODO: add WhatsApp number in E.164, e.g. '34600000000'
  openingHours: 'TODO: confirm opening hours (e.g. Mon–Sat 08:00–20:00)',
  vatTreatment: 'TODO: confirm VAT/IVA treatment applied to invoices',
  socials: {
    instagram: null as string | null,
    facebook: null as string | null,
    linkedin: null as string | null,
  },
  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? null,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? null,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? null,
  },
  trust: {
    // Every flag below defaults to false. Flip to true only once the business
    // has confirmed the underlying fact — the UI reads these instead of
    // hardcoding claims.
    insured: false,
    backgroundCheckedStaff: false,
    ecoFriendlyProducts: false,
    satisfactionGuarantee: false,
    sameDayAvailability: false,
    emergencyCleaning: false,
  },
  booking: {
    minimumBookingValue: null as string | null, // TODO
    travelFee: null as string | null, // TODO
    cancellationWindowHours: null as number | null, // TODO
    depositRequired: false,
  },
} as const;

export type Site = typeof site;
