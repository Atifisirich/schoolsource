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
};

const stages: Stage[] = [
  {
    title: "You send your list",
    text: "On WhatsApp, by email or through the website. Any format works, even a photo of a handwritten list.",
    who: "You",
    message: "Thank you, we have your list. We will send the quotation shortly.",
  },
  {
    title: "Itemised quotation",
    text: "Every item quoted line by line. Change items or quantities before you approve.",
    who: "SchoolSource",
    message: "Your quotation is attached, line by line. Tell us if anything should change.",
  },
  {
    title: "Order confirmed",
    text: "You approve the quotation and we agree a delivery date with you.",
    who: "You",
    message: "Order confirmed. We have noted the delivery date we agreed.",
  },
  {
    title: "Picked from our warehouse",
    text: "Items in stock are picked from our warehouse. Anything else is sourced for your order.",
    who: "SchoolSource",
    status: "Picking your order in our warehouse",
  },
  {
    title: "Checked and packed",
    text: "Every order is checked against what you approved before it leaves. Kits are packed and labelled.",
    who: "SchoolSource",
    status: "Checked against your order and packed",
  },
  {
    title: "Dispatched",
    text: "Sent with our in-house delivery team or a transport partner, depending on the order and where your school is.",
    who: "SchoolSource",
    message: "Your order is on its way.",
  },
  {
    title: "Delivered with paperwork",
    text: "Delivered to your school with a GST invoice and a delivery challan.",
    who: "SchoolSource",
    message: "Delivered. The GST invoice and delivery challan are with your office.",
  },
  {
    title: "After delivery",
    text: "Anything that arrived damaged, short or wrong is replaced. Ask us any time to re-quote the same order next year.",
    who: "SchoolSource",
    message: "If anything arrived damaged, short or wrong, message us here and we will replace it.",
  },
];

const STEP_MS = 1900;
const last = stages.length - 1;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * An example order moving through every stage, with the WhatsApp updates the
 * school receives alongside. Plays once when scrolled into view and can be
 * paused; any stage can be picked by hand. With reduced motion it does not
 * play by itself and shows the finished order.
 */
