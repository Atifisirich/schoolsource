import Image from "next/image";
import Link from "next/link";
import type { Art, ArtFit } from "@/lib/category-art";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./Button";

export type TileTone = "cream" | "sky" | "peach" | "orange" | "blue" | "ink" | "paper";

export type ColorTileProps = {
  href: string;
  title: string;
  /** One short line under the title */
  text?: React.ReactNode;
  /** The product picture. Pass an entry from lib/category-art.ts, or your own. */
  image?: Pick<Art, "src" | "width" | "height"> & { fit?: ArtFit };
  /** Colour field. Default cream. Keep one or two tones per grid. */
  tone?: TileTone;
  /** Heading level inside the tile */
  as?: "h2" | "h3";
  /** next/image sizes hint */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * A colour-field tile with a product on it; the whole tile is a link.
 * Cut-outs stand on the bottom edge; photos sit in a rounded frame.
 * Hover: the tile lifts 2px, the product rises 6px and an arrow appears.
 */
export function ColorTile({
  href,
  title,
  text,
  image,
  tone = "cream",
  as: Heading = "h3",
  sizes = "(min-width: 1180px) 240px, (min-width: 768px) 33vw, 50vw",
  priority,
  className,
}: ColorTileProps) {
  const fit = image?.fit ?? "cutout";
  return (
    <Link href={href} className={cn("tile", `tile-${tone}`, className)}>
      <Heading className="tile-title">{title}</Heading>
      {text ? <p className="tile-text">{text}</p> : null}
      {image ? (
        <div
          className={cn(
            "tile-media",
            fit === "wide" && "tile-media-wide",
            fit === "frame" && "tile-media-frame",
          )}
        >
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt="" // the tile's title already names it
            sizes={sizes}
            priority={priority}
          />
        </div>
      ) : (
        <div className="flex-1 pb-16" />
      )}
      <span className="tile-go" aria-hidden="true">
        <ArrowIcon />
      </span>
    </Link>
  );
}
