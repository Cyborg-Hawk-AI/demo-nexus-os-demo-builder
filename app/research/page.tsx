import Link from "next/link";
import { Check, X, ExternalLink, ArrowRight } from "lucide-react";

const CHECKLIST = [
  { label: "10+ posts with this pain", passed: false },
  { label: "Paying for inferior solution", passed: false },
  { label: "Reachable channel", passed: false },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: false },
  { label: "Hair-on-fire problem", passed: false },
  { label: "Can pre-sell", passed: false },
  { label: "< 3 competitors", passed: false },
  { label: "Low-maintenance ops (mailbox money)", passed: false },
];

const PAIN_POINTS = [
  {
    title: "Building full frontend (with mocks) on Vercel V0 first - smart or tech debt trap?",
    url: "https://www.reddit.com/r/vibecoding/comments/1n7tc6u/building_full_frontend_with_mocks_on_vercel_v0/",
    snippet:
      "Strategy to build entire UI with mocked data first, then integrate backend gradually. Validates the mock-first approach used in this demo.",
    source: "reddit",
  },
  {
    title: "I already have the backend done, what is your best approach when it comes to building a ui",
    url: "https://www.reddit.com/r/Frontend/comments/1edh73q/i_already_have_the_backend_done_what_is_your_best/",
    snippet:
      "Mock the whole user experience first. Code static pages, then add interactivity page by page. Build and deploy often.",
    source: "reddit",
  },
  {
    title: "After building 10+ projects with AI, here's how to actually design great looking UIs fast",
    url: "https://www.reddit.com/r/PromptEngineering/comments/1mf7pnx/after_building_10_projects_with_ai_heres_how_to/",
    snippet:
      "Zoom-In Method: rough draft → refinement → detailing. Comprehensive context documents improve AI output quality.",
    source: "reddit",
  },
  {
    title: "The Agentic Frontend",
    url: "https://www.reddit.com/r/AI_Agents/comments/1op8tgo/the_agentic_frontend/",
    snippet: "Discussion of agent-driven frontend patterns — relevant to the AI terminal feature in this demo.",
    source: "reddit",
  },
];

