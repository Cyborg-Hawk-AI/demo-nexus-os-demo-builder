"use client";

import { useNexusStore } from "@/lib/store";
import { X } from "lucide-react";

export function ToastContainer() {
  const toasts = useNexusStore((s) => s.toasts);
  const removeToast = useNexusStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg ${
            toast.type === "success"
              ? "border-nexus-green/30 bg-nexus-green/10 text-nexus-green"
              : toast.type === "warning"
                ? "border-nexus-amber/30 bg-nexus-amber/10 text-nexus-amber"
                : "border-nexus-accent/30 bg-nexus-accent/10 text-nexus-accent-hover"
          }`}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="opacity-60 hover:opacity-100"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
