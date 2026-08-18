import Link from 'next/link';
import Image from 'next/image';
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
      <h2 className="mt-14 border-t border-[#06103C]/20 pt-8 font-urbanist text-2xl font-black leading-tight text-[#06103C] md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-urbanist text-xl font-black leading-snug text-[#A8228A]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-urbanist font-bold text-lg mt-6 mb-2" style={{ color: '#020659' }}>
        {children}
      </h4>
    ),
    meta: ({ children }) => (
      <p className="mb-4 font-jost text-sm font-bold uppercase tracking-[0.13em] text-[#A8228A]">{children}</p>
    ),
    normal: ({ children }) => (
      <p className="mb-5 font-jost text-[15px] leading-7 text-slate-700 sm:text-base">{children}</p>
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
    bullet: ({ children }) => <ul className="mb-7 list-none space-y-2.5 border-l-2 border-[#A8228A]/25 pl-5">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-5 font-jost text-[15px] leading-6 text-slate-700 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#A8228A] [&>span:first-child]:hidden sm:text-base">
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

const serviceLinks = [
  { label: 'All Engineering Services', href: '/services' },
  { label: 'Power System Studies', href: '/service/power-system-studies' },
  { label: 'Substation Design', href: '/service/substation-design' },
  { label: 'POI Interconnection', href: '/service/poi-interconnection-engineering-support' },
  { label: 'NERC Compliance', href: '/service/nerc-compliance' },
]

export function NewsletterSidebar() {
  return (
    <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
      <section className="overflow-hidden rounded-2xl border border-[#DCE1EC] bg-white shadow-[0_10px_28px_rgba(6,16,60,0.08)]">
        <div className="bg-[#06103C] px-6 py-4"><p className="font-jost text-xs font-bold uppercase tracking-[0.16em] text-[#F075D2]">About the Author</p></div>
        <div className="p-6 text-center">
          <Image src="/images/newsletters/author-sonny-patel.jpeg" alt="Sonny Patel P.E. EC" width={160} height={160} className="mx-auto h-20 w-20 rounded-full border-4 border-[#A8228A]/15 object-cover" />
          <h2 className="mt-4 font-urbanist text-lg font-black text-[#06103C]">Sonny Patel P.E. EC</h2>
          <p className="mt-1 font-jost text-xs font-semibold text-[#A8228A]">IEEE Senior Member</p>
          <p className="mt-4 font-jost text-xs leading-5 text-slate-600">Founder and CEO of KEENTEL LLC, licensed Professional Engineer, and Florida Unlimited Electrical Contractor.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-[#DCE1EC] bg-[#F7F8FC] p-5 shadow-[0_10px_28px_rgba(6,16,60,0.06)]">
        <p className="mb-4 text-center font-urbanist text-lg font-black text-[#06103C]">Services</p>
        <div className="space-y-2">{serviceLinks.map((service) => <Link key={service.href} href={service.href} className="flex min-h-10 items-center justify-center rounded-lg border border-[#06103C]/10 bg-white px-3 text-center font-jost text-xs font-bold text-[#06103C] transition hover:border-[#A8228A] hover:text-[#A8228A]">{service.label}</Link>)}</div>
      </section>

      <section className="rounded-2xl bg-[#06103C] p-6 text-center shadow-[0_14px_32px_rgba(6,16,60,0.16)]">
        <p className="font-jost text-xs font-bold uppercase tracking-[0.15em] text-[#F075D2]">Let&apos;s discuss your project</p>
        <h2 className="mt-3 font-urbanist text-xl font-black leading-tight text-white">Engineering support for your next phase.</h2>
        <p className="mt-3 font-jost text-sm leading-6 text-white/70">Talk with our engineers about compliance, studies, interconnection, or energy-storage delivery.</p>
        <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="mt-5 flex min-h-11 items-center justify-center rounded-lg bg-[#B3239B] px-4 font-jost text-sm font-bold text-white transition hover:bg-[#D036B7]">Schedule a Consultation</Link>
        <Link href="/contact" className="mt-2 flex min-h-11 items-center justify-center rounded-lg border border-white/25 px-4 font-jost text-sm font-bold text-white transition hover:bg-white/10">Contact Our Team</Link>
      </section>
    </aside>
  )
}

export default async function NewsletterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nl = await getNewsletterBySlug(slug);
  if (!nl) return notFound();
  const isMarchReliabilityNewsletter = slug === 'march-2026-nerc-grid-reliability-updates'
  const isBessNewsletter = slug === 'bess-growth-grid-reliability-compliance-2026'

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section
          className="relative flex min-h-[calc(100svh-var(--site-header-height))] items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36"
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
            {nl.publishDate && <p className="mb-4 font-jost text-sm text-white/60">{formatDate(nl.publishDate)} <span className="mx-2 text-white/30">|</span> Newsletter</p>}
            <h1 className="font-urbanist font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.06] mb-5 max-w-4xl">
              {nl.title}
            </h1>
            {nl.subtitle && <p className="font-jost text-white/75 text-lg leading-8 max-w-3xl">{nl.subtitle}</p>}
            </div>
            {nl.heroImage && (
              <div className="rounded-3xl border border-white/15 bg-white/[.07] p-3 shadow-2xl sm:p-4">
                <Image src={nl.heroImage} alt={nl.title} width={1200} height={800} priority sizes="(max-width: 1024px) 100vw, 45vw" className="h-auto max-h-[460px] w-full rounded-2xl bg-white object-contain" />
              </div>
            )}
          </div>
        </section>

        {/* STATS BAR */}
        {!isBessNewsletter && nl.stats && nl.stats.length > 0 && (
          <div className={`mx-auto mt-10 px-5 sm:px-8 ${isBessNewsletter ? 'max-w-6xl' : 'max-w-5xl'}`}>
            <div className={`grid grid-cols-2 overflow-hidden rounded-xl md:grid-cols-4 ${isBessNewsletter ? 'lg:max-w-[calc(100%-330px)]' : ''}`} style={{ background: '#06103C' }}>
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
        <article className="bg-[#F6F7FB] px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-10">
            <div className="min-w-0 rounded-2xl border border-[#E1E4EC] bg-white px-5 py-8 shadow-[0_10px_28px_rgba(6,16,60,0.06)] sm:px-9 sm:py-10 [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28">
              {isBessNewsletter && nl.stats && nl.stats.length > 0 && (
                <div className="mb-10 grid grid-cols-2 overflow-hidden rounded-xl md:grid-cols-4" style={{ background: '#06103C' }}>
                  {nl.stats.map((s, i) => (
                    <div
                      key={i}
                      className="border-b border-white/10 px-3 py-6 text-center last:border-b-0 md:border-b-0 md:border-r last:md:border-r-0"
                      style={{ borderRight: i < nl.stats!.length - 1 ? '1px solid rgba(255,255,255,0.12)' : undefined }}
                    >
                      <div className="font-urbanist text-3xl font-black text-white">
                        {s.value}
                        {s.unit && <span className="ml-1 text-sm font-semibold" style={{ color: '#ff9d9d' }}>{s.unit}</span>}
                      </div>
                      <div className="mt-1 font-jost text-[11px] uppercase tracking-wide text-white/60">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {nl.body && <PortableText value={nl.body} components={ptComponents} />}
              {isMarchReliabilityNewsletter && (
                <>
                  <div className="mt-10 flex flex-col gap-3 border-t border-[#06103C]/20 pt-8 sm:flex-row">
                    <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#06103C] px-5 font-jost text-sm font-bold text-white transition hover:bg-[#A8228A]">Booking Our Consultation</Link>
                    <Link href="/service/nerc-compliance" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#06103C]/20 px-5 font-jost text-sm font-bold text-[#06103C] transition hover:border-[#A8228A] hover:text-[#A8228A]">NERC Compliance Services</Link>
                  </div>
                  <section className="mt-10 overflow-hidden rounded-2xl bg-[#06103C] p-6 text-white shadow-[0_16px_36px_rgba(6,16,60,0.16)] sm:p-8">
                    <div className="grid items-start gap-5 sm:grid-cols-[104px_1fr] sm:gap-7">
                      <Image src="/images/newsletters/author-sonny-patel.jpeg" alt="Sonny Patel P.E. EC" width={160} height={160} className="h-24 w-24 rounded-full border-4 border-white/10 object-cover" />
                      <div>
                        <p className="font-jost text-xs font-bold uppercase tracking-[0.16em] text-[#F075D2]">About the Author</p>
                        <h2 className="mt-2 font-urbanist text-2xl font-black text-white">Sonny Patel P.E. EC</h2>
                        <p className="mt-1 font-jost text-sm font-semibold text-white/75">IEEE Senior Member</p>
                        <p className="mt-4 font-jost text-sm leading-7 text-white/85">In 1995, Sandip (Sonny) R. Patel earned his Electrical Engineering degree from the University of Illinois, specializing in Electrical Engineering. But degrees don&apos;t build legacies—action does. For three decades, he&apos;s been shaping the future of engineering, not just as a licensed Professional Engineer across multiple states (Florida, California, New York, West Virginia, and Minnesota), but as a doer. A builder. A leader. Not just an engineer. A Licensed Electrical Contractor in Florida with an Unlimited EC license. Not just an executive. The founder and CEO of KEENTEL LLC—where expertise meets execution. Three decades. Multiple states. Endless impact.</p>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
            <NewsletterSidebar />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
