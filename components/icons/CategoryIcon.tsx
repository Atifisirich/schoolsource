import { cn } from "@/lib/cn";

// Custom line icons for the 15 categories. One 48-unit grid, one stroke
// weight (1.75px, non-scaling), round caps and joins throughout.

const paths: Record<string, React.ReactNode> = {
  // 01 Pencil
  stationery: (
    <g transform="rotate(-45 24 24)">
      <path d="M6 24 L13 19 V29 Z" />
      <path d="M6 24 L8.8 22 V26 Z" fill="currentColor" />
      <path d="M13 19 H36 V29 H13" />
      <path d="M13 24 H36" />
      <path d="M36 19 V29 M39 19 V29" />
      <path d="M39 19 H40 A2 2 0 0 1 42 21 V27 A2 2 0 0 1 40 29 H39" />
    </g>
  ),
  // Textbooks: an open book over a closed one
  textbooks: (
    <>
      <path d="M24 12 C19 8.5 12 8 6 9.5 V32 C12 30.5 19 31 24 34.5 C29 31 36 30.5 42 32 V9.5 C36 8 29 8.5 24 12 Z" />
      <path d="M24 12 V34.5" />
      <path d="M11 15.5 C14 15 17 15.4 19.5 16.5 M11 21 C14 20.5 17 20.9 19.5 22 M28.5 16.5 C31 15.4 34 15 37 15.5" />
      <path d="M6 32 V37 C12 35.5 19 36 24 39.5 C29 36 36 35.5 42 37 V32" />
    </>
  ),
  // ID card on a lanyard
  "printing-id-cards": (
    <>
      <path d="M18 4 L22 14 M30 4 L26 14" />
      <rect x="21" y="14" width="6" height="4" rx="1" />
      <rect x="10" y="18" width="28" height="24" rx="2" />
      <rect x="14" y="23" width="9" height="11" rx="1" />
      <circle cx="18.5" cy="27" r="2" />
      <path d="M15.5 34 A3 3 0 0 1 21.5 34" />
      <path d="M27 25 H34 M27 29 H32 M14 38 H34" />
    </>
  ),
  // 03 Board on an easel
  "teaching-aids": (
    <>
      <rect x="7" y="7" width="34" height="23" rx="1" />
      <path d="M5.5 30 H42.5" />
      <path d="M14 30 L10 43 M34 30 L38 43 M24 30 V39" />
      <path d="M12 14 H22 M12 19 H19" />
      <path d="M28 25 L32.5 15 L37 25 Z" />
    </>
  ),
  // 04 Shirt with tie
  "uniforms-bags": (
    <>
      <path d="M17 7 L10 10 L4 18 L9 22 L12 19 V42 H36 V19 L39 22 L44 18 L38 10 L31 7" />
      <path d="M17 7 C20 8.6 28 8.6 31 7" />
      <path d="M17 7 L21 15 L24 12 L27 15 L31 7" />
      <path d="M24 12 L22.6 16 L23.2 30 L24 32 L24.8 30 L25.4 16 Z" />
    </>
  ),
  // 05 Bucket, mop handle and a drop
  housekeeping: (
    <>
      <path d="M11 22 H37" />
      <path d="M12.5 22 L15 42 H33 L35.5 22" />
      <path d="M13.6 30 H34.4" />
      <path d="M34 4 L27.5 22" />
      <path d="M10 7 C10 7 6 12 6 14.5 A4 4 0 0 0 14 14.5 C14 12 10 7 10 7 Z" />
    </>
  ),
  // 06 Football
  sports: (
    <>
      <circle cx="24" cy="24" r="17" />
      <path d="M24 18 L29.7 22.1 L27.5 28.9 H20.5 L18.3 22.1 Z" />
      <path d="M24 18 V7 M29.7 22.1 L40.2 18.7 M27.5 28.9 L34 37.8 M20.5 28.9 L14 37.8 M18.3 22.1 L7.8 18.7" />
    </>
  ),
  // 07 Trophy
  "gifts-awards": (
    <>
      <path d="M15 7 H33 V17 A9 9 0 0 1 15 17 Z" />
      <path d="M15 10 H11 C9 10 8 11.5 8 13.5 C8 17 11 19.5 15.6 19.5" />
      <path d="M33 10 H37 C39 10 40 11.5 40 13.5 C40 17 37 19.5 32.4 19.5" />
      <path d="M24 26 V32" />
      <path d="M18 32 H30 V36 H18 Z" />
      <path d="M14 36 H34 V42 H14 Z" />
      <path d="M21 13 L24 11 V20" />
    </>
  ),
  // 08 Side drum and sticks
  music: (
    <>
      <ellipse cx="24" cy="21" rx="14" ry="5" />
      <path d="M10 21 V34 A14 5 0 0 0 38 34 V21" />
      <path d="M12.5 25.4 L17 38.2 L21.5 26 L26.5 39 L31 25.8 L35.6 37.4" />
      <path d="M20 18 L9 5 M28 18 L39 5" />
    </>
  ),
  // 09 Books on a shelf
  library: (
    <>
      <path d="M4 41.5 H44" />
      <rect x="8" y="12" width="7" height="29.5" />
      <rect x="15" y="8" width="8" height="33.5" />
      <path d="M25.6 41.5 L30.8 14.2 L37.6 15.5 L32.5 41.5 Z" />
      <path d="M8 17 H15 M8 36 H15 M15 13.5 H23 M15 35 H23" />
    </>
  ),
  // 10 Conical flask
  labs: (
    <>
      <path d="M18 6 H30" />
      <path d="M20 6 V18 L9.5 37.5 A3 3 0 0 0 12.2 42 H35.8 A3 3 0 0 0 38.5 37.5 L28 18 V6" />
      <path d="M13.6 30 C17 28.6 20 31.4 24 30 S31 28.6 34.4 30" />
      <circle cx="21" cy="36.5" r="1.4" />
      <circle cx="27.5" cy="34.5" r="1" />
    </>
  ),
  // 11 Monitor
  "computers-tech": (
    <>
      <rect x="5" y="7" width="38" height="26" rx="2" />
      <path d="M5 28 H43" />
      <path d="M20 33 L18.5 40 M28 33 L29.5 40 M14 40.5 H34" />
      <path d="M11 22 L16 17 L21 20 L28 13" />
      <path d="M24.5 13 H28 V16.5" />
    </>
  ),
  // 12 Desk and chair
  furniture: (
    <>
      <rect x="4" y="18" width="26" height="4" rx="1" />
      <path d="M7 22 V42 M27 22 V42 M7 34 H27" />
      <path d="M42 14 V42 M33 30 H42 M34 30 V42" />
      <path d="M12 18 V15 H20 V18" />
    </>
  ),
  // 13 Light bulb
  electricals: (
    <>
      <path d="M18.5 31 C18.5 27 12 24 12 17.5 A12 12 0 0 1 36 17.5 C36 24 29.5 27 29.5 31 Z" />
      <path d="M19 35 H29 M20 38.8 H28 M22 42.5 H26" />
      <path d="M21 31 V25 L22.5 23 L24 25 L25.5 23 L27 25 V31" />
      <path d="M5 8 L7.4 9.6 M43 8 L40.6 9.6 M3.5 17.5 H6.5 M44.5 17.5 H41.5" />
    </>
  ),
  // Canteen & Kitchen: a cooking pot with steam
  "canteen-kitchen": (
    <>
      <path d="M9 22 H39 V36 A4 4 0 0 1 35 40 H13 A4 4 0 0 1 9 36 Z" />
      <path d="M9 26 H4.5 M39 26 H43.5" />
      <path d="M7 22 H41" />
      <path d="M21 18.5 A3 3 0 0 1 27 18.5" />
      <path d="M17 13 C15.5 11 18.5 9.5 17 7 M24 13 C22.5 11 25.5 9.5 24 7 M31 13 C29.5 11 32.5 9.5 31 7" />
      <path d="M9 44 H39" />
    </>
  ),
};

