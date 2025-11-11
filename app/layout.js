import { Geist, Geist_Mono } from "next/font/google";
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
    default: "黑猫影记 - 追踪你的电影、动漫、电视剧、书籍和游戏 | CatFlix Media Tracker",
    template: "%s | 黑猫影记 CatFlix"
  },
  description: "黑猫影记 CatFlix - 专业的媒体追踪工具，帮助你记录和管理观看过的电影、日本动漫、电视剧、韩剧、日剧、书籍和游戏。支持进度追踪、评分、笔记和精选榜单。Track your movies, anime, TV shows, books and games with CatFlix.",
  keywords: [
    "黑猫影记", "CatFlix", "观影记录", "电影追踪", "动漫清单", "追番", "电视剧记录", "书籍阅读清单",
    "media tracker", "movie tracker", "anime list", "tv show tracker", "reading list", "catflix",
    "日本动漫", "宫崎骏", "新海诚", "豆瓣电影", "IMDb",
    "Japanese anime", "Miyazaki", "Shinkai", "Korean drama", "Japanese drama",
    "观看进度", "影视清单", "追剧神器", "观影统计", "媒体管理",
    "watchlist", "movie organizer", "anime tracker", "show progress"
  ],
  authors: [{ name: "CatFlix Team" }],
  creator: "CatFlix",
  publisher: "黑猫影记 CatFlix",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/zh-CN',
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    url: '/',
    siteName: '黑猫影记 CatFlix',
    title: '黑猫影记 CatFlix - 追踪你的电影、动漫、电视剧、书籍和游戏',
    description: '黑猫影记 CatFlix - 专业的媒体追踪工具，帮助你记录和管理观看过的电影、日本动漫、电视剧、韩剧、日剧、书籍和游戏。支持进度追踪、评分、笔记和精选榜单。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '黑猫影记 CatFlix Media Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '黑猫影记 CatFlix - 追踪你的电影、动漫、电视剧、书籍和游戏',
    description: '黑猫影记 CatFlix - 专业的媒体追踪工具，帮助你记录和管理观看过的电影、动漫、电视剧、书籍和游戏。',
    images: ['/twitter-image.jpg'],
    creator: '@catflix',
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
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#667eea" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="黑猫影记 CatFlix" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
