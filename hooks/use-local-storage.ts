"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

const listeners = new Map<string, Set<() => void>>();

function emit(key: string) {
  listeners.get(key)?.forEach((listener) => listener());
}

// Sincroniza estado de React con localStorage vía useSyncExternalStore (en
// vez de leer en un useEffect + setState, que dispara un render extra).
export function useLocalStorage<T>(key: string, initialValue: T) {
  const initialRef = useRef(initialValue);
  const cache = useRef<{ raw: string | null; value: T }>({
    raw: null,
    value: initialValue,
  });

  const subscribe = useCallback(
    (callback: () => void) => {
      if (!listeners.has(key)) listeners.set(key, new Set());
      listeners.get(key)!.add(callback);
      return () => listeners.get(key)!.delete(callback);
    },
    [key],
  );

  const getSnapshot = useCallback((): T => {
    let raw: string | null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return initialRef.current;
    }
    if (raw === cache.current.raw) return cache.current.value;
    let parsed = initialRef.current;
    if (raw !== null) {
      try {
        parsed = JSON.parse(raw) as T;
      } catch {
        parsed = initialRef.current;
      }
    }
    cache.current = { raw, value: parsed };
    return parsed;
  }, [key]);

  const getServerSnapshot = useCallback(() => initialRef.current, []);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved = next instanceof Function ? next(getSnapshot()) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // ignorar errores de cuota/privacidad
      }
      emit(key);
    },
    [key, getSnapshot],
  );

  return [value, setValue] as const;
}
