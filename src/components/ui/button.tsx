import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: "wf-sheen bg-brand-500 text-white hover:bg-brand-600 shadow-glow hover:shadow-glow-lg disabled:hover:bg-brand-500",
  secondary: "bg-brand-100 text-brand-700 hover:bg-brand-200 border border-brand-200",
  outline: "border border-brand-400 text-brand-600 hover:bg-brand-50",
  ghost: "text-brand-700 hover:bg-surface-2",
  danger: "bg-red-700 text-white hover:bg-red-600",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-[3.25rem] px-8 text-[0.95rem]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

export const Button = forwardRef<HTMLButtonElement, BaseProps & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => (
    <button ref={ref} className={clsx(base, variants[variant], sizes[size], className)} {...props} />
  )
);
Button.displayName = "Button";

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BaseProps & React.ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={clsx(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}
