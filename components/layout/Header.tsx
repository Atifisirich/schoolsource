"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { bandStyle, type NavBand, type NavCategory } from "@/lib/bands";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { QuoteListCounter } from "./QuoteListCounter";
import { WhatsAppIcon } from "./WhatsAppFloat";

const links = [
  { href: "/kits", label: "School Kits" },
  { href: "/labs", label: "Labs & STEM" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navLink =
  "relative inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-sm px-2 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-paper-deep xl:px-3.5 xl:text-[0.9375rem]";

function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("size-3.5 transition-transform duration-200", open && "rotate-180", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
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
  const [menuOpen, setMenuOpen] = useState(false); // mobile
  const [megaOpen, setMegaOpen] = useState(false); // desktop products
  const [mobileProducts, setMobileProducts] = useState(false);
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
    <header className="sticky top-0 z-40 border-b border-ink/12 bg-paper print:hidden">
      <div ref={megaWrap} onPointerLeave={hover(false)}>
        <Container className="flex h-16 items-center gap-3 lg:h-[4.5rem] lg:gap-2 xl:gap-3">
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
                  className={cn(navLink, (megaOpen || productsActive) && "bg-paper-deep", productsActive && "text-board")}
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
                      className={cn(
                        navLink,
                        "after:absolute after:inset-x-2 after:-bottom-[0.95rem] after:h-[3px] after:origin-left after:scale-x-0 after:bg-board after:transition-transform after:duration-200 xl:after:inset-x-3.5",
                        active && "text-board after:scale-x-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:ml-2 xl:ml-3">
            <QuoteListCounter />
            <span className="hidden sm:block">
              <Button href="/quote" size="sm" className="h-10 px-3.5 xl:px-4">
                Request a Quote
              </Button>
            </span>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-sm text-ink hover:bg-paper-deep lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                {menuOpen ? <path d="M6 6 L18 18 M18 6 L6 18" /> : <path d="M4 7 H20 M4 12 H20 M4 17 H14" />}
              </svg>
            </button>
          </div>
        </Container>

        {/* Desktop products menu */}
        <div
          id="products-menu"
          hidden={!megaOpen}
          className="animate-rise-in absolute inset-x-0 top-full hidden border-b border-ink/12 bg-white shadow-[0_18px_30px_-18px_rgb(27_36_51/0.28)] [animation-duration:0.22s] lg:block"
        >
          <Container className="grid grid-cols-12 gap-8 py-8">
            <div className="col-span-9 grid grid-cols-3 gap-6">
              {bands.map((band) => (
                <div key={band.id}>
                  <p className="flex items-center gap-2 border-b border-ink/15 pb-2">
                    <span aria-hidden="true" className={cn("size-2.5 rounded-full", bandStyle[band.id].dot)} />
                    <span className="whitespace-nowrap text-[0.9375rem] font-semibold">{band.name}</span>
                  </p>
                  <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-soft">{band.note}</p>
                  <ul className="mt-3 grid gap-0.5">
                    {categories
                      .filter((c) => c.band === band.id)
                      .map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/products/${c.slug}`}
                            className="group flex items-center gap-3 rounded-sm px-2 py-2 transition-colors duration-150 hover:bg-paper"
                          >
                            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-sm", bandStyle[band.id].tint)}>
                              <CategoryIcon slug={c.slug} className="size-6" drawOnHover />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[0.9375rem] font-semibold leading-tight group-hover:text-board">{c.name}</span>
                              <span className="block text-[0.75rem] text-ink-soft">{c.itemCount} items</span>
                            </span>
                            <span className="font-mono text-[0.6875rem] text-ink-soft">{c.number}</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="col-span-3 flex flex-col gap-3 border-l border-ink/10 pl-8">
              <Link href="/products" className="group rounded-sm bg-board p-5 text-white transition-colors hover:bg-board-deep">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-pencil-soft">All products</span>
                <span className="mt-2 block font-display text-xl leading-snug">Search all {total} items</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Open the catalogue
                  <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">&rarr;</span>
                </span>
              </Link>
              <Link href="/kits" className="group rounded-sm border border-ink/15 p-4 transition-colors hover:border-board">
                <span className="block font-semibold group-hover:text-board">School Kits</span>
                <span className="block text-sm text-ink-soft">Ready-made lists for term start, exams and events.</span>
              </Link>
              <Link href="/quote" className="group rounded-sm border border-ink/15 p-4 transition-colors hover:border-board">
                <span className="block font-semibold group-hover:text-board">Can&apos;t find an item?</span>
                <span className="block text-sm text-ink-soft">Tell us what you need and we will source it.</span>
              </Link>
            </div>
          </Container>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-ink/12 bg-paper lg:hidden"
      >
        <Container className="animate-rise-in pb-10 pt-4 [animation-duration:0.25s]">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-ink/10 border-b border-ink/10">
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
                    className="inline-flex h-11 items-center gap-2 rounded-sm px-3 text-sm font-semibold text-ink-soft hover:bg-paper-deep"
                  >
                    {mobileProducts ? "Hide" : `${categories.length} categories`}
                    <Chevron open={mobileProducts} />
                  </button>
                </div>
                <ul id="mobile-products" hidden={!mobileProducts} className="grid grid-cols-2 gap-2 pb-4">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/products/${c.slug}`}
                        className={cn("flex h-full items-center gap-2.5 rounded-sm p-2.5 text-sm font-semibold leading-tight", bandStyle[c.band].tint)}
                      >
                        <CategoryIcon slug={c.slug} className="size-6 shrink-0" />
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
                      className={cn("flex h-14 items-center justify-between text-lg font-semibold", active && "text-board")}
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-ink-soft">&rarr;</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-6 grid gap-3">
            <Button href="/quote" size="lg">Request a Quote</Button>
            <div className="grid grid-cols-2 gap-3">
              <Button href={site.whatsappHref} variant="secondary" icon={<WhatsAppIcon />}>WhatsApp</Button>
              <Button href={site.phoneHref} variant="secondary">Call us</Button>
            </div>
            <p className="mt-2 text-center text-sm text-ink-soft">
              {site.phoneDisplay} &middot; {site.email}
            </p>
          </div>
        </Container>
      </div>
    </header>
  );
}
