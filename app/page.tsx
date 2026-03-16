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
            <code>{`$ aide.sh search devops
NAME                              VERSION  AUTHOR  DESCRIPTION
aide/engineering-devops-automator  0.1.0    aide    Expert DevOps engineer...
aide/engineering-security-engineer 0.1.0    aide    Application security...

$ aide.sh pull aide/engineering-devops-automator
pulling aide/engineering-devops-automator:latest...
aide/engineering-devops-automator:0.1.0

$ aide.sh run aide/engineering-devops-automator --name devops
devops

$ aide.sh exec -it devops deploy staging
Deploying to staging...
  terraform plan: 3 resources to add
  CI pipeline: all checks passed
  Rolling update: 2/2 pods ready

$ aide.sh ps
INSTANCE  IMAGE                STATUS   CRON  LAST ACTIVITY
devops    engineering-devops   active   0     exec: deploy staging → ok`}</code>
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
name = "devops-bot"
version = "0.1.0"
description = "Infrastructure automation agent"

[persona]
file = "persona.md"

[skills.deploy]
script = "skills/deploy.sh"
env = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]

[skills.monitor]
script = "skills/monitor.sh"
schedule = "*/5 * * * *"      # every 5 minutes
env = ["DATADOG_API_KEY"]     # only this secret

[skills.audit]
script = "skills/audit.sh"
schedule = "0 9 * * 1"        # weekly Monday 9am

[env]
required = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
optional = ["DATADOG_API_KEY", "SLACK_WEBHOOK"]`}</code>
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

      {/* Vault */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">Vault: Encrypted Credential Management</h2>
        <p className="text-center text-zinc-400 mb-8 font-mono text-sm">
          age-encrypted secrets. Per-skill scoping. Leak detection on push.
        </p>
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
          <pre>
            <code>{`$ aide.sh vault set COOL_TOKEN=abc123 SMTP_PASS=secret
  set COOL_TOKEN
  set SMTP_PASS
2 secret(s) stored in vault

$ aide.sh vault status
vault:    ~/.aide/vault.age (4285 bytes)
key:      ~/.aide/vault.key
  permissions: 600 OK
env vars: 55

$ aide.sh vault rotate
  old key backed up to vault.key.bak
vault rotated: new key
  verified: decrypt with new key OK

$ aide.sh build agents/leaky-bot
BLOCKED: potential secrets detected:
  bad.sh:1: possible secret (sk-ant-...)
Error: Fix leaks before building.`}</code>
          </pre>
        </div>
      </section>

      {/* Hub Stats */}
      <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">hub.aide.sh</h2>
        <p className="text-zinc-400 font-mono text-sm mb-8">
          Public agent registry. Pull any agent, no login required.
        </p>
        <div className="flex justify-center gap-8 font-mono">
          <div>
            <div className="text-3xl font-bold text-emerald-400">35+</div>
            <div className="text-sm text-zinc-500">agents</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">9</div>
            <div className="text-sm text-zinc-500">categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">MIT</div>
            <div className="text-sm text-zinc-500">license</div>
          </div>
        </div>
        <div className="mt-6 bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-mono text-[13px] text-left inline-block">
          <code>{`$ aide.sh search devops
NAME                     VERSION    AUTHOR   DESCRIPTION
aide/engineering-devops   0.1.0      aide     Expert DevOps engineer...`}</code>
        </div>
      </section>

      {/* Getting Started */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-10">Get started in 60 seconds</h2>
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-zinc-500 font-mono">getting started</span>
          </div>
          <pre className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
            <code>{`# 1. Install
$ curl -fsSL https://aide.sh/install | bash

# 2. Set up secrets (encrypted, never leaves your machine)
$ aide.sh vault set OPENAI_API_KEY=sk-... GITHUB_TOKEN=ghp_...

# 3. Pull an agent from the hub
$ aide.sh pull aide/engineering-devops-automator

# 4. Run it
$ aide.sh run aide/engineering-devops-automator --name devops

# 5. Use it
$ aide.sh exec -it devops deploy staging

# 6. Schedule recurring tasks
$ aide.sh cron add devops "0 9 * * 1" "audit security"

# 7. Check status
$ aide.sh ps
INSTANCE  IMAGE               STATUS  CRON
devops    engineering-devops   active  1

# 8. Build and push your own agent
$ aide.sh build my-agent/    # scans for leaked secrets
$ aide.sh push my-agent/     # uploads to hub.aide.sh`}</code>
          </pre>
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
