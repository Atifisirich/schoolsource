import { cn } from "@/lib/cn";

export type BigStep = { title: string; text: React.ReactNode };

/**
 * Plain numbered steps, one per row: a big display numeral, a short title and
 * one sentence. Static, no interaction. Used for ordering and for a lab project.
 */
export function BigSteps({ steps, className }: { steps: BigStep[]; className?: string }) {
  return (
    <ol className={cn("border-t-2 border-ink", className)}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="grid grid-cols-[3.5rem_1fr] gap-x-5 border-b border-ink/15 py-8 sm:grid-cols-[6rem_1fr] sm:gap-x-8 md:py-10 lg:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1.1fr)] lg:items-baseline"
        >
          <span
            aria-hidden="true"
            className="font-display text-[clamp(2.75rem,2rem+4vw,5.5rem)] leading-[0.9] text-blue"
          >
            {i + 1}
          </span>
          <h3 className="text-h3 lg:text-[clamp(1.75rem,1.2rem+1.2vw,2.25rem)]">
            <span className="sr-only">Step {i + 1}: </span>
            {s.title}
          </h3>
          <p className="col-start-2 mt-3 max-w-xl text-lead text-ink-soft lg:col-start-3 lg:mt-0">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
