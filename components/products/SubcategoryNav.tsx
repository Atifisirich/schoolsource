"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type NavItem = { slug: string; name: string; count: number };

/**
 * The left column of a category page. Desktop: a sticky side list of the
 * groups with the filter above it. Mobile: the filter, then a horizontal
 * scroll row of the groups that sticks under the header. Highlights the
 * group in view.
 *
 * Place it as a direct child of the page's grid: below `lg` its wrappers use
 * `display: contents`, so the mobile row can stick for the whole item list.
 */
export function SubcategoryNav({
  items,
  filter,
  className,
}: {
  items: NavItem[];
  filter?: React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.slug);
  const listRef = useRef<HTMLUListElement>(null);

  // The active group is the last one whose top has passed a line a third of
  // the way down the screen (the first group until then). Hidden groups
  // (filtered out) are skipped.
  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => Boolean(el));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.33;
      const shown = sections.filter((s) => !s.hidden);
      let current = shown[0]?.id;
      for (const s of shown) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
        else break;
      }
      if (current) setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  // Mobile: keep the active link visible inside the row without moving the page
  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const link = list.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (!link) return;
    const left = link.offsetLeft - 16;
    const right = link.offsetLeft + link.offsetWidth + 16;
    if (left < list.scrollLeft || right > list.scrollLeft + list.clientWidth) {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollTo({ left: left - list.clientWidth / 4, behavior: smooth ? "smooth" : "auto" });
    }
  }, [active]);

  return (
    <div className={cn("contents lg:block", className)}>
      <div className="contents lg:sticky lg:top-[6.5rem] lg:block">
        {filter ? <div className="pb-4 lg:pb-6">{filter}</div> : null}

        <nav
          aria-label="Groups in this category"
          className={cn(
            // Mobile: full-bleed row that sticks under the header
            "sticky top-16 z-20 -mx-gutter min-w-0 border-b border-rule bg-white/95 backdrop-blur-sm",
            "lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:backdrop-blur-none",
          )}
        >
          <p className="mb-2 hidden px-3 text-sm font-semibold text-ink-soft lg:block">In this category</p>
          <ul
            ref={listRef}
            className="flex overflow-x-auto px-[calc(var(--spacing-gutter)-0.75rem)] [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => {
              const isActive = item.slug === active;
              return (
                <li key={item.slug} className="shrink-0">
                  <a
                    href={`#${item.slug}`}
                    data-slug={item.slug}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setActive(item.slug)}
                    className={cn(
                      "relative flex items-center gap-3 whitespace-nowrap text-[0.9375rem] transition-colors duration-150",
                      // Mobile: text tabs with an underline for the group in view
                      "h-12 px-3 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-left after:bg-board after:transition-transform after:duration-200 after:ease-out",
                      isActive ? "font-semibold text-ink after:scale-x-100" : "text-ink-soft after:scale-x-0 hover:text-ink",
                      // Desktop: a quiet list, the group in view on a grey ground
                      "lg:h-auto lg:justify-between lg:whitespace-normal lg:rounded-sm lg:py-2 lg:after:hidden",
                      isActive ? "lg:bg-paper-deep" : "lg:hover:bg-paper-deep/60",
                    )}
                  >
                    <span>{item.name}</span>
                    <span className="tabular hidden text-sm font-normal text-ink-soft lg:inline">{item.count}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
