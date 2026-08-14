"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { applyTheme, readTheme, storeTheme, type Theme } from "@/lib/theme";

// The theme lives in browser storage rather than in React, so it is read
// through useSyncExternalStore: the server snapshot keeps hydration
// consistent and the subscription picks up changes made in other tabs — both
// on this site (storage events) and on the portfolio or the blog, which share
// the theme through a cookie and are usually open in a tab of their own.
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("focus", onStoreChange);
  document.addEventListener("visibilitychange", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("focus", onStoreChange);
    document.removeEventListener("visibilitychange", onStoreChange);
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
    storeTheme(next);
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
