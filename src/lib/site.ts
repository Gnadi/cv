/**
 * Canonical origin for metadata, sitemap and OpenGraph URLs.
 *
 * Set NEXT_PUBLIC_SITE_URL to pin it. On Vercel the production domain is used
 * automatically; locally it falls back to the dev server so relative metadata
 * URLs still resolve.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
