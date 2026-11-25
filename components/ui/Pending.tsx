import { cn } from "@/lib/cn";
import { placeholderVisible } from "@/lib/site";

/**
 * True while unconfirmed facts are shown. Use it to hide a whole sentence or
 * list item that depends on a missing fact:
 *   {showPending ? <li>Payment terms: <Pending label="PAYMENT TERMS" /></li> : null}
 * Controlled by NEXT_PUBLIC_SHOW_PENDING (anything but "false" shows them).
 */
export const showPending = placeholderVisible;

type PendingProps = {
  /** The missing fact, without brackets: "PAYMENT TERMS". "[PAYMENT TERMS]" also works. */
  label: string;
  className?: string;
};

/**
 * A missing fact, e.g. <Pending label="PAYMENT TERMS" /> renders [PAYMENT TERMS]
 * on a light orange background. Renders nothing once placeholders are switched off.
 */
export function Pending({ label, className }: PendingProps) {
  if (!showPending) return null;
  const text = label.startsWith("[") ? label : `[${label}]`;
  return (
    <span
      className={cn(
        "inline-block rounded-[4px] bg-pencil-soft px-1.5 font-sans text-[0.85em] font-semibold leading-normal tracking-normal text-ink normal-case",
        className,
      )}
    >
      {text}
    </span>
  );
}
