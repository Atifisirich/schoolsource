import Image from "next/image";
import Link from "next/link";
import type { Art, ArtFit } from "@/lib/category-art";
import { cn } from "@/lib/cn";

export type Crumb = { href?: string; label: string };

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem] font-semibold">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="opacity-45">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="link-draw opacity-75 transition-opacity duration-150 hover:opacity-100">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export type PageHeaderTone = "cream" | "sky" | "peach" | "orange" | "blue" | "ink";

const toneClass: Record<PageHeaderTone, string> = {
  cream: "bg-cream text-ink",
  sky: "bg-sky text-ink",
  peach: "bg-peach text-ink",
  orange: "on-orange bg-orange text-ink",
  blue: "on-dark bg-blue text-white",
  ink: "on-dark bg-ink-logo text-white",
};

type PageHeaderProps = {
  crumbs?: Crumb[];
  /** The page's one h1, set in display type */
  title: React.ReactNode;
  /** One or two plain sentences */
  intro?: React.ReactNode;
  /** Colour field. Default cream. */
  tone?: PageHeaderTone;
  /**
   * A cut-out (stands on the field's bottom edge) or a photo (fit "frame",
   * shown in a rounded frame). Use lib/category-art.ts entries.
   */
  image?: Pick<Art, "src" | "width" | "height" | "alt"> & { fit?: ArtFit };
  /** Actions under the intro, e.g. Request a quote + WhatsApp us */
  actions?: React.ReactNode;
  /** Right-hand column when there is no image (v2 prop) */
  aside?: React.ReactNode;
  /** Extra content under the intro (v2 prop; same slot as actions) */
  children?: React.ReactNode;
  className?: string;
};

/**
 * Top of every inner page: a rounded colour field with the breadcrumb, the h1
 * in display type, a plain intro and the actions; an optional product
 * cut-out or framed photo on the right. The page's one entrance lives here.
 */
export function PageHeader({
  crumbs,
  title,
  intro,
  tone = "cream",
  image,
  actions,
  aside,
  children,
  className,
}: PageHeaderProps) {
  const fit = image?.fit ?? "cutout";
  const side = image ? "image" : aside ? "aside" : null;

  return (
    <header className={cn("pt-2 pb-[clamp(2.5rem,5vw,4.5rem)]", className)}>
      <div className="wrap">
        <div
          className={cn(
            "enter-field relative grid overflow-hidden rounded-xl",
            toneClass[tone],
            side && "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]",
            side === "image" && "lg:min-h-[26rem]",
          )}
        >
          <div className="flex flex-col p-6 sm:p-10 lg:p-14">
            {crumbs?.length ? <Breadcrumb items={crumbs} className="enter" /> : null}
            <h1 className={cn("enter enter-1 max-w-[15em] text-h1", crumbs?.length ? "mt-6 lg:mt-8" : null)}>
              {title}
            </h1>
            {intro ? (
              <div className="enter enter-2 mt-5 max-w-[36rem] text-lead opacity-90 [&_p+p]:mt-3">{intro}</div>
            ) : null}
            {actions || children ? (
              <div className="enter enter-3 mt-8 flex flex-wrap items-center gap-3">
                {actions}
                {children}
              </div>
            ) : null}
          </div>

          {side === "image" && image ? (
            fit === "frame" ? (
              <div className="relative min-h-64 px-6 pb-6 sm:px-10 sm:pb-10 lg:min-h-0 lg:py-6 lg:pl-0 lg:pr-6">
                <div className="relative h-full min-h-64 overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="relative flex min-h-56 items-end justify-center px-6 sm:min-h-72 lg:min-h-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  priority
                  sizes="(min-width: 1024px) 34vw, 70vw"
                  className={cn(
                    "h-auto object-contain drop-shadow-[0_22px_22px_rgb(14_31_61/0.22)]",
                    fit === "wide"
                      ? "w-full max-w-none translate-y-[4%]"
                      : "max-h-[22rem] w-auto max-w-[80%] lg:max-h-[24rem]",
                  )}
                />
              </div>
            )
          ) : null}

          {side === "aside" ? (
            <div className="px-6 pb-6 sm:px-10 sm:pb-10 lg:self-end lg:p-14 lg:pl-0">{aside}</div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
