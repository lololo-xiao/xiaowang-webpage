"use client"

import { useEffect, useState } from 'react'
import type { Heading } from '@/lib/posts'

export default function PostToc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    const sections = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [headings])

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 max-w-[14rem]"
    >
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className="group flex items-center gap-3"
        >
          <span
            className={`block h-px transition-all duration-300 ${
              active === h.id ? 'w-6 bg-black' : 'w-3 bg-black/30 group-hover:bg-black/60'
            }`}
          />
          <span
            className={`text-[11px] tracking-wide leading-tight transition-opacity ${
              active === h.id ? 'opacity-90 font-medium' : 'opacity-40 group-hover:opacity-70'
            }`}
          >
            {h.text}
          </span>
        </a>
      ))}
    </nav>
  )
}
