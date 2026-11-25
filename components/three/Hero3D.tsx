"use client";

import Image from "next/image";
import { Component, useEffect, useState, type ComponentType, type ReactNode } from "react";

/**
 * Decides whether the hero gets its 3D layer, and loads it lazily.
 *
 * 3D only on desktops with a fine pointer, no reduced-motion preference,
 * no data saver and reasonable hardware, and only once the browser is idle.
 * Everyone else sees a pre-rendered still of the packed delivery box.
 * The container's data-three-d attribute records the outcome:
 *   pending  3D is loading (the hero timeline waits briefly for it)
 *   on       3D is running
 *   off      still image instead
 */
export function Hero3D({ container }: { container: React.RefObject<HTMLDivElement | null> }) {
  const [Scene, setScene] = useState<ComponentType<{ container: HTMLElement }> | null>(null);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    if (!canRun3D()) {
      fallBack(el);
      return;
    }

    el.dataset.threeD = "pending";
    let cancelled = false;
    const load = () =>
      import("./HeroScene")
        .then((m) => !cancelled && setScene(() => m.default))
        .catch(() => fallBack(el));

    // After the page is interactive and the browser is idle
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle ? window.requestIdleCallback(load, { timeout: 1500 }) : window.setTimeout(load, 400);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, [container]);

  return (
    <>
      {/* Still: shown below lg, and on desktop when 3D is off */}
      <Image
        src="/images/hero-still.webp"
        alt=""
        width={360}
        height={300}
        priority={false}
        className="hero-still pointer-events-none absolute -bottom-[4.5rem] right-0 w-36 select-none sm:-bottom-10 sm:left-[18%] sm:right-auto sm:w-44 lg:hidden lg:group-data-[three-d=off]/l2q:block"
      />
      {Scene && container.current ? (
        <SceneBoundary onError={() => container.current && fallBack(container.current)}>
          <Scene container={container.current} />
        </SceneBoundary>
      ) : null}
    </>
  );
}

function fallBack(el: HTMLElement) {
  el.dataset.threeD = "off";
  el.dispatchEvent(new Event("ss3d:ready"));
}

function canRun3D() {
  const mq = (q: string) => window.matchMedia(q).matches;
  if (!mq("(min-width: 1024px) and (pointer: fine)")) return false;
  if (mq("(prefers-reduced-motion: reduce)")) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** If WebGL fails at runtime, drop the 3D layer and show the still. */
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
