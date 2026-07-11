"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DevNote } from "@/components/ui/DevNote";
import { USER, PETS, HEALTH, REVENUE_CHART, FOCUS_CHART } from "@/lib/seed-data";
import { useNexusStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import {
  MapPin,
  Bell,
  BellOff,
  TrendingUp,
  Activity,
  Heart,
  Dog,
  Cat,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function BentoGrid() {
  const activities = useNexusStore((s) => s.activities);
  const dndEnabled = useNexusStore((s) => s.dndEnabled);
  const toggleDnd = useNexusStore((s) => s.toggleDnd);
  const openModal = useNexusStore((s) => s.openModal);
  const setActiveView = useNexusStore((s) => s.setActiveView);

  const totalIncome = REVENUE_CHART[REVENUE_CHART.length - 1].mrr;
  const totalExpenses = REVENUE_CHART[REVENUE_CHART.length - 1].expenses;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(120px,auto)]"
    >
      {/* Profile card */}
      <motion.div
        variants={item}
        className="lg:col-span-2 lg:row-span-2 glass rounded-xl p-5 flex flex-col"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                openModal(
                  "Profile",
                  `${USER.name}\n${USER.title}\n${USER.email}\n\nRelocated from ${USER.relocatedFrom} to ${USER.location}.\n\n${USER.bio}`
                )
              }
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-nexus-accent to-nexus-cyan text-lg font-bold text-white hover:opacity-90 transition-opacity"
            >
              {USER.avatar}
            </button>
            <div>
              <h2 className="text-xl font-semibold text-white">{USER.name}</h2>
              <p className="text-sm text-zinc-500">{USER.title}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-zinc-600">
                <MapPin className="h-3 w-3" />
                {USER.location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DevNote
              note="Single-user profile card with hardcoded persona data (Marcus Chen, Brazil relocation)."
              production="User profile from auth provider + onboarding wizard; editable fields synced to DB."
            />
            <button
              type="button"
              onClick={toggleDnd}
              className={`rounded-lg p-2 transition-colors ${
                dndEnabled
                  ? "bg-nexus-rose/20 text-nexus-rose"
                  : "bg-nexus-card text-zinc-500 hover:text-white"
              }`}
              title="Toggle Do Not Disturb"
            >
              {dndEnabled ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-400 flex-1">{USER.bio}</p>
        <div className="mt-4 flex gap-3">
          {PETS.map((pet) => (
            <button
              key={pet.name}
              type="button"
              onClick={() =>
                openModal(
                  `${pet.name} — ${pet.species}`,
                  `Mood: ${pet.mood}\nLast fed: ${pet.lastFed}\nNext vet: ${pet.vetNext}`
                )
              }
              className="flex items-center gap-2 rounded-lg bg-nexus-surface px-3 py-2 text-xs hover:bg-nexus-border/50 transition-colors"
            >
              {pet.species.includes("Cat") ? (
                <Cat className="h-3.5 w-3.5 text-nexus-amber" />
              ) : (
                <Dog className="h-3.5 w-3.5 text-nexus-cyan" />
              )}
              <span className="text-zinc-300">{pet.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Revenue chart */}
      <motion.div variants={item} className="lg:col-span-2 glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-zinc-300">Revenue vs Expenses</h3>
            <DevNote
              note="Recharts area chart with 6 months of mock MRR/expense data."
              production="Plaid/Stripe webhooks → time-series DB → aggregated monthly rollups."
            />
          </div>
          <button
            type="button"
            onClick={() => setActiveView("finance")}
            className="text-xs text-nexus-accent hover:text-nexus-accent-hover"
          >
            View all →
          </button>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_CHART}>
              <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip
                contentStyle={{
                  background: "#1a1a26",
                  border: "1px solid #2a2a3a",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="mrr" stroke="#34d399" fill="#34d399" fillOpacity={0.15} name="MRR" />
              <Area type="monotone" dataKey="expenses" stroke="#fb7185" fill="#fb7185" fillOpacity={0.1} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex gap-4 text-xs">
          <span className="text-nexus-green">MRR {formatCurrency(totalIncome)}</span>
          <span className="text-nexus-rose">Expenses {formatCurrency(-totalExpenses)}</span>
        </div>
      </motion.div>

      {/* Health metrics */}
      <motion.div variants={item} className="glass rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="h-4 w-4 text-nexus-rose" />
          <h3 className="text-sm font-medium text-zinc-300">Health</h3>
          <DevNote
            note="Static health metrics from mock Apple Health / Whoop data."
            production="OAuth to Apple Health, Oura, Whoop APIs with daily sync cron."
          />
        </div>
        <div className="space-y-2">
          {HEALTH.map((m) => (
            <button
              key={m.label}
              type="button"
              onClick={() =>
                openModal(m.label, `Current: ${m.value}\nTrend: ${m.trend}\nChange: ${m.change}`)
              }
              className="flex w-full items-center justify-between rounded-lg bg-nexus-surface/50 px-3 py-2 text-xs hover:bg-nexus-surface transition-colors"
            >
              <span className="text-zinc-500">{m.label}</span>
              <span className="flex items-center gap-2">
                <span className="text-white font-medium">{m.value}</span>
                <TrendingUp
                  className={`h-3 w-3 ${
                    m.trend === "up"
                      ? "text-nexus-green"
                      : m.trend === "down"
                        ? "text-nexus-rose"
                        : "text-zinc-500"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Focus chart */}
      <motion.div variants={item} className="glass rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-sm font-medium text-zinc-300">Weekly Focus Hours</h3>
          <DevNote
            note="Bar chart of deep work hours per day — mock RescueTime data."
            production="RescueTime/Toggl API integration with focus score algorithm."
          />
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={FOCUS_CHART}>
              <XAxis dataKey="day" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Activity feed */}
      <motion.div variants={item} className="lg:col-span-2 glass rounded-xl p-5 max-h-64 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3 sticky top-0 bg-nexus-card/90 pb-2">
          <Activity className="h-4 w-4 text-nexus-cyan" />
          <h3 className="text-sm font-medium text-zinc-300">Activity Feed</h3>
          <DevNote
            note="Live-updating feed from Zustand store. New entries added on user actions."
            production="Event sourcing with WebSocket push from agent actions and integrations."
          />
        </div>
        <div className="space-y-2">
          {activities.slice(0, 8).map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => openModal(a.action, `${a.time}\n\n${a.detail}`)}
              className="flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left hover:bg-nexus-surface/50 transition-colors"
            >
              <span
                className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                  a.type === "ai"
                    ? "bg-nexus-accent"
                    : a.type === "habit"
                      ? "bg-nexus-green"
                      : a.type === "project"
                        ? "bg-nexus-cyan"
                        : a.type === "finance"
                          ? "bg-nexus-amber"
                          : "bg-zinc-500"
                }`}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-300">{a.action}</span>
                  <span className="text-[10px] text-zinc-600 shrink-0">{a.time}</span>
                </div>
                <p className="text-xs text-zinc-500 truncate">{a.detail}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
