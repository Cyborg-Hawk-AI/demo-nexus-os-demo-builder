"use client";

import { DevNote } from "@/components/ui/DevNote";
import { useNexusStore } from "@/lib/store";

const LEVELS = [
  "bg-nexus-surface",
  "bg-nexus-accent/30",
  "bg-nexus-accent/50",
  "bg-nexus-accent/70",
  "bg-nexus-accent",
];

function getLevel(completed: boolean, index: number, total: number): string {
  if (!completed) return LEVELS[0];
  const recent = index >= total - 14;
  if (recent) return LEVELS[4];
  return LEVELS[2];
}

export function HabitHeatmap() {
  const habits = useNexusStore((s) => s.habits);
  const selectedHabitId = useNexusStore((s) => s.selectedHabitId);
  const setSelectedHabitId = useNexusStore((s) => s.setSelectedHabitId);
  const toggleHabitDay = useNexusStore((s) => s.toggleHabitDay);
  const openModal = useNexusStore((s) => s.openModal);

  const selected = habits.find((h) => h.id === selectedHabitId) ?? habits[0];
  const weeks = 12;
  const daysPerWeek = 7;
  const displayDays = selected.history.slice(-weeks * daysPerWeek);

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Habit Heatmaps</h3>
          <DevNote
            note="GitHub-style contribution grid. Click cells to toggle completion. Select habits via tabs."
            production="Habit tracking DB with daily cron reminders via push/email; streak calculation server-side."
          />
        </div>
      </div>

      {/* Habit tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {habits.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setSelectedHabitId(h.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedHabitId === h.id
                ? "bg-nexus-accent text-white"
                : "bg-nexus-surface text-zinc-400 hover:text-white"
            }`}
          >
            {h.name}
            <span className="ml-1.5 text-nexus-amber">🔥{h.streak}</span>
          </button>
        ))}
      </div>

      {/* Selected habit stats */}
      <div className="flex items-center gap-6 mb-4 text-sm">
        <div>
          <span className="text-zinc-500">Streak</span>
          <p className="text-xl font-bold text-nexus-amber">{selected.streak} days</p>
        </div>
        <div>
          <span className="text-zinc-500">Target</span>
          <p className="text-xl font-bold text-white">{selected.target}x / week</p>
        </div>
        <div>
          <span className="text-zinc-500">Completion</span>
          <p className="text-xl font-bold text-nexus-green">
            {Math.round(
              (selected.history.filter(Boolean).length / selected.history.length) * 100
            )}
            %
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            openModal(
              selected.name,
              `12-week completion grid for "${selected.name}".\nStreak: ${selected.streak} days.\nClick any cell to toggle that day's status.`
            )
          }
          className="ml-auto text-xs text-nexus-accent hover:text-nexus-accent-hover"
        >
          About this habit
        </button>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex gap-[3px]">
          {Array.from({ length: weeks }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-[3px]">
              {Array.from({ length: daysPerWeek }).map((_, dayIdx) => {
                const idx = weekIdx * daysPerWeek + dayIdx;
                const completed = displayDays[idx] ?? false;
                return (
                  <button
                    key={dayIdx}
                    type="button"
                    onClick={() => toggleHabitDay(selected.id, selected.history.length - displayDays.length + idx)}
                    className={`h-3 w-3 rounded-sm ${getLevel(completed, idx, displayDays.length)} hover:ring-1 hover:ring-nexus-accent transition-all`}
                    title={`Day ${idx + 1}: ${completed ? "Done" : "Missed"}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-[10px] text-zinc-600">
        Last 12 weeks · Click cells to toggle · Data from Zustand store
      </p>
    </div>
  );
}
