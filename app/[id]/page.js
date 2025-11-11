'use client';

import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { animeData } from '../data/anime';
import { chineseAnimeData } from '../data/chineseAnime';
import { tvShowsData } from '../data/tvShows';
import { koreanDramasData } from '../data/koreanDramas';
import { japaneseDramasData } from '../data/japaneseDramas';
import { musicData } from '../data/music';
import { moviesData } from '../data/movies';
import { booksData } from '../data/books';
import { westernSingersData } from '../data/westernSingers';
import { japaneseSingersData } from '../data/japaneseSingers';
import { chineseSingersData } from '../data/chineseSingers';
import { miyazakiWorksData } from '../data/miyazakiWorks';
import { shinkaiWorksData } from '../data/shinkaiWorks';
import { famousDirectorsData } from '../data/famousDirectors';
import { toPng } from 'html-to-image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { language, watched, toggleWatched } = useApp();
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef(null);

  const categoryId = params.id;

  const categoryData = {
    'anime': { name: { cn: '日本动漫', en: 'Japanese Anime' }, data: animeData },
    'chinese-anime': { name: { cn: '中国动漫', en: 'Chinese Anime' }, data: chineseAnimeData },
    'tv-shows': { name: { cn: '外国电视剧', en: 'Foreign TV Shows' }, data: tvShowsData },
    'korean-dramas': { name: { cn: '韩剧', en: 'Korean Dramas' }, data: koreanDramasData },
    'japanese-dramas': { name: { cn: '日剧', en: 'Japanese Dramas' }, data: japaneseDramasData },
    'music': { name: { cn: '音乐专辑', en: 'Music Albums' }, data: musicData },
    'movies': { name: { cn: '电影', en: 'Movies' }, data: moviesData },
    'books': { name: { cn: '外国新书', en: 'Foreign Books' }, data: booksData },
    'western-singers': { name: { cn: '欧美歌手', en: 'Western Singers' }, data: westernSingersData },
    'japanese-singers': { name: { cn: '日本歌手', en: 'Japanese Singers' }, data: japaneseSingersData },
    'chinese-singers': { name: { cn: '中国歌手', en: 'Chinese Singers' }, data: chineseSingersData },
    'miyazaki-works': { name: { cn: '宫崎骏作品', en: 'Miyazaki Works' }, data: miyazakiWorksData },
    'shinkai-works': { name: { cn: '新海诚作品', en: 'Shinkai Works' }, data: shinkaiWorksData },
    'famous-directors': { name: { cn: '知名导演作品', en: 'Famous Directors' }, data: famousDirectorsData },
  };

  const currentCategory = categoryData[categoryId];
  if (!currentCategory) {
    return <div>Category not found</div>;
  }

  const data = currentCategory.data;
  const years = Object.keys(data).sort();

  const getSummary = () => {
    const summary = {};
    years.forEach((year) => {
      const items = data[year];
      const watchedItems = [];
      const unwatchedItems = [];

      items.forEach((item) => {
        const isWatched = watched[categoryId]?.[item.id];
        if (isWatched) {
          watchedItems.push(item[language]);
        } else {
          unwatchedItems.push(item[language]);
        }
      });

      summary[year] = { watched: watchedItems, unwatched: unwatchedItems };
    });
    return summary;
  };

  const handleGenerateSummary = async () => {
    setShowSummary(true);
    setTimeout(async () => {
      if (summaryRef.current) {
        try {
          const dataUrl = await toPng(summaryRef.current, { quality: 0.95 });
          const link = document.createElement('a');
          link.download = `${categoryId}-summary.png`;
          link.href = dataUrl;
          link.click();
        } catch (err) {
          console.error('Failed to generate image:', err);
        }
      }
    }, 100);
  };

  const summary = getSummary();
  const totalWatched = Object.values(summary).reduce(
    (acc, year) => acc + year.watched.length,
    0
  );
  const totalItems = years.reduce((acc, year) => acc + data[year].length, 0);

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

      {/* Sub Header */}
      <div className="backdrop-blur-xl bg-white/70 border-b border-white/20 py-6 px-8 sticky top-[73px] z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold gradient-text">
              {currentCategory.name[language]}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700 bg-gradient-to-r from-purple-100 to-pink-100 px-5 py-3 rounded-xl shadow-md backdrop-blur-sm border border-white/60">
              {language === 'cn' ? '已观看' : 'Watched'}: <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{totalWatched} / {totalItems}</span>
            </div>
            <button
              onClick={handleGenerateSummary}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              {language === 'cn' ? '生成总结' : 'Generate Summary'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto py-16 px-8 w-full">
        {years.map((year) => {
          const items = data[year];
          const yearWatched = items.filter(
            (item) => watched[categoryId]?.[item.id]
          ).length;

          return (
            <div key={year} className="mb-16">
              <div className="mb-8 bg-white/80 backdrop-blur-lg p-6 rounded-2xl border border-white/60 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{year}</h2>
                  <span className="text-gray-700 font-bold bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full shadow-md border border-white/60">
                    {yearWatched} / {items.length}
                  </span>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full transition-all duration-500 shadow-md"
                    style={{
                      width: `${(yearWatched / items.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {items.map((item) => {
                  const isWatched = watched[categoryId]?.[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleWatched(categoryId, item.id)}
                      className={`aspect-square p-4 rounded-2xl transition-all duration-300 flex items-center justify-center text-center text-sm font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 border-2
                        ${
                          isWatched
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-400/50'
                            : 'bg-white/80 backdrop-blur-sm text-gray-800 border-white/60 hover:border-purple-400/50 hover:bg-white/90'
                        }`}
                      title={item[language]}
                    >
                      <span className="line-clamp-3">{item[language]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>

      <Footer />

      {/* Summary Modal */}
      {showSummary && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-8 overflow-auto"
          onClick={() => setShowSummary(false)}
        >
          <div
            ref={summaryRef}
            className="bg-white text-black p-8 rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              {currentCategory.name[language]} - {language === 'cn' ? '观看总结' : 'Watch Summary'}
            </h2>
            <div className="space-y-6">
              {years.map((year) => {
                const yearSummary = summary[year];
                if (
                  yearSummary.watched.length === 0 &&
                  yearSummary.unwatched.length === 0
                )
                  return null;

                return (
                  <div key={year} className="border-b border-gray-300 pb-4">
                    <h3 className="text-xl font-bold mb-2">**{year}**:</h3>
                    {yearSummary.watched.length > 0 && (
                      <p className="mb-2">
                        <span className="font-semibold">
                          {language === 'cn' ? '看过' : 'Watched'}:
                        </span>{' '}
                        {yearSummary.watched.join(', ')}
                      </p>
                    )}
                    {yearSummary.unwatched.length > 0 && (
                      <p>
                        <span className="font-semibold">
                          {language === 'cn' ? '没看过' : 'Not Watched'}:
                        </span>{' '}
                        {yearSummary.unwatched.join(', ')}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowSummary(false)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md"
              >
                {language === 'cn' ? '关闭' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
