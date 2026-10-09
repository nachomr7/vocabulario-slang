"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { toast } from "sonner";
import { CategoryBadge } from "@/components/category-badge";
import { FlagES, FlagCL } from "@/components/flags";
import { cn } from "@/lib/utils";
import type { Copy } from "@/lib/copy";
import type { VocabEntry } from "@/lib/types";

export type SortColumn = "slang_es" | "slang_cl" | "definicion";
export type SortState = { column: SortColumn; direction: "asc" | "desc" } | null;

const COLUMNS: { id: SortColumn; label: string; icon?: ReactNode }[] = [
  { id: "slang_es", label: "Slang español", icon: <FlagES /> },
  { id: "slang_cl", label: "Slang chileno", icon: <FlagCL /> },
  { id: "definicion", label: "Definición en castellano neutral" },
];

function sortNullsLast(a: string | null, b: string | null) {
  if (a === b) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return a.localeCompare(b, "es");
}

export function sortEntries(entries: VocabEntry[], sort: SortState) {
  if (!sort) return entries;
  const sorted = [...entries].sort((a, b) => {
    const result = sortNullsLast(a[sort.column], b[sort.column]);
    return sort.direction === "asc" ? result : -result;
  });
  return sorted;
}

function SlangCell({
  value,
  flag,
  sinEquivalente,
}: {
  value: string | null;
  flag?: ReactNode;
  sinEquivalente: string;
}) {
  if (!value) {
    return (
      <span className="text-muted-foreground/70 italic">
        🤷 {sinEquivalente}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      {flag}
      {value}
    </span>
  );
}

function RowActions({
  entry,
  isFavorite,
  onToggleFavorite,
  copy,
}: {
  entry: VocabEntry;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
  copy: Copy;
}) {
  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.search = `?word=${entry.slug}`;
    try {
      await navigator.clipboard.writeText(url.toString());
      toast.success(copy.toastShareSuccess);
    } catch {
      toast.error(copy.toastShareError);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onToggleFavorite(entry.slug)}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        className={cn(
          "rounded-full p-1.5 text-lg leading-none transition-transform hover:scale-110",
          isFavorite ? "text-amber-500" : "text-muted-foreground/50",
        )}
      >
        {isFavorite ? "★" : "☆"}
      </button>
      <button
        type="button"
        onClick={handleShare}
        aria-label="Copiar link de esta palabra"
        className="rounded-full p-1.5 text-muted-foreground/50 transition-transform hover:scale-110 hover:text-foreground"
      >
        🔗
      </button>
    </div>
  );
}

export function VocabTable({
  copy,
  data,
  sort,
  onSortChange,
  favoritesSet,
  onToggleFavorite,
  highlightSlug,
  highlightCountry,
}: {
  copy: Copy;
  data: VocabEntry[];
  sort: SortState;
  onSortChange: (sort: SortState) => void;
  favoritesSet: Set<string>;
  onToggleFavorite: (slug: string) => void;
  highlightSlug: string | null;
  highlightCountry: "es" | "cl" | null;
}) {
  const rowRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (!highlightSlug) return;
    const el = rowRefs.current.get(highlightSlug);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightSlug, data]);

  const handleHeaderClick = (column: SortColumn) => {
    if (sort?.column !== column) {
      onSortChange({ column, direction: "asc" });
    } else if (sort.direction === "asc") {
      onSortChange({ column, direction: "desc" });
    } else {
      onSortChange(null);
    }
  };

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
        {copy.emptyState}
      </div>
    );
  }

  return (
    <>
      {/* Tabla para pantallas medianas y grandes */}
      <div className="hidden overflow-x-auto rounded-lg border border-border shadow-[0_0_0_1px_rgba(71,57,130,0.06)] md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {COLUMNS.map((column) => {
                const direction = sort?.column === column.id ? sort.direction : null;
                return (
                  <th key={column.id} scope="col" className="px-4 py-3 text-left">
                    <button
                      type="button"
                      onClick={() => handleHeaderClick(column.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase hover:text-foreground"
                    >
                      {column.icon}
                      {column.label}
                      <span aria-hidden className="text-[0.65rem] text-muted-foreground/70 normal-case">
                        {direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕"}
                      </span>
                    </button>
                  </th>
                );
              })}
              <th scope="col" className="px-4 py-3 text-left">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => {
              const isHighlighted = highlightSlug === entry.slug;
              return (
                <tr
                  key={entry.id}
                  ref={(el) => {
                    if (el) rowRefs.current.set(entry.slug, el);
                  }}
                  className={cn(
                    "border-b border-border align-top transition-colors last:border-0 hover:bg-muted/40",
                    index % 2 === 1 && "bg-muted/20",
                    isHighlighted && "bg-accent ring-1 ring-inset ring-ring/40",
                  )}
                >
                  <td
                    className={cn(
                      "px-4 py-3",
                      highlightCountry === "es" && "bg-es-soft/70",
                    )}
                  >
                    <SlangCell value={entry.slang_es} sinEquivalente={copy.sinEquivalente} />
                  </td>
                  <td
                    className={cn(
                      "px-4 py-3",
                      highlightCountry === "cl" && "bg-cl-soft/70",
                    )}
                  >
                    <SlangCell value={entry.slang_cl} sinEquivalente={copy.sinEquivalente} />
                  </td>
                  <td className="px-4 py-3">
                    <p>
                      <span className="mr-1.5 text-xs text-muted-foreground/70 italic">
                        {entry.tipo_gramatical}
                      </span>
                      {entry.definicion}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <CategoryBadge categoria={entry.categoria} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <RowActions
                      entry={entry}
                      isFavorite={favoritesSet.has(entry.slug)}
                      onToggleFavorite={onToggleFavorite}
                      copy={copy}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tarjetas apiladas para mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        {data.map((entry) => {
          const isHighlighted = highlightSlug === entry.slug;
          return (
            <div
              key={entry.id}
              ref={(el) => {
                if (el) rowRefs.current.set(entry.slug, el);
              }}
              className={cn(
                "rounded-lg border border-border p-4",
                isHighlighted && "bg-accent ring-1 ring-inset ring-ring/40",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1.5">
                  <div
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-sm font-medium",
                      highlightCountry === "es" && "bg-es-soft",
                    )}
                  >
                    <SlangCell
                      value={entry.slang_es}
                      flag={<FlagES />}
                      sinEquivalente={copy.sinEquivalente}
                    />
                  </div>
                  <div
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-sm font-medium",
                      highlightCountry === "cl" && "bg-cl-soft",
                    )}
                  >
                    <SlangCell
                      value={entry.slang_cl}
                      flag={<FlagCL />}
                      sinEquivalente={copy.sinEquivalente}
                    />
                  </div>
                </div>
                <RowActions
                  entry={entry}
                  isFavorite={favoritesSet.has(entry.slug)}
                  onToggleFavorite={onToggleFavorite}
                  copy={copy}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="mr-1.5 text-xs italic">{entry.tipo_gramatical}</span>
                {entry.definicion}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <CategoryBadge categoria={entry.categoria} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
