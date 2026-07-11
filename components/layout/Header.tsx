"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Live Demo" },
  { href: "/developers", label: "Developers" },
  { href: "/research", label: "Research" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDemo = pathname === "/demo";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-nexus-border/50 backdrop-blur-md",
        isDemo ? "bg-nexus-bg/95" : "bg-nexus-bg/80"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-nexus-accent/20 text-nexus-accent group-hover:bg-nexus-accent/30 transition-colors">
            <Zap className="h-4 w-4" />
          </div>
          <span className="font-semibold text-white">
            Nexus<span className="text-nexus-accent">-OS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm transition-colors",
                pathname === item.href
                  ? "bg-nexus-accent/20 text-nexus-accent-hover"
                  : "text-zinc-400 hover:text-white hover:bg-nexus-card"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-lg bg-nexus-accent px-4 py-2 text-sm font-medium text-white hover:bg-nexus-accent-hover transition-colors"
          >
            Try the Demo
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-nexus-border/50 bg-nexus-surface px-4 py-3 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-md text-sm",
                pathname === item.href
                  ? "bg-nexus-accent/20 text-nexus-accent-hover"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/demo"
            onClick={() => setMobileOpen(false)}
            className="block mt-2 text-center rounded-lg bg-nexus-accent px-4 py-2 text-sm font-medium text-white"
          >
            Try the Demo
          </Link>
        </div>
      )}
    </header>
  );
}
