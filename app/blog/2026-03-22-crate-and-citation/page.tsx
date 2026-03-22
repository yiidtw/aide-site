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
        <h1 className="text-3xl font-bold mb-8">aide.sh is now on crates.io. Here&apos;s how to cite it.</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-zinc-300 leading-relaxed">

          <p className="text-lg text-zinc-400">
            aide-sh v0.5.0 is published. One command to install, one command to start.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">Install</h2>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`cargo install aide-sh`}
          </pre>

          <p>
            That&apos;s it. No Python virtual environments, no npm global installs, no Docker pull.
            A single Rust binary on your PATH.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">Get started</h2>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`aide init my-agent
aide run my-agent`}
          </pre>

          <p>
            <code className="text-emerald-400">aide init</code> scaffolds the occupation/cognition structure.
            <code className="text-emerald-400"> aide run</code> starts the daemon. Your agent is live.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">Citation</h2>

          <p>
            If you use aide in your research, please cite it. Here&apos;s the BibTeX:
          </p>

          <pre className="bg-zinc-900 p-4 rounded-lg text-sm overflow-x-auto font-mono text-emerald-400">
{`@software{aide_sh,
  title = {aide.sh: Deploy AI Agents, Just Like Docker},
  author = {Wu, Yi-De},
  year = {2026},
  url = {https://aide.sh},
  repository = {https://github.com/yiidtw/aide},
  version = {0.5.0},
  license = {MIT}
}`}
          </pre>

          <p>
            A <code className="text-emerald-400">CITATION.cff</code> file will be added to the repository
            for GitHub&apos;s built-in citation support. Click &ldquo;Cite this repository&rdquo; on GitHub
            and it&apos;ll generate the reference for you.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">Zenodo DOI</h2>

          <p>
            Zenodo archival is coming soon. Once enabled, every release will get a DOI for permanent
            citation. If your journal requires a DOI, hold tight &mdash; or cite the GitHub repo
            and crates.io link for now.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">Why citation matters</h2>

          <p>
            aide is built by a PhD student. Citations are how academic work gets recognized.
            If aide helps your research &mdash; whether you use it to run experiment agents,
            manage paper reviews, or automate your workflow &mdash; a citation helps keep the
            project alive.
          </p>

          <p>
            Cite the crate. Cite the repo. Both work.
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
