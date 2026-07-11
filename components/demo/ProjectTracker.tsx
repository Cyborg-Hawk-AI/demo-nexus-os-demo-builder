"use client";

import { DevNote } from "@/components/ui/DevNote";
import { useNexusStore, type ProjectFilter } from "@/lib/store";
import type { Project } from "@/lib/seed-data";
import { formatCurrency } from "@/lib/utils";
import { Check, Circle, ChevronDown, ExternalLink } from "lucide-react";

const FILTERS: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "planning", label: "Planning" },
  { value: "paused", label: "Paused" },
  { value: "completed", label: "Completed" },
];

const STATUS_COLORS: Record<Project["status"], string> = {
  active: "text-nexus-green bg-nexus-green/10",
  planning: "text-nexus-amber bg-nexus-amber/10",
  paused: "text-zinc-400 bg-zinc-400/10",
  completed: "text-nexus-cyan bg-nexus-cyan/10",
};

const PRIORITY_COLORS: Record<Project["priority"], string> = {
  high: "border-l-nexus-rose",
  medium: "border-l-nexus-amber",
  low: "border-l-nexus-accent",
};

export function ProjectTracker() {
  const projects = useNexusStore((s) => s.projects);
  const projectFilter = useNexusStore((s) => s.projectFilter);
  const setProjectFilter = useNexusStore((s) => s.setProjectFilter);
  const selectedProjectId = useNexusStore((s) => s.selectedProjectId);
  const setSelectedProjectId = useNexusStore((s) => s.setSelectedProjectId);
  const toggleTask = useNexusStore((s) => s.toggleTask);
  const updateProjectStatus = useNexusStore((s) => s.updateProjectStatus);
  const openModal = useNexusStore((s) => s.openModal);

  const filtered =
    projectFilter === "all"
      ? projects
      : projects.filter((p) => p.status === projectFilter);

  const selected = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Project Tracker</h3>
          <DevNote
            note="Filterable project list with task checkboxes, status dropdowns, and detail panel."
            production="Linear/Jira API sync or native project DB with real-time collaboration."
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setProjectFilter(f.value)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                projectFilter === f.value
                  ? "bg-nexus-accent text-white"
                  : "bg-nexus-surface text-zinc-500 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Project list */}
        <div className="space-y-3">
          {filtered.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedProjectId(project.id)}
              className={`w-full text-left rounded-lg border-l-4 ${PRIORITY_COLORS[project.priority]} bg-nexus-surface/50 p-4 hover:bg-nexus-surface transition-colors ${
                selectedProjectId === project.id ? "ring-1 ring-nexus-accent" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-white">{project.name}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Due {project.dueDate}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_COLORS[project.status]}`}>
                  {project.status}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-nexus-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-nexus-accent transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs text-zinc-400">{project.progress}%</span>
              </div>
              {project.revenue !== undefined && project.revenue > 0 && (
                <p className="mt-2 text-xs text-nexus-green">
                  MRR {formatCurrency(project.revenue)}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="rounded-lg bg-nexus-surface/50 p-4">
          {selected ? (
            <>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{selected.name}</h4>
                <button
                  type="button"
                  onClick={() =>
                    openModal(
                      selected.name,
                      `Status: ${selected.status}\nProgress: ${selected.progress}%\nDue: ${selected.dueDate}\nPriority: ${selected.priority}`
                    )
                  }
                  className="text-zinc-500 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-zinc-500">Status:</span>
                <div className="relative">
                  <select
                    value={selected.status}
                    onChange={(e) =>
                      updateProjectStatus(
                        selected.id,
                        e.target.value as Project["status"]
                      )
                    }
                    className="appearance-none rounded-md bg-nexus-card border border-nexus-border px-3 py-1 pr-8 text-xs text-zinc-300 cursor-pointer"
                  >
                    <option value="active">Active</option>
                    <option value="planning">Planning</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {selected.tasks.map((task) => (
                  <li key={task.id}>
                    <button
                      type="button"
                      onClick={() => toggleTask(selected.id, task.id)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-nexus-card/50 transition-colors"
                    >
                      {task.done ? (
                        <Check className="h-4 w-4 text-nexus-green shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-zinc-600 shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          task.done ? "text-zinc-500 line-through" : "text-zinc-300"
                        }`}
                      >
                        {task.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
              Select a project to view tasks
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
