'use client';

import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {language === 'cn' ? '使用条款' : 'Terms of Service'}
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-sm text-gray-500 mb-8">
            {language === 'cn' ? '最后更新日期：2024年' : 'Last Updated: 2024'}
          </p>

          {language === 'cn' ? (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">1. 接受条款</h2>
                <p className="leading-relaxed mb-4">
                  通过访问和使用本网站，您同意遵守这些使用条款。如果您不同意这些条款，请不要使用本网站。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">2. 服务说明</h2>
                <p className="leading-relaxed mb-4">
                  本网站提供媒体观看记录和文学引用阅读服务。我们保留随时修改或终止服务的权利，恕不另行通知。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">3. 用户责任</h2>
                <p className="leading-relaxed mb-4">
                  您同意：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>仅将本服务用于合法目的</li>
                  <li>不干扰或破坏本服务的正常运行</li>
                  <li>尊重知识产权和他人权利</li>
                  <li>对您的账户活动负责</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">4. 知识产权</h2>
                <p className="leading-relaxed mb-4">
                  本网站的所有内容、设计和代码均受版权保护。未经授权，禁止复制、分发或修改。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">5. 免责声明</h2>
                <p className="leading-relaxed mb-4">
                  本服务按"现状"提供，不提供任何明示或暗示的保证。我们不对服务的准确性、可靠性或可用性承担责任。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">6. 责任限制</h2>
                <p className="leading-relaxed mb-4">
                  在任何情况下，我们都不对因使用或无法使用本服务而导致的任何直接、间接、偶然、特殊或后果性损害承担责任。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">7. 条款修改</h2>
                <p className="leading-relaxed mb-4">
                  我们保留随时修改这些条款的权利。继续使用本服务即表示您接受修改后的条款。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">8. 联系我们</h2>
                <p className="leading-relaxed">
                  如果您对这些条款有任何疑问，请通过 legal@mediatracker.com 联系我们。
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">1. Acceptance of Terms</h2>
                <p className="leading-relaxed mb-4">
                  By accessing and using this website, you agree to comply with these terms of service. If you do not agree to these terms, please do not use this website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">2. Service Description</h2>
                <p className="leading-relaxed mb-4">
                  This website provides media tracking and literary quote reading services. We reserve the right to modify or terminate the service at any time without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">3. User Responsibilities</h2>
                <p className="leading-relaxed mb-4">
                  You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the service only for lawful purposes</li>
                  <li>Not interfere with or disrupt the normal operation of the service</li>
                  <li>Respect intellectual property and the rights of others</li>
                  <li>Be responsible for your account activities</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">4. Intellectual Property</h2>
                <p className="leading-relaxed mb-4">
                  All content, design, and code on this website are protected by copyright. Unauthorized reproduction, distribution, or modification is prohibited.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">5. Disclaimer</h2>
                <p className="leading-relaxed mb-4">
                  This service is provided "as is" without any express or implied warranties. We are not responsible for the accuracy, reliability, or availability of the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">6. Limitation of Liability</h2>
                <p className="leading-relaxed mb-4">
                  Under no circumstances shall we be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">7. Terms Modification</h2>
                <p className="leading-relaxed mb-4">
                  We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">8. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about these terms, please contact us at legal@mediatracker.com.
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
