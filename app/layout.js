import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "CatFlix - Track Your Movies, Anime, TV Shows, Books & Games | Media Tracker",
    template: "%s | CatFlix Media Tracker"
  },
  description: "CatFlix is a professional media tracking tool to help you record and manage movies, anime, TV shows, books, and games you've watched. Features include progress tracking, ratings, notes, and curated lists. Perfect for movie lovers, anime fans, and entertainment enthusiasts.",
  keywords: [
    "黑猫影记", "CatFlix", "观影记录", "电影追踪", "动漫清单", "追番", "电视剧记录", "书籍阅读清单",
    "CatFlix", "media tracker", "movie tracker", "anime list", "tv show tracker", "reading list",
    "watchlist", "movie organizer", "anime tracker", "show progress", "entertainment tracker",
    "Japanese anime", "Miyazaki", "Shinkai", "Korean drama", "Japanese drama", "American TV series",
    "IMDb alternative", "MyAnimeList alternative", "Letterboxd alternative",
    "track movies", "track anime", "track tv shows", "track books", "track games",
    "movie database", "anime database", "TV show database", "gaming tracker",
    "progress tracking", "media management", "watch history", "entertainment organizer",
    "Steam games", "PlayStation games", "Xbox games", "Nintendo Switch games",
    "manga tracker", "audiobook tracker", "podcast tracker", "documentary tracker"
  ],
  authors: [{ name: "CatFlix Team" }],
  creator: "CatFlix",
  publisher: "CatFlix Media Tracker",
  applicationName: "CatFlix",
  category: "Entertainment",
  classification: "Media Tracking Application",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'zh-CN': '/zh-CN',
      'ja-JP': '/ja-JP',
      'ko-KR': '/ko-KR',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['zh_CN', 'ja_JP', 'ko_KR'],
    url: '/',
    siteName: 'CatFlix Media Tracker',
    title: 'CatFlix - Track Your Movies, Anime, TV Shows, Books & Games',
    description: 'Professional media tracking tool for movies, anime, TV shows, books, and games. Track your progress, rate content, write notes, and create curated lists. Perfect for entertainment enthusiasts.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CatFlix Media Tracker - Track Movies, Anime, TV Shows, Books & Games',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@catflix',
    creator: '@catflix',
    title: 'CatFlix - Track Your Movies, Anime, TV Shows, Books & Games',
    description: 'Professional media tracking tool for movies, anime, TV shows, books, and games. Track progress, rate content, and create curated lists.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    bing: 'your-bing-verification-code',
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#667eea" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CatFlix" />

        {/* Additional SEO tags */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://catflix.site'} />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Alternate languages */}
        <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://catflix.site'}/`} />
        <link rel="alternate" hrefLang="zh-Hans" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://catflix.site'}/zh-CN`} />
        <link rel="alternate" hrefLang="ja" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://catflix.site'}/ja-JP`} />
        <link rel="alternate" hrefLang="ko" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://catflix.site'}/ko-KR`} />
        <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://catflix.site'}/`} />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H1LBQ22873"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H1LBQ22873');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
