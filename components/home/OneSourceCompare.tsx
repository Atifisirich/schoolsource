"use client";

import { useState } from "react";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { cn } from "@/lib/cn";

type Mode = "many" | "one";

// An example school's separate suppliers, placed around the school (in % of the stage)
const vendors = [
  { name: "Book seller", slug: "textbooks", x: 20, y: 16 },
  { name: "Uniform tailor", slug: "uniforms-bags", x: 50, y: 10 },
  { name: "Stationery shop", slug: "stationery", x: 80, y: 16 },
  { name: "Furniture dealer", slug: "furniture", x: 20, y: 86 },
  { name: "Lab supplier", slug: "labs", x: 50, y: 91 },
  { name: "Electrician", slug: "electricals", x: 80, y: 86 },
];
const school = { x: 50, y: 52 };
const merged = { x: 50, y: 15 };

const counts = [
  { label: "Quotations to compare", many: 6, one: 1 },
  { label: "People to follow up with", many: 6, one: 1 },
  { label: "Supplier accounts to settle", many: 6, one: 1 },
];

const modes = [
  ["many", "Six suppliers"],
  ["one", "One supplier"],
] as const;

/**
 * An example school buying from six separate suppliers, against one order
 * with SchoolSource. The visitor switches between the two; nothing plays on
 * its own.
 */
export function OneSourceCompare() {
  const [mode, setMode] = useState<Mode>("many");
  const one = mode === "one";

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-4 sm:px-6">
        <div className="inline-flex rounded-sm bg-paper-deep p-1" role="group" aria-label="Compare buying from">
          {modes.map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={cn(
                "btn h-10 rounded-[4px] px-4 text-sm font-semibold transition-colors duration-150",
                mode === value ? "bg-white text-ink shadow-card ring-1 ring-ink/10" : "text-ink-soft hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-sm text-ink-soft">An example school, buying for one term.</p>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* Diagram */}
        <div
          aria-hidden="true"
          className="relative aspect-[1/1] border-b border-rule bg-paper-deep/60 sm:aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[26rem] lg:border-b-0 lg:border-r"
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
            {vendors.map((v) => (
              <line
                key={v.name}
                x1={school.x}
                y1={school.y}
                x2={v.x}
                y2={v.y}
                stroke="var(--color-ink-soft)"
                strokeWidth="1"
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
                className="transition-opacity duration-300"
                style={{ opacity: one ? 0 : 0.5 }}
              />
            ))}
            <line
              x1={school.x}
              y1={school.y}
              x2={merged.x}
              y2={merged.y}
              stroke="var(--color-board)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              className="transition-opacity duration-300"
              style={{ opacity: one ? 1 : 0, transitionDelay: one ? "320ms" : "0ms" }}
            />
          </svg>

          {vendors.map((v, i) => (
            <span
              key={v.name}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-sm border border-rule bg-white px-2 py-1.5 text-[0.75rem] font-semibold leading-none transition-[left,top,opacity,scale] duration-500 ease-out motion-reduce:transition-opacity sm:text-[0.8125rem]"
              style={{
                left: `${one ? merged.x : v.x}%`,
                top: `${one ? merged.y : v.y}%`,
                opacity: one ? 0 : 1,
                scale: one ? "0.7" : "1",
                transitionDelay: `${(one ? i : vendors.length - 1 - i) * 30}ms`,
              }}
            >
              <CategoryIcon slug={v.slug} className="size-[1.1rem] shrink-0 text-ink-soft" />
              {v.name}
            </span>
          ))}

          <span
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-sm bg-board px-3.5 py-2 text-sm font-semibold text-white transition-[opacity,scale] duration-300 ease-out motion-reduce:transition-opacity"
            style={{
              left: `${merged.x}%`,
              top: `${merged.y}%`,
              opacity: one ? 1 : 0,
              scale: one ? "1" : "0.85",
              transitionDelay: one ? "260ms" : "0ms",
            }}
          >
            SchoolSource
          </span>

          <span
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-sm border border-ink/25 bg-white px-4 py-3 text-center"
            style={{ left: `${school.x}%`, top: `${school.y}%` }}
          >
            <svg viewBox="0 0 32 32" className="size-7 text-ink" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <path d="M4 14 L16 6 L28 14" />
              <path d="M7 13 V27 H25 V13" />
              <path d="M13 27 V20 H19 V27" />
            </svg>
            <span className="text-sm font-semibold">Your school</span>
          </span>
        </div>

        {/* What changes */}
        <div className="flex flex-col justify-center p-5 sm:p-6 lg:col-span-5 lg:p-8">
          <dl className="divide-y divide-rule border-y border-rule">
            {counts.map((c) => (
              <div key={c.label} className="flex items-baseline justify-between gap-4 py-4">
                <dt className="text-ink-soft">{c.label}</dt>
                <dd
                  className={cn(
                    "tabular font-display text-[2rem] font-semibold leading-none transition-colors duration-200",
                    one ? "text-board" : "text-ink",
                  )}
                >
                  {one ? c.one : c.many}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink" aria-live="polite">
            {one
              ? "One list, one itemised quotation, one delivery schedule and one contact on phone and WhatsApp."
              : "A separate quotation, bill and follow-up for every kind of purchase, each on its own timeline."}
          </p>
        </div>
      </div>
    </div>
  );
}
