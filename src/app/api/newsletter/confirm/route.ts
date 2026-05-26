import { NextResponse } from 'next/server';
import { verifyNewsletterToken } from '@/lib/newsletter-token';

/**
 * Newsletter Double-Opt-In Confirmation.
 * User clicks link from confirmation mail → token validated → redirected to thank-you page.
 *
 * V1: validates token and shows confirmation page.
 * V1.5: adds to subscriber-list service (Resend Audiences / Buttondown / ConvertKit).
 */

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');

  if (!email || !token) {
    return NextResponse.redirect(new URL('/?newsletter=error', request.url));
  }

  if (!verifyNewsletterToken(email, token)) {
    return NextResponse.redirect(new URL('/?newsletter=invalid', request.url));
  }

  // TODO V1.5: add to subscriber list
  // await resend.contacts.create({ audienceId, email })

  return NextResponse.redirect(new URL('/?newsletter=confirmed', request.url));
}
