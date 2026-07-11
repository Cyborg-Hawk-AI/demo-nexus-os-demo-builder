"use client";

import { DevNote } from "@/components/ui/DevNote";
import { useNexusStore } from "@/lib/store";
import { Calendar, Clock } from "lucide-react";

const TYPE_STYLES: Record<string, string> = {
  meeting: "border-l-nexus-rose bg-nexus-rose/5",
  focus: "border-l-nexus-accent bg-nexus-accent/5",
  personal: "border-l-nexus-cyan bg-nexus-cyan/5",
  health: "border-l-nexus-green bg-nexus-green/5",
};

const TYPE_LABELS: Record<string, string> = {
  meeting: "Meeting",
  focus: "Focus Block",
  personal: "Personal",
  health: "Health",
};

export function CalendarView() {
  const calendar = useNexusStore((s) => s.calendar);
  const toggleEventType = useNexusStore((s) => s.toggleEventType);
  const openModal = useNexusStore((s) => s.openModal);

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-nexus-accent" />
        <h3 className="text-lg font-semibold text-white">Today&apos;s Schedule</h3>
        <span className="text-xs text-zinc-500">Saturday, Jul 11, 2026</span>
        <DevNote
          note="Click events to view details. Click type badge to cycle event category."
          production="Google Calendar / Cal.com OAuth sync with two-way write access."
        />
      </div>

      <div className="space-y-3">
        {calendar.map((event) => (
          <div
            key={event.id}
            className={`flex items-center gap-4 rounded-lg border-l-4 p-4 ${TYPE_STYLES[event.type]}`}
          >
            <div className="w-20 shrink-0">
              <p className="text-sm font-medium text-white">{event.time}</p>
              <p className="text-[10px] text-zinc-500 flex items-center gap-1 mt-0.5">
                <Clock className="h-2.5 w-2.5" />
                {event.duration}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                openModal(
                  event.title,
                  `Time: ${event.time}\nDuration: ${event.duration}\nType: ${TYPE_LABELS[event.type]}`
                )
              }
              className="flex-1 text-left"
            >
              <p className="font-medium text-zinc-200">{event.title}</p>
            </button>
            <button
              type="button"
              onClick={() => toggleEventType(event.id)}
              className="rounded-full bg-nexus-card px-2.5 py-1 text-[10px] font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {TYPE_LABELS[event.type]}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[10px] text-zinc-600">
        Click event title for details · Click type badge to cycle category
      </p>
    </div>
  );
}
