"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  readTheme,
  type Theme,
} from "@/lib/theme";

// localStorage is an external store, so the theme is read through
// useSyncExternalStore: the server snapshot keeps hydration consistent and the
// subscription picks up changes made in other tabs.
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    listeners.forEach((listener) => listener());
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-8 print:hidden"
      onClick={toggle}
      aria-label={label}
    >
      {theme === "dark" ? (
        <SunIcon className="size-4" />
      ) : (
        <MoonIcon className="size-4" />
      )}
    </Button>
  );
}
