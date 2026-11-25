import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ItemPhotos } from "@/components/products/ItemPhotos";
import { SubcategoryNav } from "@/components/products/SubcategoryNav";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import { QuickQuoteForm } from "@/components/quote/QuickQuoteForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/PageHeader";
import { categories, countItems, getCategory, type Category, type Item } from "@/data/catalogue";
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

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const index = categories.indexOf(category);
  const prev = categories[index - 1];
  const next = categories[index + 1];
  // Occasional and one-time purchases are usually specified per school
  const leanOnQuote = category.band !== "everyday";
  const quoteHref = `/quote?category=${category.slug}`;
  const total = countItems(category);

  return (
    <>
      <header className="border-b border-rule bg-paper pb-12 pt-8 sm:pt-10 lg:pb-16">
        <Container className="animate-rise-in">
          <Breadcrumb
            items={[{ href: "/", label: "Home" }, { href: "/products", label: "Products" }, { label: category.name }]}
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-6">
              <h1 className="text-h1">{category.name}</h1>
              <p className="mt-5 max-w-xl text-lead text-ink-soft">
                {category.description}. {plural(total, "item", "items")} in{" "}
                {plural(category.subcategories.length, "group", "groups")}, each quoted on request.
              </p>

              {category.pageNote || category.seeAlso?.length ? (
                <div className="mt-6 max-w-xl rounded-md border border-rule bg-paper-deep px-4 py-3.5 text-[0.9375rem] leading-relaxed">
                  {category.pageNote ? <p>{category.pageNote}</p> : null}
                  {category.seeAlso?.map((ref) => {
                    const target = getCategory(ref.slug);
                    const sub = target?.subcategories.find((s) => s.name === ref.subcategory);
                    return (
                      <p key={ref.label} className={category.pageNote ? "mt-1.5 text-ink-soft" : "text-ink-soft"}>
                        {ref.label}:{" "}
                        <Link href={`/products/${ref.slug}${sub ? `#${sub.slug}` : ""}`} className="link font-semibold text-ink">
                          {sub?.name ?? target?.name}
                        </Link>
                      </p>
                    );
                  })}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
              <figure className="relative aspect-[3/2] overflow-hidden rounded-lg bg-paper-deep lg:col-span-6">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </figure>
            ) : null}
          </div>
        </Container>
      </header>

      <Container className="grid grid-cols-1 pb-section pt-6 lg:grid-cols-12 lg:gap-10 lg:pt-14">
        <SubcategoryNav
          className="lg:col-span-3"
          items={category.subcategories.map((s) => ({ slug: s.slug, name: s.name, count: s.items.length }))}
          filter={<CategoryFilter categoryName={category.name} />}
        />

        <div className="pt-8 lg:col-span-9 lg:pt-0">
          {leanOnQuote ? (
            <p className="mb-10 max-w-2xl text-ink-soft">
              These are usually specified per school: size, brand, quantity and installation. Add items to your quote
              list, or send your requirements and we will advise.
            </p>
          ) : null}

          <div id="category-no-match" hidden className="card px-6 py-10 text-center">
            <h2 className="text-h3">No items match your filter</h2>
            <p className="mx-auto mt-2 max-w-md text-ink-soft">
              We source most things a school buys. Tell us what you are looking for.
            </p>
            <div className="mt-5">
              <Button href={quoteHref}>Tell us what you need</Button>
            </div>
          </div>

          {category.subcategories.map((sub, si) => (
            <section
              key={sub.slug}
              id={sub.slug}
              data-item-section
              aria-labelledby={`${sub.slug}-title`}
              className={si > 0 ? "mt-14 scroll-mt-12 border-t border-rule pt-10 lg:scroll-mt-4" : "scroll-mt-12 lg:scroll-mt-4"}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h2 id={`${sub.slug}-title`} className="text-h3">
                  {sub.name}
                </h2>
                {leanOnQuote ? (
                  <Link href={`${quoteHref}&about=${encodeURIComponent(sub.name)}`} className="link text-sm font-semibold text-board">
                    Ask for a quote on {sub.name.toLowerCase()}
                  </Link>
                ) : (
                  <p className="tabular text-sm text-ink-soft">{plural(sub.items.length, "item", "items")}</p>
                )}
              </div>
              {sub.note ? <p className="mt-1.5 max-w-2xl text-[0.9375rem] text-ink-soft">{sub.note}</p> : null}

              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
                {sub.items.map((item, ii) => (
                  <li key={item.id} data-item={`${item.name} ${sub.name} ${item.note ?? ""}`}>
                    <ItemCard item={item} category={category} order={ii} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>

      {/* Enquiry for this category: the page's one dark band */}
      <section aria-labelledby="cant-find" className="on-dark bg-ink py-section">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-5">
            <h2 id="cant-find" className="text-h2 text-white">
              Not finding an item?
            </h2>
            <p className="mt-4 max-w-md text-paper/85">
              We source most things a school buys. Describe the item, brand, size or quantity and we will include it in
              your quotation, each line priced separately for you to review.
            </p>
            <p className="mt-4 max-w-md text-paper/85">
              If you would like to see products first, we can bring samples to your school.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
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
          <div className="text-ink lg:col-span-7">
            <QuickQuoteForm
              source={`${category.name} page`}
              about={category.name}
              messageLabel={`What do you need from ${category.name}?`}
            />
          </div>
        </Container>
      </section>

      {/* Previous / next category */}
      <nav aria-label="Other categories" className="border-b border-rule">
        <Container className="grid gap-4 py-10 sm:grid-cols-2 lg:py-12">
          {prev ? <SiblingLink category={prev} direction="Previous" /> : null}
          {next ? <SiblingLink category={next} direction="Next" className="sm:col-start-2" /> : null}
        </Container>
      </nav>
    </>
  );
}

function ItemCard({ item, category, order }: { item: Item; category: Category; order: number }) {
  const hasPhoto = item.images.length > 0;
  const styles = item.images.length > 1 ? `${item.images.length} styles` : null;
  const detail = [item.note, styles].filter(Boolean).join(". ");
  const name = (
    <h3
      className={
        hasPhoto
          ? "font-sans text-[0.9375rem] font-semibold leading-snug sm:text-base"
          : "font-display text-base font-semibold leading-snug text-ink/80 sm:text-lg"
      }
    >
      {item.name}
    </h3>
  );

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-rule bg-paper-deep">
        {hasPhoto ? (
          <ItemPhotos
            images={item.images}
            name={item.name}
            order={order}
            sizes="(min-width: 1280px) 220px, (min-width: 1024px) 34vw, 50vw"
          />
        ) : (
          // No photo yet: the name set on a plain plate, as in a printed catalogue
          <div className="absolute inset-0 flex items-end p-3 sm:p-4">{name}</div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {hasPhoto ? name : null}
        {detail ? (
          <p className={hasPhoto ? "mt-1 text-sm leading-snug text-ink-soft" : "text-sm leading-snug text-ink-soft"}>
            {detail}
          </p>
        ) : null}
        <div className={hasPhoto || detail ? "mt-auto grid gap-2 pt-4" : "mt-auto grid gap-2"}>
          <AddToQuoteButton
            size="sm"
            className="w-full"
            label="Add to quote"
            item={{ id: item.id, name: item.name, category: category.name }}
          />
          {item.href ? (
            <Link href={item.href} className="link py-1 text-center text-sm font-semibold text-board">
              See details
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function SiblingLink({
  category,
  direction,
  className,
}: {
  category: Category;
  direction: "Previous" | "Next";
  className?: string;
}) {
  const isNext = direction === "Next";
  return (
    <Link
      href={`/products/${category.slug}`}
      rel={isNext ? "next" : "prev"}
      className={`card-link group flex items-center gap-4 p-3 ${isNext ? "sm:flex-row-reverse sm:text-right" : ""} ${className ?? ""}`}
    >
      <div className="card-media aspect-[3/2] w-24 shrink-0 rounded-sm sm:w-32">
        {category.image ? (
          <Image src={category.image} alt="" fill sizes="128px" className="object-cover" />
        ) : null}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-ink-soft">{direction} category</p>
        <p className="mt-0.5 font-display text-lg font-semibold leading-snug transition-colors duration-150 group-hover:text-board sm:text-xl">
          {category.name}
        </p>
      </div>
    </Link>
  );
}
