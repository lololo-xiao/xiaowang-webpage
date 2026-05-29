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
    slug: 'tell-me-the-time',
    title: 'Tell me the time: A Minimal Agent Loop',
    subtitle: 'agent learning 01',
    label: 'agent learning',
    date: '2026-05-29',
  },
]

// table-of-contents entries — keep ids in sync with the h2 ids below
export const postHeadings: Record<string, Heading[]> = {
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

export const postContent: Record<string, React.ReactNode> = {
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
