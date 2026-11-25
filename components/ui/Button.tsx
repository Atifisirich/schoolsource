import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "accent" | "inverse" | "text";
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

const base =
  "inline-flex items-center justify-center gap-2.5 font-sans font-semibold leading-none whitespace-nowrap " +
  "rounded-sm transition-[color,border-color,transform,box-shadow] duration-200 ease-out-quart " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Primary blue, deepens from the left on hover
  primary: "ink-fill bg-board text-white shadow-button hover:-translate-y-0.5 [--fill:var(--color-board-deep)]",
  // White with a blue outline, fills with blue
  secondary:
    "ink-fill border-[1.5px] border-board/30 bg-white text-board shadow-card hover:-translate-y-0.5 hover:border-board hover:text-white focus-visible:text-white [--fill:var(--color-board)]",
  // Orange, for use on dark bands
  accent: "ink-fill bg-pencil text-ink shadow-[0_8px_18px_-8px_rgb(245_135_42/0.7)] hover:-translate-y-0.5 hover:text-ink [--fill:var(--color-white)]",
  // Outline for dark bands
  inverse:
    "ink-fill border-[1.5px] border-paper text-paper hover:text-ink focus-visible:text-ink [--fill:var(--color-paper)]",
  // Inline text action with an underline that shifts on hover
  text:
    "!px-0 !py-0 !h-auto text-ink underline decoration-rule decoration-2 underline-offset-[6px] " +
    "hover:decoration-board transition-[text-decoration-color] [.on-dark_&]:text-paper [.on-dark_&]:hover:decoration-pencil",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-12 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
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
