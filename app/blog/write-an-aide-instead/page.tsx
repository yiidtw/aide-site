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
        <h1 className="text-3xl font-bold mb-8">Write a skill? Write an aide instead.</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-zinc-300 leading-relaxed">
          <p>
            I have a few things I do every single day. Check my university LMS for assignments.
            Skim my inbox. See if any PRs need attention. Post a build-in-public update on Twitter.
          </p>

          <p>
            At first, I wrote each of these as a skill — a shell script that does one thing.
            <code className="text-emerald-400">cool.sh</code> scans my LMS.
            <code className="text-emerald-400">mail.sh</code> checks email.
            <code className="text-emerald-400">tweet.sh</code> posts to Twitter.
          </p>

          <p>
            Then I noticed something: every morning I was running the same three commands.
            And every time I asked Claude to help, it had to figure out <em>which</em> skill to call,
            <em>where</em> to find it, and <em>how</em> to authenticate. Tedious for both of us.
          </p>

          <p>So I stopped writing skills. I started writing aides.</p>

          <p>
            An aide is just a folder with a persona, a set of skills, and a schedule.
            Instead of a loose <code className="text-emerald-400">cool.sh</code> floating around,
            I have <code className="text-emerald-400">ntu.ydwu</code> — my university assistant.
            It knows who I am (persona.md), what it can do (skills/), and when to do it (cron 7am).
          </p>

          <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-[13px] font-mono overflow-x-auto">{`$ aide ps
INSTANCE    IMAGE         CRON
ntu.ydwu    ntu-student   1     # daily briefing at 7am
twitter.ydwu twitter      0     # posts when I ask
gmail.ydwu  gmail         0     # checks mail on demand`}</pre>

          <p>
            The mental model shift is subtle but powerful.
            A skill is a tool. An aide is a person.
            You don't ask a tool "what's happening today?" — you ask a person.
          </p>

          <p>
            When I type <code className="text-emerald-400">aide exec -p ntu.ydwu "what's due this week?"</code>,
            I'm not hunting for the right script. I'm asking my university assistant.
            It reads its persona, looks at its skills, and figures out what to call. That's its job.
          </p>

          <p>
            This morning at 7am, <code className="text-emerald-400">ntu.ydwu</code> sent me an email.
            No prompt needed. No terminal open. Just a daily briefing from my aide, sitting in my inbox,
            telling me what's due and who emailed me.
          </p>

          <p>
            I think this is the right abstraction. Not "agent" — that sounds like sci-fi.
            Not "bot" — that sounds like spam. An aide. A dedicated assistant with a specialty.
          </p>

          <p>
            If you're writing a skill you'll use every day, maybe what you actually want is an aide.
          </p>

          <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-[13px] font-mono overflow-x-auto">{`$ aide init my-aide
$ aide up
# now it runs in the background, doing its thing.`}</pre>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 text-sm text-zinc-500 font-mono">
          <p>— <a href="https://x.com/yiidtw" className="text-emerald-400 hover:text-emerald-300">@yiidtw</a></p>
          <p className="mt-2">
            <a href="https://aide.sh" className="text-zinc-400 hover:text-white transition">aide.sh</a> — deploy AI agents, just like Docker.
          </p>
        </div>
      </article>

      <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500 font-mono">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://x.com/yiidtw" className="hover:text-white transition">Twitter</a>
          <a href="https://github.com/yiidtw/aide" className="hover:text-white transition">GitHub</a>
          <a href="https://aide.sh" className="hover:text-white transition">aide.sh</a>
        </div>
      </footer>
    </main>
  );
}
