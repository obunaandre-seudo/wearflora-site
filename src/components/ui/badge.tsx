import clsx from "clsx";

const tones = {
  default: "bg-surface-2 text-muted border-border",
  brand: "bg-brand-100 text-brand-700 border-brand-200",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  warning: "bg-solar-500/15 text-solar-600 border-solar-500/40",
  danger: "bg-red-50 text-red-800 border-red-200",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
