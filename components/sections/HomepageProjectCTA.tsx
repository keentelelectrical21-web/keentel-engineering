import Link from 'next/link'

export default function HomepageProjectCTA() {
  return (
    <section className="relative overflow-hidden bg-[#06103C] py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(199,46,158,0.22),transparent_32%),radial-gradient(circle_at_88%_30%,rgba(91,42,134,0.28),transparent_36%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.18em] text-[#E44BB8]">Start a Conversation</p>
        <h2 className="font-urbanist text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">Let&apos;s Talk About Your Project</h2>
        <p className="mx-auto mt-5 max-w-3xl font-jost text-base leading-relaxed text-white/70 sm:text-lg">Whether you&apos;re interconnecting a data center, designing a substation, or preparing for a NERC audit, a 15-minute conversation is the fastest way to find out how we can help.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#8D237F] px-7 py-4 font-jost font-semibold text-white shadow-[0_12px_30px_rgba(168,34,138,0.32)] transition hover:-translate-y-0.5 sm:w-auto">Book a 15-Minute Call <span className="ml-2" aria-hidden="true">→</span></Link>
          <Link href="mailto:contact@keentelengineering.com" className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 font-jost font-semibold text-white transition hover:bg-white/10 sm:w-auto">contact@keentelengineering.com</Link>
          <Link href="tel:+18133897871" className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 font-jost font-semibold text-white transition hover:bg-white/10 sm:w-auto">(813) 389-7871</Link>
        </div>
      </div>
    </section>
  )
}
