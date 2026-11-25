import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * Fixed bar at the bottom of phones (below md) with the site's two actions.
 * <body> carries .pb-action-bar so it never covers content.
 */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-paper/95 px-3 pb-[calc(0.625rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md md:hidden print:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <Button href={site.whatsappHref} variant="whatsapp" className="!min-h-[52px] w-full !px-3 !text-base">
          WhatsApp us
        </Button>
        <Button href="/quote" className="!min-h-[52px] w-full !px-3 !text-base">
          Request a quote
        </Button>
      </div>
    </nav>
  );
}
