"use client";

import { useEffect, useRef, useState } from "react";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

type Mode = "many" | "one";

// An example school's separate suppliers, placed around the school (in % of the stage)
const vendors = [
  { name: "Book seller", slug: "textbooks", x: 18, y: 18 },
  { name: "Uniform tailor", slug: "uniforms-bags", x: 50, y: 9 },
  { name: "Stationery shop", slug: "stationery", x: 82, y: 18 },
  { name: "Furniture dealer", slug: "furniture", x: 18, y: 84 },
  { name: "Lab supplier", slug: "labs", x: 50, y: 92 },
  { name: "Electrician", slug: "electricals", x: 82, y: 84 },
];
const school = { x: 50, y: 52 };
const merged = { x: 50, y: 16 };

const counts = [
  { label: "Quotations to compare", many: 6, one: 1 },
  { label: "People to follow up", many: 6, one: 1 },
  { label: "Supplier accounts to settle", many: 6, one: 1 },
];

/**
 * "Six suppliers, or one": the suppliers around a school merge into one
 * SchoolSource node. Plays once when scrolled into view; the toggle lets
 * visitors switch back and forth.
 */
export function OneSourceCompare() {
  const [mode, setMode] = useState<Mode>("many");
  const touched = useRef(false);
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -30% 0px");

  useEffect(() => {
    if (!inView || touched.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      if (!touched.current) setMode("one");
    }, 1400);
    return () => window.clearTimeout(t);
  }, [inView]);

  function choose(next: Mode) {
    touched.current = true;
    setMode(next);
  }

  const one = mode === "one";

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <div className="inline-flex rounded-full border border-ink/10 bg-white shadow-card p-1" role="group" aria-label="Compare">
          {(
            [
              ["many", "Six suppliers"],
              ["one", "SchoolSource"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => choose(value)}
              className={cn(
                "h-10 rounded-full px-4 text-sm font-semibold transition-colors duration-200",
                mode === value ? "bg-board text-white" : "text-ink-soft hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-md border border-ink/12 bg-ink/12">
          {counts.map((c) => (
            <div key={c.label} className="flex items-center justify-between gap-4 bg-white px-5 py-4">
              <dt className="text-ink-soft">{c.label}</dt>
              <dd className="relative flex h-10 w-10 items-center justify-center overflow-hidden">
                <span
                  key={mode}
                  className={cn(
                    "animate-rise-in font-display text-[2rem] leading-none [animation-duration:0.4s]",
                    one ? "text-board" : "text-red",
                  )}
                >
                  {one ? c.one : c.many}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-ink-soft" aria-live="polite">
          {one
            ? "One list, one itemised quotation and one contact on phone and WhatsApp."
            : "A separate quote, bill and follow-up for every kind of purchase."}
        </p>
      </div>

      <figure className="lg:col-span-7">
        <div
          aria-hidden="true"
          className="relative aspect-square overflow-hidden rounded-md border border-ink/12 bg-white bg-[radial-gradient(var(--color-rule)_1px,transparent_1px)] [background-size:20px_20px] sm:aspect-[4/3]"
        >
          {/* Connection lines */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
            {vendors.map((v) => (
              <line
                key={v.name}
                x1={school.x}
                y1={school.y}
                x2={v.x}
                y2={v.y}
                stroke="var(--color-red)"
                strokeWidth="1.5"
                strokeDasharray="4 5"
                vectorEffect="non-scaling-stroke"
                className="transition-opacity duration-500"
                style={{ opacity: one ? 0 : 0.55 }}
              />
            ))}
            <line
              x1={school.x}
              y1={school.y}
              x2={merged.x}
              y2={merged.y}
              stroke="var(--color-board)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              className="transition-opacity duration-500"
              style={{ opacity: one ? 1 : 0, transitionDelay: one ? "450ms" : "0ms" }}
            />
          </svg>

          {/* Suppliers */}
          {vendors.map((v, i) => (
            <span
              key={v.name}
              className="absolute flex max-w-[6.5rem] -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-sm border border-ink/15 bg-paper px-2 py-1.5 text-[0.6875rem] font-semibold leading-tight shadow-[0_6px_14px_-10px_rgb(14_31_61/0.5)] transition-[left,top,opacity,scale] duration-700 ease-out-quart sm:max-w-none sm:text-[0.8125rem]"
              style={{
                left: `${one ? merged.x : v.x}%`,
                top: `${one ? merged.y : v.y}%`,
                opacity: one ? 0 : 1,
                scale: one ? "0.6" : "1",
                transitionDelay: `${(one ? i : vendors.length - i) * 45}ms`,
              }}
            >
              <CategoryIcon slug={v.slug} className="size-5 shrink-0 text-red" />
              {v.name}
            </span>
          ))}

          {/* SchoolSource */}
          <span
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-md bg-board px-4 py-2.5 font-semibold text-white shadow-[0_14px_28px_-14px_rgb(14_31_61/0.7)] transition-[opacity,scale] duration-500 ease-out-quart"
            style={{
              left: `${merged.x}%`,
              top: `${merged.y}%`,
              opacity: one ? 1 : 0,
              scale: one ? "1" : "0.7",
              transitionDelay: one ? "380ms" : "0ms",
            }}
          >
            <span className="size-2 rounded-full bg-pencil" />
            SchoolSource
          </span>

          {/* The school */}
          <span
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-md border-2 border-ink bg-white px-4 py-3 text-center"
            style={{ left: `${school.x}%`, top: `${school.y}%` }}
          >
            <svg viewBox="0 0 32 32" className="size-8 text-ink" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round">
              <path d="M4 14 L16 6 L28 14" />
              <path d="M7 13 V27 H25 V13" />
              <path d="M13 27 V20 H19 V27" />
              <path d="M16 10 V13" />
            </svg>
            <span className="text-sm font-semibold">Your school</span>
          </span>

          {/* Outcome chips */}
          <span
            className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 flex-wrap justify-center gap-1.5 transition-opacity duration-500"
            style={{ opacity: one ? 1 : 0, transitionDelay: one ? "700ms" : "0ms" }}
          >
            {["One quotation", "One contact", "Scheduled delivery"].map((t) => (
              <span key={t} className="whitespace-nowrap rounded-full bg-pencil-soft px-2.5 py-1 text-[0.75rem] font-semibold text-ink">
                {t}
              </span>
            ))}
          </span>
        </div>
        <figcaption className="mt-3 text-sm text-ink-soft">
          An example: a school buying books, uniforms, stationery, furniture, lab and electrical items from separate
          suppliers.
        </figcaption>
      </figure>
    </div>
  );
}
