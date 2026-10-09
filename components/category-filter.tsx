"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function CategoryFilter({
  allCategorias,
  selected,
  onToggle,
  onClear,
  label,
  clearLabel,
}: {
  allCategorias: string[];
  selected: Set<string>;
  onToggle: (categoria: string) => void;
  onClear: () => void;
  label: string;
  clearLabel: string;
}) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" className="rounded-full" />}>
        {label}
        {selected.size > 0 ? ` (${selected.size})` : ""}
      </PopoverTrigger>
      <PopoverContent align="start" className="max-h-80 w-64 overflow-y-auto">
        <div className="flex items-center justify-between px-0.5 pb-1">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {label}
          </span>
          {selected.size > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              {clearLabel}
            </button>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          {allCategorias.map((categoria) => (
            <label
              key={categoria}
              className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 text-sm hover:bg-accent"
            >
              <Checkbox
                checked={selected.has(categoria)}
                onCheckedChange={() => onToggle(categoria)}
              />
              {categoria}
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
