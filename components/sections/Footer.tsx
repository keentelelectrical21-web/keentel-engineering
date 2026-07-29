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
  { name: 'NERC Compliance', href: '/service/nerc-compliance' },
  { name: 'POI Interconnection', href: '/service/poi-interconnection-engineering-support' },
  { name: 'Renewable Energy', href: '/service/utility-scale-renewable-energy' },
  { name: 'Transmission Line Design', href: '/service/transmission-line-design' },
  { name: 'Nuclear Power Engineering', href: '/service/nuclear-power-plant' },
  { name: "Owner's Engineer", href: '/service/owners-engineer' },
  { name: 'MEP Engineering', href: '/service/mep-engineering' },
]

const resources = [
  { name: 'Services Hub', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Grid IQ Blog', href: '/blog' },
  { name: 'Newsletters', href: '/newsletters' },
  { name: 'Client & Projects', href: '/clients-and-projects' },
]

const legal = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-and-conditions' },
  { name: 'Legal Disclaimer', href: '/legal-disclaimer' },
]

const locations = [
  { name: 'Headquarters', address: '400 N Ashley Dr STE #2600, Tampa, FL 33602' },
  { name: 'Austin Office', address: '5900 Balcones Drive STE 100, Austin, TX 78731 USA' },
  { name: 'Sacramento Office', address: '1401 21st St Ste R, Sacramento, CA 95811 USA' },
  { name: 'Baltimore Office', address: '306 W Redwood St, STE 200, Baltimore, MD 21201 USA' },
]

const socials = [
  {
    name: 'Facebook', href: 'https://www.facebook.com/keentelengineering',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
  },
  {
    name: 'LinkedIn', href: 'https://www.linkedin.com/company/keentel-engineering/',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
  },
  {
    name: 'YouTube', href: 'https://www.youtube.com/@KeentelEngineering',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>,
  },
]

const marqueeText = ['Power System Engineering', 'NERC Compliance', 'Substation Design', 'Grid Reliability', 'Renewable Energy', 'IBR Modeling', 'POI Interconnection', 'BESS Engineering']

export default function Footer() {
  return (
    <footer className="overflow-hidden" style={{ background: '#F4F5F9', color: '#0B1230' }}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">

          {/* Brand */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-4">
              {/* Original logo color — no filter */}
              <img
                src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10006-f79e5500-307w.png"
                alt="Keentel Engineering"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm font-jost leading-relaxed mb-6" style={{ color: '#6B7280' }}>
              Together, we power the future of reliable and compliant electrical infrastructure across the United States.
            </p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your Email" className="flex-1 text-sm px-4 py-2.5 rounded-full focus:outline-none" style={{ background: '#fff', border: '1px solid #E6E8F0', color: '#0B1230' }} />
              <button className="text-white text-sm font-semibold px-4 py-2.5 rounded-full whitespace-nowrap" style={{ background: '#A8228A' }}>Subscribe</button>
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="font-urbanist font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#0B1230' }}>Company</h4>
            <ul className="space-y-2.5">{company.map((l) => <li key={l.href}><Link href={l.href} className="text-sm font-jost hover:text-[#A8228A] transition-colors" style={{ color: '#6B7280' }}>{l.name}</Link></li>)}</ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-urbanist font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#0B1230' }}>Services</h4>
            <ul className="space-y-2.5">{services.map((l) => <li key={l.href}><Link href={l.href} className="text-sm font-jost hover:text-[#A8228A] transition-colors" style={{ color: '#6B7280' }}>{l.name}</Link></li>)}</ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="font-urbanist font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#0B1230' }}>Resources</h4>
            <ul className="space-y-2.5">{resources.map((l) => <li key={l.href}><Link href={l.href} className="text-sm font-jost hover:text-[#A8228A] transition-colors" style={{ color: '#6B7280' }}>{l.name}</Link></li>)}</ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="font-urbanist font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#0B1230' }}>Legal</h4>
            <ul className="space-y-2.5">{legal.map((l) => <li key={l.href}><Link href={l.href} className="text-sm font-jost hover:text-[#A8228A] transition-colors" style={{ color: '#6B7280' }}>{l.name}</Link></li>)}</ul>
          </div>

        </div>

        {/* Locations — 4 offices */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#C72E9E' }}>Our Locations</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((loc) => (
              <div key={loc.name} className="rounded-2xl p-5 flex items-start gap-4" style={{ background: '#fff', border: '1px solid #E6E8F0' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(199,46,158,0.1)' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#C72E9E' }}>
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-urbanist font-bold text-sm mb-0.5" style={{ color: '#0B1230' }}>{loc.name}</p>
                  <p className="text-xs font-jost leading-snug" style={{ color: '#9CA3AF' }}>{loc.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" style={{ borderTop: '1px solid #E6E8F0' }}>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-xs font-jost" style={{ color: '#9CA3AF' }}>Copyright 1995-2026 Keentel Engineering · All Rights Reserved</p>
            <span className="hidden sm:block text-xs text-gray-300">·</span>
            <p className="text-xs font-jost" style={{ color: '#9CA3AF' }}>
              Developed & managed by{' '}
              <a href="https://dexoradigital.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A8228A] transition-colors" style={{ color: '#6B7280' }}>
                Dexora Digital
              </a>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#A8228A] hover:text-white hover:border-[#A8228A]"
                style={{ border: '1px solid #E6E8F0', color: '#9CA3AF' }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden py-4" style={{ borderTop: '1px solid #E6E8F0' }}>
        <div className="flex animate-marquee-left whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...marqueeText, ...marqueeText, ...marqueeText, ...marqueeText].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-6 font-urbanist font-black select-none" style={{ fontSize: 'clamp(40px,5vw,72px)', color: 'rgba(11,26,91,0.05)' }}>
              {item}
              <span style={{ color: '#A8228A', fontSize: '60%' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

    </footer>
  )
}
