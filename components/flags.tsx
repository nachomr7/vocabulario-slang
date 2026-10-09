import { cn } from "@/lib/utils";

/**
 * Banderas como SVG en vez de emoji: Windows históricamente no renderiza
 * los emojis de bandera (regional indicators) y muestra el código de país
 * en texto plano ("ES" / "CL") en su lugar. Un SVG propio se ve igual en
 * cualquier sistema operativo o navegador.
 */

function FlagWrapper({
  className,
  children,
  label,
}: {
  className?: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "inline-block overflow-hidden rounded-[2px] align-[-0.1em] ring-1 ring-border",
        className,
      )}
    >
      <svg viewBox="0 0 3 2" className="block h-full w-full">
        {children}
      </svg>
    </span>
  );
}

export function FlagES({ className }: { className?: string }) {
  return (
    <FlagWrapper className={cn("h-3.5 w-5", className)} label="Bandera de España">
      <rect width="3" height="2" fill="#AA151B" />
      <rect y="0.5" width="3" height="1" fill="#F1BF00" />
    </FlagWrapper>
  );
}

export function FlagCL({ className }: { className?: string }) {
  return (
    <FlagWrapper className={cn("h-3.5 w-5", className)} label="Bandera de Chile">
      <rect width="3" height="2" fill="#FFFFFF" />
      <rect y="1" width="3" height="1" fill="#D52B1E" />
      <rect width="1" height="1" fill="#0039A6" />
      <path
        d="M0.5 0.14 L0.61 0.4 L0.89 0.4 L0.66 0.57 L0.75 0.84 L0.5 0.67 L0.25 0.84 L0.34 0.57 L0.11 0.4 L0.39 0.4 Z"
        fill="#FFFFFF"
      />
    </FlagWrapper>
  );
}
