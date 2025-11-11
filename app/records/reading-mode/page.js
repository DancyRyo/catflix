'use client';

import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import {
  X,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Gamepad2,
  Film,
  Palette,
  Star
} from 'lucide-react';

export default function ReadingModePage() {
  const { language, records } = useApp();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterType, setFilterType] = useState('all');

  // Filter records
  const filteredRecords =
    filterType === 'all'
      ? records
      : records.filter((record) => record.type === filterType);

  const currentRecord = filteredRecords[currentIndex];
  const hasRecords = filteredRecords.length > 0;

  const handleNext = () => {
    if (currentIndex < filteredRecords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') router.back();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, filteredRecords.length]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(language === 'cn' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const typeLabels = {
    books: { cn: '书籍', en: 'Book', icon: BookOpen },
    games: { cn: '游戏', en: 'Game', icon: Gamepad2 },
    movies: { cn: '电影', en: 'Movie', icon: Film },
    anime: { cn: '动漫', en: 'Anime', icon: Palette },
  };

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
          onClick={() => router.back()}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
        >
          <X size={20} />
          {language === 'cn' ? '退出阅读模式' : 'Exit Reading Mode'}
        </button>

        {/* Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setFilterType('all');
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg ${
              filterType === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/80 text-gray-700 hover:bg-white border border-white/60'
            }`}
          >
            {language === 'cn' ? '全部' : 'All'}
          </button>
          {Object.keys(typeLabels).map((type) => {
            const IconComponent = typeLabels[type].icon;
            return (
              <button
                key={type}
                onClick={() => {
                  setFilterType(type);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg ${
                  filterType === type
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/80 text-gray-700 hover:bg-white border border-white/60'
                }`}
              >
                <IconComponent size={16} />
                {language === 'cn' ? typeLabels[type].cn : typeLabels[type].en}
              </button>
            );
          })}
        </div>

        <div className="text-gray-800 font-bold bg-gradient-to-r from-purple-100 to-pink-100 px-5 py-3 rounded-xl shadow-md border border-white/60">
          {hasRecords
            ? `${currentIndex + 1} / ${filteredRecords.length}`
            : '0 / 0'}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        {!hasRecords ? (
          <div className="text-center bg-white/80 backdrop-blur-lg p-12 rounded-2xl border border-white/60 shadow-2xl">
            <BookOpen className="w-24 h-24 mx-auto mb-4 text-purple-500" />
            <p className="text-2xl text-gray-700 font-semibold mb-2">
              {language === 'cn' ? '暂无记录' : 'No records'}
            </p>
            <p className="text-gray-500 mb-6">
              {language === 'cn' ? '开始记录你的观影体验吧！' : 'Start recording your viewing experience!'}
            </p>
            <button
              onClick={() => router.push('/records')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
            >
              {language === 'cn' ? '去添加记录' : 'Add Records'}
            </button>
          </div>
        ) : (
          <div className="max-w-4xl w-full">
            {/* Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/60">
              {/* Image */}
              {currentRecord.image && (
                <div className="h-96 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  <img
                    src={currentRecord.image}
                    alt={currentRecord.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-8">
                {/* Type and Status */}
                <div className="flex gap-3 mb-6">
                  {(() => {
                    const IconComponent = typeLabels[currentRecord.type].icon;
                    return (
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold flex items-center gap-2 shadow-md">
                        <IconComponent size={14} />
                        {language === 'cn'
                          ? typeLabels[currentRecord.type].cn
                          : typeLabels[currentRecord.type].en}
                      </span>
                    );
                  })()}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md ${
                      currentRecord.status === 'watched'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    }`}
                  >
                    {currentRecord.status === 'watched'
                      ? language === 'cn'
                        ? '已看'
                        : 'Watched'
                      : language === 'cn'
                      ? '想看'
                      : 'Wishlist'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{currentRecord.title}</h1>

                {/* Rating */}
                {currentRecord.rating > 0 && (
                  <div className="flex items-center mb-6 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={32}
                        className={i < currentRecord.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                    <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {currentRecord.rating}/5
                    </span>
                  </div>
                )}

                {/* Note */}
                {currentRecord.note && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-3 text-purple-600 flex items-center gap-2">
                      <BookOpen size={18} />
                      {language === 'cn' ? '备注' : 'Note'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-xl border border-purple-200">
                      {currentRecord.note}
                    </p>
                  </div>
                )}

                {/* Feelings */}
                {currentRecord.feelings && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-3 text-pink-600 flex items-center gap-2">
                      <Star size={18} />
                      {language === 'cn' ? '内心感受' : 'Feelings'}
                    </h3>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-pink-200 shadow-inner">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                        {currentRecord.feelings}
                      </p>
                    </div>
                  </div>
                )}

                {/* Date */}
                <div className="pt-4 border-t border-purple-200">
                  <p className="text-sm text-gray-500 font-medium">
                    {language === 'cn' ? '添加于：' : 'Added on: '}
                    <span className="text-gray-700 font-semibold">
                      {formatDate(currentRecord.createdAt)}
                    </span>
                  </p>
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

              <div className="text-gray-600 text-sm font-medium bg-white/80 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/60 shadow-md">
                {language === 'cn'
                  ? '提示：使用方向键 ← → 切换'
                  : 'Tip: Use arrow keys ← → to navigate'}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredRecords.length - 1}
                className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg ${
                  currentIndex === filteredRecords.length - 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white/90 text-gray-800 hover:bg-white hover:shadow-xl hover:scale-105 border border-white/60'
                }`}
              >
                {language === 'cn' ? '下一个' : 'Next'}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
