import { cn } from "@/lib/cn";
import { withPlaceholders } from "./Placeholder";

export type RouteStep = { title: string; text: string };

const columns = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/**
 * Steps as plain text columns joined by a thin rule: across on desktop, down
 * on mobile. Small "Step 1" text, no numbered circles.
 * Text may contain placeholders such as [PAYMENT TERMS].
 */
export function RouteSteps({ steps, className }: { steps: RouteStep[]; className?: string }) {
  const cols = columns[steps.length as keyof typeof columns] ?? "lg:grid-cols-4";
  return (
    <ol className={cn("grid gap-8 lg:gap-0 lg:border-t lg:border-rule", cols, className)}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative border-l border-rule pl-5 lg:border-l-0 lg:pl-0 lg:pr-8 lg:pt-6">
          <span
            aria-hidden="true"
            className="absolute -left-[3.5px] top-1.5 size-1.5 rounded-full bg-board lg:-top-[3.5px] lg:left-0"
          />
          <p className="text-sm font-semibold text-board [.on-dark_&]:text-pencil">Step {i + 1}</p>
          <h3 className="mt-1.5 font-sans text-lg font-semibold tracking-normal">{s.title}</h3>
          <p className="mt-1.5 text-ink-soft [.on-dark_&]:text-paper/75">{withPlaceholders(s.text)}</p>
        </li>
      ))}
    </ol>
  );
}
