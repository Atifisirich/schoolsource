"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide scroll motion, loaded after the page is interactive:
 * - [data-reveal]  blocks rise in as they enter the viewport; elements
 *                  entering together are staggered.
 * - [data-route]   dotted route lines draw along with the scroll
 *                  (horizontal from lg up, vertical below).
 * Native scrolling is untouched. With reduced motion nothing runs and
 * CSS leaves every element in its final state.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      document.documentElement.classList.add("reveal-armed");

      const ctx = gsap.context(() => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        gsap.set(targets, { opacity: 0, y: 16 });
        ScrollTrigger.batch(targets, {
          start: "top 96%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.05, overwrite: true }),
        });

        const mm = gsap.matchMedia();
        mm.add({ wide: "(min-width: 1024px)", narrow: "(max-width: 1023.98px)" }, (context) => {
          const wide = context.conditions?.wide;
          gsap.utils.toArray<HTMLElement>("[data-route]").forEach((line) => {
            gsap.fromTo(
              line,
              wide ? { scaleX: 0, scaleY: 1, transformOrigin: "left center" } : { scaleY: 0, scaleX: 1, transformOrigin: "center top" },
              {
                scaleX: 1,
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: line.closest("[data-route-group]") ?? line,
                  start: "top 80%",
                  end: wide ? "top 35%" : "bottom 60%",
                  scrub: 0.6,
                },
              },
            );
          });
        });
      });

      ScrollTrigger.refresh();
      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
