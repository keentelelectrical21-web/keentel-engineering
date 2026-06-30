'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const industries = [
  {
    title: "Utilities & Transmission Operators",
    image: "/images/industries/hub/utilities-transmission.jpg",
    href: "/industries/electric-utilities-transmission",
  },
  {
    title: "Renewable Energy Developers",
    image: "/images/industries/hub/renewable-developers.jpg",
    href: "/industries/renewable-interconnection-engineering",
  },
  {
    title: "Industrial & Manufacturing Facilities",
    image: "/images/industries/hub/industrial-manufacturing.webp",
    href: "/industries/industrial-power-engineering",
  },
  {
    title: "Oil, Gas & Mining Operations",
    image: "/images/industries/hub/oil-gas-mining.jpg",
    href: "/industries/oil-gas-mining",
  },
  {
    title: "Data Centers & Commercial Infrastructure",
    image: "/images/industries/hub/data-centers.jpg",
    href: "/industries/data-center-electrical",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="min-h-[55vh] flex items-center relative"
          style={{ background: '#06103C' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(6,16,60,0.97) 0%, rgba(6,16,60,0.85) 60%, rgba(91,42,134,0.4) 100%)',
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
            <span
              className="font-jost text-sm uppercase tracking-wider"
              style={{ color: '#A8228A' }}
            >
              Industries We Serve
            </span>
            <h1 className="font-urbanist font-black text-4xl md:text-5xl text-white mt-4 mb-6">
              Power Engineering Solutions Built for Your Industry
            </h1>
            <p className="font-jost text-white/80 text-lg max-w-3xl mx-auto">
              From utilities and transmission operators to renewable developers,
              industrial facilities, and data centers, Keentel Engineering
              delivers practical, standards-compliant engineering solutions
              tailored to the unique reliability and regulatory demands of
              each industry we serve.
            </p>
          </div>
        </section>

        {/* Industry cards */}
        <section className="py-24" style={{ background: '#F7F8FC' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((ind) => (
                <Link
                  key={ind.href}
                  href={ind.href}
                  className="group block bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: '#E6E8F0' }}
                >
                  <div className="relative h-52 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3
                      className="font-urbanist font-bold text-lg leading-snug"
                      style={{ color: '#06103C' }}
                    >
                      {ind.title}
                    </h3>
                    <span
                      className="font-jost text-sm font-semibold inline-block mt-4"
                      style={{ color: '#A8228A' }}
                    >
                      See More &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24" style={{ background: '#06103C' }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-urbanist font-black text-3xl text-white mb-4">
              Let&apos;s Discuss How to Optimize Your Next Project
            </h2>
            <p className="font-jost text-white/80 mb-8">
              Whatever industry you operate in, our engineers bring decades
              of combined experience to deliver reliable, compliant, and
              future-ready power system solutions.
            </p>
            <a
              href="https://calendly.com/keentel-engineering/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-4 font-jost font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #A8228A, #5B2A86)',
              }}
            >
              Schedule A Consultation
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
