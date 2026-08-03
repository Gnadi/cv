/**
 * Canonical origin for metadata, sitemap and OpenGraph URLs.
 *
 * Set NEXT_PUBLIC_SITE_URL to pin it. On Vercel the production domain is used
 * automatically; locally it falls back to the dev server so relative metadata
 * URLs still resolve.
 */
const configured =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

// A silent localhost fallback would ship canonical, sitemap and OpenGraph URLs
// pointing at the developer's machine, which is hard to notice after the fact.
if (
  !configured &&
  process.env.NODE_ENV === "production" &&
  typeof window === "undefined"
) {
  console.warn(
    "[cv] NEXT_PUBLIC_SITE_URL is not set — metadata, sitemap and robots.txt will point at http://localhost:3000.",
  );
}

export const siteUrl = configured ?? "http://localhost:3000";
