const hotAgents = [
  {
    name: "aide/code-review",
    desc: "Plan, review, QA, ship — based on gstack",
    author: "garrytan",
  },
  {
    name: "aide/context",
    desc: "Curated API docs for coding agents",
    author: "andrewyng",
  },
  {
    name: "aide/devops",
    desc: "Uptime monitoring, incident response, log analysis",
    author: "community",
  },
  {
    name: "aide/ntu-student",
    desc: "NTU COOL LMS + mail for university students",
    author: "ydwu",
  },
  {
    name: "aide/weather",
    desc: "Daily weather briefings and severe alerts",
    author: "community",
  },
  {
    name: "aide/qa",
    desc: "Test generation, regression, coverage reports",
    author: "community",
  },
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
          Package, deploy, and manage AI agents with Agentfile. One binary. Works with or without AI.
        </p>

        {/* Install command */}
        <div id="install" className="mt-10 w-full max-w-lg">
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
            <code>{`$ aide.sh init my-agent && aide.sh build my-agent/
building my-agent: 0.1.0
  sha256: 84023c239020  3.5KB

$ aide.sh run my-agent --name bot
bot

$ aide.sh exec bot hello world
Hello, world! I am my-agent.

$ aide.sh exec bot                    # skill discovery
bot (my-agent:0.1.0)
Skills:
  hello [name]    A greeting skill

$ aide.sh dash                        # web dashboard
Dashboard running at http://localhost:3939`}</code>
          </pre>
        </div>
      </section>

      {/* Dashboard Screenshot */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-4">Built-in Observability</h2>
        <p className="text-center text-zinc-400 mb-8 font-mono text-sm">
          aide.sh dash — monitor skills, cron, usage, and logs in one place
        </p>
        <div className="rounded-lg border border-zinc-800 overflow-hidden">
          <img
            src="/dash.png"
            alt="aide.sh dashboard showing agent instances, skills, cron jobs, usage analytics, and logs"
            className="w-full"
          />
        </div>
      </section>

      {/* Hot Agents */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-10">Hot Agents</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {hotAgents.map((agent) => (
            <div
              key={agent.name}
              className="rounded-lg border border-zinc-800 bg-zinc-950 p-5"
            >
              <h3 className="font-mono text-sm font-bold text-emerald-400 mb-2">
                {agent.name}
              </h3>
              <p className="text-sm text-zinc-300 mb-3">{agent.desc}</p>
              <p className="text-xs text-zinc-600">
                by {agent.author} &middot; MIT
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="https://hub.aide.sh"
            className="text-sm font-mono text-emerald-400 hover:text-emerald-300 transition"
          >
            Browse agents on hub.aide.sh &rarr;
          </a>
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
