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

const certifications = [
  { name: 'National Society of Professional Engineers', image: '/images/cert-footer-nspe.png' },
  { name: 'D-U-N-S Registered', image: '/images/cert-footer-duns.png' },
  { name: 'IEEE Senior Member', image: '/images/cert-footer-ieee.png' },
  {
    name: 'BBB Accredited Business with A+ rating',
    image: '/images/cert-footer-bbb.png',
    href: 'https://www.bbb.org/us/fl/tampa/profile/electrical-engineer/keentel-engineering-0653-90446480#licensing',
  },
]

const locations = [
  { name: 'Head Office', address: '400 N Ashley Dr STE #2600, Tampa, FL 33602', phone: '(813) 389-7871', phoneHref: 'tel:+18133897871' },
  { name: 'Austin Office', address: '5900 Balcones Drive STE 100, Austin, TX 78731 USA', phone: '(512) 591-0752', phoneHref: 'tel:+15125910752' },
  { name: 'Sacramento Office', address: '1401 21st St Ste R, Sacramento, CA 95811 USA', phone: '(916) 913-4524', phoneHref: 'tel:+19169134524' },
  { name: 'Baltimore Office', address: '306 W Redwood St, STE 200, Baltimore, MD 21201 USA', phone: '(410) 225-2181', phoneHref: 'tel:+14102252181' },
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

const marqueeText: string[] = []

export default function Footer() {
  return (
    <footer className="overflow-hidden" style={{ background: '#06103C', color: '#fff' }}>

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-12 xl:gap-x-10">

          {/* Brand */}
          <div className="min-w-0 xl:col-span-3">
            <Link href="/" aria-label="Keentel Engineering home" className="mx-auto mb-4 block w-fit sm:mx-0">
              {/* Original logo color — no filter */}
              <img
                src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10006-f79e5500-307w.png"
                alt="Keentel Engineering"
                className="h-auto w-full max-w-[260px] brightness-0 invert"
              />
            </Link>
            <p className="mb-6 text-center font-jost text-sm leading-relaxed sm:text-left" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Together, we power the future of reliable and compliant electrical infrastructure across the United States.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input type="email" placeholder="Your Email" className="min-w-0 flex-1 text-sm px-4 py-2.5 rounded-full focus:outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }} />
              <button className="w-full text-white text-sm font-semibold px-4 py-2.5 rounded-full whitespace-nowrap sm:w-auto" style={{ background: '#A8228A' }}>Subscribe</button>
            </div>
          </div>

          {/* Company */}
          <div className="min-w-0 text-center sm:text-left xl:col-span-1">
            <h4 className="font-urbanist font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#fff' }}>Company</h4>
            <ul className="space-y-2.5">{company.map((l) => <li key={l.href}><Link href={l.href} className="text-sm font-jost hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>{l.name}</Link></li>)}</ul>
          </div>

          {/* Services */}
          <div className="min-w-0 text-center sm:text-left xl:col-span-3">
            <h4 className="font-urbanist font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#fff' }}>Services</h4>
            <ul className="space-y-2.5">{services.map((l) => <li key={l.href}><Link href={l.href} className="text-sm font-jost hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>{l.name}</Link></li>)}</ul>
          </div>

          {/* Resources */}
          <div className="min-w-0 text-center sm:text-left xl:col-span-2">
            <h4 className="font-urbanist font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#fff' }}>Resources</h4>
            <ul className="space-y-2.5">{resources.map((l) => <li key={l.href}><Link href={l.href} className="text-sm font-jost hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>{l.name}</Link></li>)}</ul>
          </div>

          {/* Contact */}
          <div className="min-w-0 text-center sm:col-span-2 sm:text-left xl:col-span-3">
            <h4 className="mb-4 font-urbanist text-sm font-semibold uppercase tracking-wider text-white">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:+18133897871" className="group flex min-h-10 items-center justify-center gap-4 text-white transition hover:text-[#F6A5E3] sm:justify-start">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#C72E9E] to-[#79269A] text-white shadow-[0_7px_18px_rgba(168,34,138,0.25)]" aria-hidden="true">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" /></svg>
                </span>
                <span className="min-w-0 font-jost text-sm font-bold">813-389-7871</span>
              </a>
              <div className="flex min-h-10 items-start justify-center gap-3 sm:justify-start sm:gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#C72E9E] to-[#79269A] text-white shadow-[0_7px_18px_rgba(168,34,138,0.25)]" aria-hidden="true">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m4 4 16 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /><path d="m22 6-10 7L2 6" /></svg>
                </span>
                <a href="mailto:contact@keentelengineering.com" className="min-w-0 break-all pt-1.5 font-jost text-xs font-semibold leading-5 text-white transition hover:text-[#F6A5E3]">contact@keentelengineering.com</a>
              </div>
              <div className="flex min-h-10 items-start justify-center gap-3 sm:justify-start sm:gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#C72E9E] to-[#79269A] text-white shadow-[0_7px_18px_rgba(168,34,138,0.25)]" aria-hidden="true">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Z" /><path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" /></svg>
                </span>
                <p className="min-w-0 pt-0.5 font-jost text-xs font-semibold leading-5 text-white">
                  <span className="block text-white/60">Florida Licenses:</span>
                  CGC1524228 <span className="text-[#F6A5E3]">•</span> EC13014476
                </p>
              </div>
              <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-center font-jost text-xs font-black text-[#06103C] shadow-[0_8px_22px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#F6E9F3] sm:w-auto sm:min-w-[190px]">
                Schedule a Consultation
              </Link>
            </div>
          </div>

        </div>

        {/* Locations — 4 offices */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#C72E9E' }}>Our Locations</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {locations.map((loc) => (
              <div key={loc.name} className="flex min-w-0 items-start gap-4 rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #C72E9E, #79269A)' }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#fff' }}>
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-urbanist font-bold text-base mb-1" style={{ color: '#fff' }}>{loc.name}</p>
                  <p className="text-sm font-jost leading-snug" style={{ color: 'rgba(255,255,255,0.65)' }}>{loc.address}</p>
                  <a href={loc.phoneHref} className="mt-3 inline-block font-urbanist text-base font-black text-white transition-colors hover:text-[#C72E9E]" aria-label={`Call ${loc.name} at ${loc.phone}`}>
                    {loc.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Memberships */}
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] shadow-[0_20px_55px_rgba(0,0,0,0.14)]">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#A8228A]/10 blur-3xl" aria-hidden="true" />
          <div className="relative grid grid-cols-1 gap-px bg-white/10 min-[380px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
            {certifications.map((certification) => {
              const content = (
                <img
                  src={certification.image}
                  alt={certification.name}
                  className="h-20 w-auto max-w-full object-contain drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)]"
                />
              )

              const itemClass = 'flex min-h-32 items-center justify-center bg-[#06103C] px-4 py-6 sm:min-h-36 sm:px-5'

              return certification.href ? (
                <a
                  key={certification.name}
                  href={certification.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${certification.name}`}
                  className={`${itemClass} col-span-1 min-[380px]:col-span-2 xl:col-span-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white`}
                >
                  {content}
                </a>
              ) : (
                <div key={certification.name} className={itemClass}>
                  {content}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="grid grid-cols-1 items-center gap-4 border-t border-white/10 pt-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <div className="order-3 text-center lg:order-1 lg:text-left">
            <p className="text-xs font-jost" style={{ color: 'rgba(255,255,255,0.35)' }}>Copyright 1995-2026 Keentel Engineering · All Rights Reserved</p>
          </div>
          <nav aria-label="Legal" className="order-2 w-full lg:w-auto">
            <div className="grid w-full grid-cols-1 overflow-hidden rounded-xl border border-white/10 min-[420px]:grid-cols-3 lg:w-auto [&>div+div]:border-t [&>div+div]:border-white/10 [&>div:before]:hidden min-[420px]:[&>div+div]:border-l min-[420px]:[&>div+div]:border-t-0">
              {legal.map((item, index) => (
                <div key={item.href} className={`flex items-center ${index > 0 ? 'before:text-white/20 before:content-["•"]' : ''}`}>
                  <Link href={item.href} className="inline-flex min-h-11 w-full items-center justify-center px-3 text-center font-jost text-xs font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white">
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </nav>

          <div className="order-1 flex items-center justify-center gap-2 lg:order-3 lg:justify-end">
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:border-[#A8228A] hover:bg-[#A8228A] hover:text-white sm:h-8 sm:w-8"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile socials — footer end */}

        {/* Legal utility links — centered at the footer end */}
        <nav aria-label="Legal" className="hidden">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-1 min-[390px]:flex-row min-[390px]:gap-0">
            {legal.map((item, index) => (
              <div key={item.href} className={`flex items-center ${index > 0 ? 'min-[390px]:before:mr-1 min-[390px]:before:text-white/20 min-[390px]:before:content-["•"]' : ''}`}>
                <Link href={item.href} className="inline-flex min-h-10 items-center justify-center rounded-full px-4 text-center font-jost text-xs font-medium text-white/55 transition hover:bg-white/[0.05] hover:text-white sm:text-sm">
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Marquee */}
      <div className="hidden" aria-hidden="true">
        <div className="flex animate-marquee-left whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...marqueeText, ...marqueeText, ...marqueeText, ...marqueeText].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-6 font-urbanist font-black select-none" style={{ fontSize: 'clamp(40px,5vw,72px)', color: 'rgba(255,255,255,0.05)' }}>
              {item}
              <span style={{ color: '#A8228A', fontSize: '60%' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

    </footer>
  )
}
