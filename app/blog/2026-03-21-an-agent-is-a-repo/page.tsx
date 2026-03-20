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
        <p className="text-xs text-zinc-600 font-mono mb-2">2026-03-21</p>
        <h1 className="text-3xl font-bold mb-8">An agent is a repo. GITAW and the occupation/cognition split.</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-zinc-300 leading-relaxed">

          <p className="text-lg text-zinc-400">
            We spent two days arguing about directory names. It was worth it.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">The question</h2>

          <p>
            An agent has skills, knowledge, a persona, and memory. Some of that is shareable &mdash;
            anyone can do the same job. Some is personal &mdash; only this agent has these memories.
            Where do you draw the line?
          </p>

          <p>
            Docker draws it between image and volume. But agents aren&apos;t containers.
            They&apos;re closer to people. So we borrowed from a different vocabulary.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">occupation/ and cognition/</h2>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`aide-ntu/
  occupation/          # the job — shareable
    Agentfile.toml     # manifest
    persona.md         # role definition
    skills/            # what it can do
    knowledge/         # what it was taught
  cognition/           # the brain — personal
    memory/            # what it learned
    logs/              # what it did
    instance.toml      # who it is`}
          </pre>

          <p>
            <strong>Occupation</strong> is the job description. Anyone can pull it from the hub and
            run the same agent. <strong>Cognition</strong> is the brain. It&apos;s what this
            specific instance learned from its own experience. You can&apos;t transfer a brain.
          </p>

          <p>
            When you look at the directory, you instantly know: <code className="text-emerald-400">occupation/</code> is
            what I can share, <code className="text-emerald-400">cognition/</code> is what&apos;s mine.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">Hub = occupation snapshots</h2>

          <p>
            We killed our Cloudflare Worker registry. The hub is just a git repo now.
          </p>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`aide push    → copies occupation/ to hub repo
aide pull    → copies hub → local occupation/
aide commit  → pushes occupation/ + cognition/ to agent repo`}
          </pre>

          <p>
            The hub stores occupation snapshots. No cognition, ever. When you <code className="text-emerald-400">aide pull</code> an
            agent, you get the job description. When you <code className="text-emerald-400">aide run</code>,
            a fresh brain is created. The agent starts learning from scratch.
          </p>

          <p>
            Zero infrastructure. No R2 bucket, no Supabase, no custom auth.
            Git permissions are the access control. Public hub = public repo.
            Private hub = private repo.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">GITAW: the agent&apos;s nervous system</h2>

          <p>
            GITAW &mdash; Git-based Issue Tracking Agentic Workflow. Sounds
            like 知道 (<em>zh&#x12B;d&agrave;o</em>, &ldquo;to know&rdquo;). Your agent knows.
          </p>

          <p>
            Every agent repo has GitHub Issues. Open an issue = send a message.
            The daemon polls every 5 minutes, picks up the issue, executes skills,
            posts the result as a comment, and commits any memory changes
            to <code className="text-emerald-400">cognition/memory/</code>.
          </p>

          <p>
            The entire conversation is version-controlled. The agent&apos;s learning is
            git-tracked. You can <code className="text-emerald-400">git log cognition/memory/</code> to
            see what it learned and when.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">UUID and leader election</h2>

          <p>
            Same agent, two machines. Who responds?
          </p>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`# Each instance has a UUID + machine_id
ntu.yiidtw(mac-mini:52c9)
ntu.yiidtw(formace-00:a3f1)

# Ack shows identity
🤖 ntu.yiidtw(mac-mini:52c9) received, processing...

# Route to specific machine
@mac-mini check my assignments
@a3f1 run the benchmarks`}
          </pre>

          <p>
            Leader election uses GitHub reactions. First machine to
            add a 👀 reaction to the issue wins. The rest back off.
            No Redis, no distributed lock service. GitHub is the coordination layer.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">Seven agents, one daemon</h2>

          <p>
            As of today, seven agents are running:
          </p>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`ntu.yiidtw             # university coursework
twitter.yiidtw         # social media
devops.yiidtw          # infrastructure
gmail.yiidtw           # email
paperreview.yiidtw     # academic paper review
teaching-monster.yiidtw  # teaching video eval
debate.yiidtw          # argumentation engine`}
          </pre>

          <p>
            All in <code className="text-emerald-400">occupation/</code> + <code className="text-emerald-400">cognition/</code> structure.
            All with TypeScript skills. All GITAW-enabled. One ticker scans them all &mdash;
            add a new agent, next tick picks it up. No restart.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">What we shipped</h2>

          <p>
            In two days: occupation/cognition split, git-native hub, GITAW with memory
            auto-commit, UUID + leader election, TypeScript skills with bun auto-install,
            Claude Code plugin, 47 integration tests on a clean Linux VM, and a paper
            review agent built from existing wonskill knowledge.
          </p>

          <p>
            The architecture is set. An agent is a repo. Its job is in <code className="text-emerald-400">occupation/</code>.
            Its brain is in <code className="text-emerald-400">cognition/</code>. Everything else is git.
          </p>

          <p className="text-zinc-500 text-xs mt-8">
            Day 4 of building aide.sh in public. v0.5.0. Follow along on{" "}
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
