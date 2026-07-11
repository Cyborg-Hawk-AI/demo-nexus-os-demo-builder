"use client";

import { useNexusStore } from "@/lib/store";
import { X } from "lucide-react";

export function Modal() {
  const modalOpen = useNexusStore((s) => s.modalOpen);
  const modalContent = useNexusStore((s) => s.modalContent);
  const closeModal = useNexusStore((s) => s.closeModal);

  if (!modalOpen || !modalContent) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-xl border border-nexus-border bg-nexus-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white">{modalContent.title}</h3>
          <button
            type="button"
            onClick={closeModal}
            className="text-zinc-500 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-3 text-sm text-zinc-400 whitespace-pre-line leading-relaxed">
          {modalContent.body}
        </p>
        <button
          type="button"
          onClick={closeModal}
          className="mt-6 w-full rounded-lg bg-nexus-accent py-2 text-sm font-medium text-white hover:bg-nexus-accent-hover transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
