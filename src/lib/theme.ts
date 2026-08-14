export const THEME_STORAGE_KEY = "cv-theme";

// The portfolio (www), this CV and the blog are three separate deployments, so
// localStorage — which is per origin — cannot carry the theme across the links
// between them. What they do share is the registrable domain, so the choice is
// mirrored into a cookie scoped to it and every site reads that first.
export const THEME_COOKIE_KEY = "theme";
export const THEME_COOKIE_DOMAIN = "gnadlinger.me";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const THEMES = ["light", "dark"] as const;

export type Theme = (typeof THEMES)[number];

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

export function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function cookieTheme(): Theme | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${THEME_COOKIE_KEY}=(dark|light)(?:\\s*;|$)`),
  );
  return match ? (match[1] as Theme) : null;
}

export function storedTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function readTheme(): Theme {
  return cookieTheme() ?? storedTheme() ?? systemTheme();
}

export function storeTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode and friends: the cookie below still keeps the session
    // consistent, so a blocked localStorage is not worth failing over.
  }

  const { hostname, protocol } = window.location;
  // On localhost and on preview deployments the shared domain does not apply;
  // writing it anyway would make the browser drop the cookie, so those fall
  // back to a host-only one and stay self-consistent.
  const shared =
    hostname === THEME_COOKIE_DOMAIN ||
    hostname.endsWith(`.${THEME_COOKIE_DOMAIN}`)
      ? `; domain=.${THEME_COOKIE_DOMAIN}`
      : "";
  const secure = protocol === "https:" ? "; Secure" : "";
  document.cookie = `${THEME_COOKIE_KEY}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax${shared}${secure}`;
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
}