export function OrderJourney() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const touched = useRef(false);
  const chat = useRef<HTMLOListElement>(null);
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -25% 0px");

  // Reduced motion: show the whole order straight away, never autoplay
  useEffect(() => {
    if (prefersReducedMotion()) {
      touched.current = true;
      setActive(last);
    }
  }, []);

  // Start once visible
  useEffect(() => {
    if (!inView || touched.current) return;
    touched.current = true;
    setPlaying(true);
  }, [inView]);

  // Advance while playing
  useEffect(() => {
    if (!playing) return;
    if (active >= last) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => setActive((a) => a + 1), STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, active]);

  // Pause when the tab is hidden, so nobody comes back to a finished demo
  useEffect(() => {
    function onVisibility() {
      if (document.hidden) setPlaying(false);
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Keep the newest update in view inside the chat panel (never scrolls the page)
  useEffect(() => {
    const list = chat.current;
    if (!list) return;
    list.scrollTo({ top: list.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [active]);

  function pick(i: number) {
    touched.current = true;
    setPlaying(false);
    setActive(i);
  }

  function toggle() {
    touched.current = true;
    if (playing) {
      setPlaying(false);
      return;
    }
    if (active >= last) setActive(0);
    setPlaying(true);
  }

  const finished = active >= last && !playing;
  const control = playing ? "Pause" : finished ? "Play again" : "Play";
  const shown = stages.slice(0, active + 1);

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Stages */}
      <div className="lg:col-span-7">
        <div className="flex items-center justify-between gap-4 border-b border-rule pb-4">
          <p className="text-sm text-ink-soft">
            Example order, stage{" "}
            <span className="tabular font-semibold text-ink">
              {active + 1} of {stages.length}
            </span>
          </p>
          <button
            type="button"
            onClick={toggle}
            aria-label={`${control} the example order`}
            className="btn inline-flex h-10 shrink-0 items-center gap-2 rounded-sm border border-ink/15 bg-white px-3.5 text-sm font-semibold text-ink hover:border-ink/40 hover:bg-paper-deep"
          >
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
              {playing ? (
                <path d="M4.5 3 V13 M11.5 3 V13" {...stroke} strokeWidth={2} />
              ) : finished ? (
                <g {...stroke}>
                  <path d="M13 8 A5 5 0 1 1 11.5 4.5" />
                  <path d="M13 2 V5 H10" />
                </g>
              ) : (
                <path d="M4.5 2.75 L13 8 L4.5 13.25 Z" fill="currentColor" />
              )}
            </svg>
            {control}
          </button>
        </div>

        <ol className="relative">
          {/* Track, filled as the order moves */}
          <span aria-hidden="true" className="absolute bottom-7 left-[0.4375rem] top-7 w-px bg-rule" />
          <span
            aria-hidden="true"
            className="absolute bottom-7 left-[0.4375rem] top-7 w-px origin-top bg-board transition-transform duration-500 ease-out"
            style={{ transform: `scaleY(${active / last})` }}
          />
          {stages.map((s, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <li key={s.title} className="relative border-b border-rule last:border-b-0">
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-current={current ? "step" : undefined}
                  aria-expanded={current}
                  className="group flex w-full items-start gap-5 py-4 text-left focus-visible:outline-offset-0"
                >
                  {/* Marker */}
                  <span className="relative z-10 mt-[0.3125rem] flex size-[0.9375rem] shrink-0 items-center justify-center rounded-full bg-paper">
                    <span
                      className={cn(
                        "block rounded-full transition-[background-color,box-shadow,transform] duration-200",
                        current
                          ? "size-[0.9375rem] bg-board shadow-[0_0_0_4px_var(--color-paper-deep)]"
                          : done
                            ? "size-2.5 bg-board"
                            : "size-2.5 border border-ink/30 bg-paper group-hover:border-ink/60",
                      )}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-4">
                      <span
                        className={cn(
                          "font-semibold transition-colors duration-150",
                          current ? "text-ink" : done ? "text-ink" : "text-ink-soft group-hover:text-ink",
                        )}
                      >
                        {s.title}
                      </span>
                      <span className="shrink-0 text-sm text-ink-soft">{s.who === "You" ? "Your school" : "SchoolSource"}</span>
                    </span>
                    {/* Detail opens for the current stage */}
                    <span
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                        current ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-[34rem] pt-1.5 text-[0.9375rem] text-ink-soft">{s.text}</span>
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
        <div className="overflow-hidden rounded-lg border border-rule bg-white lg:sticky lg:top-28">
          <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-full bg-board font-display text-[1.0625rem] font-semibold text-white"
            >
              S
            </span>
            <span className="min-w-0">
              <span className="block font-semibold leading-tight">SchoolSource</span>
              <span className="block text-[0.8125rem] text-ink-soft">Order updates on WhatsApp</span>
            </span>
          </div>
          <ol
            ref={chat}
            aria-live="polite"
            aria-label="WhatsApp updates for the example order"
            className="grid h-[15rem] content-start gap-2.5 overflow-y-auto bg-paper-deep p-4 sm:h-[22rem]"
          >
            {shown.map((s, i) =>
              s.message ? (
                <li
                  key={s.title}
                  className="animate-rise-in max-w-[85%] rounded-md rounded-tl-[3px] border border-rule bg-white px-3 py-2 text-[0.9375rem] leading-snug [animation-duration:0.3s]"
                >
                  {s.message}
                  <span className="tabular mt-1 block text-right text-[0.75rem] text-ink-soft">Stage {i + 1}</span>
                </li>
              ) : (
                <li
                  key={s.title}
                  className="animate-rise-in flex items-center gap-3 py-1 text-[0.8125rem] text-ink-soft [animation-duration:0.3s]"
                >
                  <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
                  {s.status}
                  <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
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
