"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import { cn } from "@/lib/cn";

export type CalendarMonthView = {
  short: string;
  name: string;
  title: string;
  text: string;
  categories: { slug: string; name: string }[];
  kits: { id: string; slug: string; name: string; basis: string }[];
};

// Calendar months run April to March; JS months run January (0) to December
const toIndex = (jsMonth: number) => (jsMonth + 9) % 12;

/**
 * The academic year as twelve tabs. Opens on the current month once the page
 * has loaded; arrow keys move between months.
 */
export function BuyingCalendar({ months }: { months: CalendarMonthView[] }) {
  const [selected, setSelected] = useState(0);
  const [current, setCurrent] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const now = toIndex(new Date().getMonth());
    setCurrent(now);
    setSelected(now);
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const jump = e.key === "Home" ? 0 : e.key === "End" ? months.length - 1 : null;
    if (!step && jump === null) return;
    e.preventDefault();
    const next = jump ?? (selected + step + months.length) % months.length;
    setSelected(next);
    tabs.current[next]?.focus();
  }

  const month = months[selected];
  const busiest = Math.max(...months.map((m) => m.categories.length));

  return (
    <div>
      <div role="tablist" aria-label="Months of the school year" onKeyDown={onKeyDown} className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
        {months.map((m, i) => {
          const on = i === selected;
          return (
            <button
              key={m.short}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`month-tab-${i}`}
              aria-selected={on}
              aria-controls="month-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setSelected(i)}
              className={cn(
                "group relative flex h-20 flex-col items-center justify-end gap-2 rounded-sm border pb-2.5 pt-3 transition-[background-color,border-color,color,transform] duration-200",
                on
                  ? "-translate-y-1 border-board bg-board text-white shadow-[0_12px_24px_-16px_rgb(14_31_61/0.7)]"
                  : "border-ink/15 bg-white text-ink hover:-translate-y-0.5 hover:border-board",
              )}
            >
              {current === i ? (
                <span className="absolute -top-2 rounded-full bg-pencil px-1.5 py-px font-mono text-[0.625rem] uppercase tracking-[0.06em] text-ink">
                  Now
                </span>
              ) : null}
              {/* How busy the month is: one bar per category usually ordered */}
              <span aria-hidden="true" className="flex h-6 items-end gap-0.5">
                {Array.from({ length: busiest }, (_, b) => (
                  <span
                    key={b}
                    className={cn(
                      "w-1 rounded-full transition-colors duration-200",
                      b < m.categories.length
                        ? on
                          ? "bg-pencil"
                          : "bg-board/70 group-hover:bg-board"
                        : on
                          ? "bg-white/20"
                          : "bg-ink/10",
                    )}
                    style={{ height: `${40 + b * 12}%` }}
                  />
                ))}
              </span>
              <span className="font-mono text-[0.8125rem] font-semibold uppercase tracking-[0.06em]">{m.short}</span>
            </button>
          );
        })}
      </div>

      <div
        id="month-panel"
        role="tabpanel"
        aria-labelledby={`month-tab-${selected}`}
        className="mt-6 overflow-hidden rounded-md border border-ink/10 bg-white shadow-card"
      >
        <div key={month.short} className="animate-rise-in grid gap-8 p-6 [animation-duration:0.35s] sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-label uppercase text-ink-soft">
              {month.name}
              {current === selected ? " · this month" : ""}
            </p>
            <h3 className="mt-2 text-h3">{month.title}</h3>
            <p className="mt-3 text-ink-soft">{month.text}</p>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setSelected((selected - 1 + months.length) % months.length)}
                className="inline-flex h-10 items-center gap-2 rounded-sm border border-ink/20 px-3 text-sm font-semibold hover:border-board hover:text-board"
              >
                <span aria-hidden="true">&larr;</span> {months[(selected - 1 + months.length) % months.length].short}
              </button>
              <button
                type="button"
                onClick={() => setSelected((selected + 1) % months.length)}
                className="inline-flex h-10 items-center gap-2 rounded-sm border border-ink/20 px-3 text-sm font-semibold hover:border-board hover:text-board"
              >
                {months[(selected + 1) % months.length].short} <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:col-span-7">
            <div>
              <h4 className="font-mono text-label uppercase text-ink-soft">Usually ordered</h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {month.categories.map((c, i) => (
                  <li key={c.slug} className="animate-rise-in [animation-duration:0.35s]" style={{ animationDelay: `${60 + i * 40}ms` }}>
                    <Link
                      href={`/products/${c.slug}`}
                      className="group flex items-center gap-3 rounded-sm border border-ink/12 bg-paper px-3 py-2.5 transition-colors hover:border-board hover:bg-white"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-white">
                        <CategoryIcon slug={c.slug} className="size-6 text-board" />
                      </span>
                      <span className="flex-1 font-semibold">{c.name}</span>
                      <span aria-hidden="true" className="text-board transition-transform duration-200 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {month.kits.length ? (
              <div>
                <h4 className="font-mono text-label uppercase text-ink-soft">Ready kits for this month</h4>
                <ul className="mt-3 grid gap-2">
                  {month.kits.map((k) => (
                    <li
                      key={k.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-pencil/50 bg-pencil-soft/40 px-4 py-3"
                    >
                      <span>
                        <a href={`#${k.slug}`} className="font-semibold underline decoration-pencil underline-offset-4 hover:decoration-board">
                          {k.name}
                        </a>
                        <span className="ml-2 font-mono text-[0.75rem] uppercase text-ink-soft">{k.basis}</span>
                      </span>
                      <AddToQuoteButton size="sm" item={{ id: k.id, name: k.name, category: "School kits" }} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
