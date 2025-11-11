'use client';

import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { OrganizationSchema, FAQSchema } from '../components/SEO';

export default function AboutPage() {
  const { language } = useApp();

  const faqs = language === 'cn' ? [
    {
      question: "黑猫影记是什么？",
      answer: "黑猫影记（CatFlix）是一个专业的媒体追踪工具，帮助您记录和管理观看过的电影、动漫、电视剧、书籍和游戏。支持进度追踪、评分、笔记和精选榜单等功能。"
    },
    {
      question: "支持哪些类型的内容？",
      answer: "我们支持多种类型的内容追踪，包括日本动漫、中国动漫、电影、外国电视剧、韩剧、日剧、音乐专辑、书籍、游戏等。还包括宫崎骏作品、新海诚作品等特色分类。"
    },
    {
      question: "是否支持多语言？",
      answer: "是的，我们完整支持中文和英文双语界面，您可以随时在两种语言之间切换。"
    },
    {
      question: "数据会保存在哪里？",
      answer: "您的数据会安全地保存在浏览器的本地存储中，保证您的隐私安全。"
    }
  ] : [
    {
      question: "What is CatFlix?",
      answer: "CatFlix (黑猫影记) is a professional media tracking tool that helps you record and manage movies, anime, TV shows, books, and games you've watched. It supports progress tracking, ratings, notes, and featured lists."
    },
    {
      question: "What types of content are supported?",
      answer: "We support multiple types of content tracking, including Japanese anime, Chinese anime, movies, foreign TV shows, Korean dramas, Japanese dramas, music albums, books, games, etc. Special categories like Miyazaki and Shinkai works are also included."
    },
    {
      question: "Is multi-language supported?",
      answer: "Yes, we fully support both Chinese and English interfaces, and you can switch between the two languages at any time."
    },
    {
      question: "Where is my data stored?",
      answer: "Your data is securely stored in your browser's local storage, ensuring your privacy and security."
    }
  ];

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

      <OrganizationSchema />
      <FAQSchema faqs={faqs} />

      <main className="flex-1 max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-5xl font-bold gradient-text mb-12 text-center">
          {language === 'cn' ? '关于我们' : 'About Us'}
        </h1>

        <div className="space-y-8">
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
