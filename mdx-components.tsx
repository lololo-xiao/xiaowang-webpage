import type { MDXComponents } from 'mdx/types'

// Map/override elements used in MDX files (e.g., to style <a>, <h1>, etc.)
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-3xl md:text-4xl font-semibold tracking-tight" {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold mt-10 mb-4" {...props} />,
    p:  (props) => <p className="leading-7 text-zinc-700 dark:text-zinc-300 my-3" {...props} />,
    a:  (props) => <a className="underline underline-offset-2 hover:no-underline" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 space-y-2" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 space-y-2" {...props} />,
    li: (props) => <li className="leading-7" {...props} />,
    code: (props) => <code className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-900" {...props} />,
    pre: (props) => <pre className="p-4 rounded bg-zinc-900 text-zinc-100 overflow-auto" {...props} />,
    ...components,
  }
}
