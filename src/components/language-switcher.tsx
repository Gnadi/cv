"use client";

import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="print:hidden">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLanguage(language === "en" ? "de" : "en")}
        className="font-mono text-xs"
      >
        {language === "en" ? "DE" : "EN"}
      </Button>
    </div>
  );
}
