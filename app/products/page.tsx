import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { ProductsExplorer, type ExplorerCard, type SearchItem } from "@/components/products/ProductsExplorer";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { bands, categories, countItems } from "@/data/catalogue";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Search 300+ school supplies across fifteen categories, from stationery and printing to labs, furniture and electricals. Every item quoted on request.",
};

const cards: ExplorerCard[] = categories.map((c) => ({
  slug: c.slug,
  name: c.name,
  description: c.description,
  band: c.band,
  image: c.image,
}));

const searchItems: SearchItem[] = categories.flatMap((c) =>
  c.subcategories.flatMap((s) =>
    s.items.map((item) => ({
      id: item.id,
      name: item.name,
      note: item.note,
      sub: s.name,
      subSlug: s.slug,
      cat: c.name,
      catSlug: c.slug,
    })),
  ),
);

const itemTotal = categories.reduce((n, c) => n + countItems(c), 0);

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Products" }]}
        title="Everything we supply, by category"
        intro={
          <>
            <p>
              {itemTotal} items across fifteen categories, each one quoted on request. Search for an item, or open a
              category to see everything in it, then add what you need to your quote list.
            </p>
            <p className="mt-3 text-base">
              Prefer paper?{" "}
              <Link href="/catalogue" className="link font-semibold text-ink">
                Print the full catalogue
              </Link>{" "}
              or save it as a PDF for your purchase committee.
            </p>
          </>
        }
      />

      <ProductsExplorer bands={bands} categories={cards} items={searchItems} />

      <Section tone="muted" spacing="tight" aria-labelledby="products-cta">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 id="products-cta" className="text-h3">
              Have a list already?
            </h2>
            <p className="mt-2 text-ink-soft">
              Send it as it is, typed or photographed. We return an itemised quotation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/quote">Request a quote</Button>
            <Button
              href={whatsappLink("Hello SchoolSource, here is our list for a quotation:")}
              variant="secondary"
              icon={<WhatsAppIcon />}
            >
              Send it on WhatsApp
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
