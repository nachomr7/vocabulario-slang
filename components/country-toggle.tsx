"use client";

import { FlagES, FlagCL } from "@/components/flags";
import { cn } from "@/lib/utils";
import { type Country } from "@/hooks/use-country";

export function CountryToggle({
  country,
  onChange,
  labelEs = "Soy de España",
  labelCl = "Soy de Chile",
}: {
  country: Country | null;
  onChange: (country: Country | null) => void;
  labelEs?: string;
  labelCl?: string;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-sm">
      <button
        type="button"
        onClick={() => onChange(country === "es" ? null : "es")}
        aria-pressed={country === "es"}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-medium transition-colors",
          country === "es"
            ? "border-border-strong text-foreground"
            : "border-transparent text-muted-foreground hover:text-foreground",
        )}
      >
        <FlagES /> {labelEs}
      </button>
      <button
        type="button"
        onClick={() => onChange(country === "cl" ? null : "cl")}
        aria-pressed={country === "cl"}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-medium transition-colors",
          country === "cl"
            ? "border-border-strong text-foreground"
            : "border-transparent text-muted-foreground hover:text-foreground",
        )}
      >
        <FlagCL /> {labelCl}
      </button>
    </div>
  );
}
