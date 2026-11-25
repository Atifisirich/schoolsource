import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ItemPhotos } from "@/components/products/ItemPhotos";
import { SubcategoryNav } from "@/components/products/SubcategoryNav";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import { QuickQuoteForm } from "@/components/quote/QuickQuoteForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/PageHeader";
import { bands, categories, countItems, getCategory } from "@/data/catalogue";
import { bandStyle } from "@/lib/bands";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/site";

type Params = { category: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return {
    title: category.name,
    description: `${category.description} for schools. ${countItems(category)} items across ${category.subcategories.length} groups, quoted on request with GST invoices.`,
  };
}

/** Two-letter index mark for an item card, e.g. "Ball pens" -> "Bp". */
function monogram(name: string) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2);
  return words[0][0].toUpperCase() + words[1][0].toLowerCase();
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const index = categories.indexOf(category);
  const prev = categories[index - 1];
  const next = categories[index + 1];
  const band = bands.find((b) => b.id === category.band)!;
  const style = bandStyle[category.band];
  // Occasional and one-time purchases are usually specified per school
  const leanOnQuote = category.band !== "everyday";
  const quoteHref = `/quote?category=${category.slug}`;

  return (
    <>
      <header className={cn("relative overflow-hidden border-b border-ink/10", style.tint)}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[10rem] leading-none text-ink/[0.06] sm:text-[14rem] lg:text-[18rem]"
        >
          {category.number}
        </span>
        <Container className="relative pb-10 pt-8 sm:pt-10 lg:pb-14">
          <Breadcrumb
            items={[{ href: "/", label: "Home" }, { href: "/products", label: "Products" }, { label: category.name }]}
            className="animate-rise-in"
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="animate-rise-in flex items-center gap-4" style={{ animationDelay: "40ms" }}>
                <span className="flex size-20 items-center justify-center rounded-md bg-white shadow-[0_1px_0_rgb(27_36_51/0.12)]">
                  <CategoryIcon slug={category.slug} drawIn className="size-12 text-board" />
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-soft">
                  <span aria-hidden="true" className={cn("size-2 rounded-full", style.dot)} />
                  {band.name} &middot; {band.note}
                </span>
              </div>
              <h1 className="animate-rise-in mt-6 text-h1" style={{ animationDelay: "80ms" }}>{category.name}</h1>
              <p className="animate-rise-in mt-3 max-w-2xl text-lead text-ink-soft" style={{ animationDelay: "120ms" }}>
                {category.description}.
              </p>
              <ul className="animate-rise-in mt-5 flex flex-wrap gap-2 text-sm" style={{ animationDelay: "160ms" }}>
                <li className="rounded-full bg-white px-3 py-1.5 font-semibold">{category.subcategories.length} groups</li>
                <li className="rounded-full bg-white px-3 py-1.5 font-semibold">{countItems(category)} items</li>
                <li className="rounded-full bg-white px-3 py-1.5 font-semibold">Quoted on request</li>
              </ul>
              {category.pageNote ? (
                <p className="mt-5 max-w-xl border-l-[3px] border-red bg-white px-4 py-3 text-[0.9375rem]">
                  {category.pageNote}
                </p>
              ) : null}
              {category.seeAlso?.map((ref) => {
                const target = getCategory(ref.slug);
                const sub = target?.subcategories.find((s) => s.name === ref.subcategory);
                return (
                  <p key={ref.label} className="mt-3 text-[0.9375rem] text-ink-soft">
                    {ref.label}:{" "}
                    <Link
                      href={`/products/${ref.slug}${sub ? `#${sub.slug}` : ""}`}
                      className="font-semibold text-ink underline decoration-rule underline-offset-4 hover:decoration-board"
                    >
                      {sub?.name ?? target?.name}
                    </Link>
                  </p>
                );
              })}
              <div className="animate-rise-in mt-6 flex flex-wrap gap-3" style={{ animationDelay: "200ms" }}>
                <Button href={quoteHref}>Request a quote</Button>
                <Button
                  href={whatsappLink(`Hello SchoolSource, we need the following from ${category.name}:`)}
                  variant="secondary"
                  icon={<WhatsAppIcon />}
                >
                  Ask on WhatsApp
                </Button>
              </div>
            </div>

            {category.image ? (
              <figure
                className="animate-rise-in relative aspect-[3/2] overflow-hidden rounded-lg border-4 border-white shadow-lift lg:col-span-5"
                style={{ animationDelay: "200ms" }}
              >
                <Image
                  src={category.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </figure>
            ) : null}
          </div>
        </Container>
      </header>

      <SubcategoryNav
        items={category.subcategories.map((s) => ({ slug: s.slug, name: s.name, count: s.items.length }))}
        aside={<CategoryFilter categoryName={category.name} />}
      />

      <Container>
        {leanOnQuote ? (
          <p className="mt-10 max-w-2xl text-ink-soft" data-reveal>
            These are usually specified per school: size, brand, quantity and installation. Add items to your quote
            list, or ask for a quote with your requirements and we will advise.
          </p>
        ) : null}

        <div id="category-no-match" hidden className="mt-10 rounded-md border border-dashed border-ink/30 bg-white px-6 py-10 text-center">
          <p className="font-display text-h3">No items match your filter</p>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">
            We source most things a school buys. Tell us what you are looking for.
          </p>
          <div className="mt-5">
            <Button href={quoteHref}>Tell us what you need</Button>
          </div>
        </div>

        {category.subcategories.map((sub, si) => {
          const code = `${category.number}.${si + 1}`;
          return (
            <section
              key={sub.slug}
              id={sub.slug}
              data-item-section
              aria-labelledby={`${sub.slug}-title`}
              className="grid scroll-mt-44 gap-6 border-b border-ink/12 py-12 last:border-b-0 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-3" data-reveal>
                <div className="lg:sticky lg:top-36">
                  <p className="font-mono text-label text-ink-soft">{code}</p>
                  <h2 id={`${sub.slug}-title`} className="mt-2 text-h3">{sub.name}</h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    {sub.items.length} {sub.items.length === 1 ? "item" : "items"}
                  </p>
                  {sub.note ? <p className="mt-3 text-[0.9375rem] text-ink-soft">{sub.note}</p> : null}
                  {leanOnQuote ? (
                    <Link
                      href={`${quoteHref}&about=${encodeURIComponent(sub.name)}`}
                      className="mt-4 inline-block text-sm font-semibold text-board underline decoration-rule decoration-2 underline-offset-4 hover:decoration-board"
                    >
                      Ask for a quote on {sub.name.toLowerCase()}
                    </Link>
                  ) : null}
                </div>
              </div>

              <ul className="grid grid-cols-2 content-start gap-3 sm:gap-4 lg:col-span-9 xl:grid-cols-3" data-reveal>
                {sub.items.map((item, ii) => (
                  <li key={item.id} data-item={`${item.name} ${sub.name} ${item.note ?? ""}`}>
                    <article
                      className={cn(
                        "group flex h-full flex-col overflow-hidden rounded-md border border-ink/10 bg-white shadow-card",
                        "transition-[transform,box-shadow,border-color] duration-200 ease-out-quart",
                        "hover:-translate-y-1 hover:border-board/40 hover:shadow-lift",
                      )}
                    >
                      {/* Product visual: the photo once one exists, otherwise a designed tile */}
                      <div className={cn("relative aspect-[16/10] overflow-hidden", style.tint)}>
                        {item.images.length ? (
                          <ItemPhotos
                            images={item.images}
                            name={item.name}
                            order={ii}
                            sizes="(min-width: 1280px) 280px, (min-width: 640px) 45vw, 50vw"
                          />
                        ) : (
                          <>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-[radial-gradient(var(--color-rule)_1.2px,transparent_1.2px)] [background-size:14px_14px] opacity-70"
                            />
                            <span className="absolute -bottom-6 -right-5 transition-transform duration-500 ease-out-quart group-hover:-rotate-6 group-hover:scale-110">
                              <CategoryIcon slug={category.slug} className="size-20 text-board/15 sm:size-28" />
                            </span>
                            <span
                              aria-hidden="true"
                              className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-white font-display text-xl text-board sm:size-16 sm:text-2xl shadow-card transition-transform duration-300 ease-out-quart group-hover:scale-110"
                            >
                              {monogram(item.name)}
                            </span>
                          </>
                        )}
                        <span className="absolute left-3 top-3 hidden rounded-full bg-white/90 px-2 py-0.5 font-mono text-[0.6875rem] text-ink-soft sm:block">
                          {code}.{String(ii + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-3 sm:p-4">
                        <h3 className="font-sans text-[0.9375rem] font-semibold leading-snug sm:text-[1.0625rem]">{item.name}</h3>
                        {item.note ? <p className="mt-1 text-sm text-ink-soft">{item.note}</p> : null}
                        <div className="mt-auto grid gap-2 pt-4">
                          <AddToQuoteButton
                            variant="solid"
                            size="sm"
                            className="w-full"
                            label="Add to quote"
                            item={{ id: item.id, name: item.name, category: category.name }}
                          />
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="text-center text-sm font-semibold text-board underline decoration-rule underline-offset-4 hover:decoration-board"
                            >
                              See details
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </Container>

      {/* Enquiry for this category */}
      <section aria-labelledby="cant-find" className="on-dark mt-8 bg-board py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5" data-reveal>
            <p className="font-mono text-label uppercase text-pencil-soft">Ask about {category.name}</p>
            <h2 id="cant-find" className="mt-3 text-h2 text-white">Can&apos;t find an item? Tell us what you need.</h2>
            <p className="mt-3 max-w-xl text-paper/90">
              We source most things a school buys. Describe the item, brand, size or quantity and we will include it
              in your quotation.
            </p>
            <ul className="mt-6 grid gap-3 text-paper/90">
              {[
                "Every line quoted separately, for you to review",
                "Samples brought to your school on request",
                "One contact on phone and WhatsApp",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="font-semibold text-pencil">&#10003;</span>
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={whatsappLink(`Hello SchoolSource, we are looking for the following in ${category.name}:`)}
                variant="inverse"
                icon={<WhatsAppIcon />}
              >
                Ask on WhatsApp
              </Button>
              <Button href="/quote?topic=visit" variant="text">
                Book a visit with samples
              </Button>
            </div>
          </div>
          <div className="text-ink lg:col-span-7" data-reveal>
            <QuickQuoteForm
              source={`${category.name} page`}
              about={category.name}
              messageLabel={`What do you need from ${category.name}?`}
            />
          </div>
        </Container>
      </section>

      {/* Previous / next category */}
      <nav aria-label="Other categories" className="border-b border-ink/10">
        <Container className="grid grid-cols-2 divide-x divide-ink/12">
          {[
            prev ? { href: `/products/${prev.slug}`, top: `← ${prev.number}`, name: prev.name, slug: prev.slug } : { href: "/products", top: "← All", name: "All products", slug: null },
            next ? { href: `/products/${next.slug}`, top: `${next.number} →`, name: next.name, slug: next.slug } : { href: "/products", top: "All →", name: "All products", slug: null },
          ].map((link, i) => (
            <Link
              key={link.href + i}
              href={link.href}
              className={cn(
                "group flex items-center gap-4 py-8 transition-colors hover:text-board",
                i === 0 ? "pr-4" : "flex-row-reverse pl-4 text-right",
              )}
            >
              {link.slug ? (
                <span className="hidden size-12 shrink-0 items-center justify-center rounded-md bg-white transition-transform duration-200 group-hover:scale-105 sm:flex">
                  <CategoryIcon slug={link.slug} className="size-7" />
                </span>
              ) : null}
              <span>
                <span className="font-mono text-label uppercase text-ink-soft">{link.top}</span>
                <span className="mt-1 block font-display text-lg sm:text-xl">{link.name}</span>
              </span>
            </Link>
          ))}
        </Container>
      </nav>
    </>
  );
}
