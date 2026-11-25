import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrintButton } from "@/components/ui/PrintButton";
import { Section } from "@/components/ui/Section";
import { bands, categories, categoriesInBand, countItems, kits } from "@/data/catalogue";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "The full SchoolSource catalogue on one page: every category, group and item, ready to print or save as a PDF for your school's purchase committee.",
};

const itemTotal = categories.reduce((n, c) => n + countItems(c), 0);

/**
 * The whole catalogue on one printable page. On screen it reads as an index;
 * printed (A4), the site header, footer, photos and buttons drop away
 * (print:hidden) and each band starts on a new page.
 */
export default function CataloguePage() {
  return (
    <>
      <div className="print:hidden">
        <PageHeader
          crumbs={[{ href: "/", label: "Home" }, { href: "/products", label: "Products" }, { label: "Catalogue" }]}
          title="The full catalogue, on one page"
          intro={
            <p>
              Every category, group and item we supply: {itemTotal} items in all. Print it or save it as a PDF for
              your purchase committee, tick what you need and send the pages to us.
            </p>
          }
          aside={
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <PrintButton />
              <p className="max-w-xs text-sm text-ink-soft lg:text-right">
                To download it, choose &ldquo;Save as PDF&rdquo; as the printer.
              </p>
            </div>
          }
        />
      </div>

      {/* Printed title block */}
      <div className="hidden border-b-2 border-ink pb-3 print:block">
        <p className="font-display text-[22pt] font-semibold leading-tight">SchoolSource catalogue</p>
        <p className="mt-1 text-[9.5pt]">
          {site.phoneDisplay} (phone and WhatsApp), {site.email}, {site.domain}
        </p>
        <p className="mt-0.5 text-[9.5pt]">
          {categories.length} categories, {itemTotal} items. No prices are listed: every item is quoted on request.
        </p>
      </div>

      <Container className="py-12 print:max-w-none print:px-0 print:py-4 lg:py-16">
        {/* Contents, by band */}
        <nav aria-labelledby="contents-title" className="card p-6 sm:p-8 print:rounded-none print:border-0 print:p-0">
          <h2 id="contents-title" className="text-h3 print:text-[13pt]">
            Contents
          </h2>
          <div className="mt-5 grid gap-8 sm:grid-cols-3 print:mt-2 print:grid-cols-3 print:gap-6">
            {bands.map((band) => (
              <div key={band.id}>
                <p className="border-b border-rule pb-2 text-sm font-semibold print:text-[9pt]">{band.name}</p>
                <ul className="mt-2 grid gap-0.5">
                  {categoriesInBand(band.id).map((c) => (
                    <li key={c.slug}>
                      <a
                        href={`#${c.slug}`}
                        className="-mx-2 flex items-baseline justify-between gap-3 rounded-[4px] px-2 py-1 transition-colors duration-150 hover:bg-paper-deep hover:text-board print:py-0 print:text-[9pt]"
                      >
                        <span>{c.name}</span>
                        <span className="tabular text-sm text-ink-soft print:text-[8.5pt]">{countItems(c)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {bands.map((band, b) => (
          <section
            key={band.id}
            aria-labelledby={`band-${band.id}`}
            className={b > 0 ? "mt-20 print:mt-0 print:break-before-page" : "mt-20 print:mt-6"}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3 print:pb-1.5">
              <h2 id={`band-${band.id}`} className="text-h2 print:text-[16pt]">
                {band.name}
              </h2>
              <p className="text-ink-soft print:text-[9pt]">{band.note}</p>
            </div>

            {categoriesInBand(band.id).map((c) => (
              <article
                key={c.slug}
                id={c.slug}
                aria-labelledby={`${c.slug}-name`}
                className="scroll-mt-8 border-b border-rule py-10 last:border-b-0 print:py-4"
              >
                <header className="flex items-center gap-5 print:break-after-avoid">
                  {c.image ? (
                    <div className="relative hidden aspect-[3/2] w-28 shrink-0 overflow-hidden rounded-sm bg-paper-deep sm:block print:hidden">
                      <Image src={c.image} alt="" fill sizes="112px" className="object-cover" />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <h3 id={`${c.slug}-name`} className="text-h3 print:text-[12.5pt]">
                      {c.name}
                    </h3>
                    <p className="mt-0.5 text-ink-soft print:text-[9pt]">
                      {c.description}. <span className="tabular">{countItems(c)}</span> items.
                    </p>
                  </div>
                  <Link
                    href={`/products/${c.slug}`}
                    className="link hidden shrink-0 text-sm font-semibold text-board sm:inline print:hidden"
                  >
                    Open category page
                  </Link>
                </header>
                <div className="mt-6 columns-1 gap-10 sm:columns-2 lg:columns-4 print:mt-2.5 print:columns-3 print:gap-6">
                  {c.subcategories.map((s) => (
                    <div key={s.slug} className="mb-6 break-inside-avoid print:mb-2.5">
                      <h4 className="text-sm font-semibold print:text-[8.5pt]">{s.name}</h4>
                      <ul className="mt-2 grid gap-1 text-[0.9375rem] print:mt-1 print:gap-0.5 print:text-[8.5pt]">
                        {s.items.map((item) => (
                          <li key={item.id} className="flex gap-2.5 leading-snug">
                            {/* A tick box to mark on paper */}
                            <span
                              aria-hidden="true"
                              className="mt-[0.25em] size-3 shrink-0 rounded-[2px] border border-ink/35 print:size-2.5"
                            />
                            <span>
                              {item.name}
                              {item.note ? <span className="text-ink-soft"> ({item.note})</span> : null}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        ))}

        {/* Kits */}
        <section aria-labelledby="catalogue-kits" className="mt-20 print:mt-0 print:break-before-page">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3 print:pb-1.5">
            <h2 id="catalogue-kits" className="text-h2 print:text-[16pt]">
              Ready-made school kits
            </h2>
            <Link href="/kits" className="link text-sm font-semibold text-board print:hidden">
              See the kits page
            </Link>
          </div>
          <ul className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2 print:mt-4 print:grid-cols-2 print:gap-y-4">
            {kits.map((k) => (
              <li key={k.id} className="break-inside-avoid">
                <p className="flex gap-2.5 font-semibold print:text-[10pt]">
                  <span aria-hidden="true" className="mt-[0.3em] size-3 shrink-0 rounded-[2px] border border-ink/35 print:size-2.5" />
                  {k.name}
                </p>
                <p className="mt-0.5 pl-[1.375rem] text-sm text-ink-soft print:text-[8.5pt]">{k.basis}</p>
                <p className="mt-1.5 pl-[1.375rem] text-[0.9375rem] leading-relaxed print:mt-0.5 print:text-[8.5pt]">
                  {k.contents.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 hidden border-t-2 border-ink pt-3 text-[9.5pt] print:block">
          Tick the items you need and send the pages to us on WhatsApp at {site.phoneDisplay} or by email to{" "}
          {site.email}. We return an itemised quotation.
        </p>
      </Container>

      <div className="print:hidden">
        <Section tone="muted" spacing="tight" aria-labelledby="catalogue-cta">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 id="catalogue-cta" className="text-h3">
                Marked up a printout?
              </h2>
              <p className="mt-2 text-ink-soft">
                Send us a photo of the pages. We will turn it into an itemised quotation.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                href={whatsappLink("Hello SchoolSource, here is our marked catalogue for a quotation:")}
                icon={<WhatsAppIcon />}
              >
                Send on WhatsApp
              </Button>
              <Button href="/quote" variant="secondary">
                Request a quote
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
