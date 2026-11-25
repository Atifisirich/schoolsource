import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** "wide" for full layouts (1328px), "text" for reading measure (736px) */
  size?: "wide" | "text";
};

export function Container({ children, className, size = "wide" }: ContainerProps) {
  return <div className={cn(size === "wide" ? "wrap" : "wrap-text", className)}>{children}</div>;
}
