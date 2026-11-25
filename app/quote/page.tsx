import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { categories } from "@/data/catalogue";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Send your school's requirement list and receive an itemised quotation. Add items from your quote list, attach a photo of your list, or send it on WhatsApp.",
  alternates: { canonical: "/quote" },
};

const nextSteps = [
  "We read your list and check quantities.",
  "You receive an itemised quotation to review.",
  "You approve it and we schedule delivery.",
];

export default function QuotePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Request a quote" }]}
        title="Request a quote"
        intro={<p>Tell us who you are and what your school needs. We reply with an itemised quotation.</p>}
        actions={
          <Button
            href={whatsappLink("Hello SchoolSource, here is our school's requirement list:")}
            variant="whatsapp"
            size="lg"
            className="lg:hidden"
          >
            Prefer WhatsApp? Send your list there
          </Button>
        }
      />

      <Container className="grid gap-12 pb-24 pt-4 lg:grid-cols-12 lg:gap-16 lg:pb-32">
        <div className="min-w-0 lg:col-span-7 xl:col-span-8">
          <QuoteForm categories={categories.map((c) => ({ slug: c.slug, name: c.name, number: c.number }))} />
        </div>

        <aside
          className="grid content-start gap-8 lg:col-span-5 xl:col-span-4"
          aria-label="WhatsApp, what happens next, and other ways to reach us"
        >
          <div className="lg:sticky lg:top-28 grid gap-8">
            <section aria-labelledby="wa-title" className="rounded-lg bg-sky p-6 sm:p-8">
              <h2 id="wa-title" className="text-h3">
                Prefer WhatsApp?
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                Send your list there, as text or a photo. It is the quickest way to reach us.
              </p>
              <Button
                href={whatsappLink("Hello SchoolSource, here is our school's requirement list:")}
                variant="whatsapp"
                size="lg"
                className="mt-6 w-full"
              >
                WhatsApp us
              </Button>
            </section>

            <section aria-labelledby="next-title">
              <h2 id="next-title" className="text-h3">
                What happens next
              </h2>
              <ol className="mt-4 grid gap-3 text-[1.0625rem] leading-snug">
                {nextSteps.map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="tabular mt-px flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-[0.9375rem] font-bold text-white"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </section>

            <p className="text-[1.0625rem] text-ink-soft">
              Rather talk? Call{" "}
              <a href={site.phoneHref} className="link tabular font-semibold text-ink">
                {site.phoneDisplay}
              </a>{" "}
              or email{" "}
              <a href={site.emailHref} className="link break-all font-semibold text-ink">
                {site.email}
              </a>
              .
            </p>
          </div>
        </aside>
      </Container>
    </>
  );
}
