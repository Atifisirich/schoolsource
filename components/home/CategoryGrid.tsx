import { Button } from "@/components/ui/Button";
import { CategoryTile } from "@/components/ui/CategoryTile";
import { Section, SectionHead } from "@/components/ui/Section";
import type { Category } from "@/data/catalogue";
import { cn } from "@/lib/cn";

/** What we supply: the 15 categories as one calm grid of cream tiles. */
export function CategoryGrid({ categories, itemTotal }: { categories: Category[]; itemTotal: number }) {
  return (
    <Section id="categories" aria-labelledby="categories-title" className="!pt-0">
      <SectionHead
        id="categories-title"
        title="Everything we supply, in 15 categories."
        intro={`${itemTotal} items, from pens to lab benches. Open a category to see every item in it.`}
        action={
          <Button href="/products" variant="text">
            See all products
          </Button>
        }
      />
      <ul className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 nav:grid-cols-5">
        {categories.map((c, i) => (
          <li key={c.slug} className={cn(i === categories.length - 1 && "max-md:col-span-2")}>
            <CategoryTile
              category={c}
              sizes="(min-width: 1180px) 250px, (min-width: 768px) 30vw, 46vw"
              className="max-sm:min-h-[10.5rem] max-sm:p-3.5 max-sm:pb-0 max-sm:[&_.tile-title]:text-[0.9375rem] max-sm:[&_.tile-title]:tracking-[-0.01em] max-sm:[&_.tile-text]:hidden max-sm:[&_.tile-go]:hidden max-sm:[&_.tile-media]:mt-2 max-sm:[&_.tile-media]:min-h-[4.5rem] max-sm:[&_.tile-media_img]:max-h-[5rem] max-sm:[&_.tile-media-wide]:-mx-3.5 max-sm:[&_.tile-media-frame]:mx-0 max-sm:[&_.tile-media-frame]:mb-3.5 max-sm:[&_.tile-media-frame_img]:max-h-none"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
