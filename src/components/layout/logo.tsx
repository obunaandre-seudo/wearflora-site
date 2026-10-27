import clsx from "clsx";

/**
 * Wearflora wordmark: a serif wordmark with a small floral sprig rising from the "l",
 * and the "Wear your bloom" tagline. Pure SVG + text so it stays crisp and uses brand colours.
 */
export function Logo({
  className,
  mark = false,
  tagline = true,
  tone = "berry",
}: {
  className?: string;
  mark?: boolean;
  tagline?: boolean;
  tone?: "berry" | "light";
}) {
  const word = tone === "light" ? "text-white" : "text-brand-700";
  const sub = tone === "light" ? "text-white/80" : "text-brand-500";
  const stroke = tone === "light" ? "#F8DDE2" : "#C65D79";

  const sprig = (
    <svg width="30" height="34" viewBox="0 0 30 34" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M15 33C15 24 15 18 15 10" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 22c-4-1-7-4-8-8 4 0 7 3 8 8Z" fill={stroke} fillOpacity="0.2" stroke={stroke} strokeWidth="1.2" />
      <path d="M15 17c3-2 6-2 9-1-1 3-5 5-9 1Z" fill={stroke} fillOpacity="0.2" stroke={stroke} strokeWidth="1.2" />
      <circle cx="15" cy="7" r="3.2" fill="#EFB7C3" stroke={stroke} strokeWidth="1.2" />
      <circle cx="10.5" cy="9" r="2.4" fill="#F8DDE2" stroke={stroke} strokeWidth="1.1" />
      <circle cx="19.5" cy="9" r="2.4" fill="#F8DDE2" stroke={stroke} strokeWidth="1.1" />
    </svg>
  );

  if (mark) return <span className={clsx("inline-flex select-none", className)}>{sprig}</span>;

  return (
    <span className={clsx("inline-flex select-none flex-col leading-none", className)}>
      <span className="flex items-end gap-1">
        <span className={clsx("font-display text-[2rem] font-semibold tracking-tight sm:text-[2.2rem]", word)}>Wearflora</span>
      </span>
      {tagline && (
        <span className={clsx("mt-1 pl-1 text-[9px] font-medium uppercase tracking-[0.34em]", sub)}>Wear your bloom</span>
      )}
    </span>
  );
}
