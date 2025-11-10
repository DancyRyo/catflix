'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { quotesData } from '../data/quotes';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, User, BookOpen, Tag, Eye, Grid3x3, ArrowLeft, ArrowRight, X } from 'lucide-react';

export default function ReadingPage() {
  const router = useRouter();
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [readingMode, setReadingMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
    if (currentIndex < filteredQuotes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Reading Mode View
  if (readingMode && filteredQuotes.length > 0) {
    const currentQuote = filteredQuotes[currentIndex];

    return (
      <div className="min-h-screen bg-purple-900 text-white flex flex-col">
        {/* Header */}
        <div className="p-6 flex justify-between items-center bg-purple-800">
          <button
            onClick={() => {
              setReadingMode(false);
              setCurrentIndex(0);
            }}
            className="px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all flex items-center gap-2"
          >
            <X size={20} />
            {language === 'cn' ? '退出阅读模式' : 'Exit Reading Mode'}
          </button>

          <div className="text-gray-300">
            {currentIndex + 1} / {filteredQuotes.length}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-4xl w-full">
            {/* Quote Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-12 shadow-2xl">
              {/* Quote Text */}
              <div className="mb-8">
                <p className="text-3xl font-medium leading-relaxed mb-6">
                  "{currentQuote[language]}"
                </p>
                <p className="text-xl text-gray-300 italic leading-relaxed">
                  "{language === 'cn' ? currentQuote.en : currentQuote.cn}"
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-purple-400 my-8"></div>

              {/* Author and Source */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-purple-300" />
                  <span className="text-lg text-purple-200">
                    {language === 'cn' ? '作者：' : 'Author: '}
                    <span className="text-white font-semibold">
                      {currentQuote.author[language]}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-purple-300" />
                  <span className="text-lg text-purple-200">
                    {language === 'cn' ? '来源：' : 'Source: '}
                    <span className="text-white font-semibold">
                      {currentQuote.source[language]}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-purple-300" />
                  <span className="text-lg text-purple-200">
                    {language === 'cn' ? '类别：' : 'Category: '}
                    <span className="text-white font-semibold capitalize">
                      {currentQuote.category === 'anime' && (language === 'cn' ? '动漫' : 'Anime')}
                      {currentQuote.category === 'movies' && (language === 'cn' ? '电影' : 'Movies')}
                      {currentQuote.category === 'books' && (language === 'cn' ? '书籍' : 'Books')}
                      {currentQuote.category === 'music' && (language === 'cn' ? '音乐' : 'Music')}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  currentIndex === 0
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                <ArrowLeft size={20} />
                {language === 'cn' ? '上一个' : 'Previous'}
              </button>

              <div className="text-gray-400 text-sm">
                {language === 'cn'
                  ? '提示：使用方向键 ← → 切换'
                  : 'Tip: Use arrow keys ← → to navigate'}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredQuotes.length - 1}
                className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  currentIndex === filteredQuotes.length - 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                {language === 'cn' ? '下一个' : 'Next'}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal Grid View
  return (
    <div className="min-h-screen bg-purple-50 text-gray-900 flex flex-col">
      <Navbar />

      {/* Sub Header */}
      <div className="border-b border-purple-200 py-6 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-purple-600 mb-2 flex items-center gap-3">
                <BookOpen className="w-10 h-10" />
                {language === 'cn' ? '在线文学阅读' : 'Literary Quotes'}
              </h1>
              <p className="text-gray-600">
                {language === 'cn' ? '探索来自动漫、电影、书籍、音乐的经典名言' : 'Explore classic quotes from anime, movies, books, and music'}
              </p>
            </div>

            <button
              onClick={() => setReadingMode(true)}
              disabled={filteredQuotes.length === 0}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye size={18} />
              {language === 'cn' ? '阅读模式' : 'Reading Mode'}
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'cn' ? '搜索引用、作者或来源...' : 'Search quotes, authors, or sources...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-900 placeholder-gray-400"
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
        <div className="mb-6 text-gray-600 flex items-center gap-2">
          <Grid3x3 size={18} />
          {language === 'cn' ? '找到' : 'Found'} {filteredQuotes.length} {language === 'cn' ? '条引用' : 'quotes'}
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map(quote => (
            <div
              key={quote.id}
              className="bg-white p-6 rounded-xl border-2 border-purple-200 hover:border-purple-500 transition-all duration-300 hover:shadow-lg"
            >
              {/* Quote Text */}
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-900 mb-3 leading-relaxed">
                  "{quote[language]}"
                </p>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  "{language === 'cn' ? quote.en : quote.cn}"
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-purple-200 my-4"></div>

              {/* Author and Source */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700">
                    {language === 'cn' ? '作者' : 'Author'}:
                  </span>
                  <span className="text-sm text-gray-700">
                    {quote.author[language]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700">
                    {language === 'cn' ? '来源' : 'Source'}:
                  </span>
                  <span className="text-sm text-gray-700">
                    {quote.source[language]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700">
                    {language === 'cn' ? '类别' : 'Category'}:
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
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-300" />
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
