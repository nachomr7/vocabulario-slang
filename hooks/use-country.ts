"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";

export type Country = "es" | "cl";

const STORAGE_KEY = "vocabulario-pais";

export function useCountry() {
  const [country, setCountry] = useLocalStorage<Country | null>(
    STORAGE_KEY,
    null,
  );

  return { country, setCountry };
}
