import Link from "next/link";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import type { Category } from "@/data/catalogue";
import { cn } from "@/lib/cn";
import { IndexTab, type IndexTabTone } from "./IndexTab";

type CategoryTileProps = {
  category: Category;
  tabTone?: IndexTabTone;
  className?: string;
};

/**
 * Category card with a register index tab on its top edge.
 * Hover: the tab lifts and the icon is drawn over in board green.
 */
export function CategoryTile({ category, tabTone = "pencil", className }: CategoryTileProps) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className={cn("group relative block pt-7 outline-none", className)}
    >
      <IndexTab
        tone={tabTone}
        className="absolute left-5 top-0.5 transition-transform duration-200 ease-out-quart group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
      >
        {category.number}
      </IndexTab>

      <div
        className={cn(
          "relative flex h-full flex-col rounded-sm border border-ink/10 bg-white shadow-card p-5 pt-6",
          "transition-[border-color] duration-200 group-hover:border-ink/45",
          "group-focus-visible:outline-3 group-focus-visible:outline-offset-3 group-focus-visible:outline-[var(--focus)]",
        )}
      >
        <CategoryIcon slug={category.slug} drawOnHover className="size-11" />
        <h3 className="mt-5 text-h3">{category.name}</h3>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">{category.description}</p>
        <span className="mt-auto flex items-center gap-2 pt-5 font-mono text-label font-medium uppercase text-board">
          View range
          <svg
            viewBox="0 0 16 16"
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 8 H13 M9 4 L13 8 L9 12" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
