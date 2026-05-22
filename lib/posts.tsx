import React from 'react'

export type Post = {
  slug: string
  title: string
  date: string // "YYYY-MM-DD"
}

export const posts: Post[] = [
  { slug: 'first-post', title: 'A placeholder title', date: '2026-03-21' },
]

export const postContent: Record<string, React.ReactNode> = {
  'first-post': (
    <>
      <p>Write your post here.</p>
    </>
  ),
}
