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
        <p className="text-xs text-zinc-600 font-mono mb-2">2026-03-20</p>
        <h1 className="text-3xl font-bold mb-8">GIDAW: your inbox is a repo.</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-zinc-300 leading-relaxed">

          <p className="text-lg text-zinc-400">
            We had a daemon polling an empty inbox 86,400 times a day.
            Most of those requests returned nothing. Today we killed the inbox poller
            and replaced it with something better.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">The problem</h2>

          <p>
            aide.sh agents receive messages via email. The old design: a Cloudflare Worker
            stored incoming emails in KV, and the daemon polled that endpoint every 60 seconds.
            The inbox was empty 99% of the time. That&apos;s 1,440 wasted HTTP requests per day,
            per agent.
          </p>

          <p>
            Meanwhile, we&apos;d already built an email gateway that converts incoming emails
            into GitHub Issues (one issue per message, with sender, subject, and body).
            GitHub was already the relay. We just weren&apos;t using it.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">The design: GIDAW</h2>

          <p>
            GitHub Issues Driven Agentic Workflow. We call it GIDAW &mdash; sounds
            like 知道 (<em>zhīdào</em>, &ldquo;to know&rdquo; in Mandarin). Your agent <em>knows</em>.
            The idea is simple: GitHub Issues <em>is</em> the message queue. The daemon polls GitHub instead of a custom inbox. The full pipeline:
          </p>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`email → aide.sh MX → CF Worker → GitHub Issue
                                       ↓
                              daemon ticker (300s)
                                       ↓
                              ack comment → exec agent → post result`}
          </pre>

          <p>
            Every 5 minutes, one ticker scans all instances. If an instance
            has <code className="text-emerald-400">github_repo</code> set, it polls
            that repo&apos;s issues. New issue? Ack with a comment, run the agent, post the
            result back. Same for new comments on existing issues &mdash; people can have
            conversations with the agent right in the issue thread.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">ETag: don&apos;t waste rate limit</h2>

          <p>
            GitHub&apos;s API returns an <code className="text-emerald-400">ETag</code> header
            with every response. On the next request, we send it back
            as <code className="text-emerald-400">If-None-Match</code>. If nothing changed,
            GitHub returns <code className="text-emerald-400">304 Not Modified</code> &mdash;
            which doesn&apos;t count against the rate limit. Same trick
            Telegram&apos;s <code className="text-emerald-400">getUpdates</code> uses
            with <code className="text-emerald-400">offset</code>.
          </p>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`GET /repos/user/aide-ntu/issues?state=open&sort=created&direction=desc
If-None-Match: "etag-from-last-request"

→ 304 Not Modified (free, no rate limit hit)
→ 200 OK + new ETag (only when there are changes)`}
          </pre>

          <h2 className="text-xl font-bold text-white pt-4">Ticker, not per-instance pollers</h2>

          <p>
            First version spawned one async task per instance at daemon startup.
            Problem: add a new agent, you have to restart the daemon. That&apos;s not how
            a container runtime should work.
          </p>

          <p>
            We refactored to a <strong>single ticker</strong> &mdash; same pattern as
            the cron scheduler. One loop, every 300 seconds, scans all instances. New
            instance with <code className="text-emerald-400">github_repo</code>? Picked up
            on the next tick. Removed instance? Cleaned from the state map automatically.
            Token rotated in the vault? Reloaded on the next tick. Zero restarts.
          </p>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`// Single ticker — scans all instances each tick
loop {
    let token = load_vault_env("GITHUB_TOKEN");
    for inst in instance_manager.list() {
        let repo = resolve_github_repo(inst);  // manifest or Agentfile
        let state = states.entry(inst).or_seed();
        poll_issues(repo, token, state);
        poll_comments(repo, token, state);
    }
    states.retain(|name| still_exists(name));  // cleanup
    sleep(300s);
}`}
          </pre>

          <h2 className="text-xl font-bold text-white pt-4">Setup: two lines</h2>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`# Deploy agent to GitHub (creates repo, writes github_repo back)
$ aide deploy --github my-agent

# Or set it manually in instance.toml
github_repo = "yourname/aide-my-agent"

# Or declare in Agentfile.toml
[expose]
github = { repo = "yourname/aide-my-agent" }`}
          </pre>

          <p>
            The daemon needs <code className="text-emerald-400">GITHUB_TOKEN</code> in
            the vault. That&apos;s it. Next <code className="text-emerald-400">aide up</code> (or
            next tick if already running) starts polling.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">What we killed</h2>

          <p>
            The old <code className="text-emerald-400">start_inbox_poller()</code> is gone.
            It polled a CF Worker KV endpoint every 60 seconds, parsed JSON, matched agents
            by email prefix, logged, acked, and deleted. 87 lines of code that did almost
            nothing useful almost all the time.
          </p>

          <p>
            Replaced by a ticker that uses GitHub as the message store. Issues are durable,
            searchable, commentable. You can see the full conversation history. You can
            @mention people. You can add labels. The agent&apos;s memory commits go to the
            same repo. Everything in one place.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">The Docker parallel</h2>

          <p>
            In Docker, you don&apos;t restart the daemon to add a container.
            In aide.sh, you shouldn&apos;t restart the daemon to add an agent. The ticker
            model makes this true: <code className="text-emerald-400">aide deploy --github</code>,
            and the agent is reachable via email within 5 minutes. No restart,
            no config reload, no signal.
          </p>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`$ aide deploy --github ntu.ydwu
deploying ntu.ydwu → github.com/user/aide-ntu
  repo: https://github.com/user/aide-ntu

# Daemon log (next tick):
github poller tracking new instance  instance=ntu.ydwu  repo=user/aide-ntu
seeded from existing issues  last_seen=1`}
          </pre>

          <h2 className="text-xl font-bold text-white pt-4">What&apos;s next</h2>

          <p>
            Right now the agent responds by calling <code className="text-emerald-400">claude -p</code> with
            the persona and skill catalog. That works, but it&apos;s a full LLM call for every
            message. Next step: a lightweight intent router that maps common patterns to
            skills directly, falling back to LLM only when needed.
          </p>

          <p>
            The repo naming convention is <code className="text-emerald-400">aide-{"{agent}"}</code> under
            the user&apos;s GitHub account. Clean, predictable, and the email gateway can
            derive the repo from the agent name without explicit mapping.
          </p>

          <p className="text-zinc-500 text-xs mt-8">
            Day 3 of building aide.sh in public. v0.4.1. Follow along on{" "}
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
