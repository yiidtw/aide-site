export default function Post() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 max-w-3xl mx-auto">
        <a href="/" className="font-mono text-lg font-bold tracking-tight hover:text-emerald-400 transition">aide.sh</a>
        <div className="flex gap-6 text-sm text-zinc-400 font-mono">
          <a href="/blog" className="hover:text-white transition">Blog</a>
          <a href="https://github.com/yiidtw/aide" className="hover:text-white transition">GitHub</a>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pt-16 pb-20">
        <p className="text-xs text-zinc-600 font-mono mb-2">2026-03-22</p>
        <h1 className="text-3xl font-bold mb-8">occupation, cognition, vault: why your agent framework is a protocol, not a library.</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-zinc-300 leading-relaxed">

          <p className="text-lg text-zinc-400">
            I built a crate-publishing agent. The directory structure taught me more about agent architecture than any framework.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">The cratepublish agent</h2>

          <p>
            Last week I needed an agent to publish aide-sh to crates.io and archive it on Zenodo.
            Two skills, a persona, some API docs, a credential. Standard stuff. But when I sat down
            to organize the files, something clicked.
          </p>

          <p>
            The AI categorized everything into three tiers automatically:
          </p>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`cratepublish.yiidtw/
  occupation/                    # PUBLIC — the job
    Agentfile.toml
    persona.md
    skills/
      crate.ts                   # publish to crates.io
      zenodo.ts                  # archive on Zenodo
    knowledge/
      crates-io-api.md           # API docs
      zenodo-api.md

  cognition/                     # PRIVATE — the brain
    identity.toml                # yiidtw@gmail.com
    memory/                      # anonymous preference, past runs
    instance.toml

  vault                          # ENCRYPTED — secrets
    CRATES_IO_TOKEN              # age-encrypted, per-machine keys
    ZENODO_TOKEN`}
          </pre>

          <h2 className="text-xl font-bold text-white pt-4">Three tiers of information</h2>

          <p>
            <strong className="text-emerald-400">occupation/</strong> is public. Skills, knowledge, persona &mdash;
            anyone can pull this from the hub and run the same crate-publishing agent. It&apos;s the job description.
          </p>

          <p>
            <strong className="text-emerald-400">cognition/</strong> is private. My email, my preference for anonymous
            Zenodo deposits, what the agent learned from previous runs. This stays in my private repo. You can&apos;t
            transfer a brain.
          </p>

          <p>
            <strong className="text-emerald-400">vault</strong> is encrypted. CRATES_IO_TOKEN never appears in any repo,
            public or private. It&apos;s age-encrypted with per-machine keys and injected at runtime. Even if someone
            clones the agent repo, the token is ciphertext.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">No framework does this</h2>

          <p>
            LangChain stores your API keys in environment variables or <code className="text-emerald-400">.env</code> files.
            CrewAI puts credentials in YAML configs. AutoGen expects you to manage secrets yourself.
            None of them have a protocol for separating public skills from private memory from encrypted credentials.
          </p>

          <p>
            They&apos;re libraries. You import them, call functions, manage state yourself. The boundary
            between &ldquo;what I can share&rdquo; and &ldquo;what must stay private&rdquo; is whatever you
            remember to put in <code className="text-emerald-400">.gitignore</code>.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 pr-4 text-zinc-400 font-mono"></th>
                  <th className="text-center py-2 px-3 text-zinc-400 font-mono">LangChain</th>
                  <th className="text-center py-2 px-3 text-zinc-400 font-mono">CrewAI</th>
                  <th className="text-center py-2 px-3 text-zinc-400 font-mono">AutoGen</th>
                  <th className="text-center py-2 px-3 text-emerald-400 font-mono">aide.sh</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Git-native memory</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-emerald-400">&check;</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Zero-leak credentials</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-emerald-400">&check;</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Agent = repo</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-emerald-400">&check;</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">No LLM required</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-emerald-400">&check;</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Multi-machine leader election</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-emerald-400">&check;</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Per-skill credential scoping</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-emerald-400">&check;</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Hub = git repo (zero infra)</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-zinc-600">&times;</td>
                  <td className="text-center py-2 px-3 text-emerald-400">&check;</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-white pt-4">A protocol, not a library</h2>

          <p>
            aide is not a Python package you import. It&apos;s a protocol. The occupation/cognition/vault
            split is a data model, not an API. Any AI &mdash; Claude, GPT, Gemini, a local model &mdash;
            can read the directory structure and immediately know what&apos;s shareable, what&apos;s personal,
            and what&apos;s encrypted.
          </p>

          <p>
            You don&apos;t need to learn a framework. You need to understand a directory layout.
            Put your skills in <code className="text-emerald-400">occupation/skills/</code>. Put your
            memories in <code className="text-emerald-400">cognition/memory/</code>. Put your secrets
            in <code className="text-emerald-400">vault</code>. That&apos;s the entire API.
          </p>

          <p>
            This is what Docker did for containers. Before Docker, every deployment was bespoke.
            Dockerfiles gave everyone a standard way to package, deploy, and run. aide does the same
            for agents. An Agentfile, a directory structure, and <code className="text-emerald-400">aide run</code>.
          </p>

          <p>
            Deploy AI agents, just like Docker.
          </p>

          <p className="text-zinc-500 text-xs mt-8">
            Day 5 of building aide.sh in public. v0.5.0. Follow along on{" "}
            <a href="https://x.com/yiidtw" className="text-emerald-400 hover:underline">Twitter</a>.
          </p>
        </div>
      </article>

      <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500 font-mono max-w-3xl mx-auto">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://x.com/yiidtw" className="hover:text-white transition">Twitter</a>
          <a href="https://github.com/yiidtw/aide" className="hover:text-white transition">GitHub</a>
          <a href="https://aide.sh" className="hover:text-white transition">aide.sh</a>
        </div>
      </footer>
    </main>
  );
}
