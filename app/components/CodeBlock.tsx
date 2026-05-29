import { codeToHtml } from 'shiki'

// Async server component — highlights at build time, ships no client JS.
export default async function CodeBlock({
  code,
  lang = 'text',
}: {
  code: string
  lang?: string
}) {
  const html = await codeToHtml(code, {
    lang,
    theme: 'github-light',
  })

  return (
    <div
      className="my-2 text-xs leading-relaxed font-mono rounded-sm border border-black/10 [&_pre]:p-4 [&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:[-webkit-overflow-scrolling:touch] [&_pre]:!bg-transparent bg-black/[0.03]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
