"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { bandStyle, type NavBand } from "@/lib/bands";
import { cn } from "@/lib/cn";

export type ExplorerCard = {
  number: string;
  slug: string;
  name: string;
  description: string;
  band: string;
  itemCount: number;
  image?: string;
  subcategories: { slug: string; name: string; count: number }[];
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

const suggestions = ["Chalk", "ID cards", "Answer booklets", "Trophies", "Microscopes", "Dual desks", "Water coolers"];
const MAX_CHIPS = 5;

function normalise(text: string) {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9 ]/g, " ");
}

/** Wraps the parts of `text` that match any search term. */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const pattern = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return (
    <>
      {text.split(pattern).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded-[2px] bg-pencil-soft px-0.5 text-ink">
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
 * category cards that show what is inside. Query and filter are kept in the
 * URL (?q=, ?band=) so a search can be shared.
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
  const resultsRef = useRef<HTMLDivElement>(null);

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

  const terms = useMemo(() => normalise(query).split(" ").filter((t) => t.length > 0), [query]);
  const searching = query.trim().length >= 2;

  const results = useMemo(() => {
    if (!searching) return [];
    return items.filter((item) => {
      const cat = categories.find((c) => c.slug === item.catSlug);
      if (band !== "all" && cat?.band !== band) return false;
      const hay = normalise(`${item.name} ${item.sub} ${item.cat} ${item.note ?? ""}`);
      return terms.every((t) => hay.includes(t));
    });
  }, [searching, items, categories, band, terms]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    results.forEach((r) => map.set(r.catSlug, [...(map.get(r.catSlug) ?? []), r]));
    return [...map.entries()].map(([slug, list]) => ({ cat: categories.find((c) => c.slug === slug)!, list }));
  }, [results, categories]);

  const visibleBands = band === "all" ? bands : bands.filter((b) => b.id === band);
  const countFor = (id: string) => categories.filter((c) => id === "all" || c.band === id).length;

  function pick(text: string) {
    setQuery(text);
    inputRef.current?.focus();
  }

  return (
    <>
      {/* Search and filter bar */}
      <div className="sticky top-16 z-30 border-b border-ink/12 bg-paper/95 backdrop-blur-[2px] lg:top-[4.5rem]">
        <Container className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center">
          <div className="relative lg:min-w-0 lg:max-w-[30rem] lg:flex-1">
            <label htmlFor="product-search" className="sr-only">
              Search all products
            </label>
            <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" />
              <path d="M13 13 L17 17" />
            </svg>
            <input
              ref={inputRef}
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${items.length} items: chalk, ID cards, microscopes...`}
              autoComplete="off"
              className="h-12 w-full rounded-sm border border-ink-soft bg-white pl-11 pr-11 text-base placeholder:text-ink-soft/80 focus:border-board focus:outline-none focus:ring-2 focus:ring-board/30 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => pick("")}
                className="absolute right-1.5 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-sm text-ink-soft hover:bg-paper-deep hover:text-ink"
              >
                <span className="sr-only">Clear search</span>
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4 L12 12 M12 4 L4 12" />
                </svg>
              </button>
            ) : null}
          </div>

          <div role="group" aria-label="Filter by band" className="-mx-gutter flex gap-1.5 overflow-x-auto px-gutter [scrollbar-width:none] lg:mx-0 lg:ml-auto lg:shrink-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
            {[{ id: "all", name: "All" }, ...bands].map((b) => {
              const on = band === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setBand(b.id)}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors duration-150",
                    on ? "border-ink bg-ink text-paper" : "border-ink/20 bg-white text-ink hover:border-ink/50",
                  )}
                >
                  {b.id !== "all" ? <span aria-hidden="true" className={cn("size-2 rounded-full", bandStyle[b.id].dot)} /> : null}
                  {b.name}
                  <span className={cn("font-mono text-[0.6875rem]", on ? "text-pencil-soft" : "text-ink-soft")}>{countFor(b.id)}</span>
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      <Container className="py-10 lg:py-14">
        {!searching ? (
          <p className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
            <span>Try:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => pick(s)}
                className="rounded-full border border-dashed border-ink/30 px-3 py-1 text-ink transition-colors hover:border-board hover:bg-white hover:text-board"
              >
                {s}
              </button>
            ))}
          </p>
        ) : null}

        <div ref={resultsRef} aria-live="polite">
          {searching ? (
            <SearchResults query={query.trim()} terms={terms} groups={grouped} total={results.length} onClear={() => pick("")} />
          ) : (
            <div key={band} className="mt-8 grid gap-14">
              {visibleBands.map((b) => {
                const cards = categories.filter((c) => c.band === b.id);
                return (
                  <section key={b.id} aria-labelledby={`band-${b.id}`}>
                    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
                      <h2 id={`band-${b.id}`} className="flex items-center gap-3 text-h3">
                        <span aria-hidden="true" className={cn("size-3 rounded-full", bandStyle[b.id].dot)} />
                        {b.name}
                      </h2>
                      <p className="font-mono text-label uppercase text-ink-soft">
                        {b.note} &middot; {cards.length} categories
                      </p>
                    </div>
                    <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {cards.map((c, i) => (
                        <li key={c.slug} className="animate-rise-in" style={{ animationDelay: `${i * 50}ms` }}>
                          <CategoryCard card={c} />
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
    </>
  );
}

function CategoryCard({ card }: { card: ExplorerCard }) {
  const style = bandStyle[card.band];
  const extra = card.subcategories.length - MAX_CHIPS;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-md border border-ink/10 bg-white shadow-card",
        "transition-[transform,box-shadow,border-color] duration-200 ease-out-quart",
        "hover:-translate-y-1 hover:border-board/40 hover:shadow-lift",
        "focus-within:-translate-y-1 focus-within:border-board/40 focus-within:shadow-lift",
      )}
    >
      {/* Photo, shown whole in its own frame */}
      <div className={cn("relative aspect-[3/2] overflow-hidden", style.tint)}>
        {card.image ? (
          <Image
            src={card.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out-quart group-hover:scale-105"
          />
        ) : null}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink shadow-card">
          {style.label}
        </span>
        <span aria-hidden="true" className="absolute right-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[0.75rem] font-semibold text-white">
          {card.number}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-9">
        {/* Icon badge overlapping the photo edge */}
        <span className="absolute -top-8 left-5 flex size-16 items-center justify-center rounded-md border border-ink/10 bg-white shadow-lift transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
          <CategoryIcon slug={card.slug} className="size-10 text-board" drawOnHover />
        </span>
        <h3 className="text-h3">
          {/* The whole card is clickable through this link */}
          <Link href={`/products/${card.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {card.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{card.description}</p>

        <ul className="relative z-10 mt-4 flex flex-wrap gap-1.5" aria-label={`${card.name} groups`}>
          {card.subcategories.slice(0, MAX_CHIPS).map((s) => (
            <li key={s.slug}>
              <Link
                href={`/products/${card.slug}#${s.slug}`}
                className="inline-flex items-center rounded-full border border-ink/15 bg-paper px-2.5 py-1 text-[0.8125rem] transition-colors hover:border-board hover:bg-white hover:text-board"
              >
                {s.name}
              </Link>
            </li>
          ))}
          {extra > 0 ? (
            <li className="inline-flex items-center px-1 text-[0.8125rem] text-ink-soft">+{extra} more</li>
          ) : null}
        </ul>
      </div>

      <div className="flex items-center justify-between border-t border-ink/10 px-5 py-3.5">
        <span className="font-mono text-[0.75rem] text-ink-soft">
          {card.subcategories.length} groups &middot; {card.itemCount} items
        </span>
        <span className="inline-flex h-9 items-center gap-1.5 rounded-sm bg-board px-3.5 text-sm font-semibold text-white shadow-button transition-colors duration-200 group-hover:bg-board-deep">
          Browse
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </article>
  );
}

function SearchResults({
  query,
  terms,
  groups,
  total,
  onClear,
}: {
  query: string;
  terms: string[];
  groups: { cat: ExplorerCard; list: SearchItem[] }[];
  total: number;
  onClear: () => void;
}) {
  if (total === 0) {
    return (
      <div className="animate-rise-in mt-2 rounded-md border border-dashed border-ink/30 bg-white px-6 py-10 text-center">
        <p className="font-display text-h3">No items match &ldquo;{query}&rdquo;</p>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          We source most things a school buys. Tell us what you need and we will include it in your quotation.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={`/quote?about=${encodeURIComponent(query)}`}>Ask for &ldquo;{query}&rdquo;</Button>
          <Button variant="secondary" onClick={onClear}>Clear search</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <p className="text-ink-soft">
        <span className="font-semibold text-ink">{total}</span> {total === 1 ? "item matches" : "items match"} &ldquo;{query}&rdquo; in{" "}
        {groups.length} {groups.length === 1 ? "category" : "categories"}.
      </p>
      <div className="mt-6 grid gap-6">
        {groups.map(({ cat, list }, gi) => (
          <section
            key={cat.slug}
            aria-labelledby={`result-${cat.slug}`}
            className="animate-rise-in overflow-hidden rounded-md border border-ink/10 bg-white shadow-card"
            style={{ animationDelay: `${gi * 40}ms` }}
          >
            <div className={cn("flex items-center justify-between gap-4 px-5 py-3", bandStyle[cat.band].tint)}>
              <h2 id={`result-${cat.slug}`} className="flex items-center gap-3 font-sans text-base font-semibold">
                <CategoryIcon slug={cat.slug} className="size-6" />
                {cat.name}
                <span className="font-mono text-[0.75rem] font-normal text-ink-soft">{list.length}</span>
              </h2>
              <Link href={`/products/${cat.slug}`} className="text-sm font-semibold text-board underline decoration-rule underline-offset-4 hover:decoration-board">
                Open category
              </Link>
            </div>
            <ul className="divide-y divide-ink/10">
              {list.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3">
                  <div className="min-w-0">
                    <p className="font-semibold">
                      <Highlight text={item.name} terms={terms} />
                    </p>
                    <p className="text-sm text-ink-soft">
                      <Link href={`/products/${item.catSlug}#${item.subSlug}`} className="hover:text-board hover:underline">
                        <Highlight text={item.sub} terms={terms} />
                      </Link>
                      {item.note ? ` · ${item.note}` : null}
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
