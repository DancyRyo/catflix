'use client';

import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {language === 'cn' ? '隐私政策' : 'Privacy Policy'}
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-sm text-gray-500 mb-8">
            {language === 'cn' ? '最后更新日期：2024年' : 'Last Updated: 2024'}
          </p>

          {language === 'cn' ? (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">1. 信息收集</h2>
                <p className="leading-relaxed mb-4">
                  我们重视您的隐私。本应用在本地存储您的观看记录和偏好设置，不会收集或上传您的个人信息到服务器。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">2. 数据存储</h2>
                <p className="leading-relaxed mb-4">
                  所有数据都存储在您的浏览器本地存储（LocalStorage）中，我们无法访问这些数据。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">3. 数据安全</h2>
                <p className="leading-relaxed mb-4">
                  由于数据存储在您的本地设备上，数据安全由您的设备和浏览器保护机制保障。我们建议您定期备份重要数据。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">4. Cookie使用</h2>
                <p className="leading-relaxed mb-4">
                  本网站使用必要的Cookie来保存您的语言偏好和观看记录。我们不使用第三方跟踪Cookie。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">5. 第三方服务</h2>
                <p className="leading-relaxed mb-4">
                  本应用不使用任何第三方分析或跟踪服务。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">6. 隐私政策更新</h2>
                <p className="leading-relaxed mb-4">
                  我们可能会不时更新本隐私政策。任何更改都会在本页面上公布。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">7. 联系我们</h2>
                <p className="leading-relaxed">
                  如果您对本隐私政策有任何疑问，请通过 privacy@mediatracker.com 联系我们。
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">1. Information Collection</h2>
                <p className="leading-relaxed mb-4">
                  We value your privacy. This application stores your viewing records and preferences locally and does not collect or upload your personal information to servers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">2. Data Storage</h2>
                <p className="leading-relaxed mb-4">
                  All data is stored in your browser's local storage (LocalStorage), and we cannot access this data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">3. Data Security</h2>
                <p className="leading-relaxed mb-4">
                  Since data is stored on your local device, data security is protected by your device and browser security mechanisms. We recommend regular backups of important data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">4. Cookie Usage</h2>
                <p className="leading-relaxed mb-4">
                  This website uses necessary cookies to save your language preferences and viewing records. We do not use third-party tracking cookies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">5. Third-Party Services</h2>
                <p className="leading-relaxed mb-4">
                  This application does not use any third-party analytics or tracking services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">6. Privacy Policy Updates</h2>
                <p className="leading-relaxed mb-4">
                  We may update this privacy policy from time to time. Any changes will be posted on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">7. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this privacy policy, please contact us at privacy@mediatracker.com.
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
