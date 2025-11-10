'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const router = useRouter();
  const { language, setLanguage } = useApp();

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            {language === 'cn' ? '观影记录' : 'Media Tracker'}
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push('/')}
              className="hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              {language === 'cn' ? '首页' : 'Home'}
            </button>
            <button
              onClick={() => router.push('/reading')}
              className="hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              {language === 'cn' ? '在线阅读' : 'Reading'}
            </button>
            <button
              onClick={() => setLanguage(language === 'cn' ? 'en' : 'cn')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
            >
              {language === 'cn' ? 'English' : '中文'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
