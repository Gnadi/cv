/**
 * The shared entity anchors.
 *
 * The portfolio, the CV and the blog are three deployments on three hosts, and
 * a search engine has no way to know they describe one person unless they say
 * so. They say so by publishing nodes under the *same* `@id`, which is why
 * these values point at www.gnadlinger.me even though nothing here is served
 * from there: an `@id` is a name for the entity, not a location to fetch.
 *
 * Keep in sync with `src/lib/schema.ts` in the portfolio repository, which is
 * where the same three constants are defined.
 */

/** The origin that owns the entity names below. */
export const ENTITY_ORIGIN = "https://www.gnadlinger.me";

export const PERSON_ID = `${ENTITY_ORIGIN}/#person`;
export const EMPLOYER_ID = `${ENTITY_ORIGIN}/#raiffeisen-software`;

/** The person's home on the web — the portfolio, not this CV. */
export const PERSON_URL = `${ENTITY_ORIGIN}/`;

/** The employer's own site. Stated identically on every property. */
export const EMPLOYER_URL = "https://r-software.at";
