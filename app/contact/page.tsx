import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { QuickQuoteForm } from "@/components/quote/QuickQuoteForm";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";
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

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const channels = [
  { label: "Call us", value: site.phoneDisplay, href: site.phoneHref, icon: <PhoneIcon />, external: false },
  { label: "WhatsApp us", value: site.phoneDisplay, href: whatsappLink("Hello SchoolSource, "), icon: <WhatsAppIcon className="size-6 shrink-0 text-wa" />, external: true },
  { label: "Email us", value: site.email, href: site.emailHref, icon: <MailIcon />, external: false },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        title="Talk to us"
        intro={<p>The quickest way to a quotation is to send your list on WhatsApp, as a photo, a PDF or typed out.</p>}
      />

      <Section aria-label="Ways to reach us" className="!pt-6">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
          <div>
            <h2 className="text-h3">Call, message or email</h2>
            <ul className="mt-6 grid gap-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex min-h-20 items-center gap-4 rounded-lg border-2 border-ink/15 bg-white px-5 py-4 transition-[border-color,transform] duration-150 hover:border-ink active:scale-[0.98]"
                  >
                    {c.icon}
                    <span className="min-w-0">
                      <span className="block text-[1.0625rem] text-ink-soft">{c.label}</span>
                      <span className="block break-words text-[1.25rem] font-bold sm:text-[1.5rem]">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[1.0625rem]">
              <span className="text-ink-soft">Office hours: </span>
              <span className="font-semibold">
                <Pending label="HOURS" />
              </span>
            </p>
          </div>

          <div id="enquiry">
            <h2 className="text-h3">Send us a short message</h2>
            <p className="mt-2 max-w-[34rem] text-[1.0625rem] text-ink-soft">
              A few lines are enough to start. For a full list with quantities, use the{" "}
              <a href="/quote" className="font-semibold text-ink underline underline-offset-4">
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
      <Section tone="sky" aria-labelledby="office-title">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="office-title" className="text-h2">
              Our office
            </h2>
            <address className="mt-5 max-w-sm text-lead not-italic">{site.address}</address>
            <div className="mt-6">
              <Button href={mapLink} variant="ghost">
                Open in Google Maps
              </Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white sm:aspect-[16/9]">
              <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-[1.0625rem] text-ink-soft">
                Loading the map. If it does not appear, use &ldquo;Open in Google Maps&rdquo;.
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
        <h2 id="visit-title" className="text-h2">
          Book a visit with samples
        </h2>
        <p className="mt-4 max-w-[36rem] text-lead text-ink-soft">
          Tell us what you are considering and we will bring samples to your school, at a time that suits you. You can
          check quality and sizes before you order.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/quote?topic=visit#visit" size="lg">
            Book a visit
          </Button>
          <Button href={whatsappLink("Hello SchoolSource, we would like a visit with product samples.")} variant="whatsapp" size="lg">
            WhatsApp us
          </Button>
        </div>
      </Section>
    </>
  );
}
