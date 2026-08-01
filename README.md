# Cova Pro Clean — covaproclean.com

Premium, bilingual (EN/ES) marketing site + digital booking platform for a
professional cleaning company on the Costa del Sol. Built with Next.js App
Router, TypeScript, Tailwind, next-intl and a server-validated booking flow
that emails every request to `info@covaproclean.com`.

## Stack

- **Next.js 15** (App Router) + **TypeScript** (strict mode)
- **Tailwind CSS** for styling
- **next-intl** for i18n, localized routing and translated metadata
- **React Hook Form + Zod** for the booking wizard and contact form
- **Resend** for transactional email (internal booking notice + customer confirmation)
- No database is wired up yet — bookings are validated, priced, emailed and
  logged server-side (`src/lib/booking-repository.ts`). Swap that one file
  for a Supabase-backed implementation when ready; nothing else needs to change.

## Local development

```bash
npm install
npm run dev
```

The site runs fully without any environment variables — booking and contact
submissions are validated and logged, but emails are skipped with a console
warning until `RESEND_API_KEY` is set (see below).

```bash
npm run typecheck   # TypeScript strict check
npm run build        # production build
```

## Project structure

```
messages/en.json, messages/es.json   All customer-facing copy. One key tree,
                                      mirrored exactly between locales — this
                                      is the single source of truth for i18n.
src/config/                          Structural data that drives the UI:
  services.ts                       20 services — toggle `enabled`, set
                                     `fromPrice`/`pricingModel` once confirmed.
  areas.ts                          11 Costa del Sol locations — add a new
                                     town by adding one entry + a translation
                                     block, no code changes needed.
  extras.ts                         Booking Step 5 add-ons.
  faqs.ts                           FAQ question ids grouped by category.
  testimonials.ts                   Placeholder reviews (`isPlaceholder: true`
                                     until real, consented reviews replace them).
  site.ts                           Every unconfirmed business fact (phone,
                                     CIF, hours, insurance...) as an explicit
                                     placeholder — see "Missing information" below.
  booking.ts                        Enums shared by the schema, form and UI
                                     (statuses, frequencies, access methods...).
src/lib/                             Business logic: Zod schemas, pricing
                                      estimator, email templates, rate
                                      limiting, booking reference generator.
src/components/booking/              The 9-step booking wizard (10th step,
                                      confirmation, renders after submit).
src/app/[locale]/                    All public pages, one folder per route,
                                      each with EN copy served at `/` and ES
                                      copy served at `/es/...` via next-intl's
                                      localized pathnames (src/i18n/routing.ts).
src/app/api/booking, .../contact     Server-side submission handlers.
```

## Editing content

- **Services**: edit `src/config/services.ts` (structure) and
  `messages/{en,es}.json` → `services.items.<slug>` (copy). Set `enabled:
  false` to hide a service without deleting its content.
- **Prices**: every price defaults to `null`, which renders as "Quote
  required" / "Price calculated after property details" in the UI. Add a
  number to `fromPrice` in `services.ts` or `extras.ts` once confirmed — the
  pricing estimator (`src/lib/pricing.ts`) picks it up automatically and
  starts returning `estimated` instead of `quote_required`.
- **Areas**: `src/config/areas.ts` + `messages/*.json` → `areas.items.<slug>`.
- **FAQs**: `src/config/faqs.ts` (id + category) + `messages/*.json` →
  `faq.items.<id>`.
- **Translations**: never edit UI strings in component files — everything
  user-facing lives in `messages/en.json` / `messages/es.json` with matching
  key structures.

## Missing business information

Nothing below is invented anywhere in the codebase — these are all explicit
placeholders. Search for `TODO` in `src/config/site.ts` for the canonical
list. Before launch, confirm and fill in:

- Legal company name, CIF/NIF, registered address (`src/config/site.ts`)
- Public phone number and WhatsApp number (E.164 format)
- Opening hours
- VAT/IVA treatment
- Minimum booking value, travel fee, cancellation notice window
- Insurance, background-check, eco-product and satisfaction-guarantee status
  (each is a boolean flag in `site.trust` — flip to `true` only once
  confirmed; the trust badges UI reads these flags directly)
