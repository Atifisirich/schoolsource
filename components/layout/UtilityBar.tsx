import { Container } from "@/components/ui/Container";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppFloat";

const linkClass = "inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-white";

/** Slim contact strip above the main navigation (scrolls away; the nav stays). */
export function UtilityBar() {
  return (
    <div className="on-dark hidden bg-ink text-[0.8125rem] text-paper/80 md:block print:hidden">
      <Container className="flex h-9 items-center justify-between gap-6">
        <p className="truncate">
          School supplies for Hyderabad schools &middot; GST invoices &middot; Scheduled delivery
        </p>
        <ul className="flex shrink-0 items-center gap-5">
          <li>
            <a href={site.phoneHref} className={linkClass}>
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5.5 2.5 L3.5 2.5 C3 2.5 2.5 3 2.5 3.6 C2.8 9 7 13.2 12.4 13.5 C13 13.5 13.5 13 13.5 12.5 L13.5 10.5 L10.8 9.5 L9.5 10.8 C8 10.1 5.9 8 5.2 6.5 L6.5 5.2 Z" />
              </svg>
              {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <WhatsAppIcon className="size-3.5" />
              WhatsApp
            </a>
          </li>
          <li className="hidden lg:block">
            <a href={site.emailHref} className={linkClass}>
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3.5" width="12" height="9" rx="1" />
                <path d="M2.5 4.5 L8 8.5 L13.5 4.5" />
              </svg>
              {site.email}
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
}
