import Container from "@/components/Container"
import Link from "next/link"

export default function Page() {
  return (
    <Container>
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Xiao Wang's Web Page</h1>
        <p className="text-zinc-700 leading-7 max-w-prose">
          Master’s student in Computational Linguistics @Saarland University. Building AI products and writing about LLM evals, product thinking, and shipping fast.
        </p>
        <div className="flex gap-3">
          <Link href="/projects" className="rounded-md bg-black text-white px-4 py-2 text-sm">See projects</Link>
          <Link href="/writing" className="rounded-md border px-4 py-2 text-sm">Read writing</Link>
        </div>
      </section>
      <section className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-5">
          <h2 className="font-semibold mb-2">Now</h2>
          <p className="text-sm text-zinc-700">Finishing my master thesis; running a City Fit Sprint (Berlin, London, Amsterdam, Singapore) and shipping weekly LLM Eval Diaries.</p>
        </div>
        <div className="rounded-2xl border p-5">
          <h2 className="font-semibold mb-2">Around the web</h2>
          <ul className="text-sm space-y-1">
            <li><a className="underline" href="https://github.com/lololo-xiao" target="_blank">GitHub</a></li>
            <li><a className="underline" href="https://x.com/XiaoWang_0102" target="_blank">X (Twitter)</a></li>
            <li><a className="underline" href="https://www.linkedin.com/in/xiao-wang-5a5b20239/" target="_blank">LinkedIn</a></li>
          </ul>
        </div>
      </section>
    </Container>
  )
}
