import { RESUME_DATA } from "@/data/resume-data";
import { createTranslator, type Language, type Translated } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

const resolve = (t: (value: Translated) => string) => {
  return (value: string | Translated) =>
    typeof value === "string" ? value : t(value);
};

/**
 * schema.org/Person for the CV.
 *
 * Rendered by a server component inside prerendered routes, so the markup is
 * baked into the static HTML at build time and costs no client-side JS. Every
 * value is read from RESUME_DATA rather than restated here, so the structured
 * data and the visible page cannot disagree.
 */
export function PersonJsonLd({ lang }: { lang: Language }) {
  const t = createTranslator(lang);
  const text = resolve(t);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Johannes Gnadlinger",
    honorificPrefix: "Ing.",
    jobTitle: t(RESUME_DATA.headline.role),
    description: t(RESUME_DATA.headline.tagline),
    url: siteUrl,
    image: `${siteUrl}${RESUME_DATA.avatarUrl}`,
    email: `mailto:${RESUME_DATA.contact.email}`,
    worksFor: {
      "@type": "Organization",
      name: RESUME_DATA.work[0].company,
      url: RESUME_DATA.work[0].link,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Linz",
      addressCountry: "AT",
    },
    knowsAbout: RESUME_DATA.knowsAbout.map(text),
    // Derived from the contact links so the identity graph published here stays
    // in step with the links the page actually renders.
    sameAs: [
      ...RESUME_DATA.contact.social.map((social) => social.url),
      RESUME_DATA.contact.stackOverflow,
    ],
  };

  return (
    <script
      type="application/ld+json"
      // The payload is static, authored content — but escaping `<` keeps a
      // stray "</script>" in future copy from breaking out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(person).replace(/</g, "\\u003c"),
      }}
    />
  );
}
