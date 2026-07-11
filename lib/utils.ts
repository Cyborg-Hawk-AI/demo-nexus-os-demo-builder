export function cn(...inputs: (string | false | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  const prefix = amount < 0 ? "-" : "";
  return `${prefix}$${Math.abs(amount).toLocaleString()}`;
}
