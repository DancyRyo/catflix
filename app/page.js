'use client';

import { useRouter } from 'next/navigation';
import { useApp } from './context/AppContext';
import Script from 'next/script';
import { animeData } from './data/anime';
import { chineseAnimeData } from './data/chineseAnime';
import { tvShowsData } from './data/tvShows';
import { koreanDramasData } from './data/koreanDramas';
import { japaneseDramasData } from './data/japaneseDramas';
import { musicData } from './data/music';
import { moviesData } from './data/movies';
import { booksData } from './data/books';
import { westernSingersData } from './data/westernSingers';
import { japaneseSingersData } from './data/japaneseSingers';
import { chineseSingersData } from './data/chineseSingers';
import { miyazakiWorksData } from './data/miyazakiWorks';
import { shinkaiWorksData } from './data/shinkaiWorks';
import { famousDirectorsData } from './data/famousDirectors';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  Film,
  Tv,
  Music,
  BookOpen,
  Palette,
  User,
  Clapperboard,
  Sparkles
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { language, getWatchedCount, getTotalCount } = useApp();

  const categories = [
    {
      id: 'anime',
      name: { cn: '日本动漫', en: 'Japanese Anime' },
      data: animeData,
      years: '2006-2024',
      icon: Palette,
      bgColor: 'bg-purple-50',
    },
    {
      id: 'chinese-anime',
      name: { cn: '中国动漫', en: 'Chinese Anime' },
      data: chineseAnimeData,
      years: '2010-2024',
      icon: Palette,
      bgColor: 'bg-purple-100',
    },
    {
      id: 'tv-shows',
      name: { cn: '外国电视剧', en: 'Foreign TV Shows' },
      data: tvShowsData,
      years: '2010-2024',
      icon: Tv,
      bgColor: 'bg-purple-50',
    },
    {
      id: 'korean-dramas',
      name: { cn: '韩剧', en: 'Korean Dramas' },
      data: koreanDramasData,
      years: '2010-2024',
      icon: Tv,
      bgColor: 'bg-purple-100',
    },
    {
      id: 'japanese-dramas',
      name: { cn: '日剧', en: 'Japanese Dramas' },
      data: japaneseDramasData,
      years: '2010-2024',
      icon: Tv,
      bgColor: 'bg-purple-50',
    },
    {
      id: 'music',
      name: { cn: '音乐专辑', en: 'Music Albums' },
      data: musicData,
      years: '2010-2024',
      icon: Music,
      bgColor: 'bg-purple-100',
    },
    {
      id: 'movies',
      name: { cn: '电影', en: 'Movies' },
      data: moviesData,
      years: '2010-2024',
      icon: Film,
      bgColor: 'bg-purple-50',
    },
    {
      id: 'books',
      name: { cn: '外国新书', en: 'Foreign Books' },
      data: booksData,
      years: '2010-2024',
      icon: BookOpen,
      bgColor: 'bg-purple-100',
    },
    {
      id: 'western-singers',
      name: { cn: '欧美歌手', en: 'Western Singers' },
      data: westernSingersData,
      years: '2010-2024',
      icon: User,
      bgColor: 'bg-purple-50',
    },
    {
      id: 'japanese-singers',
      name: { cn: '日本歌手', en: 'Japanese Singers' },
      data: japaneseSingersData,
      years: '2010-2024',
      icon: User,
      bgColor: 'bg-purple-100',
    },
    {
      id: 'chinese-singers',
      name: { cn: '中国歌手', en: 'Chinese Singers' },
      data: chineseSingersData,
      years: '2010-2024',
      icon: User,
      bgColor: 'bg-purple-50',
    },
    {
      id: 'miyazaki-works',
      name: { cn: '宫崎骏作品', en: 'Hayao Miyazaki Works' },
      data: miyazakiWorksData,
      years: '1984-2023',
      icon: Sparkles,
      bgColor: 'bg-purple-100',
    },
    {
      id: 'shinkai-works',
      name: { cn: '新海诚作品', en: 'Makoto Shinkai Works' },
      data: shinkaiWorksData,
      years: '2002-2022',
      icon: Sparkles,
      bgColor: 'bg-purple-50',
    },
    {
      id: 'famous-directors',
      name: { cn: '知名导演作品', en: 'Famous Directors' },
      data: famousDirectorsData,
      years: '2010-2024',
      icon: Clapperboard,
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="min-h-screen text-gray-900 flex flex-col relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto py-16 px-8 w-full">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold mb-4 gradient-text">
            {language === 'cn' ? '选择分类' : 'Select Category'}
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            {language === 'cn'
              ? '记录你看过的动漫、电影、电视剧、音乐、书籍和喜欢的歌手与导演作品'
              : 'Track your watched anime, movies, TV shows, music, books, and favorite singers & directors'}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const watchedCount = getWatchedCount(category.id);
            const totalCount = getTotalCount(category.data);
            const percentage =
              totalCount > 0 ? Math.round((watchedCount / totalCount) * 100) : 0;
            const IconComponent = category.icon;

            return (
              <button
                key={category.id}
                onClick={() => router.push(`/category/${category.id}`)}
                className="group relative bg-white/80 backdrop-blur-lg hover:shadow-2xl p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 text-left border border-white/60 hover:border-purple-400/50 overflow-hidden card-hover-lift"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-2xl"></div>

                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {category.name[language]}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">{category.years}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">
                        {language === 'cn' ? '观看进度' : 'Progress'}
                      </span>
                      <span className="font-bold text-purple-600">
                        {watchedCount} / {totalCount}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full transition-all duration-500 shadow-md"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <Footer />

      {/* Structured Data (JSON-LD) for SEO */}
      <Script id="schema-org" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": language === 'cn' ? "观影记录" : "Media Tracker",
          "alternateName": language === 'cn' ? "Media Tracker" : "观影记录",
          "description": language === 'cn'
            ? "专业的媒体追踪工具，帮助你记录和管理观看过的电影、日本动漫、电视剧、韩剧、日剧、书籍和游戏。支持进度追踪、评分、笔记和精选榜单。"
            : "Professional media tracking tool to help you record and manage movies, anime, TV shows, books and games you've watched. Supports progress tracking, ratings, notes and featured lists.",
          "url": typeof window !== 'undefined' ? window.location.origin : '',
          "applicationCategory": "EntertainmentApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
          },
          "featureList": [
            language === 'cn' ? "电影追踪" : "Movie Tracking",
            language === 'cn' ? "动漫清单管理" : "Anime List Management",
            language === 'cn' ? "电视剧记录" : "TV Show Recording",
            language === 'cn' ? "进度追踪" : "Progress Tracking",
            language === 'cn' ? "评分和笔记" : "Ratings and Notes",
            language === 'cn' ? "精选榜单" : "Featured Lists",
            language === 'cn' ? "多语言支持" : "Multi-language Support"
          ],
          "inLanguage": [
            { "@type": "Language", "name": "Chinese", "alternateName": "zh-CN" },
            { "@type": "Language", "name": "English", "alternateName": "en-US" }
          ]
        })}
      </Script>
    </div>
  );
}
