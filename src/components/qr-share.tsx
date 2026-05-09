"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon, QrCodeIcon } from "lucide-react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RESUME_DATA } from "@/data/resume-data";

const CV_URL =
  RESUME_DATA.contact.social.find((s) => s.name === "Website")?.url ??
  "https://gnadlinger.me";

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function QrShare({ open, onOpenChange }: Props) {
  const [copied, setCopied] = useState(false);

  const isControlled = open !== undefined;

  function copyLink() {
    navigator.clipboard.writeText(CV_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Dialog open={isControlled ? open : undefined} onOpenChange={onOpenChange}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button
            className="size-8"
            variant="outline"
            size="icon"
            aria-label="share CV via QR code"
          >
            <QrCodeIcon className="size-4" />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle>CV teilen</DialogTitle>
          <DialogDescription>
            QR-Code scannen zum direkten Aufrufen des CVs.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="rounded-lg bg-white p-4 ring-1 ring-black/10">
            <QRCode value={CV_URL} size={180} />
          </div>
          <Button variant="outline" className="w-full gap-2" onClick={copyLink}>
            {copied ? (
              <CheckIcon className="size-4" />
            ) : (
              <CopyIcon className="size-4" />
            )}
            {copied ? "Kopiert!" : "Link kopieren"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
