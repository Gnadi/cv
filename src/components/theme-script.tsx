import { THEME_STORAGE_KEY } from "@/lib/theme";

// Runs before paint so the stored theme is applied without a flash of the
// wrong colours. Kept as a raw string because it has to execute ahead of
// React hydration.
const script = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.dataset.theme=t;}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
