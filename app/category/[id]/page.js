'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { animeData } from '../../data/anime';
import { chineseAnimeData } from '../../data/chineseAnime';
import { tvShowsData } from '../../data/tvShows';
import { koreanDramasData } from '../../data/koreanDramas';
import { japaneseDramasData } from '../../data/japaneseDramas';
import { musicData } from '../../data/music';
import { moviesData } from '../../data/movies';
import { booksData } from '../../data/books';
import { toPng } from 'html-to-image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 text-gray-900 flex flex-col">
      <Navbar />

      {/* Sub Header */}
      <div className="bg-white border-b border-purple-200 py-6 px-8 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {currentCategory.name[language]}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700 bg-purple-100 px-4 py-2 rounded-lg">
              {language === 'cn' ? '已观看' : 'Watched'}: <span className="font-bold text-purple-700">{totalWatched} / {totalItems}</span>
            </div>
            <button
              onClick={handleGenerateSummary}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              {language === 'cn' ? '生成总结' : 'Generate Summary'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto py-12 px-8 w-full">
        {years.map((year) => {
          const items = data[year];
          const yearWatched = items.filter(
            (item) => watched[categoryId]?.[item.id]
          ).length;

          return (
            <div key={year} className="mb-12">
              <div className="mb-6 bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-purple-900">{year}</h2>
                  <span className="text-gray-700 font-semibold bg-purple-100 px-3 py-1 rounded-full">
                    {yearWatched} / {items.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 shadow-sm"
                    style={{
                      width: `${(yearWatched / items.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {items.map((item) => {
                  const isWatched = watched[categoryId]?.[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleWatched(categoryId, item.id)}
                      className={`aspect-square p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-center text-sm font-medium shadow-sm hover:shadow-md
                        ${
                          isWatched
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-500'
                            : 'bg-white text-gray-900 border-purple-200 hover:border-purple-400 hover:bg-purple-50'
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
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md"
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
