import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type SectionTone = "paper" | "ruled" | "white" | "board" | "ink";

type SectionProps = {
  children: React.ReactNode;
  tone?: SectionTone;
  /** Red margin line - only applies to the ruled tone */
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
  ruled: "ruled text-ink",
  white: "bg-white text-ink",
  board: "on-dark bg-board text-paper",
  ink: "on-dark bg-ink text-paper",
};

const spacingClass = {
  normal: "py-section",
  tight: "py-12 md:py-16",
  none: "",
};

export function Section({
  children,
  tone = "paper",
  margin = false,
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
      className={cn(
        "relative",
        toneClass[tone],
        tone === "ruled" && margin && "ruled-margin",
        spacingClass[spacing],
        className,
      )}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

/** Small mono label above a section heading, e.g. "02 / How it works". */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-label font-medium uppercase text-ink-soft [.on-dark_&]:text-pencil-soft",
        className,
      )}
    >
      {children}
    </p>
  );
}
