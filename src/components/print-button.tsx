"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button
      className="size-8"
      variant="outline"
      size="icon"
      onClick={() => window.print()}
      aria-label="Download CV as PDF"
    >
      <Download className="size-4" />
    </Button>
  );
}
