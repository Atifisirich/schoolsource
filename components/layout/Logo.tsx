import Link from "next/link";
import { cn } from "@/lib/cn";

/** Mark: two stacked register sheets with a ruled line and red margin. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("block", className)} aria-hidden="true">
      <rect x="7" y="3" width="21" height="25" rx="1.5" fill="var(--color-pencil)" />
      <rect x="3.5" y="6" width="21" height="23" rx="1.5" fill="var(--color-board)" />
      <path d="M8 6 V29" stroke="var(--color-red)" strokeWidth="1.25" />
      <path
        d="M11 13 H20.5 M11 17.5 H20.5 M11 22 H17"
        stroke="var(--color-paper)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="SchoolSource home"
    >
      <LogoMark className="size-8 shrink-0" />
      <span
        className={cn(
          "font-display text-[1.375rem] leading-none tracking-[-0.01em]",
          tone === "ink" ? "text-ink" : "text-paper",
        )}
      >
        School<span className={tone === "ink" ? "text-board" : "text-pencil"}>Source</span>
      </span>
    </Link>
  );
}
