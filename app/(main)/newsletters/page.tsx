import Link from 'next/link';
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

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section
          className="min-h-[50vh] flex items-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(6,16,60,0.97) 0%, rgba(6,16,60,0.75) 60%, rgba(91,42,134,0.4) 100%), #06103C',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-20 w-full">
            <h1 className="font-urbanist font-black text-4xl md:text-5xl text-white mb-6">
              Keentel Engineering Newsletters
            </h1>
            <p className="font-jost text-white/80 text-lg max-w-2xl">
              Monthly insight on grid reliability, NERC compliance, energy storage, and the engineering trends shaping the power industry.
            </p>
          </div>
        </section>

        {/* GRID */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsletters.map((nl) => (
                <Link
                  key={nl._id}
                  href={`/newsletters/${nl.slug.current}`}
                  className="group rounded-2xl border overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                  style={{ borderColor: '#E6E8F0' }}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    {nl.heroImage && (
                      <img
                        src={nl.heroImage}
                        alt={nl.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center" style={{ background: '#06103C' }}>
          <h2 className="font-urbanist font-black text-3xl md:text-4xl text-white mb-6">
            Let&apos;s Discuss Your Project
          </h2>
          <Link
            href="https://calendly.com/keentel-engineering/15min"
            target="_blank"
            className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
          >
            Schedule A Consultation
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
