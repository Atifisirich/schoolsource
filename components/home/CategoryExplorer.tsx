"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type ExplorerBand = { id: string; number: string; name: string; note: string };

export type ExplorerCategory = {
  number: string;
  slug: string;
  name: string;
  description: string;
  band: string;
  itemCount: number;
  image?: string;
  subcategories: { slug: string; name: string; count: number }[];
};

const bandAccent: Record<string, string> = {
  everyday: "bg-pencil",
  activities: "bg-rule",
  setup: "bg-board",
};

/**
 * The categories as a register index. Desktop: the index on the left,
 * a preview of the chosen category on the right (hover or click to switch).
 * Mobile: each row opens in place to show what is inside.
 */
export function CategoryExplorer({
  bands,
  categories,
}: {
  bands: ExplorerBand[];
  categories: ExplorerCategory[];
}) {
  const [active, setActive] = useState(categories[0].slug);
  const [open, setOpen] = useState(true);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const current = categories.find((c) => c.slug === active) ?? categories[0];
  const currentBand = bands.find((b) => b.id === current.band)!;

  function choose(slug: string) {
    if (desktop) {
      setActive(slug);
      setOpen(true);
    } else if (slug === active) {
      setOpen((o) => !o);
    } else {
      setActive(slug);
      setOpen(true);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Index */}
      <div className="lg:col-span-5">
        {bands.map((band) => (
          <div key={band.id} className="mb-8 last:mb-0" data-reveal>
            <div className="flex items-baseline justify-between gap-3 border-b-2 border-ink pb-2">
              <h3 className="flex items-center gap-2.5 font-display text-xl">
                <span aria-hidden="true" className={cn("inline-block size-2.5 rounded-full", bandAccent[band.id])} />
                {band.name}
              </h3>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-soft">{band.note}</p>
            </div>

            <ul>
              {categories
                .filter((c) => c.band === band.id)
                .map((c) => {
                  const isActive = c.slug === active;
                  const expanded = isActive && open;
                  return (
                    <li key={c.slug} className="border-b border-ink/12">
                      <button
                        type="button"
                        onClick={() => choose(c.slug)}
                        onPointerEnter={(e) => desktop && e.pointerType === "mouse" && setActive(c.slug)}
                        onFocus={() => desktop && setActive(c.slug)}
                        aria-expanded={desktop ? undefined : expanded}
                        aria-controls={desktop ? "category-preview" : `category-panel-${c.slug}`}
                        aria-current={desktop && isActive ? "true" : undefined}
                        className={cn(
                          "group grid w-full grid-cols-[2.5rem_1.75rem_1fr_auto] items-center gap-3 px-3 py-3.5 text-left",
                          "transition-colors duration-150",
                          isActive ? "bg-board text-white" : "hover:bg-paper-deep",
                        )}
                      >
                        <span
                          className={cn(
                            "font-mono text-[0.8125rem] font-semibold",
                            isActive ? "text-pencil-soft" : "text-ink-soft",
                          )}
                        >
                          {c.number}
                        </span>
                        <CategoryIcon slug={c.slug} className="size-7" />
                        <span className="text-[1.0625rem] font-semibold leading-snug">{c.name}</span>
                        <svg
                          viewBox="0 0 16 16"
                          className={cn(
                            "size-4 transition-transform duration-200",
                            desktop
                              ? isActive
                                ? "translate-x-0.5"
                                : "opacity-40 group-hover:translate-x-0.5 group-hover:opacity-100"
                              : expanded
                                ? "rotate-90"
                                : "",
                          )}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M6 3.5 L10.5 8 L6 12.5" />
                        </svg>
                      </button>

                      {/* Mobile: opens in place (CSS hides it on desktop, so there is no shift on load) */}
                      {expanded ? (
                        <div id={`category-panel-${c.slug}`} className="animate-rise-in bg-white px-4 pb-6 pt-5 lg:hidden">
                          <Preview category={c} compact />
                        </div>
                      ) : null}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>

      {/* Desktop preview */}
      <div className="hidden lg:col-span-7 lg:block">
        <div
          id="category-preview"
          aria-live="polite"
          className="sticky top-28 overflow-hidden rounded-sm border border-ink/10 bg-white shadow-card"
        >
          <div className={cn("h-1.5 transition-colors duration-300", bandAccent[current.band])} />
          <div className="flex items-center justify-between border-b border-ink/10 px-8 py-3 font-mono text-label uppercase text-ink-soft">
            <span>Band {currentBand.number} &middot; {currentBand.name}</span>
            <span>{current.number} / {categories.length}</span>
          </div>
          {current.image ? (
            <div key={`photo-${current.slug}`} className="animate-rise-in relative aspect-[2/1] overflow-hidden [animation-duration:0.4s]">
              <Image
                src={current.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 700px, 58vw"
                className="object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
          ) : null}
          <div key={current.slug} className="relative p-8">
            <span
              aria-hidden="true"
              className="animate-rise-in pointer-events-none absolute right-6 top-2 font-display text-[8rem] leading-none text-ink/[0.06]"
            >
              {current.number}
            </span>
            <Preview category={current} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Preview({ category, compact = false }: { category: ExplorerCategory; compact?: boolean }) {
  return (
    <div className="relative">
      {compact && category.image ? (
        <div className="relative mb-4 h-36 overflow-hidden rounded-sm">
          <Image src={category.image} alt="" fill sizes="100vw" className="object-cover" />
        </div>
      ) : null}
      {compact ? null : (
        <>
          <CategoryIcon slug={category.slug} drawIn className="size-16 text-board" />
          <h4 className="animate-rise-in mt-6 font-display text-h2">{category.name}</h4>
        </>
      )}
      <p className={cn("animate-rise-in text-ink-soft", compact ? "" : "mt-2 text-lead")} style={{ animationDelay: "40ms" }}>
        {category.description}
      </p>

      <p className="mt-6 font-mono text-label uppercase text-ink-soft">
        What&apos;s inside &middot; {category.subcategories.length} groups &middot; {category.itemCount} items
      </p>
      <ul className="mt-2 grid gap-x-6 sm:grid-cols-2">
        {category.subcategories.map((sub, i) => (
          <li key={sub.slug} className="animate-rise-in" style={{ animationDelay: `${80 + i * 35}ms` }}>
            <Link
              href={`/products/${category.slug}#${sub.slug}`}
              className="group/sub flex items-baseline justify-between gap-3 border-b border-rule py-2.5 transition-colors duration-150 hover:text-board"
            >
              <span className="font-medium">{sub.name}</span>
              <span className="flex items-center gap-1.5 font-mono text-[0.75rem] text-ink-soft group-hover/sub:text-board">
                {sub.count}
                <svg viewBox="0 0 16 16" className="size-3 transition-transform duration-150 group-hover/sub:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 8 H13 M9 4 L13 8 L9 12" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <Button href={`/products/${category.slug}`} size={compact ? "md" : "lg"}>
          View {category.name}
        </Button>
      </div>
    </div>
  );
}
