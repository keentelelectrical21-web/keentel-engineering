'use client'

import { useRef, useState } from 'react'

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
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' })
  }

  return (
    <section className="py-24 overflow-hidden" style={{ background: '#06103C' }}>
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
          <div className="flex items-center gap-3 flex-shrink-0">
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
              className="ml-2 text-white font-bold text-sm px-5 py-3 rounded-full transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>

      </div>

      {/* Scrollable cards - full width */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 px-4 sm:px-8 lg:px-16"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((v) => (
          <a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 rounded-2xl overflow-hidden group transition-all hover:-translate-y-1 hover:shadow-2xl"
            style={{ width: '340px', scrollSnapAlign: 'start', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', color: '#fff' }}
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%', background: '#000' }}>
              <img
                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)' }} />
              {/* Play button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #C72E9E, #A8228A)' }}>
                <div style={{ width: 0, height: 0, borderLeft: '16px solid white', borderTop: '10px solid transparent', borderBottom: '10px solid transparent', marginLeft: '4px' }} />
              </div>
              {/* EP badge */}
              <div className="absolute bottom-2.5 right-2.5 text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.7)', color: '#fff' }}>
                EP {v.ep}
              </div>
            </div>
            {/* Info */}
            <div className="p-5">
              <h3 className="font-urbanist font-bold text-base leading-snug mb-1">{v.title}</h3>
              <p className="text-sm font-jost" style={{ color: 'rgba(255,255,255,0.55)' }}>{v.sub}</p>
            </div>
          </a>
        ))}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}