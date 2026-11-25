import { site } from "@/lib/site";

/** WhatsApp glyph drawn in the site's line style (speech bubble with a handset). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.6 20.4 L4.9 16.4 A8.6 8.6 0 1 1 8 19.3 Z" />
      <path d="M9 8.2 C9.4 7.7 10.1 7.7 10.4 8.3 L11 9.6 C11.2 10 11 10.4 10.7 10.7 L10.4 11 C10.9 12.1 11.9 13.1 13 13.6 L13.3 13.3 C13.6 13 14 12.8 14.4 13 L15.7 13.6 C16.3 13.9 16.3 14.6 15.8 15 C15 15.8 13.9 16 12.8 15.5 C10.8 14.6 9.4 13.2 8.5 11.2 C8 10.1 8.2 9 9 8.2 Z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-4 right-4 z-30 inline-flex print:hidden h-14 items-center gap-2.5 rounded-full bg-board pl-4 pr-4 text-white shadow-[0_2px_0_rgb(27_36_51/0.35)] transition-transform duration-200 ease-out-quart hover:-translate-y-0.5 sm:bottom-6 sm:right-6 sm:pr-5"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="sr-only sm:not-sr-only sm:text-[0.9375rem] sm:font-semibold">WhatsApp us</span>
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
