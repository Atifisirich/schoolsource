import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { QuickQuoteForm } from "@/components/quote/QuickQuoteForm";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call or WhatsApp ${site.phoneDisplay}, or email ${site.email}. ${site.name}, ${site.addressShort}, supplies schools in Hyderabad and other states.`,
  alternates: { canonical: "/contact" },
};

const mapQuery = encodeURIComponent(site.address);
const mapEmbed = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

const channels = [
  {
    label: "Phone",
    value: site.phoneDisplay,
    href: site.phoneHref,
    note: "For orders, deliveries and quotations.",
    external: false,
  },
  {
    label: "WhatsApp",
    value: site.phoneDisplay,
    href: whatsappLink("Hello SchoolSource, "),
    note: "Send your list as text, a photo or a PDF.",
    external: true,
  },
  {
    label: "Email",
    value: site.email,
    href: site.emailHref,
    note: "Attach your requirement list or tender documents.",
    external: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        title="Contact us"
        intro={
          <p>
            Call, message or email. The quickest way to a quotation is to send your list on WhatsApp, as a photo, a PDF
            or typed out.
          </p>
        }
      />

      <Section aria-label="Ways to reach us">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          {/* Channels */}
          <div className="lg:col-span-6">
            <h2 className="text-h3">Call, message or email</h2>
            <p className="mt-2 text-ink-soft">The same number works for calls and WhatsApp.</p>
            <ul className="mt-6 border-t border-ink/15">
              {channels.map((c) => (
                <li key={c.label} className="border-b border-ink/15">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group -mx-3 grid gap-1 rounded-sm px-3 py-5 transition-colors duration-150 hover:bg-paper-deep active:bg-rule sm:grid-cols-[7rem_1fr] sm:gap-6"
                  >
                    <span className="pt-1 text-sm text-ink-soft sm:pt-2">{c.label}</span>
                    <span>
                      <span className="block break-words font-display text-[clamp(1.5rem,1.25rem+1vw,2rem)] font-semibold leading-tight text-ink underline decoration-ink/20 decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-150 group-hover:decoration-board group-hover:decoration-2">
                        {c.value}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] text-ink-soft">{c.note}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-b border-ink/15">
                <div className="grid gap-1 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                  <span className="text-sm text-ink-soft sm:pt-0.5">Office hours</span>
                  <span className="font-semibold">
                    <Pending label="HOURS" />
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-6" id="enquiry">
            <h2 className="text-h3">Send us a short message</h2>
            <p className="mt-2 max-w-[52ch] text-ink-soft">
              A few lines are enough to start. For a full list with quantities or a file, use the{" "}
              <a href="/quote" className="link font-semibold text-ink">
                quote form
              </a>
              .
            </p>
            <div className="mt-6">
              <QuickQuoteForm source="Contact page" messageLabel="Your message" />
            </div>
          </div>
        </div>
      </Section>

      {/* Office and map */}
      <Section tone="muted" aria-labelledby="office-title">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="office-title" className="text-h2">
              Our office
            </h2>
            <address className="mt-5 max-w-xs text-lead not-italic">{site.address}</address>
            <div className="mt-6">
              <Button href={mapLink} variant="secondary">
                Open in Google Maps
              </Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-rule bg-white sm:aspect-[16/9]">
              {/* Shows only if the map cannot load; the iframe covers it otherwise */}
              <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-[0.9375rem] text-ink-soft">
                The map could not load here. Use &ldquo;Open in Google Maps&rdquo; for directions.
              </p>
              <iframe
                title={`Map showing the ${site.name} office: ${site.address}`}
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Book a visit with samples */}
      <Section aria-labelledby="visit-title">
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-12">
          <Photo
            src="/images/photos/kit-term-start-classroom.jpg"
            alt="Notebooks and coloured paper laid out on a table"
            className="aspect-[3/2] rounded-lg lg:col-span-6"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
          <div className="lg:col-span-6">
            <h2 id="visit-title" className="text-h2">
              Book a visit with samples
            </h2>
            <p className="mt-4 max-w-[52ch] text-lead text-ink-soft">
              Tell us what you are considering and we will bring samples to your school, at a time that suits you. You
              can check quality and sizes before you order.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/quote?topic=visit#visit" size="lg">
                Book a visit
              </Button>
              <Button
                href={whatsappLink("Hello SchoolSource, we would like a visit with product samples.")}
                variant="secondary"
                size="lg"
                icon={<WhatsAppIcon />}
              >
                Ask on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
