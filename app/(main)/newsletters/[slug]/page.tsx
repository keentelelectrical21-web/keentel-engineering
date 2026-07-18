import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getNewsletterBySlug, getAllNewsletterSlugs } from '@/lib/newsletters';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllNewsletterSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nl = await getNewsletterBySlug(slug);
  if (!nl) return {};
  return {
    title: `${nl.title} | Keentel Engineering Newsletter`,
    description: nl.excerpt || nl.subtitle,
  };
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-urbanist font-black text-2xl md:text-3xl mt-12 mb-4" style={{ color: '#020659' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-urbanist font-bold text-xl mt-8 mb-3" style={{ color: '#020659' }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-urbanist font-bold text-lg mt-6 mb-2" style={{ color: '#020659' }}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="font-jost text-gray-700 leading-relaxed mb-5 text-[17px]">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-8 pl-6 py-4 pr-4 rounded-r-lg italic font-jost text-gray-800"
        style={{ borderLeft: '5px solid #A8228A', background: '#FDF5F5' }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-2 mb-6 ml-1">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-jost text-gray-700 flex gap-3 leading-relaxed">
        <span style={{ color: '#A8228A' }} className="mt-1">▸</span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: '#020659' }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#A8228A' }}
        className="underline"
      >
        {children}
      </a>
    ),
  },
};

export default async function NewsletterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nl = await getNewsletterBySlug(slug);
  if (!nl) return notFound();

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section
          className="relative flex min-h-[720px] items-center overflow-hidden px-5 pb-20 pt-32 sm:min-h-[780px] sm:px-8 sm:pb-24 sm:pt-36"
          style={{
            background: '#06103C',
          }}
        >
          <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 85% 15%, #C72E9E 0%, transparent 35%)' }} />
          <div className={`relative mx-auto grid w-full max-w-6xl items-center gap-10 ${nl.heroImage ? 'lg:grid-cols-[1.08fr_.92fr]' : ''}`}>
            <div>
            <Link href="/newsletters" className="font-jost text-sm text-white/70 hover:text-white mb-6 inline-block">
              ← Back to Newsletters
            </Link>
            <p className="font-jost text-sm uppercase tracking-wide mb-3" style={{ color: '#C72E9E' }}>
              {nl.edition || formatDate(nl.publishDate)}
            </p>
            <h1 className="font-urbanist font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.06] mb-5 max-w-4xl">
              {nl.title}
            </h1>
            {nl.subtitle && <p className="font-jost text-white/75 text-lg leading-8 max-w-3xl">{nl.subtitle}</p>}
            </div>
            {nl.heroImage && (
              <div className="rounded-3xl border border-white/15 bg-white/[.07] p-3 shadow-2xl sm:p-4">
                <img src={nl.heroImage} alt={nl.title} className="h-auto max-h-[460px] w-full rounded-2xl bg-white object-contain" />
              </div>
            )}
          </div>
        </section>

        {/* STATS BAR */}
        {nl.stats && nl.stats.length > 0 && (
          <div className="max-w-5xl mx-auto px-5 sm:px-8 mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden" style={{ background: '#06103C' }}>
              {nl.stats.map((s, i) => (
                <div
                  key={i}
                  className="text-center py-6 px-3"
                  style={{ borderRight: i < (nl.stats?.length ?? 0) - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}
                >
                  <div className="font-urbanist font-black text-3xl text-white">
                    {s.value}
                    {s.unit && <span className="text-sm font-semibold ml-1" style={{ color: '#ff9d9d' }}>{s.unit}</span>}
                  </div>
                  <div className="font-jost text-[11px] uppercase tracking-wide text-white/60 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BODY */}
        <article className="py-16 sm:py-24 px-5 sm:px-8 bg-white">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0 [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28">
              {nl.body && <PortableText value={nl.body} components={ptComponents} />}

              {(nl.author || nl.authorTitle || nl.authorImage) && (
                <div className="mt-16 pt-10 border-t flex items-center gap-4" style={{ borderColor: '#E6E8F0' }}>
                  {nl.authorImage && (
                    <img src={nl.authorImage} alt={nl.author || 'Newsletter author'} className="w-16 h-16 rounded-full object-cover" />
                  )}
                  <div>
                    <p className="font-jost text-xs uppercase tracking-wide text-gray-500">About the Author</p>
                    {nl.author && <p className="font-urbanist font-bold" style={{ color: '#020659' }}>{nl.author}</p>}
                    {nl.authorTitle && <p className="font-jost text-sm text-gray-600">{nl.authorTitle}</p>}
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl">
                <p className="text-xs font-black uppercase tracking-[.16em] text-[#A8228A]">Let&apos;s discuss your project</p>
                <h2 className="mt-3 font-urbanist text-2xl font-black leading-tight text-[#06103C]">Turn industry insight into an executable engineering plan.</h2>
                <p className="mt-4 font-jost leading-7 text-slate-600">Talk with our engineers about interconnection, power-system studies, NERC compliance, substations, or BESS integration.</p>
                <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="mt-6 flex justify-center rounded-xl bg-gradient-to-r from-[#C72E9E] to-[#7D258E] px-5 py-3.5 text-sm font-bold text-white">Schedule a consultation</Link>
                <Link href="/contact" className="mt-3 flex justify-center rounded-xl border border-[#06103C]/15 px-5 py-3.5 text-sm font-bold text-[#06103C]">Contact Keentel</Link>
              </div>
            </aside>
          </div>
        </article>

        {/* CTA */}
        <section className="py-20 px-6 text-center" style={{ background: '#06103C' }}>
          <h2 className="font-urbanist font-black text-3xl md:text-4xl text-white mb-6">Let&apos;s Connect</h2>
          <p className="font-jost text-white/80 max-w-2xl mx-auto mb-8">
            Whether you&apos;re navigating NERC compliance, integrating BESS, or planning grid-scale projects, Keentel Engineering is ready to support your next phase.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://calendly.com/keentel-engineering/15min"
              target="_blank"
              className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
            >
              Contact Us
            </Link>
            <Link
              href="/newsletters"
              className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white border border-white/20"
            >
              See All Newsletters
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
