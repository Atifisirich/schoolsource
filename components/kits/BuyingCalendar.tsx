"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
 * The academic year, April to March, as a grid of twelve months: what schools
 * usually order and the kits that cover it. Everything is visible at once, like
 * a printed year planner. The current month is marked once the page has loaded.
 */
export function BuyingCalendar({ months }: { months: CalendarMonthView[] }) {
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    setCurrent(toIndex(new Date().getMonth()));
  }, []);

  return (
    <ol className="grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {months.map((m, i) => {
        const now = current === i;
        return (
          <li
            key={m.short}
            aria-current={now ? "date" : undefined}
            className={cn("flex flex-col p-5 sm:p-6", now ? "bg-pencil-soft" : "bg-white")}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-h3">{m.name}</h3>
              {now ? (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-pencil" />
                  This month
                </span>
              ) : null}
            </div>
            <p className="mt-1 font-semibold">{m.title}</p>
            <p className="mt-2 text-[0.9375rem] text-ink-soft">{m.text}</p>

            <div className="mt-auto pt-5">
              <p className="text-sm text-ink-soft">Usually ordered</p>
              <ul className="mt-1 flex flex-wrap gap-x-1 gap-y-0.5 text-[0.9375rem]">
                {m.categories.map((c, j) => (
                  <li key={c.slug}>
                    <Link href={`/products/${c.slug}`} className="link-draw text-ink transition-colors duration-150 hover:text-board">
                      {c.name}
                    </Link>
                    {j < m.categories.length - 1 ? <span aria-hidden="true">,</span> : null}
                  </li>
                ))}
              </ul>
              {m.kits.length ? (
                <>
                  <p className="mt-3 text-sm text-ink-soft">{m.kits.length > 1 ? "Kits" : "Kit"}</p>
                  <ul className="mt-1 grid gap-1 text-[0.9375rem]">
                    {m.kits.map((k) => (
                      <li key={k.id}>
                        <a href={`#${k.slug}`} className="link font-semibold text-board">
                          {k.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
