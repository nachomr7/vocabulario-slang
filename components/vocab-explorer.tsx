"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CountryToggle } from "@/components/country-toggle";
import { VocabControls } from "@/components/vocab-controls";
import { VocabTable, sortEntries, type SortState } from "@/components/vocab-table";
import { SuggestWordDialog } from "@/components/suggest-word-dialog";
import { useCountry } from "@/hooks/use-country";
import { useFavorites } from "@/hooks/use-favorites";
import { COPY } from "@/lib/copy";
import type { VocabEntry } from "@/lib/types";

export function VocabExplorer({ entries }: { entries: VocabEntry[] }) {
  const searchParams = useSearchParams();
  const highlightSlug = searchParams.get("word");

  const { country, setCountry } = useCountry();
  const { favoritesSet, toggleFavorite } = useFavorites();
  const copy = COPY[country ?? "neutral"];

  const allCategorias = useMemo(
    () => [...new Set(entries.map((e) => e.categoria))].sort((a, b) => a.localeCompare(b, "es")),
    [entries],
  );
  const allTipos = useMemo(
    () => [...new Set(entries.map((e) => e.tipo_gramatical))].sort((a, b) => a.localeCompare(b, "es")),
    [entries],
  );

  const [search, setSearch] = useState("");
  const [selectedCategorias, setSelectedCategorias] = useState<Set<string>>(
    new Set(),
  );
  const [tipoFilter, setTipoFilter] = useState<string | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sort, setSort] = useState<SortState>(null);

  const toggleCategoria = (categoria: string) => {
    setSelectedCategorias((prev) => {
      const next = new Set(prev);
      if (next.has(categoria)) next.delete(categoria);
      else next.add(categoria);
      return next;
    });
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategorias(new Set());
    setTipoFilter(null);
    setFavoritesOnly(false);
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedCategorias.size > 0 ||
    tipoFilter !== null ||
    favoritesOnly;

  const filteredEntries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return entries.filter((entry) => {
      if (favoritesOnly && !favoritesSet.has(entry.slug)) return false;

      if (selectedCategorias.size > 0 && !selectedCategorias.has(entry.categoria)) {
        return false;
      }

      if (tipoFilter && entry.tipo_gramatical !== tipoFilter) return false;

      if (query) {
        const haystack = [entry.slang_es, entry.slang_cl, entry.definicion]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [entries, search, selectedCategorias, tipoFilter, favoritesOnly, favoritesSet]);

  const sortedEntries = useMemo(
    () => sortEntries(filteredEntries, sort),
    [filteredEntries, sort],
  );

  return (
    <div className="flex flex-col">
      <header className="flex flex-col items-center gap-3 border-b border-border pb-4 sm:flex-row sm:justify-end">
        <CountryToggle country={country} onChange={setCountry} />
      </header>

      <div className="flex flex-col gap-16 pt-10 sm:gap-20 sm:pt-14">
        <section className="flex flex-col items-center gap-6 text-center">
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {copy.eyebrow}
          </span>
          <h1 className="flex flex-col items-center">
            <span className="font-display text-4xl text-foreground italic sm:text-5xl">
              Vocabulario
            </span>
            <span className="font-heading text-3xl font-bold tracking-tight text-foreground uppercase sm:text-4xl">
              España · Chile
            </span>
          </h1>
          <p className="max-w-xl text-balance text-muted-foreground">
            {copy.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <SuggestWordDialog copy={copy} />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <VocabControls
            copy={copy}
            search={search}
            onSearchChange={setSearch}
            allCategorias={allCategorias}
            selectedCategorias={selectedCategorias}
            onToggleCategoria={toggleCategoria}
            allTipos={allTipos}
            tipoFilter={tipoFilter}
            onTipoFilterChange={setTipoFilter}
            favoritesOnly={favoritesOnly}
            onToggleFavoritesOnly={() => setFavoritesOnly((v) => !v)}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
          <p className="text-sm text-muted-foreground">
            {copy.countLabel(filteredEntries.length, entries.length)}
          </p>
          <VocabTable
            copy={copy}
            data={sortedEntries}
            sort={sort}
            onSortChange={setSort}
            favoritesSet={favoritesSet}
            onToggleFavorite={toggleFavorite}
            highlightSlug={highlightSlug}
            highlightCountry={country}
          />
        </section>
      </div>
    </div>
  );
}
