import { z } from 'zod';

/**
 * Validated environment variables.
 * Read once at startup — never `process.env.X` directly in code.
 */

const ServerEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO_EMAIL: z.email().default('hallo@systembuero.com'),
  NEWSLETTER_FROM_EMAIL: z.email().default('newsletter@prestige-selections.com'),
  CONTACT_FROM_EMAIL: z.email().default('noreply@prestige-selections.com'),
  NEXT_PUBLIC_BASE_URL: z.url().default('https://www.prestige-selections.com'),
  // HMAC secret for newsletter double-opt-in tokens. MUST be set in production.
  // 32+ random bytes recommended (`openssl rand -hex 32`).
  NEWSLETTER_TOKEN_SECRET: z.string().min(32, 'NEWSLETTER_TOKEN_SECRET must be ≥32 chars').optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const PublicEnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.url().default('https://www.prestige-selections.com'),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  // GTM container ID — pattern `GTM-XXXXXXX`. Empty string disables tracking.
  NEXT_PUBLIC_GTM_ID: z
    .string()
    .regex(/^(GTM-[A-Z0-9]+)?$/, 'GTM ID must match GTM-XXXXXXX format')
    .default(''),
});

function parseServerEnv() {
  const parsed = ServerEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('Invalid server env:', parsed.error.flatten());
    throw new Error('Invalid server environment variables');
  }
  return parsed.data;
}

function parsePublicEnv() {
  const parsed = PublicEnvSchema.safeParse({
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  });
  if (!parsed.success) {
    console.error('Invalid public env:', parsed.error.flatten());
    throw new Error('Invalid public environment variables');
  }
  return parsed.data;
}

export const serverEnv = parseServerEnv();
export const publicEnv = parsePublicEnv();
