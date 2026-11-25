import { cn } from "@/lib/cn";

export type IndexTabTone = "pencil" | "board" | "paper" | "white" | "ink";

const toneClass: Record<IndexTabTone, string> = {
  pencil: "bg-pencil text-ink",
  board: "bg-board text-white",
  paper: "bg-paper-deep text-ink",
  white: "bg-white text-ink",
  ink: "bg-ink text-paper",
};

type IndexTabProps = {
  children: React.ReactNode;
  tone?: IndexTabTone;
  className?: string;
  as?: "span" | "div";
};

/**
 * A register index tab: trapezoid label in mono type, used for category
 * numbers 01-13 and section markers. Place it on the top edge of a card.
 */
export function IndexTab({ children, tone = "pencil", className, as: Tag = "span" }: IndexTabProps) {
  return (
    <Tag
      className={cn(
        "inline-flex h-7 min-w-14 items-center justify-center px-4 font-mono text-[0.8125rem] font-semibold tracking-[0.06em]",
        "[clip-path:polygon(9px_0,calc(100%-9px)_0,100%_100%,0_100%)]",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
