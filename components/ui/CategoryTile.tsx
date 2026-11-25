import type { Category } from "@/data/catalogue";
import { categoryArt } from "@/lib/category-art";
import { ColorTile, type TileTone } from "./ColorTile";

type CategoryTileProps = {
  category: Pick<Category, "slug" | "name" | "description" | "image">;
  as?: "h2" | "h3";
  sizes?: string;
  tone?: TileTone;
  className?: string;
  /** @deprecated No effect. */
  tabTone?: string;
};

/** A category as a ColorTile, with its picture from lib/category-art.ts. */
export function CategoryTile({ category, as, sizes, tone = "cream", className }: CategoryTileProps) {
  const art = categoryArt[category.slug];
  return (
    <ColorTile
      href={`/products/${category.slug}`}
      title={category.name}
      text={category.description}
      image={art ?? (category.image ? { src: category.image, width: 1600, height: 1067, fit: "frame" } : undefined)}
      tone={tone}
      as={as}
      sizes={sizes}
      className={className}
    />
  );
}
