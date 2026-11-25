import { cn } from "@/lib/cn";
import { Pending } from "./Pending";

/**
 * v1 name for a missing fact, e.g. <Placeholder>[ADDRESS]</Placeholder>.
 * Now a thin wrapper around <Pending>, so it follows NEXT_PUBLIC_SHOW_PENDING.
 * New code should use <Pending label="ADDRESS" />.
 */
export function Placeholder({ children, className }: { children: string; className?: string }) {
  // A fact that has since been confirmed (e.g. site.address) renders as plain text
  if (!/^\[[A-Z ]+\]$/.test(children)) return <>{children}</>;
  return <Pending label={children} className={className} />;
}

/** Turns "[PAYMENT TERMS]"-style markers inside a string into <Pending> tokens. */
export function withPlaceholders(text: string) {
  return text
    .split(/(\[[A-Z ]+\])/)
    .map((part, i) => (/^\[[A-Z ]+\]$/.test(part) ? <Pending key={i} label={part} /> : part));
}

/** Neutral block standing in for a photograph, labelled with what it should show. */
export function PhotoPlaceholder({
  description,
  className,
}: {
  description: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${description}`}
      className={cn("photo-placeholder flex items-end rounded-md border border-rule p-4 text-sm text-ink-soft", className)}
    >
      <span>Photo to come: {description}</span>
    </div>
  );
}
