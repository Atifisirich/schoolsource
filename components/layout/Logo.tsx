import Link from "next/link";
import { cn } from "@/lib/cn";

type Tone = "ink" | "paper";

/**
 * The SchoolSource mark: one unbroken line, drawn as an S, leaving a single
 * orange point. One source, one line of supply to the school.
 *
 * Drawn on a 32-unit grid (stroke 4, bars on y = 8 / 16 / 24) so it stays crisp at
 * 16px; the viewBox is cropped to the visible shape (24 x 21). Keep in sync with
 * public/brand/*.svg and app/icon.svg.
 */
export function LogoMark({ className, tone = "ink" }: { className?: string; tone?: Tone }) {
  return (
    <svg viewBox="4 5 24 21" className={cn("block", className)} aria-hidden="true" focusable="false">
      <path
        d="M20 8H10a4 4 0 0 0 0 8h12a4 4 0 0 1 0 8H4"
        fill="none"
        stroke={tone === "ink" ? "var(--color-board)" : "var(--color-paper)"}
        strokeWidth="4"
      />
      <circle cx="25" cy="8" r="3" fill="var(--color-pencil)" />
    </svg>
  );
}

/**
 * Mark + wordmark, linked to the home page.
 * `tone="ink"` for white backgrounds (blue line, ink type);
 * `tone="paper"` for the ink footer (white line, white type). The orange point stays orange.
 */
export function Logo({ className, tone = "ink" }: { className?: string; tone?: Tone }) {
  return (
    <Link
      href="/"
      aria-label="SchoolSource home"
      className={cn(
        "inline-flex items-baseline gap-[0.3em] font-display text-[1.375rem] font-semibold leading-none tracking-[-0.01em]",
        tone === "ink" ? "text-ink" : "text-paper",
        className,
      )}
    >
      {/* Mark body is 1.2x the cap height, its bottom edge on the baseline. */}
      <LogoMark tone={tone} className="h-[0.845em] w-[0.965em] shrink-0" />
      <span>SchoolSource</span>
    </Link>
  );
}
