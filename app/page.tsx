import Link from "next/link";
import {
  Terminal,
  LayoutGrid,
  Flame,
  FolderKanban,
  Database,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

const FEATURES = [
  {
    icon: Database,
    title: "Personal Data Dashboard",
    description:
      "Hardcoded life data for Marcus Chen — solo founder in Florianópolis with pets, projects, and finances in one view.",
  },
  {
    icon: LayoutGrid,
    title: "Bento-Grid UI",
    description:
      "Framer Motion animated bento layout with health metrics, calendar, activity feed, and revenue charts.",
  },
  {
    icon: Terminal,
    title: "Agentic AI Terminal",
    description:
      "Type commands like status, habits, focus — get canned agent responses that simulate a real life manager AI.",
  },
  {
    icon: Flame,
    title: "Habit Heatmaps",
    description:
      "GitHub-style contribution grids for 6 habits with streaks, toggles, and completion history.",
  },
  {
    icon: FolderKanban,
    title: "Project Trackers",
    description:
      "Kanban-style project cards with tasks, filters, status updates, and progress bars.",
  },
];

const PRICING_TIERS = [
  {
    name: "Demo Preview",
    price: "Free",
    description: "Interactive mock — what you're looking at now",
    features: [
      "Full bento dashboard",
      "AI terminal (canned)",
      "Habit heatmaps",
      "Project tracker",
      "Zero backend required",
    ],
    cta: "Try Live Demo",
    href: "/demo",
    highlighted: true,
  },
  {
    name: "Custom Build",
    price: "TBD",
    description: "Hypothetical — no pricing model validated",
    features: [
      "Personalized data model",
      "Calendar + finance APIs",
      "Real AI agent (LLM)",
      "Mobile-responsive PWA",
      "White-label option",
    ],
    cta: "View Research",
    href: "/research",
    highlighted: false,
  },
  {
    name: "SaaS Platform",
    price: "N/A",
    description: "Would require multi-tenant architecture",
    features: [
      "User onboarding flows",
      "Stripe billing",
      "Data integrations",
      "Customer support",
      "Not validated as business",
    ],
    cta: "Developer Docs",
    href: "/developers",
    highlighted: false,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nexus-accent/20 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-nexus-cyan/5 blur-3xl" />
        <div className="absolute top-40 right-1/4 h-96 w-96 rounded-full bg-nexus-accent/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-nexus-border bg-nexus-card/50 px-4 py-1.5 text-xs text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-nexus-green animate-pulse" />
              Interactive demo · Zero backend · Deploys on Vercel
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Your life, one{" "}
              <span className="text-gradient">personal OS</span> dashboard
            </h1>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
              Nexus-OS Demo Builder sells personalized AI life manager dashboard demos
              to productivity-obsessed power users — solo founders, digital nomads, and
              high-agency individuals who want a bespoke command center for their life.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-nexus-accent px-6 py-3 text-sm font-semibold text-white hover:bg-nexus-accent-hover transition-colors glow-accent"
              >
                Launch Live Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/developers"
                className="inline-flex items-center gap-2 rounded-lg border border-nexus-border px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-nexus-card transition-colors"
              >
                Developer Documentation
              </Link>
            </div>
          </div>

          {/* Preview card */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="rounded-xl border border-nexus-border bg-nexus-card/50 p-1 glow-accent">
              <div className="rounded-lg bg-nexus-surface p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-nexus-rose/80" />
                  <div className="h-3 w-3 rounded-full bg-nexus-amber/80" />
                  <div className="h-3 w-3 rounded-full bg-nexus-green/80" />
                  <span className="ml-2 text-xs text-zinc-600 font-mono">nexus-os.demo</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "MRR", value: "$4,200", color: "text-nexus-green" },
                    { label: "Habits", value: "4/6 today", color: "text-nexus-cyan" },
                    { label: "Projects", value: "3 active", color: "text-nexus-accent" },
                    { label: "Focus", value: "82/100", color: "text-nexus-amber" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg bg-nexus-card p-3 text-center">
                      <p className="text-xs text-zinc-500">{stat.label}</p>
                      <p className={`text-lg font-semibold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-nexus-border/50 bg-nexus-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Core MVP Features</h2>
            <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
              Every feature is fully interactive in the demo — hardcoded data, real UI
              state, zero dead controls.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-nexus-border bg-nexus-card p-6 hover:border-nexus-accent/40 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nexus-accent/10 text-nexus-accent group-hover:bg-nexus-accent/20 transition-colors">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Pricing</h2>
            <p className="mt-4 text-zinc-500">
              No validated pricing model exists — these tiers illustrate the product vision.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl border p-6 flex flex-col ${
                  tier.highlighted
                    ? "border-nexus-accent bg-nexus-accent/5 glow-accent"
                    : "border-nexus-border bg-nexus-card"
                }`}
              >
                <h3 className="font-semibold text-white">{tier.name}</h3>
                <p className="mt-2 text-3xl font-bold text-white">{tier.price}</p>
                <p className="mt-2 text-sm text-zinc-500">{tier.description}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                      <Check className="h-4 w-4 text-nexus-green shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`mt-6 block text-center rounded-lg py-2.5 text-sm font-medium transition-colors ${
                    tier.highlighted
                      ? "bg-nexus-accent text-white hover:bg-nexus-accent-hover"
                      : "border border-nexus-border text-zinc-300 hover:bg-nexus-surface"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation honesty */}
      <section className="border-t border-nexus-border/50 bg-nexus-surface/30 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-xl font-semibold text-white">Honest validation status</h2>
          <p className="mt-3 text-sm text-zinc-500">
            This idea scored 14/130 on our rubric with only 1/9 validation checks passed.
            Notion, Obsidian, Sunsama, and Akiflow already serve this market.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              "MVP < 4 weeks",
            ].map((passed) => (
              <span
                key={passed}
                className="inline-flex items-center gap-1 rounded-full bg-nexus-green/10 px-3 py-1 text-xs text-nexus-green"
              >
                <Check className="h-3 w-3" /> {passed}
              </span>
            ))}
            {[
              "10+ pain posts",
              "Paying customers",
              "Hair-on-fire problem",
            ].map((failed) => (
              <span
                key={failed}
                className="inline-flex items-center gap-1 rounded-full bg-nexus-rose/10 px-3 py-1 text-xs text-nexus-rose"
              >
                <X className="h-3 w-3" /> {failed}
              </span>
            ))}
          </div>
          <Link
            href="/research"
            className="mt-6 inline-flex items-center gap-1 text-sm text-nexus-accent hover:text-nexus-accent-hover"
          >
            Read the full research story
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            See Marcus Chen&apos;s personal OS in action
          </h2>
          <p className="mt-4 text-zinc-500">
            Fully populated mock data. Every button works. No signup required.
          </p>
          <Link
            href="/demo"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-nexus-accent px-8 py-3 text-sm font-semibold text-white hover:bg-nexus-accent-hover transition-colors"
          >
            Open Interactive Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
