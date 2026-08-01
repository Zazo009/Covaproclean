import { z } from 'zod';
import { services } from '@/config/services';
import { frequencies, propertyTypes, accessMethods, contactMethods, propertyConditions } from '@/config/booking';

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];

export const bookingSchema = z.object({
  // honeypot — must stay empty
  company: z.string().max(0).optional().default(''),

  locale: z.enum(['en', 'es']),
  source: z.string().max(120).optional(),
  campaign: z.string().max(120).optional(),

  serviceType: z.enum(serviceSlugs),
  customServiceDescription: z.string().max(2000).optional(),

  address: z.string().min(3).max(300),
  postalCode: z.string().min(3).max(20),
  city: z.string().min(2).max(120),
  urbanization: z.string().max(200).optional(),
  propertyType: z.enum(propertyTypes),
  floor: z.string().max(50).optional(),
  liftAvailable: z.boolean().optional(),
  parkingInstructions: z.string().max(500).optional(),

  squareMetres: z.number().int().positive().max(10000).optional(),
  bedrooms: z.number().int().min(0).max(50).optional(),
  bathrooms: z.number().int().min(0).max(50).optional(),
  kitchens: z.number().int().min(0).max(20).optional(),
  livingAreas: z.number().int().min(0).max(20).optional(),
  floorsInProperty: z.number().int().min(1).max(20).optional(),
  hasTerrace: z.boolean().optional(),
  hasPets: z.boolean().optional(),
  propertyCondition: z.enum(propertyConditions).optional(),
  furnished: z.boolean().optional(),
  recentConstructionWork: z.boolean().optional(),
  lastProfessionalClean: z.string().max(50).optional(),

  frequency: z.enum(frequencies),
  customFrequencyDescription: z.string().max(500).optional(),

  extras: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number().int().min(1).max(20).default(1),
      })
    )
    .default([]),

  preferredDate: z.string().min(1, 'required'),
  preferredTimeWindow: z.enum(['morning', 'midday', 'afternoon', 'flexible']),
  alternativeDate: z.string().optional(),
  isFlexible: z.boolean().optional(),
  isUrgent: z.boolean().optional(),

  accessMethod: z.enum(accessMethods),
  accessOtherDetails: z.string().max(500).optional(),

  customerFirstName: z.string().min(1).max(100),
  customerLastName: z.string().min(1).max(100),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(6).max(30),
  whatsappNumber: z.string().max(30).optional(),
  preferredContactMethod: z.enum(contactMethods),
  companyName: z.string().max(150).optional(),
  invoiceInfo: z.string().max(500).optional(),
  customerNotes: z.string().max(2000).optional(),

  consentAccepted: z.literal(true),
  marketingConsent: z.boolean().default(false),
});

export type BookingInput = z.infer<typeof bookingSchema>;
