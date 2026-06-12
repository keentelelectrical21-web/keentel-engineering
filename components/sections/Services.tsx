'use client'

import Link from 'next/link'

const services = [
  {
    title: 'Power System Studies',
    desc: 'EHV, HV & MV load flow, short circuit, harmonic, and protective device coordination studies.',
    href: '/service/power-system-studies',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10003-455w.jpg',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/advance+power+system.pdf',
  },
  {
    title: 'Substation Design',
    desc: 'HV/EHV substation design, SCADA integration, IEC 61850 digital substation engineering.',
    href: '/service/substation-design',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10002+%282%29-455w.png',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/substation+design.pdf',
  },
  {
    title: 'POI Interconnection Engineering',
    desc: 'System impact studies, facility ratings compliance, dynamic stability, and model quality testing.',
    href: '/service/poi-interconnection-engineering-support',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10001-455w.jpg',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/poi+Interconecting.pdf',
  },
  {
    title: "Owner's Engineer Services",
    desc: 'Independent technical oversight, EPC management, commissioning, and project lifecycle support.',
    href: '/service/owners-engineer',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10004-455w.jpg',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/owner+engineersing.pdf',
  },
  {
    title: 'NERC Compliance Services',
    desc: 'Gap analysis, RSAW documentation, pre/post audit support, and IBR model validation.',
    href: '/service/nerc-compliance',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10005-455w.jpg',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/nercs.pdf',
  },
  {
    title: 'Utility Scale Solar Farms',
    desc: 'Full lifecycle solar engineering from site assessment through commissioning and optimization.',
    href: '/service/utility-scale-solar-farms',
    image: 'https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10006-455w.png',
    flyer: 'https://irp.cdn-website.com/1253891b/files/uploaded/utility+scale+solar+farm.pdf',
  },
]

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.001z" />
              </svg>
              Our Services
            </span>
            <h2 className="font-urbanist font-black text-4xl sm:text-5xl text-gray-900 leading-tight">
              What We Can Do<br />For You
            </h2>
          </div>
          <div className="lg:w-2/5">
            <p className="text-gray-500 font-jost text-base leading-relaxed mb-5">
              Full-spectrum electrical power engineering services focused on grid modernization, compliance, and renewable energy integration.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-all group"
            >
              See All Services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 3x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <div key={i} className="service-card group relative rounded-3xl overflow-hidden" style={{ height: '340px' }}>

              {/* Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Base gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Arrow top right */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
                <Link
                  href={service.href}
                  className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>

              {/* 
                Layout logic:
                - Title: absolute bottom-6, translates UP on hover by 110px
                - Desc+buttons: absolute bottom-6 also, but starts hidden (opacity-0, translate-y-0)
                  and fades in AFTER title moves up. They sit in the space title vacated.
              -->
              */}

              {/* Title — slides UP on hover */}
              <h3
                className="absolute left-6 right-6 bottom-6 font-urbanist font-bold text-white text-xl leading-tight transition-all duration-400 ease-out group-hover:-translate-y-[110px] z-10"
              >
                {service.title}
              </h3>

              {/* Desc + buttons — fades in at bottom after title moves up */}
              <div className="absolute left-6 right-6 bottom-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-150 z-10">
                <p className="text-white/85 text-sm font-jost leading-snug mb-3 line-clamp-2">
                  {service.desc}
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href={service.href}
                    className="text-white text-xs font-semibold border border-white/50 px-3 py-1.5 rounded-full hover:bg-white hover:text-gray-900 transition-all"
                  >
                    Learn More
                  </Link>
                  {service.flyer && (
                    <a
                      href={service.flyer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 text-xs font-medium hover:text-white transition-colors flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Flyer
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