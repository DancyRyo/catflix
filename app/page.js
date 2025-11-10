'use client';

import { useRouter } from 'next/navigation';
import { useApp } from './context/AppContext';
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
    <div className="min-h-screen bg-purple-50 text-gray-900 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto py-12 px-8 w-full">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-3 text-purple-600">
            {language === 'cn' ? '选择分类' : 'Select Category'}
          </h2>
          <p className="text-gray-700 text-lg">
            {language === 'cn'
              ? '记录你看过的动漫、电影、电视剧、音乐、书籍和喜欢的歌手与导演作品'
              : 'Track your watched anime, movies, TV shows, music, books, and favorite singers & directors'}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className={`${category.bgColor} hover:shadow-xl p-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-left border-2 border-purple-200 hover:border-purple-500`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <IconComponent className="w-8 h-8 text-purple-600" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">
                      {category.name[language]}
                    </h3>
                    <p className="text-sm text-gray-600">{category.years}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {language === 'cn' ? '观看进度' : 'Progress'}
                    </span>
                    <span className="font-semibold">
                      {watchedCount} / {totalCount}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="text-right text-sm text-gray-600">
                    {percentage}%
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
