// ============================================================
// FILE: components/blog/BlogImage.tsx  — NEW COMPONENT
// Reusable image component that tries multiple sources
// ============================================================
'use client'

import { useState } from 'react'

interface BlogImageProps {
  slug: string
  alt: string
  className?: string
  sanityUrl?: string
}

export default function BlogImage({ slug, alt, className, sanityUrl }: BlogImageProps) {
  const sources = [
    `/images/blog/${slug}-featured.jpg`,
    `/images/blog/${slug}-featured.png`,
    `/images/blog/${slug}-featured.webp`,
    `/images/blog/${slug}-featured.jpeg`,
    ...(sanityUrl ? [sanityUrl] : []),
  ]

  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  function handleError() {
    if (index + 1 < sources.length) {
      setIndex(i => i + 1)
    } else {
      setFailed(true)
    }
  }

  if (failed) {
    return (
      <div
        className={className}
        style={{ background: 'linear-gradient(135deg, #06103C 0%, #0B1A5B 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span style={{ color: 'rgba(255,255,255,0.08)', fontSize: '3rem', fontWeight: 900 }}>K</span>
      </div>
    )
  }

  return (
    <img
      src={sources[index]}
      alt={alt}
      className={className}
      onError={handleError}
    />
  )
}