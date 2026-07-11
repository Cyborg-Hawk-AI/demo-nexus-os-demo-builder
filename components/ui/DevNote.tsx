"use client";

import { useState } from "react";
import { Info } from "lucide-react";

interface DevNoteProps {
  note: string;
  production?: string;
}

export function DevNote({ note, production }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-nexus-accent/20 text-nexus-accent hover:bg-nexus-accent/40 transition-colors"
        aria-label="Developer note"
      >
        <Info className="h-2.5 w-2.5" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-nexus-border bg-nexus-card p-3 text-left shadow-xl">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-nexus-cyan">
            Dev Note
          </p>
          <p className="mt-1 text-xs text-zinc-300 leading-relaxed">{note}</p>
          {production && (
            <p className="mt-2 text-xs text-zinc-500 border-t border-nexus-border pt-2">
              <span className="text-nexus-amber">Production:</span> {production}
            </p>
          )}
        </div>
      )}
    </span>
  );
}
