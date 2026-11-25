import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/data/catalogue";
import { cn } from "@/lib/cn";

type CategoryTileProps = {
  /** Needs slug, name, description and image */
  category: Pick<Category, "slug" | "name" | "description" | "image">;
  /** Heading level inside the card */
  as?: "h2" | "h3";
  /** Hint for the browser about rendered width */
  sizes?: string;
  className?: string;
  /** @deprecated No effect; the index tab is gone. */
  tabTone?: string;
};

/**
 * The category card used on the home page and /products: 3:2 photo, name and
 * one-line description. The whole card is the link (.card-link: lifts 2px on
 * hover, photo zooms to 1.03 within its frame).
 */
export function CategoryTile({ category, as: Heading = "h3", sizes, className }: CategoryTileProps) {
  return (
    <Link href={`/products/${category.slug}`} className={cn("card-link group flex h-full flex-col overflow-hidden", className)}>
      <div className="card-media aspect-[3/2]">
        {category.image ? (
          <Image
            src={category.image}
            alt=""
            fill
            sizes={sizes ?? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="font-display text-xl font-semibold leading-snug transition-colors duration-150 group-hover:text-board">
          {category.name}
        </Heading>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">{category.description}</p>
      </div>
    </Link>
  );
}
