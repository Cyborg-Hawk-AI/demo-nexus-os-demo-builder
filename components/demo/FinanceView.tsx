"use client";

import { DevNote } from "@/components/ui/DevNote";
import { useNexusStore, type FinanceFilter } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const FILTERS: { value: FinanceFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expenses" },
];

export function FinanceView() {
  const finances = useNexusStore((s) => s.finances);
  const financeFilter = useNexusStore((s) => s.financeFilter);
  const setFinanceFilter = useNexusStore((s) => s.setFinanceFilter);
  const openModal = useNexusStore((s) => s.openModal);

  const filtered =
    financeFilter === "all"
      ? finances
      : finances.filter((f) => f.type === financeFilter);

  const totalIncome = finances
    .filter((f) => f.type === "income")
    .reduce((s, f) => s + f.amount, 0);
  const totalExpenses = finances
    .filter((f) => f.type === "expense")
    .reduce((s, f) => s + Math.abs(f.amount), 0);

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Finance Ledger</h3>
          <DevNote
            note="Filterable transaction table with income/expense totals."
            production="Plaid bank sync + Stripe revenue + manual entries; categorized via ML."
          />
        </div>
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFinanceFilter(f.value)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                financeFilter === f.value
                  ? "bg-nexus-accent text-white"
                  : "bg-nexus-surface text-zinc-500 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          type="button"
          onClick={() => setFinanceFilter("income")}
          className="rounded-lg bg-nexus-green/10 p-4 text-left hover:bg-nexus-green/15 transition-colors"
        >
          <p className="text-xs text-nexus-green">Total Income</p>
          <p className="text-2xl font-bold text-white mt-1">{formatCurrency(totalIncome)}</p>
        </button>
        <button
          type="button"
          onClick={() => setFinanceFilter("expense")}
          className="rounded-lg bg-nexus-rose/10 p-4 text-left hover:bg-nexus-rose/15 transition-colors"
        >
          <p className="text-xs text-nexus-rose">Total Expenses</p>
          <p className="text-2xl font-bold text-white mt-1">{formatCurrency(-totalExpenses)}</p>
        </button>
        <button
          type="button"
          onClick={() => setFinanceFilter("all")}
          className="rounded-lg bg-nexus-accent/10 p-4 text-left hover:bg-nexus-accent/15 transition-colors"
        >
          <p className="text-xs text-nexus-accent">Net</p>
          <p className="text-2xl font-bold text-white mt-1">
            {formatCurrency(totalIncome - totalExpenses)}
          </p>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-nexus-border text-left text-xs text-zinc-500">
              <th className="pb-3 pr-4 font-medium">Label</th>
              <th className="pb-3 pr-4 font-medium">Category</th>
              <th className="pb-3 pr-4 font-medium">Date</th>
              <th className="pb-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-nexus-border/30 hover:bg-nexus-surface/50 cursor-pointer transition-colors"
                onClick={() =>
                  openModal(
                    entry.label,
                    `Category: ${entry.category}\nDate: ${entry.date}\nType: ${entry.type}\nAmount: ${formatCurrency(entry.amount)}`
                  )
                }
              >
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    {entry.type === "income" ? (
                      <ArrowDownLeft className="h-3.5 w-3.5 text-nexus-green" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5 text-nexus-rose" />
                    )}
                    <span className="text-zinc-300">{entry.label}</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-zinc-500">{entry.category}</td>
                <td className="py-3 pr-4 text-zinc-500">{entry.date}</td>
                <td
                  className={`py-3 text-right font-medium ${
                    entry.type === "income" ? "text-nexus-green" : "text-nexus-rose"
                  }`}
                >
                  {formatCurrency(entry.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
