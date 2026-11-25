import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending } from "@/components/ui/Pending";
import { categories } from "@/data/catalogue";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Send your school's requirement list and receive an itemised quotation. Add items from your quote list, attach a photo of your list, or send it on WhatsApp.",
  alternates: { canonical: "/quote" },
};

// A real sequence, so the order matters; shown as plain text, not numerals
const nextSteps = [
  { title: "We read your list", text: "We check items, quantities and anything that needs a specification." },
  { title: "You receive a quotation", text: "Itemised, line by line, for you to review and approve." },
  { title: "We schedule delivery", text: "With a GST invoice and delivery challan." },
];

export default function QuotePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Request a quote" }]}
        title="Request a quote"
        intro={
          <p>
            Tell us about your school and what you need. Use your quote list, type your requirement, or attach a photo
            of your list. We reply with an itemised quotation.
          </p>
        }
        aside={
          <div className="grid gap-3 lg:w-80">
            <p className="text-[0.9375rem] text-ink-soft">Have your list on paper? Send a photo of it instead.</p>
            <Button
              href={whatsappLink("Hello SchoolSource, here is our school's requirement list:")}
              variant="secondary"
              size="lg"
              icon={<WhatsAppIcon />}
              className="w-full"
            >
              Send your list on WhatsApp
            </Button>
          </div>
        }
      />

      <Container className="grid gap-14 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
        <div className="min-w-0 lg:col-span-8">
          <QuoteForm categories={categories.map((c) => ({ slug: c.slug, name: c.name, number: c.number }))} />
        </div>

        <aside className="lg:col-span-4" aria-label="What happens next, and other ways to reach us">
          <div className="grid gap-10 lg:sticky lg:top-28">
            <section aria-labelledby="next-title">
              <h2 id="next-title" className="text-h3">
                What happens next
              </h2>
              <ol className="mt-4 border-t border-ink/15">
                {nextSteps.map((s) => (
                  <li key={s.title} className="border-b border-ink/15 py-4">
                    <p className="font-semibold">{s.title}</p>
                    <p className="mt-0.5 text-[0.9375rem] text-ink-soft">{s.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="talk-title" className="card p-5 sm:p-6">
              <h2 id="talk-title" className="text-h3">
                Prefer to talk?
              </h2>
              <dl className="mt-4 grid gap-4 text-[0.9375rem]">
                <div>
                  <dt className="text-sm text-ink-soft">Call</dt>
                  <dd>
                    <a href={site.phoneHref} className="link tabular text-lg font-semibold">
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-ink-soft">Email</dt>
                  <dd>
                    <a href={site.emailHref} className="link break-all text-lg font-semibold">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-ink-soft">Office hours</dt>
                  <dd className="mt-0.5">
                    <Pending label="HOURS" />
                  </dd>
                </div>
              </dl>
            </section>
          </div>
        </aside>
      </Container>
    </>
  );
}
