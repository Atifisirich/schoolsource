"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/layout/Logo";
import { Hero3D } from "@/components/three/Hero3D";
import { STAMP_CONTACT, waitFor3D } from "@/components/three/constants";
import { Stamp } from "@/components/ui/Stamp";
import { cn } from "@/lib/cn";

// An example requirement list. Illustrative only: no prices, no client names.
const lines = [
  { hand: "40 registers", item: "Registers", qty: "40 nos" },
  { hand: "2 boxes chalk", item: "Chalk", qty: "2 boxes" },
  { hand: "10 dusters", item: "Board dusters", qty: "10 nos" },
  { hand: "Trophies for sports day", item: "Trophies, sports day", qty: "As listed" },
  { hand: "500 answer booklets", item: "Answer booklets", qty: "500 nos" },
];

type Gsap = typeof import("gsap").gsap;
type Timeline = ReturnType<Gsap["timeline"]>;

/**
 * Signature hero: a handwritten requirement list is ticked off line by line;
 * each line slides across and lands as a typed row in an itemised quotation,
 * then the SchoolSource stamp presses on. Plays once (about 4.5s), then rests.
 *
 * Elements marked data-l2q-hide are hidden by CSS before first paint (see
 * globals.css) and revealed by the timeline. With reduced motion, or without
 * JavaScript, the finished quotation is shown as a still.
 */
