"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon, Button } from "@/components/ui/Button";
import type { NavBand, NavCategory } from "@/lib/bands";
import { cn } from "@/lib/cn";
import { mainNav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { QuoteListCounter } from "./QuoteListCounter";

const links = mainNav.filter((l) => l.href !== "/products");

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navLink =
  "inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-base font-semibold text-ink " +
  "transition-colors duration-150 hover:bg-cream aria-[current=page]:bg-cream aria-expanded:bg-cream";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("size-3.5 transition-transform duration-200 ease-[var(--ease-out)]", open && "rotate-180")}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6 L8 10 L12 6" />
    </svg>
  );
}

export function Header({ categories, bands }: { categories: NavCategory[]; bands: NavBand[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // phones and tablets
  const [megaOpen, setMegaOpen] = useState(false); // desktop products menu
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const productsRef = useRef<HTMLButtonElement>(null);
  const megaWrap = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number>(undefined);

  // Close menus on navigation
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // A hairline appears once the page scrolls under the header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Products menu: Escape returns focus to its button; a click outside closes it
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMegaOpen(false);
      productsRef.current?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (megaWrap.current && !megaWrap.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  // Mouse users get the menu on hover, with a short intent delay
  const hover = (open: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(open), open ? 90 : 180);
  };

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  const productsActive = isActive(pathname, "/products");
  const total = categories.reduce((n, c) => n + c.itemCount, 0);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 bg-paper/90 backdrop-blur-md backdrop-saturate-150 transition-shadow duration-200 print:hidden",
          (scrolled || megaOpen) && "shadow-[0_1px_0_var(--color-rule)]",
        )}
      >
        <div ref={megaWrap} onPointerLeave={hover(false)}>
          <div className="wrap flex h-[var(--nav-h)] items-center gap-4 xl:gap-8">
            <Logo />

            <nav aria-label="Main" className="hidden nav:block">
              <ul className="flex items-center gap-0.5">
                <li onPointerEnter={hover(true)}>
                  <button
                    ref={productsRef}
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="products-menu"
                    aria-current={productsActive ? "page" : undefined}
                    onClick={() => setMegaOpen((v) => !v)}
                    className={navLink}
                  >
                    Products
                    <Chevron open={megaOpen} />
                  </button>
                </li>
                {links.map((item) => (
                  <li key={item.href} onPointerEnter={hover(false)}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className={navLink}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
              <a
                href={site.phoneHref}
                className="link-draw mr-2 hidden whitespace-nowrap py-2 text-base font-semibold tabular-nums wide:inline"
              >
                {site.phoneDisplay}
              </a>
              <QuoteListCounter />
              <Button href="/quote" size="sm" className="hidden md:inline-flex">
                Request a quote
              </Button>
              <button
                ref={toggleRef}
                type="button"
                className="inline-flex size-12 items-center justify-center rounded-full border-2 border-ink text-ink transition-[transform,background-color] duration-150 ease-[var(--ease-out)] hover:bg-cream active:scale-95 nav:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
                  <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop products menu: the 15 categories, a plain list in three groups */}
          <div
            id="products-menu"
            hidden={!megaOpen}
            className="animate-sheet-in absolute inset-x-0 top-full hidden bg-paper shadow-[0_1px_0_var(--color-rule),0_24px_40px_-24px_rgb(14_31_61/0.35)] nav:block"
          >
            <div className="wrap grid grid-cols-3 gap-10 pb-10 pt-6">
              {bands.map((band) => (
                <div key={band.id}>
                  <p className="border-b-2 border-ink pb-3 text-[0.9375rem] font-semibold text-ink-soft">
                    {band.name.replace("&", "and")}
                  </p>
                  <ul className="mt-2">
                    {categories
                      .filter((c) => c.band === band.id)
                      .map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/products/${c.slug}`}
                            aria-current={isActive(pathname, `/products/${c.slug}`) ? "page" : undefined}
                            className="-mx-3 flex min-h-11 items-center justify-between gap-4 rounded-full px-3 text-[1.0625rem] font-semibold transition-colors duration-150 hover:bg-cream aria-[current=page]:bg-cream"
                          >
                            {c.name}
                            <span className="text-[0.9375rem] font-normal text-ink-soft tabular-nums">
                              {c.itemCount} items
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="wrap">
              <div className="flex items-center justify-between gap-6 border-t border-rule py-4">
                <Link href="/products" className="tlink">
                  See all {total} products
                  <ArrowIcon />
                </Link>
                <Link href="/catalogue" className="link-draw py-2 font-semibold">
                  Printable catalogue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        pathname={pathname}
      />
    </>
  );
}
