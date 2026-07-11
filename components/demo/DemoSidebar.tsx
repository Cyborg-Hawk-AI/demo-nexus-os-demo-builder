"use client";

import { useNexusStore, type DemoView } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Flame,
  FolderKanban,
  DollarSign,
  Terminal,
  Calendar,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";

const NAV: { view: DemoView; label: string; icon: typeof LayoutDashboard }[] = [
  { view: "overview", label: "Overview", icon: LayoutDashboard },
  { view: "habits", label: "Habits", icon: Flame },
  { view: "projects", label: "Projects", icon: FolderKanban },
  { view: "finance", label: "Finance", icon: DollarSign },
  { view: "calendar", label: "Calendar", icon: Calendar },
  { view: "terminal", label: "AI Terminal", icon: Terminal },
];

export function DemoSidebar() {
  const activeView = useNexusStore((s) => s.activeView);
  const setActiveView = useNexusStore((s) => s.setActiveView);
  const sidebarCollapsed = useNexusStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useNexusStore((s) => s.toggleSidebar);

  return (
    <aside
      className={cn(
        "shrink-0 border-r border-nexus-border bg-nexus-surface/50 flex flex-col transition-all duration-200",
        sidebarCollapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex items-center justify-between p-3 border-b border-nexus-border/50">
        {!sidebarCollapsed && (
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Navigation
          </span>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-md p-1.5 text-zinc-500 hover:text-white hover:bg-nexus-card transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {NAV.map((item) => (
          <button
            key={item.view}
            type="button"
            onClick={() => setActiveView(item.view)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              activeView === item.view
                ? "bg-nexus-accent/20 text-nexus-accent-hover"
                : "text-zinc-400 hover:text-white hover:bg-nexus-card"
            )}
            title={item.label}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      {!sidebarCollapsed && (
        <div className="p-3 border-t border-nexus-border/50">
          <p className="text-[10px] text-zinc-600 leading-relaxed">
            Zustand store · Mock data · Click{" "}
            <span className="text-nexus-accent">ⓘ</span> for dev notes
          </p>
        </div>
      )}
    </aside>
  );
}
