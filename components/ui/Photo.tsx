import Image from "next/image";
import { cn } from "@/lib/cn";

type PhotoProps = {
  src: string;
  /** Describe the photo; pass "" only when it is purely decorative */
  alt: string;
  /** Aspect ratio and sizing classes, e.g. "aspect-[4/3]" */
  className?: string;
  /** Hint for the browser about rendered width */
  sizes?: string;
  priority?: boolean;
  "data-reveal"?: boolean;
};

/** A cropped photo in a rounded frame. Files live in /public/images/photos. */
export function Photo({ src, alt, className, sizes = "(min-width: 1024px) 50vw, 100vw", priority, ...rest }: PhotoProps) {
  return (
    <figure
      className={cn("relative overflow-hidden rounded-md bg-paper-deep", className)}
      data-reveal={rest["data-reveal"] || undefined}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </figure>
  );
}
