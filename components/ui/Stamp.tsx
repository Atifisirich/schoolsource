import { useId } from "react";
import { cn } from "@/lib/cn";

type StampProps = {
  className?: string;
  /** Degrees of tilt; stamps are never pressed perfectly straight */
  rotate?: number;
  /** Ring text, read clockwise from the top */
  text?: string;
  /** Short word across the middle band */
  centre?: string;
  tone?: "red" | "ink" | "paper";
  /** Decorative by default; pass a label when the stamp carries meaning */
  label?: string;
};

const toneColour = {
  red: "text-red",
  ink: "text-ink",
  paper: "text-paper",
};

/**
 * Circular rubber-stamp mark. The ink texture comes from a small
 * turbulence filter so edges look pressed rather than vector-perfect.
 */
export function Stamp({
  className,
  rotate = -8,
  text = "SCHOOLSOURCE · HYDERABAD · SCHOOL SUPPLIES ·",
  centre = "SUPPLIED",
  tone = "red",
  label,
}: StampProps) {
  const id = useId().replace(/:/g, "");
  const ring = `ring-${id}`;
  const rough = `rough-${id}`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("block aspect-square", toneColour[tone], className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <path id={ring} d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        <filter id={rough} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.5"
            result="speckle"
          />
          <feComposite in="SourceGraphic" in2="speckle" operator="in" result="inked" />
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" seed="3" result="warp" />
          <feDisplacementMap in="inked" in2="warp" scale="2.5" />
        </filter>
      </defs>

      <g filter={`url(#${rough})`} fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="94" strokeWidth="5" />
        <circle cx="100" cy="100" r="86" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="56" strokeWidth="1.5" />

        <text
          fill="currentColor"
          stroke="none"
          fontFamily="var(--font-plex-mono), monospace"
          fontWeight="600"
          fontSize="12.5"
          letterSpacing="1.4"
        >
          <textPath href={`#${ring}`} startOffset="0" textLength="446" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>

        {/* Middle band */}
        <rect x="42" y="86" width="116" height="28" fill="var(--stamp-band, var(--color-paper))" strokeWidth="2.5" />
        <text
          x="100"
          y="105.5"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontFamily="var(--font-plex-mono), monospace"
          fontWeight="600"
          fontSize="15"
          letterSpacing="2"
        >
          {centre}
        </text>

        {/* Small stars either side of the band */}
        <path d="M100 66 l2.4 5 5.4.6-4 3.7 1.1 5.3-4.9-2.7-4.9 2.7 1.1-5.3-4-3.7 5.4-.6z" fill="currentColor" stroke="none" />
        <path d="M100 122 l2.4 5 5.4.6-4 3.7 1.1 5.3-4.9-2.7-4.9 2.7 1.1-5.3-4-3.7 5.4-.6z" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
