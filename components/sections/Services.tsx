'use client'

import Link from 'next/link'

const services = [
  {
    title: 'Power System Studies',
    desc: 'Load flow analysis. Fault studies. Harmonic analysis. Protection coordination. Transmission planning. Every grid project starts here.',
    href: '/service/power-system-studies',
    image: '/images/home/service-3.jpg',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/advance+power+system.pdf',
  },
  {
    title: 'Substation Design',
    desc: 'EHV, HV, MV substation design. Protection and control. Secondary systems. Asset management. We design substations that work 40 years without surprises.',
    href: '/service/substation-design',
    image: '/images/home/service-2.png',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/substation+design.pdf',
  },
  {
    title: 'POI Interconnection Engineering',
    desc: 'Point of interconnection studies. Queue navigation. Grid impact assessments. Facility rating studies. The difference between your project getting built or getting stuck.',
    href: '/service/poi-interconnection-engineering-support',
    image: '/images/home/service-1.jpg',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/poi+Interconecting.pdf',
  },
  {
    title: "Owner's Engineer Services",
    desc: 'Third-party project oversight. Quality assurance. Commissioning support. Asset handoff. When you need an expert sitting at the table.',
    href: '/service/owners-engineer',
    image: '/images/home/service-4.jpg',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/owner+engineersing.pdf',
  },
  {
    title: 'NERC Compliance Services',
    desc: 'NERC modeling. MOD compliance. PRC standards. O&P audits. Level 3 alerts. We keep you compliant before NERC catches you.',
    href: '/service/nerc-compliance',
    image: '/images/home/service-5.jpg',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/nercs.pdf',
  },
  {
    title: 'Utility Scale Solar Farms',
    desc: 'Solar, wind, and BESS engineering. Interconnection. Grid codes. Winterization. From project conception through grid handoff.',
    href: '/service/utility-scale-renewable-energy',
    image: '/images/home/service-6.png',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/utility+scale+solar+farm.pdf',
  },
  {
    title: 'Nuclear Power Plant Engineering',
    desc: 'Electrical system studies, protection, modifications, lifecycle asset support, and compliance-ready engineering for nuclear generation facilities.',
    href: '/service/nuclear-power-plant',
    image: '/images/services/power-system-studies/industry-utilities.jpg',
    flyer: '/service/nuclear-power-plant',
  },
]

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#A8228A' }}>Our Services</p>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl leading-tight" style={{ color: '#0B1230' }}>
              What We Can Do<br />For You
            </h2>
          </div>
          <div className="lg:w-2/5">
            <p className="text-base font-jost leading-relaxed mb-5" style={{ color: '#6B7280' }}>
              Full-spectrum electrical power engineering services focused on grid modernization, compliance, and renewable energy integration.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border-2 transition-all group"
              style={{ borderColor: '#0B1A5B', color: '#0B1A5B' }}
            >
              See All Services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
              style={{ border: '1px solid #E6E8F0', background: '#fff' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(6,16,60,0.3) 100%)' }} />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-urbanist font-bold text-xl mb-3 leading-tight" style={{ color: '#0B1230' }}>
                  {service.title}
                </h3>
                <p className="text-sm font-jost leading-relaxed flex-1 mb-5" style={{ color: '#6B7280' }}>
                  {service.desc}
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href={service.href}
                    className="text-xs font-bold px-4 py-2 rounded-full text-white transition-all"
                    style={{ background: '#0B1A5B' }}
                  >
                    Learn More
                  </Link>
                  {service.flyer && (
                    <a
                      href={service.flyer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all"
                      style={{ borderColor: '#E6E8F0', color: '#A8228A' }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Flyer
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
