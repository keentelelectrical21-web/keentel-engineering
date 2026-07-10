import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Terms & Conditions | Keentel Engineering',
  description: 'Terms and Conditions for use of the Keentel Engineering website and services.',
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28" style={{ background: '#06103C' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 mb-6 text-xs font-jost">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Terms &amp; Conditions</span>
            </nav>
            <h1 className="font-urbanist font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>Terms &amp; Conditions</h1>
            <p className="font-jost text-white/60 mt-4">Last updated: July 2026</p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-jost text-gray-700 leading-relaxed">
            <p>These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the Keentel Engineering website located at keentelengineering.com (the &quot;Site&quot;) and any services described on it. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.</p>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>1. Use of the Site</h2>
              <p>You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to use the Site in any way that could damage, disable, or impair the Site, or interfere with any other party&apos;s use of it.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>2. No Professional Advice Without Engagement</h2>
              <p>The content on this Site, including service descriptions, case studies, blog articles, and newsletters, is provided for general informational purposes only. It does not constitute engineering, legal, or professional advice, and does not establish a client relationship between you and Keentel Engineering. Engineering services are provided only under a signed engagement letter, proposal, or contract.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>3. Intellectual Property</h2>
              <p>All content on this Site, including text, graphics, logos, images, and software, is the property of Keentel Engineering or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this Site without our prior written consent.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>4. Third-Party Links</h2>
              <p>The Site may contain links to third-party websites or resources. We do not endorse and are not responsible for the content, products, or services available through those third-party sites.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>5. Submissions &amp; Inquiries</h2>
              <p>Information you submit through contact forms, consultation requests, or newsletter sign-ups is used to respond to your inquiry and, where applicable, to deliver services you request. See our <Link href="/privacy-policy" className="underline" style={{ color: '#A8228A' }}>Privacy Policy</Link> for details on how we handle your information.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>6. Disclaimer of Warranties</h2>
              <p>The Site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>7. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, Keentel Engineering shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, the Site, even if we have been advised of the possibility of such damages.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>8. Indemnification</h2>
              <p>You agree to indemnify and hold harmless Keentel Engineering, its officers, employees, and agents from any claims, damages, liabilities, and expenses arising out of your use of the Site or violation of these Terms.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>9. Governing Law</h2>
              <p>These Terms are governed by the laws of the State of Florida, without regard to its conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Florida.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>10. Changes to These Terms</h2>
              <p>We may revise these Terms at any time. The &quot;Last updated&quot; date reflects the most recent revision. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>11. Contact Us</h2>
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
