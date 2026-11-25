import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * paper  white (default)
 * muted  paper-deep grey band, to separate sections without shadows
 * ink    the one dark band per page
 *
 * Deprecated aliases, kept so v1 pages compile; do not use in new code:
 * white -> paper, ruled -> paper, board -> ink.
 */
export type SectionTone = "paper" | "muted" | "ink" | "white" | "ruled" | "board";

type SectionProps = {
  children: React.ReactNode;
  tone?: SectionTone;
  /** @deprecated No effect. The ruled paper background is gone. */
  margin?: boolean;
  /** Skip the inner Container when the section manages its own width */
  bleed?: boolean;
  spacing?: "normal" | "tight" | "none";
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

const toneClass: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  muted: "bg-paper-deep text-ink",
  ink: "on-dark bg-ink text-paper",
  // Deprecated aliases
  white: "bg-paper text-ink",
  ruled: "bg-paper text-ink",
  board: "on-dark bg-ink text-paper",
};

const spacingClass = {
  normal: "py-section",
  tight: "py-12 md:py-16",
  none: "",
};

export function Section({
  children,
  tone = "paper",
  bleed = false,
  spacing = "normal",
  className,
  id,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={rest["aria-labelledby"]}
      className={cn("relative", toneClass[tone], spacingClass[spacing], className)}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

/**
 * Short sentence-case line above a heading when the heading needs context.
 * Use rarely: at most one per page. Most sections have none.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("font-sans text-sm font-semibold text-board [.on-dark_&]:text-pencil", className)}>
      {children}
    </p>
  );
}
