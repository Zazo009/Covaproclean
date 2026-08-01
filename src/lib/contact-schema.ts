import { z } from 'zod';

export const contactSchema = z.object({
  company: z.string().max(0).optional().default(''), // honeypot
  locale: z.enum(['en', 'es']),
  name: z.string().min(1).max(150),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(1).max(3000),
  enquiryType: z.enum(['general', 'business']).default('general'),
  consentAccepted: z.literal(true),
});

export type ContactInput = z.infer<typeof contactSchema>;
