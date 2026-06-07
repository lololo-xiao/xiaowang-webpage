import React from 'react'
import CodeBlock from '@/app/components/CodeBlock'

export type Post = {
  slug: string
  title: string
  subtitle?: string
  label?: string
  date: string // "YYYY-MM-DD"
}

export type Heading = {
  id: string
  text: string
}

export const posts: Post[] = [
  {
    slug: 'do-u-need-agentic-systems',
    title: 'Do U Need Agentic Systems?',
    subtitle: 'agent learning 02',
    label: 'agent learning',
    date: '2026-06-07',
  },
  {
    slug: 'tell-me-the-time',
    title: 'Tell me the time: A Minimal Agent Loop',
    subtitle: 'agent learning 01',
    label: 'agent learning',
    date: '2026-05-29',
  },
]

// table-of-contents entries — keep ids in sync with the h2 ids below
export const postHeadings: Record<string, Heading[]> = {
  'do-u-need-agentic-systems': [
    { id: 'preface', text: '0. Preface' },
    { id: 'agentic-system', text: '1. Agentic System' },
    { id: 'design-patterns', text: '2. Design Patterns' },
    { id: 'some-thoughts', text: '3. Some Thoughts' },
    { id: 'disclaimer', text: 'Disclaimer' },
    { id: 'references', text: 'References' },
  ],
  'tell-me-the-time': [
    { id: 'preface', text: '0. Preface' },
    { id: 'llms-dont-know-time', text: "1. LLMs don't know the time" },
    { id: 'time-teller', text: '2. Time Teller: Agent Version' },
    { id: 'engineer-improvements', text: '3. Engineer Improvements' },
    { id: 'appendix', text: 'Appendix' },
    { id: 'disclaimer', text: 'Disclaimer' },
    { id: 'references', text: 'References' },
  ],
}

const code = `import time

TOOLS = {"get_time": get_time}
prompts = r"""What's the time in China?"""
contents = [
    types.Content(
        role="user", parts=[types.Part(text=prompts)]
    )
]

step = 0
max_steps = 5
timeout = 10  # seconds
start_time = time.time()


while step < max_steps:
    # handle timeout
    if time.time() - start_time > timeout:
        print("Timeout reached, Stop!")
        break

    # Parse and excute the tool call
    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=config,
    )
    tool_call_part = response.candidates[0].content.parts[0]
    contents.append(response.candidates[0].content)

    if tool_call_part.function_call:
        tc = tool_call_part.function_call
        print(f"[DEBUG] calling {tc.name} with args {tc.args}")   # model return based on tool declarations
        try:
            result = TOOLS[tc.name](**tc.args)
            print(f"[DEBUG] tool result: {result}")               # what does the tool return
        except Exception as e:
            print(f"[DEBUG] tool FAILED: {type(e).__name__}: {e}") # failed
            result = f"Error executing {tc.name}: {e}"


        contents.append(types.Content(
                role="user",
                parts=[types.Part.from_function_response(name=tc.name, response={"result": result})],
            ))
        step += 1
        continue
    else:
        print(f"Clock Agent output: {response.text}")
        break

if step >= max_steps:
    print("MAX steps reached.")`

// shared styles to keep the minimal e-ink feel
const h2 = 'scroll-mt-24 text-xl font-bold tracking-wide pt-8 pb-1 text-black border-b border-black/10'
const h3 = 'text-base font-bold tracking-wide pt-5 pb-1 text-black'
const ic = 'text-[0.85em] bg-black/5 px-1 py-0.5 rounded'

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full rounded-sm border border-black/10" />
      <figcaption className="mt-2 text-center text-xs tracking-wide opacity-40">{caption}</figcaption>
    </figure>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-6 border-l-2 border-black/30 bg-black/5 px-4 py-3 text-sm italic tracking-wide">
      {children}
    </blockquote>
  )
}

