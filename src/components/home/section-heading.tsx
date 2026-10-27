export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow && <p className="text-sm text-brand-500">{eyebrow}</p>}
      <h2 className="font-display text-4xl font-semibold leading-tight text-brand-700 sm:text-[2.6rem]">{title}</h2>
      {description && <p className="mt-2 text-[0.95rem] text-text/80">{description}</p>}
    </div>
  );
}
