"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { DevNote } from "@/components/ui/DevNote";
import { AI_RESPONSES } from "@/lib/seed-data";
import { useNexusStore } from "@/lib/store";
import { Terminal, Send } from "lucide-react";

const SUGGESTIONS = ["status", "habits", "projects", "schedule", "focus", "finance", "pets", "help"];

export function AiTerminal() {
  const [input, setInput] = useState("");
  const terminalHistory = useNexusStore((s) => s.terminalHistory);
  const addTerminalEntry = useNexusStore((s) => s.addTerminalEntry);
  const clearTerminal = useNexusStore((s) => s.clearTerminal);
  const addActivity = useNexusStore((s) => s.addActivity);
  const addToast = useNexusStore((s) => s.addToast);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalHistory.length === 0) {
      addTerminalEntry("", AI_RESPONSES.default);
    }
  }, [terminalHistory.length, addTerminalEntry]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [terminalHistory]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      clearTerminal();
      addTerminalEntry("", AI_RESPONSES.default);
      addToast("Terminal cleared", "info");
      return;
    }

    const response = AI_RESPONSES[trimmed] ?? `Unknown command: "${trimmed}". Type help for available commands.`;
    addTerminalEntry(cmd, response);
    addActivity({
      time: "Just now",
      action: "AI Agent",
      detail: `Executed: ${trimmed}`,
      type: "ai",
    });

    if (trimmed === "focus") {
      useNexusStore.getState().toggleDnd();
    }
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    runCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="glass rounded-xl overflow-hidden flex flex-col h-[480px]">
      <div className="flex items-center justify-between border-b border-nexus-border px-4 py-3 bg-nexus-surface/50">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-nexus-green" />
          <span className="text-sm font-medium text-zinc-300 font-mono">nexus-agent</span>
          <span className="h-2 w-2 rounded-full bg-nexus-green animate-pulse" />
          <DevNote
            note="Canned AI terminal with keyword-matched responses from AI_RESPONSES map."
            production="LLM agent with tool-use: calendar API, habit DB, finance queries, RAG on user data."
          />
        </div>
        <button
          type="button"
          onClick={() => runCommand("clear")}
          className="text-xs text-zinc-500 hover:text-white"
        >
          Clear
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-3">
        {terminalHistory.map((entry, i) => (
          <div key={i}>
            {entry.input && (
              <p className="text-nexus-cyan">
                <span className="text-nexus-accent">❯</span> {entry.input}
              </p>
            )}
            <pre className="text-zinc-400 whitespace-pre-wrap mt-1 leading-relaxed">
              {entry.output}
            </pre>
          </div>
        ))}
      </div>

      <div className="border-t border-nexus-border p-3">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => runCommand(s)}
              className="rounded-md bg-nexus-surface px-2 py-0.5 text-[10px] text-zinc-500 hover:text-nexus-cyan hover:bg-nexus-card transition-colors font-mono"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            className="flex-1 rounded-lg bg-nexus-surface border border-nexus-border px-3 py-2 text-sm font-mono text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-nexus-accent"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-nexus-accent px-3 py-2 text-white hover:bg-nexus-accent-hover transition-colors"
            aria-label="Send command"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
