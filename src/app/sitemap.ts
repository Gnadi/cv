import type { MetadataRoute } from "next";

import { LANGUAGES, pathFor } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGUAGES.map((lang) => ({
    url: new URL(pathFor(lang), siteUrl).href,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        LANGUAGES.map((l) => [l, new URL(pathFor(l), siteUrl).href]),
      ),
    },
  }));
}
