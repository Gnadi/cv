import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LANGUAGE_LABELS, type Language } from "@/lib/i18n";

/**
 * A real link rather than a state toggle, so each language has a shareable,
 * crawlable URL.
 */
export function LanguageSwitcher({ current }: { current: Language }) {
  const other: Language = current === "en" ? "de" : "en";

  return (
    <Button
      variant="outline"
      size="sm"
      className="font-mono text-xs print:hidden"
      asChild
    >
      <Link
        href={`/${other}`}
        hrefLang={other}
        aria-label={`Switch to ${LANGUAGE_LABELS[other]}`}
      >
        {other.toUpperCase()}
      </Link>
    </Button>
  );
}
