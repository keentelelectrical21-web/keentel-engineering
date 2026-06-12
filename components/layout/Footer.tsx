'use client'

import Link from 'next/link'

const company = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const services = [
  { name: 'Power System Studies', href: '/service/power-system-studies' },
  { name: 'Substation Design', href: '/service/substation-design' },
  { name: 'POI Interconnection', href: '/service/poi-interconnection-engineering-support' },
  { name: 'NERC Compliance', href: '/service/nerc-compliance' },
  { name: 'Renewable Energy', href: '/service/utility-scale-renewable-energy' },
  { name: "Owner's Engineer", href: '/service/owners-engineer' },
]

const resources = [
  { name: 'Services Hub', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Grid IQ Blog', href: '/blog' },
  { name: 'Newsletter', href: '/newsletter' },
  { name: 'Case Studies', href: '/case-studies' },
]

const utility = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-and-conditions' },
  { name: 'Legal Disclaimer', href: '/legal-disclaimer' },
  { name: 'Sitemap', href: '/sitemap' },
]

const socials = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/keentelengineering',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/keentel-engineering/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@KeentelEngineering',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    href: 'https://twitter.com/keenteleng',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

const marqueeText = ['Power System Engineering', 'NERC Compliance', 'Substation Design', 'Grid Reliability', 'Renewable Energy', 'IBR Modeling', 'POI Interconnection', 'BESS Engineering']

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white overflow-hidden">

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-4">
              <img
                src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/zeeshan+2nd+logo+%281%29-417w.png"
                alt="Keentel Engineering"
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm font-jost leading-relaxed mb-6">
              Together, we power the future of reliable and compliant electrical infrastructure across the United States.
            </p>

            {/* Email subscribe */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 bg-gray-800 border border-gray-700 text-white text-sm px-4 py-2.5 rounded-full placeholder-gray-500 focus:outline-none focus:border-[#030DA6]"
              />
              <button className="bg-[#030DA6] text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap">
                Submit
              </button>
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-urbanist font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 text-sm font-jost hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-urbanist font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 text-sm font-jost hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-urbanist font-semibold text-sm uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {resources.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 text-sm font-jost hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Utility */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-urbanist font-semibold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {utility.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 text-sm font-jost hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider + bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs font-jost">
            Copyright 1995–2026 Keentel Engineering · All Rights Reserved
          </p>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Big marquee text bottom */}
      <div className="border-t border-gray-800 overflow-hidden py-4">
        <div className="flex animate-marquee-left whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...marqueeText, ...marqueeText].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 mx-6 font-urbanist font-black text-5xl sm:text-7xl text-gray-800 select-none"
            >
              {item}
              <span className="text-[#030DA6] text-4xl">✦</span>
            </span>
          ))}
        </div>
      </div>

    </footer>
  )
}