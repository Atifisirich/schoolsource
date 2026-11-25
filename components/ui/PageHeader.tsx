import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type Crumb = { href?: string; label: string };

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-label uppercase text-ink-soft">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-board">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">{item.label}</span>
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
  /** Right-hand column: actions, a stamp, a summary */
  aside?: React.ReactNode;
  /** Extra content under the intro */
  children?: React.ReactNode;
  className?: string;
};

/** Top of every inner page: breadcrumb, H1, intro, optional aside. */
export function PageHeader({ crumbs, title, intro, aside, children, className }: PageHeaderProps) {
  return (
    <header className={cn("hero-glow relative overflow-hidden border-b border-ink/10 pb-12 pt-8 sm:pt-10 lg:pb-16", className)}>
      <Container>
        <Breadcrumb items={crumbs} className="animate-rise-in" />
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="animate-rise-in text-h1" style={{ animationDelay: "60ms" }}>{title}</h1>
            {intro ? (
              <div className="animate-rise-in mt-5 max-w-2xl text-lead text-ink-soft" style={{ animationDelay: "120ms" }}>
                {intro}
              </div>
            ) : null}
            {children ? <div className="animate-rise-in mt-6" style={{ animationDelay: "180ms" }}>{children}</div> : null}
          </div>
          {aside ? (
            <div className="animate-rise-in lg:col-span-4 lg:justify-self-end" style={{ animationDelay: "200ms" }}>
              {aside}
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
