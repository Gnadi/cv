import {
  THEME_COOKIE_DOMAIN,
  THEME_COOKIE_KEY,
  THEME_COOKIE_MAX_AGE,
  THEME_STORAGE_KEY,
} from "@/lib/theme";

// Runs before paint so the stored theme is applied without a flash of the
// wrong colours. Kept as a raw string because it has to execute ahead of
// React hydration — it mirrors the helpers in @/lib/theme, which the toggle
// uses once React is up.
const script = `(function () {
  var COOKIE = ${JSON.stringify(THEME_COOKIE_KEY)};
  var STORAGE = ${JSON.stringify(THEME_STORAGE_KEY)};
  var DOMAIN = ${JSON.stringify(THEME_COOKIE_DOMAIN)};
  var MAX_AGE = ${THEME_COOKIE_MAX_AGE};
  var VALUE = /^(dark|light)$/;

  function fromCookie() {
    var match = document.cookie.match(new RegExp("(?:^|;\\\\s*)" + COOKIE + "=(dark|light)(?:\\\\s*;|$)"));
    return match ? match[1] : null;
  }

  function fromStorage() {
    try {
      var stored = localStorage.getItem(STORAGE);
      return VALUE.test(stored) ? stored : null;
    } catch (error) {
      return null;
    }
  }

  function toStorage(theme) {
    try {
      localStorage.setItem(STORAGE, theme);
    } catch (error) {}
  }

  function toCookie(theme) {
    var host = location.hostname;
    var shared = host === DOMAIN || host.slice(-DOMAIN.length - 1) === "." + DOMAIN ? "; domain=." + DOMAIN : "";
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = COOKIE + "=" + theme + "; path=/; max-age=" + MAX_AGE + "; SameSite=Lax" + shared + secure;
  }

  function sync() {
    var shared = fromCookie();
    var local = fromStorage();
    var theme = shared || local;

    if (theme) {
      // Refreshes the cookie's lifetime, seeds it for visitors whose choice
      // predates it, and adopts a theme picked on one of the sibling sites.
      toCookie(theme);
      if (theme !== local) toStorage(theme);
    } else {
      theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  }

  sync();

  // The portfolio links here with target="_blank", so both tabs stay open and
  // the theme may have been switched in the other one meanwhile.
  addEventListener("visibilitychange", function () {
    if (!document.hidden) sync();
  });
  addEventListener("focus", sync);
  addEventListener("pageshow", function (event) {
    if (event.persisted) sync();
  });
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
