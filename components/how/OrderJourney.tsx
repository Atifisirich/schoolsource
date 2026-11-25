"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

type Stage = {
  title: string;
  text: string;
  /** Who acts at this stage */
  who: "You" | "SchoolSource";
  /** WhatsApp update the school receives, if any */
  message?: string;
  /** Status line shown in the chat while the order is with us */
  status?: string;
  icon: React.ReactNode;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const stages: Stage[] = [
  {
    title: "You send your list",
    text: "On WhatsApp, by email or through the website. Any format, even a photo of a handwritten list.",
    who: "You",
    message: "Thank you, we have your list. We will send the quotation shortly.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M6 3 H15 L19 7 V21 H6 Z" />
        <path d="M15 3 V7 H19 M9 11 H16 M9 15 H16" />
      </svg>
    ),
  },
  {
    title: "Itemised quotation",
    text: "Every item quoted line by line. Change items or quantities before you approve.",
    who: "SchoolSource",
    message: "Your quotation is attached, line by line. Tell us if anything should change.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8 H16 M8 12 H16 M8 16 H12" />
      </svg>
    ),
  },
  {
    title: "Order confirmed",
    text: "You approve the quotation and we agree a delivery date with you.",
    who: "You",
    message: "Order confirmed. Delivery is planned before your school reopens.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5 L11 15.5 L16.5 9" />
      </svg>
    ),
  },
  {
    title: "Picked from our warehouse",
    text: "Items in stock are picked from our warehouse. Anything else is sourced for your order.",
    who: "SchoolSource",
    status: "Picking your order in our warehouse",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3 9 L12 4 L21 9 V20 H3 Z" />
        <path d="M7 20 V13 H17 V20 M7 16.5 H17" />
      </svg>
    ),
  },
  {
    title: "Checked and packed",
    text: "Every order is counted and checked against what you approved before it leaves. Kits are packed and labelled.",
    who: "SchoolSource",
    status: "Checked against your order, packed and labelled",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3 7.5 L12 3 L21 7.5 V16.5 L12 21 L3 16.5 Z" />
        <path d="M3 7.5 L12 12 L21 7.5 M12 12 V21" />
      </svg>
    ),
  },
  {
    title: "Dispatched",
    text: "Sent with our in-house delivery team or a transport partner, depending on the order and where your school is.",
    who: "SchoolSource",
    message: "Your order is on its way.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M2 6 H14 V16 H2 Z" />
        <path d="M14 9 H18.5 L22 12.5 V16 H14" />
        <circle cx="6" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Delivered with paperwork",
    text: "Delivered to your school with a GST invoice and delivery challan.",
    who: "SchoolSource",
    message: "Delivered. The GST invoice and delivery challan are with your office.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 11 L12 4 L20 11 V20 H4 Z" />
        <path d="M9 14.5 L11.2 16.7 L15.5 12.4" />
      </svg>
    ),
  },
  {
    title: "After delivery",
    text: "Anything that arrived damaged, short or wrong is replaced. Ask us any time to re-quote the same order next year.",
    who: "SchoolSource",
    message: "If anything arrived damaged, short or wrong, message us here and we will replace it.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M20 12 A8 8 0 1 1 17.7 6.3" />
        <path d="M20 4 V8 H16" />
      </svg>
    ),
  },
];

/**
 * An example order moving through every stage, with the WhatsApp updates the
 * school receives alongside. Plays once when scrolled into view; any stage
 * can be picked by hand.
 */
