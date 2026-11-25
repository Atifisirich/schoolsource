import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ItemPhotos } from "@/components/products/ItemPhotos";
import { SubcategoryNav } from "@/components/products/SubcategoryNav";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader, type PageHeaderTone } from "@/components/ui/PageHeader";
import { categories, countItems, getCategory, type Category, type Item } from "@/data/catalogue";
import { categoryArt } from "@/lib/category-art";
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

// One calm colour field per band, so the three bands read apart
const bandTone: Record<string, PageHeaderTone> = { everyday: "sky", activities: "peach", setup: "cream" };

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const index = categories.indexOf(category);
  const prev = categories[index - 1];
  const next = categories[index + 1];
  const leanOnQuote = category.band !== "everyday";
  const quoteHref = `/quote?category=${category.slug}`;
  const total = countItems(category);
  const art = categoryArt[category.slug];
  const image = art ?? (category.image ? { src: category.image, width: 1600, height: 1067, fit: "frame" as const, alt: category.name } : undefined);

  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { href: "/products", label: "Products" }, { label: category.name }]}
        title={category.name}
        tone={bandTone[category.band] ?? "cream"}
        image={image}
        intro={
          <p>
            {category.description}. {plural(total, "item", "items")} in {plural(category.subcategories.length, "group", "groups")}.
          </p>
        }
        actions={
          <>
            <Button href={quoteHref}>Request a quote</Button>
            <Button href={whatsappLink(`Hello SchoolSource, we need the following from ${category.name}:`)} variant="whatsapp">
              WhatsApp us
            </Button>
          </>
        }
      />

      <Container className="grid grid-cols-1 pb-section pt-2 lg:grid-cols-12 lg:gap-12 lg:pt-6">
        <SubcategoryNav
          className="lg:col-span-3"
          items={category.subcategories.map((s) => ({ slug: s.slug, name: s.name, count: s.items.length }))}
          filter={<CategoryFilter categoryName={category.name} />}
        />

        <div className="pt-8 lg:col-span-9 lg:pt-0">
          {category.pageNote || category.seeAlso?.length || leanOnQuote ? (
            <div className="mb-10 max-w-2xl space-y-2 text-lg leading-relaxed text-ink-soft">
              {category.pageNote ? <p>{category.pageNote}</p> : null}
              {category.seeAlso?.map((ref) => {
                const target = getCategory(ref.slug);
                const sub = target?.subcategories.find((s) => s.name === ref.subcategory);
                return (
                  <p key={ref.label}>
                    {ref.label}:{" "}
                    <Link href={`/products/${ref.slug}${sub ? `#${sub.slug}` : ""}`} className="link font-semibold text-ink">
                      {sub?.name ?? target?.name}
                    </Link>
                  </p>
                );
              })}
              {leanOnQuote ? (
                <p>These are usually chosen school by school. Add items to your quote, or tell us what you need and we will advise.</p>
              ) : null}
            </div>
          ) : null}

          <div id="category-no-match" hidden className="rounded-xl bg-cream px-6 py-10">
            <h2 className="text-h3">No items match</h2>
            <p className="mt-3 max-w-md text-lg text-ink-soft">We can still source it. Tell us what you are looking for.</p>
            <div className="mt-5">
              <Button href={quoteHref}>Request a quote</Button>
            </div>
          </div>

          {category.subcategories.map((sub, si) => (
            <section
              key={sub.slug}
              id={sub.slug}
              data-item-section
              aria-labelledby={`${sub.slug}-title`}
              className={si > 0 ? "mt-16 scroll-mt-32 lg:scroll-mt-28" : "scroll-mt-32 lg:scroll-mt-28"}
            >
              <h2 id={`${sub.slug}-title`} className="text-h3">
                {sub.name}
              </h2>
              {sub.note ? <p className="mt-2 max-w-2xl text-lg text-ink-soft">{sub.note}</p> : null}

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

      <section aria-labelledby="cant-find" className="pb-section">
        <Container>
          <div className="grid gap-6 rounded-xl bg-cream p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:p-14">
            <div>
              <h2 id="cant-find" className="text-h2">
                Can&rsquo;t find an item?
              </h2>
              <p className="mt-4 max-w-xl text-lead text-ink-soft">
                We source most things a school buys. Message us the item and the quantity.
              </p>
            </div>
            <Button
              href={whatsappLink(`Hello SchoolSource, we are looking for the following in ${category.name}:`)}
              variant="whatsapp"
              className="bg-white"
            >
              WhatsApp us
            </Button>
          </div>
        </Container>
      </section>

      <nav aria-label="Other categories" className="pb-section">
        <Container className="grid gap-4 sm:grid-cols-2">
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

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      {hasPhoto ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-cream">
          <ItemPhotos
            images={item.images}
            name={item.name}
            order={order}
            sizes="(min-width: 1280px) 240px, (min-width: 1024px) 28vw, (min-width: 640px) 30vw, 46vw"
          />
        </div>
      ) : (
        // No photo yet: the name on a calm cream plate
        <div className="flex aspect-[4/3] items-center justify-center bg-cream p-4 text-center">
          <h3 className="font-display text-[1.125rem] leading-tight text-ink sm:text-xl">{item.name}</h3>
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        {hasPhoto ? <h3 className="text-[1.0625rem] font-semibold leading-snug">{item.name}</h3> : null}
        {detail ? <p className="mt-1 text-base leading-snug text-ink-soft">{detail}</p> : null}
        <div className="mt-auto grid gap-1 pt-4">
          <AddToQuoteButton
            size="sm"
            className="w-full"
            label="Add to quote"
            item={{ id: item.id, name: item.name, category: category.name }}
          />
          {item.href ? (
            <Link href={item.href} className="link inline-flex min-h-11 items-center justify-center text-base font-semibold text-board">
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
      className={`group flex min-h-20 items-center gap-4 rounded-xl bg-cream px-6 py-5 transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-sand active:scale-[0.98] ${isNext ? "justify-between" : "justify-start"} ${className ?? ""}`}
    >
      {isNext ? null : <ArrowIcon className="size-6 shrink-0 rotate-180" />}
      <div className={`min-w-0 ${isNext ? "" : "flex-1"}`}>
        <p className="text-base text-ink-soft">{direction} category</p>
        <p className="mt-0.5 font-display text-xl leading-snug">{category.name}</p>
      </div>
      {isNext ? <ArrowIcon className="size-6 shrink-0" /> : null}
    </Link>
  );
}
