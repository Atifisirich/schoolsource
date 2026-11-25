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

/** Short labels for the segmented control; the band headings use the full names */
const shortBand: Record<string, string> = {
  everyday: "Everyday",
  activities: "Activities",
  setup: "Setup",
};

const suggestions = ["Chalk", "ID cards", "Answer booklets", "Microscopes", "Dual desks"];

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
 * The product catalogue: live search across every item, a band filter, and
 * the category tiles grouped by band. Query and filter are kept in the URL
 * (?q=, ?band=) so a search can be shared.
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
  const [band, setBand] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  // Typing stays responsive while the result list catches up
  const deferredQuery = useDeferredValue(query);

  // Read ?q= and ?band= once
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const b = params.get("band");
    if (q) setQuery(q);
    if (b && bands.some((x) => x.id === b)) setBand(b);
  }, [bands]);

  // Keep the URL in step without adding history entries
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (band !== "all") params.set("band", band);
    const next = `${window.location.pathname}${params.size ? `?${params}` : ""}`;
    window.history.replaceState(null, "", next);
  }, [query, band]);

  const bandOf = useMemo(() => new Map(categories.map((c) => [c.slug, c.band])), [categories]);
  const terms = useMemo(() => normalise(deferredQuery).split(" ").filter(Boolean), [deferredQuery]);
  const searching = deferredQuery.trim().length >= 2;

  const grouped = useMemo(() => {
    if (!searching) return [];
    const map = new Map<string, SearchItem[]>();
    for (const item of items) {
      if (band !== "all" && bandOf.get(item.catSlug) !== band) continue;
      const hay = normalise(`${item.name} ${item.sub} ${item.cat} ${item.note ?? ""}`);
      if (!terms.every((t) => hay.includes(t))) continue;
      const list = map.get(item.catSlug);
      if (list) list.push(item);
      else map.set(item.catSlug, [item]);
    }
    return [...map.entries()].map(([slug, list]) => ({ cat: categories.find((c) => c.slug === slug)!, list }));
  }, [searching, items, band, bandOf, terms, categories]);

  const visibleBands = band === "all" ? bands : bands.filter((b) => b.id === band);

  function pick(text: string) {
    setQuery(text);
    inputRef.current?.focus();
  }

  return (
    <Container className="pb-section pt-10 lg:pt-12">
      {/* Search and band filter */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div className="min-w-0 lg:max-w-xl lg:flex-1">
          <label htmlFor="product-search" className="mb-2 block text-sm font-semibold">
            Search all items
          </label>
          <div className="relative">
            <svg
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-ink-soft"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
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
              placeholder="Chalk, ID cards, microscopes..."
              autoComplete="off"
              enterKeyHint="search"
              className={cn(
                "h-12 w-full rounded-sm border border-ink/20 bg-white pl-11 pr-12 text-base",
                "placeholder:text-ink-soft/80 transition-[border-color,box-shadow] duration-150",
                "hover:border-ink/40 focus:border-board focus:outline-none focus:ring-[3px] focus:ring-board/15",
                "[&::-webkit-search-cancel-button]:hidden",
              )}
            />
            {query ? (
              <button
                type="button"
                onClick={() => pick("")}
                className="absolute right-1.5 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-sm text-ink-soft transition-colors duration-150 hover:bg-paper-deep hover:text-ink active:scale-95"
              >
                <span className="sr-only">Clear search</span>
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4 L12 12 M12 4 L4 12" />
                </svg>
              </button>
            ) : null}
          </div>
          <p className="mt-2.5 text-sm text-ink-soft">
            Try{" "}
            {suggestions.map((s, i) => (
              <span key={s}>
                <button
                  type="button"
                  onClick={() => pick(s)}
                  className="link rounded-[2px] text-ink transition-colors duration-150 hover:text-board"
                >
                  {s.toLowerCase()}
                </button>
                {i < suggestions.length - 2 ? ", " : i === suggestions.length - 2 ? " or " : "."}
              </span>
            ))}
          </p>
        </div>

        <div className="lg:pt-7">
          <p id="band-filter-label" className="sr-only">
            Show categories
          </p>
          <div
            role="group"
            aria-labelledby="band-filter-label"
            className="grid grid-cols-4 gap-1 rounded-sm border border-rule bg-paper-deep p-1 sm:inline-grid"
          >
            {[{ id: "all", name: "All" }, ...bands].map((b) => {
              const on = band === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setBand(b.id)}
                  className={cn(
                    "h-10 rounded-[4px] px-2 text-sm font-semibold transition-[background-color,color,box-shadow,transform] duration-150 active:scale-[0.97] sm:px-4",
                    on
                      ? "bg-white text-ink shadow-[0_0_0_1px_rgb(15_27_45/0.1),0_1px_2px_rgb(15_27_45/0.08)]"
                      : "text-ink-soft hover:bg-white/60 hover:text-ink",
                  )}
                >
                  {b.id === "all" ? "All" : (shortBand[b.id] ?? b.name)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="mt-12 lg:mt-14">
        {searching ? (
          <SearchResults
            query={deferredQuery.trim()}
            terms={terms}
            groups={grouped}
            bandName={band === "all" ? null : (bands.find((b) => b.id === band)?.name ?? null)}
            onClear={() => pick("")}
            onAllBands={() => setBand("all")}
          />
        ) : (
          <div className="grid gap-16 lg:gap-20">
            {visibleBands.map((b) => {
              const cards = categories.filter((c) => c.band === b.id);
              return (
                <section key={b.id} aria-labelledby={`band-${b.id}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule pb-3">
                    <h2 id={`band-${b.id}`} className="text-h3">
                      {b.name}
                    </h2>
                    <p className="text-sm text-ink-soft">{b.note}</p>
                  </div>
                  <ul
                    className={cn(
                      "mt-6 grid gap-5 sm:grid-cols-2 lg:gap-6",
                      // Four fit one row; otherwise rows of three
                      cards.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
                    )}
                  >
                    {cards.map((c) => (
                      <li key={c.slug}>
                        <CategoryTile
                          category={c}
                          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
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
  bandName,
  onClear,
  onAllBands,
}: {
  query: string;
  terms: string[];
  groups: { cat: ExplorerCard; list: SearchItem[] }[];
  bandName: string | null;
  onClear: () => void;
  onAllBands: () => void;
}) {
  const total = groups.reduce((n, g) => n + g.list.length, 0);

  if (total === 0) {
    return (
      <div className="card px-6 py-10 text-center sm:px-10">
        <h2 className="text-h3">
          Nothing matches &ldquo;{query}&rdquo;{bandName ? ` in ${bandName}` : ""}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          We source most things a school buys. Tell us what you need and we will include it in your quotation.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`/quote?about=${encodeURIComponent(query)}`}>Ask us for &ldquo;{query}&rdquo;</Button>
          {bandName ? (
            <Button variant="secondary" onClick={onAllBands}>
              Search all categories
            </Button>
          ) : (
            <Button variant="secondary" onClick={onClear}>
              Clear search
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-ink-soft">
        <span className="tabular font-semibold text-ink">{total}</span> {total === 1 ? "item matches" : "items match"}{" "}
        &ldquo;{query}&rdquo; in {groups.length} {groups.length === 1 ? "category" : "categories"}.
      </p>
      <div className="mt-6 grid gap-6">
        {groups.map(({ cat, list }) => (
          <section key={cat.slug} aria-labelledby={`result-${cat.slug}`} className="card overflow-hidden">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule bg-paper-deep px-5 py-3">
              <h2 id={`result-${cat.slug}`} className="font-display text-lg font-semibold">
                {cat.name}
                <span className="tabular ml-2 font-sans text-sm font-normal text-ink-soft">{list.length}</span>
              </h2>
              <Link href={`/products/${cat.slug}`} className="link text-sm font-semibold text-board">
                Open category
              </Link>
            </div>
            <ul className="divide-y divide-rule">
              {list.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3">
                  <div className="min-w-0">
                    <p className="font-semibold">
                      <Highlight text={item.name} terms={terms} />
                    </p>
                    <p className="text-sm text-ink-soft">
                      <Link href={`/products/${item.catSlug}#${item.subSlug}`} className="link">
                        <Highlight text={item.sub} terms={terms} />
                      </Link>
                      {item.note ? <>, {item.note}</> : null}
                    </p>
                  </div>
                  <AddToQuoteButton size="sm" item={{ id: item.id, name: item.name, category: item.cat }} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
