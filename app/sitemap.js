export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://catflix.site';
  const currentDate = new Date();

  // Static pages with optimized priorities and frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/records`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/featured-lists`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reading`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/records/reading-mode`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // All category pages with proper SEO optimization
  const categories = [
    // Anime categories
    { slug: 'anime', priority: 0.9 },
    { slug: 'chinese-anime', priority: 0.8 },
    { slug: 'manga', priority: 0.8 },
    { slug: 'western-animation', priority: 0.7 },

    // TV Shows categories
    { slug: 'tv-shows', priority: 0.8 },
    { slug: 'korean-dramas', priority: 0.9 },
    { slug: 'japanese-dramas', priority: 0.8 },
    { slug: 'chinese-dramas', priority: 0.8 },
    { slug: 'thai-dramas', priority: 0.7 },
    { slug: 'american-dramas', priority: 0.8 },
    { slug: 'variety-shows', priority: 0.7 },

    // Movies categories
    { slug: 'movies', priority: 0.9 },
    { slug: 'korean-movies', priority: 0.8 },
    { slug: 'japanese-movies', priority: 0.8 },
    { slug: 'chinese-movies', priority: 0.8 },
    { slug: 'documentaries', priority: 0.7 },

    // Directors and creators
    { slug: 'miyazaki-works', priority: 0.8 },
    { slug: 'shinkai-works', priority: 0.8 },
    { slug: 'famous-directors', priority: 0.8 },

    // Music categories
    { slug: 'music', priority: 0.7 },
    { slug: 'western-singers', priority: 0.7 },
    { slug: 'japanese-singers', priority: 0.7 },
    { slug: 'chinese-singers', priority: 0.7 },
    { slug: 'podcasts', priority: 0.6 },

    // Books categories
    { slug: 'books', priority: 0.8 },
    { slug: 'audiobooks', priority: 0.7 },

    // Gaming categories
    { slug: 'steam-games', priority: 0.8 },
    { slug: 'ios-games', priority: 0.7 },
    { slug: 'switch-games', priority: 0.8 },
    { slug: 'ps-games', priority: 0.8 },
    { slug: 'xbox-games', priority: 0.7 },
  ];

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: category.priority,
  }));

  // Language alternates
  const languagePages = [
    {
      url: `${baseUrl}/en-US`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/zh-CN`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/ja-JP`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/ko-KR`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  return [...staticPages, ...categoryPages, ...languagePages];
}
