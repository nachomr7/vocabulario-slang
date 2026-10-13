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
//
// Fondo fijo a toda la página (no solo detrás del header): así se ve la
// foto completa en los márgenes y arriba de la card de contenido, en vez
// de una franja recortada que perdía casi toda la escena.
export function HeroBackground({ country }: { country: Country | null }) {
  const active = country ?? "es";

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {(Object.keys(BACKGROUNDS) as Array<keyof typeof BACKGROUNDS>).map((c) => (
        <div
          key={c}
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
            sizes="100vw"
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
      {/* Velo liviano: los pills (toggles) y la card de contenido ya tienen
          su propio fondo sólido, así que acá solo suavizamos la foto. */}
      <div className="absolute inset-0 bg-background/25" />
    </div>
  );
}
