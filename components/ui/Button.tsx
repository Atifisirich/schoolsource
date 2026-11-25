import Link from "next/link";
import { isValidElement } from "react";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { cn } from "@/lib/cn";

/**
 * Pill buttons (56px, 48px small). Classes live in app/globals.css (.btn-*).
 *
 * primary    ink, hovers to blue. The one main action ("Request a quote").
 *            On a dark field (.on-dark) it turns white.
 * whatsapp   white with an ink border and a green WhatsApp icon, hovers to ink.
 *            On an orange field (.on-orange) it is solid ink.
 * ghost      transparent with an ink border (white on .on-dark).
 * light      white, for blue and ink fields.
 * text       bold underlined text with an arrow, for "See all ..." links.
 *
 * v2 names still work: secondary → ghost (→ whatsapp when its icon is
 * <WhatsAppIcon />), accent → light, inverse → ghost.
 */
export type ButtonVariant = "primary" | "whatsapp" | "ghost" | "light" | "text" | "secondary" | "accent" | "inverse";
/** sm 48px; md and lg 56px */
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Icon before the label. With variant "whatsapp" it defaults to the WhatsApp glyph. */
  icon?: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClass: Record<Exclude<ButtonVariant, "text" | "secondary" | "accent" | "inverse">, string> = {
  primary: "btn btn-primary",
  whatsapp: "btn btn-wa",
  ghost: "btn btn-ghost",
  light: "btn btn-light",
};

function resolve(variant: ButtonVariant, icon: React.ReactNode) {
  if (variant === "secondary") {
    return isValidElement(icon) && icon.type === WhatsAppIcon ? "whatsapp" : "ghost";
  }
  if (variant === "accent") return "light";
  if (variant === "inverse") return "ghost";
  return variant;
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function isInternal(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function Button({ variant = "primary", size = "md", className, children, icon, ...rest }: ButtonProps) {
  const v = resolve(variant, icon);
  const leading = icon ?? (v === "whatsapp" ? <WhatsAppIcon /> : null);

  const classes =
    v === "text"
      ? cn("tlink", className)
      : cn(variantClass[v], size === "sm" && "btn-sm", className);

  const content =
    v === "text" ? (
      <>
        <span>{children}</span>
        <ArrowIcon />
      </>
    ) : (
      <>
        {leading}
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
