import Image from 'next/image'
import Link from 'next/link'

const clients = [
  {
    name: 'Pike Engineering',
    image: '/images/clients/pike-engineering.webp',
    description: 'Providing transmission and distribution engineering support across utility networks nationwide.',
  },
  {
    name: 'Risk Work',
    image: '/images/clients/risk-work.webp',
    description: 'Providing safety-focused engineering and compliance support for critical infrastructure projects.',
  },
  {
    name: 'Arizona Public Service',
    image: '/images/clients/46-ff7bc11f.png',
    description: 'Providing reliable electric service and modern grid infrastructure across Arizona.',
  },
  {
    name: 'RRC Companies',
    image: '/images/clients/rrc-companies.webp',
    description: 'Trusted electrical engineering partner for utility transmission and infrastructure projects.',
  },
  {
    name: 'PAE Engineers',
    image: '/images/clients/pae-engineers.webp',
    description: 'Delivering advanced power system solutions for complex energy and infrastructure projects.',
  },
  {
    name: 'EDF Power Solutions',
    image: '/images/clients/edf-power-solutions.webp',
    description: 'Supporting utility-scale renewable energy integration and grid interconnection services.',
  },
  {
    name: 'Avangrid',
    image: '/images/clients/avangrid.webp',
    description: 'Partnering on renewable energy and utility infrastructure engineering projects nationwide.',
  },
  {
    name: 'Siemens Energy',
    image: '/images/clients/siemens-energy-1.webp',
    description: 'Delivering advanced power engineering and grid modernization solutions across the U.S.',
  },
  {
    name: 'AYPA Power',
    image: '/images/clients/aypa-power.webp',
    description: <>Providing battery storage and <Link href="/service/utility-scale-renewable-energy" className="font-semibold text-[#A8228A] underline decoration-[#A8228A]/30 underline-offset-2 transition hover:decoration-[#A8228A]">renewable energy</Link> interconnection engineering support services.</>,
  },
  {
    name: 'Fisher Associates',
    image: '/images/clients/Fisher Associates.webp',
    description: 'Delivers power engineering and grid support for utility and renewable energy projects.',
  },
  {
    name: 'Brasswater',
    image: '/images/clients/Brasswater.webp',
    description: 'Provides integrated real estate development for industrial, office, retail, and data-center infrastructure projects across North America.',
  },
  {
    name: 'OCTA Data Center',
    image: '/images/clients/OCTA Data Center.webp',
    description: 'Provides powered land and infrastructure-ready sites for hyperscale, cloud, AI, and large-scale data-center projects.',
  },
  {
    name: 'Anthropic',
    wordmark: 'ANTHROPIC',
    description: 'Electrical infrastructure and power-system engineering support for data-center energy requirements.',
  },
  {
    name: 'NLine Energy',
    image: '/images/clients/NLine Energy.webp',
    description: 'Steam-to-power energy recovery solutions that convert excess steam pressure into electricity.',
  },
  {
    name: 'Tenova',
    image: '/images/clients/Tenova.webp',
    description: 'Delivers industrial engineering, electrification, and decarbonization solutions for advanced infrastructure projects.',
  },
  {
    name: 'XUTILITY',
    image: '/images/clients/XUTILITY.webp',
    description: 'Provides utility consulting, grid modernization, transmission planning, and electrical engineering solutions.',
  },
] as const

export default function WhoWeServed() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl sm:mb-12">
          <p className="mb-3 font-jost text-xs font-bold uppercase tracking-[0.2em] text-[#A8228A]">Trusted Nationwide</p>
          <h2 className="font-urbanist text-3xl font-black text-[#06103C] sm:text-4xl lg:text-5xl">Who We&apos;ve Served</h2>
          <p className="mt-4 font-jost text-sm leading-relaxed text-gray-600 sm:text-base">
            Serving utilities, EPCs, developers, and infrastructure organizations supporting critical power-system projects nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {clients.map(client => (
            <article
              key={client.name}
              className="group flex min-h-[300px] flex-col rounded-xl border border-[#AEB3BF] bg-white p-5 shadow-[0_1px_2px_rgba(6,16,60,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#A8228A]/60 hover:shadow-lg sm:p-6"
            >
              <div className="flex h-24 items-center justify-center sm:h-28">
                {'image' in client ? (
                  <Image
                    src={client.image}
                    alt={`${client.name} logo`}
                    width={220}
                    height={112}
                    className="max-h-24 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-28"
                  />
                ) : (
                  <div className="flex h-20 w-full max-w-[190px] items-center justify-center bg-[#D98B72] px-4 text-center font-urbanist text-lg font-black tracking-[0.12em] text-[#24140F]">
                    {client.wordmark}
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-[#E6E8F0] pt-5 text-center">
                <h3 className="font-urbanist text-base font-bold text-[#06103C] sm:text-lg">{client.name}</h3>
                <p className="mt-3 font-jost text-sm leading-6 text-gray-600">{client.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
