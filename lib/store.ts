import { create } from "zustand";
import {
  PROJECTS,
  HABITS,
  FINANCES,
  ACTIVITIES,
  CALENDAR,
  type Project,
} from "./seed-data";

export type DemoView = "overview" | "habits" | "projects" | "finance" | "terminal" | "calendar";
export type FinanceFilter = "all" | "income" | "expense";
export type ProjectFilter = "all" | "active" | "planning" | "completed" | "paused";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
}

interface NexusStore {
  activeView: DemoView;
  setActiveView: (view: DemoView) => void;

  projects: Project[];
  toggleTask: (projectId: string, taskId: string) => void;
  updateProjectStatus: (projectId: string, status: Project["status"]) => void;
  projectFilter: ProjectFilter;
  setProjectFilter: (filter: ProjectFilter) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;

  habits: typeof HABITS;
  toggleHabitDay: (habitId: string, dayIndex: number) => void;
  selectedHabitId: string | null;
  setSelectedHabitId: (id: string | null) => void;

  finances: typeof FINANCES;
  financeFilter: FinanceFilter;
  setFinanceFilter: (filter: FinanceFilter) => void;

  activities: typeof ACTIVITIES;
  addActivity: (activity: Omit<(typeof ACTIVITIES)[0], "id">) => void;

  calendar: typeof CALENDAR;
  toggleEventType: (eventId: string) => void;

  terminalHistory: { input: string; output: string }[];
  addTerminalEntry: (input: string, output: string) => void;
  clearTerminal: () => void;

  toasts: Toast[];
  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  dndEnabled: boolean;
  toggleDnd: () => void;

  modalOpen: boolean;
  modalContent: { title: string; body: string } | null;
  openModal: (title: string, body: string) => void;
  closeModal: () => void;
}

export const useNexusStore = create<NexusStore>((set, get) => ({
  activeView: "overview",
  setActiveView: (view) => {
    set({ activeView: view });
    get().addToast(`Switched to ${view} view`, "info");
  },

  projects: PROJECTS,
  toggleTask: (projectId, taskId) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const tasks = p.tasks.map((t) =>
          t.id === taskId ? { ...t, done: !t.done } : t
        );
        const doneCount = tasks.filter((t) => t.done).length;
        return { ...p, tasks, progress: Math.round((doneCount / tasks.length) * 100) };
      }),
    }));
    get().addToast("Task updated", "success");
    get().addActivity({
      time: "Just now",
      action: "Task toggled",
      detail: "Updated task in project",
      type: "project",
    });
  },
  updateProjectStatus: (projectId, status) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, status } : p
      ),
    }));
    get().addToast(`Project status → ${status}`, "success");
  },
  projectFilter: "all",
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  selectedProjectId: null,
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),

  habits: HABITS,
  toggleHabitDay: (habitId, dayIndex) => {
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === habitId
          ? { ...h, history: h.history.map((v, i) => (i === dayIndex ? !v : v)) }
          : h
      ),
    }));
    get().addToast("Habit day toggled", "success");
  },
  selectedHabitId: "h1",
  setSelectedHabitId: (id) => set({ selectedHabitId: id }),

  finances: FINANCES,
  financeFilter: "all",
  setFinanceFilter: (filter) => set({ financeFilter: filter }),

  activities: ACTIVITIES,
  addActivity: (activity) => {
    set((state) => ({
      activities: [
        { ...activity, id: `a-${Date.now()}` },
        ...state.activities.slice(0, 19),
      ],
    }));
  },

  calendar: CALENDAR,
  toggleEventType: (eventId) => {
    set((state) => ({
      calendar: state.calendar.map((e) =>
        e.id === eventId
          ? {
              ...e,
              type:
                e.type === "focus"
                  ? "meeting"
                  : e.type === "meeting"
                    ? "personal"
                    : e.type === "personal"
                      ? "health"
                      : "focus",
            }
          : e
      ),
    }));
    get().addToast("Event type cycled", "info");
  },

  terminalHistory: [],
  addTerminalEntry: (input, output) => {
    set((state) => ({
      terminalHistory: [...state.terminalHistory, { input, output }],
    }));
  },
  clearTerminal: () => set({ terminalHistory: [] }),

  toasts: [],
  addToast: (message, type = "info") => {
    const id = `toast-${Date.now()}`;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => get().removeToast(id), 3500);
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  dndEnabled: false,
  toggleDnd: () => {
    const next = !get().dndEnabled;
    set({ dndEnabled: next });
    get().addToast(next ? "Do Not Disturb enabled" : "Do Not Disturb disabled", "info");
  },

  modalOpen: false,
  modalContent: null,
  openModal: (title, body) => set({ modalOpen: true, modalContent: { title, body } }),
  closeModal: () => set({ modalOpen: false, modalContent: null }),
}));
