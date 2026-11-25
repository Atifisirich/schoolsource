import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** "wide" for full layouts, "text" for reading measure */
  size?: "wide" | "text";
};

export function Container({ children, className, size = "wide" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter",
        size === "wide" ? "max-w-[80rem]" : "max-w-[46rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}
