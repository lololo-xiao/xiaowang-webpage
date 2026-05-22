'use client'
import { useEffect, useState } from 'react'

const sections = [
  { id: 'hero',     label: 'top' },
  { id: 'projects', label: 'projects' },
  { id: 'writing',  label: 'writing' },
  { id: 'contact',  label: 'contact' },
]

export default function SectionNav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          title={label}
          aria-label={`scroll to ${label}`}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
            active === id
              ? 'bg-[#111] scale-[1.6]'
              : 'bg-[#111]/25 hover:bg-[#111]/50'
          }`}
        />
      ))}
    </nav>
  )
}
