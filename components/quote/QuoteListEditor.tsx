"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { quoteList, useQuoteList, type QuoteItem } from "@/lib/quote-list";

/** Review and edit the Quote List: quantities, remove, clear. */
export function QuoteListEditor() {
  const items = useQuoteList();

  if (items.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-ink/25 bg-cream px-5 py-5">
        <p className="text-[1.0625rem] font-semibold">Your quote list is empty.</p>
        <p className="mt-1 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-soft">
          Add items from{" "}
          <Link href="/products" className="link font-semibold text-ink">
            the products
          </Link>{" "}
          or{" "}
          <Link href="/kits" className="link font-semibold text-ink">
            school kits
          </Link>
          , or type your list in the box below.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border-2 border-ink/15 bg-white">
      <ul aria-label="Items in your quote list">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b-2 border-ink/10 px-4 py-4 sm:px-5"
          >
            <div className="min-w-0 flex-1 basis-48">
              <span className="block break-words text-[1.0625rem] font-semibold leading-snug">{item.name}</span>
              {item.category ? <span className="block text-[1rem] text-ink-soft">{item.category}</span> : null}
            </div>
            <div className="flex items-center gap-2">
              <QuantityInput item={item} />
              <button
                type="button"
                onClick={() => quoteList.remove(item.id)}
                className="inline-flex size-12 items-center justify-center rounded-full text-ink-soft transition-[background-color,color,transform] duration-150 hover:bg-cream hover:text-red active:scale-[0.97]"
              >
                <span className="sr-only">Remove {item.name}</span>
                <svg viewBox="0 0 16 16" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4 L12 12 M12 4 L4 12" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 sm:px-5">
        <p className="py-2 text-[1.0625rem] text-ink-soft" aria-live="polite">
          <span className="tabular">{items.length}</span> {items.length === 1 ? "item" : "items"}. We confirm
          quantities with you.
        </p>
        <button
          type="button"
          onClick={() => quoteList.clear()}
          className="-mx-2 min-h-12 rounded-md px-2 text-[1.0625rem] font-semibold text-ink-soft underline decoration-ink/25 underline-offset-4 transition-colors duration-150 hover:text-red hover:decoration-red"
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
    "inline-flex h-12 w-11 items-center justify-center text-xl text-ink transition-colors duration-150 hover:bg-cream active:bg-sand disabled:text-ink/30 disabled:hover:bg-transparent";

  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border-2 border-[#7d8899] bg-white focus-within:border-blue focus-within:ring-4 focus-within:ring-blue/20">
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
        className="tabular h-12 w-14 bg-transparent text-center text-[1.0625rem] focus:outline-none"
      />
      <button type="button" className={stepBtn} onClick={() => commit(item.quantity + 1)}>
        <span className="sr-only">Increase quantity of {item.name}</span>
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
