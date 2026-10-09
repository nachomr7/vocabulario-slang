"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

const STORAGE_KEY = "vocabulario-favoritos";

export function useFavorites() {
  const [favoriteSlugs, setFavoriteSlugs] = useLocalStorage<string[]>(
    STORAGE_KEY,
    [],
  );

  const favoritesSet = useMemo(() => new Set(favoriteSlugs), [favoriteSlugs]);

  const toggleFavorite = useCallback(
    (slug: string) => {
      setFavoriteSlugs((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
      );
    },
    [setFavoriteSlugs],
  );

  return { favoritesSet, toggleFavorite };
}
