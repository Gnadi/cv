/**
 * Canonical origin for metadata, sitemap and OpenGraph URLs.
 *
 * Set NEXT_PUBLIC_SITE_URL to pin it. On Vercel the production domain is used
 * automatically; locally it falls back to the dev server so relative metadata
 * URLs still resolve.
 */
// The domain the CV is published under. It also appears in the JSON-LD `url`
// and in the sameAs identity graph shared with the other properties, so it is
// stated here rather than left to an env var that a build can silently miss.
export const CANONICAL_ORIGIN = "https://cv.gnadlinger.me";

const configured =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

// A localhost fallback in a production build would ship canonical, sitemap and
// OpenGraph URLs pointing at the developer's machine. Only `next dev` gets it.
export const siteUrl =
  configured ??
  (process.env.NODE_ENV === "production"
    ? CANONICAL_ORIGIN
    : "http://localhost:3000");
