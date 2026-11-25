import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { site, whatsappLink } from "@/lib/site";

const listMessage = "Hello SchoolSource, I would like a quote for our school. Here is our list:";

/** Contact: the orange close, with the site's two actions. */
export function CloseSection() {
  return (
    <Section tone="orange" id="contact" aria-labelledby="close-title" className="!py-[clamp(5rem,9vw,8.5rem)]">
      <h2 id="close-title" className="max-w-[9em] text-[clamp(3.25rem,1.6rem+7vw,8.5rem)] leading-[0.94] tracking-[-0.02em]">
        Send us your&nbsp;list.
      </h2>
      <div className="mt-10 grid items-end gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
        <p className="max-w-[26em] text-[clamp(1.1875rem,1.05rem+0.5vw,1.4375rem)]">
          Typed, printed or handwritten. WhatsApp it to <strong className="whitespace-nowrap">{site.phoneDisplay}</strong>{" "}
          or use the quote form, and we reply with one quote for everything on it.
        </p>
        <div className="grid gap-4 lg:justify-items-end">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <Button href={whatsappLink(listMessage)} variant="whatsapp" icon={<WhatsAppIcon />}>
              WhatsApp us
            </Button>
            <Button href="/quote" variant="ghost">
              Request a quote
            </Button>
          </div>
          <a href={site.emailHref} className="tlink justify-self-start lg:justify-self-end">
            {site.email}
            <ArrowIcon />
          </a>
        </div>
      </div>
    </Section>
  );
}
