import crypto from 'node:crypto';
import { serverEnv } from './env';

/**
 * Newsletter Double-Opt-In Token — HMAC-based with embedded timestamp.
 *
 * Token format: `${timestampHex}.${hmac}` where:
 * - timestampHex = ms-since-epoch when token was issued, as hex
 * - hmac = HMAC-SHA256(`${email}:${timestampHex}`, SECRET) as hex
 *
 * Tokens expire after 7 days. Production REQUIRES NEWSLETTER_TOKEN_SECRET env;
 * in non-production builds we fall back to a marked dev secret so local dev
 * keeps working without setup. Constant-time comparison via timingSafeEqual.
 */

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const DEV_FALLBACK_SECRET = '__dev_only__do_not_use_in_production__do_not_use_in_production__';

function getSecret(): string {
  const secret = serverEnv.NEWSLETTER_TOKEN_SECRET;
  if (secret) return secret;
  if (serverEnv.NODE_ENV === 'production') {
    throw new Error(
      'NEWSLETTER_TOKEN_SECRET must be set in production (generate with `openssl rand -hex 32`)',
    );
  }
  return DEV_FALLBACK_SECRET;
}

function hmac(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function generateNewsletterToken(email: string): string {
  const timestampHex = Date.now().toString(16);
  const sig = hmac(`${email.toLowerCase()}:${timestampHex}`);
  return `${timestampHex}.${sig}`;
}

export function verifyNewsletterToken(email: string, token: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [timestampHex, providedSig] = parts;
  if (!timestampHex || !providedSig) return false;

  // Parse + validate timestamp range
  const issuedAt = parseInt(timestampHex, 16);
  if (!Number.isFinite(issuedAt) || issuedAt <= 0) return false;
  const age = Date.now() - issuedAt;
  if (age < 0 || age > TOKEN_TTL_MS) return false;

  // Re-derive expected signature and compare in constant time
  const expectedSig = hmac(`${email.toLowerCase()}:${timestampHex}`);
  if (expectedSig.length !== providedSig.length) return false;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expectedSig, 'hex'),
      Buffer.from(providedSig, 'hex'),
    );
  } catch {
    // Buffer.from on malformed hex throws — treat as invalid token
    return false;
  }
}
