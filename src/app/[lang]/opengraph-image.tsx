import { ImageResponse } from "next/og";

import { RESUME_DATA } from "@/data/resume-data";
import {
  LANGUAGES,
  createTranslator,
  isLanguage,
  DEFAULT_LANGUAGE,
} from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${RESUME_DATA.name} — CV`;

// Without this the image is rendered on demand for every crawler request.
export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = createTranslator(isLanguage(lang) ? lang : DEFAULT_LANGUAGE);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#ffffff",
        color: "#0b0d17",
      }}
    >
      <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: "-0.02em" }}>
        {RESUME_DATA.name}
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 32,
          lineHeight: 1.4,
          color: "#4b5563",
          whiteSpace: "pre-line",
        }}
      >
        {t(RESUME_DATA.about)}
      </div>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          fontSize: 26,
          color: "#6b7280",
        }}
      >
        {RESUME_DATA.location}
      </div>
    </div>,
    size,
  );
}
