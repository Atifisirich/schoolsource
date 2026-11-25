import type { Metadata } from "next";
import Link from "next/link";
import { ProductsExplorer, type ExplorerCard, type SearchItem } from "@/components/products/ProductsExplorer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/PageHeader";
import { PencilUnderline } from "@/components/ui/PencilUnderline";
import { bands, categories, countItems, kits } from "@/data/catalogue";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Search 300+ school supplies across fifteen categories, from stationery and printing to labs, furniture and electricals. Every item quoted on request.",
};

const cards: ExplorerCard[] = categories.map((c) => ({
  number: c.number,
  slug: c.slug,
  name: c.name,
  description: c.description,
  band: c.band,
  itemCount: countItems(c),
  image: c.image,
  subcategories: c.subcategories.map((s) => ({ slug: s.slug, name: s.name, count: s.items.length })),
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
  const stats = [
    { value: categories.length, label: "categories" },
    { value: searchItems.length, label: "items" },
    { value: kits.length, label: "ready kits" },
  ];

  return (
    <>
      <header className="hero-glow relative overflow-hidden border-b border-ink/10 bg-white">
        <Container className="grid gap-8 pb-10 pt-8 sm:pt-10 lg:grid-cols-12 lg:items-end lg:pb-12">
          <div className="lg:col-span-7">
            <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Products" }]} className="animate-rise-in" />
            <h1 className="animate-rise-in mt-6 text-h1" style={{ animationDelay: "60ms" }}>
              Find anything your school <PencilUnderline delay={250}>buys</PencilUnderline>
            </h1>
            <p className="animate-rise-in mt-4 max-w-xl text-lead text-ink-soft" style={{ animationDelay: "120ms" }}>
              Search by item, or open a category to see everything inside. Add what you need to your quote list and
              send it in one go.
            </p>
            <p className="animate-rise-in mt-4 text-sm" style={{ animationDelay: "160ms" }}>
              Prefer paper?{" "}
              <Link href="/catalogue" className="font-semibold text-board underline decoration-rule underline-offset-4 hover:decoration-board">
                Print the full catalogue or save it as a PDF
              </Link>
            </p>
          </div>
          <dl className="animate-rise-in grid grid-cols-3 divide-x divide-ink/12 rounded-md border border-ink/12 bg-paper lg:col-span-5" style={{ animationDelay: "180ms" }}>
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-4 text-center sm:px-6">
                <dd className="font-display text-[2rem] leading-none text-board sm:text-[2.5rem]">{s.value}</dd>
                <dt className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-soft">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      <ProductsExplorer bands={bands} categories={cards} items={searchItems} />

      <section className="on-dark bg-board py-14" aria-labelledby="products-cta">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="products-cta" className="text-h3 text-white">Have a list already?</h2>
            <p className="mt-2 text-paper/90">Send it as it is. We return an itemised quotation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/quote" variant="accent">Request a Quote</Button>
            <Button href="/kits" variant="inverse">See school kits</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
