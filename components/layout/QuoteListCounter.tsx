"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useQuoteCount } from "@/lib/quote-list";

/**
 * Header link to the Quote List, like a cart. The badge turns orange once
 * something is in the list and bumps each time an item lands. The element id
 * is the landing target for the "add to quote" fly animation.
 */
export function QuoteListCounter({ className }: { className?: string }) {
  const count = useQuoteCount();
  const previous = useRef(count);
  const [bump, setBump] = useState(0);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  // Bump on every change made on this page, not when the saved list loads after hydration
  useEffect(() => {
    if (count !== previous.current && performance.now() - mountedAt.current > 800) setBump((b) => b + 1);
    previous.current = count;
  }, [count]);

  const label = `Quote list, ${count} ${count === 1 ? "item" : "items"}`;

  return (
    <Link
      href="/quote#quote-list"
      id="quote-list-counter"
      aria-label={label}
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-full pl-3 pr-2.5 text-ink",
        "transition-[background-color,transform] duration-150 ease-[var(--ease-out)] hover:bg-cream active:scale-95",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4.5" y="4" width="15" height="17.5" rx="2.5" />
        <path d="M9 2.75h6v3H9z" />
        <path d="M8.5 11.5l1.5 1.5 2.5-2.5M14.5 12h2M8.5 16.5l1.5 1.5 2.5-2.5M14.5 17h2" />
      </svg>
      <span className="hidden text-base font-semibold 2xl:inline">Quote list</span>
      <span
        key={bump}
        aria-hidden="true"
        className={cn(
          "inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-sm font-bold tabular-nums",
          "transition-colors duration-200",
          bump > 0 && "animate-bump",
          count > 0 ? "bg-orange text-ink" : "bg-sand text-ink-soft",
        )}
      >
        {count}
      </span>
    </Link>
  );
}
