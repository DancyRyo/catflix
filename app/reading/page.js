'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { quotesData } from '../data/quotes';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ReadingPage() {
  const router = useRouter();
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 合并所有引用
  const allQuotes = useMemo(() => {
    return [
      ...quotesData.anime,
      ...quotesData.movies,
      ...quotesData.books,
      ...quotesData.music
    ];
  }, []);

  // 过滤和搜索
  const filteredQuotes = useMemo(() => {
    let filtered = allQuotes;

    // 按类别过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(quote => quote.category === selectedCategory);
    }

    // 按搜索词过滤
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(quote => {
        return (
          quote.cn.toLowerCase().includes(term) ||
          quote.en.toLowerCase().includes(term) ||
          quote.source.cn.toLowerCase().includes(term) ||
          quote.source.en.toLowerCase().includes(term) ||
          quote.author.cn.toLowerCase().includes(term) ||
          quote.author.en.toLowerCase().includes(term)
        );
      });
    }

    return filtered;
  }, [allQuotes, selectedCategory, searchTerm]);

  const categories = [
    { id: 'all', name: { cn: '全部', en: 'All' } },
    { id: 'anime', name: { cn: '动漫', en: 'Anime' } },
    { id: 'movies', name: { cn: '电影', en: 'Movies' } },
    { id: 'books', name: { cn: '书籍', en: 'Books' } },
    { id: 'music', name: { cn: '音乐', en: 'Music' } }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 text-gray-900 flex flex-col">
      <Navbar />

      {/* Sub Header */}
      <div className="border-b border-purple-200 py-6 px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {language === 'cn' ? '在线文学阅读' : 'Literary Quotes'}
            </h1>
            <p className="text-gray-600">
              {language === 'cn' ? '探索来自动漫、电影、书籍、音乐的经典名言' : 'Explore classic quotes from anime, movies, books, and music'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder={language === 'cn' ? '搜索引用、作者或来源...' : 'Search quotes, authors, or sources...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-400 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50'
                }`}
              >
                {cat.name[language]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto py-12 px-8 w-full">
        <div className="mb-6 text-gray-600">
          {language === 'cn' ? '找到' : 'Found'} {filteredQuotes.length} {language === 'cn' ? '条引用' : 'quotes'}
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map(quote => (
            <div
              key={quote.id}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg"
            >
              {/* Quote Text */}
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-900 mb-3 leading-relaxed">
                  {quote[language]}
                </p>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  {language === 'cn' ? quote.en : quote.cn}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-purple-300 my-4"></div>

              {/* Author and Source */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded">
                    {language === 'cn' ? '作者' : 'Author'}
                  </span>
                  <span className="text-sm text-gray-700">
                    {quote.author[language]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-pink-700 bg-pink-100 px-2 py-1 rounded">
                    {language === 'cn' ? '来源' : 'Source'}
                  </span>
                  <span className="text-sm text-gray-700">
                    {quote.source[language]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-1 rounded">
                    {language === 'cn' ? '类别' : 'Category'}
                  </span>
                  <span className="text-sm text-gray-700 capitalize">
                    {quote.category === 'anime' && (language === 'cn' ? '动漫' : 'Anime')}
                    {quote.category === 'movies' && (language === 'cn' ? '电影' : 'Movies')}
                    {quote.category === 'books' && (language === 'cn' ? '书籍' : 'Books')}
                    {quote.category === 'music' && (language === 'cn' ? '音乐' : 'Music')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredQuotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              {language === 'cn' ? '没有找到相关引用' : 'No quotes found'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
