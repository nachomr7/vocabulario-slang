"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/category-badge";
import type { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function VocabControls({
  copy,
  search,
  onSearchChange,
  allCategorias,
  selectedCategorias,
  onToggleCategoria,
  allTipos,
  tipoFilter,
  onTipoFilterChange,
  favoritesOnly,
  onToggleFavoritesOnly,
  onClear,
  hasActiveFilters,
}: {
  copy: Copy;
  search: string;
  onSearchChange: (value: string) => void;
  allCategorias: string[];
  selectedCategorias: Set<string>;
  onToggleCategoria: (categoria: string) => void;
  allTipos: string[];
  tipoFilter: string | null;
  onTipoFilterChange: (tipo: string | null) => void;
  favoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={copy.searchPlaceholder}
          className="sm:max-w-xs"
          aria-label="Buscar en el vocabulario"
        />
        <select
          value={tipoFilter ?? ""}
          onChange={(e) => onTipoFilterChange(e.target.value || null)}
          aria-label={copy.tipoFilterLabel}
          className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">{copy.tipoFilterAll}</option>
          {allTipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onToggleFavoritesOnly}
          aria-pressed={favoritesOnly}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
            favoritesOnly
              ? "border-amber-400 bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <span aria-hidden>{favoritesOnly ? "★" : "☆"}</span>
          {copy.favoritesOnly}
        </button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} className="sm:ml-auto">
            {copy.clearFilters}
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allCategorias.map((categoria) => {
          const isSelected = selectedCategorias.has(categoria);
          return (
            <button
              key={categoria}
              type="button"
              onClick={() => onToggleCategoria(categoria)}
              aria-pressed={isSelected}
              className={cn(
                "rounded-full transition-transform",
                isSelected ? "scale-105 ring-1 ring-border-strong" : "hover:scale-105",
              )}
            >
              <CategoryBadge
                categoria={categoria}
                active={selectedCategorias.size === 0 || isSelected}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
