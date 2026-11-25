import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * primary    solid blue, the one main action per screen
 * secondary  white with a hairline border, for the second action
 * accent     orange with navy text, only on the dark ink band
 * inverse    outline for the dark ink band
 * text       inline link-style action with an underline
 */
type Variant = "primary" | "secondary" | "accent" | "inverse" | "text";
/** sm 40px, md 44px, lg 52px */
type Size = "md" | "lg" | "sm";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Optional icon placed before the label */
  icon?: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

// .btn (globals.css) adds the hover step and press, gated to real hover devices
const base =
  "btn inline-flex items-center justify-center gap-2 font-sans font-semibold leading-none whitespace-nowrap " +
  "rounded-sm select-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-board text-white hover:bg-board-deep",
  secondary: "border border-ink/15 bg-white text-ink hover:border-ink/40 hover:bg-paper-deep",
  // Orange takes navy text only, never white
  accent: "bg-pencil text-ink hover:bg-[#f79a4b]",
  inverse: "border border-paper/40 text-paper hover:border-paper hover:bg-paper/10",
  text:
    "btn-text !h-auto !px-0 text-board underline decoration-board/35 decoration-1 underline-offset-[5px] " +
    "hover:decoration-board hover:decoration-2 [.on-dark_&]:text-paper [.on-dark_&]:decoration-paper/40 [.on-dark_&]:hover:decoration-pencil",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-6 text-base",
};

function isInternal(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function Button({ variant = "primary", size = "md", className, children, icon, ...rest }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {icon ? <span className="shrink-0 [&>svg]:size-[1.15em]" aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    if (isInternal(href)) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {content}
        </Link>
      );
    }
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
