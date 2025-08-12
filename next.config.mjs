import createMDX from '@next/mdx'
// import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow MDX pages in the app router
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true
  }
}

const withMDX = createMDX({
  // options: { remarkPlugins: [remarkGfm], rehypePlugins: [] }
})

export default withMDX(nextConfig)
