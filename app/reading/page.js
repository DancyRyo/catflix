'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { quotesData } from '../data/quotes';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, User, BookOpen, Tag, Eye, Grid3x3, ArrowLeft, ArrowRight, X, Plus } from 'lucide-react';

export default function ReadingPage() {
  const router = useRouter();
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [readingMode, setReadingMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [userQuotes, setUserQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({
    cn: '',
    en: '',
    sourceCn: '',
    sourceEn: '',
    authorCn: '',
    authorEn: '',
    category: 'books'
  });

  // 从 localStorage 加载用户引用
  useEffect(() => {
    const saved = localStorage.getItem('userQuotes');
    if (saved) {
      try {
        setUserQuotes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load user quotes:', e);
      }
    }
  }, []);

  // 键盘事件监听器 - 用于阅读模式
  useEffect(() => {
    if (!readingMode) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setReadingMode(false);
        setCurrentIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [readingMode, currentIndex, filteredQuotes.length]);

  // 保存用户引用到 localStorage
  const saveUserQuote = (quote) => {
    const newUserQuote = {
      id: `user-${Date.now()}`,
      cn: quote.cn,
      en: quote.en,
      source: { cn: quote.sourceCn, en: quote.sourceEn },
      author: { cn: quote.authorCn, en: quote.authorEn },
      category: 'mine'
    };

    const updated = [...userQuotes, newUserQuote];
    setUserQuotes(updated);
    localStorage.setItem('userQuotes', JSON.stringify(updated));

    // 重置表单
    setNewQuote({
      cn: '',
      en: '',
      sourceCn: '',
      sourceEn: '',
      authorCn: '',
      authorEn: '',
      category: 'books'
    });
    setShowAddModal(false);

    // 显示通知
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 animate-fade-in font-semibold border border-white/30';
    notification.textContent = language === 'cn' ? '✓ 引用添加成功' : '✓ Quote added successfully';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(10px)';
      notification.style.transition = 'all 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  // 合并所有引用
  const allQuotes = useMemo(() => {
    return [
      ...quotesData.anime,
      ...quotesData.movies,
      ...quotesData.books,
      ...quotesData.music,
      ...userQuotes
    ];
  }, [userQuotes]);

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
    { id: 'mine', name: { cn: '我的', en: 'Mine' } },
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
      <div className="min-h-screen text-gray-900 flex flex-col relative">
        {/* Animated gradient background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50"></div>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Header */}
        <div className="p-6 flex justify-between items-center backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
          <button
            onClick={() => {
              setReadingMode(false);
              setCurrentIndex(0);
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
          >
            <X size={20} />
            {language === 'cn' ? '退出阅读模式' : 'Exit Reading Mode'}
          </button>

          <div className="text-gray-800 font-bold bg-gradient-to-r from-purple-100 to-pink-100 px-5 py-3 rounded-xl shadow-md border border-white/60">
            {currentIndex + 1} / {filteredQuotes.length}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-4xl w-full">
            {/* Quote Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-12 shadow-2xl border border-white/60">
              {/* Quote Text */}
              <div className="mb-8">
                <p className="text-3xl font-medium leading-relaxed mb-6 text-gray-800">
                  "{currentQuote[language]}"
                </p>
                <p className="text-xl text-gray-600 italic leading-relaxed">
                  "{language === 'cn' ? currentQuote.en : currentQuote.cn}"
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-purple-300 my-8"></div>

              {/* Author and Source */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-purple-600" />
                  <span className="text-lg text-gray-600">
                    {language === 'cn' ? '作者：' : 'Author: '}
                    <span className="text-gray-900 font-semibold">
                      {currentQuote.author[language]}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="text-lg text-gray-600">
                    {language === 'cn' ? '来源：' : 'Source: '}
                    <span className="text-gray-900 font-semibold">
                      {currentQuote.source[language]}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-purple-600" />
                  <span className="text-lg text-gray-600">
                    {language === 'cn' ? '类别：' : 'Category: '}
                    <span className="text-gray-900 font-semibold capitalize">
                      {currentQuote.category === 'anime' && (language === 'cn' ? '动漫' : 'Anime')}
                      {currentQuote.category === 'movies' && (language === 'cn' ? '电影' : 'Movies')}
                      {currentQuote.category === 'books' && (language === 'cn' ? '书籍' : 'Books')}
                      {currentQuote.category === 'music' && (language === 'cn' ? '音乐' : 'Music')}
                      {currentQuote.category === 'mine' && (language === 'cn' ? '我的' : 'Mine')}
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
                className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg ${
                  currentIndex === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white/90 text-gray-800 hover:bg-white hover:shadow-xl hover:scale-105 border border-white/60'
                }`}
              >
                <ArrowLeft size={20} />
                {language === 'cn' ? '上一个' : 'Previous'}
              </button>

              <div className="text-gray-600 text-sm font-medium bg-white/80 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/60 shadow-md text-center">
                {language === 'cn'
                  ? '提示：使用方向键 ← → 切换，Esc 退出'
                  : 'Tip: Use ← → to navigate, Esc to exit'}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredQuotes.length - 1}
                className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg ${
                  currentIndex === filteredQuotes.length - 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white/90 text-gray-800 hover:bg-white hover:shadow-xl hover:scale-105 border border-white/60'
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

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Plus size={18} />
                {language === 'cn' ? '添加引用' : 'Add Quote'}
              </button>

              <button
                onClick={() => setReadingMode(true)}
                disabled={filteredQuotes.length === 0}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Eye size={18} />
                {language === 'cn' ? '阅读模式' : 'Reading Mode'}
              </button>
            </div>
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
                    {quote.category === 'mine' && (language === 'cn' ? '我的' : 'Mine')}
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

      {/* Add Quote Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Plus size={24} />
                  {language === 'cn' ? '添加新引用' : 'Add New Quote'}
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* 中文句子 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === 'cn' ? '中文句子 *' : 'Chinese Quote *'}
                </label>
                <textarea
                  value={newQuote.cn}
                  onChange={(e) => setNewQuote({ ...newQuote, cn: e.target.value })}
                  placeholder={language === 'cn' ? '输入中文句子...' : 'Enter Chinese quote...'}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-900 resize-none"
                  rows="3"
                  required
                />
              </div>

              {/* 英文句子 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === 'cn' ? '英文句子 *' : 'English Quote *'}
                </label>
                <textarea
                  value={newQuote.en}
                  onChange={(e) => setNewQuote({ ...newQuote, en: e.target.value })}
                  placeholder={language === 'cn' ? '输入英文句子...' : 'Enter English quote...'}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-900 resize-none"
                  rows="3"
                  required
                />
              </div>

              {/* 作品名称 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'cn' ? '中文作品名 *' : 'Chinese Source *'}
                  </label>
                  <input
                    type="text"
                    value={newQuote.sourceCn}
                    onChange={(e) => setNewQuote({ ...newQuote, sourceCn: e.target.value })}
                    placeholder={language === 'cn' ? '例如：红楼梦' : 'e.g.: 红楼梦'}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'cn' ? '英文作品名 *' : 'English Source *'}
                  </label>
                  <input
                    type="text"
                    value={newQuote.sourceEn}
                    onChange={(e) => setNewQuote({ ...newQuote, sourceEn: e.target.value })}
                    placeholder={language === 'cn' ? 'e.g.: Dream of the Red Chamber' : 'e.g.: Dream of the Red Chamber'}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* 作者 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'cn' ? '中文作者 *' : 'Chinese Author *'}
                  </label>
                  <input
                    type="text"
                    value={newQuote.authorCn}
                    onChange={(e) => setNewQuote({ ...newQuote, authorCn: e.target.value })}
                    placeholder={language === 'cn' ? '例如：曹雪芹' : 'e.g.: 曹雪芹'}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'cn' ? '英文作者 *' : 'English Author *'}
                  </label>
                  <input
                    type="text"
                    value={newQuote.authorEn}
                    onChange={(e) => setNewQuote({ ...newQuote, authorEn: e.target.value })}
                    placeholder={language === 'cn' ? 'e.g.: Cao Xueqin' : 'e.g.: Cao Xueqin'}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* 按钮 */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold"
                >
                  {language === 'cn' ? '取消' : 'Cancel'}
                </button>
                <button
                  onClick={() => {
                    if (newQuote.cn && newQuote.en && newQuote.sourceCn && newQuote.sourceEn && newQuote.authorCn && newQuote.authorEn) {
                      saveUserQuote(newQuote);
                    } else {
                      alert(language === 'cn' ? '请填写所有必填字段' : 'Please fill in all required fields');
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold shadow-lg hover:shadow-xl"
                >
                  {language === 'cn' ? '保存' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
