import { cn } from "@/lib/cn";
import { withPlaceholders } from "./Placeholder";

export type RouteStep = { title: string; text: string };

const columns = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/**
 * Numbered steps as colour-field cards: a big display numeral, a short title
 * and one or two sentences. On a paper or cream ground the cards are cream /
 * white; on a blue section (.on-dark) they turn deep blue, the first one sky.
 * Text may contain placeholders such as [PAYMENT TERMS].
 */
export function RouteSteps({ steps, className }: { steps: RouteStep[]; className?: string }) {
  const cols = columns[steps.length as keyof typeof columns] ?? "lg:grid-cols-4";
  return (
    <ol className={cn("grid gap-3.5 sm:grid-cols-2", cols, className)}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={cn(
            "flex flex-col rounded-lg p-6 sm:min-h-72 lg:p-7",
            i === 0
              ? "bg-sky text-ink"
              : "bg-cream text-ink [.bg-cream_&]:bg-white [.on-dark_&]:bg-blue-deep [.on-dark_&]:text-white",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "font-display text-[clamp(3.5rem,2.5rem+3vw,5.5rem)] leading-[0.9]",
              i === 0 ? "text-blue" : "text-blue [.on-dark_&]:text-sky-2",
            )}
          >
            {i + 1}
          </span>
          <h3 className="mt-auto pt-7 text-h3 lg:flex lg:min-h-[calc(2.2em+1.75rem)] lg:items-end">
            <span className="sr-only">Step {i + 1}: </span>
            {s.title}
          </h3>
          <p className={cn("mt-3 text-[1.0625rem] lg:min-h-[4.6em]", i === 0 ? "text-ink-soft" : "text-ink-soft [.on-dark_&]:text-[#d7e3fb]")}>
            {withPlaceholders(s.text)}
          </p>
        </li>
      ))}
    </ol>
  );
}
