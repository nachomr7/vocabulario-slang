"use client";

import { Button } from "@/components/ui/button";

export function Pagination({
  page,
  pageCount,
  onPageChange,
  prevLabel,
  nextLabel,
  pageLabel,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  prevLabel: string;
  nextLabel: string;
  pageLabel: (page: number, pageCount: number) => string;
}) {
  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        {prevLabel}
      </Button>
      <span className="text-sm text-muted-foreground">
        {pageLabel(page, pageCount)}
      </span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
