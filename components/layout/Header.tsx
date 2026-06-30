'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const services = [
  { name: 'Power System Studies', href: '/service/power-system-studies' },
  { name: 'Substation Design', href: '/service/substation-design' },
  { name: 'POI Interconnection Engineering', href: '/service/poi-interconnection-engineering-support' },
  { name: 'Transmission Line Design', href: '/service/transmission-line-design' },
  { name: 'Utility Scale Renewable Energy', href: '/service/utility-scale-renewable-energy' },
  { name: "Owner's Engineer Services", href: '/service/owners-engineer' },
  { name: 'MEP Engineering Services', href: '/service/mep-engineering' },
  { name: 'NERC Compliance Services', href: '/service/nerc-compliance' },
]

const navLinks = [
  { label: 'Industries', href: '/industries' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Grid IQ', href: '/blog' },
  { label: 'Newsletters', href: '/newsletters' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const mobileNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Grid IQ Blog', href: '/blog' },
  { label: 'Newsletters', href: '/newsletters' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? '#06103C' : 'rgba(6,16,60,0.92)',
          backdropFilter: 'blur(12px)',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.3)' : 'none',
          padding: scrolled ? '12px 0' : '16px 0',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <img
                src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10006-f79e5500-307w.png"
                alt="Keentel Engineering"
                className="h-8 lg:h-9 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center flex-1 justify-center min-w-0">
              <div className="flex items-center gap-0.5 rounded-full px-1.5 py-1 whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Link href="/" className="px-3.5 py-1.5 text-[13px] font-medium text-white rounded-full transition-all" style={{ background: 'rgba(199,46,158,0.8)' }}>
                  Home
                </Link>

                <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                  <Link href="/services" className="px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all flex items-center gap-1 hover:bg-white/10" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    Services
                    <svg className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl shadow-2xl py-2 z-50" style={{ background: '#06103C', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {services.map((s) => (
                        <Link key={s.href} href={s.href} className="block px-4 py-2.5 text-sm transition-colors hover:bg-white/5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.8)' }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right side */}
            <div className="hidden xl:flex items-center flex-shrink-0">
              <a
                href="https://calendly.com/keentel-engineering/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}
              >
                Schedule Consultation
              </a>
            </div>

            {/* Hamburger (now shows below xl breakpoint) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden relative z-[60] p-2 rounded-lg transition-colors flex-shrink-0"
              aria-label="Toggle menu"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 rounded-full bg-white transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-y-px' : ''}`} />
                <span className={`block h-0.5 rounded-full bg-white transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-0.5 rounded-full bg-white transition-all duration-300 origin-left ${isOpen ? '-rotate-45 -translate-y-px' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet overlay (now also covers lg screens that don't fit the full desktop nav) */}
      <div className={`fixed inset-0 z-[55] xl:hidden transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-full sm:w-96 flex flex-col transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ background: '#06103C' }}>

          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <img src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10006-f79e5500-307w.png" alt="Keentel Engineering" className="h-8 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
            <button onClick={() => setIsOpen(false)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
            {mobileNavLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-2xl transition-all hover:bg-white/5"
                style={{ color: 'rgba(255,255,255,0.8)' }}>
                {link.label}
                <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}

            <div>
              <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-2xl transition-all hover:bg-white/5"
                style={{ color: 'rgba(255,255,255,0.8)' }}>
                Services
                <svg className={`w-4 h-4 opacity-40 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: mobileServicesOpen ? `${services.length * 48 + 56}px` : '0px' }}>
                <div className="ml-4 mt-1 space-y-0.5 pl-4" style={{ borderLeft: '2px solid rgba(199,46,158,0.3)' }}>
                  <Link href="/services" onClick={() => setIsOpen(false)} className="block py-2.5 text-sm font-semibold transition-colors" style={{ color: 'rgba(255,255,255,0.75)' }}>All Services</Link>
                  {services.map((s) => (
                    <Link key={s.href} href={s.href} onClick={() => setIsOpen(false)} className="block py-2.5 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.name}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <a href="tel:813-389-7871" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              813-389-7871
            </a>
            <a href="https://calendly.com/keentel-engineering/15min" target="_blank" rel="noopener noreferrer"
              className="block w-full text-white text-sm font-semibold px-5 py-4 rounded-2xl text-center"
              style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>
              Schedule Consultation
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
