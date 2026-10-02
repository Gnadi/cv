/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits a self-contained server bundle so the Docker runtime stage does not
  // need node_modules or the source tree.
  output: "standalone",
  async redirects() {
    return [
      // A German-speaking visitor lands on the German CV. Accept-Language
      // lists the preferred locale first, so matching the head of the header
      // is enough; "de", "de-AT" and "de-AT,de;q=0.9,en;q=0.8" all match,
      // while "en-GB,de;q=0.5" correctly does not. Googlebot crawls without a
      // German Accept-Language, so it always gets the English page at "/".
      {
        source: "/",
        has: [
          {
            type: "header",
            key: "accept-language",
            value: "de(-[A-Za-z]+)?([,;].*)?",
          },
        ],
        destination: "/de",
        // Deliberately temporary: the target depends on the request header, so
        // it must not be cached as if it were the one true answer for "/".
        permanent: false,
      },
      // The English CV is served at "/" (see the rewrite below), so /en is
      // only an alias. Old links keep working and pass their signals on.
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Serve the English CV at the root instead of redirecting to /en: a
      // redirecting root is reported by Google as "Page with redirect" and
      // never indexed, although it is the URL everyone links to. Rewrites run
      // after redirects, so this does not loop with the /en → / redirect.
      { source: "/", destination: "/en" },
    ];
  },
};

export default nextConfig;
