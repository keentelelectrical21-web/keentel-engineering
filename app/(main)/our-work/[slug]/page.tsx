import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getCaseStudyBySlug, getAllCaseStudySlugs } from '@/lib/caseStudies';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} | Keentel Engineering Case Study`,
    description: cs.subtitle || cs.background,
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return notFound();

  const categoryLabel = cs.category === 'substation' ? 'Substation Engineering' : 'Power System Studies';

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section
          className="px-6 pb-16 pt-40 sm:pt-44"
          style={{
            background:
              'linear-gradient(135deg, rgba(6,16,60,0.97) 0%, rgba(6,16,60,0.75) 60%, rgba(91,42,134,0.4) 100%), #06103C',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <p className="font-jost text-sm uppercase tracking-wide mb-3" style={{ color: '#C72E9E' }}>
              {categoryLabel}
            </p>
            <h1 className="font-urbanist font-black text-3xl md:text-5xl text-white leading-tight mb-4">
              {cs.title}
            </h1>
            {cs.subtitle && (
              <p className="font-jost text-white/80 text-lg mb-4">{cs.subtitle}</p>
            )}
            {(cs.client || cs.region) && (
              <div className="flex flex-wrap gap-6 mt-6 font-jost text-sm text-white/70">
                {cs.client && (
                  <span>
                    <strong className="text-white">Client:</strong> {cs.client}
                  </span>
                )}
                {cs.region && (
                  <span>
                    <strong className="text-white">Region:</strong> {cs.region}
                  </span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* IMAGE */}
        {cs.cardImage && (
          <div className="max-w-4xl mx-auto -mt-10 px-6">
            <img
              src={cs.cardImage}
              alt={cs.title}
              className="w-full rounded-2xl shadow-xl"
            />
          </div>
        )}

        {/* CONTENT */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            {cs.background && (
              <div className="mb-10">
                <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#020659' }}>
                  Background &amp; Scope
                </h2>
                <p className="font-jost text-gray-700 leading-relaxed">{cs.background}</p>
              </div>
            )}

            {cs.challenges && cs.challenges.length > 0 && (
              <div className="mb-10">
                <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#020659' }}>
                  Engineering Challenges
                </h2>
                <ul className="space-y-2">
                  {cs.challenges.map((item) => (
                    <li key={item} className="font-jost text-gray-700 flex gap-3">
                      <span style={{ color: '#A8228A' }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cs.solution && cs.solution.length > 0 && (
              <div className="mb-10">
                <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#020659' }}>
                  Keentel Engineering Solution
                </h2>
                <ul className="space-y-2">
                  {cs.solution.map((item) => (
                    <li key={item} className="font-jost text-gray-700 flex gap-3">
                      <span style={{ color: '#A8228A' }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cs.stack && (
              <div className="mb-10">
                <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#020659' }}>
                  Engineering Stack
                </h2>
                <p className="font-jost font-semibold" style={{ color: '#020659' }}>{cs.stack}</p>
              </div>
            )}

            {cs.outcome && cs.outcome.length > 0 && (
              <div className="mb-10 rounded-2xl p-6" style={{ background: '#F4F5F9' }}>
                <h2 className="font-urbanist font-black text-2xl mb-3" style={{ color: '#020659' }}>
                  Outcome
                </h2>
                <ul className="space-y-2">
                  {cs.outcome.map((item) => (
                    <li key={item} className="font-jost text-gray-700 flex gap-3">
                      <span style={{ color: '#A8228A' }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="py-20 px-6 text-center" style={{ background: '#06103C' }}>
          <h2 className="font-urbanist font-black text-3xl md:text-4xl text-white mb-6">
            Ready to Solve Your Power System Challenges?
          </h2>
          <p className="font-jost text-white/80 max-w-2xl mx-auto mb-8">
            Whether you are interconnecting a renewable plant, expanding an industrial facility, or managing grid reliability, our engineers provide accurate analysis and actionable recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://calendly.com/keentel-engineering/15min"
              target="_blank"
              className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
            >
              Schedule A Consultation
            </Link>
            <Link
              href="/clients-and-projects"
              className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white border border-white/20"
            >
              See All Case Studies
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