export const postContent: Record<string, React.ReactNode> = {
  'do-u-need-agentic-systems': (
    <>
      <Callout>
        &ldquo;Entities should not be multiplied beyond necessity.&rdquo; — Occam&apos;s Razor
      </Callout>

      <h2 id="preface" className={h2}>0. Preface</h2>
      <p>
        My second blog, yeahhh! And this one is about my learning in the{' '}
        <a className="border-b border-black/30" href="https://github.com/datawhalechina/Agent-Learning-Hub" target="_blank" rel="noopener noreferrer">
          Agent-Learning-Hub
        </a>{' '}
        stage 0. After reading the two listed resources ({' '}
        <a className="border-b border-black/30" href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener noreferrer">
          Anthropic: Building effective agents
        </a>
        ,{' '}
        <a className="border-b border-black/30" href="https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/" target="_blank" rel="noopener noreferrer">
          OpenAI: A practical guide to building agents
        </a>
        ), the most important lesson I learned is the principle of designing agentic systems: start from the
        simplest solution. The tradeoff for agentic systems is all about latency + cost vs. performance. I will
        showcase how to design agentic systems from a high level, the common design patterns, and some
        reflection about my work during the internship at Meituan.
      </p>

      <h2 id="agentic-system" className={h2}>1. Agentic System</h2>
      <h3 className={h3}>Definition</h3>
      <p>
        Before asking whether we should build agentic systems, we should first have a clear understanding of
        what they are. So, what are they?
      </p>
      <p>
        There are 2 types of agentic systems: workflows and agents (referencing the definition in Claude&apos;s
        blog). Both of them have a necessity for using LLMs, but this condition alone is not sufficient for an
        agentic system. Usually, they use the augmented LLM as the building block. The building block is
        equipped with tools, memory, and retrieval modules, which enable the LLM to output more accurate
        answers. For workflows, they are built with the blocks but with some predefined logic. Agents are more
        flexible — they can finish their task autonomously by decomposing it into clear sub-tasks and executing
        them with the tools and necessary human feedback.
      </p>
      <h3 className={h3}>When</h3>
      <p>
        The augmented LLM is the building block of the system. The strength of the augmented LLM compared to
        conventional software is about understanding and analyzing large, unstructured data, and doing complex
        reasoning. When your system can function well and doesn&apos;t need any of these features, you may want
        to think twice before migrating just to chase the trends in tech.
      </p>
      <p>
        If you do find that your product can benefit from those functions, that&apos;s great. But we should
        start small — not even with the agentic system, but first with a single augmented LLM. Sometimes RAG or
        prompt engineering techniques will meet your goal. If it doesn&apos;t work, then we should think about
        designing the agentic system. And I would summarize all the common patterns mentioned in the 2 blogs.
      </p>

      <h2 id="design-patterns" className={h2}>2. Design Patterns</h2>
      <h3 className={h3}>Workflows</h3>
      <p>
        All these patterns are not strictly defined like math equations, but you can use them as a guide map,
        and the details should be implemented accordingly. I categorize them into 2 basic types: prompt
        chaining and cooperation.
      </p>
      <p>
        Prompt chaining is the naive one when we talk about workflows. In the workflow, each node is an LLM
        call, and one call follows another one&apos;s result. That&apos;s really simple. And that&apos;s the
        starting point for us to design the happy path.
      </p>
      <Figure
        src="/blog/do-u-need-agentic-systems/01-prompt-chaining.png"
        alt="Prompt chaining workflow: each LLM call feeds the next"
        caption="Prompt chaining — each LLM call feeds the next"
      />
      <p>
        Cooperation includes many variations (I may oversimplify here): routing, parallelization,
        orchestrator-workers, and evaluator-optimizer… They are more sophisticated than prompt chaining. There
        is more than 1 way of chaining, and some calls may even chain their states back.
      </p>
      <p>
        Routing suits tasks that can be classified into different categories, where each category can be handled
        with our building block: the augmented LLM.
      </p>
      <Figure
        src="/blog/do-u-need-agentic-systems/02-routing.png"
        alt="Routing workflow: a router directs input to a specialized handler"
        caption="Routing — classify the input, then dispatch to a specialized handler"
      />
      <p>
        There are 2 typical scenarios suited for parallelization. One case is that you can decompose the task
        into several independent subtasks. The other case is that your task can benefit from running multiple
        LLM calls, which increases the sample space for the output.
      </p>
      <Figure
        src="/blog/do-u-need-agentic-systems/03-parallelization.png"
        alt="Parallelization workflow: independent LLM calls run in parallel and are aggregated"
        caption="Parallelization — run independent calls in parallel, then aggregate"
      />
      <p>
        Orchestrator-workers is similar to parallelization, except your subtasks are not predefined but decided
        by the orchestrator, and you should synthesize the output of all the LLM calls to get the answer you
        need.
      </p>
      <Figure
        src="/blog/do-u-need-agentic-systems/04-orchestrator-workers.png"
        alt="Orchestrator-workers workflow: an orchestrator delegates dynamic subtasks to workers"
        caption="Orchestrator-workers — the orchestrator delegates dynamic subtasks, then synthesizes"
      />
      <p>
        The last one I introduce here is evaluator-optimizer, which uses an LLM call as a judge and provides
        feedback for the generator block to generate more accurate answers.
      </p>
      <Figure
        src="/blog/do-u-need-agentic-systems/05-evaluator-optimizer.png"
        alt="Evaluator-optimizer workflow: a generator and an evaluator loop until the answer is good"
        caption="Evaluator-optimizer — generate, judge, and refine in a loop"
      />
      <h3 className={h3}>Agents</h3>
      <p>
        Agents have more freedom compared to workflows. The essence of an agent is a <strong>while-loop</strong>.
        The exit condition for the while-loop can be successfully completing the task, an error occurring, or
        reaching the maximum number of loops the agent allows. In this loop, the agent (or LLM call) gathers
        the right context using the tools or functions we provide for the system, and based on the task defined,
        approaches it step by step.
      </p>

      <h2 id="some-thoughts" className={h2}>3. Some Thoughts</h2>
      <p>
        When I did my internship at Meituan, my task was about dealing with the bad cases that product teams
        gathered from users&apos; real conversations. My internship was around the second half of 2024 (at that
        time, agents were not quite popular yet). Our product was deployed on smart watches for children, and
        we designed different characters in the app, backed by LLMs, as the chatbot. In this context, safety and
        correctness are important. We don&apos;t want to teach knowledge that the LLM hallucinates, and we
        don&apos;t want the LLM to give harmful instructions or discuss adult topics.
      </p>
      <p>
        This was my first internship — not soo good. I only focused on the things that my tutor asked me to do,
        and rarely had my own thoughts on the products or solutions. After reading these 2 blogs, I think I
        would approach this in a better way, or at least try to discuss some of these methods first.
      </p>
      <p>
        What I had done at that time was reading and replicating the methods about online-DPO in the{' '}
        <a className="border-b border-black/30" href="https://arxiv.org/pdf/2405.07863" target="_blank" rel="noopener noreferrer">
          paper
        </a>
        . I spent a huge amount of time learning to set up and build all the benchmarks just to replicate the
        paper&apos;s results. (I think that was a bit out of focus.) In the 2nd month, I finally started to go
        into the real product and questions. Still, I focused on implementing the methods, not on the real
        things.
      </p>
      <p>
        What made me start to reflect on this experience is the guardrails and philosophy mentioned in the
        blogs. With some benchmarks set up, I think I would start with prompt engineering. If it doesn&apos;t
        work, I would try to implement some guardrails, like calling some LLMs or training small models to
        classify harmful content. The point is all about how to use the right tools to resolve real problems,
        not just focusing on implementing some fancy techniques.
      </p>

      <h2 id="disclaimer" className={h2}>Disclaimer</h2>
      <p>
        The post is 100% written by myself. AI may just help me polish some sentences or correct grammar. All
        references are cited here. The workflow diagrams are from Anthropic&apos;s &ldquo;Building effective
        agents&rdquo; (reference 1).
      </p>

      <h2 id="references" className={h2}>References</h2>
      <ol className="list-decimal pl-5 space-y-2">
        <li>
          <a className="border-b border-black/30" href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener noreferrer">
            Anthropic — Building Effective Agents
          </a>
        </li>
        <li>
          <a className="border-b border-black/30" href="https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/" target="_blank" rel="noopener noreferrer">
            OpenAI — A Practical Guide to Building Agents
          </a>
        </li>
        <li>
          <a className="border-b border-black/30" href="https://github.com/datawhalechina/Agent-Learning-Hub" target="_blank" rel="noopener noreferrer">
            Agent-Learning-Hub — datawhalechina (GitHub)
          </a>
        </li>
        <li>
          <a className="border-b border-black/30" href="https://arxiv.org/abs/2405.07863" target="_blank" rel="noopener noreferrer">
            RLHF Workflow: From Reward Modeling to Online RLHF (arXiv:2405.07863)
          </a>
        </li>
      </ol>
    </>
  ),
  'tell-me-the-time': (
    <>
      <h2 id="preface" className={h2}>0. Preface (Nothing technical, feel free to jump)</h2>
      <p>
        Finally, I graduated as a master student in Germany 😮‍💨. While working on my thesis, I was always
        fascinated by the rapid changes in AI, especially agents (almost every day, or every few days, Claude
        and Claude Code release a new version). Since there is no more mandatory deadline in front of me,
        mindless scrolling and playing video games just can&apos;t fill my empty, shallow spirit. More
        importantly, there is no excuse not to learn and apply for jobs.
      </p>
      <p>
        Last week, I came across a{' '}
        <a className="border-b border-black/30" href="https://rapid-agent.devpost.com/" target="_blank" rel="noopener noreferrer">
          Hackathon
        </a>{' '}
        on Devpost held by Google Cloud. In this event, the goal is to build an agent system. The requirements
        are easy: use Google Cloud Agent Builder and choose one of their partners&apos; MCP in the project.
      </p>
      <p>
        Enough bullshit.{' '}
        <a className="border-b border-black/30" href="https://github.com/datawhalechina/Agent-Learning-Hub" target="_blank" rel="noopener noreferrer">
          Agent-Learning-Hub
        </a>{' '}
        is a perfect GitHub repo I found that has everything you need to learn about agents. This post is about
        my first learning outcome in building a minimal agent loop.
      </p>

      <h2 id="llms-dont-know-time" className={h2}>1. LLMs don&apos;t know the time</h2>
      <Figure
        src="/blog/tell-me-the-time/01-llm-wrong-time.png"
        alt="An LLM API confidently returning a wrong, outdated time"
        caption="An LLM API confidently returns a wrong, outdated time"
      />
      <p>
        If you ask the time now in Germany using any LLM API (not the chatbot), they would confidently tell you
        a wrong old date. Essentially, LLMs are just really smart talking machines trained with web-scale
        knowledge, which gives them almost all human knowledge, but they can&apos;t do anything except predict
        the next possible token. So, how about we train the model with this new knowledge? Come on, you&apos;re
        never gonna do it because time is changing every second!
      </p>
      <p>
        Luckily, during post-training phase LLMs learn to follow human instructions and give structured
        outputs. This gives us the opportunity to let LLMs use tools or functions. More specifically, we can
        ask LLMs to give structured outputs like JSON, which makes it easy for us to extract the data inside.
        And if those data become the parameters of a certain function or service, we can just run the program
        and get its return value. And if we add these returned values to the context of the LLMs, now LLMs
        would have more confidence to give you a better answer. That&apos;s the basic idea of an agent loop.
      </p>

      <h2 id="time-teller" className={h2}>2. Time Teller: Agent Version</h2>
      <p>
        Since I am currently participating the Google hackathon, I used Google GenAI SDK here. Claude, OpenAI,
        or other providers have similar functions. Please refer to the docs of whichever provider you want to
        build with.
      </p>
      <p>
        To enable LLMs to give us the exact time, we need to know where you are. And to enable LLMs to use the
        tools, we need to tell them what tools they have and what parameters the tools need. Once LLMs have
        these info, they can decide whether to call certain tools and how.
      </p>
      <Figure
        src="/blog/tell-me-the-time/02-function-declaration.png"
        alt="Defining the get_time tool with its function declaration"
        caption="Defining the get_time tool with its function declaration"
      />
      <p>
        Here we provide the tool <code className={ic}>get_time</code> and its <strong>function declarations</strong>{' '}
        which includes the description and expected parameters for using the tool. Once we asked about the time
        in terms of a place, it would know that it should call the <code className={ic}>get_time</code> function
        and give the timezone as the parameter. For example, when we ask about{' '}
        <code className={ic}>What&apos;s the time in Germany?</code> With <strong>function declaration</strong> we
        defined here, the model would know it should use the tool, and give the structured outputs. In some
        parts of its response, it would include like{' '}
        <code className={ic}>args=&#123;&apos;timezone&apos;: &apos;Europe/Berlin&apos;&#125; name=&apos;get_time&apos;</code>.
        And that&apos;s the signal for us to call the real function.
      </p>
      <Figure
        src="/blog/tell-me-the-time/03-function-call.png"
        alt="The model's function call output, used to call the real function"
        caption="The model's function call output → calling the real function"
      />
      <p>
        By passing the timezone to the <code className={ic}>get_time</code> function, now it would return the
        real time of the place. After getting the value, we append the result into the contents. Since model
        knows the answer, we can see that it gives us the correct answer!
      </p>

      <h2 id="engineer-improvements" className={h2}>3. Engineer Improvements: max_steps and timeout</h2>
      <p>
        In real scenarios, agents would not only have 1 tool available. To deal with complex tasks, agents need
        to decompose the task into multiple steps and give us an answer. In order to prevent extreme cases like
        agents calling functions endlessly, we need to provide a safety net for the sake of our wallets. Here
        are some common designs in real agent systems: setting <code className={ic}>max_steps</code> and{' '}
        <code className={ic}>timeout</code>.
      </p>
      <CodeBlock code={code} lang="python" />

      <h2 id="appendix" className={h2}>Appendix</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <a
            className="border-b border-black/30"
            href="/blog/tell-me-the-time/tell-me-the-time.ipynb"
            target="_blank"
            rel="noopener noreferrer"
          >
            Notebook example (download here)
          </a>
        </li>
      </ul>

      <h2 id="disclaimer" className={h2}>Disclaimer</h2>
      <p>
        The post is 100% written by myself. AI may just help me polish some sentences or correct grammars. All
        references are cited here.
      </p>

      <h2 id="references" className={h2}>References</h2>
      <ol className="list-decimal pl-5 space-y-2">
        <li>
          <a className="border-b border-black/30" href="https://rapid-agent.devpost.com/" target="_blank" rel="noopener noreferrer">
            Google Cloud Rapid Agent Hackathon (Devpost)
          </a>
        </li>
        <li>
          <a className="border-b border-black/30" href="https://github.com/datawhalechina/Agent-Learning-Hub" target="_blank" rel="noopener noreferrer">
            Agent-Learning-Hub — datawhalechina (GitHub)
          </a>
        </li>
      </ol>
    </>
  ),
}
