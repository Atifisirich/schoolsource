import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Stamp } from "@/components/ui/Stamp";
import { categories } from "@/data/catalogue";
import { footerPages, site } from "@/lib/site";
import { Logo } from "./Logo";

const linkClass =
  "text-paper/85 underline-offset-4 decoration-pencil transition-colors duration-150 hover:text-white hover:underline";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-paper print:hidden">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:gap-8 lg:py-20">
        {/* Identity and contact */}
        <div className="md:col-span-5 lg:col-span-4">
          <Logo tone="paper" />
          <p className="mt-5 max-w-xs font-display text-xl leading-snug text-paper">{site.tagline}</p>

          <dl className="mt-8 grid gap-4 text-[0.9375rem]">
            <div>
              <dt className="font-mono text-label uppercase text-pencil-soft">Address</dt>
              <dd className="mt-1"><Placeholder>{site.address}</Placeholder>, {site.city}</dd>
            </div>
            <div>
              <dt className="font-mono text-label uppercase text-pencil-soft">Phone / WhatsApp</dt>
              <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <a href={site.phoneHref} className={linkClass}>{site.phoneDisplay}</a>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Message on WhatsApp
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-label uppercase text-pencil-soft">Email</dt>
              <dd className="mt-1"><a href={site.emailHref} className={linkClass}>{site.email}</a></dd>
            </div>
            <div>
              <dt className="font-mono text-label uppercase text-pencil-soft">GSTIN</dt>
              <dd className="mt-1"><Placeholder>{site.gstin}</Placeholder></dd>
            </div>
          </dl>
        </div>

        {/* Categories, as a numbered register */}
        <nav aria-labelledby="footer-categories" className="md:col-span-4 lg:col-span-5">
          <h2 id="footer-categories" className="font-mono text-label font-medium uppercase tracking-[0.08em] text-pencil-soft">
            Categories
          </h2>
          <ol className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug} className="border-b border-paper/10">
                <Link href={`/products/${c.slug}`} className={`flex items-baseline gap-3 py-2 text-[0.9375rem] ${linkClass}`}>
                  <span className="font-mono text-[0.75rem] text-paper/60">{c.number}</span>
                  {c.name}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <nav aria-labelledby="footer-pages" className="md:col-span-3">
          <h2 id="footer-pages" className="font-mono text-label font-medium uppercase tracking-[0.08em] text-pencil-soft">
            Pages
          </h2>
          <ul className="mt-4 grid gap-1">
            {footerPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={`inline-block py-1.5 text-[0.9375rem] ${linkClass}`}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-paper/12">
        <Container className="flex flex-col gap-2 pb-24 pt-6 text-sm sm:pb-6 text-paper/75 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.divisionLine}</p>
          <p>&copy; {year} {site.name}. All rights reserved.</p>
        </Container>
      </div>

      <Stamp
        tone="paper"
        rotate={-12}
        className="pointer-events-none absolute -bottom-10 -right-8 w-44 opacity-[0.14] [--stamp-band:var(--color-ink)] md:w-56"
      />
    </footer>
  );
}
