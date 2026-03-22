const posts = [
  {
    slug: "2026-03-22-occupation-cognition-vault",
    date: "2026-03-22",
    title: "occupation, cognition, vault: why your agent framework is a protocol, not a library.",
    preview: "Built a crate-publishing agent. The directory structure revealed three tiers: public skills, private memory, encrypted secrets. No framework does this. aide is a protocol.",
  },
  {
    slug: "2026-03-22-crate-and-citation",
    date: "2026-03-22",
    title: "aide.sh is now on crates.io. Here's how to cite it.",
    preview: "aide-sh v0.5.0 published on crates.io. cargo install aide-sh. BibTeX and CITATION.cff for academic use. Zenodo DOI coming soon.",
  },
  {
    slug: "2026-03-21-an-agent-is-a-repo",
    date: "2026-03-21",
    title: "An agent is a repo. GITAW and the occupation/cognition split.",
    preview: "We killed our registry. Hub = git repo. Agents split into occupation (shareable job) and cognition (personal brain). GITAW with UUID leader election.",
  },
  {
    slug: "2026-03-20-github-driven-agent-workflow",
    date: "2026-03-20",
    title: "GITAW: your inbox is a repo.",
    preview: "Git-based Issue Tracking Agentic Workflow. Killed the inbox poller. GitHub Issues is the message queue. ETag polling, single ticker, zero-restart discovery.",
  },
  {
    slug: "2026-03-19-vault-v2-and-mcp-fix",
    date: "2026-03-19",
    title: "Vault v2: every machine gets its own key.",
    preview: "Multi-recipient age encryption, git-based sync, and an MCP bug that kept agents invisible. 14 tests, all green.",
  },
  {
    slug: "2026-03-19-write-an-aide-instead",
    date: "2026-03-19",
    title: "Write a skill? Write an aide instead.",
    preview: "Some skills I call every day. Instead of letting Claude hunt for the right one, I gave each a dedicated agent running 24/7 in the background.",
  },
];

export default function Blog() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 max-w-3xl mx-auto">
        <a href="/" className="font-mono text-lg font-bold tracking-tight hover:text-emerald-400 transition">aide.sh</a>
        <div className="flex gap-6 text-sm text-zinc-400 font-mono">
          <a href="https://docs.aide.sh" className="hover:text-white transition">Docs</a>
          <a href="https://hub.aide.sh" className="hover:text-white transition">Hub</a>
          <a href="/blog" className="text-white">Blog</a>
          <a href="https://github.com/yiidtw/aide" className="hover:text-white transition">GitHub</a>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-20">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-zinc-500 font-mono text-sm mb-12">Building aide.sh in public. One story per day.</p>

        {posts.map((post) => (
          <a key={post.slug} href={`/blog/${post.slug}`} className="block mb-8 group">
            <p className="text-xs text-zinc-600 font-mono mb-1">{post.date}</p>
            <h2 className="text-xl font-bold group-hover:text-emerald-400 transition mb-2">{post.title}</h2>
            <p className="text-zinc-400 text-sm">{post.preview}</p>
          </a>
        ))}
      </section>

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
