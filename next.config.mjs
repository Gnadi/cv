/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only the Docker build wants a self-contained server bundle. Setting it
  // unconditionally breaks `next start`, which is what `npm start`, the test
  // suite and Vercel all use.
  output: process.env.NEXT_OUTPUT_STANDALONE === "1" ? "standalone" : undefined,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
