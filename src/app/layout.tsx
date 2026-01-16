import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";

import "./globals.css";
import React from "react";
import { LanguageProvider } from "@/contexts/language-context";

export const metadata: Metadata = {
  title: "Johannes Gnadlinger | Fullstack Developer",
  description: "Portfolio and Resume of Johannes Gnadlinger, a passionate Fullstack Developer specializing in building scalable web applications and engaging user experiences.",
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
