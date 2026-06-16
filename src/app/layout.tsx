import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";

import "./globals.css";
import React from "react";
import { LanguageProvider } from "@/contexts/language-context";

export const metadata: Metadata = {
  title: "Johannes Gnadlinger | Product Owner & Payments Engineer",
  description: "CV of Johannes Gnadlinger — Product Owner & Engineer in banking payments (EBICS/SEPA) at Raiffeisen Software, Linz. Regulated financial infrastructure and AI-assisted product development.",
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
