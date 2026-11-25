import Link from "next/link";
import { Pending, showPending } from "@/components/ui/Pending";
import { site } from "@/lib/site";
import { LogoLockup } from "./Logo";

const linkClass = "inline-flex min-h-11 items-center link-draw";
const headingClass = "mb-3 font-sans text-[0.9375rem] font-bold tracking-normal text-white";

const productLinks = [
  { href: "/products", label: "All 15 categories" },
  { href: "/kits", label: "Kits" },
  { href: "/labs", label: "Lab setups" },
  { href: "/catalogue", label: "Printable catalogue" },
];

const companyLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Request a quote" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink-logo text-[#dfe6f3] print:hidden">
      <div className="wrap grid gap-10 pb-10 pt-16 text-[1.0625rem] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:pt-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label="SchoolSource home" className="inline-block">
            <LogoLockup tone="paper" className="w-[200px]" />
          </Link>
          <p className="mt-5 max-w-[24em] text-[#b6c2d9]">
            Everything your school buys, from one supplier. SchoolSource is a division of {site.parent}, founded by{" "}
            {site.founder}.
          </p>
        </div>

        <nav aria-labelledby="footer-products">
          <h2 id="footer-products" className={headingClass}>
            Products
          </h2>
          <ul>
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className={headingClass}>
            Company
          </h2>
          <ul>
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Talk to us</h2>
          <ul>
            <li>
              <a href={site.phoneHref} className={`${linkClass} tabular-nums`}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp
              </a>
            </li>
            <li>
              <a href={site.emailHref} className={linkClass}>
                {site.email}
              </a>
            </li>
          </ul>
          <address className="mt-4 max-w-[20rem] not-italic leading-relaxed text-[#b6c2d9]">{site.address}</address>
          {showPending ? (
            <p className="mt-3 text-[#b6c2d9]">
              Hours: <Pending label={site.hours} />
            </p>
          ) : null}
        </div>
      </div>

      <div className="wrap">
        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-[0.9375rem] text-[#a9b6cd] md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {site.parent}. GSTIN <span className="tabular-nums">{site.gstin}</span>
          </p>
          <ul className="flex flex-wrap gap-x-6">
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
        </div>
      </div>
    </footer>
  );
}