export const metadata = {
  title: "Research — How We Found This Idea",
  description:
    "The research story behind Nexus-OS Demo Builder: validation results, competitive landscape, and source pain points.",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <p className="text-sm font-medium text-nexus-accent">Research Story</p>
        <h1 className="mt-2 text-3xl font-bold text-white">
          How we found this idea
        </h1>
        <p className="mt-4 text-zinc-400 leading-relaxed">
          Nexus-OS Demo Builder was auto-built by the Idea Miner pipeline. This page
          documents the research, validation, and honest assessment behind the concept.
        </p>
      </div>

      {/* Origin story */}
      <section className="mb-12 rounded-xl border border-nexus-border bg-nexus-card p-6">
        <h2 className="text-lg font-semibold text-white">Why this exists</h2>
        <div className="mt-4 space-y-4 text-sm text-zinc-400 leading-relaxed">
          <p>
            The user submitted a detailed engineering prompt — not a business idea — asking
            for a React/Next.js personal dashboard built around one person&apos;s life data
            (relocation to Brazil, specific pets, specific projects). The web evidence gathered
            is entirely about frontend development best practices and has zero signal about
            market demand for this concept as a product.
          </p>
          <p>
            There is no pain point articulated beyond &ldquo;I want a cool personal dashboard.&rdquo;
            No Reddit posts show people paying for bespoke life manager UIs, and the evidence
            does not support a recurring revenue opportunity.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-nexus-surface px-3 py-1 text-xs text-zinc-400">
            Cluster: user-submitted
          </span>
          <span className="rounded-full bg-nexus-rose/10 px-3 py-1 text-xs text-nexus-rose">
            Rubric score: 14/130
          </span>
          <span className="rounded-full bg-nexus-amber/10 px-3 py-1 text-xs text-nexus-amber">
            Validation: 1/9 checks passed
          </span>
        </div>
      </section>

      {/* Target customer */}
      <section className="mb-12 rounded-xl border border-nexus-border bg-nexus-card p-6">
        <h2 className="text-lg font-semibold text-white">Target customer</h2>
        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
          Solo founders, digital nomads, and high-agency individuals who want a bespoke
          personal OS dashboard — <strong className="text-zinc-300">not a real scalable segment
          with validated willingness to pay</strong>. None identified — the aesthetic choices
          (cyberpunk, dark mode, Framer Motion) are table stakes in 2025 and do not constitute
          a moat.
        </p>
      </section>

      {/* Competitive landscape */}
      <section className="mb-12 rounded-xl border border-nexus-border bg-nexus-card p-6">
        <h2 className="text-lg font-semibold text-white">Competitive landscape</h2>
        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
          Notion, Obsidian, Sunsama, Akiflow, and dozens of personal productivity dashboards
          already exist with real user bases and recurring revenue. No go-to-market strategy
          was identified — this is a personal tool prompt, not a go-to-market strategy.
        </p>
      </section>

      {/* Automation playbook */}
      <section className="mb-12 rounded-xl border border-nexus-border bg-nexus-card p-6">
        <h2 className="text-lg font-semibold text-white">
          How this business runs itself (mailbox money)
        </h2>
        <p className="mt-2 text-xs text-zinc-500">
          The goal is passive, low-maintenance recurring revenue: AI is how we build and
          operate the business, not necessarily what it sells.
        </p>
        <div className="mt-4 space-y-4 text-sm text-zinc-400 leading-relaxed">
          <p>
            There is no automation playbook because there is no business. If this were pivoted
            into a &lsquo;build your own personal OS dashboard&rsquo; SaaS, it would require
            onboarding flows, data integrations (calendar, finance, health APIs), multi-tenant
            architecture, and customer support — none of which are trivial.
          </p>
          <p>
            Estimated owner hours per week in current form: <strong className="text-white">0</strong>{" "}
            (it&apos;s a static demo) but also <strong className="text-nexus-rose">$0 revenue</strong>.
          </p>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg bg-nexus-surface p-4">
            <p className="text-xs text-zinc-500">Estimated owner time</p>
            <p className="text-2xl font-bold text-white mt-1">~0 hr/week</p>
          </div>
          <div className="rounded-lg bg-nexus-surface p-4">
            <p className="text-xs text-zinc-500">MVP estimate</p>
            <p className="text-sm text-zinc-300 mt-1">
              Next.js + Zustand + Framer Motion + Recharts; 1-2 weeks for the demo
            </p>
          </div>
        </div>
      </section>

      {/* Validation checklist */}
      <section className="mb-12 rounded-xl border border-nexus-border bg-nexus-card p-6">
        <h2 className="text-lg font-semibold text-white">Validation checklist (1/9)</h2>
        <ul className="mt-4 space-y-2">
          {CHECKLIST.map((item) => (
            <li key={item.label} className="flex items-center gap-3 text-sm">
              {item.passed ? (
                <Check className="h-4 w-4 text-nexus-green shrink-0" />
              ) : (
                <X className="h-4 w-4 text-nexus-rose/60 shrink-0" />
              )}
              <span className={item.passed ? "text-zinc-300" : "text-zinc-500"}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Source pain points */}
      <section className="mb-12 rounded-xl border border-nexus-border bg-nexus-card p-6">
        <h2 className="text-lg font-semibold text-white">Source pain points (real posts)</h2>
        <p className="mt-2 text-xs text-zinc-500">
          Evidence gathered relates to frontend development practices, not market demand for
          personal OS dashboards.
        </p>
        <div className="mt-6 space-y-4">
          {PAIN_POINTS.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-nexus-surface p-4 hover:bg-nexus-surface/80 transition-colors group"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-zinc-300 group-hover:text-white">
                  {post.title}
                </h3>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-600 shrink-0 mt-0.5" />
              </div>
              <p className="mt-2 text-xs text-zinc-500 line-clamp-2">{post.snippet}</p>
              <span className="mt-2 inline-block text-[10px] text-zinc-600 uppercase">
                {post.source}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* About Idea Miner */}
      <section className="mb-12 rounded-xl border border-nexus-border bg-nexus-card p-6">
        <h2 className="text-lg font-semibold text-white">About this program</h2>
        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
          This demo was auto-built by the <strong className="text-zinc-300">Idea Miner</strong>{" "}
          pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack
          Exchange, and GitHub for real people describing real pain, scores the opportunities,
          and automatically ships a working mock of every idea that passes validation (≥8/9
          checks, momentum not declining, not previously built). The bar for every idea:
          low-maintenance recurring revenue that a solo owner can run in a few hours a week.
        </p>
        <p className="mt-4 text-xs text-zinc-600">
          Generated by Idea Miner run 2026-07-11-am on 2026-07-11 05:32 UTC
        </p>
      </section>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 rounded-lg bg-nexus-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-nexus-accent-hover transition-colors"
        >
          Try the interactive demo
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/developers"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-nexus-accent"
        >
          Developer documentation
        </Link>
      </div>
    </div>
  );
}