export function OrderJourney() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const touched = useRef(false);
  const chat = useRef<HTMLOListElement>(null);
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -25% 0px");

  // Start once visible; with reduced motion, show the finished order
  useEffect(() => {
    if (!inView || touched.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(stages.length - 1);
      return;
    }
    setPlaying(true);
  }, [inView]);

  useEffect(() => {
    if (!playing) return;
    if (active >= stages.length - 1) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => setActive((a) => a + 1), 1700);
    return () => window.clearTimeout(t);
  }, [playing, active]);

  // Keep the newest update in view inside the chat panel
  useEffect(() => {
    const list = chat.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [active]);

  function pick(i: number) {
    touched.current = true;
    setPlaying(false);
    setActive(i);
  }

  function replay() {
    touched.current = true;
    setActive(0);
    setPlaying(true);
  }

  const progress = (active / (stages.length - 1)) * 100;
  const shown = stages.slice(0, active + 1);

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      {/* Stages */}
      <div className="lg:col-span-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="font-mono text-label uppercase text-ink-soft">
            Example order &middot; stage {active + 1} of {stages.length}
          </p>
          <button
            type="button"
            onClick={replay}
            className="inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-sm border border-board/30 bg-white px-3 text-sm font-semibold text-board shadow-card transition-colors hover:border-board"
          >
            <svg viewBox="0 0 16 16" className="size-4" {...stroke} aria-hidden="true">
              <path d="M13 8 A5 5 0 1 1 11.5 4.5" />
              <path d="M13 2 V5 H10" />
            </svg>
            Play again
          </button>
        </div>

        <ol className="relative grid gap-2">
          {/* Track, filled as the order moves */}
          <span aria-hidden="true" className="absolute bottom-6 left-[1.69rem] top-6 w-0.5 rounded-full bg-rule" />
          <span
            aria-hidden="true"
            className="absolute left-[1.69rem] top-6 w-0.5 origin-top rounded-full bg-board transition-[height] duration-700 ease-out-quart"
            style={{ height: `calc((100% - 3rem) * ${progress / 100})` }}
          />
          {stages.map((s, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <li key={s.title} className="relative">
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-current={current ? "step" : undefined}
                  className={cn(
                    "group flex w-full items-start gap-4 rounded-md p-2 text-left transition-colors duration-300",
                    current ? "bg-white shadow-card" : "hover:bg-white/70",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-[background-color,border-color,color,transform] duration-300 [&>svg]:size-5",
                      current
                        ? "scale-110 border-board bg-board text-white shadow-button"
                        : done
                          ? "border-board bg-white text-board"
                          : "border-rule bg-paper text-ink-soft",
                    )}
                  >
                    {done ? (
                      <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.25}>
                        <path d="M6 12.5 L10 16.5 L18 8" />
                      </svg>
                    ) : (
                      s.icon
                    )}
                  </span>
                  <span className="min-w-0 pt-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className={cn("font-semibold", current || done ? "text-ink" : "text-ink-soft")}>{s.title}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.06em]",
                          s.who === "You" ? "bg-pencil-soft text-ink" : "bg-board/10 text-board",
                        )}
                      >
                        {s.who}
                      </span>
                    </span>
                    {/* Detail opens for the current stage */}
                    <span
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-300 ease-out-quart",
                        current ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-1 text-[0.9375rem] text-ink-soft">{s.text}</span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* WhatsApp updates */}
      <figure className="order-first lg:order-none lg:col-span-5">
        <div className="overflow-hidden rounded-lg lg:sticky lg:top-28 border border-ink/10 bg-white shadow-lift">
          <div className="flex items-center gap-3 bg-board px-4 py-3 text-white">
            <span className="flex size-9 items-center justify-center rounded-full bg-white font-display text-board">S</span>
            <span className="min-w-0">
              <span className="block font-semibold leading-tight">SchoolSource</span>
              <span className="block text-[0.75rem] text-pencil-soft">Order updates on WhatsApp</span>
            </span>
          </div>
          <ol
            ref={chat}
            aria-live="polite"
            className="grid h-[15rem] content-start gap-2.5 overflow-y-auto sm:h-[22rem] bg-paper-deep/70 bg-[radial-gradient(var(--color-rule)_1px,transparent_1px)] p-4 [background-size:18px_18px]"
          >
            {shown.map((s, i) =>
              s.message ? (
                <li
                  key={s.title}
                  className="animate-rise-in max-w-[85%] rounded-md rounded-tl-none bg-white px-3 py-2 text-[0.9375rem] shadow-card [animation-duration:0.35s]"
                >
                  {s.message}
                  <span className="mt-1 block text-right font-mono text-[0.625rem] text-ink-soft">
                    Step {i + 1} &middot; {s.title}
                  </span>
                </li>
              ) : (
                <li
                  key={s.title}
                  className="animate-rise-in mx-auto rounded-full bg-pencil-soft px-3 py-1 text-center text-[0.8125rem] font-semibold text-ink [animation-duration:0.35s]"
                >
                  {s.status}
                </li>
              ),
            )}
          </ol>
        </div>
        <figcaption className="mt-3 text-sm text-ink-soft">
          An example of the updates a school receives. Dates and details are confirmed for each order.
        </figcaption>
      </figure>
    </div>
  );
}
