import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { categories } from "@/data/catalogue";
import { footerPages, site } from "@/lib/site";
import { Logo } from "./Logo";

const linkClass = "link-draw text-paper/75 transition-colors duration-150 hover:text-white";
const headingClass = "font-sans text-sm font-semibold tracking-normal text-paper";

const companyPages = footerPages.filter((p) => !["/products", "/privacy", "/terms"].includes(p.href));

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink text-paper print:hidden">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        {/* Brand */}
        <div className="lg:col-span-3">
          <Logo tone="paper" />
          <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-paper/75">
            School supplies for schools in {site.city} and other states, quoted from your list and delivered with a GST
            invoice.
          </p>
          <p className="mt-4 text-sm text-paper/60">{site.divisionLine}</p>
        </div>

        {/* Categories: names only, two columns */}
        <nav aria-labelledby="footer-categories" className="sm:col-span-2 lg:col-span-4">
          <h2 id="footer-categories" className={headingClass}>
            <Link href="/products" className="link-draw">
              Categories
            </Link>
          </h2>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className={`inline-block py-1.5 text-[0.9375rem] ${linkClass}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-pages" className="lg:col-span-2">
          <h2 id="footer-pages" className={headingClass}>
            Company
          </h2>
          <ul className="mt-4 grid">
            {companyPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={`inline-block py-1.5 text-[0.9375rem] ${linkClass}`}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h2 className={headingClass}>Contact</h2>
          <dl className="mt-4 grid gap-3.5 text-[0.9375rem]">
            <div>
              <dt className="sr-only">Phone</dt>
              <dd>
                <a href={site.phoneHref} className={`tabular-nums ${linkClass}`}>
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">WhatsApp</dt>
              <dd>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Message us on WhatsApp
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Email</dt>
              <dd>
                <a href={site.emailHref} className={linkClass}>
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-paper/60">Address</dt>
              <dd className="mt-0.5 max-w-[17rem] not-italic leading-relaxed text-paper/75">{site.address}</dd>
            </div>
            <div>
              <dt className="text-sm text-paper/60">GSTIN</dt>
              <dd className="mt-0.5 text-paper/75 tabular-nums">{site.gstin}</dd>
            </div>
          </dl>
        </div>
      </Container>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. {site.divisionLine}
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
