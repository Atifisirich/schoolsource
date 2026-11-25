"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { NavBand, NavCategory } from "@/lib/bands";
import { cn } from "@/lib/cn";
import { mainNav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { QuoteListCounter } from "./QuoteListCounter";
import { WhatsAppIcon } from "./WhatsAppFloat";

const links = mainNav.filter((l) => l.href !== "/products");

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Active page: thin orange underline sitting on the header's bottom hairline
const navLink =
  "relative inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-sm px-2.5 text-[0.9375rem] font-medium text-ink " +
  "transition-colors duration-150 hover:text-board xl:px-3 " +
  "after:pointer-events-none after:absolute after:inset-x-2.5 after:-bottom-4 after:h-0.5 after:origin-left after:scale-x-0 after:bg-pencil " +
  "after:transition-transform after:duration-200 after:ease-[var(--ease-out)] xl:after:inset-x-3";

function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("size-3.5 transition-transform duration-200", open && "rotate-180", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6 L8 10 L12 6" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 2.5 L3.5 2.5 C3 2.5 2.5 3 2.5 3.6 C2.8 9 7 13.2 12.4 13.5 C13 13.5 13.5 13 13.5 12.5 L13.5 10.5 L10.8 9.5 L9.5 10.8 C8 10.1 5.9 8 5.2 6.5 L6.5 5.2 Z" />
    </svg>
  );
}

export function Header({ categories, bands }: { categories: NavCategory[]; bands: NavBand[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // mobile
  const [megaOpen, setMegaOpen] = useState(false); // desktop products
  const [mobileProducts, setMobileProducts] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const productsRef = useRef<HTMLButtonElement>(null);
  const megaWrap = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number>(undefined);
  const total = categories.reduce((n, c) => n + c.itemCount, 0);

  // Close menus on navigation
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // A soft shadow appears only once the page has scrolled under the header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes whichever menu is open and returns focus to its button
  useEffect(() => {
    if (!menuOpen && !megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (megaOpen) {
        setMegaOpen(false);
        productsRef.current?.focus();
      }
      if (menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (megaOpen && megaWrap.current && !megaWrap.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen, megaOpen]);

  // Lock page scroll behind the mobile menu
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const hover = (open: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(open), open ? 90 : 160);
  };

  const productsActive = isActive(pathname, "/products");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-rule bg-white transition-shadow duration-200 print:hidden",
        (scrolled || megaOpen) && "shadow-[0_6px_16px_-12px_rgb(15_27_45/0.25)]",
      )}
    >
      <div ref={megaWrap} onPointerLeave={hover(false)}>
        <Container className="flex h-16 items-center gap-3 lg:h-[4.5rem]">
          <Logo />

          {/* Desktop navigation */}
          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              <li onPointerEnter={hover(true)}>
                <button
                  ref={productsRef}
                  type="button"
                  aria-expanded={megaOpen}
                  aria-controls="products-menu"
                  onClick={() => setMegaOpen((v) => !v)}
                  className={cn(navLink, (megaOpen || productsActive) && "text-board", productsActive && "after:scale-x-100")}
                >
                  Products
                  <Chevron open={megaOpen} />
                </button>
              </li>
              {links.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} onPointerEnter={hover(false)}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(navLink, active && "after:scale-x-100")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:ml-4">
            <a
              href={site.phoneHref}
              className="mr-2 hidden items-center gap-2 whitespace-nowrap text-[0.9375rem] font-medium text-ink tabular-nums transition-colors duration-150 hover:text-board xl:inline-flex"
            >
              <PhoneIcon className="size-4 text-ink-soft" />
              {site.phoneDisplay}
            </a>
            <QuoteListCounter />
            <span className="hidden md:block">
              <Button href="/quote" size="sm">
                Request a quote
              </Button>
            </span>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm text-ink transition-colors duration-150 hover:bg-paper-deep lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                {menuOpen ? <path d="M6 6 L18 18 M18 6 L6 18" /> : <path d="M4 7 H20 M4 12 H20 M4 17 H20" />}
              </svg>
            </button>
          </div>
        </Container>

        {/* Desktop products menu: white panel, three band columns of category names */}
        <div
          id="products-menu"
          hidden={!megaOpen}
          className="animate-fade-in absolute inset-x-0 top-full hidden border-y border-rule bg-white shadow-[0_18px_30px_-20px_rgb(15_27_45/0.25)] lg:block"
        >
          <Container className="py-8">
            <div className="grid grid-cols-3 gap-10">
              {bands.map((band) => (
                <div key={band.id}>
                  <p className="border-b border-rule pb-2.5 text-sm font-semibold text-ink">
                    {band.name}
                    <span className="ml-2 font-normal text-ink-soft">{band.note}</span>
                  </p>
                  <ul className="mt-2 grid">
                    {categories
                      .filter((c) => c.band === band.id)
                      .map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/products/${c.slug}`}
                            aria-current={isActive(pathname, `/products/${c.slug}`) ? "page" : undefined}
                            className="group -mx-2 flex items-baseline justify-between gap-4 rounded-sm px-2 py-2 transition-colors duration-150 hover:bg-paper-deep aria-[current=page]:text-board"
                          >
                            <span className="text-[0.9375rem] font-medium group-hover:text-board">{c.name}</span>
                            <span className="text-xs text-ink-soft tabular-nums">{c.itemCount} items</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-rule pt-5 text-[0.9375rem]">
              <Link href="/products" className="link-draw font-semibold text-board">
                Search all {total} items &rarr;
              </Link>
              <Link href="/catalogue" className="link-draw text-ink">
                Printable catalogue
              </Link>
              <Link href="/quote" className="link-draw text-ink-soft hover:text-ink">
                Can&apos;t find an item? Tell us what you need.
              </Link>
            </div>
          </Container>
        </div>
      </div>

      {/* Mobile menu: full screen under the header bar */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="animate-fade-in fixed inset-x-0 bottom-0 top-16 z-50 flex flex-col overflow-y-auto border-t border-rule bg-white lg:hidden"
      >
        <Container className="flex-1 pb-6 pt-2">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-rule border-b border-rule">
              <li>
                <div className="flex h-14 items-center justify-between">
                  <Link href="/products" className={cn("text-lg font-semibold", productsActive && "text-board")}>
                    Products
                  </Link>
                  <button
                    type="button"
                    aria-expanded={mobileProducts}
                    aria-controls="mobile-products"
                    onClick={() => setMobileProducts((v) => !v)}
                    className="-mr-2 inline-flex h-11 items-center gap-2 rounded-sm px-3 text-sm font-medium text-ink-soft hover:bg-paper-deep"
                  >
                    {mobileProducts ? "Hide categories" : `${categories.length} categories`}
                    <Chevron open={mobileProducts} />
                  </button>
                </div>
                <ul id="mobile-products" hidden={!mobileProducts} className="pb-3">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/products/${c.slug}`} className="flex min-h-11 items-center text-[0.9375rem] text-ink">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {links.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn("flex h-14 items-center text-lg font-semibold", active && "text-board")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
        <div className="sticky bottom-0 border-t border-rule bg-white pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
          <Container className="grid gap-3">
            <a href={site.phoneHref} className="flex items-center justify-center gap-2 py-1 text-[0.9375rem] font-medium tabular-nums">
              <PhoneIcon className="size-4 text-ink-soft" />
              {site.phoneDisplay}
            </a>
            <div className="grid grid-cols-2 gap-3">
              <Button href={site.whatsappHref} variant="secondary" icon={<WhatsAppIcon />}>
                WhatsApp us
              </Button>
              <Button href="/quote">Request a quote</Button>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
