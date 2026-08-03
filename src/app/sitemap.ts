import type { MetadataRoute } from "next";

import { LANGUAGES } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGUAGES.map((lang) => ({
    url: `${siteUrl}/${lang}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        LANGUAGES.map((l) => [l, `${siteUrl}/${l}`]),
      ),
    },
  }));
}
