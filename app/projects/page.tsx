import Container from "@/components/Container"

const projects = [
  // { title: "LLM Eval Diaries", href: "#", description: "Weekly hands-on writeups evaluating prompting, agents, and retrieval."},
  { title: "Prodrug→Drug MT", href: "#", description: "Research project: translating prodrug to drug forms with machine translation methods."},
  // { title: "Tiny AI PM PRDs", href: "#", description: "Two short PRDs and a demo proving product instincts."},
]

export default function ProjectsPage() {
  return (
    <Container>
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Projects</h1>
      <div className="grid gap-4">
        {projects.map(p => (
          <a key={p.title} href={p.href} className="block rounded-2xl border p-5 hover:bg-fog">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-zinc-700">{p.description}</div>
          </a>
        ))}
      </div>
    </Container>
  )
}
