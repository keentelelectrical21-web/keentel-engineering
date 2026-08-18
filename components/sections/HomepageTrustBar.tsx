const trustItems = [
  'IEEE-Aligned Engineering',
  'NERC Compliance Support',
  'IEC 61850 & SCADA',
  'ETAP · PSCAD · PSS®E',
  'Utility-Grade Studies',
  'Protection & Control',
  'Grid Integration',
]

export default function HomepageTrustBar() {
  return (
    <section aria-label="Credentials and registrations" className="group relative flex h-14 items-center overflow-hidden border-y border-white/10 bg-gradient-to-r from-[#0B1A5B] to-[#5B2A86] motion-reduce:overflow-x-auto sm:h-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#0B1A5B] to-transparent sm:w-16" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#5B2A86] to-transparent sm:w-16" aria-hidden="true" />
      <div
        className="trust-credentials-marquee flex w-max items-center whitespace-nowrap"
        style={{ animation: 'marquee-left 42s linear infinite' }}
      >
        {[...trustItems, ...trustItems].map((item, index) => (
          <div key={`${item}-${index}`} className="mx-1.5 flex min-w-max items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 shadow-[0_4px_14px_rgba(6,16,60,0.14)] sm:mx-2 sm:px-4 sm:py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E44BB8] shadow-[0_0_8px_rgba(228,75,184,0.75)] sm:h-2 sm:w-2" aria-hidden="true" />
            <span className="font-jost text-[0.68rem] font-semibold text-white/90 sm:text-xs">{item}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
