"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useQuoteCount } from "@/lib/quote-list";

/**
 * Header link to the Quote List. The element id is the landing target for
 * the "add to quote list" fly animation.
 */
export function QuoteListCounter({ className }: { className?: string }) {
  const count = useQuoteCount();
  const previous = useRef(count);
  const [bump, setBump] = useState(0);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  // Tick the badge when an item lands, not when the saved list loads after hydration
  useEffect(() => {
    if (count > previous.current && performance.now() - mountedAt.current > 800) setBump((b) => b + 1);
    previous.current = count;
  }, [count]);
  const label = `Quote List, ${count} ${count === 1 ? "item" : "items"}`;

  return (
    <Link
      href="/quote#quote-list"
      id="quote-list-counter"
      aria-label={label}
      className={cn(
        "group relative inline-flex h-11 items-center gap-2 rounded-sm px-2.5 text-ink",
        "transition-colors duration-150 hover:bg-paper-deep",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4.5" y="4" width="15" height="17.5" rx="1.5" />
        <rect x="8.5" y="2.5" width="7" height="3.5" rx="1" />
        <path d="M8 11 l1.5 1.5 L12 10 M14 11.5 H16.5 M8 16 l1.5 1.5 L12 15 M14 16.5 H16.5" />
      </svg>
      <span className="hidden text-[0.9375rem] font-medium 2xl:inline">Quote list</span>
      <span
        key={bump}
        aria-hidden="true"
        className={cn(
          "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold tabular-nums",
          bump > 0 && "animate-bump",
          count > 0 ? "bg-board text-white" : "bg-paper-deep text-ink-soft",
        )}
      >
        {count}
      </span>
    </Link>
  );
}