- Real prices for every service and extra
- Social media links
- Legal page bodies in `messages/*.json` → `legal.*` (marked `[TODO]`/`[PENDIENTE]`) —
  have a qualified professional review before publishing; the pages carry an
  explicit "this is not legal advice" disclaimer until then

## Email service setup (Resend)

1. Create an account at [resend.com](https://resend.com).
2. Add and verify the `covaproclean.com` domain (DNS records provided by Resend).
3. Generate an API key and set `RESEND_API_KEY` in your deployment's
   environment variables (never commit it).
4. Set `BOOKING_FROM_EMAIL` to a verified sending address, e.g.
   `"Cova Pro Clean <bookings@covaproclean.com>"`.
5. Internal booking notices go to `info@covaproclean.com`
   (`src/config/site.ts`); customer confirmations go to the address they
   submitted, in the language they booked in
   (`src/lib/email-templates.ts`).

Without `RESEND_API_KEY`, both `/api/booking` and `/api/contact` still
validate, price and log submissions — they just skip the send step and
return success, so the flow is fully testable before email is configured.

## Database setup (future)

No database is required for launch. When ready to persist bookings and add
an admin dashboard:

1. Create a Supabase project.
2. Create a `bookings` table matching `src/lib/booking-types.ts`
   (`BookingRecord`) — every field the spec calls for (customer details,
   property details, pricing, status, consent, etc.) is already typed there.
3. Replace `LoggingBookingRepository` in `src/lib/booking-repository.ts`
   with a Supabase-backed implementation of the same `BookingRepository`
   interface. No other file needs to change.
4. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
   `SUPABASE_SERVICE_ROLE_KEY` to your environment.

## Deployment (Vercel)

1. Push this repo to GitHub and import it in Vercel.
2. Framework preset: Next.js (auto-detected).
3. Add environment variables from `.env.example` under Project Settings →
   Environment Variables.
4. Deploy.

### Connecting covaproclean.com

1. In Vercel, Project → Settings → Domains → add `covaproclean.com` and
   `www.covaproclean.com`.
2. At your DNS provider, add the records Vercel shows you (typically an `A`
   record for the apex domain and a `CNAME` for `www`).
3. SSL certificates are issued automatically by Vercel once DNS propagates —
   no manual action needed.

### Analytics & Search Console

1. Create a GA4 property and a Google Tag Manager container; set
   `NEXT_PUBLIC_GA4_ID` / `NEXT_PUBLIC_GTM_ID`. Scripts only load after a
   visitor accepts analytics cookies (`src/components/Analytics.tsx` +
   `CookieBanner.tsx`) — this is intentional and should not be bypassed.
2. Create a Meta Pixel and set `NEXT_PUBLIC_META_PIXEL_ID` (loads only after
   marketing consent).
3. Verify the domain in Google Search Console (DNS TXT record or HTML file),
   then submit `https://covaproclean.com/sitemap.xml`.

### Google Business Profile

Use the confirmed values from `src/config/site.ts` (name, phone, email,
hours, areas served) to keep the listing consistent with the website. Do not
publish a physical address unless the business wants one public — this
project defaults to a service-area business with no public address.

## Testing before launch

- Submit a booking end-to-end in both English and Spanish; confirm the
  reference number, confirmation screen and (once `RESEND_API_KEY` is set)
  both emails.
- Submit the contact form in both languages.
- Check every nav link, footer link and legal page in both locales.
- Run `npm run build` and `npm run typecheck` — both must pass clean.
- Test on a real mobile device: sticky CTA, WhatsApp button, cookie banner,
  and the full booking wizard.
- Validate structured data with Google's Rich Results Test once deployed.

## What's intentionally not built yet

- **Admin dashboard** — the data model and repository interface are ready
  for one, but no UI exists yet.
- **Real-time calendar / availability** — every booking is explicitly
  labelled "pending confirmation"; no fake availability is ever shown.
- **Online payments** — architecture is left open (see `.env.example`), not
  required for a booking-request-based launch.
