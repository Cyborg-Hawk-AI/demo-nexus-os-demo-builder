"use client";

import { useNexusStore } from "@/lib/store";
import { BentoGrid } from "./BentoGrid";
import { HabitHeatmap } from "./HabitHeatmap";
import { ProjectTracker } from "./ProjectTracker";
import { AiTerminal } from "./AiTerminal";
import { FinanceView } from "./FinanceView";
import { CalendarView } from "./CalendarView";
import { DemoSidebar } from "./DemoSidebar";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { Modal } from "@/components/ui/Modal";
import { DevNote } from "@/components/ui/DevNote";

export function DemoDashboard() {
  const activeView = useNexusStore((s) => s.activeView);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-nexus-bg">
      <DemoSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="border-b border-nexus-border/50 bg-nexus-surface/30 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white capitalize">
                {activeView === "terminal" ? "AI Terminal" : activeView}
              </h1>
              <p className="text-xs text-zinc-500">
                Marcus Chen&apos;s Nexus-OS · Florianópolis, Brazil
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DevNote
                note="Main demo shell with sidebar navigation. All state managed by Zustand store with seed data."
                production="Authenticated layout with user-specific data loading, SSR hydration, and role-based views."
              />
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-nexus-green/10 px-2.5 py-1 text-[10px] text-nexus-green">
                <span className="h-1.5 w-1.5 rounded-full bg-nexus-green animate-pulse" />
                Live mock
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {activeView === "overview" && <BentoGrid />}
          {activeView === "habits" && <HabitHeatmap />}
          {activeView === "projects" && <ProjectTracker />}
          {activeView === "finance" && <FinanceView />}
          {activeView === "calendar" && <CalendarView />}
          {activeView === "terminal" && <AiTerminal />}
        </div>
      </div>
      <ToastContainer />
      <Modal />
    </div>
  );
}
