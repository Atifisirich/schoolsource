import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppFloat";

/**
 * Fixed bar at the bottom of small screens (below md) with the site's two
 * actions. <body> carries .pb-action-bar so it never covers content.
 */
export function MobileActionBar() {
  return (
    <div
      role="region"
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm md:hidden print:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <Button href={site.whatsappHref} variant="secondary" icon={<WhatsAppIcon />} className="w-full px-3">
          WhatsApp us
        </Button>
        <Button href="/quote" className="w-full px-3">
          Request a quote
        </Button>
      </div>
    </div>
  );
}
