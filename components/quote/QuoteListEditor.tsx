"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { quoteList, useQuoteList, type QuoteItem } from "@/lib/quote-list";

/** Review and edit the Quote List: quantities, remove, clear. */
export function QuoteListEditor() {
  const items = useQuoteList();

  if (items.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-ink/30 bg-paper px-5 py-6">
        <p className="font-semibold">Your quote list is empty.</p>
        <p className="mt-1 text-[0.9375rem] text-ink-soft">
          Add items from{" "}
          <Link href="/products" className="font-semibold text-ink underline decoration-rule underline-offset-4 hover:decoration-board">
            the product categories
          </Link>{" "}
          or{" "}
          <Link href="/kits" className="font-semibold text-ink underline decoration-rule underline-offset-4 hover:decoration-board">
            school kits
          </Link>
          , or simply type your list in the message below.
        </p>
      </div>
    );
  }

  return (
    <div>
      <table className="w-full text-left text-[0.9375rem]">
        <caption className="sr-only">Items in your quote list</caption>
        <thead>
          <tr className="border-b-2 border-ink font-mono text-label uppercase text-ink-soft">
            <th scope="col" className="w-8 py-2 font-medium">No.</th>
            <th scope="col" className="py-2 font-medium">Item</th>
            <th scope="col" className="py-2 text-right font-medium">Qty</th>
            <th scope="col" className="w-10 py-2"><span className="sr-only">Remove</span></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item.id} className="border-b border-rule align-middle">
              <td className="py-3 font-mono text-[0.75rem] text-ink-soft">{String(i + 1).padStart(2, "0")}</td>
              <td className="py-3 pr-3">
                <span className="font-semibold">{item.name}</span>
                {item.category ? <span className="block text-sm text-ink-soft">{item.category}</span> : null}
              </td>
              <td className="py-3 text-right">
                <QuantityInput item={item} />
              </td>
              <td className="py-3 text-right">
                <button
                  type="button"
                  onClick={() => quoteList.remove(item.id)}
                  className="inline-flex size-9 items-center justify-center rounded-sm text-ink-soft transition-colors hover:bg-paper-deep hover:text-red"
                >
                  <span className="sr-only">Remove {item.name}</span>
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M4 4 L12 12 M12 4 L4 12" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-ink-soft">
          {items.length} {items.length === 1 ? "item" : "items"}. Quantities are a starting point; we will confirm them
          with you.
        </p>
        <button
          type="button"
          onClick={() => quoteList.clear()}
          className="font-semibold text-ink-soft underline decoration-rule underline-offset-4 hover:text-red hover:decoration-red"
        >
          Clear list
        </button>
      </div>
    </div>
  );
}

/** Number field with - / + buttons. Keeps typing free, saves only valid quantities. */
function QuantityInput({ item }: { item: QuoteItem }) {
  const [text, setText] = useState(String(item.quantity));

  useEffect(() => setText(String(item.quantity)), [item.quantity]);

  const commit = (value: number) => quoteList.setQuantity(item.id, Math.max(1, Math.min(99999, value)));
  const stepBtn =
    "inline-flex size-9 items-center justify-center text-ink transition-colors hover:bg-paper-deep disabled:opacity-40";

  return (
    <div className="inline-flex items-center rounded-sm border border-ink-soft bg-white">
      <button type="button" className={stepBtn} onClick={() => commit(item.quantity - 1)} disabled={item.quantity <= 1}>
        <span className="sr-only">Decrease quantity of {item.name}</span>
        <span aria-hidden="true">&minus;</span>
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={`Quantity of ${item.name}`}
        value={text}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "").slice(0, 5);
          setText(digits);
          const n = parseInt(digits, 10);
          if (n > 0) commit(n);
        }}
        onBlur={() => setText(String(item.quantity))}
        className={cn("h-9 w-14 border-x border-ink/15 text-center font-mono text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-board/30")}
      />
      <button type="button" className={stepBtn} onClick={() => commit(item.quantity + 1)}>
        <span className="sr-only">Increase quantity of {item.name}</span>
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
