export const LANGUAGES = ["en", "de"] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

export interface Translated {
  en: string;
  de: string;
}

/**
 * The public path of each language. The default language lives at the root:
 * "/" is the URL people share and link to, so it has to be the indexable page
 * itself rather than a redirect Google reports as "Page with redirect".
 */
export function pathFor(language: Language): string {
  return language === DEFAULT_LANGUAGE ? "/" : `/${language}`;
}

export function isLanguage(value: string): value is Language {
  return (LANGUAGES as readonly string[]).includes(value);
}

/**
 * Returns the lookup used throughout the page. Kept as a factory so server
 * components can resolve a language once per request and pass the result down.
 */
export function createTranslator(language: Language) {
  return (translations: Translated) => translations[language];
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  de: "Deutsch",
};
