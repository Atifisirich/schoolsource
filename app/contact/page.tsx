import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { QuickQuoteForm } from "@/components/quote/QuickQuoteForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { Eyebrow } from "@/components/ui/Section";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call or WhatsApp ${site.phoneDisplay}, or email ${site.email}. SchoolSource supplies schools in Hyderabad.`,
};

const linkClass = "font-semibold underline decoration-rule decoration-2 underline-offset-4 hover:decoration-board";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        title="Contact SchoolSource"
        intro={<p>Call, message or email us. The quickest way to a quotation is to send your list on WhatsApp.</p>}
      />

      <Container className="py-12 lg:py-16">
        <ul className="grid gap-px overflow-hidden rounded-sm border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
          <li className="bg-white p-6" data-reveal>
            <Eyebrow>Phone</Eyebrow>
            <p className="mt-3 text-xl">
              <a href={site.phoneHref} className={linkClass}>{site.phoneDisplay}</a>
            </p>
            <p className="mt-2 text-sm text-ink-soft">For orders, deliveries and quotations.</p>
          </li>
          <li className="bg-white p-6" data-reveal>
            <Eyebrow>WhatsApp</Eyebrow>
            <p className="mt-3 text-xl">
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {site.phoneDisplay}
              </a>
            </p>
            <p className="mt-2 text-sm text-ink-soft">Send your list as text, a photo or a PDF.</p>
          </li>
          <li className="bg-white p-6" data-reveal>
            <Eyebrow>Email</Eyebrow>
            <p className="mt-3 text-xl">
              <a href={site.emailHref} className={linkClass}>{site.email}</a>
            </p>
            <p className="mt-2 text-sm text-ink-soft">Attach your requirement list or tender documents.</p>
          </li>
          <li className="bg-white p-6" data-reveal>
            <Eyebrow>Address</Eyebrow>
            <p className="mt-3 text-lg">
              <Placeholder>{site.address}</Placeholder>
              <br />
              {site.city}
            </p>
          </li>
          <li className="bg-white p-6" data-reveal>
            <Eyebrow>Hours</Eyebrow>
            <p className="mt-3 text-lg">
              <Placeholder>{site.hours}</Placeholder>
            </p>
          </li>
          <li className="flex flex-col justify-between gap-4 bg-board p-6 on-dark" data-reveal>
            <p className="font-display text-xl text-white">Have your list ready?</p>
            <Button href={whatsappLink("Hello SchoolSource, here is our school's requirement list:")} variant="accent" icon={<WhatsAppIcon />}>
              Send on WhatsApp
            </Button>
          </li>
        </ul>

        {/* Map is added once the address is confirmed */}
        <div
          role="img"
          aria-label="Map placeholder: the map will be added once the address is confirmed"
          className="photo-placeholder mt-6 flex h-48 items-center sm:aspect-[16/7] sm:h-auto justify-center rounded-sm border border-ink/10 p-6 text-center"
          data-reveal
        >
          <p className="font-mono text-label uppercase text-ink-soft">
            Map &middot; added once <span className="text-ink">[ADDRESS]</span> is confirmed
          </p>
        </div>
      </Container>

      <section aria-labelledby="message-title" className="border-t border-ink/10 bg-white py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <Eyebrow>Send a message</Eyebrow>
            <h2 id="message-title" className="mt-3 text-h2">Tell us what your school needs</h2>
            <p className="mt-4 max-w-md text-ink-soft">
              A short note is enough to start. For a full list with quantities or a file, use the{" "}
              <a href="/quote" className={linkClass}>quote form</a>.
            </p>
            <div className="mt-8 rounded-md border border-pencil/50 bg-pencil-soft/40 p-5">
              <p className="font-semibold">Want to see products first?</p>
              <p className="mt-1 text-[0.9375rem] text-ink-soft">
                We can visit your school with samples of what you are considering, at a time that suits you.
              </p>
              <div className="mt-4">
                <Button href="/quote?topic=visit#visit" variant="secondary" size="sm">Book a visit with samples</Button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <QuickQuoteForm source="Contact page" />
          </div>
        </Container>
      </section>
    </>
  );
}
