import { RESUME_DATA } from "@/data/resume-data";
import { BusinessCard } from "@/components/business-card";

export const metadata = {
  title: `${RESUME_DATA.name} – Visitenkarte`,
};

export default function CardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 p-8 print:bg-white print:p-0">
      <BusinessCard />
      <a
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground print:hidden"
      >
        ← Zurück zum CV
      </a>
    </main>
  );
}
