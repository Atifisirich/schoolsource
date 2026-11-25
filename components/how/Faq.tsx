export type FaqItem = { q: string; a: React.ReactNode };

/**
 * A plain accordion on native <details>: Tab to a question, Enter or Space to
 * open it. Large text, a plus that turns into a cross when open.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t-2 border-ink">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-ink/15">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.1875rem] font-semibold leading-snug transition-colors duration-150 hover:text-blue sm:text-[1.3125rem] [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-ink transition-[transform,background-color] duration-200 ease-out group-open:rotate-45 group-open:bg-sky"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M8 2.5V13.5M2.5 8H13.5" />
              </svg>
            </span>
          </summary>
          <p className="max-w-2xl pb-7 pr-12 text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
