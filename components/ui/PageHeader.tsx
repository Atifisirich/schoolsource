import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type Crumb = { href?: string; label: string };

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="text-ink-soft/60">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="link-draw transition-colors duration-150 hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type PageHeaderProps = {
  crumbs: Crumb[];
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Right-hand column: actions, a photo, a short summary */
  aside?: React.ReactNode;
  /** Extra content under the intro, e.g. buttons or a search field */
  children?: React.ReactNode;
  className?: string;
};

/**
 * Top of every inner page: breadcrumb, h1, intro, optional aside. White with a
 * hairline bottom border. The page's one entrance animation lives here.
 */
export function PageHeader({ crumbs, title, intro, aside, children, className }: PageHeaderProps) {
  return (
    <header className={cn("border-b border-rule bg-paper pb-12 pt-8 sm:pt-10 lg:pb-16", className)}>
      <Container className="animate-rise-in">
        <Breadcrumb items={crumbs} />
        <div className={cn("mt-8 grid gap-8 lg:grid-cols-12", aside ? "lg:items-end" : null)}>
          <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
            <h1 className="text-h1">{title}</h1>
            {intro ? <div className="mt-5 max-w-2xl text-lead text-ink-soft">{intro}</div> : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
          {aside ? <div className="lg:col-span-5 lg:justify-self-end">{aside}</div> : null}
        </div>
      </Container>
    </header>
  );
}
