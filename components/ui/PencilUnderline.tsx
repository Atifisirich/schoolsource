"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

// Three hand-drawn strokes so repeated underlines never look stamped out.
const strokes = [
  "M2 9.5 C 30 6.5, 62 5, 98 6.2 S 168 8.8, 198 5.6",
  "M3 7 C 40 9.8, 80 10.2, 120 8 S 176 4.6, 197 7.4 M 12 11.6 C 60 10, 120 9.6, 186 10.4",
  "M1.5 8.2 C 22 4.4, 58 9.6, 96 7.4 S 150 3.8, 199 8.8",
];

const toneClass = {
  pencil: "text-pencil",
  red: "text-red",
  ink: "text-ink",
  board: "text-board",
};

type PencilUnderlineProps = {
  children: React.ReactNode;
  variant?: 0 | 1 | 2;
  tone?: keyof typeof toneClass;
  /** Draw in when scrolled into view. Off renders the finished stroke. */
  animate?: boolean;
  /** Delay before the stroke starts, in ms */
  delay?: number;
  className?: string;
};

/**
 * Wraps a word or phrase and draws a pencil stroke beneath it.
 * The draw is a transform-only wipe: the outer clip slides right while the
 * stroke inside counter-slides, so the line appears left to right.
 */
export function PencilUnderline({
  children,
  variant = 0,
  tone = "pencil",
  animate = true,
  delay = 0,
  className,
}: PencilUnderlineProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const drawn = !animate || inView;

  return (
    <span ref={ref} className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-[-0.06em] bottom-[-0.12em] block h-[0.32em] overflow-hidden",
          "transition-transform duration-700 ease-out-quart",
          drawn ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <svg
          viewBox="0 0 200 14"
          preserveAspectRatio="none"
          className={cn(
            "block h-full w-full transition-transform duration-700 ease-out-quart",
            drawn ? "translate-x-0" : "translate-x-full",
            toneClass[tone],
          )}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <path
            d={strokes[variant]}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ strokeWidth: "max(2.5px, 0.075em)" }}
            opacity="0.92"
          />
        </svg>
      </span>
    </span>
  );
}
