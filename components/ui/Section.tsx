import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Section grounds. Paper is the default and should stay the dominant ground;
 * use at most two coloured sections in a row.
 *
 * paper   the page ground
 * cream   a warm quiet band
 * sky     a pale blue band
 * blue    brand blue, white text (.on-dark)
 * ink     the dark band, white text (.on-dark)
 * orange  the closing call to action; navy text only (.on-orange)
 *
 * v2 names still work: muted → cream, white/ruled → paper, board → ink.
 */
export type SectionTone =
  | "paper"
  | "cream"
  | "sky"
  | "blue"
  | "ink"
  | "orange"
  | "muted"
  | "white"
  | "ruled"
  | "board";

type SectionProps = {
  children: React.ReactNode;
  tone?: SectionTone;
  /** @deprecated No effect. */
  margin?: boolean;
  /** Skip the inner Container when the section manages its own width */
  bleed?: boolean;
  spacing?: "normal" | "tight" | "none";
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

export const sectionTone: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  cream: "bg-cream text-ink",
  sky: "bg-sky text-ink",
  blue: "on-dark bg-blue text-white",
  ink: "on-dark bg-ink-logo text-white",
  orange: "on-orange bg-orange text-ink",
  // v2 names
  muted: "bg-cream text-ink",
  white: "bg-paper text-ink",
  ruled: "bg-paper text-ink",
  board: "on-dark bg-ink-logo text-white",
};

const spacingClass = {
  normal: "py-section",
  tight: "py-14 md:py-20",
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
      className={cn("relative", sectionTone[tone], spacingClass[spacing], className)}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

/**
 * The opening of every section: what this is (heading), one plain sentence,
 * and at most one action. Heading left, sentence and action right on wide
 * screens; stacked on phones.
 */
export function SectionHead({
  id,
  title,
  intro,
  action,
  as: Heading = "h2",
  className,
}: {
  /** id for the heading, to pair with the section's aria-labelledby */
  id?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  action?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 grid gap-5 md:mb-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-16",
        className,
      )}
    >
      <Heading id={id} className="max-w-[14em] text-h2">
        {title}
      </Heading>
      {intro || action ? (
        <div className="grid max-w-[30rem] justify-items-start gap-4 lg:justify-self-end">
          {intro ? <p className="text-lead text-ink-soft [.on-dark_&]:text-[#d7e3fb]">{intro}</p> : null}
          {action}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Short line above a heading when the heading needs context. Use rarely.
 */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("pill pill-dot mb-5", className)}>{children}</p>;
}
