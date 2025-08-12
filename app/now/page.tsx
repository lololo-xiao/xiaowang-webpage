import Container from "@/components/Container"

export default function NowPage() {
  return (
    <Container>
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Now</h1>
      <p className="text-zinc-700">What I’m focused on right now.</p>
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>Finishing my master thesis (defense in ~6 months).</li>
        <li>Job hunt for Applied LLM/AI Product Engineer roles.</li>
        <li>Shipping weekly: blog + small demos.</li>
      </ul>
    </Container>
  )
}
