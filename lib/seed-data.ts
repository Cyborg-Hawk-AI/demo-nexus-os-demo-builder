export interface Project {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "planning";
  progress: number;
  dueDate: string;
  priority: "high" | "medium" | "low";
  tasks: { id: string; title: string; done: boolean }[];
  revenue?: number;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  target: number;
  history: boolean[];
}

export interface FinanceEntry {
  id: string;
  label: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

export interface ActivityItem {
  id: string;
  time: string;
  action: string;
  detail: string;
  type: "system" | "habit" | "project" | "ai" | "finance";
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: "meeting" | "focus" | "personal" | "health";
}

export interface HealthMetric {
  label: string;
  value: string;
  trend: "up" | "down" | "stable";
  change: string;
}

export interface Pet {
  name: string;
  species: string;
  mood: string;
  lastFed: string;
  vetNext: string;
}

export interface UserProfile {
  name: string;
  title: string;
  location: string;
  timezone: string;
  avatar: string;
  email: string;
  company: string;
  relocatedFrom: string;
  bio: string;
}

export const USER: UserProfile = {
  name: "Marcus Chen",
  title: "Solo Founder & Digital Nomad",
  location: "Florianópolis, Brazil",
  timezone: "America/Sao_Paulo",
  avatar: "MC",
  email: "marcus@remotestack.io",
  company: "RemoteStack",
  relocatedFrom: "San Francisco, CA",
  bio: "Building personal OS tools while navigating Brazil relocation, two pets, and three active ventures.",
};

export const PETS: Pet[] = [
  { name: "Pixel", species: "Tabby Cat", mood: "Content", lastFed: "7:30 AM", vetNext: "Aug 14, 2026" },
  { name: "Atlas", species: "Golden Retriever", mood: "Energetic", lastFed: "7:15 AM", vetNext: "Sep 2, 2026" },
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Nexus-OS Dashboard",
    status: "active",
    progress: 72,
    dueDate: "Jul 25, 2026",
    priority: "high",
    revenue: 0,
    tasks: [
      { id: "t1", title: "Bento grid layout polish", done: true },
      { id: "t2", title: "AI terminal canned responses", done: true },
      { id: "t3", title: "Habit heatmap component", done: false },
      { id: "t4", title: "Deploy to Vercel", done: false },
    ],
  },
  {
    id: "p2",
    name: "RemoteStack SaaS",
    status: "active",
    progress: 45,
    dueDate: "Sep 1, 2026",
    priority: "high",
    revenue: 4200,
    tasks: [
      { id: "t5", title: "Stripe integration", done: true },
      { id: "t6", title: "Onboarding wizard", done: false },
      { id: "t7", title: "Team invite flow", done: false },
    ],
  },
  {
    id: "p3",
    name: "Brazil Relocation Logistics",
    status: "active",
    progress: 88,
    dueDate: "Jul 20, 2026",
    priority: "medium",
    tasks: [
      { id: "t8", title: "CPF registration", done: true },
      { id: "t9", title: "Pet import paperwork", done: true },
      { id: "t10", title: "Bank account (Nubank)", done: false },
    ],
  },
  {
    id: "p4",
    name: "Newsletter: Nomad OS",
    status: "planning",
    progress: 15,
    dueDate: "Aug 30, 2026",
    priority: "low",
    revenue: 890,
    tasks: [
      { id: "t11", title: "Beehiiv setup", done: true },
      { id: "t12", title: "First 5 issues outline", done: false },
    ],
  },
];

function generateHabitHistory(completionRate: number): boolean[] {
  const days = 84;
  const history: boolean[] = [];
  for (let i = 0; i < days; i++) {
    history.push(Math.random() < completionRate);
  }
  return history;
}

export const HABITS: Habit[] = [
  { id: "h1", name: "Morning run", streak: 12, target: 5, history: generateHabitHistory(0.78) },
  { id: "h2", name: "Deep work (2h)", streak: 8, target: 5, history: generateHabitHistory(0.85) },
  { id: "h3", name: "Portuguese practice", streak: 21, target: 7, history: generateHabitHistory(0.92) },
  { id: "h4", name: "Inbox zero", streak: 3, target: 5, history: generateHabitHistory(0.55) },
  { id: "h5", name: "Meditation", streak: 5, target: 7, history: generateHabitHistory(0.68) },
  { id: "h6", name: "Ship code", streak: 14, target: 5, history: generateHabitHistory(0.88) },
];

export const FINANCES: FinanceEntry[] = [
  { id: "f1", label: "RemoteStack MRR", amount: 4200, category: "Revenue", date: "Jul 1, 2026", type: "income" },
  { id: "f2", label: "Newsletter sponsors", amount: 890, category: "Revenue", date: "Jul 5, 2026", type: "income" },
  { id: "f3", label: "WeWork Floripa", amount: -450, category: "Office", date: "Jul 3, 2026", type: "expense" },
  { id: "f4", label: "AWS + Vercel", amount: -127, category: "Infrastructure", date: "Jul 2, 2026", type: "expense" },
  { id: "f5", label: "Groceries (Pão de Açúcar)", amount: -89, category: "Living", date: "Jul 8, 2026", type: "expense" },
  { id: "f6", label: "Vet checkup - Pixel", amount: -180, category: "Pets", date: "Jul 6, 2026", type: "expense" },
  { id: "f7", label: "Consulting (side gig)", amount: 1500, category: "Revenue", date: "Jul 9, 2026", type: "income" },
  { id: "f8", label: "Gym (CrossFit Jurerê)", amount: -65, category: "Health", date: "Jul 1, 2026", type: "expense" },
];

