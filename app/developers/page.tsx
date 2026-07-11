import Link from "next/link";
import {
  Database,
  LayoutGrid,
  Terminal,
  Flame,
  FolderKanban,
  Store,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const FEATURES = [
  {
    icon: Database,
    name: "Personal Data Dashboard",
    location: "Demo → Overview tab",
    tryIt: "Click profile avatar, pet cards, health metrics, or activity feed rows",
    mocked:
      "Hardcoded USER, PETS, HEALTH, ACTIVITIES, REVENUE_CHART, FOCUS_CHART in lib/seed-data.ts. Single persona: Marcus Chen.",
    production:
      "Multi-step onboarding collects user profile, pets, location. PostgreSQL user table with JSON columns for flexible life data. SSR loads user context on each page.",
    dataFlow:
      "seed-data.ts → Zustand store (lib/store.ts) → React components. No persistence between sessions.",
  },
  {
    icon: Store,
    name: "Zustand State Store",
    location: "All demo pages",
    tryIt: "Toggle tasks, habits, DND, filters — state updates instantly with toast notifications",
    mocked:
      "Client-only Zustand store initialized from seed data. Toasts auto-dismiss after 3.5s. Activity feed prepends new entries.",
    production:
      "Zustand for UI state + React Query/SWR for server data. Optimistic updates with rollback on API failure. Persist middleware for sidebar preferences.",
    dataFlow:
      "User action → store mutation → UI re-render → (prod) debounced API PATCH → server confirmation.",
  },
  {
    icon: LayoutGrid,
    name: "Bento-Grid UI + Framer Motion",
    location: "Demo → Overview tab",
    tryIt: "Watch staggered entrance animations; click 'View all →' on revenue chart to jump to Finance",
    mocked:
      "Framer Motion staggerChildren on grid cards. Recharts AreaChart + BarChart with 6 months mock data.",
    production:
      "Server-rendered skeleton → client hydration with motion. Chart data from time-series API. Customizable widget layout (drag-and-drop grid).",
    dataFlow:
      "REVENUE_CHART / FOCUS_CHART constants → Recharts ResponsiveContainer → click handlers → setActiveView().",
  },
  {
    icon: Terminal,
    name: "Agentic AI Terminal",
    location: "Demo → AI Terminal tab (sidebar)",
    tryIt: "Type commands: status, habits, projects, schedule, focus, finance, pets, help, clear. Click suggestion chips.",
    mocked:
      "Keyword lookup in AI_RESPONSES map (lib/seed-data.ts). 'focus' command toggles DND. History stored in Zustand.",
    production:
      "Streaming LLM (Claude/GPT) with function-calling tools: get_calendar, get_habits, update_task, block_focus_time. Conversation memory in Redis.",
    dataFlow:
      "Input → trim/lowercase → AI_RESPONSES[key] → addTerminalEntry() + addActivity(). Prod: input → agent orchestrator → tool calls → streamed response.",
  },
  {
    icon: Flame,
    name: "Habit Heatmaps",
    location: "Demo → Habits tab",
    tryIt: "Switch habit tabs, click heatmap cells to toggle days, click 'About this habit'",
    mocked:
      "6 habits with 84-day boolean arrays (randomized at build). Streak/target are static. toggleHabitDay() flips cells in Zustand.",
    production:
      "Daily habit log table (user_id, habit_id, date, completed). Streak calculated via SQL window functions. Push reminders at user-configured times.",
    dataFlow:
      "HABITS seed → store.habits → heatmap renders 12-week slice → click → toggleHabitDay(habitId, dayIndex) → toast.",
  },
  {
    icon: FolderKanban,
    name: "Project Trackers",
    location: "Demo → Projects tab",
    tryIt: "Filter by status, select project card, check/uncheck tasks, change status dropdown",
    mocked:
      "4 projects with tasks in seed data. Progress recalculates on task toggle. Status dropdown calls updateProjectStatus().",
    production:
      "Projects synced from Linear/GitHub Issues or native CRUD API. Webhook on task completion triggers agent summary.",
    dataFlow:
      "PROJECTS seed → filtered by projectFilter → selectedProjectId detail panel → toggleTask() recalculates progress %.",
  },
  {
    icon: Database,
    name: "Finance Ledger",
    location: "Demo → Finance tab",
    tryIt: "Filter All/Income/Expenses, click summary cards, click table rows for detail modal",
    mocked:
      "8 transactions in FINANCES seed. Totals computed client-side. formatCurrency() helper.",
    production:
      "Plaid for bank transactions, Stripe for revenue, manual CSV import. Auto-categorization via rules engine.",
    dataFlow:
      "FINANCES → financeFilter → table render → row click → openModal(). Summary cards set filter on click.",
  },
  {
    icon: LayoutGrid,
    name: "Calendar Schedule",
    location: "Demo → Calendar tab",
    tryIt: "Click event titles for modal, click type badges to cycle meeting→focus→personal→health",
    mocked:
      "5 events for Jul 11, 2026. toggleEventType() cycles through 4 categories with toast feedback.",
    production:
      "Google Calendar OAuth with read/write scopes. Agent can create focus blocks. Timezone-aware rendering.",
    dataFlow:
      "CALENDAR seed → store.calendar → event click → modal. Badge click → toggleEventType(eventId).",
  },
];

const INTERACTIVE_CONTROLS = [
  { control: "Sidebar navigation", action: "Switches between 6 views with toast" },
  { control: "Sidebar collapse toggle", action: "Collapses/expands nav to icon-only" },
  { control: "DND bell icon (Overview)", action: "Toggles Do Not Disturb with toast" },
  { control: "DEV NOTE ⓘ icons", action: "Opens tooltip with mock vs production notes" },
  { control: "Modal 'Got it' button", action: "Closes detail modals" },
  { control: "Toast dismiss (X)", action: "Removes notification" },
  { control: "Terminal suggestion chips", action: "Runs canned command" },
  { control: "Terminal Clear button", action: "Resets history, shows welcome message" },
];

export const metadata = {
  title: "Developer Docs — Nexus-OS Demo Builder",
  description:
    "Feature documentation for the Nexus-OS interactive demo: what's mocked, what's real, and production integration notes.",
};

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <p className="text-sm font-medium text-nexus-accent">Developer Documentation</p>
        <h1 className="mt-2 text-3xl font-bold text-white">
          Nexus-OS Demo — Feature Reference
        </h1>
        <p className="mt-4 text-zinc-400 leading-relaxed">
          This page documents every interactive feature in the{" "}
          <Link href="/demo" className="text-nexus-accent hover:underline">
            live demo
          </Link>
          . Each section explains what it does, where to click, what is mocked vs. production,
          and the intended data flow for a real implementation.
        </p>
      </div>

      {/* Architecture overview */}
      <section className="mb-16 rounded-xl border border-nexus-border bg-nexus-card p-6">
        <h2 className="text-lg font-semibold text-white">Architecture</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-zinc-500">Stack</p>
            <p className="text-zinc-300 mt-1">
              Next.js 14 App Router · TypeScript · Tailwind CSS · Zustand · Framer Motion ·
              Recharts · Lucide Icons
            </p>
          </div>
          <div>
            <p className="text-zinc-500">Deployment</p>
            <p className="text-zinc-300 mt-1">
              Zero-config Vercel · No env vars · No auth · No database · No API routes
            </p>
          </div>
          <div>
            <p className="text-zinc-500">State</p>
            <p className="text-zinc-300 mt-1">
              <code className="text-nexus-cyan text-xs">lib/store.ts</code> (Zustand) initialized
              from <code className="text-nexus-cyan text-xs">lib/seed-data.ts</code>
            </p>
          </div>
          <div>
            <p className="text-zinc-500">Key directories</p>
            <p className="text-zinc-300 mt-1 text-xs font-mono">
              app/demo/ · components/demo/ · components/ui/DevNote.tsx
            </p>
          </div>
        </div>
        <Link
          href="/demo"
          className="mt-6 inline-flex items-center gap-2 text-sm text-nexus-accent hover:text-nexus-accent-hover"
        >
          Open live demo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Feature docs */}
      <div className="space-y-8">
        {FEATURES.map((feature, i) => (
          <section
            key={feature.name}
            className="rounded-xl border border-nexus-border bg-nexus-card p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-nexus-accent/10 text-nexus-accent">
                <feature.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-600">#{i + 1}</span>
                  <h2 className="text-lg font-semibold text-white">{feature.name}</h2>
                </div>
                <p className="mt-1 text-xs text-nexus-cyan">{feature.location}</p>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  How to try it
                </p>
                <p className="mt-1 text-zinc-300">{feature.tryIt}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-nexus-amber">
                  Mocked in demo
                </p>
                <p className="mt-1 text-zinc-400">{feature.mocked}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-nexus-green">
                  Production implementation
                </p>
                <p className="mt-1 text-zinc-400">{feature.production}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-nexus-accent">
                  Data flow
                </p>
                <p className="mt-1 text-zinc-500 font-mono text-xs">{feature.dataFlow}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Interactive controls table */}
      <section className="mt-16 rounded-xl border border-nexus-border bg-nexus-card p-6">
        <h2 className="text-lg font-semibold text-white">All Interactive Controls</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Every control in the demo produces a visible response — no dead buttons.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nexus-border text-left text-xs text-zinc-500">
                <th className="pb-3 pr-4">Control</th>
                <th className="pb-3">Visible response</th>
              </tr>
            </thead>
            <tbody>
              {INTERACTIVE_CONTROLS.map((row) => (
                <tr key={row.control} className="border-b border-nexus-border/30">
                  <td className="py-3 pr-4 text-zinc-300">{row.control}</td>
                  <td className="py-3 text-zinc-500">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/research"
          className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-nexus-accent"
        >
          Read how we found this idea
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
