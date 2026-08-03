import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// Next 16 removed `next lint`, and ESLint 9 defaults to flat config, so the
// old .eslintrc.json is no longer picked up. Linting now runs via the ESLint
// CLI against this file.
const config = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
];

export default config;
