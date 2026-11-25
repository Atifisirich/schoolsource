import { cn } from "@/lib/cn";

type RuledPaperProps = {
  children: React.ReactNode;
  className?: string;
  /** Red margin line on the left */
  margin?: boolean;
  /** Punched holes down the left edge, like a register page */
  holes?: boolean;
  as?: "div" | "article" | "aside" | "figure";
};

/**
 * A sheet of ruled notebook paper. Content placed inside lines up with
 * the 2rem rule when it uses leading-8 / multiples of 2rem.
 */
export function RuledPaper({
  children,
  className,
  margin = true,
  holes = false,
  as: Tag = "div",
}: RuledPaperProps) {
  return (
    <Tag
      className={cn(
        "ruled relative overflow-hidden rounded-sm border border-ink/10",
        margin && "ruled-margin",
        holes ? "pl-14 sm:pl-20" : margin ? "pl-10 sm:pl-16" : "",
        className,
      )}
    >
      {holes ? (
        <div aria-hidden="true" className="absolute inset-y-0 left-3 flex flex-col justify-evenly sm:left-5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block size-3.5 rounded-full bg-paper-deep shadow-[inset_0_1px_2px_rgb(27_36_51/0.25)]"
            />
          ))}
        </div>
      ) : null}
      {children}
    </Tag>
  );
}
