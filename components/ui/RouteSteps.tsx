import { cn } from "@/lib/cn";
import { withPlaceholders } from "./Placeholder";

export type RouteStep = { title: string; text: string };

const columns = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/**
 * Numbered steps joined by a dotted route line: across on desktop, down on
 * mobile. The line draws in with the scroll (see ScrollReveal: data-route).
 * Text may contain placeholders such as [PAYMENT TERMS].
 */
export function RouteSteps({ steps, className }: { steps: RouteStep[]; className?: string }) {
  const cols = columns[steps.length as keyof typeof columns] ?? "lg:grid-cols-4";
  return (
    <ol className={cn("grid gap-0 lg:gap-8", cols, className)} data-route-group>
      {steps.map((s, i) => (
        <li key={s.title} data-reveal className="relative grid grid-cols-[3rem_1fr] gap-x-4 pb-10 last:pb-0 lg:block lg:pb-0">
          {i < steps.length - 1 ? (
            <span
              aria-hidden="true"
              data-route
              className="absolute bottom-0 left-[1.4rem] top-12 border-l-2 border-dotted border-board/60 lg:bottom-auto lg:left-12 lg:right-[-2rem] lg:top-6 lg:border-l-0 lg:border-t-2"
            />
          ) : null}
          <span className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-board bg-paper font-mono text-sm font-semibold text-board">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="lg:mt-6 lg:pr-4">
            <h3 className="font-sans text-lg font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-ink-soft">{withPlaceholders(s.text)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
