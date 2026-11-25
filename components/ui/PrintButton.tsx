"use client";

import { Button } from "./Button";

/** Opens the browser's print dialog, where "Save as PDF" is one of the printers. */
export function PrintButton({ children = "Print or save as PDF" }: { children?: React.ReactNode }) {
  return (
    <Button
      type="button"
      size="lg"
      onClick={() => window.print()}
      icon={
        <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 7 V2.5 H15 V7" />
          <rect x="2.5" y="7" width="15" height="7" rx="1" />
          <path d="M5 11.5 H15 V17.5 H5 Z" />
        </svg>
      }
    >
      {children}
    </Button>
  );
}
