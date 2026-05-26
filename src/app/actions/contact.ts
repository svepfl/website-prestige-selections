'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { sendMail } from '@/lib/mail';
import { serverEnv } from '@/lib/env';

export const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  vehicle: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(4000),
  // Honeypot — must be empty
  website: z.string().max(0).optional(),
});

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; fieldErrors?: Record<string, string[] | undefined>; message?: string };

// In-memory rate-limit · DSGVO Art. 32 Sicherheit + Anti-Spam ·
// 3 submissions per IP per 60s. Sufficient for low-volume HNW site.
// For higher-volume sites, swap to Upstash/Redis-backed rate-limiter.
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    h.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const submissions = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (submissions.length >= RATE_LIMIT_MAX) return false;
  submissions.push(now);
  rateLimitMap.set(ip, submissions);
  return true;
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    vehicle: formData.get('vehicle'),
    message: formData.get('message'),
    website: formData.get('website'), // honeypot
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 'error',
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  // Honeypot triggered → silent success (don't tell the bot)
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { status: 'success' };
  }

  // Rate-limit per IP — protects against bursts that bypass honeypot
  const ip = await getClientIp();
  if (!checkRateLimit(ip)) {
    return { status: 'error' };
  }

  const { name, email, phone, vehicle, message } = parsed.data;

  const html = `
    <p><strong>Neue Anfrage über prestige-selections.com</strong></p>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
    ${vehicle ? `<p><strong>Fahrzeug:</strong> ${escapeHtml(vehicle)}</p>` : ''}
    <p><strong>Nachricht:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `;

  const result = await sendMail({
    to: serverEnv.CONTACT_TO_EMAIL,
    subject: `Anfrage von ${name}${vehicle ? ` · ${vehicle}` : ''}`,
    html,
    replyTo: email,
  });

  if (!result.ok) {
    return { status: 'error' };
  }

  return { status: 'success' };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
