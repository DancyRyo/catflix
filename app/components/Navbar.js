'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { Home, FileText, Star, BookOpen, Languages, Cat, Film } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const { language, setLanguage } = useApp();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo with Cat icon */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-3 text-2xl font-bold hover:opacity-80 transition-all duration-300 group"
          >
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
              <Cat className="w-6 h-6 text-white" />
            </div>
            <span className="gradient-text">
              {language === 'cn' ? '黑猫影记' : 'CatFlix'}
            </span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium text-gray-700 hover:shadow-lg hover:scale-105"
            >
              <Film size={18} />
              {language === 'cn' ? '电影' : 'Movies'}
            </button>
            <button
              onClick={() => router.push('/viewing')}
              className="hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium text-gray-700 hover:shadow-lg hover:scale-105"
            >
              <Home size={18} />
              {language === 'cn' ? '观影' : 'Viewing'}
            </button>
            <button
              onClick={() => router.push('/records')}
              className="hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium text-gray-700 hover:shadow-lg hover:scale-105"
            >
              <FileText size={18} />
              {language === 'cn' ? '我的记录' : 'My Records'}
            </button>
            <button
              onClick={() => router.push('/featured-lists')}
              className="hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium text-gray-700 hover:shadow-lg hover:scale-105"
            >
              <Star size={18} />
              {language === 'cn' ? '精选榜单' : 'Featured Lists'}
            </button>
            <button
              onClick={() => router.push('/reading')}
              className="hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium text-gray-700 hover:shadow-lg hover:scale-105"
            >
              <BookOpen size={18} />
              {language === 'cn' ? '在线阅读' : 'Reading'}
            </button>
            <button
              onClick={() => setLanguage(language === 'cn' ? 'en' : 'cn')}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl transition-all duration-300 flex items-center gap-2 font-medium shadow-md hover:shadow-xl hover:scale-105"
            >
              <Languages size={18} />
              {language === 'cn' ? 'English' : '中文'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
