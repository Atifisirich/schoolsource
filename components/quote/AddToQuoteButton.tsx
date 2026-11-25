"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { flyToCounter } from "@/lib/fly-to-counter";
import { quoteList, useQuoteList, type QuoteItem } from "@/lib/quote-list";

type AddToQuoteButtonProps = {
  item: Omit<QuoteItem, "quantity">;
  label?: string;
  className?: string;
  variant?: "solid" | "outline";
  size?: "md" | "sm";
};

/**
 * Adds an item or kit to the Quote List: a copy flies into the header
 * counter, which ticks up as it lands. Pressed again, it removes the item.
 */
export function AddToQuoteButton({
  item,
  label = "Add to quote list",
  className,
  variant = "outline",
  size = "md",
}: AddToQuoteButtonProps) {
  const list = useQuoteList();
  const [flying, setFlying] = useState(false);
  const added = flying || list.some((i) => i.id === item.id);

  async function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (flying) return;
    if (added) {
      quoteList.remove(item.id);
      return;
    }
    setFlying(true);
    await flyToCounter(e.currentTarget, item.name);
    quoteList.add(item);
    setFlying(false);
  }

  return (
    <button
      type="button"
      aria-pressed={added}
      onClick={onClick}
      className={cn(
        // A pill like the site's buttons (globals.css .btn gives hover lift and press)
        "btn btn-sm shrink-0 !gap-2",
        size === "md" ? "" : "!min-h-11 !px-4 !text-[0.9375rem]",
        added
          ? // In the list: orange, like a filled cart
            "!border-orange [--bg:var(--color-orange)] [--fg:var(--color-ink)] hover:[--bg:#f79a4b]"
          : variant === "solid"
            ? "btn-primary"
            : "btn-ghost",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" className="!size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {added ? <path d="M3 8.5 L6.5 12 L13 4.5" /> : <path d="M8 3 V13 M3 8 H13" />}
      </svg>
      <span>{added ? "In quote list" : label}</span>
      <span className="sr-only">: {item.name}</span>
    </button>
  );
}
