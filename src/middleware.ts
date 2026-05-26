import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Intentionally using `middleware.ts` (the Next 16-deprecated naming, replaced
// by `proxy.ts`) because the new `proxy.ts` is locked to Node.js runtime,
// which @opennextjs/cloudflare v1.19.x doesn't support yet. `middleware.ts`
// defaults to Edge, which is what Cloudflare Workers needs.
// Tracked in opennextjs-cloudflare#962 — revisit when Node proxy lands.
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
