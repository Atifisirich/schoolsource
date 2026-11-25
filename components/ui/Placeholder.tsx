import { cn } from "@/lib/cn";

/**
 * Visible marker for information not yet confirmed, e.g. [ADDRESS].
 * Kept deliberately loud so nothing ships unnoticed.
 */
export function Placeholder({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm bg-pencil-soft px-1.5 font-mono text-[0.85em] font-medium text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Turns "[PAYMENT TERMS]"-style markers inside a string into visible placeholders. */
export function withPlaceholders(text: string) {
  return text
    .split(/(\[[A-Z ]+\])/)
    .map((part, i) => (/^\[[A-Z ]+\]$/.test(part) ? <Placeholder key={i}>{part}</Placeholder> : part));
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
      className={cn(
        "photo-placeholder flex items-end rounded-sm border border-ink/10 p-4 text-ink-soft",
        className,
      )}
    >
      <span className="font-mono text-label uppercase">[PHOTO: {description}]</span>
    </div>
  );
}
