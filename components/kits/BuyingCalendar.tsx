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
 * The school year, April to March, as a plain list: month on the left, what
 * schools usually order on the right. One column on phones. The current
 * month is marked once the page has loaded.
 */
export function BuyingCalendar({ months }: { months: CalendarMonthView[] }) {
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    setCurrent(toIndex(new Date().getMonth()));
  }, []);

  return (
    <ol className="border-t-2 border-ink">
      {months.map((m, i) => {
        const now = current === i;
        return (
          <li
            key={m.short}
            aria-current={now ? "date" : undefined}
            className={cn(
              "grid gap-x-10 gap-y-3 border-b border-rule px-0 py-7 md:grid-cols-[11rem_minmax(0,1fr)] md:py-8 lg:grid-cols-[14rem_minmax(0,1fr)]",
              now && "-mx-4 rounded-lg bg-sky px-4 sm:-mx-6 sm:px-6",
            )}
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 md:block">
              <h3 className="font-display text-[1.75rem] leading-none md:text-[2rem]">{m.name}</h3>
              {now ? (
                <span className="mt-0 inline-block rounded-full bg-ink px-3 py-1 text-[0.9375rem] font-bold text-white md:mt-3">
                  This month
                </span>
              ) : null}
            </div>
            <div className="min-w-0">
              <p className="text-[1.1875rem] font-bold leading-snug">{m.title}</p>
              <p className="mt-1.5 max-w-[40rem] text-[1.0625rem] leading-relaxed text-ink-soft">{m.text}</p>
              <p className="mt-4 text-[1.0625rem] leading-relaxed">
                <span className="font-bold">Usually ordered: </span>
                {m.categories.map((c, j) => (
                  <span key={c.slug}>
                    <Link href={`/products/${c.slug}`} className="link text-ink hover:text-blue">
                      {c.name}
                    </Link>
                    {j < m.categories.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              {m.kits.length ? (
                <p className="mt-2 text-[1.0625rem] leading-relaxed">
                  <span className="font-bold">{m.kits.length > 1 ? "Kits: " : "Kit: "}</span>
                  {m.kits.map((k, j) => (
                    <span key={k.id}>
                      <a href={`#${k.slug}`} className="link font-semibold text-blue">
                        {k.name}
                      </a>
                      {j < m.kits.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
