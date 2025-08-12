import Container from "@/components/Container"
import Link from "next/link"

const posts = [
  { slug: "hello-world", title: "Hello World", summary: "Why I’m building xiaowang.lol and what to expect.", date: "2025-08-13" },
  // { slug: "llm-eval-diary-001", title: "LLM Eval Diary #001", summary: "First notes on eval harness & naming conventions.", date: "2025-08-13" },
]

export default function WritingIndex() {
  return (
    <Container>
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Writing</h1>
      <div className="space-y-5">
        {posts.map(p => (
          <article key={p.slug} className="border rounded-2xl p-5">
            <h2 className="font-semibold"><Link href={`/writing/${p.slug}`} className="underline">{p.title}</Link></h2>
            <div className="text-xs text-zinc-500">{p.date}</div>
            <p className="text-sm text-zinc-700 mt-1">{p.summary}</p>
          </article>
        ))}
      </div>
    </Container>
  )
}
