export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <span className="font-mono text-lg font-bold tracking-tight">aide.sh</span>
        <div className="flex gap-6 text-sm text-zinc-400 font-mono">
          <a href="/docs" className="hover:text-white transition">Docs</a>
          <a href="/blog" className="hover:text-white transition">Blog</a>
          <a href="https://github.com/yiidtw/aide" className="hover:text-white transition">GitHub</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-24 pb-16 px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl leading-[1.1]">
          One file to
          <br />
          <span className="text-emerald-400">agentize</span> your
          <br />
          Claude project.
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-xl font-mono">
          Drop an Aidefile into any Claude Code project.
          <br />
          Budget, vault, hooks, triggers. Fire and forget.
        </p>
        <p className="mt-2 text-xs text-zinc-600 font-mono">v2.0.0-alpha</p>

        {/* Install command */}
        <div id="install" className="mt-8 w-full max-w-lg">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-left">
            <span className="text-zinc-500">$</span>{" "}
            <span className="text-emerald-400 select-all">
              cargo install aide-sh
            </span>
          </div>
        </div>
      </section>

      {/* What is an Aidefile */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">What is an Aidefile?</h2>
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-zinc-500 font-mono">Aidefile</span>
          </div>
          <pre className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
            <code>{`[persona]
name = "Senior Reviewer"
style = "direct, cares about edge cases"

[budget]
tokens = "100k"
max_retries = 3

[hooks]
on_spawn = ["inject-vault"]
on_complete = ["commit-memory"]

[trigger]
on = "issue"

[vault]
keys = ["GITHUB_TOKEN"]`}</code>
          </pre>
        </div>
        <p className="text-center text-zinc-500 font-mono text-sm mt-4">
          That&apos;s it. Your Claude project is now an agent.
        </p>
      </section>

      {/* Quick Demo Terminal */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">How it works</h2>
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-zinc-500 font-mono">terminal</span>
          </div>
          <pre className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
            <code>{`# Turn any Claude project into an agent
$ cd ~/projects/code-reviewer
$ aide init --persona "Senior Reviewer"
✓ Created Aidefile

# One-shot: fire and forget
$ aide run . "Review PR #42 and leave comments"
▸ Running task in ~/projects/code-reviewer
  agent: Senior Reviewer
  budget: 100000 tokens
✓ Task completed (23,847 tokens used)

# Or register and run by name
$ aide register . --name reviewer
✓ Registered 'reviewer'

$ aide run reviewer "Review all open PRs"
✓ Task completed (67,231 tokens used)

# Start daemon: agents wake up on triggers
$ aide up
▸ Daemon started (polling 1 agent)`}</code>
          </pre>
        </div>
      </section>

      {/* Three pillars */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-10">What aide handles</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="font-mono text-sm font-bold text-emerald-400 mb-2">Budget</h3>
            <p className="text-sm text-zinc-400">
              Token limits per task. Auto-retry with remaining budget. Never burn more than you set.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="font-mono text-sm font-bold text-emerald-400 mb-2">Vault</h3>
            <p className="text-sm text-zinc-400">
              age-encrypted secrets injected as env vars at spawn time. Never enters the LLM context window.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="font-mono text-sm font-bold text-emerald-400 mb-2">Triggers</h3>
            <p className="text-sm text-zinc-400">
              GitHub Issues, cron, webhooks. Daemon polls and dispatches. Agents wake up when needed.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="font-mono text-sm font-bold text-emerald-400 mb-2">Hooks</h3>
            <p className="text-sm text-zinc-400">
              on_spawn, on_complete. Inject vault, commit memory, notify, clean up. Lifecycle control.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="font-mono text-sm font-bold text-emerald-400 mb-2">Memory</h3>
            <p className="text-sm text-zinc-400">
              Auto-compact when threshold is hit. Each agent has its own memory namespace. Claude Code native.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="font-mono text-sm font-bold text-emerald-400 mb-2">Teams</h3>
            <p className="text-sm text-zinc-400">
              aide import / export. Share agent templates via git. Team as repo, member as directory.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-6">Philosophy</h2>
        <div className="space-y-4 text-zinc-400 font-mono text-sm">
          <p>Claude Code is already a great agent runtime.</p>
          <p>aide doesn&apos;t replace it. aide is the <span className="text-white">lifecycle manager</span>.</p>
          <p className="text-zinc-600">Who to wake up. How much to spend. What secrets to give. When to stop.</p>
          <p className="pt-4 text-emerald-400">Aidefile is to Claude Code what Dockerfile is to Linux.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500 font-mono">
        <div className="flex justify-center gap-6 mb-4">
          <a href="/docs" className="hover:text-white transition">Docs</a>
          <a href="https://github.com/yiidtw/aide" className="hover:text-white transition">GitHub</a>
          <a href="/blog" className="hover:text-white transition">Blog</a>
        </div>
        MIT License &mdash; aide.sh
      </footer>
    </main>
  );
}
