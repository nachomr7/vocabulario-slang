import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Country } from "@/hooks/use-country";

const BACKGROUNDS: Record<"es" | "cl", { desktop: string; mobile: string }> = {
  es: {
    desktop: "/backgrounds/spain-desktop.webp",
    mobile: "/backgrounds/spain-mobile.webp",
  },
  cl: {
    desktop: "/backgrounds/chile-desktop.webp",
    mobile: "/backgrounds/chile-mobile.webp",
  },
};

// Antes de elegir país mostramos España de base: evita un fondo en blanco
// y da algo lindo para mezclar cuando el usuario recién toca el toggle.
export function HeroBackground({ country }: { country: Country | null }) {
  const active = country ?? "es";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {(Object.keys(BACKGROUNDS) as Array<keyof typeof BACKGROUNDS>).map((c) => (
        <div
          key={c}
          aria-hidden
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out",
            active === c ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={BACKGROUNDS[c].desktop}
            alt=""
            fill
            priority={c === "es"}
            sizes="(min-width: 640px) 1200px, 100vw"
            className="hidden object-cover sm:block"
          />
          <Image
            src={BACKGROUNDS[c].mobile}
            alt=""
            fill
            priority={c === "es"}
            sizes="100vw"
            className="object-cover sm:hidden"
          />
        </div>
      ))}
      {/* Velo uniforme para que el texto encima siga siendo legible sobre
          la foto, sin importar cuánto contenido apile el hero (la altura
          varía bastante entre mobile y desktop). */}
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
}
