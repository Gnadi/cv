export const THEME_STORAGE_KEY = "cv-theme";

export const THEMES = ["light", "dark"] as const;

export type Theme = (typeof THEMES)[number];

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

export function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function readTheme(): Theme {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(stored) ? stored : systemTheme();
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
}
