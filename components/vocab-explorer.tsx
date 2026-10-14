"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CountryToggle } from "@/components/country-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroBackground } from "@/components/hero-background";
import { Pagination } from "@/components/pagination";
import { VocabControls } from "@/components/vocab-controls";
import { VocabTable, sortEntries, type SortState } from "@/components/vocab-table";
import { SuggestWordDialog } from "@/components/suggest-word-dialog";
import { useCountry } from "@/hooks/use-country";
import { useFavorites } from "@/hooks/use-favorites";
import { COPY } from "@/lib/copy";
import type { VocabEntry } from "@/lib/types";

const PAGE_SIZE = 10;

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
  // Si llegamos por un link compartido (?word=slug), arrancar en la
  // página donde está esa palabra en vez de dejarla fuera de la primera.
  // En el primer render no hay filtros aplicados todavía, así que basta
  // con mirar `entries` tal cual llegan.
  const [page, setPage] = useState(() => {
    if (!highlightSlug) return 1;
    const idx = entries.findIndex((e) => e.slug === highlightSlug);
    return idx >= 0 ? Math.floor(idx / PAGE_SIZE) + 1 : 1;
  });

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

  // Volver a la página 1 cada vez que cambian filtros/orden, para no
  // quedar mirando una página vacía. Se ajusta durante el render (patrón
  // recomendado por React para "resetear estado cuando cambia otra cosa")
  // en vez de un efecto, que dispararía un render extra innecesario.
  const filterKey = JSON.stringify([
    search,
    [...selectedCategorias].sort(),
    tipoFilter,
    favoritesOnly,
    sort,
  ]);
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  const pageCount = Math.max(1, Math.ceil(sortedEntries.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pagedEntries = useMemo(
    () => sortedEntries.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [sortedEntries, safePage],
  );

  return (
    <>
      <HeroBackground country={country} />
      <div className="relative z-10 flex flex-col gap-2 sm:gap-3">
        <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
          <SuggestWordDialog copy={copy} />
          <div className="flex items-center gap-3">
            <CountryToggle country={country} onChange={setCountry} />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-background/50 p-4 shadow-lg backdrop-blur-xl sm:p-5 dark:bg-background/75">
          <div className="flex flex-col items-center gap-1 pb-1 text-center">
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
              {copy.eyebrow}
            </span>
            <h1 className="flex flex-col items-center">
              <span className="font-display text-xl text-foreground italic sm:text-2xl">
                Vocabulario
              </span>
              <span className="font-heading text-lg font-bold tracking-tight text-foreground uppercase sm:text-xl">
                España · Chile
              </span>
            </h1>
            <p className="max-w-md text-balance text-xs text-muted-foreground sm:text-sm">
              {copy.subtitle}
            </p>
          </div>

          <VocabControls
            copy={copy}
            search={search}
            onSearchChange={setSearch}
            allCategorias={allCategorias}
            selectedCategorias={selectedCategorias}
            onToggleCategoria={toggleCategoria}
            onClearCategorias={() => setSelectedCategorias(new Set())}
            allTipos={allTipos}
            tipoFilter={tipoFilter}
            onTipoFilterChange={setTipoFilter}
            favoritesOnly={favoritesOnly}
            onToggleFavoritesOnly={() => setFavoritesOnly((v) => !v)}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
          <p className="text-xs text-muted-foreground">
            {sortedEntries.length === 0
              ? copy.rangeLabel(0, 0, entries.length)
              : copy.rangeLabel(
                  (safePage - 1) * PAGE_SIZE + 1,
                  Math.min(safePage * PAGE_SIZE, sortedEntries.length),
                  entries.length,
                )}
          </p>
          <VocabTable
            copy={copy}
            data={pagedEntries}
            sort={sort}
            onSortChange={setSort}
            favoritesSet={favoritesSet}
            onToggleFavorite={toggleFavorite}
            highlightSlug={highlightSlug}
            highlightCountry={country}
          />
          <Pagination
            page={safePage}
            pageCount={pageCount}
            onPageChange={setPage}
            prevLabel={copy.prevPage}
            nextLabel={copy.nextPage}
            pageLabel={copy.pageLabel}
          />
        </div>
      </div>
    </>
  );
}
