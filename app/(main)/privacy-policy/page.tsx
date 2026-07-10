import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Privacy Policy | Keentel Engineering',
  description: 'Privacy Policy for Keentel Engineering.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28" style={{ background: '#06103C' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 mb-6 text-xs font-jost">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Privacy Policy</span>
            </nav>
            <h1 className="font-urbanist font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>Privacy Policy</h1>
            <p className="font-jost text-white/60 mt-4">Last updated: July 2026</p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-jost text-gray-700 leading-relaxed">
            <p>Keentel Engineering (&quot;Keentel,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or use our services.</p>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>1. Information We Collect</h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Contact information</strong> you provide through forms, such as name, company, phone number, and email address.</li>
                <li><strong>Project information</strong> you share when requesting a consultation or proposal.</li>
                <li><strong>Usage data</strong> such as pages visited, time spent on the site, browser type, and device information, collected automatically through cookies and analytics tools.</li>
                <li><strong>Communications</strong> you send us directly, including emails and messages submitted through our contact forms.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>2. How We Use Your Information</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>To respond to inquiries and provide requested consultations or proposals</li>
                <li>To deliver, operate, and improve our services</li>
                <li>To send project-related communications, updates, and, where you have opted in, newsletters</li>
                <li>To analyze site usage and improve our website&apos;s functionality and content</li>
                <li>To comply with legal obligations and enforce our agreements</li>
              </ul>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>3. How We Share Information</h2>
              <p>We do not sell your personal information. We may share information with:</p>
              <ul className="space-y-2 list-disc pl-5 mt-3">
                <li>Service providers who support our operations (e.g., hosting, email delivery, scheduling, and analytics platforms), under confidentiality obligations</li>
                <li>Professional advisors such as legal, accounting, or engineering consultants, where necessary to conduct our business</li>
                <li>Regulatory or governmental authorities, where required by law or to protect our legal rights</li>
                <li>A successor entity in the event of a merger, acquisition, or sale of assets</li>
              </ul>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>4. Cookies &amp; Tracking Technologies</h2>
              <p>Our website may use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings; disabling cookies may affect some site functionality.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>5. Data Retention</h2>
              <p>We retain personal information for as long as necessary to fulfill the purposes described in this policy, comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>6. Data Security</h2>
              <p>We implement reasonable administrative, technical, and physical safeguards designed to protect your information from unauthorized access, disclosure, alteration, or destruction. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>7. Your Rights &amp; Choices</h2>
              <p>Depending on your location, you may have rights to access, correct, delete, or restrict use of your personal information, or to opt out of marketing communications. To exercise any of these rights, contact us using the information below.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>8. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites, and we encourage you to review their privacy policies.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>9. Children&apos;s Privacy</h2>
              <p>Our services are intended for business and professional use and are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>10. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision. Continued use of our website after changes are posted constitutes acceptance of the updated policy.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>11. Contact Us</h2>
              <p>If you have questions about this Privacy Policy or wish to exercise your privacy rights, contact us at:</p>
              <div className="rounded-2xl p-6 mt-4" style={{ background: '#F6F7FB', border: '1px solid #E6E8F0' }}>
                <p className="font-urbanist font-bold" style={{ color: '#06103C' }}>Keentel Engineering</p>
                <p>400 N Ashley Dr STE #2600, Tampa, FL 33602</p>
                <p><a href="mailto:contact@keentelengineering.com" className="underline" style={{ color: '#A8228A' }}>contact@keentelengineering.com</a></p>
                <p><a href="tel:813-389-7871" className="underline" style={{ color: '#A8228A' }}>813-389-7871</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
