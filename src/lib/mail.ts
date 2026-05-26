'use server';

import { Resend } from 'resend';
import { serverEnv } from './env';

/**
 * Mail-Service. Resend used when RESEND_API_KEY is configured.
 * In dev without API key: log to console (so forms can be tested without
 * sending real mail).
 */

function getResend(): Resend | null {
  if (!serverEnv.RESEND_API_KEY) return null;
  return new Resend(serverEnv.RESEND_API_KEY);
}

export type MailPayload = {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
};

export async function sendMail(payload: MailPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const resend = getResend();
  if (!resend) {
    console.log('[mail:dev]', payload.subject, '→', payload.to);
    return { ok: true };
  }

  try {
    const { error } = await resend.emails.send({
      to: payload.to,
      from: payload.from ?? serverEnv.CONTACT_FROM_EMAIL,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });
    if (error) {
      console.error('[mail:resend]', error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown mail error';
    console.error('[mail:throw]', msg);
    return { ok: false, error: msg };
  }
}
