import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { Stamp } from "@/components/ui/Stamp";
import { categories } from "@/data/catalogue";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Send your school's requirement list and receive an itemised quotation. Add items from your quote list, attach a photo of your list, or send it on WhatsApp.",
};

const nextSteps = [
  { title: "We read your list", text: "We check items, quantities and anything that needs a specification." },
  { title: "You receive a quotation", text: "Itemised, line by line, for you to review and approve." },
  { title: "We schedule delivery", text: "With a GST invoice and delivery challan." },
];

export default function QuotePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Request a Quote" }]}
        title="Request a quote"
        intro={
          <p>
            Tell us about your school and what you need. Use your quote list, type your requirement, or attach a photo
            of your list. We return an itemised quotation.
          </p>
        }
      />

      <Container className="grid gap-12 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
        <div className="lg:col-span-8">
          <QuoteForm categories={categories.map((c) => ({ slug: c.slug, name: c.name, number: c.number }))} />
        </div>

        <aside className="lg:col-span-4" aria-label="Other ways to reach us">
          <div className="grid gap-6 lg:sticky lg:top-28">
            <div className="rounded-sm border border-ink/10 bg-white shadow-card p-6">
              <h2 className="font-display text-xl">Prefer to talk?</h2>
              <dl className="mt-4 grid gap-4 text-[0.9375rem]">
                <div>
                  <dt className="font-mono text-label uppercase text-ink-soft">Call</dt>
                  <dd className="mt-1">
                    <a href={site.phoneHref} className="font-semibold underline decoration-rule underline-offset-4 hover:decoration-board">
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-label uppercase text-ink-soft">WhatsApp</dt>
                  <dd className="mt-1">
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-semibold underline decoration-rule underline-offset-4 hover:decoration-board"
                    >
                      <WhatsAppIcon className="size-4" />
                      Message us
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-label uppercase text-ink-soft">Email</dt>
                  <dd className="mt-1">
                    <a href={site.emailHref} className="font-semibold underline decoration-rule underline-offset-4 hover:decoration-board">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-label uppercase text-ink-soft">Hours</dt>
                  <dd className="mt-1"><Placeholder>{site.hours}</Placeholder></dd>
                </div>
              </dl>
            </div>

            <div className="px-1">
              <h2 className="font-mono text-label uppercase text-ink-soft">What happens next</h2>
              <ol className="mt-4 grid gap-4">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-x-3">
                    <span className="font-mono text-sm font-semibold text-board">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="text-sm text-ink-soft">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Stamp className="mt-8 hidden w-32 lg:block" rotate={-8} centre="QUOTED" />
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
