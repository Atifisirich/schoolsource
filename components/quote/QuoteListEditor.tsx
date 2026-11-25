"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { quoteList, useQuoteList, type QuoteItem } from "@/lib/quote-list";

/** Review and edit the Quote List: quantities, remove, clear. */
export function QuoteListEditor() {
  const items = useQuoteList();

  if (items.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-ink/25 bg-paper-deep px-5 py-5">
        <p className="font-semibold">Your quote list is empty.</p>
        <p className="mt-1 max-w-[60ch] text-[0.9375rem] text-ink-soft">
          Add items from{" "}
          <Link href="/products" className="link font-semibold text-ink">
            the product categories
          </Link>{" "}
          or{" "}
          <Link href="/kits" className="link font-semibold text-ink">
            school kits
          </Link>
          , or type your list in the message box below.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-rule">
      <table className="w-full text-left text-[0.9375rem]">
        <caption className="sr-only">Items in your quote list</caption>
        <thead>
          <tr className="border-b border-rule bg-paper-deep text-sm text-ink-soft">
            <th scope="col" className="hidden w-16 py-2.5 pl-4 font-medium sm:table-cell">
              No.
            </th>
            <th scope="col" className="py-2.5 pl-4 font-medium sm:pl-0">
              Item
            </th>
            <th scope="col" className="py-2.5 pr-2 text-right font-medium">
              Quantity
            </th>
            <th scope="col" className="w-12 py-2.5 pr-2">
              <span className="sr-only">Remove</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item.id} className="border-b border-rule align-middle last:border-b-0">
              <td className="tabular hidden py-3 pl-4 text-sm text-ink-soft sm:table-cell">{i + 1}</td>
              <td className="min-w-0 py-3 pl-4 pr-3 sm:pl-0">
                <span className="block break-words font-semibold leading-snug">{item.name}</span>
                {item.category ? <span className="block text-sm text-ink-soft">{item.category}</span> : null}
              </td>
              <td className="py-3 pr-2 text-right">
                <QuantityInput item={item} />
              </td>
              <td className="py-3 pr-2 text-right">
                <button
                  type="button"
                  onClick={() => quoteList.remove(item.id)}
                  className="inline-flex size-11 items-center justify-center rounded-sm text-ink-soft transition-colors duration-150 hover:bg-paper-deep hover:text-red active:bg-rule"
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
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-rule px-4 py-2 text-sm">
        <p className="py-2 text-ink-soft" aria-live="polite">
          <span className="tabular">{items.length}</span> {items.length === 1 ? "item" : "items"}. Quantities are a
          starting point; we confirm them with you.
        </p>
        <button
          type="button"
          onClick={() => quoteList.clear()}
          className="-mx-2 min-h-11 rounded-sm px-2 font-semibold text-ink-soft underline decoration-ink/25 underline-offset-4 transition-colors duration-150 hover:text-red hover:decoration-red"
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
    "inline-flex h-11 w-10 items-center justify-center text-lg text-ink transition-colors duration-150 hover:bg-paper-deep active:bg-rule disabled:text-ink/30 disabled:hover:bg-transparent";

  return (
    <div className="inline-flex items-center overflow-hidden rounded-sm border border-[#7d8899] bg-white focus-within:border-board focus-within:ring-2 focus-within:ring-board/30">
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
        className="tabular h-11 w-14 border-x border-rule text-center text-[0.9375rem] focus:outline-none"
      />
      <button type="button" className={stepBtn} onClick={() => commit(item.quantity + 1)}>
        <span className="sr-only">Increase quantity of {item.name}</span>
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
