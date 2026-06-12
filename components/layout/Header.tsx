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

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10006-f79e5500-307w.png"
                alt="Keentel Engineering"
                className="h-9 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1.5">
                <Link href="/" className="px-4 py-1.5 text-sm font-medium text-white bg-[#030DA6] rounded-full transition-all">
                  Home
                </Link>

                <div
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-[#030DA6] rounded-full hover:bg-white transition-all flex items-center gap-1">
                    Services
                    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                      {services.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#030DA6] transition-colors"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/industries" className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-[#030DA6] rounded-full hover:bg-white transition-all">Industries</Link>
                <Link href="/blog" className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-[#030DA6] rounded-full hover:bg-white transition-all">Grid IQ</Link>
                <Link href="/about" className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-[#030DA6] rounded-full hover:bg-white transition-all">About</Link>
                <Link href="/contact" className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-[#030DA6] rounded-full hover:bg-white transition-all">Contact</Link>
              </div>
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:813-389-7871" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#030DA6] transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                813-389-7871
              </a>
              <a
                href="https://calendly.com/keentel-engineering/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#030DA6] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#020a8a] transition-all hover:shadow-lg hover:shadow-blue-200"
              >
                Schedule Consultation
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-[60] p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-gray-800 rounded-full transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-y-px' : ''}`} />
                <span className={`block h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-0.5 bg-gray-800 rounded-full transition-all duration-300 origin-left ${isOpen ? '-rotate-45 -translate-y-px' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <img
              src="https://lirp.cdn-website.com/1253891b/dms3rep/multi/opt/10006-f79e5500-307w.png"
              alt="Keentel Engineering"
              className="h-8 w-auto"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Industries', href: '/industries' },
              { label: 'Grid IQ Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
            ].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 text-base font-medium text-gray-800 hover:text-[#030DA6] hover:bg-blue-50 rounded-2xl transition-all"
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
              >
                {link.label}
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}

            {/* Services accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-base font-medium text-gray-800 hover:text-[#030DA6] hover:bg-blue-50 rounded-2xl transition-all"
              >
                Services
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Smooth accordion */}
              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{ maxHeight: mobileServicesOpen ? `${services.length * 52}px` : '0px' }}
              >
                <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-[#030DA6]/20 pl-4">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2.5 text-sm text-gray-600 hover:text-[#030DA6] transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="px-6 py-6 border-t border-gray-100 space-y-3">
            <a
              href="tel:813-389-7871"
              className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-[#030DA6]/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-[#030DA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              813-389-7871
            </a>
            <a
              href="https://calendly.com/keentel-engineering/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#030DA6] text-white text-sm font-semibold px-5 py-4 rounded-2xl text-center hover:bg-[#020a8a] transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </div>
    </>
  )
}