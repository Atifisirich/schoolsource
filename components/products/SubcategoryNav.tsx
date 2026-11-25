"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type NavItem = { slug: string; name: string; count: number };

/**
 * Sticky sub-category navigation under the header: underlined tabs on
 * desktop, scrollable chips on mobile. Highlights the section in view.
 */
export function SubcategoryNav({ items, aside }: { items: NavItem[]; aside?: React.ReactNode }) {
  const [active, setActive] = useState(items[0]?.slug);
  const listRef = useRef<HTMLUListElement>(null);

  // Track which section is in the reading zone
  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  // Keep the active chip visible inside the bar without moving the page
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (!list || !link) return;
    const left = link.offsetLeft - 16;
    const right = link.offsetLeft + link.offsetWidth + 16;
    if (left < list.scrollLeft || right > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: left - list.clientWidth / 4, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav
      aria-label="Sections in this category"
      className="sticky top-16 z-30 border-b border-ink/12 bg-paper/95 backdrop-blur-[2px] lg:top-[4.5rem]"
    >
      <div className="mx-auto flex max-w-[80rem] flex-col gap-2 px-gutter py-2.5 lg:flex-row lg:items-center lg:gap-6 lg:py-0">
        {aside ? <div className="lg:order-2 lg:shrink-0">{aside}</div> : null}
        <ul
          ref={listRef}
          className="-mx-gutter flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-gutter [scrollbar-width:none] lg:mx-0 lg:gap-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
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
                    "relative flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-150",
                    // Mobile: chips
                    "h-9 rounded-sm border px-3",
                    isActive ? "border-board bg-board text-white" : "border-ink/15 bg-white text-ink hover:border-board",
                    // Desktop: underlined tabs
                    "lg:h-12 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-4",
                    "lg:after:absolute lg:after:inset-x-4 lg:after:bottom-0 lg:after:h-[3px] lg:after:origin-left lg:after:bg-board lg:after:transition-transform lg:after:duration-200",
                    isActive ? "lg:after:scale-x-100 lg:text-board" : "lg:after:scale-x-0 lg:text-ink lg:hover:text-board",
                  )}
                >
                  {item.name}
                  <span className={cn("font-mono text-[0.6875rem]", isActive ? "text-pencil-soft lg:text-board" : "text-ink-soft")}>
                    {item.count}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