type CategoryIconProps = {
  slug: string;
  className?: string;
  /** Sweep a board-green copy over the icon when an ancestor `.group` is hovered */
  drawOnHover?: boolean;
  /** Draw the icon in once when it mounts (re-mount with a new key to replay) */
  drawIn?: boolean;
  title?: string;
};

function Glyph({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("block size-full [&_*]:[vector-effect:non-scaling-stroke]", className)}
      aria-hidden="true"
    >
      {paths[slug]}
    </svg>
  );
}

export function CategoryIcon({ slug, className, drawOnHover = false, drawIn = false, title }: CategoryIconProps) {
  return (
    <span
      className={cn("relative block shrink-0", className ?? "size-12")}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {drawIn ? (
        <span className="block size-full overflow-hidden">
          <span className="animate-wipe-clip block size-full overflow-hidden">
            <span className="animate-wipe-glyph block size-full">
              <Glyph slug={slug} />
            </span>
          </span>
        </span>
      ) : (
        <Glyph slug={slug} />
      )}
      {drawOnHover ? (
        // Transform-only wipe: clip slides in from the left, glyph counter-slides
        <span
          className={cn(
            "absolute inset-0 overflow-hidden -translate-x-full transition-transform duration-500 ease-out-quart",
            "group-hover:translate-x-0 group-focus-visible:translate-x-0",
          )}
        >
          <span
            className={cn(
              "block size-full translate-x-full text-board transition-transform duration-500 ease-out-quart",
              "group-hover:translate-x-0 group-focus-visible:translate-x-0",
            )}
          >
            <Glyph slug={slug} className="[stroke-width:2.25]" />
          </span>
        </span>
      ) : null}
    </span>
  );
}

export const categoryIconSlugs = Object.keys(paths);
