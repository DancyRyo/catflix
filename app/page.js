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

export default function Home() {
  const router = useRouter();
  const { language, setLanguage, getWatchedCount, getTotalCount } = useApp();

  const categories = [
    {
      id: 'anime',
      name: { cn: '日本动漫', en: 'Japanese Anime' },
      data: animeData,
      years: '2006-2024',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'chinese-anime',
      name: { cn: '中国动漫', en: 'Chinese Anime' },
      data: chineseAnimeData,
      years: '2010-2024',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'tv-shows',
      name: { cn: '外国电视剧', en: 'Foreign TV Shows' },
      data: tvShowsData,
      years: '2010-2024',
      bgColor: 'bg-green-50',
    },
    {
      id: 'korean-dramas',
      name: { cn: '韩剧', en: 'Korean Dramas' },
      data: koreanDramasData,
      years: '2010-2024',
      bgColor: 'bg-pink-50',
    },
    {
      id: 'japanese-dramas',
      name: { cn: '日剧', en: 'Japanese Dramas' },
      data: japaneseDramasData,
      years: '2010-2024',
      bgColor: 'bg-indigo-50',
    },
    {
      id: 'music',
      name: { cn: '音乐专辑', en: 'Music Albums' },
      data: musicData,
      years: '2010-2024',
      bgColor: 'bg-yellow-50',
    },
    {
      id: 'movies',
      name: { cn: '电影', en: 'Movies' },
      data: moviesData,
      years: '2010-2024',
      bgColor: 'bg-red-50',
    },
    {
      id: 'books',
      name: { cn: '外国新书', en: 'Foreign Books' },
      data: booksData,
      years: '2010-2024',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-200 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {language === 'cn' ? '观影记录' : 'Media Tracker'}
          </h1>
          <button
            onClick={() => setLanguage(language === 'cn' ? 'en' : 'cn')}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
          >
            {language === 'cn' ? 'English' : '中文'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            {language === 'cn' ? '选择分类' : 'Select Category'}
          </h2>
          <p className="text-gray-600">
            {language === 'cn'
              ? '记录你看过的动漫、电影、电视剧、音乐和书籍'
              : 'Track your watched anime, movies, TV shows, music, and books'}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const watchedCount = getWatchedCount(category.id);
            const totalCount = getTotalCount(category.data);
            const percentage =
              totalCount > 0 ? Math.round((watchedCount / totalCount) * 100) : 0;

            return (
              <button
                key={category.id}
                onClick={() => router.push(`/category/${category.id}`)}
                className={`${category.bgColor} hover:bg-gray-100 p-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-left border border-gray-200 hover:border-gray-300`}
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">
                    {category.name[language]}
                  </h3>
                  <p className="text-sm text-gray-600">{category.years}</p>
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
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-8 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          {language === 'cn'
            ? '追踪你的观影历程，记录美好时光'
            : 'Track your media journey, remember the good times'}
        </div>
      </footer>
    </div>
  );
}
