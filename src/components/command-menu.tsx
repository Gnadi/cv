"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { CommandIcon } from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";

interface Props {
  links: { url: string; title: string }[];
}

const PDF_MARGIN_PT = 28;

async function downloadResumeAsPdf() {
  const element = document.getElementById("resume-content");
  if (!element) return;

  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#ffffff",
  });

  const pdf = new jsPDF("p", "pt", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - PDF_MARGIN_PT * 2;
  const contentHeight = pageHeight - PDF_MARGIN_PT * 2;

  // canvas pixels per pt, derived from how wide the image is once scaled to fit contentWidth
  const pxPerPt = canvas.width / contentWidth;
  const pageHeightPx = Math.floor(contentHeight * pxPerPt);

  const pageCanvas = document.createElement("canvas");
  pageCanvas.width = canvas.width;
  const pageCtx = pageCanvas.getContext("2d");
  if (!pageCtx) return;

  let renderedPx = 0;
  let isFirstPage = true;

  while (renderedPx < canvas.height) {
    const sliceHeightPx = Math.min(pageHeightPx, canvas.height - renderedPx);
    pageCanvas.height = sliceHeightPx;
    pageCtx.fillStyle = "#ffffff";
    pageCtx.fillRect(0, 0, pageCanvas.width, sliceHeightPx);
    pageCtx.drawImage(
      canvas,
      0,
      renderedPx,
      canvas.width,
      sliceHeightPx,
      0,
      0,
      canvas.width,
      sliceHeightPx,
    );

    const sliceImgData = pageCanvas.toDataURL("image/jpeg", 0.92);
    const sliceHeightPt = sliceHeightPx / pxPerPt;

    if (!isFirstPage) pdf.addPage();
    pdf.addImage(
      sliceImgData,
      "JPEG",
      PDF_MARGIN_PT,
      PDF_MARGIN_PT,
      contentWidth,
      sliceHeightPt,
    );

    renderedPx += sliceHeightPx;
    isFirstPage = false;
  }

  const fileName = `${RESUME_DATA.name.replace(/[^a-zA-Z0-9]+/g, "-")}-resume.pdf`;
  pdf.save(fileName);
}

export const CommandMenu = ({ links }: Props) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p className="fixed bottom-0 left-0 right-0 hidden border-t border-t-muted bg-white p-1 text-center text-sm text-muted-foreground print:hidden xl:block">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-black opacity-100">
          <span className="text-xs">strg + </span>J
        </kbd>{" "}
        to open the command menu
      </p>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant="outline"
        size="icon"
        aria-label="open command menu"
        className="fixed bottom-4 right-4 flex rounded-full shadow-2xl print:hidden xl:hidden"
      >
        <CommandIcon className="my-6 size-6" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                window.print();
              }}
            >
              <span>Print</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                void downloadResumeAsPdf();
              }}
            >
              <span>Download PDF</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Links">
            {links.map(({ url, title }) => (
              <CommandItem
                key={url}
                onSelect={() => {
                  setOpen(false);
                  window.open(url, "_blank");
                }}
              >
                <span>{title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
};
