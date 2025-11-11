'use client';

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { featuredLists } from '../data/featuredLists';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';
import { Star, Film, BookOpen, Palette, Sparkles, Trophy, Award, Gamepad2, Plus, Check, ArrowLeft, Eye } from 'lucide-react';

export default function FeaturedListsPage() {
  const { language, addRecord } = useApp();
  const router = useRouter();
  const [selectedList, setSelectedList] = useState(null);
  const [addedItems, setAddedItems] = useState(new Set());
  const [watchedItems, setWatchedItems] = useState(new Set());

  const lists = Object.values(featuredLists);

  const iconMap = {
    '🎬': Film,
    '📚': BookOpen,
    '🎨': Palette,
    '🌟': Sparkles,
    '🏆': Trophy,
    '🏅': Award,
    '🎮': Gamepad2,
  };

  const getIconComponent = (emoji) => {
    return iconMap[emoji] || Star;
  };

  const handleAddToWishlist = (item, listType) => {
    const record = {
      type: listType,
      title: language === 'cn' ? item.title : item.en,
      image: item.image || '',
      note: item.author ? `${language === 'cn' ? '作者' : 'Author'}: ${language === 'cn' ? item.author.cn : item.author.en}` : '',
      feelings: '',
      rating: 0,
      status: 'wishlist',
    };

    addRecord(record);
    setAddedItems((prev) => new Set([...prev, item.title]));

    // Show a brief notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 animate-fade-in font-semibold border border-white/30';
    notification.textContent = language === 'cn' ? '✓ 已添加到想看' : '✓ Added to wishlist';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(10px)';
      notification.style.transition = 'all 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  const handleAddToWatched = (item, listType) => {
    const record = {
      type: listType,
      title: language === 'cn' ? item.title : item.en,
      image: item.image || '',
      note: item.author ? `${language === 'cn' ? '作者' : 'Author'}: ${language === 'cn' ? item.author.cn : item.author.en}` : '',
      feelings: '',
      rating: 0,
      status: 'watched',
    };

    addRecord(record);
    setWatchedItems((prev) => new Set([...prev, item.title]));

    // Show a brief notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 animate-fade-in font-semibold border border-white/30';
    notification.textContent = language === 'cn' ? '✓ 已添加到看过' : '✓ Added to watched';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(10px)';
      notification.style.transition = 'all 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  const handleBatchAdd = (list) => {
    list.items.forEach((item) => {
      if (!addedItems.has(item.title)) {
        handleAddToWishlist(item, list.type);
      }
    });
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

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto py-16 px-8 w-full">
        {!selectedList ? (
          <>
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-5xl font-bold mb-4 gradient-text flex items-center justify-center gap-3">
                <Star className="w-12 h-12" />
                {language === 'cn' ? '精选榜单' : 'Featured Lists'}
              </h1>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                {language === 'cn'
                  ? '从精选榜单中快速添加想看内容'
                  : 'Quickly add content from curated lists'}
              </p>
            </div>

            {/* Lists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lists.map((list) => {
                const IconComponent = getIconComponent(list.icon);
                return (
                  <button
                    key={list.id}
                    onClick={() => setSelectedList(list)}
                    className="group relative bg-white/80 backdrop-blur-lg hover:shadow-2xl p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 text-left border border-white/60 hover:border-purple-400/50 overflow-hidden card-hover-lift"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-2xl"></div>

                    <div className="relative z-10">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow w-fit mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                        {language === 'cn' ? list.name.cn : list.name.en}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {language === 'cn' ? list.description.cn : list.description.en}
                      </p>
                      <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {list.items.length} {language === 'cn' ? '项' : 'items'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* List Detail View */}
            <div className="mb-8">
              <button
                onClick={() => setSelectedList(null)}
                className="mb-6 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium shadow-md hover:shadow-lg border border-white/60"
              >
                <ArrowLeft size={20} />
                {language === 'cn' ? '返回' : 'Back'}
              </button>

              <div className="flex justify-between items-start mb-8 bg-white/80 backdrop-blur-lg p-6 rounded-2xl border border-white/60 shadow-lg">
                <div className="flex items-center gap-4">
                  {(() => {
                    const IconComponent = getIconComponent(selectedList.icon);
                    return (
                      <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                    );
                  })()}
                  <div>
                    <h1 className="text-4xl font-bold mb-2 gradient-text">
                      {language === 'cn' ? selectedList.name.cn : selectedList.name.en}
                    </h1>
                    <p className="text-gray-600 text-lg">
                      {language === 'cn'
                        ? selectedList.description.cn
                        : selectedList.description.en}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleBatchAdd(selectedList)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 whitespace-nowrap flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Plus size={18} />
                  {language === 'cn' ? '一键全部添加' : 'Add All'}
                </button>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {selectedList.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/60 hover:border-purple-400/50 transform hover:scale-105"
                  >
                    {item.image && (
                      <div className="h-76 overflow-hidden bg-gray-200">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-3">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                        {language === 'cn' ? item.title : item.en}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">{item.year}</p>
                      {item.author && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                          {language === 'cn' ? item.author.cn : item.author.en}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToWishlist(item, selectedList.type)}
                          disabled={addedItems.has(item.title)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1 shadow-md ${addedItems.has(item.title)
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:scale-105'
                            }`}
                        >
                          {addedItems.has(item.title) ? (
                            <>
                              <Check size={14} />
                              {language === 'cn' ? '已添加' : 'Added'}
                            </>
                          ) : (
                            <>
                              <Plus size={14} />
                              {language === 'cn' ? '想看' : 'Wishlist'}
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleAddToWatched(item, selectedList.type)}
                          disabled={watchedItems.has(item.title)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1 shadow-md ${watchedItems.has(item.title)
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg hover:scale-105'
                            }`}
                        >
                          {watchedItems.has(item.title) ? (
                            <>
                              <Check size={14} />
                              {language === 'cn' ? '已添加' : 'Added'}
                            </>
                          ) : (
                            <>
                              <Eye size={14} />
                              {language === 'cn' ? '看过' : 'Watched'}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />

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
