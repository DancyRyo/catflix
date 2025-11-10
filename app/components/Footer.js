'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const router = useRouter();
  const { language } = useApp();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {language === 'cn' ? '关于我们' : 'About Us'}
            </h3>
            <p className="text-sm leading-relaxed">
              {language === 'cn'
                ? '我们致力于为用户提供优质的观影记录和文学阅读体验，帮助您记录和分享生活中的美好时光。'
                : 'We are dedicated to providing quality media tracking and literary reading experiences, helping you record and share the beautiful moments in life.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {language === 'cn' ? '快速链接' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => router.push('/')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {language === 'cn' ? '首页' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/reading')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {language === 'cn' ? '在线阅读' : 'Reading'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/about')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {language === 'cn' ? '关于我们' : 'About'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {language === 'cn' ? '法律信息' : 'Legal'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => router.push('/privacy')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {language === 'cn' ? '隐私政策' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/terms')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {language === 'cn' ? '使用条款' : 'Terms of Service'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>
            © 2024 {language === 'cn' ? '观影记录' : 'Media Tracker'}. {language === 'cn' ? '保留所有权利。' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
