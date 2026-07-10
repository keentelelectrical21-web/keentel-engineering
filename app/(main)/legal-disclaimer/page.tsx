import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Legal Disclaimer | Keentel Engineering',
  description: 'Legal Disclaimer for Keentel Engineering.',
}

export default function LegalDisclaimerPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28" style={{ background: '#06103C' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 mb-6 text-xs font-jost">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Legal Disclaimer</span>
            </nav>
            <h1 className="font-urbanist font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>Legal Disclaimer</h1>
            <p className="font-jost text-white/60 mt-4">Last updated: July 2026</p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-jost text-gray-700 leading-relaxed">

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>1. General Information Only</h2>
              <p>The content published on this website, including service pages, blog articles, newsletters, case studies, whitepapers, and downloadable resources, is provided for general informational purposes only. It is intended to give an overview of engineering topics, industry standards, and regulatory developments, and should not be relied upon as a substitute for project-specific engineering analysis, professional judgment, or a signed engagement with Keentel Engineering.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>2. No Engineer-Client Relationship</h2>
              <p>Viewing this website, submitting a contact form, downloading a resource, or subscribing to our newsletter does not create an engineer-client relationship between you and Keentel Engineering or any of its licensed professional engineers. A formal engineer-client relationship, along with the associated professional duties and responsibilities, is established only through a signed proposal, contract, or engagement letter.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>3. No Guarantee of Compliance or Outcome</h2>
              <p>References to NERC, IEEE, NEC, NESC, IEC, FERC, or other regulatory standards on this website are provided for general context only. Compliance with any regulatory standard or requirement depends on the specific facts of a project and must be verified through direct engineering engagement. Keentel Engineering does not guarantee that general information provided on this Site will result in regulatory approval, interconnection approval, audit success, or any other specific outcome.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>4. Accuracy of Information</h2>
              <p>While we make reasonable efforts to keep information on this Site accurate and current, engineering standards, codes, and regulatory requirements change frequently. We do not warrant that all content is complete, accurate, or up to date, and we are not liable for any errors or omissions, or for actions taken in reliance on this content without independent verification.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>5. Case Studies &amp; Project References</h2>
              <p>Case studies, project examples, and testimonials on this Site describe the work performed for specific clients under specific conditions. Results described are not guaranteed for future projects, as outcomes depend on project-specific variables, site conditions, and regulatory context.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>6. Third-Party Content &amp; Links</h2>
              <p>This Site may reference or link to third-party standards bodies, regulatory agencies, software vendors, or other external resources. Keentel Engineering does not control and is not responsible for the accuracy or availability of third-party content.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>7. Professional Licensure</h2>
              <p>Keentel Engineering&apos;s licensed Professional Engineers hold licensure in specific U.S. states. Engineering services are rendered in accordance with the licensure requirements applicable to each project&apos;s jurisdiction. Nothing on this Site should be construed as an offer to practice engineering in a jurisdiction where Keentel Engineering is not appropriately licensed.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>8. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, Keentel Engineering disclaims all liability for any loss or damage arising from reliance on information contained on this Site, including direct, indirect, incidental, or consequential damages.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>9. Related Policies</h2>
              <p>This Legal Disclaimer should be read together with our <Link href="/privacy-policy" className="underline" style={{ color: '#A8228A' }}>Privacy Policy</Link> and <Link href="/terms-and-conditions" className="underline" style={{ color: '#A8228A' }}>Terms &amp; Conditions</Link>, both of which govern your use of this website.</p>
            </div>

            <div>
              <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#06103C' }}>10. Contact Us</h2>
              <p>If you have questions about this Legal Disclaimer, please contact:</p>
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
