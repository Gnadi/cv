import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import React from "react";
import { ThemeScript } from "@/components/theme-script";
import { PersonJsonLd } from "@/components/person-json-ld";
import { RESUME_DATA } from "@/data/resume-data";
import { LANGUAGES, isLanguage, type Language } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

// Built from the canonical role in RESUME_DATA rather than restated, so the
// title cannot drift away from the headline the page renders.
const ROLE = RESUME_DATA.headline.role;

const META: Record<Language, { title: string; description: string }> = {
  en: {
    title: `Johannes Gnadlinger — ${ROLE.en}`,
    description:
      "Payments & Backend Engineer at Raiffeisen Software in Linz, Austria. 8+ years building payment systems for corporate banking — SEPA, EBICS and Java backend services. Former Product Owner.",
  },
  de: {
    title: `Johannes Gnadlinger — ${ROLE.de}`,
    description:
      "Payments & Backend Engineer bei Raiffeisen Software in Linz. Über 8 Jahre Erfahrung mit Zahlungsverkehrssystemen im Firmenkundengeschäft — SEPA, EBICS und Java-Backend-Services. Zuvor Product Owner.",
  },
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};

  const { title, description } = META[lang];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      // Makes the German CV a shareable, indexable URL rather than a
      // client-side toggle search engines never see.
      languages: Object.fromEntries(LANGUAGES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title,
      description,
      type: "profile",
      firstName: "Johannes",
      lastName: "Gnadlinger",
      locale: lang === "de" ? "de_AT" : "en_US",
      url: `/${lang}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <PersonJsonLd lang={lang} />
      </head>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
