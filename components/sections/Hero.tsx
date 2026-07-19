'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const marqueeItems = [
  'NERC Compliant Solutions', 'IEEE Certified Engineers', '30+ Years Experience',
  'Utility-Scale Renewables', 'Power System Studies', 'Substation Design',
  'POI Interconnection', 'BESS Engineering', 'Grid Reliability', 'Compliance-First Approach',
]

const slides = [
  {
    label: 'Engineering certainty',
    title: <>We Don&apos;t Just Design Systems.<br /><span className="gradient-text">We Engineer Certainty.</span></>,
    description: 'EHV, HV, and MV electrical engineering—from POI interconnection and utility-scale solar, wind, and BESS to NERC-compliant infrastructure delivered across all 50 states.',
    primary: { label: 'Schedule a 15-Minute Call', href: 'https://calendly.com/keentel-engineering/15min', external: true },
    secondary: { label: 'Our Capabilities', href: '/services' },
  },
  {
    label: 'Data center interconnection',
    title: <>Interconnecting the Grid&apos;s<br /><span className="gradient-text">Largest New Loads</span></>,
    description: "Supporting a 1 GW hyperscale data center interconnection in ERCOT, with detailed EMT modeling under SPP's HILL framework and grid-performance analysis.",
    primary: { label: 'Explore POI Services', href: '/service/poi-interconnection-engineering-support' },
    secondary: { label: 'View Project Highlights', href: '/clients-and-projects' },
  },
  {
    label: 'NERC compliance',
    title: <>Audit-Ready.</>,
    description: 'Compliance support led by a former NERC Regional Entity Audit Team Lead, with hands-on expertise across MOD, PRC, FAC-008, and Operations & Planning standards.',
    primary: { label: 'Explore NERC Services', href: '/service/nerc-compliance' },
    secondary: { label: 'Talk to a Compliance Engineer', href: 'https://calendly.com/keentel-engineering/15min', external: true },
  },
] as const

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocusWithin, setIsFocusWithin] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)
  const isPaused = isHovered || isFocusWithin

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(media.matches)
    updatePreference()
    media.addEventListener('change', updatePreference)
    return () => media.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return

    const timer = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % slides.length)
    }, 2000)

    return () => window.clearInterval(timer)
  }, [isPaused, prefersReducedMotion])

  const handleDotKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % slides.length
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + slides.length) % slides.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = slides.length - 1
    if (nextIndex === undefined) return

    event.preventDefault()
    setActiveSlide(nextIndex)
    document.getElementById(`hero-slide-control-${nextIndex}`)?.focus()
  }

  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#06103C]"
      aria-roledescription="carousel"
      aria-label="Featured Keentel Engineering services"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocusWithin(false)
      }}
    >
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline preload="auto" className="h-full w-full object-cover object-center">
          <source src="/videos/home.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#06103C]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06103C]/75 via-[#06103C]/35 to-[#5B2A86]/20" />
        <div className="absolute bottom-0 left-0 h-1/2 w-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,34,138,0.2)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-1 items-center pb-8 pt-32 sm:pt-36 lg:pt-44">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 sm:mb-6 sm:px-4">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-green-400 motion-safe:animate-pulse" />
              <span className="font-jost text-xs font-medium text-white/75 sm:text-sm">U.S. Licensed Electrical Power Engineers</span>
            </div>

            <div className="relative h-[29.25rem] sm:h-[23rem] lg:h-[27.75rem]">
              {slides.map((item, index) => (
                <div
                  key={item.label}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${slides.length}: ${item.label}`}
                  aria-hidden={activeSlide !== index}
                  inert={activeSlide !== index}
                  className={`absolute inset-0 grid will-change-[opacity,transform] transition-[opacity,transform] duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${activeSlide === index ? 'z-10 translate-x-0 scale-100 opacity-100' : `pointer-events-none scale-[0.985] opacity-0 ${index < activeSlide ? '-translate-x-4' : 'translate-x-4'}`}`}
                >
                  <div className="mb-5 flex min-h-[9.75rem] items-end min-[390px]:min-h-[8.5rem] sm:mb-6 sm:min-h-[9.5rem] lg:min-h-[13.125rem]">
                    <h1 className="max-w-4xl font-urbanist text-[2.15rem] font-black leading-[1.05] text-white min-[390px]:text-[2.35rem] sm:text-5xl lg:text-6xl xl:text-[4.35rem]">
                      {item.title}
                    </h1>
                  </div>

                  <p className="mb-7 min-h-[9rem] max-w-3xl font-jost text-base font-light leading-relaxed text-white/85 min-[390px]:min-h-[7.5rem] sm:mb-9 sm:min-h-[6rem] sm:text-xl lg:min-h-[7.25rem] lg:text-2xl">
                    {item.description}
                  </p>

                  <div className="flex min-h-[7.5rem] flex-col gap-3 sm:min-h-14 sm:flex-row sm:flex-wrap sm:gap-4">
                    <a
                      href={item.primary.href}
                      target={'external' in item.primary ? '_blank' : undefined}
                      rel={'external' in item.primary ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#C72E9E] to-[#5B2A86] px-6 py-3.5 text-center font-jost text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-7 sm:py-4 sm:text-base"
                    >
                      {item.primary.label}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <a
                      href={item.secondary.href}
                      target={'external' in item.secondary ? '_blank' : undefined}
                      rel={'external' in item.secondary ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/30 bg-white/[0.04] px-6 py-3.5 text-center font-jost text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-7 sm:py-4 sm:text-base"
                    >
                      {item.secondary.label}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8 mt-5 inline-flex min-h-5 items-center gap-2.5 rounded-full border border-white/15 bg-[#06103C]/30 px-3 py-2 shadow-[0_8px_24px_rgba(6,16,60,0.22)] backdrop-blur-sm sm:mt-6" role="group" aria-label="Choose a hero slide">
              {slides.map((item, index) => (
                <button
                  key={item.label}
                  id={`hero-slide-control-${index}`}
                  type="button"
                  aria-label={`Show slide ${index + 1}: ${item.label}`}
                  aria-current={activeSlide === index ? 'true' : undefined}
                  onClick={() => setActiveSlide(index)}
                  onKeyDown={(event) => handleDotKeyDown(event, index)}
                  className={`block h-2.5 flex-none appearance-none rounded-full border transition-[width,background-color,border-color,box-shadow,opacity] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${activeSlide === index ? 'w-12 border-[#EF73D0] bg-gradient-to-r from-[#E144B5] to-[#A8228A] shadow-[0_0_0_1px_rgba(225,68,181,0.18),0_0_16px_rgba(199,46,158,0.48)]' : 'w-8 border-white/30 bg-white/30 opacity-80 hover:border-white/60 hover:bg-white/55 hover:opacity-100'}`}
                >
                  <span className="sr-only">{item.label}</span>
                </button>
              ))}
              <span className="sr-only">{isPaused || prefersReducedMotion ? 'Automatic rotation paused' : 'Automatic rotation active'}</span>
            </div>

            <div>
              <p className="mb-3 font-jost text-xs uppercase tracking-widest text-white/50 sm:mb-4">Trusted and Certified</p>
              <Image
                src="/images/home/certifications.png"
                alt="BBB Accredited, IEEE Member, NERC Certified, Florida Licensed"
                width={670}
                height={147}
                className="h-auto max-h-20 w-auto max-w-full object-contain opacity-90 brightness-0 invert sm:max-h-24"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden bg-gradient-to-r from-[#0B1A5B] to-[#5B2A86] py-3.5">
        <div className="flex w-max whitespace-nowrap motion-safe:animate-marquee-left">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="mx-6 inline-flex items-center gap-3 font-jost text-xs font-medium text-white/80 sm:mx-8 sm:text-sm">
              <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#C72E9E]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
