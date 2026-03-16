export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <span className="font-mono text-lg font-bold tracking-tight">aide.sh</span>
        <div className="flex gap-6 text-sm text-zinc-400 font-mono">
          <a href="https://hub.aide.sh" className="hover:text-white transition">Hub</a>
          <a href="https://github.com/yiidtw/aide" className="hover:text-white transition">GitHub</a>
          <a href="#install" className="hover:text-white transition">Install</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-24 pb-16 px-6">
        <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-emerald-400 border border-emerald-400/30 rounded-full">
          v0.1.0 — now open source
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl leading-[1.1]">
          Docker for
          <br />
          <span className="text-emerald-400">AI Agents</span>
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-xl font-mono">
          Package, deploy, and manage AI agents with Agentfile.
          <br />
          Isolated credentials. Public registry. One CLI.
        </p>

        {/* Install command */}
        <div id="install" className="mt-10 w-full max-w-lg">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-left">
            <span className="text-zinc-500">$</span>{" "}
            <span className="text-emerald-400 select-all">
              curl -fsSL https://hub.aide.sh/install | bash
            </span>
          </div>
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-zinc-500 font-mono">terminal</span>
          </div>
          <pre className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
            <code>{`$ aide.sh pull ydwu/jenny
pulling ydwu/jenny:latest...
ydwu/jenny:0.1.0

$ aide.sh run ydwu/jenny --name jenny.me
jenny.me

$ aide.sh exec -it jenny.me cool courses
📚 6 courses:
  正規方法 (EE5122)
  系統晶片驗證 (EEE5023)
  機器學習 (EE5184)

$ aide.sh exec -it jenny.me email check
📬 1042 total | 6 unread (of latest 10)
🆕 #1036 | "朱士維學務長" <ntudeanstudent@ntu.edu.tw>
   【衛教推廣】臺大保健中心急救訓練課程

$ aide.sh ps
INSTANCE     IMAGE    STATUS   CRON   LAST ACTIVITY
jenny.me     jenny    active   3      exec: email check → ok`}</code>
          </pre>
        </div>
      </section>

      {/* Docker Comparison */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-10">
          If you know Docker, you know aide.sh
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ComparisonCard
            title="Docker"
            items={[
              "Dockerfile → docker build",
              "docker run nginx",
              "docker exec -it web bash",
              "docker push myapp:latest",
              "Docker Hub",
              "Docker secrets",
            ]}
          />
          <ComparisonCard
            title="aide.sh"
            highlight
            items={[
              "Agentfile.toml → aide.sh build",
              "aide.sh run ydwu/jenny",
              "aide.sh exec -it jenny email check",
              "aide.sh push jenny:0.1.0",
              "hub.aide.sh",
              "Vault + per-skill env scoping",
            ]}
          />
        </div>
      </section>

      {/* Agentfile */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">Agentfile.toml</h2>
        <p className="text-center text-zinc-400 mb-8 font-mono text-sm">
          Like Dockerfile, but for agents. Persona + Skills + Credentials.
        </p>
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
          <pre>
            <code>{`[agent]
name = "jenny"
version = "0.1.0"
description = "NTU school work agent"

[persona]
file = "persona.md"

[skills.cool]
script = "skills/cool.sh"
schedule = "0 8 * * *"        # daily scan
env = ["NTU_COOL_TOKEN"]      # only this secret

[skills.email]
script = "skills/email.sh"
schedule = "0 */4 * * *"      # every 4 hours
env = ["SMTP_USER", "SMTP_PASS", "POP3_HOST"]

[env]
required = ["NTU_COOL_TOKEN"]
optional = ["SMTP_USER", "SMTP_PASS"]`}</code>
          </pre>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Agentfile"
            desc="Declarative agent packaging. Persona, skills, credentials, seed data — all in one file."
          />
          <FeatureCard
            title="Vault"
            desc="age-encrypted secrets with per-skill scoping. Each skill only sees the credentials it declared."
          />
          <FeatureCard
            title="Registry"
            desc="Push and pull agent images. Public hub at hub.aide.sh. Self-host your own."
          />
          <FeatureCard
            title="Lifecycle"
            desc="run, exec, stop, rm, ps, logs, inspect — full Docker-style container management for agents."
          />
          <FeatureCard
            title="Mount"
            desc="Bridge agent persona and memory into Claude Code, Codex, or Gemini CLI with one command."
          />
          <FeatureCard
            title="Cron"
            desc="Schedule agent skills with cron expressions. Daily email checks, weekly scans, automated reports."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-24 px-6">
        <h2 className="text-3xl font-bold mb-6">Get started in 30 seconds</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm inline-block text-left">
          <div>
            <span className="text-zinc-500">$</span>{" "}
            <span className="text-emerald-400">curl -fsSL https://hub.aide.sh/install | bash</span>
          </div>
          <div className="mt-1">
            <span className="text-zinc-500">$</span>{" "}
            aide.sh run ydwu/jenny --name my-agent
          </div>
          <div className="mt-1">
            <span className="text-zinc-500">$</span>{" "}
            aide.sh exec -it my-agent cool courses
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500 font-mono">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/yiidtw/aide" className="hover:text-white transition">GitHub</a>
          <a href="https://hub.aide.sh" className="hover:text-white transition">Hub</a>
          <a href="https://hub.aide.sh/install" className="hover:text-white transition">Install</a>
        </div>
        MIT License — aide.sh
      </footer>
    </main>
  );
}

function ComparisonCard({
  title,
  items,
  highlight,
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-6 font-mono text-sm ${
        highlight
          ? "border-emerald-400/30 bg-emerald-400/5"
          : "border-zinc-800 bg-zinc-950"
      }`}
    >
      <h3
        className={`text-lg font-bold mb-4 ${
          highlight ? "text-emerald-400" : "text-zinc-400"
        }`}
      >
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-zinc-300">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}
