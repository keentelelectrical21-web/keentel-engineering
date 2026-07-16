const clients = [
  { src: '/images/clients/rrc-companies.webp', alt: 'RRC Companies' },
  { src: '/images/clients/pae-engineers.webp', alt: 'PAE Engineers' },
  { src: '/images/clients/edf-power-solutions.webp', alt: 'EDF Power Solutions' },
  { src: '/images/clients/pike-engineering.webp', alt: 'Pike Engineering' },
  { src: '/images/clients/risk-work.webp', alt: 'Risk Work' },
  { src: '/images/clients/siemens-energy-1.webp', alt: 'Siemens Energy' },
  { src: '/images/clients/avangrid.webp', alt: 'Avangrid' },
  { src: '/images/clients/siemens-energy-2.webp', alt: 'Siemens Energy' },
  { src: '/images/clients/aypa-power.webp', alt: 'AYPA Power' },
]

export default function WhoWeServed() {
  return (
    <section className="bg-[#F6F7FB] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 font-jost text-xs font-bold uppercase tracking-widest text-[#A8228A]">Trusted Nationwide</p>
          <h2 className="font-urbanist text-3xl font-black text-[#06103C] sm:text-4xl">Who We&apos;ve Served</h2>
          <p className="mx-auto mt-4 max-w-2xl font-jost text-sm leading-relaxed text-gray-600 sm:text-base">Engineering support for utilities, developers, EPC contractors, and critical-infrastructure owners across the United States.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {clients.map(client => (
            <div key={`${client.alt}-${client.src}`} className="flex min-h-24 items-center justify-center rounded-2xl border border-[#E6E8F0] bg-white p-4 sm:min-h-28 sm:p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={client.src} alt={client.alt} className="max-h-14 max-w-full object-contain sm:max-h-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
