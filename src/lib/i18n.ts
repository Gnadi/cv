export const LANGUAGES = ["en", "de"] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

export interface Translated {
  en: string;
  de: string;
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
