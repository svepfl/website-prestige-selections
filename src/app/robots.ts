import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.prestige-selections.com';

/**
 * robots.txt — 2026 AI-Crawler-Allowlist Strategy
 *
 * For Premium-Editorial-Sites the AI-search opportunity (Perplexity,
 * ChatGPT Search, Google AI Overview, Claude) outweighs the training-data
 * concern. We explicitly ALLOW all major AI crawlers — citation value > opacity.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // AI crawlers — explicitly allowed for citation in AI search engines
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'GoogleOther', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
