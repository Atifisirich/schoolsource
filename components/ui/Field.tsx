import { useId } from "react";
import { cn } from "@/lib/cn";

// Fields: white wells on paper or cream, 52px tall, 14px corners. The border
// (#7d8899) is 3.5:1 on paper, meeting the 3:1 non-text contrast rule.
const control =
  "block w-full rounded-md border-2 border-[#7d8899] bg-white px-4 text-[1.0625rem] text-ink placeholder:text-ink-soft/70 " +
  "transition-[border-color,box-shadow] duration-150 hover:border-ink " +
  "focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/20 " +
  "aria-[invalid=true]:border-red";

type FieldProps = {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (props: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean; required?: boolean }) => React.ReactNode;
};

/** Label, control, hint and error wired together for screen readers. */
export function Field({ label, required, hint, error, className, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={id} className="text-base font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-red" aria-hidden="true">
            {" "}*
          </span>
        ) : (
          <span className="font-normal text-ink-soft"> (optional)</span>
        )}
      </label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined, required })}
      {hint ? (
        <p id={hintId} className="text-[0.9375rem] text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-[0.9375rem] font-semibold text-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, "h-13", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, "min-h-32 py-3.5 leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(control, "h-13 appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-11", className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%230E1F3D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
      }}
      {...props}
    >
      {children}
    </select>
  );
}
