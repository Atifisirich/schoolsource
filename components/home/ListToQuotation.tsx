"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LogoMark } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";
import s from "./ListToQuotation.module.css";

// An example requirement list. Illustrative only: no prices, no client names.
const lines = [
  { hand: "40 registers", item: "Long registers", qty: "40" },
  { hand: "2 boxes chalk", item: "White chalk", qty: "2 boxes" },
  { hand: "10 dusters", item: "Board dusters", qty: "10" },
  { hand: "Sports day trophies", item: "Trophies, sports day", qty: "As listed" },
  { hand: "500 answer booklets", item: "Answer booklets", qty: "500" },
];

// Timeline in ms. Gaps between lines shrink a little, so the list reads as a
// wave rather than a metronome.
const LIST_IN = 120;
const SHEET_IN = 240;
const lineStarts = [780, 1160, 1500, 1800, 2070];
const FOOT = lineStarts[lineStarts.length - 1] + 460;
const STAMP = FOOT + 220;
const NUDGE = STAMP + 200;
const REPLAY = STAMP + 600;

const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

/**
 * Hero piece: a handwritten requirement list beside the itemised quotation
 * SchoolSource sends back. Each line is ticked, settles back, and its typed
 * row appears in the quotation; then the QUOTED stamp is pressed on.
 *
 * Plays once, when the piece is first on screen (straight away on desktop,
 * on scroll on phones). Pure CSS keyframes; the only script is the start
 * trigger and the replay. Reduced motion shows the finished quotation.
 */
export function ListToQuotation({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setPlaying(true);
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} data-playing={playing} className={cn(s.piece, "relative", className)}>
      <div
        key={run}
        className="grid gap-4 sm:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] sm:items-start sm:gap-5"
      >
        {/* The school's list, handwritten */}
        <figure
          className={cn(
            s.anim,
            s.paperIn,
            "relative rounded-[4px] border border-rule bg-white px-5 pb-5 pt-4 shadow-card sm:-rotate-[1.2deg] sm:px-6 sm:pb-7 sm:pt-5",
          )}
          style={d(LIST_IN)}
          aria-label="Example: a school's handwritten requirement list"
        >
          <figcaption className="font-hand text-[1.0625rem] leading-7 text-ink-soft">For next term</figcaption>
          <ul className="mt-2 font-hand text-[1.1875rem] leading-[1.9] text-ink sm:text-[1.25rem]">
            {lines.map((line, i) => (
              <li key={line.hand} className="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  className="size-[1.1rem] shrink-0 text-red"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path pathLength={1} d="M4 13 L9.5 18 L20 5.5" className={cn(s.anim, s.tick)} style={d(lineStarts[i])} />
                </svg>
                <span className={cn(s.anim, s.handDone, "whitespace-nowrap")} style={d(lineStarts[i] + 90)}>
                  {line.hand}
                </span>
              </li>
            ))}
          </ul>
        </figure>

        {/* The quotation that comes back */}
        <div className={cn(s.anim, s.paperIn, "sm:mt-9")} style={d(SHEET_IN)}>
          <figure
            className={cn(s.nudge, "relative rounded-[4px] border border-rule bg-white px-5 pb-5 pt-5 shadow-card sm:px-6")}
            style={d(NUDGE)}
            aria-label="Example: the itemised quotation SchoolSource returns"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <LogoMark className="size-5" />
                <span className="font-display text-[0.9375rem] font-semibold leading-none">SchoolSource</span>
              </span>
              <span className="font-display text-[1.125rem] font-semibold leading-none">Quotation</span>
            </div>
            <p className="mt-3 border-b border-ink pb-3 text-[0.8125rem] text-ink-soft">To: The Principal</p>

            <table className="mt-1 w-full text-left text-[0.875rem]">
              <thead>
                <tr className="text-[0.75rem] text-ink-soft">
                  <th scope="col" className="w-6 py-2 font-medium">
                    <span className="sr-only">Line</span>
                  </th>
                  <th scope="col" className="py-2 font-medium">Item</th>
                  <th scope="col" className="py-2 text-right font-medium">Qty</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line, i) => (
                  <tr key={line.item} className={cn(s.anim, s.rowIn, "border-t border-rule")} style={d(lineStarts[i] + 130)}>
                    <td className="tabular py-[0.45rem] text-[0.8125rem] text-ink-soft">{i + 1}</td>
                    <td className="py-[0.45rem]">{line.item}</td>
                    <td className="tabular whitespace-nowrap py-[0.45rem] text-right">{line.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-2 flex items-end justify-between gap-4 border-t border-rule pt-3">
              <p className={cn(s.anim, s.fadeIn, "text-[0.75rem] leading-snug text-ink-soft")} style={d(FOOT)}>
                Prepared from your list, line by line.
              </p>

              {/* The one stamp on the site */}
              <div
                className={cn(s.anim, s.stamp, "-mb-1 shrink-0 select-none text-red")}
                style={d(STAMP)}
                aria-hidden="true"
              >
                <div className="rounded-[3px] border-2 border-current p-[2px]">
                  <div className="rounded-[2px] border border-current px-2.5 pb-1 pt-1.5 text-center">
                    <span className="block font-sans text-[0.9375rem] font-bold leading-none tracking-[0.14em]">QUOTED</span>
                    <span className="mt-1 block font-sans text-[0.5625rem] font-semibold leading-none tracking-[0.06em]">
                      SCHOOLSOURCE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className={cn(
          s.anim,
          s.fadeIn,
          s.replay,
          "btn mt-4 inline-flex h-10 items-center gap-2 rounded-sm px-2 text-sm text-ink-soft transition-colors duration-150 hover:bg-paper-deep hover:text-ink sm:ml-[calc(41%+0.25rem)]",
        )}
        style={d(REPLAY)}
      >
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2.5 8 A5.5 5.5 0 1 0 4.2 4" />
          <path d="M2 1.8 V4.6 H4.8" />
        </svg>
        Replay
        <span className="sr-only"> the list to quotation example</span>
      </button>
    </div>
  );
}
