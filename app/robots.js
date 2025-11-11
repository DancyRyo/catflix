export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/*.json$',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        crawlDelay: 1,
      },
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
      // 允许其他中文搜索引擎
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
      // 阻止已知的恶意爬虫
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'PetalBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
