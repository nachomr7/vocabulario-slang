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
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} className="sm:ml-auto">
            {copy.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
}
