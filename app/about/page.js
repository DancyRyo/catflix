'use client';

import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {language === 'cn' ? '关于我们' : 'About Us'}
        </h1>

        <div className="prose prose-lg max-w-none">
          {language === 'cn' ? (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">我们的使命</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  我们致力于为用户提供一个简单、优雅且功能强大的平台，帮助您记录和追踪您的观影历程。无论是动漫、电影、电视剧还是书籍，我们都希望能够成为您记录美好时光的最佳伴侣。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">我们的愿景</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  打造一个全球领先的文化娱乐记录平台，让每个人都能轻松地记录、分享和回顾他们的文化娱乐体验。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">核心功能</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>多种类别的内容追踪（动漫、电影、电视剧、音乐、书籍）</li>
                  <li>直观的进度显示和统计功能</li>
                  <li>中英双语支持</li>
                  <li>经典文学引用阅读</li>
                  <li>强大的搜索和筛选功能</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">联系我们</h2>
                <p className="text-gray-700 leading-relaxed">
                  如果您有任何问题、建议或反馈，请随时通过以下方式联系我们：
                </p>
                <p className="text-gray-700 mt-4">
                  邮箱: contact@mediatracker.com
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are dedicated to providing users with a simple, elegant, and powerful platform to help you record and track your media journey. Whether it's anime, movies, TV shows, or books, we hope to be your best companion in recording beautiful moments.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To create a globally leading cultural entertainment tracking platform that enables everyone to easily record, share, and review their cultural entertainment experiences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">Core Features</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Multi-category content tracking (anime, movies, TV shows, music, books)</li>
                  <li>Intuitive progress display and statistics</li>
                  <li>Bilingual support (Chinese and English)</li>
                  <li>Classic literary quotes reading</li>
                  <li>Powerful search and filtering</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions, suggestions, or feedback, please feel free to contact us:
                </p>
                <p className="text-gray-700 mt-4">
                  Email: contact@mediatracker.com
                </p>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
