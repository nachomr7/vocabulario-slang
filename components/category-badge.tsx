import { cn } from "@/lib/utils";

const DOT_COLORS = [
  "bg-brand-violet",
  "bg-brand-amethyst",
  "bg-brand-wisteria",
  "bg-brand-plum",
  "bg-brand-rose",
  "bg-brand-slate",
  "bg-destructive",
];

function dotColorFor(categoria: string) {
  let hash = 0;
  for (let i = 0; i < categoria.length; i++) {
    hash = (hash * 31 + categoria.charCodeAt(i)) >>> 0;
  }
  return DOT_COLORS[hash % DOT_COLORS.length];
}

export function CategoryBadge({
  categoria,
  active,
  className,
}: {
  categoria: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-0.5 text-xs font-medium whitespace-nowrap text-muted-foreground transition-opacity",
        active === false && "opacity-40",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", dotColorFor(categoria))} />
      {categoria}
    </span>
  );
}
