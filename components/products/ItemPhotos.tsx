"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type ItemPhotosProps = {
  images: string[];
  /** Item name, used in each photo's alt text */
  name: string;
  /** Position of the card in its grid, so neighbouring cards change at different moments */
  order?: number;
  sizes?: string;
};

const INTERVAL = 2600;

/**
 * An item's photos in one frame. With several photos (one per style) they
 * crossfade in turn while the card is on screen, so a school sees at a glance
 * that more than one type is supplied. Pauses on hover, focus and with its
 * pause button; with reduced motion it stays still and the dots pick a photo.
 */
export function ItemPhotos({ images, name, order = 0, sizes }: ItemPhotosProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [still, setStill] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const many = images.length > 1;

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = frame.current;
    if (!el || !many || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [many]);

  const running = many && visible && !hovered && !stopped && !still;

  useEffect(() => {
    if (!running) return;
    // The first change waits a little longer per card, so a row never flips all at once
    const delay = index === 0 ? INTERVAL + (order % 4) * 450 : INTERVAL;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % images.length), delay);
    return () => window.clearTimeout(t);
  }, [running, index, order, images.length]);

  return (
    <div
      ref={frame}
      className="absolute inset-0"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={many ? `${name}, style ${i + 1} of ${images.length}` : name}
          fill
          sizes={sizes}
          className={cn(
            "object-cover transition-[opacity,scale] ease-out-quart",
            i === index ? "scale-100 opacity-100 duration-700" : "scale-105 opacity-0 duration-700",
          )}
          aria-hidden={i === index ? undefined : true}
        />
      ))}

      {many ? (
        <>
          <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-2 py-0.5 font-mono text-[0.6875rem] font-semibold text-white">
            {images.length} styles
          </span>
          <div className="absolute inset-x-0 bottom-2 flex justify-center">
            <div className="flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-1 shadow-card">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${name} style ${i + 1} of ${images.length}`}
                  aria-pressed={i === index}
                  className="flex size-5 items-center justify-center"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-[width,background-color] duration-300",
                      i === index ? "w-4 bg-board" : "w-1.5 bg-ink/30",
                    )}
                  />
                </button>
              ))}
              {!still ? (
                <button
                  type="button"
                  onClick={() => setStopped((s) => !s)}
                  aria-label={stopped ? `Play ${name} photos` : `Pause ${name} photos`}
                  className="flex size-5 items-center justify-center text-ink"
                >
                  <svg viewBox="0 0 12 12" className="size-2.5" fill="currentColor" aria-hidden="true">
                    {stopped ? <path d="M3 2 L10 6 L3 10 Z" /> : <path d="M3 2 H5 V10 H3 Z M7 2 H9 V10 H7 Z" />}
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
