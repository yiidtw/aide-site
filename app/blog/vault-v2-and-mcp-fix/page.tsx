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
        <p className="text-xs text-zinc-600 font-mono mb-2">2026-03-19</p>
        <h1 className="text-3xl font-bold mb-8">Vault v2: every machine gets its own key.</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-zinc-300 leading-relaxed">
          <p>
            aide.sh agents need secrets. API tokens, SSH keys, credentials for the services they
            manage. Until today, we had a problem: every machine shared the same private key.
            If one box got compromised, every secret was exposed.
          </p>

          <p>
            Today we shipped <strong>Vault v2</strong>. The idea is simple:
            each machine generates its own keypair. Secrets are encrypted to <em>all</em> recipients
            at once. Any machine can decrypt with its own private key. Private keys never
            leave their machine. The encrypted vault lives in a private git repo.
          </p>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`# Mac mini has mac.key, formace-00 has f00.key
# Encrypt to both:
age -R recipients.txt -o vault.age secrets.env

# Either machine decrypts with its own key:
age -d -i ~/.aide/vault.key vault.age`}
          </pre>

          <p>
            Sync is just git. Each machine edits on its own branch, merges to main when ready.
            No custom protocol, no scp of private keys, no lock servers. Git is the conflict
            resolution mechanism.
          </p>

          <p>
            We also fixed the MCP server today. <code className="text-emerald-400">aide mcp</code> was silently
            failing because the installed binary was stale &mdash; it didn&apos;t have
            the <code className="text-emerald-400">mcp</code> subcommand yet. A <code className="text-emerald-400">cargo build --release</code> and
            a copy later, both machines can now auto-discover agents when you open a Claude Code session.
          </p>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`$ aide vault status
pubkey:   age1lk69lea3vldq3h...
key:      /Users/ydwu/.aide/vault.key
  permissions: 600 OK
secrets:  63 keys`}
          </pre>

          <p>
            14 tests. Multi-recipient encryption, scoped injection, key rotation, binary
            integration &mdash; all green. The vault is now the foundation everything else
            builds on: agent-to-agent communication, cross-machine dispatch, credential
            lifecycle. If the vault isn&apos;t solid, nothing is.
          </p>

          <p className="text-zinc-500 text-xs mt-8">
            Day 2 of building aide.sh in public. Follow along on{" "}
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
