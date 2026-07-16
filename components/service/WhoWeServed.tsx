const clients = [
  { src: '/images/clients/43-10240e91.png', alt: 'Keentel Engineering client' },
  { src: '/images/clients/44-18370d1d.png', alt: 'Keentel Engineering client' },
  { src: '/images/clients/45-dfb687e0.png', alt: 'Keentel Engineering client' },
  { src: '/images/clients/46-ff7bc11f.png', alt: 'Keentel Engineering client' },
  { src: '/images/clients/47-363a19ec.png', alt: 'Keentel Engineering client' },
  { src: '/images/clients/48-816ccd8f.png', alt: 'Keentel Engineering client' },
  { src: '/images/clients/49-752adf6f.png', alt: 'Keentel Engineering client' },
  { src: '/images/clients/rrc-companies.webp', alt: 'RRC Companies' },
  { src: '/images/clients/pae-engineers.webp', alt: 'PAE Engineers' },
  { src: '/images/clients/edf-power-solutions.webp', alt: 'EDF Power Solutions' },
  { src: '/images/clients/pike-engineering.webp', alt: 'Pike Engineering' },
  { src: '/images/clients/risk-work.webp', alt: 'Risk Work' },
  { src: '/images/clients/siemens-energy-1.webp', alt: 'Siemens Energy' },
  { src: '/images/clients/avangrid.webp', alt: 'Avangrid' },
  { src: '/images/clients/siemens-energy-2.webp', alt: 'Siemens Energy' },
  { src: '/images/clients/aypa-power.webp', alt: 'AYPA Power' },
  { src: '/images/clients/Brasswater.webp', alt: 'Brasswater' },
  { src: '/images/clients/Fisher Associates.webp', alt: 'Fisher Associates' },
  { src: '/images/clients/NLine Energy.webp', alt: 'NLine Energy' },
  { src: '/images/clients/OCTA Data Center.webp', alt: 'OCTA Data Center' },
  { src: '/images/clients/PAE-864f5ced.png', alt: 'PAE' },
  { src: '/images/clients/RRC-ae225119.png', alt: 'RRC Companies' },
  { src: '/images/clients/Tenova.webp', alt: 'Tenova' },
  { src: '/images/clients/XUTILITY.webp', alt: 'X Utility' },
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
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {clients.map(client => (
            <div key={client.src} className="group flex min-h-32 items-center justify-center rounded-2xl border border-[#E6E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#A8228A]/30 hover:shadow-lg sm:min-h-40 sm:p-7 lg:min-h-44 lg:p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={client.src} alt={client.alt} className="max-h-20 max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-24 lg:max-h-28" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
