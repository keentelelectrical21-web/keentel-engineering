import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllNewsletters } from '@/lib/newsletters';

export const revalidate = 3600;

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export default async function NewslettersPage() {
  const newsletters = await getAllNewsletters();
  const [latest, ...rest] = newsletters;

  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[440px] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-b7a9735b-907h.jpg"
              alt="Keentel Engineering newsletters"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,16,60,0.95) 0%, rgba(91,42,134,0.75) 100%)' }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 blur-3xl rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #A8228A 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
            <nav className="flex items-center gap-2 mb-6 text-xs font-jost">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Newsletters</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 mb-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-sm font-jost">Published Monthly</span>
              </div>
              <h1 className="font-urbanist font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.06] mb-5">
                Keentel Engineering{' '}
                <span style={{ color: '#C72E9E' }}>Newsletters</span>
              </h1>
              <p className="text-white/65 text-lg font-jost leading-relaxed max-w-2xl">
                Monthly insight on grid reliability, NERC compliance, energy storage, and the engineering trends shaping the power industry.
              </p>
            </div>
          </div>
        </section>

        {/* ── LATEST ISSUE FEATURED ── */}
        {latest && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-8" style={{ color: '#A8228A' }}>Latest Issue</p>
              <Link
                href={`/newsletters/${latest.slug.current}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border hover:shadow-2xl transition-all duration-300"
                style={{ borderColor: '#E6E8F0' }}
              >
                <div className="relative min-h-[320px] overflow-hidden" style={{ background: '#F6F7FB' }}>
                  {latest.heroImage && (
                    <Image
                      src={latest.heroImage}
                      alt={latest.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="p-10 flex flex-col justify-center" style={{ background: '#F6F7FB' }}>
                  <p className="font-jost text-xs uppercase tracking-wide mb-3" style={{ color: '#A8228A' }}>
                    {latest.edition || formatDate(latest.publishDate)}
                  </p>
                  <h2 className="font-urbanist font-black text-3xl leading-snug mb-4" style={{ color: '#06103C' }}>
                    {latest.title}
                  </h2>
                  {latest.excerpt && (
                    <p className="font-jost text-base leading-relaxed mb-6" style={{ color: '#6B7280' }}>{latest.excerpt}</p>
                  )}
                  <span className="font-jost font-semibold text-sm inline-flex items-center gap-2" style={{ color: '#A8228A' }}>
                    Read Full Issue
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ── ARCHIVE GRID ── */}
        <section className="py-20 px-6" style={{ background: '#F6F7FB' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest mb-8" style={{ color: '#A8228A' }}>Archive</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((nl) => (
                <Link
                  key={nl._id}
                  href={`/newsletters/${nl.slug.current}`}
                  className="group rounded-2xl border overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                  style={{ borderColor: '#E6E8F0' }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden" style={{ background: '#F6F7FB' }}>
                    {nl.heroImage && (
                      <Image
                        src={nl.heroImage}
                        alt={nl.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="font-jost text-xs uppercase tracking-wide mb-2" style={{ color: '#A8228A' }}>
                      {nl.edition || formatDate(nl.publishDate)}
                    </p>
                    <h2 className="font-urbanist font-black text-lg leading-snug mb-3" style={{ color: '#06103C' }}>
                      {nl.title}
                    </h2>
                    {nl.excerpt && (
                      <p className="font-jost text-sm text-gray-600 leading-relaxed flex-1">{nl.excerpt}</p>
                    )}
                    <span className="font-jost font-semibold text-sm mt-4 inline-flex items-center gap-1" style={{ color: '#06103C' }}>
                      Read More
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA — exact match to About page ── */}
        <section className="py-20" style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 50%, #5B2A86 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C72E9E' }}>Let&apos;s Work Together</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-white leading-tight mb-5">Ready to Discuss Your Next Project?</h2>
            <p className="font-jost text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Our licensed engineers are ready to discuss your project requirements, from grid interconnection and substation design to NERC compliance and renewable energy integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>
                Schedule a Free Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full border border-white/25 hover:bg-white/10 transition-all">
                Contact Our Team
              </Link>
              <a href="/files/keentel-company-profile.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full border border-white/25 hover:bg-white/10 transition-all text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Profile
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
