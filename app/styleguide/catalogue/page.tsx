import type { Metadata } from "next";
import Link from "next/link";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { IndexTab } from "@/components/ui/IndexTab";
import { Eyebrow, Section } from "@/components/ui/Section";
import {
  bands,
  categories,
  categoriesInBand,
  clientSchools,
  countItems,
  getCategory,
  kits,
  placementRules,
} from "@/data/catalogue";

export const metadata: Metadata = {
  title: "Catalogue data",
  robots: { index: false, follow: false },
};

// Internal review page: everything in data/catalogue.ts, as the pages will read it.
export default function CatalogueReviewPage() {
  const totalItems = categories.reduce((n, c) => n + countItems(c), 0);

  return (
    <>
      <Section spacing="tight">
        <Eyebrow>Internal reference / data/catalogue.ts</Eyebrow>
        <h1 className="mt-4 text-h1">Catalogue data</h1>
        <p className="mt-4 max-w-2xl text-lead text-ink-soft">
          {categories.length} categories, {totalItems} items, {kits.length} school kits. Each item has exactly one
          home. Edit the data file to change anything here.
        </p>
        <nav aria-label="Jump to" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-label uppercase">
          <a href="#categories" className="underline decoration-rule underline-offset-4 hover:decoration-board">Categories</a>
          <a href="#kits" className="underline decoration-rule underline-offset-4 hover:decoration-board">Kits</a>
          <a href="#placement" className="underline decoration-rule underline-offset-4 hover:decoration-board">Placement rules</a>
          <a href="#clients" className="underline decoration-rule underline-offset-4 hover:decoration-board">Client schools</a>
        </nav>
      </Section>

      <Section id="categories" spacing="tight" aria-labelledby="categories-title">
        <h2 id="categories-title" className="sr-only">Categories</h2>
        <div className="grid gap-16">
          {bands.map((band) => (
            <div key={band.id}>
              <div className="flex flex-wrap items-baseline gap-x-4 border-b-2 border-ink pb-3">
                <p className="font-mono text-label uppercase text-ink-soft">Band {band.number}</p>
                <h3 className="text-h2">{band.name}</h3>
                <p className="font-mono text-label uppercase text-ink-soft">{band.note}</p>
              </div>

              {categoriesInBand(band.id).map((c) => (
                <article key={c.slug} className="grid gap-6 border-b border-ink/15 py-10 lg:grid-cols-12">
                  <header className="lg:col-span-4">
                    <IndexTab>{c.number}</IndexTab>
                    <div className="mt-4 flex items-center gap-4">
                      <CategoryIcon slug={c.slug} className="size-10" />
                      <h4 className="font-display text-h3">{c.name}</h4>
                    </div>
                    <p className="mt-2 text-ink-soft">{c.description}</p>
                    <p className="mt-3 font-mono text-[0.75rem] text-ink-soft">
                      /products/{c.slug} &middot; {c.subcategories.length} sub-categories &middot; {countItems(c)} items
                    </p>
                    {c.pageNote ? (
                      <p className="mt-4 border-l-2 border-red pl-3 text-sm">Page note: {c.pageNote}</p>
                    ) : null}
                    {c.seeAlso?.map((ref) => (
                      <p key={ref.label} className="mt-3 text-sm text-ink-soft">
                        See also:{" "}
                        <Link href={`#${ref.slug}`} className="underline decoration-rule underline-offset-4">
                          {ref.label}
                        </Link>
                      </p>
                    ))}
                  </header>

                  <dl id={c.slug} className="grid scroll-mt-28 gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
                    {c.subcategories.map((s) => (
                      <div key={s.slug}>
                        <dt className="border-b border-rule pb-1.5 font-semibold">{s.name}</dt>
                        {s.note ? <dd className="mt-1.5 text-sm text-ink-soft">{s.note}</dd> : null}
                        <dd>
                          <ul className="mt-2 grid gap-1 text-[0.9375rem]">
                            {s.items.map((item) => (
                              <li key={item.id}>
                                {item.name}
                                {item.note ? <span className="text-ink-soft"> - {item.note}</span> : null}
                                {item.href ? (
                                  <span className="ml-2 font-mono text-[0.75rem] text-board">&rarr; {item.href}</span>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section id="kits" tone="white" spacing="tight" aria-labelledby="kits-title" className="border-t border-ink/10">
        <h2 id="kits-title" className="text-h2">School kits</h2>
        <ol className="mt-8 grid gap-px overflow-hidden rounded-sm border border-ink/15 bg-ink/15 md:grid-cols-2 xl:grid-cols-3">
          {kits.map((k, i) => (
            <li key={k.id} className="bg-white p-6">
              <p className="font-mono text-label uppercase text-ink-soft">
                Kit {i + 1} &middot; {k.basis}
                {k.featured ? <span className="ml-2 bg-pencil-soft px-1.5 text-ink">Featured on home</span> : null}
              </p>
              <h3 className="mt-2 text-h3">{k.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">For: {k.audience}</p>
              <ul className="mt-4 grid gap-1 text-[0.9375rem]">
                {k.contents.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span aria-hidden="true" className="text-red">&#10003;</span>
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[0.75rem] text-ink-soft">
                From: {k.categories.map((slug) => getCategory(slug)?.name).join(", ")}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="placement" spacing="tight" aria-labelledby="placement-title" className="border-t border-ink/10">
        <h2 id="placement-title" className="text-h2">Placement rules</h2>
        <table className="mt-6 w-full max-w-3xl text-left text-[0.9375rem]">
          <thead>
            <tr className="border-b-2 border-ink font-mono text-label uppercase">
              <th scope="col" className="py-2 pr-4 font-medium">Item</th>
              <th scope="col" className="py-2 font-medium">Lives in</th>
            </tr>
          </thead>
          <tbody>
            {placementRules.map((r) => (
              <tr key={r.items} className="border-b border-ink/10">
                <td className="py-2.5 pr-4">{r.items}</td>
                <td className="py-2.5">{getCategory(r.category)?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section id="clients" spacing="tight" aria-labelledby="clients-title" className="border-t border-ink/10">
        <h2 id="clients-title" className="text-h2">Client schools</h2>
        <p className="mt-4 text-ink-soft">
          {clientSchools.length === 0
            ? "None listed yet, so the “Schools we supply” section on the home page stays hidden."
            : `${clientSchools.length} listed: ${clientSchools.map((s) => s.name).join(", ")}`}
        </p>
      </Section>
    </>
  );
}
