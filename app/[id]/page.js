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
import { Copy, Download, Sparkles } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { language, watched, toggleWatched } = useApp();
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAIPrompt] = useState('');
  const mainContentRef = useRef(null);

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

  // 生成AI提示词
  const handleGenerateAIPrompt = () => {
    const summary = getSummary();
    const categoryName = currentCategory.name[language];

    let prompt = language === 'cn'
      ? `嘿！我想让你用你那俏皮幽默又不失中肯的风格，帮我写一篇关于我${categoryName}观看记录的总结。要赞扬我的品味，但也可以调侃一下我的"选择困难症"😄\n\n以下是我的观看记录：\n\n`
      : `Hey! I want you to write a summary of my ${categoryName} watching history in a witty, humorous yet thoughtful style. Praise my taste, but feel free to tease my "choice paralysis" 😄\n\nHere's my watching record:\n\n`;

    years.forEach((year) => {
      const yearSummary = summary[year];
      if (yearSummary.watched.length === 0 && yearSummary.unwatched.length === 0) return;

      prompt += `**${year}${language === 'cn' ? '年' : ''}**:\n`;
      if (yearSummary.watched.length > 0) {
        prompt += `${language === 'cn' ? '✓ 已观看' : '✓ Watched'}: ${yearSummary.watched.join(', ')}\n`;
      }
      if (yearSummary.unwatched.length > 0) {
        prompt += `${language === 'cn' ? '○ 未观看' : '○ Not watched'}: ${yearSummary.unwatched.join(', ')}\n`;
      }
      prompt += '\n';
    });

    prompt += language === 'cn'
      ? `\n请用幽默风趣的语气，分析一下我的观看品味，并给出一些俏皮的评价和建议。记得要真诚、有趣，让人看了会心一笑！🎬✨`
      : `\nPlease analyze my viewing taste in a humorous and witty tone, and give some playful comments and suggestions. Remember to be genuine, fun, and make people smile! 🎬✨`;

    setAIPrompt(prompt);
    setShowAIPrompt(true);
  };

  // 保存页面图片
  const handleSaveImage = async () => {
    if (mainContentRef.current) {
      try {
        const dataUrl = await toPng(mainContentRef.current, {
          quality: 0.95,
          pixelRatio: 2,
          cacheBust: true,
        });

        const link = document.createElement('a');
        link.download = `${categoryId}-${currentCategory.name[language]}.png`;
        link.href = dataUrl;
        link.click();

        // 显示成功通知
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 animate-fade-in font-semibold border border-white/30';
        notification.textContent = language === 'cn' ? '✓ 图片保存成功' : '✓ Image saved successfully';
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.style.opacity = '0';
          notification.style.transform = 'translateY(10px)';
          notification.style.transition = 'all 0.3s ease-out';
          setTimeout(() => notification.remove(), 300);
        }, 2000);
      } catch (err) {
        console.error('Failed to generate image:', err);
        alert(language === 'cn' ? '生成图片失败，请重试' : 'Failed to generate image, please try again');
      }
    }
  };

  // 复制AI提示词
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(aiPrompt).then(() => {
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 animate-fade-in font-semibold border border-white/30';
      notification.textContent = language === 'cn' ? '✓ 已复制到剪贴板' : '✓ Copied to clipboard';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(10px)';
        notification.style.transition = 'all 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    });
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
              onClick={handleSaveImage}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <Download size={18} />
              {language === 'cn' ? '保存图片' : 'Save Image'}
            </button>
            <button
              onClick={handleGenerateAIPrompt}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <Sparkles size={18} />
              {language === 'cn' ? '生成AI提示词' : 'Generate AI Prompt'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 max-w-7xl mx-auto py-8 px-8 w-full">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/60 overflow-hidden">
        {years.map((year) => {
          const items = data[year];
          const yearWatched = items.filter(
            (item) => watched[categoryId]?.[item.id]
          ).length;

          return (
            <div key={year} className="border-b border-purple-200 last:border-b-0">
              <div className="flex items-center gap-6 py-3 hover:bg-purple-50/50 transition-colors">
                {/* Left: Year and Progress */}
                <div className="flex-shrink-0 w-28 text-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">{year}</h2>
                  <span className="text-xs text-gray-700 font-bold bg-gradient-to-r from-purple-100 to-pink-100 px-2 py-0.5 rounded-full inline-block">
                    {yearWatched}/{items.length}
                  </span>
                  <div className="mt-1.5 relative w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${(yearWatched / items.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Right: Grid of Items */}
                <div className="flex-1 grid grid-cols-12 gap-1.5">
                  {items.map((item) => {
                    const isWatched = watched[categoryId]?.[item.id];
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleWatched(categoryId, item.id)}
                        className={`aspect-square p-1 rounded-md transition-all duration-300 flex items-center justify-center text-center text-xs font-semibold shadow-sm hover:shadow-lg transform hover:scale-110 border
                          ${
                            isWatched
                              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-400/50'
                              : 'bg-white text-gray-800 border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                          }`}
                        title={item[language]}
                      >
                        <span className="line-clamp-2 leading-tight text-[10px]">{item[language]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </main>

      <Footer />

      {/* AI Prompt Modal */}
      {showAIPrompt && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAIPrompt(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles size={24} />
                  {language === 'cn' ? 'AI 提示词已生成' : 'AI Prompt Generated'}
                </h2>
                <button
                  onClick={() => setShowAIPrompt(false)}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="bg-gray-50 rounded-xl p-6 mb-4 border-2 border-purple-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                  {aiPrompt}
                </pre>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                <p className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-purple-600" />
                  <span className="font-semibold">
                    {language === 'cn' ? '使用说明：' : 'How to use:'}
                  </span>
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {language === 'cn'
                    ? '点击下方按钮复制提示词，然后粘贴到任何AI对话中（如ChatGPT、Claude等），让AI为你生成一份俏皮幽默的观看总结！🎭'
                    : 'Click the button below to copy the prompt, then paste it into any AI chat (like ChatGPT, Claude, etc.) to get a witty and humorous summary of your watching history! 🎭'}
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl flex gap-3">
              <button
                onClick={() => setShowAIPrompt(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
              >
                {language === 'cn' ? '关闭' : 'Close'}
              </button>
              <button
                onClick={handleCopyPrompt}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Copy size={18} />
                {language === 'cn' ? '复制提示词' : 'Copy Prompt'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
