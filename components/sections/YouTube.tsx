'use client'

import { useEffect, useState } from 'react'

const videos = [
  { id: 'iK9KC73rFRg', ep: 'NEW', title: 'The Keentel Engineering Series — Electrical Power Engineering', sub: 'Power-system engineering insights from Keentel Engineering' },
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
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[number] | null>(null)
  const rows = [videos.slice(0, 4), videos.slice(4)]

  useEffect(() => {
    if (!activeVideo) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveVideo(null)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeVideo])

  return (
    <section className="overflow-hidden py-16 sm:py-20 lg:py-24" style={{ background: '#06103C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-5 lg:mb-7">
          <div className="w-full">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#C72E9E' }}>Insights · From our YouTube channel</p>
            <h2 className="w-full font-urbanist text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              Power systems, plainly explained.
            </h2>
            <p className="mt-3 w-full font-jost text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Field-tested engineering: NERC, PJM, ERCOT, IBR modeling, data-center interconnection — straight to our channel.
            </p>
          </div>
          <div className="flex w-full flex-wrap items-center justify-end gap-3">
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
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            aria-label={`${rowIndex === 0 ? 'First' : 'Second'} row of YouTube videos`}
          >
            {row.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveVideo(v)}
                aria-label={`Play ${v.title}`}
                className="group w-[84vw] max-w-[340px] flex-none snap-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] text-left text-white transition-all hover:-translate-y-1 hover:border-[#C72E9E]/50 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F075D2] sm:w-[calc((100%_-_1rem)/2)] sm:max-w-none lg:w-[calc((100%_-_3rem)/4)]"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/50" />
                  <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-[#C72E9E] to-[#A8228A] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-105 sm:left-4 sm:top-4">
                    <div className="ml-0.5 h-0 w-0 border-b-[7px] border-l-[11px] border-t-[7px] border-b-transparent border-l-white border-t-transparent" />
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 rounded bg-black/70 px-2 py-0.5 text-xs font-bold text-white">
                    {v.ep === 'NEW' ? 'NEW' : `EP ${v.ep}`}
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="mb-1 font-urbanist text-base font-bold leading-snug">{v.title}</h3>
                  <p className="font-jost text-sm text-white/55">{v.sub}</p>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020718]/90 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="youtube-player-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveVideo(null)
          }}
        >
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#06103C] shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:rounded-3xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
              <h3 id="youtube-player-title" className="line-clamp-2 font-urbanist text-sm font-bold text-white sm:text-lg">
                {activeVideo.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-2xl leading-none text-white transition hover:border-[#F075D2]/60 hover:bg-white/[0.12]"
                aria-label="Close video player"
              >
                ×
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}
