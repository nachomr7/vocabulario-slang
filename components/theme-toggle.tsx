"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-pressed={isDark}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
      )}
    >
      <span aria-hidden>{mounted ? (isDark ? "☀️" : "🌙") : null}</span>
      {mounted ? (isDark ? "Modo claro" : "Modo oscuro") : "Tema"}
    </button>
  );
}
