import { notFound } from 'next/navigation'
import Link from 'next/link'
import { posts, postContent } from '@/lib/posts'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const content = postContent[post.slug]

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <article className="max-w-md w-full">
        {/* back link */}
        <Link
          href="/#writing"
          className="nav-item text-xs tracking-[0.25em] uppercase opacity-40 hover:opacity-80 transition-opacity mb-16 inline-block"
        >
          ← writing
        </Link>

        {/* pen nib icon echo */}
        <svg className="mb-8 opacity-30" width="24" height="24" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 36 L12 16 L22 10 L32 16 Z" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 36 L22 22" stroke="#111" strokeWidth="1" strokeLinecap="round" />
          <path d="M15 19 L22 36 L29 19" stroke="#111" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="22" cy="10" r="2" fill="#111" />
        </svg>

        {/* title */}
        <h1 className="text-2xl tracking-wide mb-3">{post.title}</h1>

        {/* date */}
        <p className="text-xs tracking-[0.25em] opacity-40 mb-10">{post.date}</p>

        {/* divider */}
        <div className="w-full h-px bg-black/10 mb-10" />

        {/* body */}
        <div className="text-base leading-relaxed opacity-80 space-y-5">
          {content}
        </div>
      </article>
    </main>
  )
}