export function ListToQuotation({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<Gsap | null>(null);
  const tlRef = useRef<Timeline | null>(null);
  const [animated, setAnimated] = useState(false);

  const build = useCallback(() => {
    const gsap = gsapRef.current;
    const el = root.current;
    if (!gsap || !el) return;

    tlRef.current?.kill();
    el.querySelectorAll("[data-l2q-ghost]").forEach((g) => g.remove());

    const q = <T extends Element = HTMLElement>(sel: string) => Array.from(el.querySelectorAll<T & HTMLElement>(sel));
    const ticks = q("[data-l2q-tick]");
    const handLines = q("[data-l2q-hand]");
    const rows = q("[data-l2q-row]");
    const rowItems = q("[data-l2q-item]");
    const foot = q("[data-l2q-foot]");
    const stamp = q("[data-l2q-stamp]");
    const sheet = q("[data-l2q-sheet]");

    // Starting state
    gsap.set([...ticks, ...rows, ...foot, ...stamp], { opacity: 0 });
    gsap.set(q("[data-l2q-char]"), { opacity: 0 });
    gsap.set(handLines, { opacity: 1 });
    el.classList.add("is-ready");

    const box = el.getBoundingClientRect();
    const tl = gsap.timeline({ delay: 0.35, defaults: { ease: "power2.out" } });
    const step = 0.62;
    // With the 3D layer running, a real stamp presses on and the objects get packed
    const with3D = el.dataset.threeD === "on";
    const signal = (name: string) => {
      el.dispatchEvent(new Event(name));
    };
    tl.call(signal, ["l2q:play"], 0);

    handLines.forEach((hand, i) => {
      const t = i * step;
      const src = hand.getBoundingClientRect();
      const dst = rowItems[i].getBoundingClientRect();

      // A copy of the handwritten line that travels to the quotation
      const ghost = document.createElement("span");
      ghost.dataset.l2qGhost = "";
      ghost.setAttribute("aria-hidden", "true");
      ghost.textContent = hand.textContent;
      ghost.className = "pointer-events-none absolute z-20 whitespace-nowrap font-hand text-ink";
      Object.assign(ghost.style, {
        left: `${src.left - box.left}px`,
        top: `${src.top - box.top}px`,
        fontSize: getComputedStyle(hand).fontSize,
        lineHeight: getComputedStyle(hand).lineHeight,
        opacity: "0",
      });
      el.appendChild(ghost);

      tl.fromTo(ticks[i], { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.22, ease: "back.out(3)" }, t)
        .to(hand, { opacity: 0.45, duration: 0.25 }, t + 0.1)
        .fromTo(
          ghost,
          { opacity: 0.95, x: 0, y: 0, scale: 1 },
          {
            x: dst.left - src.left,
            y: dst.top - src.top + (dst.height - src.height) / 2,
            scale: 0.82,
            duration: 0.5,
            ease: "power2.inOut",
            // Stay hidden until this line's turn
            immediateRender: false,
          },
          t + 0.12,
        )
        .to(ghost, { opacity: 0, duration: 0.14 }, t + 0.5)
        .to(rows[i], { opacity: 1, duration: 0.15 }, t + 0.48)
        .to(rows[i].querySelectorAll("[data-l2q-char]"), { opacity: 1, duration: 0.01, stagger: 0.014 }, t + 0.5);
    });

    const end = lines.length * step + 0.35;
    tl.to(foot, { opacity: 1, duration: 0.3 }, end);

    if (with3D) {
      // The 3D stamp lands STAMP_CONTACT seconds after the signal and leaves its ink behind
      const contact = end + 0.2 + STAMP_CONTACT;
      tl.call(signal, ["l2q:stamp"], end + 0.2)
        .set(stamp, { opacity: 1, scale: 1, rotate: 0, y: 0 }, contact)
        .fromTo(sheet, { y: 0 }, { y: 3, duration: 0.07, yoyo: true, repeat: 1, ease: "power1.out" }, contact)
        .call(signal, ["l2q:done"], contact + 0.55);
    } else {
      tl.fromTo(
        stamp,
        { opacity: 0, scale: 1.9, rotate: -24, y: -30 },
        { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 0.42, ease: "back.out(2.4)" },
        end + 0.2,
      )
        // The sheet takes the weight of the stamp
        .fromTo(sheet, { y: 0 }, { y: 3, duration: 0.07, yoyo: true, repeat: 1, ease: "power1.out" }, end + 0.48);
    }

    tlRef.current = tl;
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let cancelled = false;
    let io: IntersectionObserver | undefined;
    import("gsap").then(({ gsap }) => {
      if (cancelled || !root.current) return;
      gsapRef.current = gsap;
      root.current.classList.add("is-armed");
      setAnimated(true);
      // Start once the sheets are on screen (on phones they sit below the fold),
      // and after the handwriting font loads so travelling copies match their lines
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          Promise.all([document.fonts.ready, waitFor3D(root.current!)]).then(() => !cancelled && build());
        },
        { threshold: 0.35 },
      );
      io.observe(root.current);
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      tlRef.current?.kill();
    };
  }, [build]);

  return (
    <div ref={root} className={cn("l2q group/l2q relative", className)}>
      <Hero3D container={root} />
      <div className="grid gap-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-start">
        {/* Requirement list, handwritten on ruled paper */}
        <figure
          data-l2q-list
          className="ruled ruled-margin relative -rotate-[1.25deg] rounded-sm border border-ink/10 pb-6 pl-12 pr-4 pt-4 shadow-[0_1px_0_rgb(27_36_51/0.12)] [--margin-left:2rem]"
          aria-label="Example requirement list from a school"
        >
          <figcaption className="font-hand text-[1.0625rem] leading-8 text-ink-soft">For next term -</figcaption>
          <ul className="font-hand text-[1.25rem] leading-8 text-ink">
            {lines.map((line) => (
              <li key={line.hand} className="relative">
                <svg
                  data-l2q-tick
                  data-l2q-hide
                  viewBox="0 0 24 24"
                  className="absolute -left-8 top-1.5 size-5 text-red"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 13 L9.5 18 L20 5.5" />
                </svg>
                <span data-l2q-hand>{line.hand}</span>
              </li>
            ))}
          </ul>
        </figure>

        {/* Itemised quotation */}
        <figure
          data-l2q-sheet
          className="relative rounded-sm border border-ink/10 bg-white shadow-card px-4 pb-5 pt-4 shadow-[0_1px_0_rgb(27_36_51/0.12)] sm:mt-6"
          aria-label="Example itemised quotation returned by SchoolSource"
        >
          <div className="flex items-start justify-between gap-3 border-b-2 border-ink pb-3">
            <div className="flex items-center gap-2">
              <LogoMark className="size-6" />
              <span className="font-display text-base leading-none">SchoolSource</span>
            </div>
            <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em]">Quotation</span>
          </div>

          <table className="mt-2 w-full text-left text-[0.875rem]">
            <thead>
              <tr className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-soft">
                <th scope="col" className="w-7 py-1.5 font-medium">No.</th>
                <th scope="col" className="py-1.5 font-medium">Item</th>
                <th scope="col" className="py-1.5 text-right font-medium">Qty</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, i) => (
                <tr key={line.item} data-l2q-row data-l2q-hide className="border-t border-rule/70">
                  <td className="py-[0.4rem] font-mono text-[0.75rem] text-ink-soft">{String(i + 1).padStart(2, "0")}</td>
                  <td className="py-[0.4rem]">
                    <span data-l2q-item className="inline-block">
                      <span className="sr-only">{line.item}</span>
                      <span aria-hidden="true">
                        {Array.from(line.item).map((ch, j) => (
                          <span key={j} data-l2q-char>
                            {ch}
                          </span>
                        ))}
                      </span>
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-[0.4rem] text-right font-mono text-[0.75rem]">{line.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p
            data-l2q-foot
            data-l2q-hide
            className="mt-3 border-t border-ink/15 pt-3 pr-20 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.08em] text-ink-soft"
          >
            GST invoice &middot; Delivery challan &middot; Scheduled delivery
          </p>

          <div data-l2q-stamp data-l2q-hide className="absolute -bottom-5 right-1 w-24 sm:-right-4 sm:w-28">
            <Stamp rotate={-11} centre="QUOTED" />
          </div>
        </figure>
      </div>

      {animated ? (
        <button
          type="button"
          onClick={build}
          className="mt-6 inline-flex h-9 items-center gap-2 rounded-sm px-2 font-mono text-label uppercase text-ink-soft transition-colors duration-150 hover:bg-paper-deep hover:text-ink"
        >
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 8 A5.5 5.5 0 1 0 4.2 4" />
            <path d="M2 1.8 V4.6 H4.8" />
          </svg>
          Replay
          <span className="sr-only"> the list to quotation animation</span>
        </button>
      ) : null}
    </div>
  );
}
