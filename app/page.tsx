const hotAgents = [
  { name: "aide/code-review", desc: "Plan, review, QA, ship", by: "garrytan/gstack", ver: "0.1.0" },
  { name: "aide/context", desc: "API docs for coding agents", by: "andrewyng/context-hub", ver: "0.1.0" },
  { name: "aide/devops", desc: "Uptime, incidents, log analysis", by: "community", ver: "0.1.0" },
  { name: "aide/weather", desc: "Forecast + severe alerts", by: "community", ver: "0.1.0" },
  { name: "aide/qa", desc: "Test, regression, coverage", by: "community", ver: "0.1.0" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <span className="font-mono text-lg font-bold tracking-tight">aide.sh</span>
        <div className="flex gap-6 text-sm text-zinc-400 font-mono">
          <a href="https://docs.aide.sh" className="hover:text-white transition">Docs</a>
          <a href="https://hub.aide.sh" className="hover:text-white transition">Hub</a>
          <a href="https://github.com/yiidtw/aide" className="hover:text-white transition">GitHub</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-24 pb-16 px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl leading-[1.1]">
          Deploy AI agents,
          <br />
          <span className="text-emerald-400">just like Docker.</span>
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-xl font-mono">
          Package, deploy, and manage AI agents with Agentfile.
          <br />
          One binary. Works with or without AI.
        </p>
        <p className="mt-2 text-xs text-zinc-600 font-mono">v0.3.0</p>

        {/* Install command */}
        <div id="install" className="mt-8 w-full max-w-lg">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-left">
            <span className="text-zinc-500">$</span>{" "}
            <span className="text-emerald-400 select-all">
              curl -fsSL https://aide.sh/install | bash
            </span>
          </div>
        </div>
      </section>

      {/* Quick Demo Terminal */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-zinc-500 font-mono">terminal</span>
          </div>
          <pre className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
            <code>{`$ aide.sh pull aide/github-reviewer
aide/github-reviewer:0.1.0

$ aide.sh run aide/github-reviewer --name reviewer
reviewer

$ aide.sh exec reviewer pr list
#41  feat: add cron scheduler       OPEN
#38  docs: update README            OPEN

$ aide.sh exec reviewer diff
=== Diff: feature/auth vs main ===
 src/auth.rs   | 42 +++++++++
 src/main.rs   |  3 +
 2 files changed, 45 insertions(+)

$ aide.sh exec reviewer notifications
3 unread:
  PullRequest: feat: add cron scheduler
  Issue: Bug in vault encryption
  Release: v0.3.0`}</code>
          </pre>
        </div>
      </section>

      {/* Dashboard Screenshot */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-4">Built-in Observability</h2>
        <p className="text-center text-zinc-400 mb-8 font-mono text-sm">
          aide.sh dash &mdash; monitor skills, cron, usage, and logs in one place
        </p>
        <div className="rounded-lg border border-zinc-800 overflow-hidden">
          <img
            src="/dash.png"
            alt="aide.sh dashboard"
            className="w-full"
          />
        </div>
      </section>

      {/* Hot Agents */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-10">Hot Agents</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {hotAgents.map((agent) => (
            <a
              key={agent.name}
              href={`https://hub.aide.sh/${agent.name}.html`}
              className="rounded-lg border border-zinc-800 bg-zinc-950 p-5 block hover:border-zinc-600 transition"
            >
              <h3 className="font-mono text-sm font-bold text-emerald-400 mb-1">
                {agent.name}
              </h3>
              <p className="text-sm text-zinc-300 mb-3">{agent.desc}</p>
              <div className="flex justify-between text-xs text-zinc-600">
                <span>{agent.by}</span>
                <span>v{agent.ver}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500 font-mono">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://docs.aide.sh" className="hover:text-white transition">Docs</a>
          <a href="https://github.com/yiidtw/aide" className="hover:text-white transition">GitHub</a>
          <a href="https://hub.aide.sh" className="hover:text-white transition">Hub</a>
        </div>
        MIT License &mdash; aide.sh
      </footer>
    </main>
  );
}
