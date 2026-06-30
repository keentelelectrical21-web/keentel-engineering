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
          className="py-16 px-6"
          style={{
            background:
              'linear-gradient(135deg, rgba(6,16,60,0.97) 0%, rgba(6,16,60,0.75) 60%, rgba(91,42,134,0.4) 100%), #06103C',
          }}
        >
          <div className="max-w-3xl mx-auto">
            <Link href="/newsletters" className="font-jost text-sm text-white/70 hover:text-white mb-6 inline-block">
              ← Back to Newsletters
            </Link>
            <p className="font-jost text-sm uppercase tracking-wide mb-3" style={{ color: '#C72E9E' }}>
              {nl.edition || formatDate(nl.publishDate)}
            </p>
            <h1 className="font-urbanist font-black text-3xl md:text-5xl text-white leading-tight mb-4">
              {nl.title}
            </h1>
            {nl.subtitle && <p className="font-jost text-white/80 text-lg">{nl.subtitle}</p>}
          </div>
        </section>

        {/* HERO IMAGE */}
        {nl.heroImage && (
          <div className="max-w-3xl mx-auto -mt-10 px-6">
            <img src={nl.heroImage} alt={nl.title} className="w-full rounded-2xl shadow-xl" />
          </div>
        )}

        {/* STATS BAR */}
        {nl.stats && nl.stats.length > 0 && (
          <div className="max-w-3xl mx-auto px-6 mt-10">
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
        <article className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            {nl.body && <PortableText value={nl.body} components={ptComponents} />}
          </div>

          {/* AUTHOR */}
          <div className="max-w-3xl mx-auto mt-16 pt-10 border-t flex items-center gap-4" style={{ borderColor: '#E6E8F0' }}>
            {nl.authorImage && (
              <img src={nl.authorImage} alt={nl.author} className="w-16 h-16 rounded-full object-cover" />
            )}
            <div>
              <p className="font-jost text-xs uppercase tracking-wide text-gray-500">About the Author</p>
              <p className="font-urbanist font-bold" style={{ color: '#020659' }}>{nl.author}</p>
              <p className="font-jost text-sm text-gray-600">{nl.authorTitle}</p>
            </div>
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