export const ACTIVITIES: ActivityItem[] = [
  { id: "a1", time: "5:28 AM", action: "AI Agent", detail: "Suggested blocking 9–11 AM for deep work", type: "ai" },
  { id: "a2", time: "5:15 AM", action: "Habit logged", detail: "Morning run — 4.2 km in 24 min", type: "habit" },
  { id: "a3", time: "Yesterday", action: "Project update", detail: "Nexus-OS: Bento grid animations shipped", type: "project" },
  { id: "a4", time: "Yesterday", action: "Finance sync", detail: "RemoteStack MRR +$200 (new customer)", type: "finance" },
  { id: "a5", time: "Jul 9", action: "System", detail: "Calendar synced — 3 events added", type: "system" },
  { id: "a6", time: "Jul 8", action: "Habit logged", detail: "Portuguese practice — 30 min Duolingo", type: "habit" },
  { id: "a7", time: "Jul 8", action: "AI Agent", detail: "Flagged overdue task: Bank account setup", type: "ai" },
  { id: "a8", time: "Jul 7", action: "Project update", detail: "Brazil Relocation: CPF approved", type: "project" },
];

export const CALENDAR: CalendarEvent[] = [
  { id: "c1", title: "Investor sync — Sequoia Scout", time: "10:00 AM", duration: "45 min", type: "meeting" },
  { id: "c2", title: "Deep work: Nexus-OS", time: "11:00 AM", duration: "2 hr", type: "focus" },
  { id: "c3", title: "Vet — Atlas annual checkup", time: "2:30 PM", duration: "1 hr", type: "personal" },
  { id: "c4", title: "Portuguese tutor (iTalki)", time: "4:00 PM", duration: "1 hr", type: "personal" },
  { id: "c5", title: "CrossFit session", time: "6:30 PM", duration: "1 hr", type: "health" },
];

export const HEALTH: HealthMetric[] = [
  { label: "Sleep", value: "7h 12m", trend: "up", change: "+18 min" },
  { label: "Steps", value: "8,420", trend: "up", change: "+12%" },
  { label: "HRV", value: "58 ms", trend: "stable", change: "±2" },
  { label: "Focus score", value: "82/100", trend: "up", change: "+5" },
];

export const REVENUE_CHART = [
  { month: "Feb", mrr: 2800, expenses: 2100 },
  { month: "Mar", mrr: 3100, expenses: 2300 },
  { month: "Apr", mrr: 3400, expenses: 2450 },
  { month: "May", mrr: 3700, expenses: 2600 },
  { month: "Jun", mrr: 4000, expenses: 2750 },
  { month: "Jul", mrr: 4200, expenses: 2911 },
];

export const FOCUS_CHART = [
  { day: "Mon", hours: 3.2 },
  { day: "Tue", hours: 4.5 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 5.1 },
  { day: "Fri", hours: 3.9 },
  { day: "Sat", hours: 1.5 },
  { day: "Sun", hours: 2.0 },
];

export const AI_RESPONSES: Record<string, string> = {
  default: "Nexus Agent online. Type `help` for available commands.",
  help: `Available commands:
  • status — daily overview
  • habits — habit streak summary
  • projects — active project status
  • schedule — today's calendar
  • focus — suggest focus block
  • finance — monthly summary
  • pets — Pixel & Atlas status
  • clear — reset terminal`,
  status: `Good morning, Marcus. ☀️ Florianópolis, 24°C.

  📊 Today: 3 meetings, 2 focus blocks scheduled
  ✅ Habits: 2/6 completed (run ✓, meditation pending)
  🚀 Nexus-OS at 72% — deploy target Jul 25
  💰 Net this month: +$3,289`,
  habits: `Habit streaks:
  🔥 Portuguese practice — 21 days (best streak!)
  🏃 Morning run — 12 days
  💻 Ship code — 14 days
  🧘 Meditation — 5 days (below target)
  
  Tip: Block 10 min after lunch for meditation.`,
  projects: `Active projects:
  1. Nexus-OS Dashboard — 72% (HIGH) — due Jul 25
  2. RemoteStack SaaS — 45% (HIGH) — MRR $4,200
  3. Brazil Relocation — 88% — CPF done, bank pending
  4. Nomad OS Newsletter — 15% (planning)`,
  schedule: `Today's schedule (America/Sao_Paulo):
  10:00 — Investor sync (Sequoia Scout)
  11:00 — Deep work: Nexus-OS [FOCUS]
  14:30 — Vet: Atlas annual checkup
  16:00 — Portuguese tutor (iTalki)
  18:30 — CrossFit Jurerê`,
  focus: `Recommended focus block: 11:00 AM – 1:00 PM
  
  Context: Post-investor call energy dip avoided.
  Task queue: Habit heatmap component → Vercel deploy
  DND: Enabled for Slack & email
  
  [Applied to calendar ✓]`,
  finance: `July 2026 summary:
  Income:  $6,590 (MRR + consulting + sponsors)
  Expenses: $2,911
  Net: +$3,679
  
  Top expense: WeWork Floripa ($450)
  Savings rate: 55.8%`,
  pets: `🐱 Pixel (Tabby) — Content, fed 7:30 AM
  🐕 Atlas (Golden Retriever) — Energetic, fed 7:15 AM
  
  Upcoming: Atlas vet checkup today 2:30 PM
  Pixel vet: Aug 14, 2026`,
  clear: "",
};
