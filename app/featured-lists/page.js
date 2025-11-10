'use client';

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { featuredLists } from '../data/featuredLists';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';
import { Star, Film, BookOpen, Palette, Sparkles, Trophy, Award, Gamepad2, Plus, Check, ArrowLeft } from 'lucide-react';

export default function FeaturedListsPage() {
  const { language, addRecord } = useApp();
  const router = useRouter();
  const [selectedList, setSelectedList] = useState(null);
  const [addedItems, setAddedItems] = useState(new Set());

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
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.textContent = language === 'cn' ? '已添加到想看' : 'Added to wishlist';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
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
    <div className="min-h-screen bg-purple-50 text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto py-12 px-8 w-full">
        {!selectedList ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-3 text-purple-600 flex items-center gap-3">
                <Star className="w-10 h-10" />
                {language === 'cn' ? '精选榜单' : 'Featured Lists'}
              </h1>
              <p className="text-gray-600 text-lg">
                {language === 'cn'
                  ? '从精选榜单中快速添加想看内容'
                  : 'Quickly add content from curated lists'}
              </p>
            </div>

            {/* Lists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lists.map((list) => {
                const IconComponent = getIconComponent(list.icon);
                return (
                  <button
                    key={list.id}
                    onClick={() => setSelectedList(list)}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-left transform hover:scale-105 border-2 border-purple-200 hover:border-purple-500"
                  >
                    <IconComponent className="w-12 h-12 text-purple-600 mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {language === 'cn' ? list.name.cn : list.name.en}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {language === 'cn' ? list.description.cn : list.description.en}
                    </p>
                    <p className="text-purple-600 font-semibold">
                      {list.items.length} {language === 'cn' ? '项' : 'items'}
                    </p>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* List Detail View */}
            <div className="mb-6">
              <button
                onClick={() => setSelectedList(null)}
                className="text-purple-600 hover:text-purple-800 mb-4 flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                {language === 'cn' ? '返回' : 'Back'}
              </button>

              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  {(() => {
                    const IconComponent = getIconComponent(selectedList.icon);
                    return <IconComponent className="w-10 h-10 text-purple-600" />;
                  })()}
                  <div>
                    <h1 className="text-4xl font-bold mb-2">
                      {language === 'cn' ? selectedList.name.cn : selectedList.name.en}
                    </h1>
                    <p className="text-gray-600">
                      {language === 'cn'
                        ? selectedList.description.cn
                        : selectedList.description.en}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleBatchAdd(selectedList)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all whitespace-nowrap flex items-center gap-2"
                >
                  <Plus size={18} />
                  {language === 'cn' ? '一键全部添加' : 'Add All'}
                </button>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {selectedList.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all border-2 border-purple-100 hover:border-purple-300"
                  >
                    {item.image && (
                      <div className="h-48 overflow-hidden bg-gray-200">
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

                      <button
                        onClick={() => handleAddToWishlist(item, selectedList.type)}
                        disabled={addedItems.has(item.title)}
                        className={`w-full py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1 ${
                          addedItems.has(item.title)
                            ? 'bg-green-100 text-green-800 cursor-not-allowed'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {addedItems.has(item.title) ? (
                          <>
                            <Check size={16} />
                            {language === 'cn' ? '已添加' : 'Added'}
                          </>
                        ) : (
                          <>
                            <Plus size={16} />
                            {language === 'cn' ? '想看' : 'Wishlist'}
                          </>
                        )}
                      </button>
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
