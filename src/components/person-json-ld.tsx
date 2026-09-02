import { RESUME_DATA } from "@/data/resume-data";
import { EMPLOYER_ID, EMPLOYER_URL, PERSON_ID, PERSON_URL } from "@/lib/entity";
import { createTranslator, type Language, type Translated } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

const resolve = (t: (value: Translated) => string) => {
  return (value: string | Translated) =>
    typeof value === "string" ? value : t(value);
};

/**
 * schema.org for the CV, emitted as a `@graph`.
 *
 * The important part is the `@id` on the Person: it names the *same* entity
 * the portfolio and the blog publish, so the three hosts reconcile into one
 * person with three sets of corroborating facts rather than three people who
 * happen to share a name. Without it this page published a second, unlinked
 * Person — which is what it did before.
 *
 * `url` therefore points at the portfolio, the entity's home, not at this
 * page; this page is described by the ProfilePage node instead.
 *
 * Rendered by a server component inside prerendered routes, so the markup is
 * baked into the static HTML at build time and costs no client-side JS. Every
 * value is read from RESUME_DATA rather than restated here, so the structured
 * data and the visible page cannot disagree.
 */
export function PersonJsonLd({ lang }: { lang: Language }) {
  const t = createTranslator(lang);
  const text = resolve(t);

  const pageUrl = `${siteUrl}/${lang}`;

  // The school entries carry both a formal qualification and a school; the
  // Ing. qualification is a credential, the rest is where he studied.
  const credentials = RESUME_DATA.education.map((entry) => ({
    "@type": "EducationalOccupationalCredential",
    name: text(entry.degree),
    ...(entry.start ? { dateCreated: entry.start } : {}),
    recognizedBy: {
      "@type": "EducationalOrganization",
      name: entry.school,
      url: entry.link,
    },
  }));

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profilepage`,
    url: pageUrl,
    name: `${RESUME_DATA.name} — ${t(RESUME_DATA.headline.role)}`,
    inLanguage: lang === "de" ? "de-AT" : "en",
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
  };

  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Johannes Gnadlinger",
    honorificPrefix: "Ing.",
    givenName: "Johannes",
    familyName: "Gnadlinger",
    jobTitle: t(RESUME_DATA.headline.role),
    description: t(RESUME_DATA.headline.tagline),
    url: PERSON_URL,
    image: `${siteUrl}${RESUME_DATA.avatarUrl}`,
    email: `mailto:${RESUME_DATA.contact.email}`,
    worksFor: { "@id": EMPLOYER_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Linz",
      addressCountry: "AT",
    },
    knowsAbout: RESUME_DATA.knowsAbout.map(text),
    alumniOf: RESUME_DATA.education.map((entry) => ({
      "@type": "EducationalOrganization",
      name: entry.school,
      url: entry.link,
    })),
    hasCredential: credentials,
    // Derived from the contact links so the identity graph published here stays
    // in step with the links the page actually renders.
    sameAs: [
      ...RESUME_DATA.contact.social.map((social) => social.url),
      RESUME_DATA.contact.stackOverflow,
    ],
    subjectOf: { "@id": profilePage["@id"] },
  };

  const employer = {
    "@type": "Organization",
    "@id": EMPLOYER_ID,
    name: RESUME_DATA.work[0].company,
    url: EMPLOYER_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Linz",
      addressRegion: "Oberösterreich",
      addressCountry: "AT",
    },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [profilePage, person, employer],
  };

  return (
    <script
      type="application/ld+json"
      // The payload is static, authored content — but escaping `<` keeps a
      // stray "</script>" in future copy from breaking out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
