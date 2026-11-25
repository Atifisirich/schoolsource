"use client";

import { useEffect, useState } from "react";

/**
 * Filters the item cards on a category page as you type. Items are rendered
 * on the server; this only toggles their visibility (and hides sections with
 * no matches), so the page works fully without JavaScript.
 */
export function CategoryFilter({ categoryName }: { categoryName: string }) {
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const items = document.querySelectorAll<HTMLElement>("[data-item]");
    let count = 0;
    items.forEach((el) => {
      const hay = (el.dataset.item ?? "").toLowerCase();
      const match = terms.every((t) => hay.includes(t));
      el.hidden = !match;
      if (match) count++;
    });
    document.querySelectorAll<HTMLElement>("[data-item-section]").forEach((section) => {
      section.hidden = terms.length > 0 && !section.querySelector("[data-item]:not([hidden])");
    });
    const empty = document.getElementById("category-no-match");
    if (empty) empty.hidden = !(terms.length > 0 && count === 0);
    setShown(terms.length ? count : null);
  }, [query]);

  return (
    <div>
      <label htmlFor="category-filter" className="sr-only">
        Filter items in {categoryName}
      </label>
      <div className="relative">
        <svg
          viewBox="0 0 20 20"
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M13 13 L17 17" />
        </svg>
        <input
          id="category-filter"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter items"
          autoComplete="off"
          className="h-12 w-full rounded-full border-2 border-ink/20 bg-white pl-10 pr-4 text-base placeholder:text-ink-soft/80 transition-[border-color,box-shadow] duration-150 hover:border-ink/40 focus:border-board focus:outline-none focus:ring-4 focus:ring-board/15 [&::-webkit-search-cancel-button]:hidden"
        />
      </div>
      <p aria-live="polite" className="tabular mt-2 text-base text-ink-soft empty:hidden">
        {shown !== null ? `${shown} ${shown === 1 ? "item" : "items"} shown` : ""}
      </p>
    </div>
  );
}
