export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://catflix.site';

  return {
    rules: [
      // General rules for all bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/static/development/',
          '/private/',
          '/*.json$',
          '/temp/',
          '/cache/',
        ],
      },
      // Google Bots - Most important for SEO
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/private/'],
      },
      {
        userAgent: 'Googlebot-Video',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
      },
      // Bing Bot
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'msnbot',
        allow: '/',
        crawlDelay: 1,
      },
      // Yandex Bot
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      // Baidu Bot - Important for Chinese market
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Baiduspider-image',
        allow: '/',
        crawlDelay: 1,
      },
      // Other Chinese search engines
      {
        userAgent: 'Sogou web spider',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: '360Spider',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'YisouSpider',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'HaosouSpider',
        allow: '/',
        crawlDelay: 1,
      },
      // Social media crawlers
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
      },
      {
        userAgent: 'TelegramBot',
        allow: '/',
      },
      // Apple Bot
      {
        userAgent: 'Applebot',
        allow: '/',
        crawlDelay: 0,
      },
      // DuckDuckGo Bot
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        crawlDelay: 0,
      },
      // Block aggressive SEO/scraping bots
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'PetalBot',
          'DataForSeoBot',
          'BLEXBot',
          'rogerbot',
          'spbot',
          'ZoominfoBot',
          'LinkpadBot',
          'Screaming Frog SEO Spider',
          'serpstatbot',
        ],
        disallow: '/',
      },
      // Block bad bots and scrapers
      {
        userAgent: [
          'CCBot',
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'anthropic-ai',
          'ClaudeBot',
          'Omgilibot',
          'Bytespider',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
