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
    <div className="min-h-screen bg-purple-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 flex justify-between items-center bg-purple-800">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all flex items-center gap-2"
        >
          <X size={20} />
          {language === 'cn' ? '退出' : 'Exit'}
        </button>

        {/* Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setFilterType('all');
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              filterType === 'all'
                ? 'bg-purple-600'
                : 'bg-white bg-opacity-10 hover:bg-opacity-20'
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
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  filterType === type
                    ? 'bg-purple-600'
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                <IconComponent size={16} />
                {language === 'cn' ? typeLabels[type].cn : typeLabels[type].en}
              </button>
            );
          })}
        </div>

        <div className="text-gray-300">
          {hasRecords
            ? `${currentIndex + 1} / ${filteredRecords.length}`
            : '0 / 0'}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        {!hasRecords ? (
          <div className="text-center">
            <BookOpen className="w-24 h-24 mx-auto mb-4 text-purple-300" />
            <p className="text-xl text-gray-300">
              {language === 'cn' ? '暂无记录' : 'No records'}
            </p>
            <button
              onClick={() => router.push('/records')}
              className="mt-6 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all"
            >
              {language === 'cn' ? '去添加记录' : 'Add Records'}
            </button>
          </div>
        ) : (
          <div className="max-w-4xl w-full">
            {/* Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl">
              {/* Image */}
              {currentRecord.image && (
                <div className="h-96 overflow-hidden bg-black bg-opacity-50">
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
                <div className="flex gap-3 mb-4">
                  {(() => {
                    const IconComponent = typeLabels[currentRecord.type].icon;
                    return (
                      <span className="px-3 py-1 bg-purple-600 rounded-full text-sm flex items-center gap-2">
                        <IconComponent size={14} />
                        {language === 'cn'
                          ? typeLabels[currentRecord.type].cn
                          : typeLabels[currentRecord.type].en}
                      </span>
                    );
                  })()}
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      currentRecord.status === 'watched'
                        ? 'bg-green-600'
                        : 'bg-blue-600'
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
                <h1 className="text-4xl font-bold mb-4">{currentRecord.title}</h1>

                {/* Rating */}
                {currentRecord.rating > 0 && (
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={28}
                        className={i < currentRecord.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}
                      />
                    ))}
                    <span className="ml-3 text-xl text-gray-300">
                      {currentRecord.rating}/5
                    </span>
                  </div>
                )}

                {/* Note */}
                {currentRecord.note && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-purple-300">
                      {language === 'cn' ? '备注' : 'Note'}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {currentRecord.note}
                    </p>
                  </div>
                )}

                {/* Feelings */}
                {currentRecord.feelings && (
                  <div className="mb-6 p-4 bg-purple-600 bg-opacity-20 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-purple-300">
                      {language === 'cn' ? '内心感受' : 'Feelings'}
                    </h3>
                    <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {currentRecord.feelings}
                    </p>
                  </div>
                )}

                {/* Date */}
                <p className="text-sm text-gray-400">
                  {language === 'cn' ? '添加于：' : 'Added on: '}
                  {formatDate(currentRecord.createdAt)}
                </p>
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
                disabled={currentIndex === filteredRecords.length - 1}
                className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  currentIndex === filteredRecords.length - 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20'
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
