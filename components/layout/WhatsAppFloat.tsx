import { cn } from "@/lib/cn";
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

/**
 * Small round WhatsApp button, bottom right, from md up. Below md the
 * MobileActionBar takes its place.
 */
export function WhatsAppFloat({ className }: { className?: string }) {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      title="WhatsApp us"
      className={cn(
        "btn fixed bottom-6 right-6 z-30 hidden size-13 items-center justify-center rounded-full bg-board text-white",
        "shadow-[0_6px_16px_-6px_rgb(15_27_45/0.45)] hover:bg-board-deep md:inline-flex print:hidden",
        className,
      )}
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
