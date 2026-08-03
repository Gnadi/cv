import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import React from "react";
import { ThemeScript } from "@/components/theme-script";
import { LANGUAGES, isLanguage, type Language } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

const META: Record<Language, { title: string; description: string }> = {
  en: {
    title: "Johannes Gnadlinger | Payments Engineer & former Product Owner",
    description:
      "CV of Johannes Gnadlinger — Payments Engineer and former Product Owner in banking payments (EBICS/SEPA) at Raiffeisen Software, Linz. Regulated financial infrastructure and AI-assisted product development.",
  },
  de: {
    title: "Johannes Gnadlinger | Payments Engineer & ehem. Product Owner",
    description:
      "Lebenslauf von Johannes Gnadlinger — Payments Engineer und ehemaliger Product Owner im Zahlungsverkehr (EBICS/SEPA) bei Raiffeisen Software, Linz. Regulierte Finanzinfrastruktur und KI-gestützte Produktentwicklung.",
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
      </head>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
