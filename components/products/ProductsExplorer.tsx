"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import { Button } from "@/components/ui/Button";
import { CategoryTile } from "@/components/ui/CategoryTile";
import { Container } from "@/components/ui/Container";
import type { NavBand } from "@/lib/bands";
import { cn } from "@/lib/cn";

export type ExplorerCard = {
  slug: string;
  name: string;
  description: string;
  band: string;
  image?: string;
};

export type SearchItem = {
  id: string;
  name: string;
  note?: string;
  sub: string;
  subSlug: string;
  cat: string;
  catSlug: string;
};

function normalise(text: string) {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9 ]/g, " ");
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Wraps the parts of `text` that match any search term. */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "ig");
  return (
    <>
      {text.split(pattern).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded-[2px] bg-pencil-soft text-ink">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

/**
 * The products page body: one plain search box, then the 15 categories as
 * tiles under three headings. Typing 2+ letters swaps the tiles for matching
 * items. The query is kept in the URL (?q=) so a search can be shared.
 */
export function ProductsExplorer({
  bands,
  categories,
  items,
}: {
  bands: NavBand[];
  categories: ExplorerCard[];
  items: SearchItem[];
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    window.history.replaceState(null, "", `${window.location.pathname}${params.size ? `?${params}` : ""}`);
  }, [query]);

  const terms = useMemo(() => normalise(deferredQuery).split(" ").filter(Boolean), [deferredQuery]);
  const searching = deferredQuery.trim().length >= 2;

  const grouped = useMemo(() => {
    if (!searching) return [];
    const map = new Map<string, SearchItem[]>();
    for (const item of items) {
      const hay = normalise(`${item.name} ${item.sub} ${item.cat} ${item.note ?? ""}`);
      if (!terms.every((t) => hay.includes(t))) continue;
      const list = map.get(item.catSlug);
      if (list) list.push(item);
      else map.set(item.catSlug, [item]);
    }
    return [...map.entries()].map(([slug, list]) => ({ cat: categories.find((c) => c.slug === slug)!, list }));
  }, [searching, items, terms, categories]);

  function pick(text: string) {
    setQuery(text);
    inputRef.current?.focus();
  }

  return (
    <Container className="pb-section">
      <div className="max-w-2xl">
        <label htmlFor="product-search" className="mb-3 block text-lg font-semibold">
          Search for an item
        </label>
        <div className="relative">
          <svg
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-ink-soft"
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
            ref={inputRef}
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="For example: chalk, ID cards, microscopes"
            autoComplete="off"
            enterKeyHint="search"
            className={cn(
              "h-14 w-full rounded-full border-2 border-ink/20 bg-white pl-13 pr-14 text-lg",
              "placeholder:text-ink-soft/75 transition-[border-color,box-shadow] duration-150",
              "hover:border-ink/40 focus:border-board focus:outline-none focus:ring-4 focus:ring-board/15",
              "[&::-webkit-search-cancel-button]:hidden",
            )}
          />
          {query ? (
            <button
              type="button"
              onClick={() => pick("")}
              className="absolute right-1.5 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-ink-soft transition-colors duration-150 hover:bg-cream hover:text-ink active:scale-95"
            >
              <span className="sr-only">Clear search</span>
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 4 L12 12 M12 4 L4 12" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>

      <div aria-live="polite" className="mt-14 lg:mt-16">
        {searching ? (
          <SearchResults
            query={deferredQuery.trim()}
            terms={terms}
            groups={grouped}
            onClear={() => pick("")}
          />
        ) : (
          <div className="grid gap-16 lg:gap-20">
            {bands.map((b) => {
              const cards = categories.filter((c) => c.band === b.id);
              return (
                <section key={b.id} aria-labelledby={`band-${b.id}`}>
                  <h2 id={`band-${b.id}`} className="text-h3">
                    {b.name}
                  </h2>
                  <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 nav:grid-cols-5">
                    {cards.map((c) => (
                      <li key={c.slug}>
                        <CategoryTile
                          category={c}
                          sizes="(min-width: 1180px) 250px, (min-width: 768px) 30vw, 46vw"
                          className="max-sm:min-h-[14rem] max-sm:p-4 max-sm:pb-0 max-sm:[&_.tile-title]:text-[1.125rem] max-sm:[&_.tile-text]:text-[1rem] max-sm:[&_.tile-media]:min-h-[6.5rem] max-sm:[&_.tile-media_img]:max-h-[7rem] max-sm:[&_.tile-media-wide]:-mx-4"
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
}

function SearchResults({
  query,
  terms,
  groups,
  onClear,
}: {
  query: string;
  terms: string[];
  groups: { cat: ExplorerCard; list: SearchItem[] }[];
  onClear: () => void;
}) {
  const total = groups.reduce((n, g) => n + g.list.length, 0);

  if (total === 0) {
    return (
      <div className="rounded-xl bg-cream px-6 py-10 sm:px-10">
        <h2 className="text-h3">Nothing matches &ldquo;{query}&rdquo;</h2>
        <p className="mt-3 max-w-xl text-lg text-ink-soft">
          We can still source most things a school buys. Tell us what you need.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={`/quote?about=${encodeURIComponent(query)}`}>Request a quote</Button>
          <Button variant="ghost" onClick={onClear}>
            Clear search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-lg text-ink-soft">
        <span className="tabular font-semibold text-ink">{total}</span> {total === 1 ? "item matches" : "items match"}{" "}
        &ldquo;{query}&rdquo;.
      </p>
      <div className="mt-6 grid gap-6">
        {groups.map(({ cat, list }) => (
          <section key={cat.slug} aria-labelledby={`result-${cat.slug}`} className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-cream px-5 py-4">
              <h2 id={`result-${cat.slug}`} className="text-h3 !text-[1.25rem]">
                {cat.name}
              </h2>
              <Link href={`/products/${cat.slug}`} className="link inline-flex min-h-11 items-center text-base font-semibold text-board">
                Open category
              </Link>
            </div>
            <ul className="divide-y divide-rule">
              {list.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-4">
                  <div className="min-w-0">
                    <p className="text-lg font-semibold">
                      <Highlight text={item.name} terms={terms} />
                    </p>
                    <p className="text-base text-ink-soft">
                      <Link href={`/products/${item.catSlug}#${item.subSlug}`} className="link">
                        <Highlight text={item.sub} terms={terms} />
                      </Link>
                      {item.note ? <>, {item.note}</> : null}
                    </p>
                  </div>
                  <AddToQuoteButton size="sm" label="Add to quote" item={{ id: item.id, name: item.name, category: item.cat }} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
