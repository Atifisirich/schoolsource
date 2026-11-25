import type { Metadata } from "next";
import Link from "next/link";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PrintButton } from "@/components/ui/PrintButton";
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
 * printed, the site header, footer and buttons drop away (print:hidden) and
 * each band starts on a new page.
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
              Every category, group and item we supply. Print it or save it as a PDF to share with your purchase
              committee, then mark what you need and send it to us.
            </p>
          }
          aside={
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <PrintButton />
              <p className="max-w-xs text-sm text-ink-soft lg:text-right">
                In the print window, choose &ldquo;Save as PDF&rdquo; as the printer to download it.
              </p>
            </div>
          }
        />
      </div>

      {/* Printed title block */}
      <div className="hidden border-b-2 border-ink pb-4 print:block">
        <p className="font-display text-3xl">SchoolSource catalogue</p>
        <p className="mt-1 text-sm">
          {site.phoneDisplay} (phone and WhatsApp) &middot; {site.email} &middot; schoolsource.in
        </p>
        <p className="mt-1 text-sm">
          {categories.length} categories, {itemTotal} items. No prices are listed: every item is quoted on request.
        </p>
      </div>

      <Container className="py-12 print:max-w-none print:px-0 print:py-4 lg:py-16">
        {/* Contents */}
        <nav aria-label="Catalogue contents" className="rounded-md border border-ink/12 bg-white p-6 sm:p-8 print:border-0 print:p-0">
          <h2 className="font-mono text-label uppercase text-ink-soft">Contents</h2>
          <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`} className="flex items-baseline gap-3 hover:text-board">
                  <span className="font-mono text-sm text-board">{c.number}</span>
                  <span className="font-semibold">{c.name}</span>
                  <span className="ml-auto font-mono text-[0.75rem] text-ink-soft">{countItems(c)}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {bands.map((band, b) => (
          <section
            key={band.id}
            aria-labelledby={`band-${band.id}`}
            className={b > 0 ? "mt-16 print:mt-0 print:break-before-page" : "mt-16 print:mt-6"}
          >
            <h2 id={`band-${band.id}`} className="flex items-baseline gap-3 border-b-2 border-ink pb-2">
              <span className="font-mono text-sm font-semibold text-board">Band {band.number}</span>
              <span className="font-display text-h3">{band.name}</span>
              <span className="ml-auto hidden text-sm text-ink-soft sm:inline">{band.note}</span>
            </h2>

            {categoriesInBand(band.id).map((c) => (
              <article key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-name`} className="scroll-mt-24 border-b border-rule py-8 print:py-5">
                <header className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="flex size-11 items-center justify-center rounded-sm bg-white print:hidden">
                    <CategoryIcon slug={c.slug} className="size-7 text-board" />
                  </span>
                  <h3 id={`${c.slug}-name`} className="text-h3">
                    <span className="mr-2 font-mono text-base text-board">{c.number}</span>
                    {c.name}
                  </h3>
                  <p className="text-ink-soft">{c.description}</p>
                  <Link
                    href={`/products/${c.slug}`}
                    className="ml-auto text-sm font-semibold underline decoration-rule underline-offset-4 hover:decoration-board print:hidden"
                  >
                    Open page
                  </Link>
                </header>
                <div className="mt-5 columns-1 gap-8 sm:columns-2 lg:columns-4 print:columns-3">
                  {c.subcategories.map((s) => (
                    <div key={s.slug} className="mb-5 break-inside-avoid">
                      <h4 className="font-mono text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-ink-soft">
                        {s.name}
                      </h4>
                      <ul className="mt-1.5 grid gap-1 text-[0.9375rem] print:text-[0.8125rem]">
                        {s.items.map((item) => (
                          <li key={item.id} className="flex gap-2">
                            {/* A tick box to mark on paper */}
                            <span aria-hidden="true" className="mt-[0.3em] size-3 shrink-0 rounded-[2px] border border-ink/40" />
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
        <section aria-labelledby="catalogue-kits" className="mt-16 print:mt-0 print:break-before-page">
          <h2 id="catalogue-kits" className="flex items-baseline gap-3 border-b-2 border-ink pb-2">
            <span className="font-mono text-sm font-semibold text-board">Kits</span>
            <span className="font-display text-h3">Ready-made school kits</span>
          </h2>
          <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 print:grid-cols-2">
            {kits.map((k) => (
              <li key={k.id} className="break-inside-avoid">
                <p className="font-semibold">{k.name}</p>
                <p className="font-mono text-[0.75rem] uppercase text-ink-soft">{k.basis}</p>
                <p className="mt-1 text-[0.9375rem] text-ink-soft print:text-[0.8125rem]">{k.contents.join(", ")}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 hidden border-t-2 border-ink pt-4 text-sm print:block">
          Mark the items you need and send the pages to us on WhatsApp at {site.phoneDisplay} or by email to{" "}
          {site.email}. We return an itemised quotation.
        </p>
      </Container>

      <section aria-labelledby="catalogue-cta" className="on-dark bg-board py-14 print:hidden">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="catalogue-cta" className="text-h3 text-white">Marked up a printout?</h2>
            <p className="mt-2 text-paper/90">Send a photo of the pages. We will turn it into an itemised quotation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              href={whatsappLink("Hello SchoolSource, here is our marked catalogue for a quotation:")}
              variant="accent"
              icon={<WhatsAppIcon />}
            >
              Send on WhatsApp
            </Button>
            <Button href="/quote" variant="inverse">Request a Quote</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
