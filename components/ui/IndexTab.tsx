import { cn } from "@/lib/cn";

export type IndexTabTone = "pencil" | "board" | "paper" | "white" | "ink";

const toneClass: Record<IndexTabTone, string> = {
  pencil: "bg-pencil-soft text-ink",
  board: "bg-board text-white",
  paper: "bg-paper-deep text-ink",
  white: "bg-white text-ink border border-rule",
  ink: "bg-ink text-paper",
};

type IndexTabProps = {
  children: React.ReactNode;
  tone?: IndexTabTone;
  className?: string;
  as?: "span" | "div";
};

/**
 * @deprecated Decorative numbering is being removed (docs/REDESIGN.md). Kept,
 * restyled as a quiet small label, so v1 pages compile until they drop it.
 */
export function IndexTab({ children, tone = "paper", className, as: Tag = "span" }: IndexTabProps) {
  return (
    <Tag
      className={cn(
        "inline-flex h-6 items-center justify-center rounded-[4px] px-2 text-xs font-semibold tabular-nums",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
