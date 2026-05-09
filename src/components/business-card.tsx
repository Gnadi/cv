"use client";

import { RESUME_DATA } from "@/data/resume-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DownloadIcon, GlobeIcon, MailIcon } from "lucide-react";

function downloadVCard() {
  const { name, contact } = RESUME_DATA;
  const websiteUrl = contact.social.find((s) => s.name === "Website")?.url ?? "";
  const linkedInUrl = contact.social.find((s) => s.name === "LinkedIn")?.url ?? "";

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `EMAIL:${contact.email}`,
    websiteUrl ? `URL:${websiteUrl}` : "",
    linkedInUrl ? `X-SOCIALPROFILE;type=linkedin:${linkedInUrl}` : "",
    "END:VCARD",
  ].filter(Boolean);

  const blob = new Blob([lines.join("\n")], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name.replace(/\s+/g, "_")}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}

export function BusinessCard() {
  const websiteUrl = RESUME_DATA.contact.social.find((s) => s.name === "Website")?.url;

  return (
    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-black/5 print:shadow-none print:ring-0">
      <div className="flex items-center gap-6 p-8">
        <Avatar className="size-20 shrink-0">
          <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
          <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 space-y-1">
          <h1 className="text-xl font-bold tracking-tight">{RESUME_DATA.name}</h1>
          <p className="text-sm text-muted-foreground">Full Stack Engineer</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <GlobeIcon className="size-3 shrink-0" />
            {RESUME_DATA.location}
          </p>
        </div>
      </div>

      <div className="space-y-2 border-t px-8 py-4">
        <a
          href={`mailto:${RESUME_DATA.contact.email}`}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <MailIcon className="size-4 shrink-0" />
          {RESUME_DATA.contact.email}
        </a>
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GlobeIcon className="size-4 shrink-0" />
            {websiteUrl.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>

      <div className="border-t px-8 py-4 print:hidden">
        <Button onClick={downloadVCard} className="w-full gap-2">
          <DownloadIcon className="size-4" />
          Kontakt speichern (.vcf)
        </Button>
      </div>
    </div>
  );
}
