"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const subscribeNoop = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Next.js renderiza en el servidor sin saber el tema; esto evita el
  // mismatch de hidratación sin disparar un setState dentro de un efecto.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-pressed={isDark}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
      )}
    >
      <span aria-hidden>{mounted ? (isDark ? "☀️" : "🌙") : null}</span>
      {mounted ? (isDark ? "Modo claro" : "Modo oscuro") : "Tema"}
    </button>
  );
}
