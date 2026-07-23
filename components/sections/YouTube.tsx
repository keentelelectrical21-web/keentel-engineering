'use client'

import { useRef } from 'react'

const videos = [
  { id: '5qG16nbMmEk', ep: '01', title: 'Utility Interconnection for Large Loads', sub: 'Grid stability, load modeling and ride-through' },
  { id: '8GAWzqbEITQ', ep: '02', title: 'How AI Data Centers Are Reshaping U.S. Electricity', sub: 'NERC 2025 explained' },
  { id: 'C9tZQM-x_Ho', ep: '03', title: 'PJM Interconnection Explained', sub: 'How data centers connect to the grid' },
  { id: 'AgfRaZtdbh8', ep: '04', title: 'ERCOT Explained', sub: 'How the Texas power grid actually works' },
  { id: '6setSIIPoFA', ep: '05', title: 'PSCAD Modeling Explained', sub: 'EMT simulations for modern power systems' },
  { id: 'C_1JbvhLQ2g', ep: '06', title: 'Large Load Interconnection', sub: 'Guidance for utilities, developers and regulators' },
  { id: 'Ghb2UP1BWbk', ep: '07', title: 'RMS vs EMT', sub: 'How to choose the right simulation tool' },
  { id: 'E2wC7f9s7Bk', ep: '08', title: 'Large Loads Reshaping the U.S. Grid', sub: 'Xcel, FPL, Duke' },
]

export default function YouTube() {
  const topScrollRef = useRef<HTMLDivElement>(null)
  const bottomScrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const distance = dir === 'left' ? -360 : 360
    topScrollRef.current?.scrollBy({ left: distance, behavior: 'smooth' })
    bottomScrollRef.current?.scrollBy({ left: distance, behavior: 'smooth' })
  }

  const rows = [videos.slice(0, 4), videos.slice(4, 8)]

  return (
    <section className="overflow-hidden py-16 sm:py-20 lg:py-24" style={{ background: '#06103C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#C72E9E' }}>Insights · From our YouTube channel</p>
            <h2 className="font-urbanist font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Power systems,<br />plainly explained.
            </h2>
            <p className="mt-3 text-base font-jost max-w-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Field-tested engineering: NERC, PJM, ERCOT, IBR modeling, data-center interconnection — straight to our channel.
            </p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:flex-shrink-0">
            <button onClick={() => scroll('left')} aria-label="Previous" className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:bg-white/10" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '20px' }}>
              ‹
            </button>
            <button onClick={() => scroll('right')} aria-label="Next" className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:bg-white/10" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '20px' }}>
              ›
            </button>
            <a
              href="https://www.youtube.com/@KeentelEngineering"
              target="_blank"
              rel="noreferrer"
              className="w-full rounded-full px-5 py-3 text-center text-sm font-bold text-white transition-all hover:-translate-y-0.5 min-[420px]:ml-2 min-[420px]:w-auto"
              style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>

      </div>

      {/* Two independently scrollable rows: four videos per row on desktop. */}
      <div className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            ref={rowIndex === 0 ? topScrollRef : bottomScrollRef}
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            aria-label={`${rowIndex === 0 ? 'First' : 'Second'} row of YouTube videos`}
          >
            {row.map((v) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noreferrer"
                className="group w-[84vw] max-w-[340px] flex-none snap-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] text-white transition-all hover:-translate-y-1 hover:shadow-2xl sm:w-[calc((100%_-_1rem)/2)] sm:max-w-none lg:w-[calc((100%_-_3rem)/4)]"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/50" />
                  <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#C72E9E] to-[#A8228A] shadow-lg transition-transform group-hover:scale-110 sm:h-14 sm:w-14">
                    <div className="ml-1 h-0 w-0 border-b-[9px] border-l-[14px] border-t-[9px] border-b-transparent border-l-white border-t-transparent sm:border-b-[10px] sm:border-l-[16px] sm:border-t-[10px]" />
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 rounded bg-black/70 px-2 py-0.5 text-xs font-bold text-white">
                    EP {v.ep}
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="mb-1 font-urbanist text-base font-bold leading-snug">{v.title}</h3>
                  <p className="font-jost text-sm text-white/55">{v.sub}</p>
                </div>
              </a>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
