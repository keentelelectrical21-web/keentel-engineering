import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllCaseStudies } from '@/lib/caseStudies';

export const revalidate = 3600;

export default async function OurWorkPage() {
  const caseStudies = await getAllCaseStudies();
  const substation = caseStudies.filter((c) => c.category === 'substation');
  const powerSystem = caseStudies.filter((c) => c.category === 'power-system');

  const clientLogos = [
    'RRC-ae225119', 'PAE-864f5ced', '49-752adf6f', '48-816ccd8f', '47-363a19ec',
    '46-ff7bc11f', '45-dfb687e0', '44-18370d1d', '43-10240e91',
  ];

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section
          className="min-h-[60vh] flex items-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(6,16,60,0.97) 0%, rgba(6,16,60,0.75) 60%, rgba(91,42,134,0.4) 100%), #06103C',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-20 w-full">
            <h1 className="font-urbanist font-black text-4xl md:text-5xl text-white mb-6">Our Work</h1>
            <p className="font-jost text-white/80 text-lg max-w-2xl mb-8">
              Keentel Engineering supports utilities, EPCs, renewable developers, and infrastructure teams with power studies, substation design, interconnection engineering, and NERC compliance.
            </p>
            <Link
              href="https://calendly.com/keentel-engineering/15min"
              target="_blank"
              className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #A8228A, #5B2A86)' }}
            >
              Schedule a Consultation
            </Link>
          </div>
        </section>

        {/* SUBSTATION CASE STUDIES */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-urbanist font-black text-3xl md:text-4xl mb-3" style={{ color: '#020659' }}>
              Substation Engineering Case Studies
            </h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-10">
              Real-world substation engineering delivered across rural electrification, smart cities, renewable energy, and space-constrained urban environments.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {substation.map((cs) => (
                <Link
                  key={cs._id}
                  href={`/our-work/${cs.slug.current}`}
                  className="group rounded-2xl border overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all"
                  style={{ borderColor: '#E6E8F0' }}
                >
                  <div className="aspect-[4/3] overflow-hidden flex items-center justify-center p-3" style={{ background: '#F6F7FB' }}>
                    {cs.cardImage && (
                      <img
                        src={cs.cardImage}
                        alt={cs.title}
                        className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-urbanist font-bold text-sm leading-snug">{cs.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* POWER SYSTEM CASE STUDIES */}
        <section className="py-20 px-6" style={{ background: '#F4F5F9' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="font-urbanist font-black text-3xl md:text-4xl mb-3" style={{ color: '#020659' }}>
              Power System Case Studies
            </h2>
            <p className="font-jost text-gray-600 max-w-3xl mb-10">
              Practical power system engineering studies delivered for renewable interconnection, reactive power, insulation coordination, GIS transients, and power quality challenges.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {powerSystem.map((cs) => (
                <Link
                  key={cs._id}
                  href={`/our-work/${cs.slug.current}`}
                  className="group rounded-2xl border overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all"
                  style={{ borderColor: '#E6E8F0' }}
                >
                  <div className="aspect-[4/3] overflow-hidden flex items-center justify-center p-3 bg-white">
                    {cs.cardImage && (
                      <img
                        src={cs.cardImage}
                        alt={cs.title}
                        className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-urbanist font-bold text-sm leading-snug">{cs.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WHO WE'VE SERVED */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="font-urbanist font-black text-3xl md:text-4xl mb-4" style={{ color: '#020659' }}>
              Who We&apos;ve Served
            </h2>
            <p className="font-jost text-gray-600 max-w-2xl mx-auto">
              Serving utilities, EPCs, developers, and infrastructure organizations supporting critical power systems nationwide.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {clientLogos.map((logo) => (
              <div key={logo} className="rounded-2xl border bg-white flex items-center justify-center p-8 min-h-[170px]" style={{ borderColor: 'rgba(2,6,89,.2)' }}>
                <img src={`/images/clients/${logo}.png`} alt="Client logo" className="max-h-[130px] max-w-full object-contain" />
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="py-20 px-6 text-center" style={{ background: '#06103C' }}>
          <h2 className="font-urbanist font-black text-3xl md:text-5xl text-white mb-6">
            Let&apos;s Discuss How to Optimize Your Next Project
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
