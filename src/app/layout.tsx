import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";

import "./globals.css";
import React from "react";
import { LanguageProvider } from "@/contexts/language-context";

const title = "Johannes Gnadlinger | Payments Engineer & former Product Owner";
const description =
  "CV of Johannes Gnadlinger — Payments Engineer and former Product Owner in banking payments (EBICS/SEPA) at Raiffeisen Software, Linz. Regulated financial infrastructure and AI-assisted product development.";

// Set NEXT_PUBLIC_SITE_URL to pin the canonical origin. On Vercel the
// production domain is used automatically; locally it falls back to the dev
// server so relative metadata URLs still resolve.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "profile",
    url: "/",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
      <Analytics />
    </html>
  );
}
