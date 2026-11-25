import type { Metadata } from "next";
import { ProductsExplorer, type ExplorerCard, type SearchItem } from "@/components/products/ProductsExplorer";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { bands, categories } from "@/data/catalogue";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Everything a school buys, in fifteen categories: stationery, uniforms, labs, furniture and more. Every item quoted on request.",
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

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Products" }]}
        title="Everything we supply"
        intro={<p>Open a category, add what you need to your quote, and we send one quotation for all of it.</p>}
        actions={
          <>
            <Button href="/quote">Request a quote</Button>
            <Button href={whatsappLink("Hello SchoolSource, we need a quotation for our school.")} variant="whatsapp">
              WhatsApp us
            </Button>
          </>
        }
      />
      <ProductsExplorer bands={bands} categories={cards} items={searchItems} />
    </>
  );
}
