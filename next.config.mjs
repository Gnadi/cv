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
      // while "en-GB,de;q=0.5" correctly does not.
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
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
