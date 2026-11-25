"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { mainNav, site } from "@/lib/site";
import { LogoLockup } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppFloat";

/**
 * Full-screen menu for phones and tablets: a blue field with the pages in
 * display type and the two actions at the foot. Escape or the close button
 * dismisses it; focus stays inside while it is open.
 */
export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const sheet = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !sheet.current) return;
      const focusables = sheet.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      ref={sheet}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      hidden={!open}
      className="on-dark animate-sheet-in fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-blue nav:hidden print:hidden"
    >
      <div className="wrap flex h-[var(--nav-h)] shrink-0 items-center justify-between">
        <LogoLockup tone="paper" className="w-[160px] md:w-[190px]" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex size-12 items-center justify-center rounded-full border-2 border-white text-white transition-[transform,background-color] duration-150 ease-[var(--ease-out)] hover:bg-white/10 active:scale-95"
        >
          <span className="sr-only">Close menu</span>
          <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav aria-label="Mobile" className="wrap flex-1 pt-4">
        <ul>
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="flex min-h-14 items-center gap-3 py-1.5 font-display text-[clamp(1.875rem,1.4rem+2vw,2.5rem)] leading-[1.1] aria-[current=page]:text-sky-2"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="wrap grid shrink-0 gap-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-8 sm:grid-cols-2">
        <Button href="/quote" variant="light" onClick={onClose} className="w-full">
          Request a quote
        </Button>
        <Button href={site.whatsappHref} variant="ghost" icon={<WhatsAppIcon />} className="w-full">
          WhatsApp us
        </Button>
        <a href={site.phoneHref} className="py-3 text-center text-[1.0625rem] font-semibold tabular-nums sm:col-span-2">
          Call {site.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
