import Link from 'next/link'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/now', label: 'Now' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b">
      <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">Xiao Wang</Link>
        <nav className="flex items-center gap-5 text-sm">
          {nav.map(({href, label}) => (
            <Link key={href} href={href} className="hover:opacity-70">{label}</Link>
          ))}
          <a href="/resume.pdf" className="rounded-full border px-3 py-1 text-xs hover:bg-black hover:text-white transition">Resume</a>
        </nav>
      </div>
    </header>
  )
}
