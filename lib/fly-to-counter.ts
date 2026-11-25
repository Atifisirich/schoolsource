"use client";

/**
 * Shrinks a small label from `from` and flies it in an arc into the header's
 * Quote List counter. Resolves when it lands (immediately with reduced motion
 * or when the counter is not on screen). Transform and opacity only.
 */
export function flyToCounter(from: Element, label: string): Promise<void> {
  const target = document.getElementById("quote-list-counter");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!target || reduce || typeof document.body.animate !== "function") return Promise.resolve();

  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  if (b.width === 0) return Promise.resolve();

  const x0 = a.left + a.width / 2;
  const y0 = a.top + a.height / 2;
  const x1 = b.left + b.width / 2;
  const y1 = b.top + b.height / 2;
  const peak = Math.min(y0, y1) - 70;

  const chip = document.createElement("div");
  chip.setAttribute("aria-hidden", "true");
  chip.textContent = label;
  chip.className =
    "pointer-events-none fixed left-0 top-0 z-[60] max-w-56 truncate rounded-sm bg-board px-3 py-1.5 text-sm font-semibold text-white shadow-[0_2px_0_rgb(27_36_51/0.3)]";
  document.body.appendChild(chip);

  const at = (x: number, y: number, s: number) => `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${s})`;
  const anim = chip.animate(
    [
      { transform: at(x0, y0, 1), opacity: 1 },
      { transform: at((x0 + x1) / 2, peak, 0.7), opacity: 1, offset: 0.55 },
      { transform: at(x1, y1, 0.15), opacity: 0.4 },
    ],
    { duration: 700, easing: "cubic-bezier(0.45, 0, 0.55, 1)", fill: "forwards" },
  );

  return anim.finished.then(
    () => chip.remove(),
    () => chip.remove(),
  );
}
