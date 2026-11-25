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
    <div className="relative w-full lg:w-64">
      <label htmlFor="category-filter" className="sr-only">
        Filter items in {categoryName}
      </label>
      <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="5.5" />
        <path d="M13 13 L17 17" />
      </svg>
      <input
        id="category-filter"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Filter ${categoryName.toLowerCase()}`}
        autoComplete="off"
        className="h-10 w-full rounded-full border border-ink/25 bg-white pl-9 pr-16 text-sm placeholder:text-ink-soft/80 focus:border-board focus:outline-none focus:ring-2 focus:ring-board/30 [&::-webkit-search-cancel-button]:hidden"
      />
      <span aria-live="polite" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[0.6875rem] text-ink-soft">
        {shown !== null ? `${shown} found` : ""}
      </span>
    </div>
  );
}
