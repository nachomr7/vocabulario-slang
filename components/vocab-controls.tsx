"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryFilter } from "@/components/category-filter";
import type { Copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function VocabControls({
  copy,
  search,
  onSearchChange,
  allCategorias,
  selectedCategorias,
  onToggleCategoria,
  onClearCategorias,
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
  onClearCategorias: () => void;
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
      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={copy.searchPlaceholder}
          className="sm:max-w-xs"
          aria-label="Buscar en el vocabulario"
        />
        <CategoryFilter
          allCategorias={allCategorias}
          selected={selectedCategorias}
          onToggle={onToggleCategoria}
          onClear={onClearCategorias}
          label={copy.categoriasLabel}
          clearLabel={copy.categoriasClear}
        />
        <Select
          value={tipoFilter ?? "all"}
          onValueChange={(value) => onTipoFilterChange(value === "all" ? null : value)}
        >
          <SelectTrigger aria-label={copy.tipoFilterLabel} className="rounded-full">
            <SelectValue placeholder={copy.tipoFilterAll}>
              {(value: string) => (value === "all" ? copy.tipoFilterAll : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{copy.tipoFilterAll}</SelectItem>
            {allTipos.map((tipo) => (
              <SelectItem key={tipo} value={tipo}>
                {tipo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
    </div>
  );
}
