import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-nexus-border/50 bg-nexus-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-white">Nexus-OS Demo Builder</p>
            <p className="mt-2 text-sm text-zinc-500">
              Personalized AI life manager dashboards for productivity-obsessed power users.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-300">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/demo" className="text-zinc-500 hover:text-nexus-accent transition-colors">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-zinc-500 hover:text-nexus-accent transition-colors">
                  Developer Docs
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-zinc-500 hover:text-nexus-accent transition-colors">
                  How we found this idea
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-300">Built with</p>
            <p className="mt-3 text-sm text-zinc-500">
              Next.js 14 · Zustand · Framer Motion · Recharts · Tailwind CSS
            </p>
            <p className="mt-2 text-xs text-zinc-600">
              Zero-config Vercel deploy · No auth · No database
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-nexus-border/30 pt-6 text-center text-xs text-zinc-600">
          Demo built by Idea Miner · Not a validated business opportunity
        </div>
      </div>
    </footer>
  );
}
